package com.project.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class CompanyBoardDto {
	private int cb_no;
	private String company_id;
	private String cb_title;
	private String cb_text;
	private String cb_category;
	private String formattedDate;
	private int cb_hits;
	private int cb_comment_no;
	private String cb_comment_text;
	
	public void setCd_date(LocalDateTime cd_date) {
        this.formattedDate = cd_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}
