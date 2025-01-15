package com.project.board.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class CompanyBoardDto {
	private int cb_no;
	private String company_id;
	private String company_name;
	private String cb_title;
	private String cb_text;
	private String cb_category;
	private String formattedDate;
	private int cb_hits;
	private boolean cb_is_deleted;
	
	public void setcb_date(LocalDateTime cb_date) {
        this.formattedDate = cb_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}
