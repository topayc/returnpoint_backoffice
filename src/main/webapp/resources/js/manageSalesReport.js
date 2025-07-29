
var summary_columns = [[
	    {field:'searchDate',width:20,align:'center',title : '검색 기준 연/월/일',formatter : addBoldFomatter},
	    {field:'payCase',width:10,align:'center',title : '매출 건수 ', formatter : numberFormatter},
	    {field:'salesSum',width:15,align:'center',title : '결제 금액 소계', formatter  : numberGreenFormatter},
	    {field:'salesApprovalSum',width:15,align:'center',title : '결제 승인 소계', formatter  : numberBlueFormatter2},
	    {field:'salesCancelSum',width:15,align:'center',title : '결제 취소 소계', formatter  : numberRedFormatter},
	    {field:'ss1',width:40,align:'center',title : '비고'},
	 ]];


var columns = [[
	//{field:'check',width:30,align:'center',title : '선택',checkbox : true},
	   // {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
	    {field:'paymentTransactionNo',width:18,align:'center',title : '등록 번호',hidden:false},
	    {field:'memberName',width:25,align:'center',title : '결제 회원'},
	    {field:'nodeType',width:20,align:'center',title : '노드',formatter : nodeTypeFormatter ,hidden :  true},
	    {field:'memberEmail',width:40,align:'center',title : '회원 이메일',hidden : true},
	    {field:'memberPhone',width:30,align:'center',title : '결제 회원 핸드폰'},
	    {field:'nodeNo',width:20,align:'center',title : '대상 번호', hidden : true},
	    {field:'nodeName',width:30,align:'center',title : '노드 이름',hidden : true},
	    {field:'nodeEmail',width:45,align:'left',title : '노드 이메일',hidden : true},
	    {field:'memberNo',width:20,align:'center',title : '회원 번호', hidden : true},
	    {field:'affiliateNo',width:30,align:'center',title : '협력업체 번호', hidden : true},
	    {field:'affiliateName',width:40,align:'center',title : '협력업체', hidden : false},
	    {field:'paymentRouterNo',width:20,align:'center',title : '결제 라우터 번호', hidden : true},
	    {field:'paymentRouterType',width:18,align:'center',title : 'RT', formatter: paymentRouterTypeFormatter},
	    {field:'paymentRouterName',width : 18,align:'center',title : 'RN', formatter: paymentRouterNameFormatter},
	    {field:'paymentRouterCode',width:20,align:'center',title : 'RC', hidden:true},
	    {field:'affiliateSerial',width:35,align:'center',title : 'T-ID(ID)', formatter : slashFormatter},
	    {field:'paymentApprovalNumber',width:60,align:'center',title : '승인/취소 번호'},
	    {field:'paymentApprovalAmount',width:36,align:'center',title : '승인/취소 금액', formatter : paymentApprovalAmountFormatter},
	    {field:'paymentApprovalStatus',width:25,align:'center',title : '승인 상태', formatter : PaymentApprovalStatusFormatter},
	    {field:'pointBackStatus',width:25,align:'center',title : '적립 상태', formatter : pointBackStatusFormatter},
	    {field:'paymentTransactionType',width:20,align:'center',title : '등록 형태', formatter : paymentTransactionRegistFormatter},
	    {field:'paymentApprovalDateTime',width:38,align:'center',title : '승인 일자', formatter : dateFormatter},
	    {field:'createTime',width:35,align:'center',title : '등록일',formatter : dateFormatter,hidden : false},
	    {field:'regAdminNo',width:15,align:'center',title : '등록자', formatter : registAdminFormatter},
	    {field:'updateTime',width:40,align:'center',title : '수정일',formatter : dateFormatter, hidden : true}
	 ]]
/**
 * 뷰 초기화 
 * @returns
 */
function initView(){
	/* 레이아웃 초기화*/
	$('.easyui-layout').layout();
	
	/* 패널   초기화*/
	$('.easyui-panel').panel({ border: false });
	/* 폼 초기화*/
	$('#searchForm').form();
	
	/* 검색어 입력 박스 초기화 */
	$('#searchKeyword').textbox({ 
		width: 200,
		prompt : "검색할 단어를 입력해주세요" ,
		inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
			keyup:function(e){
				if(e.keyCode==13)
					realodPage();
			}
		})
	});
	
	
	$('#searchPaymentApprovalStatus').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 130
	});

	$('#searchAffiliate').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: true,
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 170
	});
	
	$('#searchDateType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 80
	});
	$('#searchPaymentTransactionType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 100
	});

	$('#searchPaymentRouterNo').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 100
	});

	/* 검색 시작일 갤린더 박스  초기화*/
	$('#searchDateStart').datetimebox({
		 prompt : "검색 시작일",
	    showSeconds: true,
	    labelPosition: 'top',
	    width: 140,
	    formatter :  searchDateFomatter
	});
	
	/* 검색 종료일 갤린더 박스  초기화*/
	$('#searchDateEnd').datetimebox({
		 prompt : "검색 종료일",
		showSeconds: true,
	    labelPosition: 'top',
	    width: 140,
	    formatter :  searchDateFomatter
	});
	
	
	$('#searchAccLowLimit').textbox({
		width: 120,
		prompt : "최소 금액" ,
		labelPosition: 'top'
	});

	$('#searchAccMaxLimit').textbox({
		width: 120,
		prompt : "최대 금액 " ,
		labelPosition: 'top'
	});
	
	/* 검색어 입력 박스 초기화 */
	$('#searchKeyword').textbox({
		width: 180,
		prompt : "이름 / 아이디 " ,
		  labelPosition: 'top'
	});
	
	$('#search_total_year_btn').linkbutton({
		onClick : function(){
			$('#node_list').datagrid('loadData', []);
			$('#node_list').datagrid('getPanel').panel('setTitle', "");
			
			var param = makeSearchParam();
			if ((param.searchDateStart == '' &&  param.searchDateEnd == "") || (param.searchDateStart != '' &&  param.searchDateEnd != "") ){
			}else {
				$.messager.alert('알림', "검색 시작일 혹은 검색 종료일을 설정해주세요");
				return;
			} 
			param.searchType  = "year";
			
			returnp.api.call("selectSalesReports", param, function(res){
				if (res.resultCode == "100") {
					
					if (res.rows.length < 1) {
						$.messager.alert('알림', "검색 결과가 없습니다.");
					}
					
					$('#summary_table').datagrid({
						data : res.rows,
						title : '[연도별 매출 총계] ',
					});
					var totalAmount = 0
                    var totalPayCase = 0;
					var totalAppovalAmount = 0; 
					var totalCancelAmount = 0; 
					for (var i = 0; i < res.rows.length; i++) {
                        totalAmount += parseInt(res.rows[i].salesSum);
                        totalPayCase+=parseInt(res.rows[i].payCase);
                        totalAppovalAmount+=parseInt(res.rows[i].salesApprovalSum);
                        totalCancelAmount+=parseInt(res.rows[i].salesCancelSum);
                    }
					$('#summary_table').datagrid({
						title : '[연도별 매출 총계]  : ' +numberGreenFormatter(totalAmount),
					});
					$('#summary_table') .datagrid( 'appendRow', { searchDate : "총계", salesSum : totalAmount, payCase : totalPayCase , salesApprovalSum :  totalAppovalAmount, salesCancelSum :totalCancelAmount });
					setListPager2();
				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
		},
	/*	iconCls:'icon-search'*/
	});
	
	$('#search_total_daily_btn').linkbutton({
		onClick : function(){
			$('#node_list').datagrid('loadData', []);
			$('#node_list').datagrid('getPanel').panel('setTitle', "");
			
			var param = makeSearchParam();
			if ((param.searchDateStart == '' &&  param.searchDateEnd == "") || (param.searchDateStart != '' &&  param.searchDateEnd != "") ){
			}else {
				$.messager.alert('알림', "검색 시작일 혹은 검색 종료일을 설정해주세요");
				return;
			} 
			param.searchType  =  "daily";

			returnp.api.call("selectSalesReports", param, function(res){
				console.log(res);
				if (res.resultCode == "100") {
					
					if (res.rows.length < 1) {
						$.messager.alert('알림', "검색 결과가 없습니다.");
					}
					
					$('#summary_table').datagrid({
						data : res,
						title : '[일별 매출 총계] ' ,
					});
					var totalAmount = 0
                    var totalPayCase = 0;
					var totalAppovalAmount = 0; 
					var totalCancelAmount = 0; 
					for (var i = 0; i < res.rows.length; i++) {
                        totalAmount += parseInt(res.rows[i].salesSum);
                        totalPayCase+=parseInt(res.rows[i].payCase);
                        totalAppovalAmount+=parseInt(res.rows[i].salesApprovalSum);
                        totalCancelAmount+=parseInt(res.rows[i].salesCancelSum);
                    }
					$('#summary_table').datagrid({
						title : '[일별 매출 총계]  : ' +numberGreenFormatter(totalAmount),
					});
					$('#summary_table') .datagrid( 'appendRow', { searchDate : "총계", salesSum : totalAmount, payCase : totalPayCase , salesApprovalSum :  totalAppovalAmount, salesCancelSum :totalCancelAmount });
					setListPager2();
				}else {
					$.messager.alert('오류 발생', message);
				}
			});
		},
		/*	iconCls:'icon-search'*/
	});
	$('#search_total_month_btn').linkbutton({
		onClick : function(){
			$('#node_list').datagrid('loadData', []);
			$('#node_list').datagrid('getPanel').panel('setTitle', "");
			
			var param = makeSearchParam();
			if ((param.searchDateStart == '' &&  param.searchDateEnd == "") || (param.searchDateStart != '' &&  param.searchDateEnd != "") ){
			}else {
				$.messager.alert('알림', "검색 시작일 혹은 검색 종료일을 설정해주세요");
				return;
			} 
			param.searchType  =  "month";
			
			returnp.api.call("selectSalesReports", param, function(res){
				console.log(res);
				if (res.resultCode == "100") {
					
					if (res.rows.length < 1) {
						$.messager.alert('알림', "검색 결과가 없습니다.");
					}
					
					$('#summary_table').datagrid({
						data : res,
						title : '[월별 매출 총계] ' ,
					});
					var totalAmount = 0
                    var totalPayCase = 0;
					var totalAppovalAmount = 0; 
					var totalCancelAmount = 0; 
					for (var i = 0; i < res.rows.length; i++) {
                        totalAmount += parseInt(res.rows[i].salesSum);
                        totalPayCase+=parseInt(res.rows[i].payCase);
                        totalAppovalAmount+=parseInt(res.rows[i].salesApprovalSum);
                        totalCancelAmount+=parseInt(res.rows[i].salesCancelSum);
                    }
					$('#summary_table').datagrid({
						title : '[월별 매출 총계]  : ' +numberGreenFormatter(totalAmount),
					});
					$('#summary_table') .datagrid( 'appendRow', { searchDate : "총계", salesSum : totalAmount, payCase : totalPayCase , salesApprovalSum :  totalAppovalAmount, salesCancelSum :totalCancelAmount });
					setListPager2();
				}else {
					$.messager.alert('오류 발생', message);
				}
			});
		},
	/*	iconCls:'icon-search'*/
	});
	
	$('#search_btn').linkbutton({
		onClick : function(){
			$('#node_list').datagrid('loadData', []);
			$('#node_list').datagrid('getPanel').panel('setTitle', "");
			
			var param = makeSearchParam();
			console.log(param)
			if ( param.searchAccLowLimit != ''){
				if (!$.isNumeric(param.searchAccLowLimit)) {
					$.messager.alert('알림', "최소 금액 검색은 숫자만 입력해야 합니다.");
					return;
				}
			}
			
			if (param.searchAccMaxLimit != ''){
				if (!$.isNumeric(param.searchAccMaxLimit)) {
					$.messager.alert('알림', "최대 금액 검색은 숫자만 입력해야 합니다.");
					return;
				}
			}
			
			if ((param.searchDateStart == '' &&  param.searchDateEnd == "") || (param.searchDateStart != '' &&  param.searchDateEnd != "") ){
			}else {
				$.messager.alert('알림', "검색 시작일 혹은 검색 종료일을 설정해주세요");
				return;
			} 
			var oriDateEnd;
			if (param.searchDateStart != '' &&  param.searchDateEnd != "") {
				oriDateEnd = param.searchDateEnd;
				var dateArr = param.searchDateEnd.split('-');
				var searchDateEnd = new Date(dateArr[0], dateArr[1], dateArr[2]);
				param.searchDateEnd = searchDateEnd.getFullYear() + "-" + searchDateEnd.getMonth() + "-" + (searchDateEnd.getDate() + 1)
			}
			console.log("매출 조회 파라메터");
			console.log(param);
			returnp.api.call("selectPeriodSalesReports", param, function(res){
				console.log(res);
				if (res.resultCode == "100") {
					
					if (res.rows.length < 1) {
						$.messager.alert('알림', "검색 결과가 없습니다.");
					}
					
					$('#summary_table').datagrid({
						data : res
					});
					var totalAmount = 0
					var totalPayCase = 0;
					 var totalAppovalAmount = 0; 
					 var totalCancelAmount = 0; 
                    for (var i = 0; i < res.rows.length; i++) {
                        totalAmount += parseInt(res.rows[i].salesSum);
                        totalPayCase+=parseInt(res.rows[i].payCase);
                        totalAppovalAmount+=parseInt(res.rows[i].salesApprovalSum);
                        totalCancelAmount+=parseInt(res.rows[i].salesCancelSum);
                    }
					var shStr = "";
					if (param.searchDateStart != ''  ) {
						shStr = '[' + param.searchDateStart + " ~ "+  oriDateEnd + "] 매출 총계 :";
					}else {
						shStr = "[전체 기간 매출 총계] : "
					}
					
					$('#summary_table').datagrid({
						title : shStr + numberGreenFormatter(totalAmount),
					});
					  $('#summary_table') .datagrid( 'appendRow', { searchDate : "총계", salesSum : totalAmount, payCase : totalPayCase , salesApprovalSum :  totalAppovalAmount, salesCancelSum :totalCancelAmount });
					setListPager2();
				}else {
					$.messager.alert('오류 발생', message);
				}
			});
		},
	/*	iconCls:'icon-search'*/
	});
	
	
	
	/* 리셋 버튼  초기화*/
	$('#reset_btn').linkbutton({
		onClick : function(){
			$('#searchForm').form('reset');
		},
		width : 50,
	});
	
	
	var editData = [
		{key:"1",value:"입금(결제) 확인중"},
		{key:"2",value:"입금(결제) 확인 완료"},
		{key:"3",value:"입금(결제) 취소 확인중"},
		{key:"4",value:"입금(결제) 취소 완료"}
	]
	
	/* 노드 데이타그리드   초기화*/
	$('#summary_table').datagrid({
		singleSelect:true,
		title : '[요약]',
		collapsible:false,
		//autoRowHeight: false,
		fitColumns:true,
		selectOnCheck : true,
		checkOnSelect : true,
		border:false,
		rownumbers : true,
		pagination: true,
		pagePosition : "top",
		pageSize : returnpCommon.appInfo.gridPageSize,
		onSelect : function(index,row){
			$('#node_list').datagrid('loadData', []);
			$('#node_list').datagrid('getPanel').panel('setTitle', "");
			selectPaymentTransactions(index, row);
		},
		onLoadSuccess : function(){
			//$(this).datagrid('freezeRow',0).datagrid('freezeRow',1);
		},	
		onRowContextMenu : function(e, index, row){
			e.preventDefault();
		  	$(this).datagrid("selectRow", index);
		},
	    columns: summary_columns
	});
	
	
	/* 노드 데이타그리드   초기화*/
	$('#node_list').datagrid({
		title : '[검색 결과]',
		singleSelect:true,
		collapsible:false,
		//autoRowHeight: false,
		fitColumns:true,
		selectOnCheck : true,
		checkOnSelect : true,
		border:false,
		rownumbers : true,
		pagination: true,
		pagePosition : "top",
		pageSize : returnpCommon.appInfo.gridPageSize,
		onSelect : function(){},
		onLoadSuccess : function(){
			//$(this).datagrid('freezeRow',0).datagrid('freezeRow',1);
		},	
		onRowContextMenu : function(e, index, row){
			e.preventDefault();
		  	$(this).datagrid("selectRow", index);
		  	var cmenu = $('<div/>').appendTo('body');
		  	cmenu.menu({
		  		onClick : function(item){
		  			switch(item.action){
		  			case "cancel":
		  				cancelPaymentTransaction();
		  				break;	
		  				
		  			case "cancelForce":
		  				cancelForcedPaymentTransaction();
		  				break;	
		  			case "accForce":
		  				accForcedPaymentTransaction();
		  				break;	
		  				
		  			case "remove":
		  				removePaymentTransaction();
		  				break;
		  			case "more_acc_detail":
		  				var node = $('#node_list').datagrid('getSelected');
		  				if (!node) {
		  					 $.messager.alert('알림','세부 내역을 확인하실 항목을 선택해주세요');
		  					 return;
		  				}
		  				var title = '해당 결제의  G POINT 적립 내역';
		  				loadPaymentPointbackRecord( title, {paymentTransactionNo : node.paymentTransactionNo} );
		  				break;
		  			case "more_cancel_detail":
		  				var node = $('#node_list').datagrid('getSelected');
		  				if (!node) {
		  					 $.messager.alert('알림','세부 내역을 확인하실 항목을 선택해주세요');
		  					 return;
		  				}
		  				var title = '해당 결제의  G POINT 적립 취소 내역';
		  				loadPaymentPointbackRecord( title, {paymentTransactionNo : node.paymentTransactionNo} );
		  				break;
		  			case "re_pointback":
		  				reAccumulate();
		  				break;
		  			}
		  		}
		  	});
			var menus, icons, actions;
		  	if (row.paymentApprovalStatus =="1" ) {
		  		menus = ['해당 결제의  G POINT 적립 내역' ,'결제 승인 취소' , '적립 강제 취소' ,'강제 적립' /*,   '재적립 요청(해당내역 삭제 및 취소후 재적립 진행' */];
		  		icons = ['icon-more' , 'icon-clear' , 'icon-clear' , 'icon-redo' /*,  'icon-redo' */];
			  	actions = ['more_acc_detail' , 'cancel' , 'cancelForce', 'accForce' /*, 're_pointback' */];
		  	}else if (row.paymentApprovalStatus =="2"){
		  		menus = ['해당 결제의  G POINT 적립 취소 내역'];
		  		icons = ['icon-more'];
			  	actions = ['more_cancel_detail' ];
		  	}
		  	
		  	for(var i=0; i<menus.length; i++){
		  		cmenu.menu('appendItem', {
		  			data : row,
		  			no : row.memberNo,
		  			text: /*'[' + row.memberEmail + '] ' +*/ menus[i],
		  			action: actions[i],
		  			iconCls: icons[i]
		  		});
		  	}
		  	cmenu.menu('show', {
		  		left:e.pageX,
		  		top:e.pageY
		  	});
		},
	    columns: columns
	});
	setListPager2();
	setListPager();
}


$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
            var ed = $(this).datagrid('getEditor', param);
            if (ed){
                if ($(ed.target).hasClass('textbox-f')){
                    $(ed.target).textbox('textbox').focus();
                } else {
                    $(ed.target).focus();
                }
            }
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	},
    enableCellEditing: function(jq){
        return jq.each(function(){
            var dg = $(this);
            var opts = dg.datagrid('options');
            opts.oldOnClickCell = opts.onClickCell;
            opts.onClickCell = function(index, field){
               if (field == 'paymentStatus') {
            		if (opts.editIndex != undefined){
                        if (dg.datagrid('validateRow', opts.editIndex)){
                            dg.datagrid('endEdit', opts.editIndex);
                            opts.editIndex = undefined;
                        } else {
                            return;
                        }
                    }
                    dg.datagrid('selectRow', index).datagrid('editCell', {
                        index: index,
                        field: field
                    });
                    opts.editIndex = index;
                    opts.oldOnClickCell.call(this, index, field);
               }else {
            	   dg.datagrid('endEdit', opts.editIndex);
            	   dg.datagrid('selectRow', index);
               }
            
            }
        });
    }
});

function cancelPaymentTransaction(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','취소하실 거래 내역을 선택해주세요');
		 return;
	}
	if (node.pointBackStatus == "4" || node.pointBackStatus == "5"  || 
			node.pointBackStatus == "6" || node.pointBackStatus == "7" || 
			node.pointBackStatus == "8"){
		$.messager.alert('알림','해당 내역은 취소할 수 없는 내역입니다');
		return;
	}
	$.messager.confirm(
		'알림', 
		"해당 거래 내역이 취소됩니다. </br>취소 시 관련 계층의 G Point가  취소된 포인트만큼 차감됩니다. 진행하시겠습니까?",
		function(r){
			if (r) {
				var param = { paymentTransactionNo : node.paymentTransactionNo }
				returnp.api.call("cancelPaymentTransaction", param, function(res){
	        		if (res.resultCode  == "100") {
	        			$.messager.alert('알림', res.message);
	        			realodPage();
	        		}else {
	        			console.log(res);
	        			$.messager.alert('오류 발생', res.message);
	        		}
	        	});
			}
		});
}


function cancelForcedPaymentTransaction(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		$.messager.alert('알림','취소하실 거래 내역을 선택해주세요');
		return;
	}
	if (node.pointBackStatus == "4" || node.pointBackStatus == "5"  || 
			node.pointBackStatus == "6" || node.pointBackStatus == "7" || 
			node.pointBackStatus == "8"){
		$.messager.alert('알림','해당 내역은 취소할 수 없는 내역입니다');
		return;
	}
	$.messager.confirm(
			'알림', 
			"해당 거래 내역이 취소됩니다. </br>취소 시 관련 계층의 G Point가  취소된 포인트만큼 차감됩니다. 진행하시겠습니까?",
			function(r){
				if (r) {
					var param = { paymentTransactionNo : node.paymentTransactionNo }
					returnp.api.call("cancelForcedPaymentTransaction", param, function(res){
						if (res.resultCode  == "100") {
							$.messager.alert('알림', res.message);
							realodPage();
						}else {
							//console.log("[오류]");
							//console.log(res);
							$.messager.alert('오류 발생', res.message);
						}
					});
				}
			});
}


function accForcedPaymentTransaction(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		$.messager.alert('알림','강제 적립하실  거래 내역을 선택해주세요');
		return;
	}

	$.messager.confirm(
			'알림', 
			"해당 거래 내역에 대해서 동일한 결제번호로 강제 적립을 진행합니다.</br> 진행하시겠습니까?",
			function(r){
				if (r) {
					var param = { paymentTransactionNo : node.paymentTransactionNo }
					returnp.api.call("accForcedPaymentTransaction", param, function(res){
						if (res.resultCode  == "100") {
							$.messager.alert('알림', res.message);
							realodPage();
						}else {
							//console.log("[오류]");
							//console.log(res);
							$.messager.alert('오류 발생', res.message);
						}
					});
				}
			});
}


function removePaymentTransaction(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','삭제하실 항목을 선택해주세요');
		 return;
	}
	
	$.messager.confirm('삭제', /*item.data.memberEmail +*/ ' 해당 내용을 정말로 삭제하시겠습니까?', function(r){
        if (r){
        	var param = {
        			paymentTransactionNo : node.paymentTransactionNo
        	}
        	returnp.api.call("deleteVanPaymentTransaction", param, function(res){
        		if (res.resultCode  == "100") {
        			$.messager.alert('알림', res.message);
        			realodPage();
        		}else {
        			//console.log("[오류]");
        			//console.log(res);
        			$.messager.alert('오류 발생', res.message);
        		}
        	});
        }
    });
}

function selectPaymentTransactions(index, row){
	//var param = {searchDateStart : row.searchDate, searchDateEnd : row.searchDate};
	if (row.searchDate == '총계') {return;}
	var param = {searchDate : row.searchDate};
	var opts = $('#node_list').datagrid('options');
	var total = $('#node_list').datagrid('getData').total;
	if (index == 'pager' ){
		$.extend(param, {
			pagination : opts.pagination,
			pageSize : opts.pageSize,
			page : opts.pageNumber,
			total : total,
			offset : (opts.pageNumber-1) * opts.pageSize
		});
	}else {
		opts.pageNumber = 1;
		$.extend(param, {
			pagination : opts.pagination,
			pageSize : opts.pageSize,
			page : opts.pageNumber,
			total : total,
			offset : (opts.pageNumber-1) * opts.pageSize
		});
	}
	
	$.extend(param, $('#searchForm').serializeObject());
	returnp.api.call("loadPaymentTransaction", param, function(res){
		console.log(res);
		if (res.resultCode == "100") {
			$('#node_list').datagrid({
				data : res,
				title : '[검색 결과] ' + res.total + " 개의 결과가 검색되었습니다",
			});
			setListPager();
		}else {
			$.messager.alert('오류 발생', message);
		}
	});
}

function setListPager2(){
	var pager = $('#summary_table').datagrid().datagrid('getPager');
	pager.pagination({
		/*displayMsg : ' {from} to {to} of {total}',*/
		buttons:[{
            iconCls:'icon-large-chart',
            text  : "<span style = 'font-weight: 600'>차트 보기</span>",
            handler:function(){
            	var rows = $('#summary_table').datagrid("getRows");
            	if (rows.length == 0) return;
            	console.log(rows);
            	var cartes = [];
            	var saleCounts = [] 
            	var paySumDatas = [];
            	var payAppDatas = [];
            	var payCancelDatas = [];
            	for (var i = 0; rows.length; i++){
            		if (i  == rows.length - 1) break;
            		cartes.push(rows[i].searchDate);
            		saleCounts.push(rows[i].payCase);
            		paySumDatas.push(rows[i].salesSum);
            		payAppDatas.push(rows[i].salesApprovalSum);
            		payCancelDatas.push(-rows[i].salesCancelSum);
            	}
            	
            	
            	$('#chart_container').dialog({
            		title: "chart",
            		width: 1300,
            		height: 700,
            		closed: false,
            		cache: false,
            		modal: true,
            		buttons:  [ {
            			text : '확인',
            			iconCls : 'icon-ok',
            			handler : function() {
            				$("#chart_container").dialog('close');
            			}
            		}]
            	});
            	
            	
            	Highcharts.chart('chart_container', {
            		chart : {
            			zoomType : "x",
            			
            		},
            		title: {
            	        text: ''
            	    },
            	    subtitle: {
            	        text: ''
            	    },
            	    tooltip: {
            	        shared: true,
            	        crosshairs: true
            	    },
            	    xAxis: {
                        categories: cartes,
                        
                    },
            	    yAxis: {
            	        title: {
            	            text: '금액'
            	        }
            	    },
            	    legend: {
            	        layout: 'vertical',
            	        align: 'right',
            	        verticalAlign: 'middle'
            	    },
            	    plotOptions: {
            	        series: {
            	            label: {
            	                connectorAllowed: false
            	            },
            	        }
            	    },

            	    series: [/*{
            	        name: '결제 건수',
            	        saleCounts
            	    },*/ {
            	        name: '최종 결제 금액',
            	        data:paySumDatas
            	    }, {
            	        name: '결제 승인 금액',
            	        data: payAppDatas
            	    }, {
            	        name: '결제 취소 금액',
            	        data:payCancelDatas
            	    }],

            	    responsive: {
            	        rules: [{
            	            condition: {
            	                maxWidth: 500
            	            },
            	            chartOptions: {
            	                legend: {
            	                    layout: 'horizontal',
            	                    align: 'center',
            	                    verticalAlign: 'bottom'
            	                }
            	            }
            	        }]
            	    }

            	});
            }
        }],
        layout:[ ],
    }); 
}

function setListPager(){
	var pager = $('#node_list').datagrid().datagrid('getPager');
	pager.pagination({
		/*displayMsg : ' {from} to {to} of {total}',*/
		buttons:[
			{
	            iconCls:'icon-add',
	            text : "엑셀 변환",
	            handler:function(){
	            	gridToExcel('#node_list','payment_transactionl.xls');
	            }
	        },{
            iconCls:'icon-chart',
            handler:function(){
            	$('#node_list').datagrid('unselectAll');
            	$('#node_list').datagrid('uncheckAll');
            }
        }],
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep' /*,'refresh','info'*/ ],
        onSelectPage:function(page,rows){        	
        	var opts = $('#node_list').datagrid('options');
        	opts.pageSize=rows;
        	opts.pageNumber = page;
        	
        	var node = $('#summary_table').datagrid('getSelected');
        	if (!node) {
        		 $.messager.alert('알림','선택이 필요합니다.');
        		 return;
        	}
        	selectPaymentTransactions("pager", node);
    	}
    }); 
}

/**
 * 검색 실행시 필요한 쿼리 데이타 구성 
 * @returns
 */
function makeSearchParam(){
	
	var param = $('#searchForm').serializeObject();
	var opts = $('#node_list').datagrid('options');
	var total = $('#node_list').datagrid('getData').total;
	
	$.extend(param, {
		pagination : opts.pagination,
		pageSize : opts.pageSize,
		page : opts.pageNumber,
		total : total,
		offset : (opts.pageNumber-1) * opts.pageSize
	});
	return param;
}


function realodPage(){
	$('#search_btn').click();
}

$(function(){
	initView();
	$('#search_btn').click();
/*	$('#node_list').datagrid().datagrid('enableCellEditing');
	setListPager();
	realodPage();*/
})
