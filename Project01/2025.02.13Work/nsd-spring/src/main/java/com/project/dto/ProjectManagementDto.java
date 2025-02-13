package com.project.dto;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import lombok.Data;

@Data
public class ProjectManagementDto {
	private int project_no;
	private String project_name;
	private String project_content;
	private Date project_startDate;
	private Date project_endDate;
	private boolean is_finished;
	public ArrayList<LoginDto> employee = new ArrayList<LoginDto>();

	// 날짜를 문자열로 변환하는 메서드
	public String getFormattedStartDate() {
		if (project_startDate == null)
			return "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(project_startDate);
	}

	public String getFormattedEndDate() {
		if (project_endDate == null)
			return "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(project_endDate);
	}

	// 문자열을 Date로 변환하는 메서드
	public void setProject_startDate(String dateStr) {
		try {
			if (dateStr != null && !dateStr.isEmpty()) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				this.project_startDate = sdf.parse(dateStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setProject_endDate(String dateStr) {
		try {
			if (dateStr != null && !dateStr.isEmpty()) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				this.project_endDate = sdf.parse(dateStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}