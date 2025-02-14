package com.project.dto;

import lombok.Data;

@Data
public class LoginDto {
	private String company_name;
	private String company_id;
	private String password;
	private String position;
	private int position_rank;
	private String department;
	private String profile_photo;

	public LoginDto() {
		super();
	}

	public LoginDto(String company_id, String position, int position_rank) {
		super();
		this.company_id = company_id;
		this.position = position;
		this.position_rank = position_rank;
	}

	public LoginDto(String company_id, String position, int position_rank, String profile_photo) {
		super();
		this.company_id = company_id;
		this.position = position;
		this.position_rank = position_rank;
		this.profile_photo = profile_photo;
	}
}
