package com.returnp.admin.dto.command;

import com.returnp.admin.model.Marketer;

public class MarketerCommand extends Marketer {
	private String memberName;
	private String memberEmail;
	private String memberPhone;
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getMemberEmail() {
		return memberEmail;
	}
	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}
	public String getMemberPhone() {
		return memberPhone;
	}
	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}
	
	
}
