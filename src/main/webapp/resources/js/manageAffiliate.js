	columns = [[
	    	//{field:'check',width:30,align:'center',title : '선택',checkbox : true},
			   // {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
			    {field:'affiliateNo',width:20,align:'center',title : '번호',hidden:false},
			    {field:'memberName',width:30,align:'center',title : '회원 이름'},
			    {field:'memberEmail',width:60,align:'center',title : '이메일'},
			    {field:'affiliateName',width:55,align:'center',title : '가맹점 이름'},
			    {field:'affiliateCode',width:60,align:'center',title : '가맹점 코드',hidden:false},
			    {field:'affiliateTel',width:60,align:'center',title : '가맹점 전화',hidden:false},
			    {field:'affiliateType',width:45,align:'center',title : '분류' , formatter : affiliateTypeFormatter},
			    {field:'category1NoName',width:45,align:'center',title : 'Cate 1', formatter : slashFormatter},
			    {field:'category2NoName',width:45,align:'center',title : 'Cate 2',formatter : slashFormatter},
			    {field:'affiliateStatus',width:30,align:'center',title : '상태',formatter : affiliateStatusFormatter},
			    {field:'paymentRouterNo',width:30,align:'center',title : '라우터 번호', hidden:true },
			    {field:'paymentRouterCode',width:30,align:'center',title : '라우터 코드', hidden:true},
			    {field:'paymentRouterType',width:25,align:'center',title : 'RT' , formatter: paymentRouterTypeFormatter },
			    {field:'paymentRouterName',width:30,align:'center',title : 'RN'  , formatter : paymentRouterNameFormatter },
			    {field:'affiliateSerialCount',width:20,align:'center',title : 'TID 수'},
			    {field:'affiliateSerial',width:50,align:'center',title : '주 TID(ID)'},
			  //  {field:'noname',width:30,align:'center',title : 'TID 보기' , formatter : tidActionFormatter, hidden: true},
			    {field:'affiliateComm',width:30,align:'center',title : 'QR 적립율'},
			    {field:'giftCardPayRefundRate',width:30,align:'center',title : 'GIFT 요율'},
			    {field:'greenPointAmount',width:50,align:'center',title : 'G POINT', formatter : numberGreenFormatter},
			    {field:'redPointAmount',width:50,align:'center',title : 'R POINT', formatter : numberRedFormatter},
			    {field:'ciderPayStatus',width:20,align:'center',title : 'CIDER', formatter :ciderPayStatusFormattter },
			    {field:'agencyName',width:35,align:'center',title : '대리점', hidden:false,formatter : slashFormatter},
			    {field:'recommenderName',width:30,align:'center',title : '추천인'},
			    {field:'greenPointAccStatus',width:15,align:'center',title : 'G 적립', formatter : ynFormatter},
			    {field:'redPointAccStatus',width:15,align:'center',title : 'R 적립', formatter : ynFormatter},
			    {field:'greenPointUseStatus',width:15,align:'center',title : 'G 사용', formatter : ynFormatter},
			    {field:'redPointUseStatus',width:15,align:'center',title : 'R 사용', formatter : ynFormatter},
//			    {field:'affiliateAddress',width:40,align:'center',title : '가맹점 주소',hidden:true},
//			    {field:'affiliateTel',width:40,align:'center',title : '가맹점 전화',hidden:true},
//			    {field:'affiliatePhone',width:30,align:'center',title : '가맹점 핸드폰',hidden:true},
			    {field:'createTime',width:40,align:'center',title : '등록일',formatter : dateFormatter},
			    {field:'updateTime',width:40,align:'center',title : '수정일',formatter : dateFormatter,hidden:true},
			    {field:'memberNo',width:15,align:'center',title : 'memberNo',hidden:true},
			    {field:'branchNo',width:15,align:'center',title : 'barachNo',hidden:true},
			    {field:'recommenderNo',width:15,align:'center',title : 'recommenderNo',hidden:true}
			    ]];

	affiliateTidCols = [[
		{field:'affiliateTidNo',width:60,align:'center',title : '등록 번호'},
		{field:'affiliateNo',width:60,align:'center',title : '협력 업체 번호'},
		{field:'affiliateName',width:100,align:'center',title : '협력 업체 이름'},
		{field:'tid',width:70,align:'center',title : 'TID',editor:'text'},
		{field:'noField1',width:40,align:'center',title : '수정',formatter : tidActionFormatter},
		{field:'noField2',width:40,align:'center',title : '삭제',formatter : tidDelFormatter},
		{field:'createTime',width:95,align:'center',title : '등록일',formatter : dateFormatter},
		{field:'updateTime',width:95,align:'center',title : '수정일',formatter : dateFormatter}
		]];

	bankListCols = [[
		{field:'memberBankAccountNo',width:60,align:'center',title : '등록 번호'},
		{field:'memberNo',width:60,align:'center',title : '회원 번호'},
		{field:'bankName',width:100,align:'center',title : '은행명',editor:'text'},
		{field:'accountOwner',width:70,align:'center',title : '계좌주',editor:'text'},
		{field:'bankAccount',width:150,align:'center',title : '계좌 번호',editor:'text'},
		{field:'accountStatus',width:40,align:'center',title : '상태',editor:'text'},
		{field:'isDefault',width:60,align:'center',title : '주 계좌' /*,editor:{type:'radio',options:{on:'Y',off:'N'}}*/ , formatter : defaultAccountFormatter},
		{field:'createTime',width:70,align:'center',title : '등록일',formatter : dateFormatter},
		{field:'updateTime',width:70,align:'center',title : '수정일',formatter : dateFormatter},
		{field:'noField1',width:40,align:'center',title : '수정',formatter : bankAccountUpdateActionFormatter},
		{field:'noField2',width:40,align:'center',title : '삭제',formatter : bankAccountDeleteActionFormatter},
		]];
initView();
var exitColumns = [/* 'greenPointAmount', 'redPointAmount', 'recommenderName', 'greenPointAccStatus','redPointUseStatus' ,'branchNo','recommenderNo' ,'agencyName'*/ ];
if (loginType != 1) {
	for (var i = 0; i < columns[0].length ; i++){
		/*console.log(columns[0][i].field);*/
		if (exitColumns.hasValue(columns[0][i].field)) {
			$('#node_list').datagrid('hideColumn', columns[0][i].field);
		}
	}
}


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

	/* 노드 타입 셀렉트 박스  초기화*/
	$('#searchNodeType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		readonly:true,
		width: 140
	});

	/* 노드 상태 셀렉트 박스  초기화*/
	$('#searchNodeStatus').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		width: 100
	});

	/* 검색어 타입 셀렉트 박스  초기화*/
	$('#searchKeywordType').combobox({
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
	$('#searchDateStart').datebox({
	    prompt : "검색 시작 일자",
	    labelPosition: 'top',
	    width: 150,
	    formatter :  searchDateFomatter
	});

	/* 검색 종료일 갤린더 박스  초기화*/
	$('#searchDateEnd').datebox({
	    prompt : "검색 종료 일자",
	    showSeconds: true,
	    labelPosition: 'top',
	    width: 150,
	    formatter :  searchDateFomatter
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

	/* 검색 버튼  초기화*/
	$('#search_btn').linkbutton({
		onClick : function(){
			//$.messager.progress();
			var param = makeSearchParam();
			console.log("쿼리 데이타");
			console.log(param);
			//console.log("검색 쿼리 데이타");
			//console.log(param);

			returnp.api.call("getNodes", param, function(res){

				if (res.resultCode == "100") {
					/*setListColumnHeader(param.searchNodeType);*/
					console.log(res);
					$('#node_list').datagrid({
						data : res,
						title : '[검색 결과] ' + res.total + " 개의 결과가 검색되었습니다",
					});
					setListPager();
				}else {
					$.messager.alert(res.message, res.data);
				}
			});
		},
		width : 70,
		iconCls:'icon-search'
	});

	/* 리셋 버튼  초기화*/
	$('#reset_btn').linkbutton({
		onClick : function(){
			$('#searchForm').form('clear');
			$('#searchNodeStatus').combobox('select', 0);
			$('#searchKeywordType').combobox('select', 0);
			$('#searchKeyword').textbox('clear');
			$('#searchDateStart').datebox('clear');
			$('#searchDateEnd').datebox('clear');
		},
		width : 70
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
		  			case "create":
		  				break;
		  			case "modify":
		                  loadAffiliateModifyForm();
		  				break;
		  			case "remove":
		  				removeAffiliate();
		  				break;
		  			case "createPaymentRouterForm":
		  				createPaymentRouterForm();
		  				break;
		  			case "viewTids":
		  				openTidsListView();
		  				break;
		  			case "addTid":
		  				openAddTidView();
		  				break;
		  			case "add_bank":
		  				openBankAdd();
		  				break;
		  			case "view_bank":
		  				openBankList();
		  				break;
		  			case "more_detail":
		  				break;
		  			case "point_acc_view":
		  				var node = $('#node_list').datagrid('getSelected');
		  				if (!node) {
		  					 $.messager.alert('알림','세부 내역을 확인하실 항목을 선택해주세요');
		  					 return;
		  				}
		  				loadPaymentPointbackRecord(
		  					"Green Point 누적 지급 현황",
		  					{
		  						memberNo : node.memberNo,
		  						nodeType : 5
		  					}
		  				);
		  				break;
		  			case "use_ciderpay":
		  				changeCiderPayStatus("Y");
		  				break;
		  			case "stop_ciderpay":
		  				changeCiderPayStatus("N");
		  				break;
		  			case "open_biz_info":
		  				openBizInfo();
		  				break;
		  			case "createAffiliateTag":
		  				createAffiliateTagForm();
		  				break;
		  			}

		  		}
		  	});

		  	var menus = [  '수정', '삭제','상세 정보','가맹점 태그 등록/수정', '결제 라우터 등록/변경', '가맹점 TID 보기', '가맹점 TID 추가 ','계좌 추가','계좌 리스트' ,'사업장 정보 등록' ,'포인트 누적 현황'  ];
		  	var icons = ['icon-edit','icon-remove','icon-tip','icon-add', 'icon-tip','icon-add',   'icon-add', 'icon-add', 'icon-add' , 'icon-add', 'icon-large-chart'];
		  	var actions = ['modify','remove','more_detail','createAffiliateTag', 'createPaymentRouterForm', 'viewTids', 'addTid','add_bank', 'view_bank', 'open_biz_info', 'point_acc_view'];

		  	if (!row['ciderPayStatus'] || row.ciderPayStatus == null || row.ciderPayStatus == "N" ) {
		  		menus.push("Cider Pay 사용");
		  		icons.push('icon-add');
		  		actions.push("use_ciderpay")
		  	}else if (row.ciderPayStatus =="Y"){
		  		menus.push("Cider Pay 중지");
		  		icons.push('icon-remove');
		  		actions.push("stop_ciderpay")
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
	    columns:columns,
	});

	/* 노드 데이타그리드   초기화*/
	$('#bank_list_table').datagrid({
		title : '은행 계좌]',
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
		  	/*alert(row.memberBankAccountNo)*/
		  	var cmenu = $('<div/>').appendTo('body');
		  	cmenu.menu({
		  		onClick : function(item){
		  			switch(item.action){
		  			case "defaultAccount":
		  				setDefaultBankAccount(row.memberBankAccountNo);
		  				break;
		  			}
		  		}
		  	});

		  	var menus = [  '주 계좌 지정'];
		  	var icons = ['icon-edit'];
		  	var actions = ['defaultAccount'];

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
	    columns:columns,

	});
	setListPager();
	$('#add_tid_btn').linkbutton({
		onClick : function(){
			addAffiliateTid();
		},
		iconCls:'icon-ok'
	});

	/* Tid  생성 버튼*/
	$('#gen_tid').linkbutton({
		onClick : function(){
			var param = {};
			var node = $('#node_list').datagrid('getSelected');
			var affTypes = node.affiliateType.split(",");

			if (affTypes.hasValue("A001")) {
				param.affiliateType = "A001";
			}else if (affTypes.hasValue("A003")) {
				param.affiliateType = "A003";
			}else if (affTypes.hasValue("A004")) {
				param.affiliateType = "A004";
			}
			returnp.api.call('genTid', param, function(res){
				$("#add_tid").textbox('setValue', res.data);
			});
		},
		iconCls:'icon-add'
	});

	$('#cancel_btn').linkbutton({
		onClick : function(){
			$('#add_affiliate_tid_virew').dialog('close')
		}
	});

	var tidGrid = $('#tid_list').datagrid({
		singleSelect:true,
		collapsible:false,
		fitColumns:true,
		selectOnCheck : false,
		checkOnSelect : false,
		border:true,
		rownumbers : true,
	    columns:affiliateTidCols,
	});

	tidGrid.datagrid('enableCellEditing').datagrid('gotoCell', {
/*	    index: 0,
	    field: 'productid'*/
	});

	var bankAccountGrid = $('#bank_list_table').datagrid({
		singleSelect:true,
		collapsible:false,
		fitColumns:true,
		selectOnCheck : false,
		checkOnSelect : false,
		border:true,
		rownumbers : true,
	    columns:bankListCols
	});

/*	bankAccountGrid.datagrid('enableCellEditing').datagrid('gotoCell', {
		    index: 0,
		    field: 'productid'
		});*/

	$('#memberBankAccountNo').textbox({
		label : roundLabel("등록번호"),
		readonly : true
	});

	$('#bankName').textbox({
		label : roundLabel("은행명"),
		prompt: '은행 이름 입력',
	});

	$('#accountOwner').textbox({
		label : roundLabel("계좌주"),
		prompt: '실제 계좌주 입력',
	});

	$('#bankAccount').textbox({
		label : roundLabel("계좌 번호"),
		prompt: '계좌 번호 입력',
	});

	$('#paymentRouterType').combobox({
		label : roundLabel("라우터 타입"),
		editable: false,
		panelHeight: 'auto',
		multiple:false,
		onSelect : function (record){
			returnp.api.call("selectPaymentRouters", {paymentRouterType: record.value}, function(res){
				if (res.resultCode  == "100") {
    				$('#paymentRouter').combobox("clear");
    				var data = [];
    				for (var i = 0; i < res.rows.length ; i ++){
    					data.push({ paymentRouterValue: res.rows[i].paymentRouterName , paymentRouterText : res.rows[i].paymentRouterName});
    				}
					data.push()
					$('#paymentRouter').combobox('loadData', data);
					$('#paymentRouter').combobox('select', res.rows[0].paymentRouterName);
    			}else {
    				$.messager.alert('오류 발생', res.message);
    			}
			});
		}
	});

	$('#paymentRouter').combobox({
		label : roundLabel("라우터"),
		valueField: 'paymentRouterValue',
        textField: 'paymentRouterText',
        panelHeight: 'auto',
		multiple:false
	});

	$('#businessNumber').textbox({
		label : roundLabel("사업자 번호")

	});

	$('#businessType').textbox({
		label : roundLabel("사업자 업태")
	});

	$('#businessItem').textbox({
		label : roundLabel("사업자 업종")
	});

	$('#affiliate_tag_form').form();

	$('#affiliateTag').textbox({
	//	label : roundLabel("태그")
	});

}

function setListPager(){
	var pager = $('#node_list').datagrid().datagrid('getPager');
	pager.pagination({
		displayMsg : ' {from} to {to} of {total}',
		buttons:[	{
            iconCls:'icon-add',
            text : "엑셀 변환",
            handler:function(){
            	gridToExcel('#node_list','affiliates.xls');
            }
        },{
            iconCls:'icon-add',
            handler:function(){
            	$('#node_list').datagrid('unselectAll');
            	$('#node_list').datagrid('uncheckAll');
                loadAffiliateCreateForm();
            }
        },{
            iconCls:'icon-edit',
            handler:function(){
                  loadAffiliateModifyForm();
            }
        },{
            iconCls:'icon-remove',
            handler:function(){
            	removeAffiliate();
            }
        },{
            iconCls:'icon-tip',
            handler:function(){
            	refreshMainTid();
            }
        }],
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh','info'],
        onSelectPage:function(page,rows){
        	var opts = $('#node_list').datagrid('options');
        	opts.pageSize=rows;
        	opts.pageNumber = page;
        	realodPage();
    	}
    });
}

/**
 * 노드 타입에 따라 리스트 그리드 컬럼 헤더 변경
 * @param param
 * @returns
 */
function setListColumnHeader(nodeType){
	$('#node_list').datagrid({
		columns : columns
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

function statusFormatter(value,row,index){
	var status = row.memberStatus;
	return '&nbsp;<span >'+ status + '</span>';
}

function loadAffiliateCreateForm(){
	var nodeType = $('input[name=searchNodeType]').val();
  	var data = {
        targetElem : "#dlgForm",
        title : "협력 업체(가맹점) 생성",
        queryOptions : {
          	action : "create",
         }
     }

	//console.log("loadAffiliateCreateForm");
	var queryParam = $.param(data.queryOptions);
	$(data.targetElem).load("/api/affiliate/form/createForm?" + queryParam,
		function(response, status, xhr) {
		$(data.targetElem).dialog({
			width:650,
			position : "top",
			height : $( window ).height() - 80,
			top :20,
			cache : false,
			fit : false,
			modal : true,
			closable : true,
			border : 'thick',
			shadow : true,
			collapsible : false,
			draggable : true,
			minimizable : false,
			resizable : true,
			cls : "c2",
			maximizable: false,
			title : "&nbsp; " + data.title,
			shadow : false,
			buttons:[
				{ text:'확인', iconCls:'icon-ok', handler:function(){
					var nodeType = $('input[name=searchNodeType]').val();
					createAffiliate(data);
				} },
				{ text:'취소', handler:function(){
					//console.log("닫을 DIV : " + data.targetElem);
					$(data.targetElem).dialog('close');
					$(data.targetElem).removeAttr('style');
				}
				}]
		});
		$(data.targetElem).dialog('hcenter');
	});
}

function updateTid(affiliateTidNo, elem){
	var node = $('#node_list').datagrid('getSelected');
	var affiliateNo = node.affiliateNo;
	var newTid = $(elem).parent().parent().prev().find('div').html();
	var data = {affiliateTidNo : affiliateTidNo, tid : newTid, affiliateNo : affiliateNo};
	console.log(data);
	returnp.api.call("updateAffiliateTid", data, function(res){
		console.log(res);
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
		}else {
			$.messager.alert('오류 발생', res.message);
		}
		realodPage();
		var node = $('#node_list').datagrid('getSelected');
		returnp.api.call("selectAffiliateTids", {affiliateNo : node.affiliateNo}, function(res){
			if (res.resultCode  == "100") {
				$('#tid_list').datagrid({
					data : res
				});
			}else {
				$.messager.alert('오류 발생', res.message);
			}
		});
	});
}

function removeTid(affiliateTidNo, elem){
	$.messager.confirm({
		title: 'TID 삭제',
		msg: 'TID 를 삭제하시겠습니까?',
		fn: function(r){
			if (r){
				returnp.api.call("removeAffiliateTid", {affiliateTidNo :affiliateTidNo }, function(res){
					console.log(res);
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}
					var node = $('#node_list').datagrid('getSelected');

					returnp.api.call("selectAffiliateTids", {affiliateNo : node.affiliateNo}, function(res){
						if (res.resultCode  == "100") {
							$('#tid_list').datagrid({
								data : res
							});
						}else {
							$.messager.alert('오류 발생', res.message);
						}
					});
				});
			}
		}
	});
}
function setDefaultBankAccount(memberBankAccountNo){
	$.messager.confirm({
		title: '주 계좌 설정',
		msg: '선택한 계좌를 주 계좌로 설정하시겠습니까?',
		fn: function(r){
			if (r){
				returnp.api.call("defaultBankAccount", {memberBankAccountNo : memberBankAccountNo, memberNo:  $('#node_list').datagrid('getSelected').memberNo}, function(res){
					console.log(">>setDefaultBankAccount");
					console.log(res);
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}

					var node = $('#node_list').datagrid('getSelected');
					returnp.api.call("getMemberBankAccounts", {memberNo:  $('#node_list').datagrid('getSelected').memberNo}, function(res){
						if (res.resultCode  == "100") {
							$('#bank_list_table').datagrid({
								data : res
							});
						}else {
							$.messager.alert('오류 발생', res.message);
						}
					});
				});
			}
		}
	});
}

function openBankAdd(){
	$('#memberBankAccountNo').textbox({prompt : "입력할 필요 없음"});
	$('#memberBankAccountNo').textbox('disable');
	$('#bankName').textbox('clear');
	$('#bankName').textbox('clear');
	$('#accountOwner').textbox('clear');
	$('#bankAccount').textbox('clear');

	var node = $('#node_list').datagrid('getSelected');
	$('#bank_add_dlg').dialog({
	    title: " " + node.affiliateName + ' 계좌 추가  ',
	    width: 500,
	    height: 350,
	    closed: false,
	    cache: false,
	    modal: true,
		buttons : [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				addBankAccount();
			}
		}, {
			text : '취소',
			handler : function() {
				$('#bankName').textbox('clear');
				$('#memberBankAccountNo').textbox('clear');
				$('#accountOwner').textbox('clear');
				$('#bankAccount').textbox('clear');
				$('#bank_add_dlg').dialog('close');
			}
		} ]
	});

	$('#add_tid').textbox({width : 200});
	$('#add_tid').textbox("clear");
}

function openBankUpdate(memberBankAccountNo){
	var rows = $('#bank_list_table').datagrid('getRows');
	var selectedRow = null;
	for (var i = 0; i < rows.length ; i++){
		if (rows[i].memberBankAccountNo == memberBankAccountNo){
			selectedRow = rows[i];
		}
	}

	if (selectedRow == null) {
		$.messager.alert('알림', "수정하실 항목을 선택해주세요" );
	}
	$('#memberBankAccountNo').textbox('enable');
	$('#memberBankAccountNo').textbox({readonly : true});
	$('#memberBankAccountNo').textbox('setValue',selectedRow.memberBankAccountNo );
	$('#bankName').textbox('setValue',selectedRow.bankName );
	$('#accountOwner').textbox('setValue',selectedRow.accountOwner );
	$('#bankAccount').textbox('setValue',selectedRow.bankAccount );

	var node = $('#node_list').datagrid('getSelected');
	$('#bank_add_dlg').dialog({
	    title: " " + node.affiliateName + ' 계좌 수정  ',
	    width: 500,
	    height: 350,
	    closed: false,
	    cache: false,
	    modal: true,
		buttons : [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				updateBankAccount();
			}
		}, {
			text : '취소',
			handler : function() {
				$('#bankName').textbox('clear');
				$('#accountOwner').textbox('clear');
				$('#bankAccount').textbox('clear');
				$('#bank_add_dlg').dialog('close');
			}
		} ]
	});

	$('#add_tid').textbox({width : 200});
	$('#add_tid').textbox("clear");
}
function addBankAccount(){
	var params = {
			memberNo:  $('#node_list').datagrid('getSelected').memberNo,
			bankName : $('#bankName').textbox('getValue').trim(),
			accountOwner : $('#accountOwner').textbox('getValue').trim(),
			bankAccount : $('#bankAccount').textbox('getValue').trim()
	}
	$.messager.confirm({
		title: '계좌 등록',
		msg: '계좌 정보를 등록하시겠습니까?',
		fn: function(r){
			if (r){
				returnp.api.call("createMemberBankAccount2", params, function(res){
					console.log(res);
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}

					$('#bankName').textbox('clear');
					$('#accountOwner').textbox('clear');
					$('#bankAccount').textbox('clear');
					$('#bank_add_dlg').dialog('close');

					var node = $('#node_list').datagrid('getSelected');
					returnp.api.call("getMemberBankAccounts", {memberNo : node.memberNo}, function(res){
						if (res.resultCode  == "100") {
							$('#bank_list_table').datagrid({
								data : res
							});
						}else {
							$.messager.alert('오류 발생', res.message);
						}
					});
				});
			}
		}
	});
}

function updateBankAccount(){
	var params = {
		memberBankAccountNo: $('#memberBankAccountNo').textbox('getValue').trim(),
		bankName : $('#bankName').textbox('getValue').trim(),
		accountOwner : $('#accountOwner').textbox('getValue').trim(),
		bankAccount : $('#bankAccount').textbox('getValue').trim()
	}
	$.messager.confirm({
		title: '계좌 업데이트',
		msg: '계좌 정보를 업데이트 하시겠습니까?',
		fn: function(r){
			if (r){
				returnp.api.call("updateMemberBankAccount2", params, function(res){
					console.log(res);
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}

					$('#bankName').textbox('clear');
					$('#memberBankAccountNo').textbox('clear');
					$('#accountOwner').textbox('clear');
					$('#bankAccount').textbox('clear');
					$('#bank_add_dlg').dialog('close');

					var node = $('#node_list').datagrid('getSelected');
					returnp.api.call("getMemberBankAccounts", {memberNo : node.memberNo}, function(res){
						if (res.resultCode  == "100") {
							$('#bank_list_table').datagrid({
								data : res
							});
						}else {
							$.messager.alert('오류 발생', res.message);
						}
					});
				});
			}
		}
	});
}

function removeBankAccount(memberBankAccountNo, elem){
	$.messager.confirm({
		title: '계좌 삭제',
		msg: '계좌 를 삭제하시겠습니까?',
		fn: function(r){
			if (r){
				returnp.api.call("deleteMemberBankAccount", {memberBankAccountNo :memberBankAccountNo }, function(res){
					console.log(res);
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}
					var node = $('#node_list').datagrid('getSelected');
					returnp.api.call("getMemberBankAccounts", {memberNo : node.memberNo}, function(res){
						if (res.resultCode  == "100") {
							$('#bank_list_table').datagrid({
								data : res
							});
						}else {
							$.messager.alert('오류 발생', res.message);
						}
					});
				});
			}
		}
	});
}


function changeCiderPayStatus(status){
	var node = $('#node_list').datagrid('getSelected');
	var title = status == "Y" ?"Cider Pay 결제를 사용하시겠습니까": "Cider Pay 결제를 중지하시겠습니까?"
	$.messager.confirm({
		title: '사이다 페이 서비스 ',
		msg: node.affiliateName + ' 협력업체' + title,
		fn: function(r){
			if (r){
				returnp.api.call("changeCiderPayStatus", {affiliateNo :node.affiliateNo, ciderPayStatus : status }, function(res){
					if (res.resultCode  == "100") {
						$.messager.alert('알림', res.message);
					}else {
						$.messager.alert('오류 발생', res.message);
					}

				});
			}
		}
	});
}
function openBankList(){
	var node = $('#node_list').datagrid('getSelected');
	$('#bank_list_dlg').dialog({
		title: "> " + node.affiliateName + ' 계좌   ',
		width: 1000,
		height: 600,
		closed: false,
		cache: false,
		modal: true,
		buttons:  [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				$("#bank_add_dlg").dialog('close');
			}
		}],
		onOpen : function(){
			returnp.api.call("getMemberBankAccounts", {memberNo : node.memberNo}, function(res){
				console.log(res);
				if (res.resultCode  == "100") {
					$('#bank_list_table').datagrid({
						data : res
					});
				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
		}
	});
}

function createPaymentRouterForm(){
	var node = $('#node_list').datagrid('getSelected');
	$('#createPaymentRouterFormDlg').dialog({
		title: "> " + node.affiliateName + ' 결제 라우터 등록 ',
		width: 400,
		height: 300,
		closed: false,
		cache: false,
		modal: true,
		onOpen : function(){
			$('#paymentRouterType').combobox("select" , "VAN");
			returnp.api.call("selectPaymentRouters", {paymentRouterType: "VAN"}, function(res){
				if (res.resultCode  == "100") {
    				$('#paymentRouter').combobox("clear");
    				var data = [];
    				for (var i = 0; i < res.rows.length ; i ++){
    					data.push({ paymentRouterValue: res.rows[i].paymentRouterName , paymentRouterText : res.rows[i].paymentRouterName});
    				}
					data.push()
					$('#paymentRouter').combobox('loadData', data);
					$('#paymentRouter').combobox('select', res.rows[0].paymentRouterName);
    			}else {
    				$.messager.alert('오류 발생', res.message);
    			}
			});
		},
		buttons:  [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				var paymentRouterType = $('#paymentRouterType').combobox("getValue");
				var paymentRouter = $('#paymentRouter').combobox("getValue");
				var affiliateNo = $('#node_list').datagrid('getSelected').affiliateNo;

				createAffilaitePaymentRouter({
					affiliateNo : affiliateNo,
					paymentRouterType : paymentRouterType,
					paymentRouterName : paymentRouter
				} );
			}
		},{
			text : '취소',
			handler : function() {
				$("#createPaymentRouterFormDlg").dialog('close');
			}
		}]
	});
}
function createAffilaitePaymentRouter(param){
	console.log(param);
	returnp.api.call("registerAffiliatePaymentRouter", param, function(res){
		if (res.resultCode  == "100") {
			$('#createPaymentRouterFormDlg').dialog('close');
			realodPage();
			$.messager.alert('알림', res.message);
		}else {
			$.messager.alert('오류 발생', res.message);
		}
	});
}

function openTidsListView(){
	var node = $('#node_list').datagrid('getSelected');
	$('#view_affiliate_tids').dialog({
		title: "> " + node.affiliateName + ' TIDS   ',
		width: 950,
		height: 600,
		closed: false,
		cache: false,
		modal: true,
		buttons:  [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				$("#view_affiliate_tids").dialog('close');
			}
		}],
		onOpen : function(){
			returnp.api.call("selectAffiliateTids", {affiliateNo : node.affiliateNo}, function(res){
				console.log(res);
				if (res.resultCode  == "100") {
					$('#tid_list').datagrid({
						data : res
					});
				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
		}
	});
}

function openAddTidView(){
	var node = $('#node_list').datagrid('getSelected');
	$("#aff_type").html(affiliateTypeFormatter(null, {affiliateType : node.affiliateType}, null));
	var types = node.affiliateType.split(",");
	if (!types.hasValue("A001") && !types.hasValue("A003") && !types.hasValue("A004")){
		 $.messager.alert('알림','가맹점, 온라인, 무사업자만이 TID 를 등록할 수 있습니다. </br> 제휴점만 있는 경우는 등록할 수 없습니다');
		 return;
	}

	if (types.hasValue("A001") ||  types.hasValue("A004")){
		$('#gen_tid').linkbutton('disable');
	}else {
		$('#gen_tid').linkbutton('enable');
	}

	$('#add_affiliate_tid_virew').dialog({
	    title: " " + node.affiliateName + ' TID 추가  ',
	    width: 600,
	    height: 250,
	    closed: false,
	    cache: false,
	    modal: true,
		buttons : [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				addAffiliateTid();
			}
		}, {
			text : '취소',
			handler : function() {
				$('#add_affiliate_tid_virew').dialog('close');
			}
		} ]
	});

	$('#add_tid').textbox({width : 200});
	$('#add_tid').textbox("clear");
}

function openBizInfo(){
	var node = $('#node_list').datagrid('getSelected');
	$('#biz_info_dlg').dialog({
	    title: " " + node.affiliateName + ' 사업정보 등록/수정 ',
	    width: 450,
	    height: 300,
	    closed: false,
	    cache: false,
	    modal: true,
		buttons : [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				 createBizInfo();
			}
		}, {
			text : '취소',
			handler : function() {
				$('#biz_info_form').dialog('close');
			}
		} ]
	});

	$('#businessNumber').textbox('clear');
	$('#businessType').textbox('clear');
	$('#businessItem').textbox('clear');

	param = {affiliateNo : node.affiliateNo};
	returnp.api.call("getBizInfo", param, function(res){
		if (res.resultCode  == "100") {
			$('#biz_info_form').form('load',res.data);
		}else {
		}
	});
}

function createBizInfo(){
	var node = $('#node_list').datagrid('getSelected');
	var param = $("#biz_info_form").serializeObject();
	param.affiliateNo = node.affiliateNo;
	console.log(param);
	var valid = true;
	var pro = null;
	for (var prop in param){
		if (param.hasOwnProperty(prop)) {
			if (param[prop] == '' || !param[prop]) {
				valid = false;
				pro =prop
				break;
			}
		}
	}

	if (!valid) {
		$.messager.alert('알림', pro + ' 항목이 입력되지 않았습니다');
		return;
	}
	returnp.api.call("createBizInfo", param, function(res){
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			$('#biz_info_dlg').dialog('close');
			$('#biz_info_dlg').removeAttr('style');
			realodPage();
		}else {
			$.messager.alert('오류 발생', res.message);
		}
	});

	return param;
}


function loadAffiliateModifyForm(actionType){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','수정하실 노드를 선택해주세요');
		 return;
	}

	var data = {
		targetElem : "#dlgForm",
        title : node.affiliateName + " 수정",
        queryOptions : {
        	action : "modify",
        	affiliateNo : node.affiliateNo,
        	memberAddressNo : node.memberAddressNo
        }
     }

	//console.log("loadAffiliateModifyForm");
	var queryParam = $.param(data.queryOptions);
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);

	$(data.targetElem).load("/api/affiliate/form/createForm?" + queryParam,
		function(response, status, xhr) {
		console.log("오픈할 DIV : " + data.targetElem);

		$(data.targetElem).dialog({
			width:650,
			cache : false,
			modal : true,
			closable : true,
			border : 'thick',
			height : $( window ).height() - 80,
			top :20,
			shadow : true,
			collapsible : false,
			minimizable : false,
			cls : "c2",
			maximizable: false,
			title : "&nbsp; " + data.title,
			shadow : false,
			buttons:[
				{ text:'확인', iconCls:'icon-ok', handler:function(){
					updateAffiliate(data);
				} },
				{ text:'취소', handler:function(){
					//console.log("닫을 DIV : " + data.targetElem);
					$(data.targetElem).dialog('close');
					$(data.targetElem).removeAttr('style');
				}
				}]
		});
		$(data.targetElem).dialog('hcenter');
		returnp.api.call('getAffiliateCommand', {
			affiliateNo : data.queryOptions.affiliateNo
			,memberAddressNo: data.queryOptions.memberAddressNo}, function(res){
				console.log(res.data);
				if (res.resultCode  == "100") {
					if (!res.data.category1No) {
						res.data.category1No = "0";
						res.data.category2No = "0";
					}


					$("#orgMemberNo").val(res.data.memberNo)
					$('#createAffiliateForm').form('load',res.data);
					if (res.data.category != "0"){
						returnp.api.call("getCategories", {categoryLevel : 2, parentCategoryNo :  res.data.category1No}, function(res2){
							if (res2.resultCode  == "100") {
								$('#category2No').combobox('clear');
								var data = [];
								for (var i = 0; i < res2.rows.length; i++){
									data.push({categoryNo:res2.rows[i].categoryNo ,categoryName : res2.rows[i].categoryName});
								}
								$('#category2No').combobox('loadData', data);
								$('#category2No').combobox('select', res.data.category2No);
							}else {
								//console.log("[오류]");
								//console.log(res);
							}
						});
					}

					//$('#memberNo').textbox({disabled : true });
					$("#affiliateRoad").textbox('setValue', res.data.zipNo + " " + res.data.roadFullAddr+ " " + res.data.addrDetail);
					modifyModeCallback(res.data.zipNo + " " + res.data.jibunAddr + " " + res.data.addrDetail,res.data.lat,res.data.lng);

				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
		});
}

function makeFormData(){
	var param = $("#createAffiliateForm").serializeObject();
	param.orgMemberNo = $("#orgMemberNo").val();
	return param;
}

function updateAffiliate(data){
	var param =makeFormData();
	if (param['affiliateType'] &&  typeof param['affiliateType'] != 'string'){
		param['affiliateType']  = param['affiliateType'].join(",");
	}
	returnp.api.call("updateAffiliate", param, function(res){
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			$(data.targetElem).dialog('close');
			$(data.targetElem).removeAttr('style');
			realodPage();

		}else {
			$.messager.alert('오류 발생', res.message);
		}
	});
}

function addAffiliateTid(){
	var node = $('#node_list').datagrid('getSelected');
	var param = {};
	param.affiliateNo = node.affiliateNo;
	param.tid = $('#add_tid').textbox("getValue");
	console.log(param);

	returnp.api.call("addAffiliateTid", param, function(res){
		$('#add_affiliate_tid_virew').dialog('close')
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			realodPage();
		}else {
			$.messager.alert('오류 발생', res.message);
		}
	});
}


function createAffiliate(data){
	console.log(">>> createAffiliate 호출됨");
	var param =makeFormData();
	if (param['affiliateType'] &&  typeof param['affiliateType'] != 'string'){
		param['affiliateType']  = param['affiliateType'].join(",");
	}
	console.log(param);
	//console.log("createAffiliate");
	//console.log(param);

	var valid = true;
/*	var pro = null;
	for (var prop in param){
		if (param.hasOwnProperty(prop)) {
			if (param[prop] == '') {
				valid = false;
				pro =prop
				break;
			}
		}
	}*/

	if (!valid) {
		$.messager.alert('알림', pro + ' 항목이 모두 입력되지 않았습니다');
		return;
	}

	returnp.api.call("createAffiliate", param, function(res){
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			$(data.targetElem).dialog('close');
			$(data.targetElem).removeAttr('style');
			realodPage();
		}else {
			$.messager.alert('오류 발생', res.message);
		}

	});
}
function refreshMainTid(){
	$.messager.confirm('주 TID 갱신', /*item.data.memberEmail +*/ '주 TID 를 갱신 하시겠습니까?', function(r){
        if (r){
          	returnp.api.call("refreshMainTid", {}, function(res){
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

function removeAffiliate(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','삭제하실 항목을 선택해주세요');
		 return;
	}

	$.messager.confirm('삭제', /*item.data.memberEmail +*/ ' 협력업체 정보 및 협력업체 포인트 관련 모든 정보가 삭제됩니다.</br>해당 내용을 정말로 삭제하시겠습니까?', function(r){
        if (r){
        	var param = {
        		affiliateNo : node.affiliateNo,
        		memberNo : node.memberNo
        	}
        	returnp.api.call("deleteAffiliate", param, function(res){
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

function createAffiliateTagForm(){
	$('#affiliate_tag_form').form('reset');
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','태깅할 협력업체를 선택해주세요');
		 return;
	}
	$('#affiliate_tag_dlg').dialog({
	    title: " " + node.affiliateName + ' 태그 등록  ',
	    width: 700,
	    height: 350,
	    closed: false,
	    cache: false,
	    modal: true,
		buttons : [ {
			text : '확인',
			iconCls : 'icon-ok',
			handler : function() {
				createAffiliateTag();
				$('#affiliate_tag_form').form('reset');
				$('#affiliate_tag_dlg').dialog('close');
			}
		}, {
			text : '취소',
			handler : function() {
				$('#affiliate_tag_form').form('reset');
				$('#affiliate_tag_dlg').dialog('close');
			}
		} ],
		onOpen : function(){
		   	var param = { affiliateNo : node.affiliateNo };
		   	returnp.api.call("getAffiliateTag", param, function(res){
		   		if (res.resultCode  == "100") {
		   			console.log(res);
		   			$("#affiliateTag").textbox("setValue", res.data.affiliateTag);

		   		}else {
		   			$.messager.alert('알림', res.message);
		   		}
		   	});
		}
	});
}

function createAffiliateTag(){
	var node = $('#node_list').datagrid('getSelected');
	var params = {
			 affiliateNo : node.affiliateNo,
			 affiliateTag : $("#affiliateTag").textbox('getValue').trim()
	}

	if (params.affiliateTag.length < 1 || params.affiliateTag.length > 60) {
		$.messager.alert('알림', "태그는 최소 1자 이상 , 60자 이하로 입력이 가능합니다.");
		return;
	}
	returnp.api.call("createAffiliateTag", params, function(res){
		console.log(res);
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
		}else {
			$.messager.alert('오류 발생', res.message);
		}
	});
}

function loadMap(address) {

   var geocoder = new google.maps.Geocoder();
   geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
    	var mapOptions = {
    		center: new google.maps.LatLng(lat, lng),
    		zoom: 18,
    		mapTypeId: google.maps.MapTypeId.ROADMAP
    	};
 	   	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
 	    //style="width:50%; height:100px;"
 	   	//$("#map-canvas").css("width","100%");
 	   	//$("#map-canvas").css("height","100px");
		marker = new google.maps.Marker({
			map: map,
			icon: 'resources/images/marker.gif',
			position: results[0].geometry.location
		});
		var content = address +"<br/>" + lat + "," +  lng; // 말풍선 안에 들어갈 내용
		$("#lat").val(lat);
		$("#lng").val(lng);
		// 마커를 클릭했을 때의 이벤트.
		var infowindow = new google.maps.InfoWindow({ content: content});
		google.maps.event.addListener(marker, "click", function() {infowindow.open(map,marker);});
      	} else {
        	alert("Geocode was not successful for the following reason: " + status);
      	}

    });

}

function loadMap2(address,lat,lng) {

	$("#lat").val(lat);
	$("#lng").val(lng);

	if(address !=''){
		//$("#map-canvas").css("width","100%");
 	   	//$("#map-canvas").css("height","100px");
	}

	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	marker = new google.maps.Marker({
		map: map,
		icon: 'resources/images/marker.gif',
		position: new google.maps.LatLng(lat, lng)
	});

	var content = address +"<br/>" + lat + "," +  lng; // 말풍선 안에 들어갈 내용

	// 마커를 클릭했을 때의 이벤트.
	var infowindow = new google.maps.InfoWindow({ content: content});
	google.maps.event.addListener(marker, "click", function() {infowindow.open(map,marker);});
}

function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	$("#roadFullAddr").val(roadFullAddr);
	$("#roadAddrPart1").val(roadAddrPart1);
	$("#roadAddrPart2").val(roadAddrPart2);
	$("#addrDetail").val(addrDetail);
	$("#engAddr").val(engAddr);
	$("#jibunAddr").val(jibunAddr);
	$("#zipNo").val(zipNo);
	$("#admCd").val(admCd);
	$("#rnMgtSn").val(rnMgtSn);
	$("#bdMgtSn").val(bdMgtSn);

	$("#affiliateAddress").textbox('setValue', zipNo + " " + jibunAddr + " " + addrDetail);
	$("#affiliateRoad").textbox('setValue', zipNo + " " + roadFullAddr+ " " + addrDetail);
	loadMap(jibunAddr);
}

function modifyModeCallback(jibunAddr,lat,lng){
	loadMap(jibunAddr,lat,lng);
}


function realodPage(){

	$('#search_btn').click();
}

$(document).ready(function(){
	$('#search_btn').click();
});
