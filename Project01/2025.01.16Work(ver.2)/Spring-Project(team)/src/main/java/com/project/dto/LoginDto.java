package com.project.dto;

import lombok.Data;

@Data
public class LoginDto {
	private String name;
	private String company_id;
	private String password;
	private String position;
	private int p_rank;
	private String department;
	
	public LoginDto() {
		super();
	}
	
	public LoginDto(String company_id, String position, int p_rank) {
		super();
		this.company_id = company_id;
		this.position = position;
		this.p_rank = p_rank;
	}

}
