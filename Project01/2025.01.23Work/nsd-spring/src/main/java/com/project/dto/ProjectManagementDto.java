package com.project.dto;

import java.util.ArrayList;
import java.util.Date;

import lombok.Data;

@Data
public class ProjectManagementDto {
	private int no;
	private String project_name;
	private String project_content;
	private Date project_startDate;
	private Date project_endDate;
	public ArrayList<LoginDto> employee = new ArrayList<LoginDto>();
}
