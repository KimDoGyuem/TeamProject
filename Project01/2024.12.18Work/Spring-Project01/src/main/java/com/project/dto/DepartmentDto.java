package com.project.dto;

import java.util.ArrayList;

import lombok.Data;

@Data
public class DepartmentDto {
	private int no;
	private String department_name;
	public ArrayList<LoginDto> employee = new ArrayList<LoginDto>(); // 부서 멤버 목록
}
