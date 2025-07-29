<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div style ="padding:5px;margin: 20px;">
	<div style = "padding:5px;padding-top:5px;padding-bottom:5px;" >
	   <form id="createProductForm"  enctype="multipart/form-data" name = "createProductForm" method="post"  >
			<div style="margin-bottom:25px"><input id ="giftCardName"  name="giftCardName" style="width:100%" data-options="label:'상품 이름 ',labelWidth :100,labelPosition : 'left'"> </div>
			<div style="margin-bottom:25px"><input id ="giftCardAmount"  name="giftCardAmount" style="width:100%" data-options="label:'상품 가격 ',labelWidth :100,labelPosition : 'left'"> </div>
			<div style="margin-bottom:25px"><input id ="giftCardSalePrice"  name="giftCardSalePrice" style="width:100%" data-options="label:'상품 판매 가격 ',labelWidth :100,labelPosition : 'left'"> </div>
			<div style="margin-bottom:25px">
				<select id ="giftCardSaleStatus" name="giftCardSaleStatus"   style="width:100%" data-options="label:'상품 상태',labelWidth :100,labelPosition : 'left'">
					<c:forEach var="productStatus"  items="${productStatusList}" varStatus="status">
						    <c:if test = "${ productStatus.useInAdmin == 'Y' }">
							  <option value='${productStatus.key}' >${productStatus.value} </option>
						  </c:if>
					</c:forEach>
				</select> 
			</div>
			<div style="margin-bottom:25px"><input id ="stockCount"  name="stockCount" style="width:100%" data-options="label:'재고 수량 ',labelWidth :100,labelPosition : 'left'"> </div>
			<div style="margin-bottom:25px"><textarea id ="giftCardDes"  name="giftCardDes" style="width:100%" data-options="label:'상품 설명 ',labelWidth :100,labelPosition : 'left'"></textarea> </div>
			
			<div style="margin-bottom:25px">
				<input id = productImg1  name = "productImg1" type = "text" style="width:100%" accept=".xlsx">
			</div>
			<div style="margin-bottom:10px">
				<input id = productImg2  name = "productImg2" type = "text" style="width:100%" accept=".xlsx">
			</div>
		</form>
	</div>
	<div id="viewImage"></div>
</div>
<script>
	function setViewInit(){
		
		$('#giftCardName').textbox({
			label : roundLabel("상품권 이름")
		});

		$('#giftCardAmount').numberbox({
			groupSeparator:',',
			label : roundLabel("상품권 금액"),
			onChange : function(newValue,oldValue){
				$('#giftCardSalePrice').numberbox("setValue", newValue);
			}
		});

		$('#giftCardSalePrice').numberbox({
			label : roundLabel("판매 가격"),
			groupSeparator:','
		});
		$('#stockCount').numberbox({
			label : roundLabel("재고 수량"),
			groupSeparator:','
		});
		$('#giftCardDes').textbox({
			label : roundLabel("상품권 설명"),
			height: 150,
			multiline:true	
		});
		
		$('#giftCardSaleStatus').combobox({
			label : roundLabel("판매 상태"),
			showItemIcon: true,
            editable: false,
            multiple:false,
            required:true,
            panelHeight: 'auto',
		});
		
		$('#productImg1').filebox({
			label : roundLabel("이미지1"),
			labelWidth : 100,
			buttonText: '&nbsp;&nbsp;<strong>파일 선택</strong>&nbsp;&nbsp;',
		    buttonAlign: 'left',
		    height: '25px'
		});
		
		$('#productImg2').filebox({
			label : roundLabel("이미지2"),
			labelWidth : 100,
			buttonText: '&nbsp;&nbsp;<strong>파일 선택</strong>&nbsp;&nbsp;',
		    buttonAlign: 'left',
		    height: '25px'
		});
	}
	setViewInit();
</script>