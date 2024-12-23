package com.project.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class CompanyBoardCommentDto {
	private int cb_comment_no;
	private String company_id;
	private String company_name;
	private String cb_comment_text;
	private String formattedDate;
	private boolean cb_is_deleted;

	public void setCb_comment_date(LocalDateTime cb_comment_date) {
        this.formattedDate = cb_comment_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}
