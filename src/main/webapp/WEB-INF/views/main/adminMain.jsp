<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:authentication var="user" property="principal" />
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Expires" content="-1"> 
  <meta http-equiv="Pragma" content="no-cache"> 
<META http-equiv="Expires" content="-1"> 
<META http-equiv="Pragma" content="no-cache"> 
<META http-equiv="Cache-Control" content="No-Cache"> 

  <title>ReturnP Admin</title>
  <link rel="stylesheet" type="text/css" href="resources/js/lib/easyui/themes/bootstrap/easyui.css">	
  <link rel="stylesheet" type="text/css" href="resources/js/lib/easyui/themes/icon.css">
  <link rel="stylesheet" type="text/css" href="resources/js/lib/easyui/themes/color.css">
  <link rel="stylesheet" type="text/css" href="resources/js/lib/easyui/texteditor.css">
  <link rel="stylesheet" type="text/css" href="resources/css/default.css">
<!--   <link type="text/css" rel="stylesheet" href="resources/css/font-awesome.min.css"> -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
  <script type="text/javascript" src="resources/js/lib/jquery.min.js"></script>
  <script type="text/javascript" src="resources/js/lib/easyui/jquery.easyui.min.js"></script>
  <script type="text/javascript" src="resources/js/lib/jquery-number.js"></script>
  <script type="text/javascript" src="resources/js/lib/easyui/jquery.portal.js"></script>
  <script type="text/javascript" src="resources/js/lib/easyui/jquery.texteditor.js"></script>
  <script type="text/javascript" src="resources/js/lib/easyui/datagrid-cellediting.js"></script>
<script type="text/javascript" src="resources/js/lib/easyui/datagrid-export.js"></script>
<!-- <script type="text/javascript" src="resources/js/lib/easyui/datagrid-cellediting.js"></script> -->
  <script type="text/javascript" src="resources/js/returnp.js"></script>
  <script type="text/javascript" src="resources/js/returnpCommon.js"></script>
  <script type="text/javascript" src="resources/js/returnPHelper.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB-bv2uR929DOUO8vqMTkjLI_E6QCDofb4"></script>		
  
<!-- chart -->
  <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/boost.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<link rel="stylesheet" type="text/css" href="https://www.highcharts.com/media/com_demo/css/highslide.css" />
</head>
<style>

	/* .datagrid-row{
    	height:30px;
	} */
	
	* {
		font-family: "Malgun Gothic", dotum", serif;
	}
	#progress_loading
	{
	 position: absolute;
	 left: 50%;
	 top: 45%;
	 border : 1px solid #444444;
	 padding : 5px 5px;
	 background: #ffffff;
	 z-index : 10000000000
	}

	.datagrid-header .datagrid-cell{
        font-family : '돋움''
    }
  .datagrid-cell{
     font-family : '맑은 고딕''
  }
</style>
<body class="dashboard">
    <div class="container easyui-layout"  style="width:100%">
    	<!-- <form id = "logOutForm" method="post" action="/j_spring_security_logout"> -->
    	<form id = "logOutForm" method="post" action="/logout"> 
        		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        <div data-options="region:'north',border : true" style="height:30px;" >
        	<span style = "position: absolute;left : 15px;top:6px;display :none;font-weight : bold" id = "returnp_noti_membership">
        		<i class = "fa fa-exclamation-circle" style = "color : red"></i>
        		&nbsp;<span style="color: white;font-size:9pt; background-color:red;padding:2px 3px;border-radius: 5px;" >정회원 고객 입금 확인 요청</span>&nbsp;&nbsp;정회원 신청 관리 메뉴에서 확인해주세요 </span>
        	<div style="position: absolute;right : 0px;margin-top:6px;margin-right:25px" class ="member-panel">
        		<span style ="border-radius: 5px;background-color:green;padding: 3px;padding-left: 5px;padding-right: 5px;color : #ffffff; font-weight: bold">${adminTypeStr}</span>
        		<span style ="font-weight: bold">${loginName}</span>
        		<!-- <a href ="#" id = "pass_chn_btn"   style ="margin-left : 30px;font-weight: bold">PASSWORD</a> -->
        		
					<a href ="javascript:document.all.logOutForm.submit();" style ="margin-left : 10px;font-weight: bold">LOGOUT</a>
				
			</div>
        </div>
        </form>
        <div data-options="region:'south',split:false" style="height:1px;"></div>
        <div data-options="region:'west',split:true" title="&nbsp;ReturnP Control Panel " style="width:270px;padding:5px;">
        <ul id="submenu_tree" class="easyui-tree,">
            <li>
                <span><span style = "font-weight : bold">RETURN POINT</span></span>
                <ul>
                	 <li>
                        <span>
                        	<span is = "site_admin" class="sub_menu " menu_deps= '1'  style = "font-weight : bold">운영자 패널</span>
                        </span>
                        <ul>
                            <li class = "A manage" id = "dashBoard"  data-options = "iconCls :'icon-info'">
                            	<span  class = "A manage" style = "font-weight : bold">대쉬 보드</span>
                            	<ul>
		                            <li class = "A_1 manage"  id = "dashBoard"  data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "dashBoard"  menu_deps= '2' >
		                            		<span style = "font-weight : bold">대쉬 보드</span>
		                            	</a> 
		                            </li>
		                             <li class = "A_2 manage" data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "managePolicy"  menu_deps= '2' >
		                            	<span style = "font-weight : bold">R 포인트 정책</span></a> 
		                            </li>
		                        </ul>
                            </li>
                            
                             <li class = "B manage"  data-options = "iconCls :'icon-info'">
                            	 <span  class = "B manage" style = "font-weight : bold">조직 관리</span>
		                         <ul>
			                         <li class = "B_1 manage"  id = "manageSoleDist"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageSoleDist"  node = "7"  menu_deps= '2' >
	                        		<span style = "font-weight : bold">총판(7)</span></a> 
		                        	</li>
		                        	
		                        	<li class = "B_2 manage" id= "manageBranch"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageBranch"  node = "3"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">지사(3)</span></a> 
		                        	</li>
		                        	
		                        	<li class = "B_3 manage"  id = "manageAgency"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageAgency"  node = "4"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">대리점(4)</span></a> 
		                        	</li>
		
		                        	<li class = "B_4 manage" id = "manageAffiliate"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageAffiliate"  node = "5"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">협력업체(5)</span></a> 
		                        	</li>
		
		
		                        	<li class = "B_6 manage"  id = "manageMember" data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageMember"  node = "1"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">일반회원(1)</span></a> 
		                        	</li>

		                        	<li class = "B_7 manage"  id = "manageRecommender"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageRecommender"  node = "2"  menu_deps= '2' >
		                        		<span style = "font-weight : bold;">정회원(2) </span></a> 
		                        	</li>
		                        	<li class = "B_8 manage" id = "manageSaleManager"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageSaleManager"  node = "6"  menu_deps= '2' >
		                        		<span style = "font-weight : bold;"> 영업 관리자(6)</span></a> 
		                        	</li>
		                        </ul>
                            </li>
                            
                                <li class = "C manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "C manage"  style = "font-weight : bold">포인트 관리</span>
		                         <ul>
		                         	<li class = "C_1 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageTotalGreenPoint"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">통합 포인트 조회</span>
					                   	</a>
					                    </li>
					                    
			                         <li class = "C_2 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageGreenPoint"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">G 포인트 관리</span>
					                   	</a>
					                    </li>
					                   <li class = "C_3 manage" id = "manageRedPoint"  data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageRedPoint"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">R 포인트 관리</span>
					                   	</a> 
					                   </li> 
					                   	<li class = "C_4 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageSalesPoint"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">포인트 관리 기능 </span>
					                   	</a>
					                    </li>
		                        </ul>
                            </li> 
                            
                                <li class = "Q manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "C manage"  style = "font-weight : bold">쇼핑몰 관리</span>
		                         <ul>
		                         	<li class = "Q_1 manage" id = "manageMaskOrder" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageMaskOrder"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">마스크 주문 관리</span>
					                   	</a>
					                  </li>
		                        </ul>
                            </li> 
                            
                             <li class = "Q manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "C manage"  style = "font-weight : bold">캐피탈 프로그램 관리</span>
		                         <ul>
		                         	<li class = "Q_1 manage" id = "manageCapitalProduct" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageCapitalProduct"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">캐피탈 프로그램 등록</span>
					                   	</a>
					                  </li>
					                  
					                  <li class = "Q_1 manage" id = "manageMaskOrder" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageMaskOrder"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">캐피탈 포인트</span>
					                   	</a>
					                  </li>
					                  
					                   <li class = "Q_1 manage" id = "manageMaskOrder" data-options = "iconCls :'icon-info'">
					                   	<a class= "sub_menu"  view_req_name = "manageMaskOrder"  menu_deps= '2' >
					                   		<span style = "font-weight : bold">캐피탈 포인트 출금</span>
					                   	</a>
					                  </li>
					                  
		                        </ul>
                            </li> 
                            
                              <li class = "D manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "D manage" style = "font-weight : bold">사이트 관리</span>
		                         <ul>
                          			
                          		     <li class = "D_5 manage"  id = "manageAffilaiteContent" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageAffiliateContent" menu_deps= '2' >
   											<span style = "font-weight : bold">협력업체 정보 관리 </span>
   										</a> 
   									</li>
   									
                          			 <li class = "D_1 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageCategory" menu_deps= '2' >
   											<span style = "font-weight : bold">카테고리 관리</span>
   										</a> 
   									</li>
   									
                          			  <li class = "D_2 manage"  id = "manageNoticeBoard" data-options = "iconCls :'icon-info'">
                          			  	<a class= "sub_menu"  view_req_name = "manageNoticeBoard" menu_deps= '2' >
                          			  	<span style = "font-weight : bold">공지 관리</span>
                          			  	</a> 
                          			  </li>
                          			   <li class = "D_3 manage" id = "manageNoticeBoard" data-options = "iconCls :'icon-info'">
                          			  	<a class= "sub_menu"  view_req_name = "manageFaqBoard" menu_deps= '2' >
                          			  	<span style = "font-weight : bold">FAQ 관리</span>
                          			  	</a> 
                          			  </li>
                            		   <li class = "D_4 manage" id = "managePartnerBoard" data-options = "iconCls :'icon-info'">
                            		  	<a class= "sub_menu"  view_req_name = "managePartnerBoard" menu_deps= '2' >
                            		  		<span style = "font-weight : bold">일반 / 제휴 문의 관리</span>
                            		  	</a> 
                            		  </li>
                            		  
                            		    <li class = "D_5 manage" id = "manageAffiliationRequest" data-options = "iconCls :'icon-info'">
                            		  	<a class= "sub_menu"  view_req_name = "manageAffiliationRequest" menu_deps= '2' >
                            		  		<span style = "font-weight : bold">가맹 신청 관리</span>
                            		  	</a> 
                            		  </li>
                            		  
                            		  </ul>
                            </li>
                      
                            <li class = "E manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "E manage"  style = "font-weight : bold">통계 및 리포트</span>
		                         <ul>
   									<li class = "E_1 manage" id = "manageSalesReport" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageSalesReport" menu_deps= '2' >
   											<span style = "font-weight : bold">매출 및 적립 현황</span>
   										</a> 
   									</li>
   									<li class = "E_2 manage" id = "manageSalesReport" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageRpointWithdrawalReport" menu_deps= '2' >
   											<span style = "font-weight : bold">R 포인트 출금 현황</span>
   										</a> 
   									</li>
   									<li class = "E_3 manage" id = "manageSalesReport" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageMemberReport" menu_deps= '2' >
   											<span style = "font-weight : bold">회원 현황</span>
   										</a> 
   									</li>
   									<li class = "E_4 manage" id = "manageSalesReport" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "managePointReport" menu_deps= '2' >
   											<span style = "font-weight : bold">G 포인트 현황</span>
   										</a> 
   									</li>
   									<li class = "E_5 manage" id = "manageSalesReport" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageGiftReport" menu_deps= '2' >
   											<span style = "font-weight : bold">상품권 현황</span>
   										</a> 
   									</li>
		                        </ul>
                            </li>     
                               <li class = "F manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "F manage" style = "font-weight : bold">포인트 결제 관리</span>
		                         <ul>
   									<li class = "F_1 manage" id = "manageGpointPayment" data-options = "iconCls :'icon-info'">
   										<a class= "sub_menu"  view_req_name = "manageGpointPayment" menu_deps= '2' >
   											<span style = "font-weight : bold">G 포인트 결제 관리</span>
   										</a> 
   									</li>
		                        </ul>
                            </li>    
                            
                            
                              <li class = "G manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "G manage" style = "font-weight : bold">매출 관리 및 조회</span>
		                         <ul>
		                             <li  class = "G_1 manage" id = "managePosPayment" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePaymentTransaction" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">세부 매출 조회</span>
		                            	</a> 
		                            </li>
		                             <li class = "G_2 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePaymentTransaction" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">결제 및 매출 관리</span>
		                            	</a> 
		                            </li>

		                            <li class = "G_3 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "manageOverlapPaymentTransaction" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">중복 결제</span>
		                            	</a> 
		                            </li>
		                            <li class = "G_4 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "manageAffiliateSale" menu_deps= '2' >
		                            		<span style = "font-weight : bold">협력업체별 매출 조회</span>
		                            	</a> 
		                            </li>
		                            
		                            <li class = "G_5 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePaymentPointbackRecord" menu_deps= '2' >
		                            		<span style = "font-weight : bold">결제별 R 포인트 적립 내역</span>
		                            	</a> 
		                            </li>
		                          	<li class = "G_6 manage"  data-options = "iconCls :'icon-manage'">
		                          		<a class= "sub_menu"  view_req_name = "manualPosPaymentRegister" menu_deps= '2' >
		                          			<span style = "font-weight : bold">매출 수동 등록</span>
		                          		</a>
		                          	</li>
		                          	 
		                          	 <li class = "G_7 manage"  data-options = "iconCls :'icon-manage'">
		                          		<a class= "sub_menu"  view_req_name = "manageFileUpload" menu_deps= '2' >
		                          			<span style = "font-weight : bold">매출 파일 등록 </span>
		                          		</a>
		                          	</li>
				                </ul>
                            </li> 
                 				
                 			 <li class = "S manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "S manage" style = "font-weight : bold">영수증 적립 자체 관리 ver 2</span>
		                         <ul>
		                        <!--      <li  class = "S_1 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCouponIssue" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 코드 생성</span>
		                            	</a> 
		                            </li> -->
		                            
		                            <li  class = "S_2 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCodeIssueRequest" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 코드 발행요청 관리</span>
		                            	</a> 
		                            </li>
		                            
		                            <li  class = "S_3 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCodeIssue" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 코드 발행 관리 </span>
		                            	</a> 
		                            </li>
									 <li  class = "S_4 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCodeTransaction" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 코드 적립 관리 </span>
		                            	</a> 
		                            </li>
		                            		                            
				                </ul>
                            </li> 
                            
                 			<li class = "R manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "R manage" style = "font-weight : bold">결제 영수증 매출 관리</span>
		                         <ul>
		                                <li  class = "R_1 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCouponIssue" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 적립 코드 생성</span>
		                            	</a> 
		                            </li>
		                            
		                             <li  class = "R_2 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "manageIssuedPointCoupon" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 적립 코드 관리</span>
		                            	</a> 
		                            </li>
		                            
		                             <li  class = "R_3 manage" id = "" data-options = "iconCls :'icon-info'">
		                            	<a class= "sub_menu"  view_req_name = "managePointCouponTransaction" menu_deps= '2' >
		                            		<span style = "font-weight : bold; ">포인트 적립 쿠폰 적립 관리</span>
		                            	</a> 
		                            </li>
		                            
				                </ul>
                            </li> 
                            
                               <li class = "H manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "H manage"  style = "font-weight : bold">푸시 및 메일링 서비스</span>
		                         <ul>
   									<li class = "H_1 manage" id = "managePush"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "managePush"  node = "5"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">디바이스 PUSH </span>
		                        	</li>
		                        	<li class = "H_2 manage" id = "manageSms"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageSms"  node = "5"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">SMS/MMS </span></a> 
		                        	</li>
		                        	
		                        	<li class = "H_3 manage" id = "manageEmailing"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageEmailing"  node = "5"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">EMAIL</span></a> 
		                        	</li>
		                        </ul>
                            </li>  
                            
                            
                             <li class = "I manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "I manage"  style = "font-weight : bold">정회원 신청 관리</span>
		                         <ul>
		                         	<li class = "I_1 manage" id = "manageMembershipRequest"  data-options = "iconCls :'icon-info'">
		                         		<a class= "sub_menu"  view_req_name = "manageMembershipRequest"  menu_deps= '2' >
		                         			<span style = "font-weight : bold">정회원 신청 관리</span>
		                         		</a> 
		                         	</li>
		                        </ul>
                            </li>
                            
                             <li class = "J manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "J manage" style = "font-weight : bold">G, R 포인트 적립 현황</span>
		                         <ul>
		                         	<li class = "J_1 manage" id = "manageConvertPointRequest" data-options = "iconCls :'icon-info'">
		                         		<a class= "sub_menu"  view_req_name = "manageConvertPointRequest"  menu_deps= '2' >
		                         			<span style = "font-weight : bold">R-G  포인트 적립요청 관리</span>
		                         		</a> 
		                         	</li>
                            		<li class = "J_2 manage" id = "managePointConversionTransaction" data-options = "iconCls :'icon-info'">
                            			<a class= "sub_menu"  view_req_name = "managePointConversionTransaction"  menu_deps= '2' >
                            				<span style = "font-weight : bold">R 포인트  자동전환 관리</span>
                            			</a> 
                            		</li>
                            		
                           		 <!-- 	<li class = "J_2 manage" id = "managePointConversionTransaction2" data-options = "iconCls :'icon-info'">
                            			<a class= "sub_menu"  view_req_name = "managePointConversionTransaction2"  menu_deps= '2' >
                            				<span style = "font-weight : bold">기존 R 포인트 전환 관리</span>
                            			</a> 
                            		</li> -->
                            		
		                        </ul>
                            </li>
                            
                            
                             <li class = "K manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "K manage" style = "font-weight : bold">포인트 출금 관리</span>
		                         <ul>
			                          <li class = "K_1 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
				                          	<a class= "sub_menu"  view_req_name = "manageMemberBanckAccount"  menu_deps= '2' >
				                          		<span style = "font-weight : bold">은행 계좌 관리</span>
				                          	</a> 
			                          	</li>
                            			<li class = "K_2 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "managePointWithdrawal"  menu_deps= '2' >
                            					<span style = "font-weight : bold"><!-- <i class="fas fa-registered" style = "font-size: 14px;color:red"></i> --> R 포인트  출금 관리 </span>
                            				</a> 
                            			</li>
		                        </ul>
                            </li>  
                            
                             <li class = "L manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "L manage" style = "font-weight : bold">포인트 사용 관리</span>
		                         <ul>
			                          <li class = "L_1 manage" id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
				                          	<a class= "sub_menu"  view_req_name = "manageRedPointUse"  menu_deps= '2' >
				                          		<span style = "font-weight : bold">R 포인트 사용 관리</span>
				                          	</a> 
			                          	</li>
                            			<li class = "L_2 manage "id = "manageGreenPoint" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "managePointTransfer"  menu_deps= '2' >
                            					<span style = "font-weight : bold">포인트 이체(선물) 관리</span>
                            				</a> 
                            			</li>
		                        </ul>
                            </li>   
                            
                             <li class = "M manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "M manage" style = "font-weight : bold">외부 연동 관리</span>
		                         <ul>
		                         	 <li class = "M_1 manage" id="manageApiService" data-options = "iconCls :'icon-info'">
                        			 	<a class= "sub_menu"  view_req_name = "manageApiService"  menu_deps= '2' >
                        			 		<span style = "font-weight : bold">연동 API 관리</span>
                        			 	</a> 
                        			 </li>
		                        </ul>
                            </li>
                            <li class = "N manage" data-options = "iconCls :'icon-info'">
                            	 <span class = "N manage"  style = "font-weight : bold">특수 조직 관리</span>
		                         <ul>
		                         	<li class = "N_1 manage" id = "manageMembershipRequest"  data-options = "iconCls :'icon-info'">
		                         		<a class= "sub_menu"  view_req_name = "manageMarketer"  menu_deps= '2' >
		                         			<span style = "font-weight : bold">마케팅 코드, ID 관리</span>
		                         		</a> 
		                         	</li>
		                        </ul>
                            </li>
                            
                             <li class = "O manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "O manage"  style = "font-weight : bold">자료 파일 관리</span>
		                         <ul>
                          			  <li class = "O_1 manage"  id = "manageNodeFileUpload" data-options = "iconCls :'icon-info'">
                          			  	<a class= "sub_menu"  view_req_name = "manageUploadFile" menu_deps= '2' >
                          			  	<span style = "font-weight : bold">노드 파일 업로드/관리</span>
                          			  	</a> 
                          			  </li>
                            		  <li class = "O_2 manage"  id = "managePosPayment" data-options = "iconCls :'icon-info'">
                            		  	<a class= "sub_menu"  view_req_name = "managePosPayment" menu_deps= '2' >
                            		  		<span style = "font-weight : bold">VAN 결제 내역 파일 </span>
                            		  	</a> 
                            		  </li>
		                        </ul>
                            </li>   
                            
                                       
                             <li class = "P manage" data-options = "iconCls :'icon-info'">
                            	 <span  class = "P manage"  style = "font-weight : bold">상품권 관리</span>
		                         <ul>
                            			<li class = "P_1"   id = "manageSalesOrganInfo"  class = "10 20 12">
                            				<a class= "sub_menu"  view_req_name = "manageSalesOrganInfo"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 조직 정보</span>
                            				</a> 
                            			</li>
                            			
                            		   <li class = "P_2 manage"  id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardPayment"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 현황 리포트</span>
                            				</a> 
                            			</li>
                            			<li class = "P_3 manage"  id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardPayment"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 관련 통합 조회</span>
                            				</a> 
                            			</li>
                            			<li class = "P_4 manage"   id = "manageGiftCardPolicy" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardPolicy"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 정책 관리</span>
                            				</a> 
                            			</li>
                            			
                            			<li class = "P_5 manage"  id = "manageGiftCardSalesOrgan" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardSalesOrgan"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 판매 조직 관리</span>
                            				</a> 
                            			</li>
                            			
                            			<li class = "P_6 manage"  id = "manageAffiliate"  data-options = "iconCls :'icon-info'"><a class= "sub_menu"  view_req_name = "manageAffiliate"  node = "5"  menu_deps= '2' >
		                        		<span style = "font-weight : bold">상품권 제휴점 관리</span></a> 
		                        		</li>
		                        	
                            			<li class = "P_7 manage"   id = "manageGiftCard" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCard"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 상품 관리</span>
                            				</a> 
                            			</li>
                            			
                            			<li class = "P_8 manage"   id = "manageGiftCardIssue" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardIssue"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 발행 요청</span>
                            				</a> 
                            			</li>
                            			
                            				<li  class = "P_9 manage" id = "" data-options = "iconCls :'icon-info'">
			                            				<a class= "sub_menu"  view_req_name = "manageHeadGiftOrder"  menu_deps= '2' >
			                            					<span style = "font-weight : bold;">본사 발주 관리</span>
			                            				</a> 
			                            			</li>
			                            			<li  class = "P_10 manage" id = "" data-options = "iconCls :'icon-info'">
			                            				<a class= "sub_menu"  view_req_name = "manageDistGiftOrder"  menu_deps= '2' >
			                            					<span style = "font-weight : bold;">총판 발주 관리</span>
			                            				</a> 
			                            			</li>
                            						<li class = "P_11 manage" id = "" data-options = "iconCls :'icon-info'">
			                            				<a class= "sub_menu"  view_req_name = "manageSaleOrganGiftOrder"  menu_deps= '2' >
			                            					<span style = "font-weight : bold;">판매점 발주 관리</span>
			                            				</a> 
			                            			</li>
			                            			<li class = "P_12 manage" id = "" data-options = "iconCls :'icon-info'">
			                            				<a class= "sub_menu"  view_req_name = "manageCommonGiftOrder"  menu_deps= '2' >
			                            					<span style = "font-weight : bold;">일반 발주 관리</span>
			                            				</a> 
			                            			</li>
                            			
                            			<li class = "P_13 manage"  id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageIssuedGiftCard"  menu_deps= '2' >
                            					<span style = "font-weight : bold">발행 상품권 조회</span>
                            				</a> 
                            			</li>
                            			
										<li class = "P_14 manage" id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardAccHistory"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 적립 내역 </span>
                            				</a> 
                            			</li>
                            			<li class = "P_15 manage"  id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardPayment"  menu_deps= '2' >
                            					<span style = "font-weight : bold">발행 상품권 결제 관리</span>
                            				</a> 
                            			</li>
                            			<li class = "P_16 manage"  id = "" data-options = "iconCls :'icon-info'">
                            				<a class= "sub_menu"  view_req_name = "manageGiftCardPayment"  menu_deps= '2' >
                            					<span style = "font-weight : bold">상품권 매출 통계 및 정산</span>
                            				</a> 
                            			</li>
		                        </ul>
                            </li> 
                            
                        </ul>
                    </li>
                    
                    <li class = "V manage">
                        <span>
                        	<span class="sub_menu" menu_deps= '1'  style = "font-weight : bold">시스템 관리자 패널</span>
                        </span>
                        <ul>
     						 <li data-options = "iconCls :'icon-info'">
                            	 <span  style = "font-weight : bold">서버 관리</span>
		                         <ul>
                        	   		<li data-options = "iconCls :'icon-info'">
                        	  			<a class= "sub_menu"  view_req_name = "manageBatch"  menu_deps= '2' >
                        	  				<span style = "font-weight : bold">Batch Server 관리</span>
                        	  			</a> 
                        	  		</li>
                        	   		
                        	   		<li data-options = "iconCls :'icon-info'">
                        	   			<a class= "sub_menu"  view_req_name = "dashBoard"  menu_deps= '2' >
                        	   				<span style = "font-weight : bold">Web Server</span>
                        	   			</a> 
                        	   		</li>
                        	  		<li data-options = "iconCls :'icon-info'">
                        	  			<a class= "sub_menu"  view_req_name = "dashBoard"  menu_deps= '2' >
                        	  				<span style = "font-weight : bold">Admin Server</span>
                        	  			</a> 
                        	  		</li>
                        	  		
                        	  		<li data-options = "iconCls :'icon-info'">
                        	 			<a class= "sub_menu"  view_req_name = "configVan"  menu_deps= '2' >
                        	 				<span style = "font-weight : bold">VAN Transaction Server</span>
                        	 			</a> 
                        	 		</li>
                        	  		
                        	   		<li id="manageApiService" data-options = "iconCls :'icon-info'">
                        	   			<a class= "sub_menu"  view_req_name = "dashBoard"  menu_deps= '2' >
                        	   				<span style = "font-weight : bold">API 서버</span>
                        	   				</a> 
                        	   			</li>
                        	   		<li data-options = "iconCls :'icon-info'">
                        	   			<a class= "sub_menu"  view_req_name = "dashBoard"  menu_deps= '2' >
                        	   				<span style = "font-weight : bold">Database(샤딩)</span>
                        	   			</a> 
                        	   		</li>		                         
		                        </ul>
                            </li>   
     						 <li data-options = "iconCls :'icon-info'">
                            	 <span  style = "">외부 연동 관리</span>
		                         <ul>
                        			 <li id="manageApiService" data-options = "iconCls :'icon-info'">
                        			 	<a class= "sub_menu"  view_req_name = "manageApiService"  menu_deps= '2' >
                        			 		<span style = "font-weight : bold">API , 서비스 관리</span>
                        			 	</a> 
                        			 </li>
                        	 		<li data-options = "iconCls :'icon-info'">
                        	 			<a class= "sub_menu"  view_req_name = "configVan"  menu_deps= '2' >
                        	 				<span style = "font-weight : bold">연동 클라이언트 관리</span>
                        	 			</a> 
                        	 		</li>
                        	 		<li data-options = "iconCls :'icon-info'">
                        	 			<a class= "sub_menu"  view_req_name = "configVan"  menu_deps= '2' >
                        	 				<span style = "font-weight : bold">외부 연동 API 관리</span>
                        	 			</a> 
                        	 		</li>
                        	 		<li data-options = "iconCls :'icon-info'">
                        	 			<a class= "sub_menu"  view_req_name = "configVan"  menu_deps= '2' >
                        	 				<span style = "font-weight : bold">VAN 가맹점 관리</span>
                        	 			</a> 
                        	 		</li>                         
		                        </ul>
                            </li>       
     						 <li data-options = "iconCls :'icon-info'">
                            	 <span  style = "font-weight : bold">관리자 생성 및 권한 관리</span>
		                         <ul>
                            		<li data-options = "iconCls :'icon-info'">
                            		<a class= "sub_menu"  view_req_name = "manageManager" menu_deps= '2' >
                            			<span style = "font-weight : bold">관리자 관리</span>
                            		</a> 
                            	</li>		                         
		                        </ul>
                            </li>                                                                                 
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        </div>
        <div  class="content" id="content_container"  data-options="region:'center'" title="&nbsp;&nbsp;" style="padding:5px">
        </div>
    </div>
	<div id="modal_area">
	<!-- 모달 다이얼로그 DIV  -->
	<div id = "dlgForm" style ="padding:5px;background-color : rgb(237, 237, 237)" class="modal_dialog" > </div>
	<div id = "dlgForm2" style ="padding:5px" class="modal_dialog"> </div>
	</div>
	 <!-- Progress loading bar DIV  -->
    <div id = "progress_loading">
		<img src="resources/images/progress_loading.gif"/>
	</div>
	<div id="chart_container"></div>
	<script>
	  	Array.prototype.hasValue = function(value) {
			var i;
			for (i=0; i<this.length; i++) { if (this[i] === value) return true; }
			return false;
	 	}
	  	
		var canNodeListSearchBlank = false;
		var loginType = '${authType}'
		var initMenu = "${initAuthMenu}";
		var exceptAuthMenu = "${exceptAuthMenu}";
		var organType =  "${authType}";
		var adminId = "${admin.admin.adminEmail}"
		if (organType == null || organType == ""){
			organType = "10";
		}
		var organCode;
		if (loginType != "1") {
			organCode = "${organCode}";
		}
		
		if (initMenu == 'all') {
		}else if (initMenu == '' || initMenu == null) {
			$(".manage").remove();
		}else {
			var initMenuArr = initMenu.split(",");
			var menus = []
			for (var i = 0; i < initMenuArr.length ; i++){
				var menuItem = initMenuArr[i].split("_");
				$("." + menuItem[0]).addClass(initMenuArr[i])
				menus.push("." + initMenuArr[i]);
			}
			var menuSel = menus.join(",");
			$(".manage").not(menuSel).remove();
			console.log(menuSel);
		}
		
		var exceptAuthMenuArr= exceptAuthMenu.split(",");
		for (var  i = 0; i < exceptAuthMenuArr.length; i++){
			if (exceptAuthMenuArr[i] != null &&exceptAuthMenuArr[i].trim() != ""){
				$("." + exceptAuthMenuArr[i].trim()).remove();
			}	
		}
		
		$.fn.serializeObject = function () {
		    "use strict";
		    var result = {};
		    var extend = function (i, element) {
		        var node = result[element.name];
		        if ('undefined' !== typeof node && node !== null) {
		           if ($.isArray(node)) {
		               node.push(element.value);
		           } else {
		               result[element.name] = [node, element.value];
		           }
		        } else {
		            result[element.name] = element.value;
		        }
		    };
		 
		    $.each(this.serializeArray(), extend);
		    return result;
		};
		
		$.extend($.fn.textbox.methods, {
			show: function(jq){
				return jq.each(function(){
					$(this).prev().show();
					$(this).next().show();
				})
			},
			hide: function(jq){
				return jq.each(function(){
					$(this).prev().hide();
					$(this).next().hide();
				})
			}
		})
		
		function searchDateFomatter(date){
		   	var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return y + '-' + m + '-' + d  
		}
	</script>
    <script>
   		var isAjax = false;
    
    	var selectedMenu = {};
	    var appNavigation = {deps1 : "",deps2 : "",deps3 :""};
    	
    	function loadView(menuText, viewReqName, nodeNo){
    		$.ajaxSetup({ async : true });
    		var param = {viewReqName : viewReqName};
    		var viewArr = [
    			"manageNodeFileUpload",
				"dashBoard",
				"manageApiService",
    			"managePointConversionTransaction",
    			"managePolicy",
    			"manageMembershipRequest",
    			"manageConvertPointRequest", 
    			"manageGreenPoint", 
    			"manageRedPoint", 
    			"manageSoleDist", 
    			"manageBranch",
    			"manageAgency",
    			"manageAffiliate",
    			"manageGiftCardAffiliate",
    			"manageBoard",
    			"manageRecommender",
    			"manageSaleManager",
    			"manageMember"];
    		
    		if (viewArr.hasValue(viewReqName)){
    			param.pageSize = 10;
    			param.page = 0;
    			
    			param.searchDateStart = '';
    			param.searchDateEnd = '';
    			param.searchNodeType = nodeNo;
    			param.searchNodeStaus = "0";
    			param.searchKeywordType = "0";
    			param.searchKeyword = "";
    		}
    		//console.log("loadView");
    		//console.log(param);
    		
    		param = $.param(param);
    		$('#content_container').load("/springSecurity/handleContent?" + param,
   				function(response, status, xhr) {
    			}
    		);
    	}
    	
    	function updateNavigator(){
    		var contentPanel = $('.container').layout('panel','center');
    		var naviArr = [];
    		for (var property in appNavigation){
    			if (!appNavigation[property] ) continue;
    			naviArr.push(appNavigation[property]);
    		}
    		var naviStr = naviArr.join(' > ');
    		contentPanel.panel({title :  naviStr});
    	}
    	
    	$(document).ready(function(){
    		$('#progress_loading').hide();
    	})
        .ajaxStop(function(){
        	isAjax = false;
    		$('#progress_loading').hide(); 
    	});
    	
    	$(document).ready(function(){
    		
    		$('#submenu_tree').tree({
    			onLoadSuccess : function(){
    				var initNode = $('#submenu_tree').tree('find','dashBoard');;
    				var page = sessionStorage.getItem("page");

    				if (page) {
    					if ($('#submenu_tree').tree('find',page)) {
	    					initNode = $('#submenu_tree').tree('find',page);
    					}
    				}
    			
    			},
    			animate : false,
    			lines : true,
    			onSelect : function(node){
    				if (isAjax) return;
    				var deps = $(node.target).find('.sub_menu').attr('menu_deps');
    				var menuText = $(node.text).text();
    				var menuCode = $(node.target).find(".sub_menu").attr("view_req_name");
    				var nodeNo  = $(node.target).find(".sub_menu").attr("node");
    				sessionStorage.setItem("page", menuCode );
    				switch (deps) {
    				case "1": 
    					appNavigation = {deps1 : menuText, deps2 : '', deps3:''};
    					updateNavigator();
    					break;
    				case "2": 
    					var parentNode = $('#submenu_tree').tree('getParent', node.target);
    					appNavigation['deps1'] = $(parentNode.text).text();
    					appNavigation['deps2'] = menuText;
    					updateNavigator();
    					loadView(menuText,menuCode, nodeNo); 
    					break;
    				case "3":
    					break;
    				}
    			}
    		});
    	});
    	
    	function setIntervalMembershipRequestCheck(intervalTime){
    		setInterval(function(){
    			returnp.api.call("getMembershipRequests", {searchPaymentStatus : "6"}, function(res){
    				//console.log(res);
    				if (res.resultCode  == "100") {
    					if (res.rows.length > 0) {
    						$("#returnp_noti_membership").show();
    					}else {
    						$("#returnp_noti_membership").hide();
    					}
    				}else {
    					$.messager.alert('오류 발생', res.message);
    				}
    			}, true);
    		}, intervalTime);
    	}
    </script>
</body>
</html>
