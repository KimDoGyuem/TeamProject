package com.project.service;

import java.util.ArrayList;

import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;

public interface PjBoardService {

	public void write(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getPostList(String category,String searchTag,String searchWord);
	
	public CompanyBoardDto read(String no);
	public void hitsUp(String no);
	
	public void commentsWrite(CompanyBoardCommentDto c);
	
	public ArrayList<CompanyBoardCommentDto> commentsRead(String no);
	
	public void deletePost(String no);
	
	public void deleteComment(String text);
	
	public void modifyPost(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getAllPostList(String searchTag,String searchWord, boolean d);
	
	public void recoverPost(Integer postNo);
	
	public void dataBaseDelPost(Integer postNo);
}
