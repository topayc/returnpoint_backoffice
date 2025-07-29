<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="easyui-layout" data-options="fit:true,border:false,split:true">
	<div  data-options="region:'center',split:true"  > 
		<table id = "node_list" style ="width:100%;height:100%">
		</table> 
	</div>
	<div  data-options="region:'north',split:true"  id = "member_search"  style ="height:150px" title ="검색 조건" >
		 <div class="easyui-panel" title="" style="width:100%;padding:10px 15px;">
	        <form id="searchForm" method="post">
	            <div style="margin-bottom:10px;margin-left : 10px;width:200px;display:inline-block">
	                <input class="easyui-datetimebox"   id = "searchDateStart" name="searchDateStart" label="검색 시작일" style="width:100%"/>
	            </div>
	            
	            <div style="margin-bottom:10px;margin-left : 10px;display:inline-block;width:200px">
	                <input class="easyui-datetimebox" id = "searchDateEnd"  name="searchDateEnd" label="검색 종료일" style="width:100%"/>
	            </div>
	             
	             <div style="margin-bottom:10px;margin-left : 10px;display:inline-block;width:200px">
	                <select id = searchNodeType class="easyui-combobox" name="searchNodeType" label="검색(생성) 그룹" style="width:100%">
	                	<c:forEach var="nodeType" items="${nodeTypeList}" varStatus="status">
						   <option value="${nodeType.key}" <c:if test="${nodeType.key == searchCondition.searchNodeType}">selected="selected"</c:if>><strong>${nodeType.value}</strong></option>
						</c:forEach>
	                </select>
	            </div>
	            
	             <div style="margin-bottom:10px;margin-left : 10px;display:inline-block;width:200px">
	                <select id = "searchNodeStatus" class="easyui-combobox" name="searchNodeStatus" label="상태" style="width:100%">
	                	 <option value="0">전체</option>
	                	<c:forEach var="statusType" items="${nodeStatusList}" varStatus="status">
						   <option value="${statusType.key}" <c:if test="${statusType.key == nodeSearch.searchodeStatus}">selected="selected"</c:if> >${statusType.value}</option>
						</c:forEach>
	                </select>
	            </div>
	            
	             <div style="margin-bottom:10px;margin-left : 10px;display:inline-block;width:200px">
	                <select id = "searchKeywordType" class="easyui-combobox" name="searchKeywordType" label="검색 유형" style="width:100%">
	                	 <option value="0">전체</option>
	                	<c:forEach var="keywordType" items="${keywordTypeList}" varStatus="status">
						   <option value="${keywordType.key}" <c:if test="${keywordType.key == nodeSearch.searcheywordType}">selected="selected"</c:if> >${keywordType.value}</option>
						</c:forEach>
	                </select>
	            </div>
	            
	            <div style="margin-bottom:10px;margin-left:7px;width:630px;display:inline-block;">
	                <input class="easyui-textbox"  id ="searchKeyword" name="searchKeyword"  style="width:100%">
	            </div>
	            
	            <div style="padding:5px 0;display:inline-block;">
		            <a href="javascript:void(0)" id = "search_btn"  style="width:80px;margin-right : 5px;margin-left:10px">검색</a>
		            <a href="javascript:void(0)" id = "reset_btn"   style="width:80px">리셋</a>
	       	 	</div>
	        </form>
    	</div>
	</div>
</div>

<script>
var searchFormData = {
		nodeType :  '${searchCondition.searchNodeType}'
	};
	var nodeTypeArrs = {
		"1" : "일반 회원",
			"2" : "정회원 (추천인)",
			"3" : "지사",
			"4" : "대리점", 
			"5" : "협력업체(가맹점)", 
			"6" : "영업 관리자" 	
	}
	/* 	1 : 일반 회원
		2 : 정회원 (추천인)
		3 : 지사
		4 : 대리점 
		4 : 협력업체(가맹점_ 
		5 : 영업 관리자 */
		</script>
<script src="resources/js/${viewReqName}.js"></script>
