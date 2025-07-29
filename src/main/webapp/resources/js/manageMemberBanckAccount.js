	columns = [[
	    	//{field:'check',width:30,align:'center',title : '선택',checkbox : true},
			   // {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
			    {field:'memberBankAccountNo',width:30,align:'center',title : '번호',hidden:false},
			    {field:'memberNo',width:50,align:'center',title : '회원 번호', hidden:false},
			    {field:'memberName',width:100,align:'center',title : '회원 이름'},
			    {field:'memberEmail',width:100,align:'center',title : '회원 이메일'},
			    {field:'memberPhone',width:100,align:'center',title : '회원 전화번호'},
			    {field:'bankName',width:100,align:'center',title : '은행명'},
			    {field:'accountOwner',width:70,align:'center',title : '계좌 소유주'},
			    {field:'bankAccount',width:130,align:'center',title : '은행 계좌번호'},
			    {field:'accountStatus',width:30,align:'center',title : '상태'},
			    {field:'createTime',width:100,align:'center',title : '등록일',formatter : dateFormatter},
			    {field:'regAdminNo',width:30,align:'center',title : '등록자'}
			    ]];
initView();

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
		prompt : "검색할 단어를 입력해주세요" ,
		inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{
			keyup:function(e){
				if(e.keyCode==13)
				realodPage();
			}
		})
	});
	
	/* 노드 타입 셀렉트 박스  초기화*/
	$('#searchKeywordType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
		readonly:true
	});
	
	/* 노드 상태 셀렉트 박스  초기화*/
	$('#searchAccountStatus').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
	});
	
	/* 검색 버튼  초기화*/
	$('#search_btn').linkbutton({
		onClick : function(){
			//$.messager.progress();
			var param = makeSearchParam();
			//console.log("검색 쿼리 데이타");
			//console.log(param);
			
			returnp.api.call("getMemberBankAccounts", param, function(res){
				
				if (res.resultCode == "100") {
					setListColumnHeader(param.searchNodeType);
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
		iconCls:'icon-search'
	});
	
	/* 리셋 버튼  초기화*/
	$('#reset_btn').linkbutton({
		onClick : function(){
			$('#searchForm').form('clear');
			$('#accountStatus').combobox('select', 0);
			$('#searchKeywordType').combobox('select', 0);
			$('#searchKeyword').textbox('clear');
		}
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
		                  loadMemberBankAccountModifyForm();
		  				break;
		  			case "remove":
		  				removeMemberBankAccount();
		  				break;
		  			}
		  		}
		  	});
		  	
		  	var menus = [  '수정', '삭제' ];
		  	var icons = ['icon-edit','icon-remove'];
		  	var actions = ['modify','remove'];
		  	
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
}

function setListPager(){
	var pager = $('#node_list').datagrid().datagrid('getPager');
	pager.pagination({
		displayMsg : ' {from} to {to} of {total}',
		buttons:[{
            iconCls:'icon-add',
            handler:function(){
            	$('#node_list').datagrid('unselectAll');
            	$('#node_list').datagrid('uncheckAll');
                loadMemberBankAccountCreateForm();
            }
        },{
            iconCls:'icon-edit',
            handler:function(){
                  loadMemberBankAccountModifyForm();
            }
        },{
            iconCls:'icon-remove',
            handler:function(){
            	removeMemberBankAccount();
            }
        },{
            iconCls:'icon-tip',
            handler:function(){
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

function loadMemberBankAccountCreateForm(){
	
	var nodeType = $('input[name=searchNodeType]').val();
  	var data = {
        targetElem : "#dlgForm",
        title : "회원 은행 계좌 등록",
        queryOptions : {
          	action : "create",
         }
     }
  	
	//console.log("loadMemberBankAccountCreateForm");
	var queryParam = $.param(data.queryOptions);
	$(data.targetElem).load("/api/memberBankAccount/form/createForm?" + queryParam,
			function(response, status, xhr) {
					
					$(data.targetElem).dialog({
						width:650,
						cache : false,
					    modal : true,
					    closable : true,
					    border : 'thick',
					    shadow : true,
					    collapsible : false,
					    minimizable : false,
					    maximizable: false,
					    title : "&nbsp; " + data.title,
					    shadow : false,	
						buttons:[
							{ text:'확인', iconCls:'icon-ok', handler:function(){
								var nodeType = $('input[name=searchNodeType]').val();
								createMemberBankAccount(data);
							} },
							{ text:'취소', handler:function(){
								//console.log("닫을 DIV : " + data.targetElem);	
								$(data.targetElem).dialog('close');
								$(data.targetElem).removeAttr('style');
							}
						}]
					});
					$(data.targetElem).dialog('center');
				
			});
}

function loadMemberBankAccountModifyForm(){
	
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','수정하실 노드를 선택해주세요');
		 return;
	}
	
	var data = {
		targetElem : "#dlgForm",
        title : '회원 은행 계좌 수정',
        queryOptions : {
        	action : "modify",
        	memberBankAccountNo : node.memberBankAccountNo
        }
     }
	//console.log("loadMemberBankAccountModifyForm");
	var queryParam = $.param(data.queryOptions);
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	
	$(data.targetElem).load("/api/memberBankAccount/form/createForm?" + queryParam,
		function(response, status, xhr) {
		console.log("오픈할 DIV : " + data.targetElem);	
		
				$(data.targetElem).dialog({
					width:650,
					cache : false,
				    modal : true,
				    closable : true,
				    border : 'thick',
				    shadow : true,
				    collapsible : false,
				    minimizable : false,
				    maximizable: false,
				    title : "&nbsp; " + data.title,
				    shadow : false,	
					buttons:[
						{ text:'확인', iconCls:'icon-ok', handler:function(){
							updateMemberBankAcccount(data);
						} },
						{ text:'취소', handler:function(){
							//console.log("닫을 DIV : " + data.targetElem);	
							$(data.targetElem).dialog('close');
							$(data.targetElem).removeAttr('style');
						}
					}]
				});
				$(data.targetElem).dialog('center');
				returnp.api.call('getMemberBankAccounts', {
					memberBankAccountNo : data.queryOptions.memberBankAccountNo}, function(res){
						console.log(res);
					if (res.resultCode  == "100") {		
						if (res.rows.length > 0) {
							$('#createMemberBankAccountForm').form('load',res.rows[0]);
							$('#memberNo').textbox({disabled : true });
							$('#regType').combobox('select',res.rows[0].regType);
						}
					}else {
						$.messager.alert('오류 발생', res.message);
					}
				});
			
		});
}


function makeFormData(){
	var param = $("#createMemberBankAccountForm").serializeObject();
	return param;
}

function updateMemberBankAcccount(data){
	var param =makeFormData();
	//console.log(param);
	returnp.api.call("updateMemberBankAccount", param, function(res){
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

function createMemberBankAccount(data){	
	var param =makeFormData();
	//console.log("createMemberBankAccount");
	//console.log(param);
		
	var valid = true;
	for (var prop in param){
		if (param.hasOwnProperty(prop)) {
			if (param[prop] == '') {
				valid = false;
				break;
			}
		}
	}
	
	/*if (!valid) {
		$.messager.alert('알림', '입력 항목이 모두 입력되지 않았습니다');
		return;
	}*/
		
	returnp.api.call("createMemberBankAccount", param, function(res){
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

function removeMemberBankAccount(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','삭제하실 항목을 선택해주세요');
		 return;
	}
	
	$.messager.confirm('삭제', /*item.data.memberEmail +*/ ' 해당 내용을 정말로 삭제하시겠습니까?', function(r){
        if (r){
        	var param = {
        		memberBankAccountNo : node.memberBankAccountNo
        	}
        	returnp.api.call("deleteMemberBankAccount", param, function(res){
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

function realodPage(){
	
	$('#search_btn').click();
}

$(document).ready(function(){
	$('#search_btn').click();
});
