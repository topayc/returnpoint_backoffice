function viewReceiptImage(path){
	/*	var url = "/api/giftCardIssue/downQrCode?giftCardIssueNo=" + giftCardIssueNo + "&type=" + type;
		var w = window.open(path, "QR Code", "width=550, height=550, left=100, top=100"); 
		w.document.title = title;*/
		$('#receipt_img').attr("src", "");
		$('#receipt_img').attr("src", "https://www.returnp.com" +path );
		//$('#receipt_img').attr("src", "http://localhost:9090/" +path );
		$("#receipt_view").dialog({
			title : "영수증",
			modal : true,
			closable : true,
			border : 'thick',
			shadow : true,
			collapsible : false,
			minimizable : false,
			maximizable : false,
			shadow : false,
			buttons : [ {
				text : '확인',
				iconCls : 'icon-ok',
				handler : function(){
					$("#qr_code_view").dialog('close');
					$('#qr_code_no').attr("src", "");
				}
			} ]
		});
	}

function getNumber(str) {
	str = "" + str.replace(/(^\s*)|(\s*$)|,/g, ''); // trim, 콤마 제거
	return (new Number(str));
}

function pointCouponTypeFormatter(data){
	switch (data) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' + "영수증 적립" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function nullCheckFormatter(value){
	if (value) {
		return value;
	}else {
		return '-';
	}
}
function replyOkFormatter (data){
	switch (data) {
	case "Y": result = '<span style = "font-weight : bold" >' + roundLabel("답변완료", '#009933') + ' </span>'; break;
	case "N": result = '<span style = "font-weight : bold" >' + roundLabel("미답변", '#DC143C') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}



function deliveryChargeTypeFormatter (data){
	var result;
	switch (data) {
	case "condition": result ="조건부배송" ; break;
	case "free": result ="무료배송" ; break;
	case "nofree": result ="유료배송" ; break;
	default: result = "-"; break;
	}
	return result;
}

function realDepositAmountFormatter(value, row, index){
	
	switch (row.issueType) {
	case "1": result = numberFormatter(Math.round(parseInt(row.depositAmount) /11 * 10)); break;
	case "2": result = numberFormatter(row.depositAmount);break;
	default: result = "-"; break;
	}
	return result;
}

function issueStatusFormatter(value){
	switch (value) {
	case "1": result = '<span style = "font-weight : bold" >' + roundLabel("발행됨", '#04B404') + ' </span>'; break;
	case "2": result = '<span style = "font-weight : bold" >' + roundLabel("미발행", '#FF4000') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function issueTypeFormatter2(value){
	var result = "";
	switch (value) {
	case "1": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid green;color : green;padding:3px;font-size:11px"  >가맹점</span>'; break;
	case "2": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid red;color : red;padding:3px;font-size:11px"  >비가맹점</span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function shopPayTypeFormatter(value){
	var result = "";
	switch (value) {
	case "1": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid green;color : black;padding:3px;font-size:11px"  >카드결제</span>'; break;
	case "2": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid red;color : black;padding:3px;font-size:11px"  >간편결제</span>'; break;
	case "3": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid black;color : black;padding:3px;font-size:11px"  >무통장입급</span>'; break;
	case "4": result = '<span style = "font-weight : bold;border-radius: 15px;border : 1px solid blue;color : black;padding:3px;font-size:11px"  >계좌이체</span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function maskOrderStatusFormatter(value){
	var result = "";
	switch (value) {
	case "1": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: red;color : white;padding:3px;font-size:11px"  >입금확인중</span>'; break;
	case "2": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: green;color : white;padding:3px;font-size:11px"  >입금완료</span>'; break;
	case "3": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: blue;color : white;padding:3px;font-size:11px"  >배송중</span>'; break;
	case "4": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: #33cccc;color : white;padding:3px;font-size:11px"  >배송완료</span>'; break;
	case "5": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: gray;color : white;padding:3px;font-size:11px"  >주문취소</span>'; break;
	case "6": result = '<span style = "font-weight : bold;border-radius: 15px;background-color: black;color : white;padding:3px;font-size:11px"  >관리자취소</span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function maskColorFormatter(value){
}

function issueTypeFormatter(value){
	switch (value) {
	case "1": result = "영수증"; break;
	default: result = "-"; break;
	}
	return result;
}

function receiptAffiliateFomatter(value){
	if (value) {
		return value;
	}else {
		return '-';
	}
}

function pointCodeIssueUseStatusFormatter(value){
	switch (value) {
	case "1": result = '<span style = "font-weight : bold" >' + roundLabel("사용 가능", '#04B404') + ' </span>'; break;
	case "2": result = '<span style = "font-weight : bold" >' + roundLabel("사용 중지", '#FF4000') + ' </span>'; break;
	case "3": result = '<span style = "font-weight : bold" >' + roundLabel("사용 완료", '#01A9DB') + ' </span>'; break;
	case "3": result = '<span style = "font-weight : bold" >' + roundLabel("등록 취소", '#01A9DB') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}
function pointCodeIssuerequestStatusFormatter(value){
	switch (value) {
	case "1": result = '<span style = "font-weight : bold" >' + roundLabel("입금확인중", '#DF0101') + ' </span>'; break;
	case "2": result = '<span style = "font-weight : bold" >' + roundLabel("확인요청중", '#BF00FF') + ' </span>'; break;
	case "3": result = '<span style = "font-weight : bold" >' + roundLabel("입금완료", '#4000FF') + ' </span>'; break;
	case "4": result = '<span style = "font-weight : bold" >' + roundLabel("처리완료", '#04B404') + ' </span>'; break;
	case "5": result = '<span style = "font-weight : bold" >' + roundLabel("입금취소", '#FF8000') + ' </span>'; break;
	case "6": result = '<span style = "font-weight : bold" >' + roundLabel("처리불가", '#6E6E6E') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function depositStatusFormatter(value){
	switch (value) {
	case "1": result = '<span style = "font-weight : bold" >' + roundLabel("입금 확인중", '#04B404') + ' </span>'; break;
	case "2": result = '<span style = "font-weight : bold" >' + roundLabel("입금 확인 요청중", '#FF4000') + ' </span>'; break;
	case "3": result = '<span style = "font-weight : bold" >' + roundLabel("입금 완료", '#01A9DB') + ' </span>'; break;
	case "4": result = '<span style = "font-weight : bold" >' + roundLabel("입금 취소 ", '#585858') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function pointCouponUseStatusFormatter (data){
	switch (data) {
	case "1": result = '<span style = "font-weight : bold" >' + roundLabel("사용가능", '#04B404') + ' </span>'; break;
	case "2": result = '<span style = "font-weight : bold" >' + roundLabel("사용중지", '#FF4000') + ' </span>'; break;
	case "3": result = '<span style = "font-weight : bold" >' + roundLabel("사용완료", '#01A9DB') + ' </span>'; break;
	case "4": result = '<span style = "font-weight : bold" >' + roundLabel("등록해제", '#585858') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function accTargetRangeFormatter(value){
	switch (value) {
	case "1": result = "&nbsp;"+roundLabel("본인", '#0080FF'); break;
	case "2": result = "&nbsp;"+roundLabel("본인", '#0080FF') + "&nbsp;"+ roundLabel("1대", '#FF00FF');break;
	case "3": result = "&nbsp;"+roundLabel("본인", '#0080FF') + "&nbsp;"+ roundLabel("1대", '#FF00FF') + "&nbsp;"+ roundLabel("2대", '#FE2E2E'); break;
	case "10": result = "&nbsp;"+roundLabel("전체", '#2ECCFA') ; break;
	default: result = "-"; break;
	}
	return result;
}
function pointCouponDeliveryStatusFormatter (data){
	switch (data) {
	case "Y": result = '<span style = "color : green;font-weight : bold" >' + "전시됨" + ' </span>'; break;
	case "N": result = '<span style = "color : red;font-weight : bold" >' + "미전시" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function ciderPayStatusFormattter(value, row, index) {
	var result;
	if (!row.ciderPayStatus || row.ciderPayStatus == ""){
		row.ciderPayStatus = "N"
	}
	switch (row.ciderPayStatus) {
	case "Y": result = '<span style = "color : green;font-weight : bold" >' + "Y" + ' </span>'; break;
	case "N": result = '<span style = "color : red;font-weight : bold" >' + "N" + ' </span>'; break;
	}
	return result;
}

function giftCardStatusFormatter(value, row, index) {
	switch (row.giftCardStatus) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' + "정상" + ' </span>'; break;
	case "2": result = '<span style = "color : red;font-weight : bold" >' + "중지" + ' </span>'; break;
	case "3": result = '<span style = "color : #B57611;font-weight : bold" >' + "적립 중지" + ' </span>'; break;
	case "4": result = '<span style = "color : #B57611;font-weight : bold" >' + "결제 중지" + ' </span>'; break;
	case "5": result = '<span style = "color : #B57611;font-weight : bold" >' + "만료" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function bbsType1Formatter(value, row, index){
	switch (row.bbsType1) {
	case "1": result = '공지 게시판'; break;
	case "2": result = 'FAQ'; break;
	case "3": result = '일반 문의'; break;
	case "4": result = '제휴 문의'; break;
	case "5": result = '광고 문의'; break;
	case "20": result = '기타 문의'; break;
	default: result = "-"; break;
	}
	return result;
}

function bbsStatusFormatter(value, row, index){
	switch (row.status) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' +  roundLabel("전시됨", '#009933') + ' </span>'; break;
	case "2": rsult = '<span style = "color : red;font-weight : bold" >' +  roundLabel("사용가능", '#DC143C') + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}


function bbsType2Formatter(value, row, index){
	var result = "-";
	if (row.bbsType1 == '1') {
		if (row.bbsType2 == '1'){
			result  = "전체 공지";
		} else if (row.bbsType2 == '2'){
			result  = "가맹점 공지";
		} else {result  = "전체 공지" }
		
	}else if (row.bbsType1 == '2') {
		if (row.bbsType2 == "1") { result  = "회원 정보"}
		if (row.bbsType2 == "2") { result  = "포인트"}
		if (row.bbsType2 == "3") { result  = "적립"}
		if (row.bbsType2 == "4") { result  = "사용"}
		if (row.bbsType2 == "5") { result  = "상품권"}
		if (row.bbsType2 == "6") { result  = "쇼핑몰"}
		if (row.bbsType2 == "7") { result  = "가맹"}
		if (row.bbsType2 == "10") { result  = "기타"}
	}else if (row.bbsType1 == '4') {
		if (row.bbsType2 == "1") { result  = "일반 회원 문의"}
		if (row.bbsType2 == "2") { result  = "정회원 문의"}
		if (row.bbsType2 == "3") { result  = "영업 관리자 문의"}
		if (row.bbsType2 == "4") { result  = "협력업체 문의"}
		if (row.bbsType2 == "5") { result  = "대리점 문의"}
		if (row.bbsType2 == "6") { result  = "지사 문의"}
		if (row.bbsType2 == "7") { result  = "기타 일반 문의 "}
	}
	return result;
}

function refundeRatePercenFormatter(value, row, index) {
	return  (row.refundRate * 100) + "%";
}

function giftCardAccRatePercenFormatter(value, row, index) {
	return  (row.accRate * 100) + "%";
}

function refundStatusFormatter(value, row, index) {
	switch (row.refundStatus) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' + "결제 처리줌" + ' </span>'; break;
	case "2": result = '<span style = "color : red;font-weight : bold" >' + "결제 완료" + ' </span>'; break;
	case "3": result = '<span style = "color : #B57611;font-weight : bold" >' + "결제 보류" + ' </span>'; break;
	case "4": result = '<span style = "color : #B57611;font-weight : bold" >' + "사용자 취소" + ' </span>'; break;
	case "5": result = '<span style = "color : #B57611;font-weight : bold" >' + "관리자 취소" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function accableStatusFormatter(value, row, index) {
	switch (row.accableStatus) {
/*	case "Y": result = '<span style = "color : #2FA8E1;font-weight : bold" >' + "미적립" + ' </span>' ; break;
	case "N": result = '<span style = "color : #EC4664;font-weight : bold" >' + "적립 완료" + ' </span>'; break;*/
	case "Y": result = roundLabel("미 적립", '#2FA8E1') ; break;
	case "N": result = roundLabel("적립 완료", '#EC4664'); break;
	default: result = "-"; break;
	}
	return result;
}

function deliveryStatusFormatter(value, row, index) {
	switch (row.deliveryStatus) {
	case "4": result = roundLabel("배송전", '#6e6e6e') ; break;
	case "5": result = roundLabel("배송중", '#FF32B1'); break;
	case "6": result = roundLabel("배송완료", '#4AB34A'); break;
	default: result = "-"; break;
	}
	return result;
}

function payableStatusFormatter(value, row, index) {
	switch (row.payableStatus) {
	case "Y": result = roundLabel("미 결제 ", '#2FA8E1') ; break;
	case "N": result = roundLabel("결제 완료", '#EC4664'); break;
	default:
		result = "-";
		break;
	}
	return result;
}

function issueColumnKorFormatter(value) {
	var result = "";
	switch (value) {
	case "ordererPhone": result = '<span style = "font-weight : bold">주문자 핸드폰</span>'; break;
	case "ordererName": result = '<span style = "font-weight : bold">주문자 명</span>'; break;
	case "orderName": result = '<span style = "font-weight : bold">주문명</span>'; break;
	case "orderNumber": result = '<span style = "font-weight : bold">주문번호</span>'; break;
	case "giftCardIssueNo": result = '<span style = "font-weight : bold">등록번호</span>'; break;
	case "giftCardOrderNo": result = '<span style = "font-weight : bold">주문(발주)번호</span>'; break;
	case "giftCardOrderName": result = '<span style = "font-weight : bold">주문 명</span>'; break;
	case "giftCardNo": result = '<span style = "font-weight : bold">상품 번호</span>'; break;
	case "giftCardName": result = '<span style = "font-weight : bold">상품명</span>'; break;
	case "pinNumber": result = '<span style = "font-weight : bold">핀 번호</span>'; break;
	case "accableStatus": result = '<span style = "font-weight : bold">적립 가능</span>'; break;
	case "payableStatus": result = '<span style = "font-weight : bold">결제 가능</span>'; break;
	case "giftCardStatus": result = '<span style = "font-weight : bold">상품권 상태</span>'; break;
	case "giftCardType": result = '<span style = "font-weight : bold">상품권 타입</span>'; break;
	case "giftCardAmount": result = '<span style = "font-weight : bold">상품권 금액</span>'; break;
	case "giftCardSalePrice": result = '<span style = "font-weight : bold">판매 금액</span>'; break;
	case "accQrData": result = '<span style = "font-weight : bold">적립 QR 데이타</span>'; break;
	case "payQrData": result = '<span style = "font-weight : bold">결제 QR 데이타</span>'; break;
	case "accQrScanner": result = '<span style = "font-weight : bold">적립 QR 스캐너</span>'; break;
	case "accQrCodeWebPath": result = '<span style = "font-weight : bold">적립 QR Code 웹 경로</span>'; break;
	case "payQrCodeWebPath": result = '<span style = "font-weight : bold">적립 QR Code 웹 경로</span>'; break;
	case "accQrCodeFilePath": result = '<span style = "font-weight : bold">적립 QR Code 파일 경로</span>'; break;
	case "payQrCodeFilePath": result = '<span style = "font-weight : bold">적립 QR Code 파일 경오</span>'; break;
	case "payQrScanner": result = '<span style = "font-weight : bold">결제 QR 스캐너</span>'; break;
	case "accQrScanTime": result = '<span style = "font-weight : bold">적립 QR 스캔 시간</span>'; break;
	case "payQrScanTime": result = '<span style = "font-weight : bold">결제 QR 스캔 시간</span>'; break;
	case "issueTime": result = '<span style = "font-weight : bold">발행일</span>'; break;
	case "expirationTime": result = '<span style = "font-weight : bold">만료일</span>'; break;
	case "createTime": result = '<span style = "font-weight : bold">등록 시간</span>'; break;
	case "updateTime": result = '<span style = "font-weight : bold">수정 시간</span>'; break;
	case "receiverPhone": result = '<span style = "font-weight : bold">수취자 핸드폰</span>'; break;
	case "receiverName": result = '<span style = "font-weight : bold">수취자 이름</span>'; break;
	case "receiverIsMember": result = '<span style = "font-weight : bold">수취자 회원 여부</span>'; break;
	case "receiverEmail": result = '<span style = "font-weight : bold">수취자 이메일</span>'; break;
	case "receiverAddress": result = '<span style = "font-weight : bold">수취자 주소</span>'; break;
	case "deliveryMessage": result = '<span style = "font-weight : bold">배송 메세지</span>'; break;
	case "deliveryStatus": result = '<span style = "font-weight : bold">배송상태</span>'; break;
	case "deliveryNumber": result = '<span style = "font-weight : bold">송장 번호</span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function issueGridValueForamtter(name, value) {
	console.log("issueGridValueForamtter");
	switch (name) {
	case "accableStatus": value = accableStatusFormatter(null, { accableStatus : value }); break;
	case "payableStatus": value = payableStatusFormatter(null, { payableStatus : value }); break;
	case "giftCardStatus": value = giftCardStatusFormatter(null, { giftCardStatus : value }); break;
	case "giftCardType": value = giftCardTypeFormatter2(null, { giftCardType : value }); break;
	case "giftCardAmount": value = numberFormatter(value); break; 
	case "giftCardSalePrice": value = numberFormatter(value); break;
	case "accQrScanTime": value = dateFormatter(value); break;
	case "payQrScanTime": value = dateFormatter(value); break;
	case "issueTime": value = dateFormatter(value); break;
	case "expirationTime": value = dateFormatter(value); break;
	case "createTime": value = dateFormatter(value); break;
	case "updateTime": value = dateFormatter(value); break;
	}
	return value;
}

function propGridValueForamtter(name, value) {
	console.log("propGridValueForamtter");
	switch (name) {
	case "orderTotalPrice": value = numberFormatter(value); break;
	case "orderType": value = orderTypeFormatter(null, { orderType : value }, null); break; 
	case "orderStatus": value = orderStatusFormatter(null, { orderStatus : value }, null); break;
	case "issueStatus": value = issueStatusFormatter(null, { issueStatus : value }); break;
	case "bargainType": value = bargainTypeFormatter(null, { bargainType : value }); break;
	case "orderReason": value = orderReasonFormatter(null, { orderReason : value }); break;
	case "paymentStatus": value = paymentStatusFormatter(null, { paymentStatus : value }); break;
	case "paymentType": value = paymentTypeFormatter(null, { paymentType : value }); break;
	case "giftCardType": value = giftCardTypeFormatter(null, { productType : value }); break;
	case "giftCardAmount": value = numberFormatter(value); break; 
	case "giftCardSalePrice": value = numberFormatter(value); break;
	case "qty": value = numberFormatter(value); break;
	case "orderTime": value = dateFormatter(value); break;
	case "createTime": value = dateFormatter(value); break;
	case "updateTime": value = dateFormatter(value); break;
	}
	return value;
}

function giftCardTypeFormatter2(value, row, index) {
	switch (row.giftCardType) {
	case "1": result = '<span style = "color : #000000;" >' + "모바일" + ' </span>'; break;
	case "2": result = '<span style = "color : #000000;" >' + "실물" + ' </span>'; break;
	default: result = "-"; break; 
	}
	return result;
}
function giftCardTypeFormatter(value, row, index) {
	switch (row.productType) {
	case "1": result = '<span style = "color : #FF3232;font-weight : bold" >' + "모바일" + ' </span>'; break;
	case "2": result = '<span style = "color : #0A6EFF;font-weight : bold" >' + "실물" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}
function orderReasonFormatter(value, row, index) {
	switch (row.orderReason) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' + "선발주" + ' </span>'; break;
	case "2": result = '<span style = "color : red;font-weight : bold" >' + "일반 주문" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function bargainTypeFormatter(value, row, index) {
	switch (row.bargainType) {
	case "1": result = '일반 결제'; break;
	case "2": result = '신용 거래'; break;
	default: result = "-"; break;
	}
	return result;
}

function orderTypeFormatter(value, row, index) {
	switch (row.orderType) {
	case "10": result = '본사 주문'; break;
	case "11": result = '총판 주문'; break;
	case "12": result = '판매점 주문'; break;
	case "20": result = '일반 주문'; break;
	default: result = "-"; break;
	}
	return result;
}

function orderNameFormatter(value, row, index) {
	var result = row.orderName.length > 12 ? row.orderName.substring(0, 12)
			+ "..." : row.orderName
	return result;
}

function issueStatusFormatter(value, row, index) {
	switch (row.issueStatus) {
	case "1": result = '<span style = "color : red; font-weight : bold" >미발행</span>'; break;
	case "2": result = '<span style = "color : #00AFFF; font-weight : bold" >발행중</span'; break;
	case "3": result = '<span style = "color : #147814; font-weight : bold" >발행 완료</span>'; break;
	case "4": result = '<span style = "color : #8B6331; font-weight : bold" >발행 취소</span>'; break;
	default:
		result = "-";
		break;
	}
	return result;
}

function defaultAccountFormatter(value, row, index){
	var result = row.isDefault;
	if (row.isDefault == "Y") {
		result = roundLabel("주 계좌", '#B404AE');
	 
	} else if (row.isDefault == "N" || row.isDefault == null ||  row.isDefault == ""){
		result = "-";
	}
	return result;
}
function issueActionFormatter(value, row, index) {
	var result = "-"
	if (row.paymentStatus == "2" && row.issueStatus == "1") {
		result = '<input  style = ";margin-left : 3px; margin-right : 3px" type = "button" value = "발행" onclick = "issueGiftCardOrder(' + row.orderNo + ');return false;" id = "orderNo_' + row.orderNo + '"/>'; }
	return result;
}

function tidActionFormatter(value, row, index) {
	var result = "-"
	result = '<input  style = ";margin:2px" type = "button" value = "수정" onclick = "updateTid(' + row.affiliateTidNo + ',this);return false;" id = "affiliateTidNo' + row.affiliateTidNo + '"/>'; 
	return result;
}


function tidDelFormatter(value, row, index) {
	var result = "-"
	result = '<input  style = ";margin:2px" type = "button" value = "삭제" onclick = "removeTid(' + row.affiliateTidNo + ',this);return false;" id = "affiliateTidNo' + row.affiliateTidNo + '"/>'; 
	return result;
}

function bankAccountUpdateActionFormatter(value, row, index) {
	var result = "-"
	result = '<input  style = ";margin:2px" type = "button" value = "수정" onclick = "openBankUpdate(' + row.memberBankAccountNo + ',this);return false;" id = "memberBankAccountNo' + row.memberBankAccountNo + '"/>'; 
	return result;
}

function bankAccountDeleteActionFormatter(value, row, index) {
	var result = "-"
		result = '<input  style = ";margin:2px" type = "button" value = "삭제" onclick = "removeBankAccount(' + row.memberBankAccountNo + ',this);return false;" id = "memberBankAccountNo' + row.memberBankAccountNo + '"/>'; 
		return result;
}

function orderColumnKorFormatter(value) {
	var result = "";
	switch (value) {
	case "orderNo": result = '<span style = "font-weight : bold">주문 등록 번호</span>'; break;
	case "orderNumber": result = '<span style = "font-weight : bold">주문 번호</span>'; break;
	case "orderName": result = '<span style = "font-weight : bold">주문명</span>'; break;
	case "ordererId": result = '<span style = "font-weight : bold">주문자 ID</span>'; break;
	case "ordererName": result = '<span style = "font-weight : bold">주문자 이름</span>'; break;
	case "ordererPhone": result = '<span style = "font-weight : bold">주문자 핸드폰</span>'; break;
	case "ordererEmail": result = '<span style = "font-weight : bold">주문자 이메일</span>'; break;
	case "orderTotalPrice": result = '<span style = "font-weight : bold">총 가격</span>'; break;
	case "orderType": result = '<span style = "font-weight : bold">주문 타입</span>'; break;
	case "orderStatus": result = '<span style = "font-weight : bold">주문 상태</span>'; break;
	case "issueStatus": result = '<span style = "font-weight : bold">발행 상태</span>'; break;
	case "bargainType": result = '<span style = "font-weight : bold">거래 방법</span>'; break;
	case "orderReason": result = '<span style = "font-weight : bold">발주 목적</span>'; break;
	case "paymentStatus": result = '<span style = "font-weight : bold">결제 상태</span>'; break;
	case "paymentType": result = '<span style = "font-weight : bold">결제 타입</span>'; break;
	case "deliveryNumber": result = '<span style = "font-weight : bold">송장 번호</span>'; break;
	case "deliveryAddress": result = '<span style = "font-weight : bold">배송지 주소</span>'; break;
	case "deliveryMessage": result = '<span style = "font-weight : bold">배송 메시지</span>'; break;
	case "orderTime": result = '<span style = "font-weight : bold">주문 시간</span>'; break;
	case "createTime": result = '<span style = "font-weight : bold">등록 시간</span>'; break;
	case "updateTime": result = '<span style = "font-weight : bold">수정 시간</span>'; break;
	case "giftCardNo": result = '<span style = "font-weight : bold">상품 번호</span>'; break;
	case "giftCardName": result = '<span style = "font-weight : bold">상품 명</span>'; break;
	case "giftCardType": result = '<span style = "font-weight : bold">상품 타입</span>'; break;
	case "giftCardAmount": result = '<span style = "font-weight : bold">상품권 금액</span>'; break;
	case "giftCardSalePrice": result = '<span style = "font-weight : bold">상품 가격</span>'; break;
	case "qty": result = '<span style = "font-weight : bold">주문 수량</span>'; break;
	case "receiverName": result = '<span style = "font-weight : bold">수취자 이름</span>'; break;
	case "receiverPhone": result = '<span style = "font-weight : bold">수취자 핸드폰</span>'; break;
	case "receiverEmail": result = '<span style = "font-weight : bold">수취자 이메일</span>'; break;
	default:
		result = "-";
		break;
	}
	return result;
}

function orderStatusFormatter(value, row, index) {
	switch (row.orderStatus) {
	case "1": result = '주문 접수'; break;
	case "2": result = '상품 준비'; break;
	case "3": result = '상품 준비 완료'; break;
	case "4": result = '배송 준비'; break;
	case "5": result = '배송중'; break;
	case "6": result = '배송 완료'; break;
	case "7": result = '주문 처리 완료'; break;
	case "8": result = '주문 취소'; break;
	case "9": result = '관리자 주문 취소'; break;
	default:
		result = "-";
		break;
	}
	return result;
}

function roundLabel(str, color) {
	if (!color) color = "#444444";
	return '<span style = "border-radius: 15px;background-color: ' + color + ';padding: 5px;color : #ffffff;font-weight : bold;">' + str + '</span>';
}

function imageTagFormatter(value, row, index) {
	return "<img witdh = '100' height = '60' src = '" + value + "' />"
}

function linkFormatter(value, row, index) {
	return "<a href ='"+row.web+"' target = '_blank'>" + row.web + "</a>"
}

function affiliateTypeFormatter(value, row, index) {
	var affiliteTypesArr = row.affiliateType.split(",");
	var str = [];
	if (affiliteTypesArr.hasValue("A001"))
		str.push("가맹점");
	if (affiliteTypesArr.hasValue("A002"))
		str.push("제휴점");
	if (affiliteTypesArr.hasValue("A003"))
		str.push("무사업자");
	if (affiliteTypesArr.hasValue("A004"))
		str.push("온라인");
	return str.join(",");
}

function organStatusFormatter(value, row, index) {
	switch (row.organStatus) {
	case "1": result = '<span style = "color : green;font-weight : bold" >' + "정상" + ' </span>'; break;
	case "2": result = '<span style = "color : red;font-weight : bold" >' + "중지" + ' </span>'; break;
	case "3": result = '<span style = "color : black;font-weight : bold" >' + "보류" + ' </span>'; break;
	default: result = "-"; break;
	}
	return result;
}

function organAccountInfoFormatter(value, row, index) {
	return '[' + row.organBankAccountOwner + "]" + row.organBankName + "-" + row.organBankAccount;
}

function organTypeFormatter(value, row, index) {
	switch (row.authType) {
	case "10": result = '<span style = "border-radius: 10px;background-color: #B40486;padding: 5px;color : #ffffff;font-weight : bold">본 사</span>'; break;
	case "11": result = '<span style = "border-radius: 10px;background-color: green;padding: 5px;color : #ffffff;font-weight : bold">총 판</span>'; break;
	case "12": result = '<span style = "border-radius: 10px;background-color: #C2722E;padding: 5px;color : #ffffff;font-weight : bold">판매점</span>'; break;
	default: result = "-"; break;
	}
	return result;
}
function productStatusFormatter(value, row, index) {
	switch (row.giftCardSaleStatus) {
	case "1": result = '<span style = "border-radius: 10px;background-color: green;padding: 5px;color : #ffffff;font-weight : bold">판매중</span>'; break;
	case "2": result = '<span style = "border-radius: 10px;background-color: red;padding: 5px;color : #ffffff;font-weight : bold">판매중지</span>'; break;
	case "3": result = '<span style = "border-radius: 10px;background-color: #01A9DB;padding: 5px;color : #ffffff;font-weight : bold">재고 없음</span>'; break;
	default: result = "-"; break;
	}
	return result;
}
function serviceNameFormatter(value, row, index) {
	switch (row.apiService) {
	case "1": result = "쇼핑몰 연동"; break;
	case "2": result = "쇼핑몰 연동"; break;
	default: result = '-'; break;
	}
	return result;
}

function marketerStatusFormatter(value, row, index) {
	switch (row.marketerStatus) {
	case "1": result = "정상"; break;
	case "2": result = "중지"; break;
	default: result = '-'; break;
	}
	return result;
}

function serviceStatusFormatter(value, row, index) {
	switch (row.apiServiceStatus) {
	case "1": result = "승인"; break;
	case "2": result = "중지"; break;
	default: result = '-'; break;
	}
	return result;
}

function boardLevelTitleFormatter(value, row, index) {
	switch (row.boardLevel) {
	case 1:
		result = addBoldFomatter(row.boardTitle);
		break;
	// case 2: result = '<i style = "" class="fa fa-replyd">' +row.boardTitle+
	// '</i>';break;
	case 2:
		result = "&nbsp;&nbsp;ㄴ" + row.boardTitle;
		break;
	default:
		result = '-';
		break;
	}
	return result;
}

function boardReplyStatusFormatter(value, row, index) {
	switch (value) {
	case "1": result = '<i style = "color : red" class="fa fa-check-circle"> 답변 대기</i>'; break;
	case "2": result = '<i style = "color : #009900" class="fa fa-check-circle"> 답변 완료</i>'; break;
	default: result = '-'; break;
	}
	return result;
}

function withdrawalStatusFormatter(value, row, index) {
	switch (value) {
	case "1": result = '<i style = "color : #FF8200" class="fa fa-check-circle"></i> 출금 처리 중'; break;
	case "2": result = '<i style = "color : #009900" class="fa fa-check-circle"></i> 출금 완료'; break;
	case "3": result = '<i style = "color : #009900" class="fa fa-check-circle"></i> 출금 보류'; break;
	case "4": result = '<i style = "color : #009900" class="fa fa-check-circle"></i> 출금 취소 '; break;
	case "5": result = '<i style = "color : #009900" class="fa fa-check-circle"></i> 관리자 출금 취소'; break;
	}
	return result;
}

function slashFormatter(value, row, index) {
	if (value) {
		return value;
	} else {
		return "-";
	}
	return result;
}

function ynFormatter(value, row, index) {
	switch (value) {
	case "Y": result = '<i style = "color : #009900" class="fa fa-check-circle"></i>'; break;
	case "N": result = "-"; break;
	}
	return result;
}

function depositorFormatter(value, row, index) {
	var result;
	if (!value || typeof value == "undefined"  || value == '0' ){
		result= row.memberName;
	}else {
		result = value;
	}
	return result;
}

function boardLevelFormatter(value, row, index) {
	var result;
	switch (value) {
	case 1: result = '<span style = "color : #000000;" >' + "main" + ' </span>'; break;
	case 2: result = '<span style = "color : #000000" >' + "reply" + ' </span>'; break;
	}
	return result;
}

function categoryFomatter(value, row, index) {
	var result;
	switch (value) {
	case "1": result = '<span style = "color : #000000;" >' + "일반회원 관련" + ' </span>'; break;
	case "2": result = '<span style = "color : #000000" >' + "정회원 관련" + ' </span>'; break;
	case "3": result = '<span style = "color : #000000" >' + "포인트 관련" + ' </span>'; break;
	case "4": result = '<span style = "color : #000000" >' + "가맹 관련" + ' </span>'; break;
	default: result = '-'; break;
	}
	return result;
}

function boardLevelParentFormatter(value, row, index) {
	var result;
	switch (value) {
	case 0:
		result = '<span style = "color : #000000;" >' + "-" + ' </span>';
		break;
	default:
	case 2:
		result = '<span style = "color : #000000" >' + value + ' </span>';
		break;
	}
	return result;
}

function categoryStatusFormatter(value, row, index) {
	switch (value) {
	case "1":
		result = '<span style = "color : green" >' + "사용중" + ' </span>';
		break;
	case "2":
		result = '<span style = "color : red">' + "미사용" + ' </span>';
		break;
	}
	return result;
}

function sumTotalPoint(value, row, index) {
	var total = 0;
	if (row.soleDistGPoint != -1) {
		total += row.soleDistGPoint;
	}
	if (row.branchGPoint != -1) {
		total += row.branchGPoint;
	}

	if (row.agencyGPoint != -1) {
		total += row.agencyGPoint;
	}

	if (row.affiliateGPoint != -1) {
		total += row.affiliateGPoint;
	}

	if (row.memberGPoint != -1) {
		total += row.memberGPoint;
	}

	if (row.memberRPoint != -1) {
		total += row.memberRPoint;
	}

	var data = String(total);
	return '<span style = "color : blue;font-weight : bold">'
			+ (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>';
}

function greenPointTotalFormatter(value, row, index) {
	var total = 0;
	if (row.soleDistGPoint != -1) {
		total += row.soleDistGPoint;
	}
	if (row.branchGPoint != -1) {
		total += row.branchGPoint;
	}

	if (row.agencyGPoint != -1) {
		total += row.agencyGPoint;
	}

	if (row.affiliateGPoint != -1) {
		total += row.affiliateGPoint;
	}

	if (row.memberGPoint != -1) {
		total += row.memberGPoint;
	}
	var data = String(total);
	return '<span style = "color : blue;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; }

function redPointFormatter(data) {
	data = String(data);
	if (data == "-1") {
		return "<strong> - </strong>";
	} else {
		return '<span style = "color : red;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>';
	}
}

function affiliateSaleFormatter(data) {
	if (!data || typeof data == 'undefined') {
		return '<span style = "color : red;font-weight : bold"> 0 </span>';
	}
	data = String(data);
	return '<span style = "color : red;font-weight : bold">'
			+ (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>';
}

function greenPointFormatter(data) {
	data = String(data);
	if (data == "-1") {
		return "<strong> - </strong>";
	} else {
		return '<span style = "color : #000000;font-weight : bold">' + (numberGreenFormatter(data.replace( /(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'))) + '</span>';
	}
}

function numberFormatter(data) {
	data = String(data);
	return '<span style = "color : #000000;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}

function normalNumberFormatter(data) {
	data = String(data);
	return '<span style = "color : #000000;">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}

function numberGreenFormatter(data) {
	console.log(data);
	data = String(data);
	
	return '<span style = "color : #049931;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}
function addBoldFomatter(data) { 
	return '<span style = "font-weight : bold">' + data + '</span>';
}
function boldFormatter(data) {
	data = String(data);
	return '<span style = "font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}

function numberBoldFormatter(data) {
	if (!data)
		return "-";
	data = typeof data != "String" ? String(data) : data;
	return '<span style = "font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}

function numberRedFormatter(data) {
	data = String(data);
	return '<span style = "color : #F64B1A;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}

function paymentMethodFormatter(data){
	data = String(data);
	if (data == "1") {
		return "<strong> 신용카드 </strong>";
	} else if (data == "2"){
		return "<strong> 현급 결제 </strong>";
	}
}

function numberBlueFormatter2(data) {
	data = String(data);
	return '<span style = "color : #0080FF;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
}


function numberBlueFormatter(value, row, index) {
	data = String(row.paymentApprovalAmount);
	if (row.paymentApprovalStatus == "1"){
		return '<span style = "color : #0080FF;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
	}else {
		return '<span style = "color : red;font-weight : bold">-' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
	}
}

function paymentApprovalAmountFormatter(value, row, index){
	var amount = Number(row.paymentApprovalAmount);
	var data = String(amount);
	if (amount >=  0){
		return '<span style = "color : #0080FF;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
	}else if (amount < 0){
		return '<span style = "color : red;font-weight : bold">' + (data.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + '</span>'; 
	} 
}

function percentFormatter(data) {
	data = parseFloat(data) * 100;
	return '<span style = "color : #FF0000;font-weight : bold">' + data + " %" + '</span>';
}

function formatDate(date) {
	var sDate;
	if (date < 10) {
		sDate = "0" + date;
	} else {
		sDate = date.toString();
	}

	return sDate;
}

function dateNow() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var d = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return year + "-" + formatDate(month) + "-" + formatDate(d) + " "
			+ formatDate(hours) + ":" + formatDate(minutes) + ":"
			+ formatDate(seconds);
}
function dateFormatter(data) {
	if (!data || data == "")
		return "-";
	if (typeof data !== "object") {
		data = new Date(parseInt(data));
	}
	console.log("#####################################");
	var data = new Date(data);
	console.log(data);
	var year = data.getFullYear();
	var month = data.getMonth() + 1;
	var d = data.getDate();
	var hours = data.getHours();
	var minutes = data.getMinutes();
	var seconds = data.getSeconds();
	return year + "-" + formatDate(month) + "-" + formatDate(d) + " "
			+ formatDate(hours) + ":" + formatDate(minutes) + ":"
			+ formatDate(seconds);
}



function pointBackStatusFormatter(value, row, index) {
	var status = row.pointBackStatus;
	var text;
	switch (status) {
	case "1":
		  text = '<span style = "border-radius: 10px;background-color: #bbbbbbc;padding: 5px;color : #ffffff;font-weight : bold">적립시작</span>'; break;
		break;
	case "2":
		  text = '<span style = "border-radius: 10px;background-color: #999999;padding: 5px;color : #ffffff;font-weight : bold">적립진행중</span>'; break;
		break;
	case "3":
		  text = '<span style = "border-radius: 10px;background-color: #00b33c;padding: 5px;color : #ffffff;font-weight : bold">적립완료</span>'; break;
		break;
	case "4":
		  text = '<span style = "border-radius: 10px;background-color: #bbbbbb;padding: 5px;color : #ffffff;font-weight : bold">적립취소시작</span>'; break;;
		break;
	case "5":
		  text = '<span style = "border-radius: 10px;background-color: #999999c;padding: 5px;color : #ffffff;font-weight : bold">적립쥐소중</span>'; break;
		break;
	case "6":
		  text = '<span style = "border-radius: 10px;background-color: #ff6600;padding: 5px;color : #ffffff;font-weight : bold">적립취소</span>'; break;;
		break;
	case "7":
		text = "적립 중지"; 
		break;
	case "8":
		text = "적립 취소 중지";
		break;
	}
	return text;
}

function authTypeFormatter(value, row, index) {
	var status = row.memberAuthType;
	var text;
	switch (status) {
	case "1":
		text = "이메일";
		break;
	case "2":
		text = "모바일";
		break;
	}
	return text;
}

/**
 * @param value
 * @param row
 * @param index
 * @returns
 */
function paymentTransactionRegistFormatter(value, row, index) {
	var status = row.paymentTransactionType;
	var text;
	switch (status) {
		case "1": text = '<span style = "border-radius: 10px;background-color: green;padding: 5px;color : #ffffff;font-weight : bold">QR</span>'; break;
		case "2": text = '<span style = "border-radius: 10px;background-color: red;padding: 5px;color : #ffffff;font-weight : bold">VAN</span>'; break;
		case "3": text = '<span style = "border-radius: 10px;background-color: #01A9DB;padding: 5px;color : #ffffff;font-weight : bold"> Manual</span>'; break;
		case "4": text = '<span style = "border-radius: 10px;background-color: #01A9DB;padding: 5px;color : #ffffff;font-weight : bold">APP</span>'; break;
		case "5": text = '<span style = "border-radius: 10px;background-color: #8A2BE2;padding: 5px;color : #ffffff;font-weight : bold">API&nbsp;</span>'; break;
	}
	return text;
}

function paymentRouterTypeFormatter(value, row, index) {
	var type = row.paymentRouterType;
	var result = null;

	if (type == null || type == "") {
		result = "-";
	}else {
		result = type;
	}
	return result;
}

function paymentRouterNameFormatter(value, row, index) {
	var name = row.paymentRouterName;
	var result = null;

	if (name == null || name == "") {
		result = "-";
	}else {
		result = name;
	}
	return result;
}


function paymentTransactionRouterTypeFormatter(value, row, index) {
	if (row.paymentTransactionType == "3") {
		return "-";
	}
	var status = row.paymentTransactionRouterType;
	var result = null;

	if (status == null || status == "") {
		result = "VAN";
	}else {
		result = status;
	}
	return result;
}

function paymentTransactionRouterNameFormatter(value, row, index) {
	if (row.paymentTransactionType == "3") {
		return "-";
	}
	var status = row.paymentTransactionRouterName;
	var result = null;
	if (status == null || status == "") {
		result = "KICC";
	}else {
		result = status;
	}
	return result;
}

function PaymentApprovalStatusFormatter(value, row, index) {
	var status = row.paymentApprovalStatus;
	var text;
	switch (status) {
	case "1":
		text = '<span style = "border-radius: 10px;background-color: #00b33c;padding: 5px;color : #ffffff;font-weight : bold">승인</span>'; break;
		break;
	case "2":
		text = '<span style = "border-radius: 10px;background-color: #ff6600;padding: 5px;color : #ffffff;font-weight : bold">취소</span>'; break;
		break;
	case "3":
		text = '<span style = "border-radius: 10px;background-color: red;padding: 5px;color : #ffffff;font-weight : bold">오류</span>'; break;
		break;
	}
	return text;
}

function buttonActionDetailFormatter(value, row, index) {
	var href = 'innerlist.php?list=' + row.id;
	var dhref = 'dellist.php?list=' + row.id;
	return '<center><a target="_blank" href="' + href + '"><span class="btn btn-primary btn-xs"><i class="fa fa-search"></i> Preview</span></a><a href="' + dhref + '" class="easyui-linkbutton" iconCls="icon-remove" plain="true" >Remove Entry</a></center>';
}

function conversionStatusFormatter(value, row, index) {
	var status = String(row.conversionStatus);
	switch (status) {
	case "1":
		text = '<span style = "color : #049931;font-weight : bold">전환 중</span>';
		break;
	case "2":
		text = '<span style = "color : #F64B1A;font-weight : bold">전환 중지</span>';
		break;
	case "3":
		text = '<span style = "color : green;font-weight : bold">전환 완료</span>';
		break;
	default:
		text = "-";
	}
	return text;
}

function pointTypeFormatter(value, row, index) {
	var status = row.pointType;
	var text;
	switch (status) {
	case "1":
		text = '<span style = "color : #049931;font-weight : bold">' + 'GREEN' + '</span>';
		break;
	case "2":
		text = '<span style = "color : #F64B1A;font-weight : bold">' + 'RED' + '</span>';
		break;
	}
	return text;
}

function pointTransferStatus(value, row, index) {
	var status = row.pointTransferStatus;
	var text;
	switch (status) {
	case "1":
		text = "송금 완료";
		break;
	case "2":
		text = "송금 실패";
		break;
	case "3":
		text = "송금 강제 취소 ";
		break;
	}
	return text;
}

function pointTransferType(value, row, index) {
	var status = row.pointTransferType;
	var text;
	switch (status) {
	case "1":
		text = '<span style = "border-radius: 10px;background-color: green;padding: 5px;color : #ffffff;font-weight : bold">선물</span>';
		break;
	case "2":
		text = '<span style = "border-radius: 10px;background-color: red;padding: 5px;color : #ffffff;font-weight : bold">이체</span>';
		break;
	case "3":
		text = '<span style = "border-radius: 10px;background-color: blue;padding: 5px;color : #ffffff;font-weight : bold">기타</span>';
		break;
	}
	return text;
}

function pointTransferNodeType(value, row, index) {
	var status = row.pointNode;
	var text;
	switch (status) {
	case "1":
		text = "일반 회원";
		break;
	case "2":
		text = "정회원";
		break;
	case "3":
		text = "지사";
		break;
	case "4":
		text = "대리점";
		break;
	case "5":
		text = "협력 업체";
		break;
	case "6":
		text = "영업 관리자";
		break;
	case "7":
		text = "총판";
		break;
		default : 
			text = "-";
	}
	return text;
}

function nodeTypeFormatter(value, row, index) {
	var text;
	var status = value ? value : row.nodeType;
	switch (status) {
	case "1":
		text = "일반 회원";
		break;
	case "2":
		text = "정회원";
		break;
	case "3":
		text = "지사";
		break;
	case "4":
		text = "대리점";
		break;
	case "5":
		text = "협력 업체";
		break;
	case "6":
		text = "영업 관리자";
		break;
	case "7":
		text = "총판";
		break;
	}
	return text;
}

function soleDistStatusFormatter(value, row, index) {
	var status = row.affiliateStatus;
	return checkNodeStatus(status);
}

function branchStatusFormatter(value, row, index) {
	var status = row.branchStatus;
	return checkNodeStatus(status);
}

function agencyStatusFormatter(value, row, index) {
	var status = row.agencyStatus;
	return checkNodeStatus(status);
}

function affiliateStatusFormatter(value, row, index) {
	var status = row.affiliateStatus;
	return checkNodeStatus(status);
}



function saleManagerStatusFormatter (value, row, index) {
	var status = row.saleManagerStatus;
	return checkNodeStatus(status);
}

function recommenderStausFormatter (value, row, index) {
	var status = row.recommenderStatus;
	return checkNodeStatus(status);
}

function checkNodeStatus(status){
	switch (status) {
	case "1":
		text = '<span style = "border-radius: 10px; border: 1px solid green; padding: 2px;font-size : 12px; color : green; font;font-weight : bold">정상</span>'; break;
		break;
	case "2":
		text = '<span style = "border-radius: 10px; border: 1px solid #B404AE;padding: 2px;font-size : 12px;color : #B404AE;font-weight : bold">중지</span>'; break;
		break;
	case "3":
		text = '<span style = "border-radius: 10px; border: 1px solid red;padding: 2px;font-size : 12px;color : red;font-weight : bold">탈퇴</span>'; break;
		break;
	case "4":
		text = '<span style = "border-radius: 10px; border: 1px solid red;padding: 2px;font-size : 12px;color : red;font-weight : bold">이전</span>'; break;
		break;
	}
	return text;
}

function memberStatusFormatter(value, row, index) {
	var status = row.memberStatus
	var text;
	switch (status) {
	case "1":
		text = "정상";
		break;
	case "2":
		text = "등록 대기";
		break;
	case "3":
		text = "미 인증";
		break;
	case "4":
		text = "인증 완료";
		break;
	case "5":
		text = "사용 중지";
		break;
	case "6":
		text = "강제 탈퇴";
		break;
	case "7":
		text = "탈퇴";
		break;
	}
	return text;
}

function registTypeFormatter(value, row, index) {
	var status = row.regType;
	if (!status)
		status = value;
	var text;
	switch (status) {
	case "U":
		text = "사용자 등록";
		break;
	case "A":
		text = "관리자 등록";
		break;
	}
	return text;
}

function registAdminFormatter(value, row, index) {
	var status = row.regAdminNo;
	if (status == '0') {
		status = "-"
	}
	return status;
}

function paymentStausCellStyler(value, row, index) {
	var status = row.paymentStatus;
	var text;
	switch (status) {
	case "1": // 입금 결제 확인중
		// text = 'background-color:#F3F305;color:black;';
		break;
	case "2": // 입금(결제) 확인 완료
		break;
	case "3": // 입금(결제) 취소 확인중
		break;
	case "4": // 입금(결제) 취소 완료
		break;
	}

	return text;
}

function paymentTypeFormatter(value, row, index) {
	var status = row.paymentType;
	var text;
	switch (status) {
	case "1":
		text = "온라인";
		break;
	case "2":
		text = "신용카드";
		break;
	}
	return text;
}


function paymentStatusFormatter(value, row, index) {
	var status = row.paymentStatus;
	var text;
	switch (status) {
	case "1":
		text = "결제 확인중";
		text = '<span style = "color : #FF4000"><i class = "fa fa-check" style="color:#424242;"></i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	case "2":
		text = "결제 완료";
		text = '<span style = "color : #0489B1"><i class = "fa fa-check-circle" style="color:#01DF01;"></i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	case "3":
		text = "결제 취소";
		text = '<span><i class = "fa fa-check" style="color:#424242;">	</i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	case "4":
		text = "결제 환불중";
		text = '<span><i class = "fa fa-ban" style="color:red;"></i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	case "5":
		text = "결제 환불완료";
		text = '<span><i class = "fa fa-ban" style="color:red;"></i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	case "6":
		text = "결제 확인요청";
		text = '<span style = ""><i class = "fa fa-exclamation-circle" style="color:red;"></i>' + '&nbsp;' + addBoldFomatter(text) + '</span';
		break;
	}
	return text;
}

function loadNodeForm(data) {
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	// console.log("/handleNodeForm?" + queryParam);

	$(data.targetElem).load("/springSecurity/handleNodeForm?" + queryParam,
			function(response, status, xhr) {
				// console.log("오픈할 DIV : " + data.targetElem);

				$(data.targetElem).dialog({
					width : 600,
					modal : true,
					/* cls:'c6', */
					/* inline:true, */
					closable : true,
					border : 'thick',
					collapsible : false,
					minimizable : false,
					maximizable : false,
					title : "&nbsp; " + data.title,
					shadow : false,
					buttons : [ {
						text : '확인',
						iconCls : 'icon-ok',
						handler : function() {
							var nodeType = $('input[name=nodeType]').val();
							switch (nodeType) {
							case "1":
								break;
							case "2":
								createRecommender(data);
								break;
							case "3":
								break;
							case "4":
								break;
							case "5":
								break;
							case "6":
								break;
							}
						}
					}, {
						text : '취소',
						handler : function() {
							console.log("닫을 DIV : " + data.targetElem);
							$(data.targetElem).dialog('close');
						}
					} ]
				});

			});
}

function loadMembershipForm(data) {
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	// console.log("/handleMembershipForm?" + queryParam);
	$(data.targetElem)
			.load(
					"/springSecurity/handleMembershipForm?" + queryParam,
					function(response, status, xhr) {
						// console.log(status);

						$(data.targetElem)
								.dialog(
										{
											width : 650,
											modal : true,
											/* cls:'c6', */
											/* inline:true, */
											border : 'thick',
											shadow : true,
											collapsible : false,
											minimizable : false,
											maximizable : false,
											title : "&nbsp; " + data.title,
											shadow : false,
											buttons : [
													{
														text : '확인',
														iconCls : 'icon-ok',
														handler : function() {
															var param = {
																memberNo : $( 'input[name=memberNo]') .val(),
																memberEmail : $( 'input[name=memberEmail]') .val(),
																paymentAmount : $( 'input[name=paymentAmount]') .val(),
																paymentStatus : $( '#paymentStatus1') .combobox( 'getValue'),
																paymentType : $( '#paymentType1') .combobox( 'getValue'),
																regType : $( '#regType') .combobox( 'getValue'),
															};
															// console.log(param);
															// console.log(data);
															var valid = true;
															for ( var prop in param) {
																if (param
																		.hasOwnProperty(prop)) {
																	if (param[prop] == '') {
																		valid = false;
																		break;
																	}
																}
															}
															if (!valid) {
																$.messager
																		.alert( '알림', '입력 항목이 모두 입력되지 않았습니다');
																return;
															}

															returnp.api
																	.call( "createMembershipRequest", param,
																			function(
																					res) {
																				if (res.resultCode == "100") {
																					$.messager .alert( '알림', res.message);
																				} else {
																					$.messager .alert( '오류 발생', res.message);
																				}
																			});

															$(data.targetElem)
																	.dialog( 'close');
														}
													},
													{
														text : '취소',
														handler : function() {
															// console.log("닫을
															// DIV : " +
															// data.targetElem);
															$(data.targetElem)
																	.dialog( 'close');
														}
													} ]
										});

					});
}

function loadNodeListView(data, callback) {
	data.targetElem = data.targetElem || "#dlgForm2";
	// console.log(data.targetElem)
	var queryParam = $.param(data.queryOptions);
	// console.log("/handleNodeListView?" + queryParam);

	$(data.targetElem).load( 
		"/springSecurity/handleNodeListView?" + queryParam,
		function(response, status, xhr) {
			console.log(status);
			
			$(data.targetElem).dialog({
				width : data.queryOptions['width'] ? data.queryOptions['width']: '55%',
				height : 650,
				modal : true,
				/* cls:'c6', */
				/* inline:true, */
				collapsible : false,
				closable : false,
				minimizable : false,
				maximizable : false,
				title : "&nbsp; " + data.title,
				shadow : false,
				buttons : [
					{
						text : '확인',
						iconCls : 'icon-ok',
						handler : function() {
							var node = $( '#search_result') .datagrid( 'getSelected');
							if (!node) {
								$.messager .alert( '알림', '선택이 필요합니다');
								return;
							}
	
							if (callback && typeof callback === "function") {
								callback(node);
							}
							$(data.targetElem).dialog( 'close');
							canNodeListSearchBlank = false;
						}
					},
					{
						text : '취소',
						handler : function() {
							$(data.targetElem).dialog( 'close');
							canNodeListSearchBlank = false;
						}
					} ]
			});
		});
}

function loadCommonListView(data, callback) {
	data.targetElem = data.targetElem || "#dlgForm";
	// console.log(data.targetElem)
	var queryParam = $.param(data.queryOptions);
	// console.log("/loadCommonListView?" + queryParam);

	$(data.targetElem)
			.load( "/springSecurity/handleCommonListView?" + queryParam,
					function(response, status, xhr) {
						// console.log(status);

						$(data.targetElem)
								.dialog(
										{
											width : '55%',
											height : 650,
											modal : true,
											/* cls:'c6', */
											/* inline:true, */
											collapsible : false,
											closable : true,
											minimizable : false,
											maximizable : false,
											title : "&nbsp; " + data.title,
											shadow : false,
											buttons : [
													{
														text : '확인',
														iconCls : 'icon-ok',
														handler : function() {
															var node = $( '#search_result') .datagrid( 'getSelected');
															if (!node) {
																$.messager
																		.alert( '알림', '선택이 필요합니다');
																return;
															}

															if (callback
																	&& typeof callback === "function") {
																callback(node);
															}
															$(data.targetElem)
																	.dialog( 'close');
														}
													},
													{
														text : '취소',
														handler : function() {
															$(data.targetElem)
																	.dialog( 'close');
														}
													} ]
										});

					});
}

/* 해당 노드의 자식 리스트 */
function loadMyChildList(title, params, listType) {
	var queryParam = $.param(params);
	$("#dlgForm").load("/api/childNodeListView?" + queryParam,
			function(response, status, xhr) {

				$('#dlgForm').dialog({
					width : 1200,
					cache : false,
					modal : true,
					closable : true,
					border : 'thick',
					constrain : true,
					shadow : true,
					collapsible : false,
					minimizable : false,
					maximizable : false,
					title : "&nbsp; " + title,
					shadow : false,
					buttons : [ {
						text : '확인',
						iconCls : 'icon-ok',
						handler : function() {
							$('#dlgForm').dialog('close');
							$('#dlgForm').removeAttr('style');
						}
					} /*
						 * , { text:'취소', handler:function(){
						 * $('#dlgForm').dialog('close');
						 * $('#dlgForm').removeAttr('style'); } }
						 */
					]
				});

				$('#dlgForm').dialog('center');

			});
}

/* 나의 회원 리스트 */
function loadMyMemberList(title, params) {
	var queryParam = $.param(params);
	$("#dlgForm").load("/api/member/template/memberList?" + queryParam,
			function(response, status, xhr) {

				$('#dlgForm').dialog({
					width : 1200,
					cache : false,
					modal : true,
					closable : true,
					border : 'thick',
					constrain : true,
					shadow : true,
					collapsible : false,
					minimizable : false,
					maximizable : false,
					title : "&nbsp; " + title,
					shadow : false,
					buttons : [ {
						text : '확인',
						iconCls : 'icon-ok',
						handler : function() {
							$('#dlgForm').dialog('close');
							$('#dlgForm').removeAttr('style');
						}
					} /*
						 * , { text:'취소', handler:function(){
						 * $('#dlgForm').dialog('close');
						 * $('#dlgForm').removeAttr('style'); } }
						 */
					]
				});

				$('#dlgForm').dialog('center');
				returnp.api.call('findMyMembers', queryParam, function(res) {
					if (res.resultCode == "100") {
						console.log(res)
						$('#member_list_grid').datagrid({
							data : res.rows
						})
					} else {
						$.messager.alert('오류 발생', res.message);
					}
				});
			});
}
/* 해당 결제에 대한 포인트 백 세부 레코드 리스트 생성 */
function loadPaymentPointbackRecord(title, params) {
	// console.log("loadPaymentPointbackRecord");
	// console.log(params);
	var queryParam = $.param(params);
	$("#dlgForm").load(
			"/api/paymentPointbackRecord/template/paymentPointbackRecordList?" + queryParam,
			function(response, status, xhr) {
				$('#dlgForm').dialog({
					width : 1400,
					cache : false,
					modal : true,
					closable : true,
					border : 'thick',
					constrain : true,
					shadow : true,
					collapsible : false,
					minimizable : false,
					maximizable : false,
					title : "&nbsp; " + title,
					shadow : false,
					buttons : [ {
						text : '확인',
						iconCls : 'icon-ok',
						handler : function() {
							$('#dlgForm').dialog('close');
							$('#dlgForm').removeAttr('style');
						}
					} /*
					 * , { text:'취소', handler:function(){
					 * $('#dlgForm').dialog('close');
					 * $('#dlgForm').removeAttr('style'); } }
					 */
					]
				});

				$('#dlgForm').dialog('center');
				returnp.api .call(
					'findPaymentPointbackRecords2',
					queryParam,
					function(res) {
						console.log(res)
						if (res.resultCode == "100") {
							$('#list_search_result') .datagrid({ data : res.rows })
							var totalAmount = 0
							for (var i = 0; i < res.rows.length; i++) {
								totalAmount += parseInt(res.rows[i].pointbackAmount);
							}
							$('#list_search_result') .datagrid( 'appendRow', { paymentTransactionNo : "소계", pointbackAmount : totalAmount });
						} else {
							$.messager.alert('오류 발생', res.message);
						}
					});
			});
}

$.fn.datebox.defaults.formatter = function(date) {

	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return [ y, formatDate(m), formatDate(d) ].join('-');
}
$.fn.datebox.defaults.parser = function(s) {

	if (!s)
		return new Date();
	var ss = s.split('-');
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d)
	} else {
		return new Date();
	}
}

$.fn.serializeSearchData = function() {

	var $form = $(this);
	var fromElements = $form.find("input.textbox-value");
	var arr = new Array();
	var searchName = "searchKeyword";
	$.each(this.serializeArray(), function(i, o) {

		var keys = Object.keys(o);
		var obj = new Object();
		$.each(keys, function(k, key) {

			var n = searchName + (key == "name" ? "Type" : "");
			obj[n] = obj[n] == undefined ? o[key] : $.isArray(obj[n]) ? obj[n] .concat(o[key]) : [ obj[n], o[key] ];
		});
		var ele = $(fromElements).eq(i).closest("div").find( "[textboxname='" + obj.searchKeywordType + "']");
		var dataObj = eval("new Object(" + ele.data("returnp") + ")");
		$.extend(obj, dataObj);
		arr.push(obj);
	});

	var newArr = new Array();
	var obj = new Object();
	$.each(arr, function(i, o) {

		if (o.searchKeywordType == "searchKeywordType") {
			if (o.searchKeyword == "0" || o.searchKeyword == "") {
				var linkedOptionString = "";
				$("#searchKeywordType option").each(
						function() {
							linkedOptionString += $(this).val() == "0" || $(this).val() == "" ? "" : $(this).val() + " ";
						});

				linkedOptionString = "concat(" + linkedOptionString.trim().split(" ").join(",") + ")";
				obj.searchKeywordType = linkedOptionString;

			} else {
				obj.searchKeywordType = o.searchKeyword;
			}
		} else if (o.searchKeywordType == "searchKeyword") {
			obj.searchKeyword = o.searchKeyword;
			obj.compare = o.compare == undefined ? "COMPARE.LIKE" : o.compare;
			obj.combind = o.combind == undefined ? "COMBIND.UNION" : o.combind;
		} else {
			newArr.push(o);
		}
	});

	newArr.push(obj);
	console.log(newArr);
	return newArr;
};
