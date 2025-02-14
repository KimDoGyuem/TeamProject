package com.project.dto;

import java.util.ArrayList;

import lombok.Data;

@Data
public class IssueDto {
	private Long issue_no;
	private Long issue_project_no;
	private String issue_title;
	private String issue_details;
	private String issue_label;
	private String issue_author;
	private String issue_datetime;
	private Boolean issue_is_closed;
	private String issue_closer;
	private String issue_closedDatetime;
	public ArrayList<IssueCommentDto> comments;
}