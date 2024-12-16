package com.project.dto;

import lombok.Data;

@Data
public class LoginDto {
	private String name;
	private String company_id;
	private String password;
	private int position_rank;
	private int department_no;
}
