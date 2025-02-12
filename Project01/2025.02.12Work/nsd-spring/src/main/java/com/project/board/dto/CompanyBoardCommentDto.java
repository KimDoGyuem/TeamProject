package com.project.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class CompanyBoardCommentDto {
	private int comment_no;
	private int cb_no;
	private String company_id;
	private String company_name;
	private String cb_comment_text;
	private String formattedDatetime;
	private boolean cb_comment_is_deleted;

	public void setCb_comment_date(LocalDateTime cb_comment_datetime) {
		this.formattedDatetime = cb_comment_datetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
	}
}
