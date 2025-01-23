package com.project.service;

import java.util.ArrayList;
import java.util.List;

import com.project.board.dto.CompanyBoardCategoryDto;
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
	
	public void deleteComment(String no);
	
	public void modifyPost(CompanyBoardDto c);
	
//	public ArrayList<CompanyBoardDto> getAllPostList(String searchTag,String searchWord, boolean d);
	public ArrayList<CompanyBoardDto> getAllPostList(String searchTag,String searchWord, boolean d, String searchCategory);
	
	public void recoverPost(Integer postNo);
	
	public void dataBaseDelPost(Integer postNo);
	
	public void addCategory(String name);
	
	public ArrayList<CompanyBoardCategoryDto> categoryList();
	
	public void deleteCategory(String name);
	
	/*게시판 메인 페이지 상단 공지 글, 인기 글*/
	public List<CompanyBoardDto> getTopNoticePosts(int limit);
	
	public List<CompanyBoardDto> getTopPopularPosts(int limit,String period);
	
	public void onTtrendingPeriod (String tp);
	
	public String currentTrendingPeriod();
}
