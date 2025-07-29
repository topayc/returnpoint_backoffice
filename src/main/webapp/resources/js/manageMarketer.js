
columns = [[
	//{field:'check',width:30,align:'center',title : '선택',checkbox : true},
	   // {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
	    {field:'marketerNo',width:40,align:'center',title : 'No'},
	    {field:'marketerDegree',width:40,align:'center',title : '레벨'},
	    {field:'marketerCode',width:100,align:'center',title : '마케터 코드'},
	    {field:'parent',width:100,align:'center',title : '부모 마케터', formatter : slashFormatter},
	    {field:'memberName',width:100,align:'center',title : '마케터 이름', formatter : slashFormatter},
	    {field:'memberEmail',width:100,align:'center',title : '마케터 이메일', formatter : slashFormatter},
	    {field:'memberPhone',width:100,align:'center',title : '마케터 폰', formatter : slashFormatter},
	    {field:'marketerStatus',width:50,align:'center',title : '마케터 상태',formatter : marketerStatusFormatter},
	    {field:'regAdminNo',width:50,align:'center',title : '등록자', formatter : registAdminFormatter},
	    {field:'createTime',width:100,align:'center',title : '생성일',formatter : dateFormatter},
	    {field:'updateTime',width:100,align:'center',title : '수정일',formatter : dateFormatter}
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
	
	
	/* 노드 상태 셀렉트 박스  초기화*/
	$('#searchNodeStatus').combobox({
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
			var param = makeSearchParam();
			param.marketerNo = 0;
			returnp.api.call("getMarketers", param, function(res){
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
			$('#searchNodeStatus').combobox('select', 0);
			$('#searchKeywordType').combobox('select', 0);
			$('#searchKeyword').textbox('clear');
			$('#searchDateStart').datetimebox('clear');
			$('#searchDateEnd').datetimebox('clear');
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
		},	
		onRowContextMenu : function(e, index, row){
			e.preventDefault();
		  	$(this).datagrid("selectRow", index);
		  	var cmenu = $('<div/>').appendTo('body');
		  	cmenu.menu({
		  		onClick : function(item){
		  			switch(item.action){
		  			case "create":
		  				loadMarketerCreateForm();
		  				break;
		  			case "modify":
		  				loadMarketerUpdateForm();
		  				break;
		  			case "remove":
		  				removeMarketer();
		  				break;
		  			case "more_detail":
		  				loadMarketerDetailInfo();
		  				break;
		  			}
		  		}
		  	});
		  	
		  	var menus = [  '연결 정보 수정 ' /*'삭제',*//*'상세 정보' */];
		  	var icons = ['icon-edit' /*'icon-remove',*/ /*'icon-more' */];
		  	var actions = ['modify' /*'remove',*//*' more_detail' */];
		  	
		  	for(var i=0; i<menus.length; i++){
		  		cmenu.menu('appendItem', {
		  			data : row,
		  			no : row.memberNo,
		  			text:  "<strong>[" + row.marketerCode +"]</strong>"  + " " + menus[i],
		  			action: actions[i],
		  			iconCls: icons[i]
		  		});
		  	}
		  	cmenu.menu('show', {
		  		left:e.pageX,
		  		top:e.pageY
		  	});
		},
	    columns:columns
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
            	loadMarketerCreateForm();
            }
        }/*,{
            iconCls:'icon-edit',
            handler:function(){
            	loadMarketerUpdateForm();
            }
        },{
            iconCls:'icon-remove',
            handler:function(){
            	removeMarketer();
            }
        } ,{
            iconCls:'icon-more',
            handler:function(){
            	var node = $('#node_list').datagrid('getSelected');
            	if (!node) {
            		 $.messager.alert('알림','자세히 보실 항목을  선택해주세요');
            		 return;
            	}
            }
        }*/],
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

function loadMarketerCreateForm(){
	var nodeType = $('input[name=nodeType]').val();
	var data = {
    	targetElem : "#dlgForm",
        title :" 마케터 생성",
        queryOptions : {
        	action : "create",
        }
    };
	
	//console.log("loadMemberCreateForm");
	var queryParam = $.param(data.queryOptions);
	$(data.targetElem).load("/api/marketer/form/createForm?" + queryParam,
		function(response, status, xhr) {
		
			$(data.targetElem).dialog({
				width:600,
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
						createMarketer(data);
					} },
					{ text:'취소', handler:function(){
						console.log("닫을 DIV : " + data.targetElem);	
						$(data.targetElem).dialog('close');
						$(data.targetElem).removeAttr('style');
					}
				}]
			});
			$(data.targetElem).dialog('center');
		});
}

function loadMarketerUpdateForm(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','수정하실 마케터를 선택해주세요');
		 return;
	}
	
	var nodeType = $('input[name=nodeType]').val();
	var data = {
        targetElem : "#dlgForm",
        title : "[" +node.marketerCode + " - " + node.memberName + "] " + " 마케터 수정",
        queryOptions : {
        	action : "modify",
        	marketerNo : node.marketerNo
        }
    };
	
	//console.log("loadMemberUpdateForm");
	var queryParam = $.param(data.queryOptions);
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	
	$(data.targetElem).load("/api/marketer/form/createForm?" + queryParam,
		function(response, status, xhr) {
		console.log("오픈할 DIV : " + data.targetElem);	
		
			$(data.targetElem).dialog({
				width:600,
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
						updateMarketer(data);
					} },
					{ text:'취소', handler:function(){
						$(data.targetElem).dialog('close');
						$(data.targetElem).removeAttr('style');
					}
				}]
			});
			$(data.targetElem).dialog('center');
			
			returnp.api.call('getMarketers', {marketerNo : data.queryOptions.marketerNo}, function(res){
				if (res.resultCode  == "100") {
					console.log("### Update Marketer");
					console.log(res);
					$('#updateMarketerForm').form('load',res.rows[0]);
					
				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
		});
}

function loadMarketerDetailInfo(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','상세보기할 회원을 선택해주세요');
		 return;
	}
	
	var data = {
		targetElem : "#dlgForm",
	    title : "[" +node.memberName + "] " + " 회원 상세 보기",
	    queryOptions : {
        	action : "memberDetailView",
        	memberNo : node.memberNo
        }
	};

	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	
	$(data.targetElem).load("/api/member/form/createForm?" + queryParam,
		function(response, status, xhr) {
			$(data.targetElem).dialog({
				width:800,
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
					{ text:'확인', handler:function(){
						$(data.targetElem).dialog('close');
						$(data.targetElem).removeAttr('style');
					}}]
			});
			$(data.targetElem).dialog('center');
		});
}

function makeFormData(){
	var param = $("#createApiServiceForm").serializeArray();
	return param;
}

function createMarketer(data){
	var param = {count : $('input[name=count]').val()}	
	console.log(param);
	var valid = true;
	for (var prop in param){
		console.log(prop + "- " + param[prop] );
		if (param.hasOwnProperty(prop)) {
			if (param[prop] == '') {
				valid = false;
				break;
			}
		}
	}
	if (!valid) {
		$.messager.alert('알림', '입력 항목이 모두 입력되지 않았습니다');
		return;
	}	 
		
	if (!$.isNumeric(param.count) ) {
		$.messager.alert('알림', "차수는 숫자만 입력가능합니다");
		return;
	}
	
	returnp.api.call("createMarketer", param, function(res){
		//console.log(res);
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			$(data.targetElem).dialog('close');
			$(data.targetElem).removeAttr('style');
			realodPage();
		}else {
			$.messager.alert('알림', res.message);
		}
	});
}

function updateMarketer(data){
	var param = $("#updateMarketerForm").serializeObject();
	console.log(param);
	var valid = true;
	for (var prop in param){
		console.log(prop + "- " + param[prop] );
		if (param.hasOwnProperty(prop)) {
			if (param[prop] == '') {
				valid = false;
				break;
			}
		}
	}
	
	if (!valid) {
		$.messager.alert('알림', '입력 항목이 모두 입력되지 않았습니다');
		return;
	}	 
		
	if (!$.isNumeric(param.marketerDegree) ) {
		$.messager.alert('알림', "마케터 레벨은 숫자만 입력가능합니다");
		return;
	}
	returnp.api.call("updateMarketer", param, function(res){
		if (res.resultCode  == "100") {
			$.messager.alert('알림', res.message);
			$(data.targetElem).dialog('close');
			$(data.targetElem).removeAttr('style');
			realodPage();
			
		}else {
			$.messager.alert('알림', res.message);
		}
	});
}

function removeMarketer(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','삭제하실 항목을 선택해주세요');
		 return;
	}
	
	$.messager.confirm('삭제', /*item.data.memberEmail +*/ ' 해당 내용을 정말로 삭제하시겠습니까?', function(r){
        if (r){
        	var param = {
        		memberNo : node.memberNo
        	}
        	returnp.api.call("deleteMember", param, function(res){
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
	realodPage();
});
