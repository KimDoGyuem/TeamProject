package com.project.mapper;

import java.util.ArrayList;

import com.project.board.dto.CompanyBoardCategoryDto;
import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;
import com.project.board.dto.SearchDto;

public interface PjBoardMapper {

	public void write(CompanyBoardDto c);
	
	public ArrayList<CompanyBoardDto> getPostListAllView();

	public ArrayList<CompanyBoardDto> getSearchPostListAllView(SearchDto s);

	public ArrayList<CompanyBoardDto> getPostList(String category);

	public ArrayList<CompanyBoardDto> getSaerchPostList(SearchDto s);

	public CompanyBoardDto read(String no);

	public void hitsUp(String no);

	public void commentsWrite(CompanyBoardCommentDto c);

	public ArrayList<CompanyBoardCommentDto> commentsRead(String no);

	public void deletePost(String no);

	public void deleteComment(String no);

	public void modifyPost(CompanyBoardDto c);

	public ArrayList<CompanyBoardDto> getAllPostList();

	public ArrayList<CompanyBoardDto> getCategoryAllPostList(String category);

	public ArrayList<CompanyBoardDto> getDelPostList();

	public ArrayList<CompanyBoardDto> getCategoryDelPostList(String category);

	public ArrayList<CompanyBoardDto> getSearchAllPostList(SearchDto s);

	public ArrayList<CompanyBoardDto> getCategorySearchAllPostList(SearchDto s);

	public ArrayList<CompanyBoardDto> getSearchDelPostList(SearchDto s);

	public ArrayList<CompanyBoardDto> getCategorySearchDelPostList(SearchDto s);

	public void recoverPost(Integer postNo);

	public void dataBaseDelPost(Integer postNo);

	public void addCategory(String name);

	public ArrayList<CompanyBoardCategoryDto> categoryList();

	public void deleteCategory(String name);

	public void deleteCategoryPosts(String name);

	/* 게시판 메인 페이지 상단 공지 글, 인기 글 */
	public ArrayList<CompanyBoardDto> selectTopPostsByCategory(int limit);

	public ArrayList<CompanyBoardDto> selectTopPostsByHitsDay(int limit);

	public ArrayList<CompanyBoardDto> selectTopPostsByHitsWeek(int limit);

	public ArrayList<CompanyBoardDto> selectTopPostsByHitsMonth(int limit);

	public void onTtrendingPeriod(String tp);

	public void offTtrendingPeriod(String tp);

	public String currentTrendingPeriod();
}
