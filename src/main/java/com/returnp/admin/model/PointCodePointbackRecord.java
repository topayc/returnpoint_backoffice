package com.returnp.admin.model;

import com.returnp.admin.dto.QueryCondition;
import java.util.Date;

public class PointCodePointbackRecord extends QueryCondition {
    private Integer pointCodePointbackRecordNo;

    private Integer memberNo;

    private Integer pointCodeTransactionNo;

    private Integer nodeNo;

    private String nodeType;

    private Float accRate;

    private String accPoint;

    private Date createTime;

    private Date updateTime;

    public Integer getPointCodePointbackRecordNo() {
        return pointCodePointbackRecordNo;
    }

    public void setPointCodePointbackRecordNo(Integer pointCodePointbackRecordNo) {
        this.pointCodePointbackRecordNo = pointCodePointbackRecordNo;
    }

    public Integer getMemberNo() {
        return memberNo;
    }

    public void setMemberNo(Integer memberNo) {
        this.memberNo = memberNo;
    }

    public Integer getPointCodeTransactionNo() {
        return pointCodeTransactionNo;
    }

    public void setPointCodeTransactionNo(Integer pointCodeTransactionNo) {
        this.pointCodeTransactionNo = pointCodeTransactionNo;
    }

    public Integer getNodeNo() {
        return nodeNo;
    }

    public void setNodeNo(Integer nodeNo) {
        this.nodeNo = nodeNo;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType == null ? null : nodeType.trim();
    }

    public Float getAccRate() {
        return accRate;
    }

    public void setAccRate(Float accRate) {
        this.accRate = accRate;
    }

    public String getAccPoint() {
        return accPoint;
    }

    public void setAccPoint(String accPoint) {
        this.accPoint = accPoint == null ? null : accPoint.trim();
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