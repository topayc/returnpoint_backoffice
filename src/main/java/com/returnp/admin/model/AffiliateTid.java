package com.returnp.admin.model;

import com.returnp.admin.dto.QueryCondition;
import java.util.Date;

public class AffiliateTid extends QueryCondition {
    private Integer affiliateTidNo;

    private Integer memberNo;

    private Integer affiliateNo;

    private String tid;

    private Date createTime;

    private Date updateTime;

    public Integer getAffiliateTidNo() {
        return affiliateTidNo;
    }

    public void setAffiliateTidNo(Integer affiliateTidNo) {
        this.affiliateTidNo = affiliateTidNo;
    }

    public Integer getMemberNo() {
        return memberNo;
    }

    public void setMemberNo(Integer memberNo) {
        this.memberNo = memberNo;
    }

    public Integer getAffiliateNo() {
        return affiliateNo;
    }

    public void setAffiliateNo(Integer affiliateNo) {
        this.affiliateNo = affiliateNo;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid == null ? null : tid.trim();
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