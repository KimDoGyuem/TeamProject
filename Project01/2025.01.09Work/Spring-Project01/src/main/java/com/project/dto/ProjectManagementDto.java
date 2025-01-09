package com.project.dto;

import java.util.ArrayList;

import lombok.Data;

@Data
public class ProjectManagementDto {
	private int no;
	private String project_name;
	private String project_content;
	private String project_period;
	public ArrayList<LoginDto> employee = new ArrayList<LoginDto>();
}
