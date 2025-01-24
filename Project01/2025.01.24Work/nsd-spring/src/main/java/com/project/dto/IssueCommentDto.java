package com.project.dto;

import lombok.Data;

@Data
public class IssueCommentDto {
	private int comment_no;
	private int comment_issue_no;
	private String comment_text;
	private String comment_author;
	private String comment_date;
}