package com.project.mapper;

import java.util.ArrayList;

import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;
import com.project.board.dto.SaerchDto;

public interface PjBoardMapper {

	public void write(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getPostList(String category); 
	
	public ArrayList<CompanyBoardDto> getSaerchPostList(SaerchDto s);
	
	public CompanyBoardDto read(String no);
	public void hitsUp(String no);
	
	public void commentsWrite(CompanyBoardCommentDto c);
	
	public ArrayList<CompanyBoardCommentDto> commentsRead(String no);
	
	public void deletePost(String no);
	
	public void deleteComment(String no);
	
	public void modifyPost(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getAllPostList();
	public ArrayList<CompanyBoardDto> getDelPostList();
	
	public ArrayList<CompanyBoardDto> getSearchAllPostList(SaerchDto s);
	public ArrayList<CompanyBoardDto> getSearchDelPostList(SaerchDto s);
	
	
	public void recoverPost(Integer postNo);
	
	public void dataBaseDelPost(Integer postNo);
	
	public void dataBaseDelComment(Integer postNo);
}
