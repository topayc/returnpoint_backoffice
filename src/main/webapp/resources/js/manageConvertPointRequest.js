	columns = [[
	    	//{field:'check',width:30,align:'center',title : '선택',checkbox : true},
			   // {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
			    {field:'pointConvertRequestNo',width:70,align:'center',title : '요청 번호'},
			    {field:'memberNo',width:70,align:'center',title : '회원 번호'},
			    {field:'memberName',width:100,align:'center',title : '회원 이름'},
			    {field:'memberEmail',width:140,align:'center',title : '회원 이메일'},
			    {field:'memberPhone',width:100,align:'center',title : '회원 모바일'},
			    {field:'nodeType',width:70,align:'center',title : '노드 분류', formatter : nodeTypeFormatter},
			    /*{field:'requestNodeTypeName',width:100,align:'center',title : '전환 포인트 타입'},*/
			    {field:'convertPointAmount',width:100,align:'center',title : '전환 포인트 (G -> R)', formatter : numberFormatter},
			    {field:'greenPointNo',width:80,align:'center',title : '연관 G Point No'},
			/*    {field:'redPointNo',width:80,align:'center',title : 'R 포인트 참조'},*/
			    {field:'createTime',width:100,align:'center',title : '등록일',formatter : dateFormatter},
			    {field:'updateTime',width:100,align:'center',title : '수정일', formatter : dateFormatter}
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
	$('#searchKeyword').textbox({ prompt : "검색할 단어를 입력해주세요" });
	
	/* 노드 타입 셀렉트 박스  초기화*/
	$('#searchNodeType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
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
	
	/* 검색어 타입 셀렉트 박스  초기화*/
	$('#searchKeywordType').combobox({
		labelPosition : 'top',
		showItemIcon: true,
		editable: false,
		panelHeight: 'auto',
		labelPosition: 'top',
		multiple:false,
		required:true,
	});

	/* 검색 시작일 갤린더 박스  초기화*/
	$('#searchDateStart').datetimebox({
	    showSeconds: true,
	    prompt : "검색 시작 일자",
	    labelPosition: 'top',
	    formatter : function(date){
	    	var year = date.getFullYear();  
	    	var month = date.getMonth()+1;  
	    	var d = date.getDate();  
	    	var hours = date.getHours();  
	    	var minutes  = date.getMinutes();  
	    	var seconds = date.getSeconds();  
	    	return  year + "-" + formatDate(month) + "-" + formatDate(d) + " "+ formatDate(hours) + ":" + formatDate(minutes) + ":" + formatDate(seconds);
	    }
	});
	
	/* 검색 종료일 갤린더 박스  초기화*/
	$('#searchDateEnd').datetimebox({
	    showSeconds: true,
	    prompt : "검색 종료 일자",
	    labelPosition: 'top',
	    formatter : function(date){
	    	var year = date.getFullYear();  
	    	var month = date.getMonth()+1;  
	    	var d = date.getDate();  
	    	var hours = date.getHours();  
	    	var minutes  = date.getMinutes();  
	    	var seconds = date.getSeconds();  
	    	return  year + "-" + formatDate(month) + "-" + formatDate(d) + " "+ formatDate(hours) + ":" + formatDate(minutes) + ":" + formatDate(seconds);
	    }
	});
	
	/* 검색 버튼  초기화*/
	$('#search_btn').linkbutton({
		onClick : function(){
			//$.messager.progress();
			var param = makeSearchParam();
			//console.log("검색 쿼리 데이타");
			//console.log(param);
			
			returnp.api.call("getPointConvertRequests", param, function(res){
				//console.log("node datas");
				//console.log(res);
				if (res.resultCode == "100") {
					setListColumnHeader(param.searchNodeType);
					$('#node_list').datagrid({
						data : res.rows,
						title : '[검색 결과] ' + res.rows.length + " 개의 결과가 검색되었습니다",
					});
					setListPager();
				}else {
					$.messager.alert('오류 발생', message);
				}
			});
		},
		iconCls:'icon-search'
	});
	
	/* 리셋 버튼  초기화*/
	$('#reset_btn').linkbutton({
		onClick : function(){
			/*$('#searchForm').form('clear');*/
			$('#searchNodeType').combobox('select',0);
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
		  				loadPointConvertRequestCreateForm();
		  				break;
		  			case "modify":
		                  loadPointConvertRequestModifyForm();
		  				break;
		  			case "remove":
		  				removePointConvertRequest();
		  				break;
		  			case "more_detail":
		  				break;
		  			}
		  		}
		  	});
		  	
		  	var menus = [  '수정', '삭제','상세' ];
		  	var icons = ['icon-edit','icon-remove','icon-more'];
		  	var actions = ['modify','remove','more_detail'];
		  	
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
            	loadPointConvertRequestCreateForm();
            }
        },{
            iconCls:'icon-edit',
            handler:function(){
            	loadPointConvertRequestModifyForm();
            }
        },{
            iconCls:'icon-remove',
            handler:function(){
            	removePointConvertRequest();
            }
        },{
            iconCls:'icon-more',
            handler:function(){
            	var node = $('#node_list').datagrid('getSelected');
            	if (!node) {
            		 $.messager.alert('알림','자세히 보실 항목을  선택해주세요');
            		 return;
            	}
            }
        }],
        layout:['list','sep','first','prev','sep','links','sep','next','last','sep','refresh','info'],
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
	var param = {
		pageSize : 10,
		page : 0,
		searchDateStart :  $('#searchDateStart').datetimebox('getValue'),
		searchDateEnd :  $('#searchDateEnd').datetimebox('getValue'),
		searchNodeType :  $('input[name=searchNodeType]').val(),
		searchNodeNo :  "0",
		searchNodeStatus :  $('input[name=searchNodeStatus]').val(),
		searchKeywordType : $('input[name=searchKeywordType]').val(),
		searchKeyword :  $('input[name=searchKeyword]').val()
	};
	//console.log(JSON.stringify(param));
	return param;
}

function statusFormatter(value,row,index){
	var status = row.memberStatus;
	return '&nbsp;<span >'+ status + '</span>';
}

function loadPointConvertRequestCreateForm(){
	
	var nodeType = $('input[name=nodeType]').val();
  	var data = {
        targetElem : "#dlgForm",
        title : "G -> R 포인트 전환 요청 생성",
        queryOptions : {
          	action : "create",
         }
     }
  	
	//console.log("loadPointConvertRequestCreateForm");
	var queryParam = $.param(data.queryOptions);
	$(data.targetElem).load("/api/pointConvertRequest/form/createForm?" + queryParam,
			function(response, status, xhr) {
		
			$(data.targetElem).dialog({
				width:650,
			    modal : true,
			    closable : true,
			    cache : false,
			    border : 'thick',
			    shadow : true,
			    collapsible : false,
			    minimizable : false,
			    maximizable: false,
			    title : "&nbsp; " + data.title,
			    shadow : false,	
				buttons:[
					{ text:'닫기', handler:function(){
						$(data.targetElem).dialog('close');
						$(data.targetElem).removeAttr('style');
					}
				}]
			});
			$(data.targetElem).dialog('center');
			
		});
}

function loadPointConvertRequestModifyForm(){
	
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','수정하실 노드를 선택해주세요');
		 return;
	}
	
	var data = {
		targetElem : "#dlgForm",
        title : "G -> R 포인트 전환 요청 수정",
        queryOptions : {
        	action : "modify",
        	pointConvertRequestNo : node.pointConvertRequestNo,
        	nodeType : node.nodeType,
        	memberNo : node.memberNo
        }
     }
	
	//console.log("loadPointConvertRequestModifyForm");
	var queryParam = $.param(data.queryOptions);
	data.targetElem = data.targetElem || "#dlgForm";
	var queryParam = $.param(data.queryOptions);
	
	$(data.targetElem).load("/api/pointConvertRequest/form/createForm?" + queryParam,
		function(response, status, xhr) {
		console.log("오픈할 DIV : " + data.targetElem);	
		
			$(data.targetElem).dialog({
				width:650,
			    modal : true,
			    top : 100,
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
						updatePointConvertRequest(data);
					} },
					{ text:'취소', handler:function(){
						$(data.targetElem).dialog('close');
						$(data.targetElem).removeAttr('style');
					}
				}]
			});
			$(data.targetElem).dialog('center');
			returnp.api.call('getPointConvertRequest', {pointConvertRequestNo : data.queryOptions.pointConvertRequestNo}, function(res){
				if (res.resultCode  == "100") {
					console.log(res);
					$('#createPointConvertRequestForm').form('load',res.data);
					$('#memberNo').textbox({disabled : true });
					$('#regType').combobox({disabled : true });
				}else {
					$.messager.alert('오류 발생', res.message);
				}
			});
			
		});
}


function makeFormData(){
	var param = {
			memberNo : $('input[name=memberNo]').val(),	
			convertPointAmount :   getNumber($('input[name=convertPointAmount]').val()),
			regType : $('#regType').combobox('getValue'),
	}
	return param;
}

function updatePointConvertRequest(data){
	var param =makeFormData();
	
	//console.log(param);
	returnp.api.call("updatePointConvertRequest", param, function(res){
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

function createPointConvertRequest(data){	
	var param =makeFormData();
	
	var pointBalace  =    getNumber($('input[name=pointBalance]').val());
	if (param.convertPointAmount < 20000) {
		$.messager.alert('알림', "포인트 전환은 최소 20000 P 이상 가능합니다");
		return;
	}
	if (param.convertPointAmount > pointBalace) {
		$.messager.alert('알림', "보유하신 포인트가 전환하실 포인트 보다 적습니다. 확인 후 다시 시도해주세요");
		return;
	}
	
	//console.log("createPointConvertRequest");
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
	
		/* 	if (!valid) {
			$.messager.alert('알림', '입력 항목이 모두 입력되지 않았습니다');
			return;
		}	 */
		
	returnp.api.call("createPointConvertRequest", param, function(res){
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

function removePointConvertRequest(){
	var node = $('#node_list').datagrid('getSelected');
	if (!node) {
		 $.messager.alert('알림','삭제하실 항목을 선택해주세요');
		 return;
	}
	
	$.messager.confirm('삭제', /*item.data.memberEmail +*/ ' 해당 내용을 정말로 삭제하시겠습니까?', function(r){
        if (r){
        	var param = {
        			pointConvertRequestNo : node.pointConvertRequestNo
        	}
        	returnp.api.call("deletePointConvertRequest", param, function(res){
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
