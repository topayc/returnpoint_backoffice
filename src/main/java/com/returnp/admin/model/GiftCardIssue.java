package com.returnp.admin.model;

import java.util.Date;

public class GiftCardIssue extends GiftCardIssueKey {
    private Integer giftCardOrderNo;

    private Integer giftCardNo;

    private String accableStatus;

    private String payableStatus;

    private String giftCardStatus;

    private String giftCardType;

    private Integer giftCardAmount;

    private Integer giftCardSalePrice;

    private String accQrData;

    private String payQrData;

    private String accQrScanner;

    private String payQrScanner;

    private Date accQrScanTime;

    private Date payQrScanTime;

    private Date issueTime;

    private Date expirationTime;

    private String accQrCodeWebPath;

    private String payQrCodeWebPath;

    private String accQrCodeFilePath;

    private String payQrCodeFilePath;

    private String receiverPhone;

    private String receiverEmail;

    private String receiverName;

    private String receiverAddress;

    private String receiverIsMember;

    private String deliveryMessage;

    private String deliveryStatus;

    private String deliveryNumber;

    private Date createTime;

    private Date updateTime;

    public Integer getGiftCardOrderNo() {
        return giftCardOrderNo;
    }

    public void setGiftCardOrderNo(Integer giftCardOrderNo) {
        this.giftCardOrderNo = giftCardOrderNo;
    }

    public Integer getGiftCardNo() {
        return giftCardNo;
    }

    public void setGiftCardNo(Integer giftCardNo) {
        this.giftCardNo = giftCardNo;
    }

    public String getAccableStatus() {
        return accableStatus;
    }

    public void setAccableStatus(String accableStatus) {
        this.accableStatus = accableStatus == null ? null : accableStatus.trim();
    }

    public String getPayableStatus() {
        return payableStatus;
    }

    public void setPayableStatus(String payableStatus) {
        this.payableStatus = payableStatus == null ? null : payableStatus.trim();
    }

    public String getGiftCardStatus() {
        return giftCardStatus;
    }

    public void setGiftCardStatus(String giftCardStatus) {
        this.giftCardStatus = giftCardStatus == null ? null : giftCardStatus.trim();
    }

    public String getGiftCardType() {
        return giftCardType;
    }

    public void setGiftCardType(String giftCardType) {
        this.giftCardType = giftCardType == null ? null : giftCardType.trim();
    }

    public Integer getGiftCardAmount() {
        return giftCardAmount;
    }

    public void setGiftCardAmount(Integer giftCardAmount) {
        this.giftCardAmount = giftCardAmount;
    }

    public Integer getGiftCardSalePrice() {
        return giftCardSalePrice;
    }

    public void setGiftCardSalePrice(Integer giftCardSalePrice) {
        this.giftCardSalePrice = giftCardSalePrice;
    }

    public String getAccQrData() {
        return accQrData;
    }

    public void setAccQrData(String accQrData) {
        this.accQrData = accQrData == null ? null : accQrData.trim();
    }

    public String getPayQrData() {
        return payQrData;
    }

    public void setPayQrData(String payQrData) {
        this.payQrData = payQrData == null ? null : payQrData.trim();
    }

    public String getAccQrScanner() {
        return accQrScanner;
    }

    public void setAccQrScanner(String accQrScanner) {
        this.accQrScanner = accQrScanner == null ? null : accQrScanner.trim();
    }

    public String getPayQrScanner() {
        return payQrScanner;
    }

    public void setPayQrScanner(String payQrScanner) {
        this.payQrScanner = payQrScanner == null ? null : payQrScanner.trim();
    }

    public Date getAccQrScanTime() {
        return accQrScanTime;
    }

    public void setAccQrScanTime(Date accQrScanTime) {
        this.accQrScanTime = accQrScanTime;
    }

    public Date getPayQrScanTime() {
        return payQrScanTime;
    }

    public void setPayQrScanTime(Date payQrScanTime) {
        this.payQrScanTime = payQrScanTime;
    }

    public Date getIssueTime() {
        return issueTime;
    }

    public void setIssueTime(Date issueTime) {
        this.issueTime = issueTime;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String getAccQrCodeWebPath() {
        return accQrCodeWebPath;
    }

    public void setAccQrCodeWebPath(String accQrCodeWebPath) {
        this.accQrCodeWebPath = accQrCodeWebPath == null ? null : accQrCodeWebPath.trim();
    }

    public String getPayQrCodeWebPath() {
        return payQrCodeWebPath;
    }

    public void setPayQrCodeWebPath(String payQrCodeWebPath) {
        this.payQrCodeWebPath = payQrCodeWebPath == null ? null : payQrCodeWebPath.trim();
    }

    public String getAccQrCodeFilePath() {
        return accQrCodeFilePath;
    }

    public void setAccQrCodeFilePath(String accQrCodeFilePath) {
        this.accQrCodeFilePath = accQrCodeFilePath == null ? null : accQrCodeFilePath.trim();
    }

    public String getPayQrCodeFilePath() {
        return payQrCodeFilePath;
    }

    public void setPayQrCodeFilePath(String payQrCodeFilePath) {
        this.payQrCodeFilePath = payQrCodeFilePath == null ? null : payQrCodeFilePath.trim();
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone == null ? null : receiverPhone.trim();
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail == null ? null : receiverEmail.trim();
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName == null ? null : receiverName.trim();
    }

    public String getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress == null ? null : receiverAddress.trim();
    }

    public String getReceiverIsMember() {
        return receiverIsMember;
    }

    public void setReceiverIsMember(String receiverIsMember) {
        this.receiverIsMember = receiverIsMember == null ? null : receiverIsMember.trim();
    }

    public String getDeliveryMessage() {
        return deliveryMessage;
    }

    public void setDeliveryMessage(String deliveryMessage) {
        this.deliveryMessage = deliveryMessage == null ? null : deliveryMessage.trim();
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus == null ? null : deliveryStatus.trim();
    }

    public String getDeliveryNumber() {
        return deliveryNumber;
    }

    public void setDeliveryNumber(String deliveryNumber) {
        this.deliveryNumber = deliveryNumber == null ? null : deliveryNumber.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}