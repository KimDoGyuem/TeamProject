package com.project.board.dto;

import lombok.Data;

@Data
public class SearchDto {
	private String category;
	private String searchTag;
	private String searchWord;
	
	public SearchDto(String category, String searchTag, String searchWord) {
		super();
		this.category = category;
		this.searchTag = searchTag;
		this.searchWord = searchWord;
	}

	public SearchDto(String searchTag, String searchWord) {
		super();
		this.searchTag = searchTag;
		this.searchWord = searchWord;
	}
	
}
