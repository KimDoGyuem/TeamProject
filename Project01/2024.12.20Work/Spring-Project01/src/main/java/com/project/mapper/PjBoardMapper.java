package com.project.mapper;

import java.util.ArrayList;

import com.project.board.dto.CompanyBoardDto;

public interface PjBoardMapper {

	public void write(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getPostList(String category) ;
	
	public CompanyBoardDto read(String no);
	public void hitsUp(String no);
	
	public void commentsWrite(CompanyBoardDto c);
}
