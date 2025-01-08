package com.project.board.dto;

import lombok.Data;

@Data
public class SaerchDto {
	private String category;
	private String searchTag;
	private String searchWord;
	
	public SaerchDto(String category, String searchTag, String searchWord) {
		super();
		this.category = category;
		this.searchTag = searchTag;
		this.searchWord = searchWord;
	}

	public SaerchDto(String searchTag, String searchWord) {
		super();
		this.searchTag = searchTag;
		this.searchWord = searchWord;
	}
	
}
