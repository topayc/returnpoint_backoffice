package com.returnp.admin.service;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.returnp.admin.common.AppConstants;
import com.returnp.admin.common.DataMap;
import com.returnp.admin.common.ResponseUtil;
import com.returnp.admin.common.ReturnpException;
import com.returnp.admin.dao.mapper.AffiliateMapper;
import com.returnp.admin.dao.mapper.GreenPointMapper;
import com.returnp.admin.dao.mapper.PaymentPointbackRecordMapper;
import com.returnp.admin.dao.mapper.PaymentTransactionMapper;
import com.returnp.admin.dao.mapper.PointBackMapper;
import com.returnp.admin.dao.mapper.PolicyMapper;
import com.returnp.admin.dto.command.AffiliateTidCommand;
import com.returnp.admin.dto.command.InnerPointBackTarget;
import com.returnp.admin.dto.command.OuterPointBackTarget;
import com.returnp.admin.dto.command.PointBackTarget;
import com.returnp.admin.dto.reponse.ReturnpBaseResponse;
import com.returnp.admin.model.Affiliate;
import com.returnp.admin.model.GreenPoint;
import com.returnp.admin.model.Member;
import com.returnp.admin.model.PaymentPointbackRecord;
import com.returnp.admin.model.PaymentTransaction;
import com.returnp.admin.model.Policy;
import com.returnp.admin.model.SoleDist;
import com.returnp.admin.service.interfaces.BasePointAccumulateService;
import com.returnp.admin.utils.BASE64Util;
import com.returnp.admin.utils.QRManager;
import com.returnp.admin.web.message.MessageUtils;

@Service
/*@PropertySource("classpath:/messages.properties")*/
public class BasePointAccumulateServiceImpl implements BasePointAccumulateService {

	@Autowired PointBackMapper pointBackMapper;
	@Autowired PolicyMapper policyMapper;
	@Autowired AffiliateMapper affiliateMapper;
	@Autowired PaymentTransactionMapper paymentTransactionMapper;
	@Autowired GreenPointMapper greenPointMapper;
	@Autowired PaymentPointbackRecordMapper paymentPointbackRecordMapper;
	@Autowired MessageUtils messageUtils;
	@Autowired Environment env;
	
	public static class Command {
		public static class Control{
			
		}
		public static class Request {
			public static final String  PAYMENT_APPROVAL = "PAYMENT_APPROVAL";
			public static final String PAYMENT_CANCEL = "PAYMENT_CANCEL";
		}
	}
	
	ArrayList<String> keys;
	ArrayList<Integer> pointAccList = new ArrayList<Integer>();

	 /**
	 * 기본 초기화 작업
	 * 외부 연결 허용 키 목록 세팅
	 * 이후 연결 키 생성 기능구현시, 디비로 관리 
	 * @throws Exception 
	 */
/*	@PostConstruct
	 public void init() {
		 keys = new ArrayList<String>(Arrays.asList(env.getProperty("keys").trim().split(",")));
	 }*/
	
	@Override
	public ReturnpBaseResponse accumulate(DataMap dataMap) throws Exception {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		
		/*
		 * 기본 결제 번호만으로는 중복이 될 수 있기 때문에 
		 * 결제 번호에 TID 를 연결하여 TID 별 결제 번호를 생성
		 *  */
		dataMap.put("pan", (String)dataMap.get("af_id")+ "_" + (String)dataMap.getStr("pan")); 
		
		try {
			switch(dataMap.getStr("payment_transaction_type").trim()){
				case AppConstants.PaymentTransactionType.QR:
					String decode64Qr = BASE64Util.decodeString(dataMap.getStr("qr_org"));
					URL url = new URL(decode64Qr);
					String queryParmStr =url.getQuery();
					
					HashMap<String, String> qrParsemap = QRManager.parseQRToMap(queryParmStr);
					if (qrParsemap == null) {
						res.setMessage(this.messageUtils.getMessage("pointback.message.invalid_qr"));
						res.setResultCode("10001");
						res.setResult("error");
						return res;
					}
				case AppConstants.PaymentTransactionType.MANUAL:
					break;
				case AppConstants.PaymentTransactionType.APP:
					break;
				case AppConstants.PaymentTransactionType.API:
					break;
			}
			
			this.validateMemberAuth(dataMap.getStr("memberEmail"),dataMap.getStr("phoneNumber"),dataMap.getStr("phoneNumberCountry"));
			this.validateAffiliateAuth(dataMap.getStr("af_id"));
			this.validate(dataMap.getStr("pan"),dataMap.getStr("pas"));
			
			//this.validate(dataMap);
			PaymentTransaction paymentTransaction = this.createPaymentTransaction(dataMap);
			this.accumuatePoint(paymentTransaction);
			ResponseUtil.setResponse(res, "100", this.messageUtils.getMessage("pointback.message.success_acc_ok"));
			return res;
			
		}catch(ReturnpException e1) {
			//e.printStackTrace();
			res = e1.getBaseResponse();
			throw e1;
		}catch(Exception e2) {
			//e.printStackTrace();
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			throw e2;
		}
	}
	
	@Override
	public ReturnpBaseResponse cancelAccumulate(DataMap dataMap) {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		
		/*
		 * 기본 결제 번호만으로는 중복이 될 수 있기 때문에 
		 * 결제 번호에 TID 를 연결하여 TID 별 결제 번호를 생성
		 *  */
		dataMap.put("pan", (String)dataMap.get("af_id")+ "_" + (String)dataMap.getStr("pan")); 
		
		try {
			switch(dataMap.getStr("payment_transaction_type").trim()){
				case AppConstants.PaymentTransactionType.QR:
					String decode64Qr = BASE64Util.decodeString(dataMap.getStr("qr_org"));
					URL url = new URL(decode64Qr);
					String queryParmStr =url.getQuery();
					
					HashMap<String, String> qrParsemap = QRManager.parseQRToMap(queryParmStr);
					if (qrParsemap == null) {
						res.setMessage(this.messageUtils.getMessage("pointback.message.invalid_qr"));
						res.setResultCode("10001");
						res.setResult("error");
						return res;
					}
				case AppConstants.PaymentTransactionType.MANUAL:
					break;
				case AppConstants.PaymentTransactionType.APP:
					break;
				case AppConstants.PaymentTransactionType.API:
					break;
			}
			
			this.validateMemberAuth(dataMap.getStr("memberEmail"),dataMap.getStr("phoneNumber"),dataMap.getStr("phoneNumberCountry"));
			this.validateAffiliateAuth(dataMap.getStr("af_id"));
			this.validate(dataMap.getStr("pan"),dataMap.getStr("pas"));
			
			this.restorePoint(dataMap);
			ResponseUtil.setResponse(res, "100", this.messageUtils.getMessage("pointback.cancel_accumulate_ok"));
			return res;
		}catch(ReturnpException e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			res = e.getBaseResponse();
			return res;
		}catch(Exception e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			return res;
		}
	}
	
	
	/* 
	 * PaymentTransactionNo 의한 적립 취소
	 */
	@Override
	public ReturnpBaseResponse cancelAccumuate(String pan) {
		DataMap dataMap = null;
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		ArrayList<PaymentTransaction> pts = null;
		PaymentTransaction pt = null;
		try {
			pt = new PaymentTransaction();
			pts = this.pointBackMapper.findPaymentTransactions(pt);
			if (pts == null || pts.size() !=1) {
				 ResponseUtil.setResponse(res, "19091", this.messageUtils.getMessage("pointback.message.not_existed_payment"));
					throw new ReturnpException(res);
			}
			
			dataMap = this.convertPaymentTransactionToDataMap(pts.get(0));
			return this.cancelAccumulate(dataMap);
		}catch(ReturnpException e) {
			e.printStackTrace();
			if (!TransactionAspectSupport.currentTransactionStatus().isRollbackOnly()) {
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
			res = e.getBaseResponse();
			return res;
		}catch(Exception e) {
			e.printStackTrace();
			if (!TransactionAspectSupport.currentTransactionStatus().isRollbackOnly()) {
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			return res;
		}
	}

	/* 
	 * 결제번호에 의한 적립 취소 
	 */
	@Override
	public ReturnpBaseResponse cancelAccumuate(int paymentTrasactionNo) {
		DataMap dataMap = null;
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		PaymentTransaction pt = null;
		try {
			pt = paymentTransactionMapper.selectByPrimaryKey(paymentTrasactionNo);
			if (pt == null) {
				 ResponseUtil.setResponse(res, "19091", this.messageUtils.getMessage("pointback.message.not_existed_payment"));
					throw new ReturnpException(res);
			}
			
			dataMap = this.convertPaymentTransactionToDataMap(pt);
			return this.cancelAccumulate(dataMap);
		}catch(ReturnpException e) {
			e.printStackTrace();
			if (!TransactionAspectSupport.currentTransactionStatus().isRollbackOnly()) {
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
			res = e.getBaseResponse();
			return res;
		}catch(Exception e) {
			e.printStackTrace();
			if (!TransactionAspectSupport.currentTransactionStatus().isRollbackOnly()) {
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			}
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			return res;
		}
	}
	
	@Override
	public Member validateMemberAuth(String memberEmail, String phoneNumber, String phoneNumberCountry) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		try {
			/*존재 하는 회원 인지 검사*/
			Member member = new Member();;
			member.setMemberEmail(memberEmail);
			ArrayList<Member> members = this.pointBackMapper.findMembers(member);
			
			if (members.size() !=1 || members == null) {
				ResponseUtil.setResponse(res, "10002", 
						this.messageUtils.getMessage("pointback.message.not_argu_member", new Object[] {memberEmail}));
				throw new ReturnpException(res);
			}
			
			/*member = members.get(0);*/
			
			/*
			 * 기기의 전화번호와 해당 이메일 계정의 전화번호가 같은 비교
			 */
			if (!members.get(0).getMemberPhone().equals(phoneNumber) && 
					!members.get(0).getMemberPhone().equals(phoneNumberCountry)) {
				ResponseUtil.setResponse(res, "10003", this.messageUtils.getMessage("pointback.message.invalid_argu_phonenumber",
					new Object[] { phoneNumber, phoneNumberCountry, members.get(0).getMemberPhone()}));
				throw new ReturnpException(res);
			}
		return member;
		} catch (ReturnpException e1) {
			throw e1;
		} catch (Exception e2) {
			throw e2;
		}
	}

	@Override
	public Affiliate validateAffiliateAuth(String afId) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		try {
			/* * 
			 * 존재하는 가맹점인지 검사 
			 * 기존의 하나의 TID 만 등록할 수 있는 시스템에서 하나의 가맹점에 다수의 TID 를 등록할 수 있게 
			 * 변경했기 때문에 하나의 소스는 주석 처리
			 * */
		/*	Affiliate affiliate = new Affiliate();
			affiliate.setAffiliateSerial(afId);
			ArrayList<Affiliate> affiliates = this.pointBackMapper.findAffiliates(affiliate);
			
			if (affiliates == null || affiliates.size() != 1) {
				ResponseUtil.setResponse(res, ResponseUtil.RESPONSE_OK, "603", 
						this.messageUtils.getMessage("pointback.message.not_argu_affiliate", new Object[] {afId}));
				throw new ReturnpException(res);
			}
			*/
			
			/* 하나의 가맹점에서 다수의 TID 를 등록할 수 있게 변경됨으로써, 인증 로직을 다음과 같이 수정함 */
			AffiliateTidCommand atidCommand = new AffiliateTidCommand();
			atidCommand.setTid(afId);
			
			ArrayList<AffiliateTidCommand> atidList = this.pointBackMapper.selectAffilaiteTidCommands(atidCommand);
			if (atidList == null || atidList.size() < 1) {
				ResponseUtil.setResponse(res, ResponseUtil.RESPONSE_OK, "10088", 
						this.messageUtils.getMessage("pointback.message.invalide_tid", new Object[] {afId}));
				throw new ReturnpException(res);
			}
			
			Affiliate affiliate = this.affiliateMapper.selectByPrimaryKey(atidList.get(0).getAffiliateNo());
			if (affiliate == null) {
				ResponseUtil.setResponse(res, ResponseUtil.RESPONSE_OK, "10089", 
						this.messageUtils.getMessage("pointback.message.not_connected_tid_affiliate"));
				throw new ReturnpException(res);
			}
			
			if (!affiliate.getAffiliateType().contains(AppConstants.AffiliateType.COMMON_AFFILIATE)  && 
					!affiliate.getAffiliateType().contains(AppConstants.AffiliateType.ONLINE_AFFILIATE)) {
				ResponseUtil.setResponse(res, ResponseUtil.RESPONSE_OK, "619", 
						this.messageUtils.getMessage("pointback.message.acc_ok_but_not_accable_affiliate"));
				throw new ReturnpException(res);
			}
			return affiliate;
		} catch (ReturnpException e1) {
			e1.printStackTrace();
			throw e1;
		} catch (Exception e2) {
			e2.printStackTrace();
			throw e2;
		}
	}
	
	@Override
	public PaymentTransaction validate(String pan, String pas) throws ReturnpException {
		ReturnpBaseResponse res =  new ReturnpBaseResponse();
		try {
			/* * 해당 결제 내역이 이미 등록되어 있는지 여부에 그에 따른 적립 처리 여부 검사 */
			PaymentTransaction paymentTransaction = new PaymentTransaction();
			paymentTransaction.setPaymentApprovalNumber(pan);
			ArrayList<PaymentTransaction> paymentTransactions = this.pointBackMapper.findPaymentTransactions(paymentTransaction);
			
			/* 해당 결제 승인 번호로 2개의 내역이 존재하는 경우 
			 * 적립 후 취소가 된 내역으로 처리 중지 
			 * */
			if (paymentTransactions.size() == 2  ) {
				 ResponseUtil.setResponse(res, "10005", this.messageUtils.getMessage("pointback.message.invalid_req"));
					throw new ReturnpException(res);
			}
			
			/* 해당 결제 번호로 3개 이상 등록되어 있는 경우
			 * 같은 결제 승인 번호로는 적립과 취소가 이루어진 경우, 즉 최대 2개까지 등록될 수 있기 때문에 
			 * 이 경우는 시스템 오류임 
			 *  */
			if (paymentTransactions.size() > 2  ) {
				 ResponseUtil.setResponse(res, "10005", this.messageUtils.getMessage("pointback.message.error_many_payment_record"));
					throw new ReturnpException(res);
			}
			
			/* 결제내역이 1개가 존재하지만, POS 자체 결제 에러인 경우 처리 불가 */
			if (paymentTransactions.size() == 1) {
				paymentTransaction = paymentTransactions.get(0);
				if (paymentTransaction.getPaymentApprovalStatus().equals(AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_ERROR)){
					ResponseUtil.setResponse(res, "10006", this.messageUtils.getMessage("pointback.message.error_paymenttransaction"));
					throw new ReturnpException(res);
				}
			}
			/*
			 * 적립 요청인 경우 해당 내역이 존재하지 않는 경우에만 유효한 요청임
			 */
			if ( pas.equals("0") ) {
				/*
				 * 적립 요청인 경우, 결제내역이 사실상 등록되어 있으면 에러이며
				 * 아래는 세부 조건에 따라 에러메시지를 생성
				 */
				if (paymentTransactions.size() == 1) {
					paymentTransaction = paymentTransactions.get(0);
					 /* 부적절한 요청 - 현재 적립 처리중인 내역에 대한 중복 적립 요청*/
					 if (paymentTransaction.getPaymentApprovalStatus().equals(AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_OK)) {
						 if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_START) || 
								 paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_PROGRESS)) {
							 ResponseUtil.setResponse(res, "10007", this.messageUtils.getMessage("pointback.message.already_accumulating_req"));
							 throw new ReturnpException(res);
						 }
						
						 /* 부적절한 요청 - 적립 처리가 완료된 내역에 대한 중복 적립 요청*/
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_COMPLETE) ) {
							ResponseUtil.setResponse(res, "10008", this.messageUtils.getMessage("pointback.message.already_complete_req"));
							throw new ReturnpException(res);
						}
						
						/* 부적절한 요청 - 적립 처리 에러 내역에 대한 중복 적립 요청*/
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_STOP) ) {
							ResponseUtil.setResponse(res, "10009", this.messageUtils.getMessage("pointback.message.error_accumulate"));
							throw new ReturnpException(res);
						}
					}else if (paymentTransaction.getPaymentApprovalStatus().equals(AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_CANCEL)){
						/* 이미 결제 취소된 중이거나 결제 취소가 완료, 혹은 결제 취소 에러가 발생한 내역에 대한 적립 요청인 경우 - 부적절한 적립 요청  */
						ResponseUtil.setResponse(res, "10010", this.messageUtils.getMessage("pointback.message.error_acc_req_to_already_canceled_payement"));
						throw new ReturnpException(res);
					}
				 }
			}
			
			/*
			 * 적립 취소 요청인 경우, 현재 등록 내역이 적립이 완료된 경우에만 유효한 요청
			 */
			else if (pas.equals("1") ) {
				 if (paymentTransactions.size() == 1) {
					 paymentTransaction = paymentTransactions.get(0);
					 if (paymentTransaction.getPaymentApprovalStatus().equals(AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_CANCEL)){ 
						 
						 /* 부적절한 취소 요청 - 현재 적립 취소중인 내역  */
						 if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_CANCEL_START) || 
								 paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_CANCEL_PROGRESS)) {
							ResponseUtil.setResponse(res, "10011", this.messageUtils.getMessage("pointback.message.already_canceling_req"));
							throw new ReturnpException(res);
						}
						
						 /* 부적절한 취소 요청 - 현재 적립 취소가 완료된 내역 */
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_CANCEL_COMPLETE) ) {
							ResponseUtil.setResponse(res, "10012", this.messageUtils.getMessage("pointback.message.already_canceled_req"));
							throw new ReturnpException(res);
						}
						
						 /* 부적절한 취소 요청 - 현재 적립 취소 에러가 발생한 내역 */
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_CANCEL_STOP) ) {
							ResponseUtil.setResponse(res, "10013", this.messageUtils.getMessage("pointback.message.error_acc_canceling"));
							throw new ReturnpException(res);
						}
					}else if (paymentTransaction.getPaymentApprovalStatus().equals(AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_OK)){
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_START) || 
								paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_PROGRESS)) {
							ResponseUtil.setResponse(res, "10014", this.messageUtils.getMessage("pointback.message.now_accumulating_wait"));
							throw new ReturnpException(res);
						}
						
						if (paymentTransaction.getPointBackStatus().equals(AppConstants.AccumulateStatus.POINTBACK_STOP)) {
							ResponseUtil.setResponse(res, "10015", this.messageUtils.getMessage("pointback.message.cancle_for_error_acc"));
							throw new ReturnpException(res);
						}
					}
				 }else {
					 /* 존재하지 않는 내역에 대한 취소 요청  */	
					 ResponseUtil.setResponse(res, "10016", this.messageUtils.getMessage("pointback.message.not_payment_invalid_req"));
						throw new ReturnpException(res);
				 }
			}
			return paymentTransaction;
		} catch(ReturnpException ee) {
			ee.printStackTrace();
			throw ee;
		} catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
		
		
	}
	
	@Override
	public PaymentTransaction createPaymentTransaction(DataMap dataMap) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		PaymentTransaction pt = null;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			Member mem = new Member();
			mem.setMemberEmail(dataMap.getStr("memberEmail"));
			ArrayList<Member> members = this.pointBackMapper.findMembers(mem);
			mem = members.get(0);
	
			AffiliateTidCommand atidCommand = new AffiliateTidCommand();
			atidCommand.setTid(dataMap.getStr("af_id"));
			ArrayList<AffiliateTidCommand> atidList = this.pointBackMapper.selectAffilaiteTidCommands(atidCommand);
			
			Affiliate affiliate = new Affiliate();
			affiliate = this.affiliateMapper.selectByPrimaryKey(atidList.get(0).getAffiliateNo());
			
			pt = new PaymentTransaction();
			pt.setMemberNo(mem.getMemberNo());
			pt.setMemberName(mem.getMemberName());
			pt.setMemberEmail(mem.getMemberEmail());
			pt.setNodeNo(mem.getMemberNo());
			pt.setNodeType("1");
			pt.setNodeEmail(mem.getMemberEmail());
			pt.setNodeName(mem.getMemberName());;
			pt.setMemberPhone(mem.getMemberPhone());
			pt.setAffiliateNo(affiliate.getAffiliateNo());
			//pt.setAffiliateSerial(affiliate.getAffiliateSerial());
			pt.setAffiliateSerial(dataMap.getStr("af_id"));
			//paymentTransaction.setOrgPaymentData(BASE64Util.decodeString(qrOrg));
			pt.setPaymentApprovalAmount(dataMap.getInt("pam"));
			pt.setPaymentApprovalNumber(dataMap.getStr("pan"));
			Date date = new Date();
			pt.setCreateTime(date);
			pt.setUpdateTime(date);
			/* 
			 * QR 코드에서 승인 상태는 0 : 승인 완료 1 : 승인 취소임,  0, 1 아닐때 에러 
			 */
			String aps  = dataMap.getStr("pas").equals("0") ? 
				AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_OK : 
				(dataMap.getStr("pas").equals("1") ? AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_CANCEL : AppConstants.PaymentApprovalStatus.PAYMENT_APPROVAL_ERROR) ;
			pt.setPaymentApprovalStatus(aps);
			
			/*
			 * 적립 처리 작업인 경우 : 적립 진행중으로  표시
			 * 적립 취소 처리 작업인 경우 : 적립 처리 취소중 표시
			 * 이외의 경우 요청 자체가 에러임
			 */
			
			String pbs = dataMap.getStr("pas").equals("0") ? 
				AppConstants.AccumulateStatus.POINTBACK_PROGRESS : 
				(dataMap.getStr("pas").equals("1") ? AppConstants.AccumulateStatus.POINTBACK_CANCEL_PROGRESS : AppConstants.AccumulateStatus.POINTBACK_REQ_ERROR) ;
			pt.setPointBackStatus(pbs);
			
			pt.setPaymentTransactionType(dataMap.getStr("payment_transaction_type"));
			pt.setPaymentApprovalDateTime((Date)dataMap.get("pat"));
			pt.setRegAdminNo(0);
			this.paymentTransactionMapper.insert(pt);
			return pt;
			
		}catch(Exception e) {
			e.printStackTrace();
			ResponseUtil.setResponse(res, "9000", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			throw new ReturnpException(res);
		}
	}

	@Override
	public ReturnpBaseResponse  accumuatePoint(int paymentTransactioinNo) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		try {
			PaymentTransaction paymentTransaction = this.paymentTransactionMapper.selectByPrimaryKey(paymentTransactioinNo);
			if (paymentTransaction == null) {
				/* 존재하지 않는 내역에 대한 취소 요청  */	
				 ResponseUtil.setResponse(res, "10016", this.messageUtils.getMessage("pointback.message.not_payment_invalid_req"));
					throw new ReturnpException(res);
			}
			this.accumuatePoint(paymentTransaction);
			ResponseUtil.setResponse(res, "100", this.messageUtils.getMessage("pointback.message.success_acc_ok"));
			return res;
		}catch(ReturnpException e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			res = e.getBaseResponse();
			return res;
		}catch(Exception e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			return res;
		}
	}
	

	@Override
	public ReturnpBaseResponse accumuatePoint(String paymentApprovalNumber) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		try {
			PaymentTransaction pt = new PaymentTransaction();
			pt.setPaymentApprovalNumber(paymentApprovalNumber);
			ArrayList<PaymentTransaction> paymentTransactions = this.pointBackMapper.findPaymentTransactions(pt);
			if (paymentTransactions.size() != 1) {
				 /* 존재하지 않는 내역에 대한 취소 요청  */	
				 ResponseUtil.setResponse(res, "10016", this.messageUtils.getMessage("pointback.message.not_payment_invalid_req"));
					throw new ReturnpException(res);
			}		
			this.accumuatePoint(paymentTransactions.get(0));
			ResponseUtil.setResponse(res, "100", this.messageUtils.getMessage("pointback.message.success_acc_ok"));
			return res;
		}catch(ReturnpException e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			res = e.getBaseResponse();
			return res;
		}catch(Exception e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			ResponseUtil.setResponse(res, "1001", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			return res;
		}
	}
	
	/* (non-Javadoc)
	 * @see com.returnp.pointback.service.interfaces.BasePointAccumulateService#accumuatePoint(com.returnp.pointback.model.PaymentTransaction)
	 */
	@Override
	public void accumuatePoint(PaymentTransaction transaction) throws ReturnpException {
	ReturnpBaseResponse res = new ReturnpBaseResponse();
		try {
			/*정책 조회*/
			Policy policy = new Policy();
			ArrayList<Policy> policies = this.pointBackMapper.findPolicies(policy);
			policy = policies.get(policies.size() -1 );
			
			/*
			 * 유일한 1개의 SoleDist 검색
			 * 관련 노드가 존재하지 않을 경우 Default 로 SoleDist(총판)에게 분배  
			 * */
			ArrayList<SoleDist> soleDistList = this.pointBackMapper.findSoleDists(new SoleDist());
			SoleDist defaultSoleDist = null;
			if (soleDistList .size() >= 0) {
				defaultSoleDist  = soleDistList.get(0);
			}
			
			OuterPointBackTarget outerTarget = new OuterPointBackTarget();
			outerTarget.setMemberNo(transaction.getMemberNo());
			outerTarget = this.findOuterPointBackTarget(outerTarget);
			
			if (outerTarget == null) {
				ResponseUtil.setResponse(res, "10020", this.messageUtils.getMessage("pointback.message.cant_searching_outer_node"));
				throw new ReturnpException(res);
			}
			
			/*
			 * 소비자 포인트 적립 
			 * */
			if (outerTarget.getMemberNo() != null) {
				increasePoint(
					transaction,
					outerTarget.getMemberNo(), 
					outerTarget.getMemberNo(), 
					AppConstants.NodeType.MEMBER, 
					"member",  
					policy.getCustomerComm()
				); 
			}
			
			/* 
			 * 소비자의 1대 추천인 포인트 적립
			 * */
			if (outerTarget.getFirstRecommenderMemberNo() != null) {
				increasePoint(
					transaction,
					outerTarget.getFirstRecommenderMemberNo(), 
					outerTarget.getFirstRecommenderMemberNo(), 
					AppConstants.NodeType.RECOMMENDER, 
					"recommender",  
					policy.getCustomerRecCom()
				); 
			}else {
				if (defaultSoleDist != null) {
						increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getCustomerRecCom()
					); 
				}
			}
			
			/* 
			 * 소비자의 2대 추천인 포인트 적립
			 * */
			if (outerTarget.getSecondRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					outerTarget.getSecondRecommenderMemberNo(), 
					outerTarget.getSecondRecommenderMemberNo(), 
					AppConstants.NodeType.RECOMMENDER, "recommender",  
					policy.getCustomerRecManagerComm()
				); 
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getCustomerRecManagerComm()
					); 
				}
			}
			
			/* 
			 * Inner Node 적립(협력업체, 협력업체 추천인, 추천인의 영업 관리자, 대리점, 지사 총판)
			 * */
			
			InnerPointBackTarget innerTarget = this.findInnerPointBackTarget(transaction.getAffiliateSerial());
			Affiliate targetAffiliate = this.affiliateMapper.selectBySerial(transaction.getAffiliateSerial());
			float affiliateComm =  targetAffiliate.getAffiliateComm() > 0 ?  targetAffiliate.getAffiliateComm()  : policy.getAffiliateComm();
			
			/*
			 * 가맹점 포인트 적립
			 * */
			if (innerTarget.getAffiliateNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getAffiliateMemberNo(),
					innerTarget.getAffiliateNo(), 
					AppConstants.NodeType.AFFILIATE, "affiliate", 
					affiliateComm
				); 
			}
			
			/*
			 * 가맹점의 1대 추천인 포인트 적립
			 * */
			if (innerTarget.getAffiliateFirstRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getAffiliateFirstRecommenderMemberNo(),
					innerTarget.getAffiliateFirstRecommenderMemberNo(),
					AppConstants.NodeType.RECOMMENDER, 
					"recommender",
					policy.getAffiliateRecComm()
				); 
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAffiliateRecComm()
					); 
				}
			}
			
			/*
			 * 가맹점의 2대 추천인 포인트 적립
			 * */
			if (innerTarget.getAffiliateSecondRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getAffiliateSecondRecommenderMemberNo(), 
					innerTarget.getAffiliateSecondRecommenderMemberNo(),
					AppConstants.NodeType.RECOMMENDER, "recommender", 
					policy.getAffiliateRecManagerComm()
					); 
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAffiliateRecManagerComm()
					); 
				}
			}
			
			/*
			 * 대리점 포인트 적립
			 * */
			if (innerTarget.getAgencyNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getAgencyMemberNo(), 
					innerTarget.getAgencyNo(), 
					AppConstants.NodeType.AGENCY, 
					"agency",  
					policy.getAgancyComm()
					); 
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAffiliateRecManagerComm()
					); 
				}
			}
			
			/*
			 * 대리점의 1대 추천인 포인트 지급
			 * */
			if (innerTarget.getAgencyFirstRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getAgencyFirstRecommenderMemberNo(), 
					innerTarget.getAgencyFirstRecommenderMemberNo(), 
					AppConstants.NodeType.RECOMMENDER, 
					"recommender", 
					policy.getAgancyRecComm()
					); 
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAgancyRecComm()
					); 
				}
			}
			
			/*
			 * 대리점의 2대 추천인 포인트 지급
			 * */
			if (innerTarget.getAgencySecondRecommenderMemberNo() != null) {
				increasePoint(
					transaction,
					innerTarget.getAgencySecondRecommenderMemberNo(),
					innerTarget.getAgencySecondRecommenderMemberNo(),
					AppConstants.NodeType.RECOMMENDER,
					"recommender", 
					policy.getAgancyRecManagerComm()
					);
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAgancyRecManagerComm()
					);
				}
			}
			
			/*
			 * 지사 포인트 적립 
			 * */
			if (innerTarget.getBranchNo() != null) {
				increasePoint(
					transaction,
					innerTarget.getBranchMemberNo(),
					innerTarget.getBranchNo(),
					AppConstants.NodeType.BRANCH, 
					"branch",  
					policy.getBranchComm()
				);
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAffiliateRecManagerComm()
					); 
				}
			}
			
			/*
			 * 지사1의 1대 추천인 포인트 적립
			 * */
			if (innerTarget.getBranchFirstRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getBranchFirstRecommenderMemberNo()
					, innerTarget.getBranchFirstRecommenderMemberNo(), 
					AppConstants.NodeType.RECOMMENDER, 
					"recommender", 
					policy.getBranchRecComm()
				);
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getBranchRecComm()
					);
				}
			}
			
			/*
			 * 지사의 2대 추천인 포인트 적립
			 * */
			if (innerTarget.getBranchSecondRecommenderMemberNo() != null) {
				increasePoint(
					transaction, 
					innerTarget.getBranchSecondRecommenderMemberNo(), 
					innerTarget.getBranchSecondRecommenderMemberNo(),
					AppConstants.NodeType.RECOMMENDER, 
					"recommender",  
					policy.getBranchRecManagerComm()
				);
				
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getBranchRecManagerComm()
					);
				}
			}
			
			/*
			 * 총판 포인트 적립
			 * */
			if (innerTarget.getSoleDistNo() != null) {
				increasePoint(
					transaction,
					innerTarget.getSoleDistMemberNo(), 
					innerTarget.getSoleDistNo(), 
					AppConstants.NodeType.SOLE_DIST, "sole_dist", 
					policy.getSoleDistComm()
				);
			}else {
				if (defaultSoleDist != null) {
					increasePoint(
						transaction,
						defaultSoleDist.getMemberNo(), 
						defaultSoleDist.getSoleDistNo(), 
						AppConstants.NodeType.SOLE_DIST, 
						"sole_dist",  
						policy.getAffiliateRecManagerComm()
					); 
				}
			}
			
			transaction.setPointBackStatus(AppConstants.AccumulateStatus.POINTBACK_COMPLETE  );
			this.paymentTransactionMapper.updateByPrimaryKey(transaction);
	
		}catch(ReturnpException e) {
			throw e;
		}catch(Exception e2) {
			e2.printStackTrace();
			ResponseUtil.setResponse(res, "9000", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			throw new ReturnpException(res);
		}
	}

	@Override
	public void  increasePoint( PaymentTransaction transaction, int memberNo, int nodeNo, String nodeType, String nodeTypeName, float accRate) 
			throws ReturnpException {
		try {
			/* G Point 증가 업데이트 */
			GreenPoint point =  new GreenPoint();
			ArrayList<GreenPoint> greenPoints = null;

			point.setMemberNo(memberNo);
			point.setNodeType(nodeType);

			if (nodeType.equals(AppConstants.NodeType.RECOMMENDER)) {
				greenPoints = this.pointBackMapper.findGreenPoints(point);
				point = greenPoints == null || greenPoints.size() < 1 ? this.createRecommenderRPoint(memberNo) : greenPoints.get(0);
			}else {
				point = this.pointBackMapper.findGreenPoints(point).get(0);
			}

			point.setNodeNo(nodeNo);
			point.setNodeTypeName(nodeTypeName);
			point.setPointAmount(point.getPointAmount() + (transaction.getPaymentApprovalAmount() * accRate));
			this.greenPointMapper.updateByPrimaryKey(point);

			/* G Point 적립 내역 저장*/
			PaymentPointbackRecord pointBackRecord = new PaymentPointbackRecord();
			pointBackRecord.setPaymentTransactionNo(transaction.getPaymentTransactionNo());
			pointBackRecord.setMemberNo(memberNo);
			pointBackRecord.setNodeNo(nodeNo);
			pointBackRecord.setNodeType(nodeType);
			pointBackRecord.setAccRate(accRate);
			pointBackRecord.setPointbackAmount(transaction.getPaymentApprovalAmount() * accRate);
			paymentPointbackRecordMapper.insert(pointBackRecord);
		} catch (Exception e) {
			e.printStackTrace();
			ReturnpBaseResponse res = new ReturnpBaseResponse();
			ResponseUtil.setResponse(res, "9000", this.messageUtils.getMessage("pointback.message.inner_server_error"));
			throw new ReturnpException(res);
		}
	}

	
	@Override
	public void restorePoint(DataMap dataMap) throws ReturnpException {
		ReturnpBaseResponse res = new ReturnpBaseResponse();
		PaymentTransaction pt = new PaymentTransaction();
		pt.setPaymentApprovalNumber(dataMap.getStr("pan"));
		
		ArrayList<PaymentTransaction>  ptList = this.pointBackMapper.findPaymentTransactions(pt);
		
		if (ptList == null || ptList.size() != 1) {
			ResponseUtil.setResponse(res, "10020", this.messageUtils.getMessage("pointback.message.not_existed_payment"));
			throw new ReturnpException(res);
		}
		
		PaymentPointbackRecord ppb = new PaymentPointbackRecord();
		ppb.setPaymentTransactionNo(ptList.get(0).getPaymentTransactionNo());
		ArrayList<PaymentPointbackRecord> ppbList = this.pointBackMapper.findPaymentPointbackRecords(ppb);
		if (ppbList.size() <  1) return;
		
		/* 결제 내역 생성 */
		PaymentTransaction transaction = this.createPaymentTransaction(dataMap);

		PaymentPointbackRecord record = null;	
		ArrayList<GreenPoint> rPoints = null;
		GreenPoint rPoint = null;
		for (PaymentPointbackRecord pointbackRecord : ppbList) {
			/* R Point 차감 */
			rPoint =  new GreenPoint();
			rPoint.setMemberNo(pointbackRecord.getMemberNo());
			rPoint.setNodeType(pointbackRecord.getNodeType());
			rPoint.setNodeNo(pointbackRecord.getNodeNo());
			
			rPoints  = this.pointBackMapper.findGreenPoints(rPoint);
			if (rPoints.size() != 1) {
			/*	System.out.println("갯수 : " +  rPoints.size() );
				System.out.println("멤버 번호 : " + pointbackRecord.getMemberNo() );
				System.out.println("노드 번호: " + pointbackRecord.getNodeNo() );
				System.out.println("노드 타입 : " + pointbackRecord.getNodeType() );*/
				continue;
			}
			
			rPoint = rPoints.get(0);
			rPoint.setPointAmount(rPoint.getPointAmount() - pointbackRecord.getPointbackAmount());
			this.greenPointMapper.updateByPrimaryKey(rPoint);
			
			/* R Point  차감 내역 생성 */ 
			record = new PaymentPointbackRecord();
			record.setPaymentTransactionNo(transaction.getPaymentTransactionNo());
			record.setMemberNo(pointbackRecord.getMemberNo());
			record.setNodeNo(record.getNodeNo());
			record.setNodeType(pointbackRecord.getNodeType());
			record.setAccRate(pointbackRecord.getAccRate());
			record.setPointbackAmount(transaction.getPaymentApprovalAmount() * pointbackRecord.getAccRate() * -1);
			paymentPointbackRecordMapper.insert(record);
		}
		
		transaction.setPointBackStatus(AppConstants.AccumulateStatus.POINTBACK_CANCEL_COMPLETE);
		this.paymentTransactionMapper.updateByPrimaryKey(transaction);
	}
	
	@Override
	public GreenPoint createRecommenderRPoint(int memberNo) {
		/* 추천인용 Green Point 생성*/
		GreenPoint greenPoint = new GreenPoint();
		greenPoint.setMemberNo(memberNo);
		greenPoint.setNodeNo(memberNo);
		greenPoint.setNodeType(AppConstants.NodeType.RECOMMENDER);
		greenPoint.setPointAmount((float)0);
		greenPoint.setNodeTypeName("recommender");
		this.greenPointMapper.insert(greenPoint);
		return greenPoint;
	}
	
	@Override
	public PointBackTarget findInnerPointBackFindTarget(PointBackTarget target) {
		return this.pointBackMapper.findInnerPointBackFindTarget(target);
	}
	
	@Override
	public OuterPointBackTarget findOuterPointBackTarget(OuterPointBackTarget target) {
		return this.pointBackMapper.findOuterPointBackTarget(target);
	}
	
	@Override
	public InnerPointBackTarget findInnerPointBackTarget(String affiliateSerial) {
		return this.pointBackMapper.findInnerPointBackTarget(affiliateSerial);
	}

	@Override
	public DataMap convertPaymentTransactionToDataMap(PaymentTransaction pt) {
		DataMap dataMap = new DataMap();
		dataMap.put("qr_org", pt.getOrgPaymentData());
		dataMap.put("pam",pt.getPaymentApprovalAmount());
		
		dataMap.put("pas", pt.getPaymentApprovalStatus());
		
		dataMap.put("pat", (pt.getPaymentApprovalDateTime() == null ? new Date(): pt.getPaymentApprovalDateTime()));
		dataMap.put("pan", pt.getPaymentApprovalNumber());
		dataMap.put("af_id", pt.getAffiliateSerial());
		dataMap.put("phoneNumber", pt.getMemberPhone());

		dataMap.put("memberEmail", pt.getMemberEmail());
		dataMap.put("payment_transaction_type", AppConstants.PaymentTransactionType.MANUAL);
		return dataMap;
	}
}
