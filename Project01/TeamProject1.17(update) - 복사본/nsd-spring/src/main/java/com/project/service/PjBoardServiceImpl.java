package com.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.board.dto.CompanyBoardCategoryDto;
import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;
import com.project.board.dto.SearchDto;
import com.project.mapper.PjBoardMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class PjBoardServiceImpl implements PjBoardService {

	private PjBoardMapper mapper;

	public void write(CompanyBoardDto c) {
		mapper.write(c);
	}

	public ArrayList<CompanyBoardDto> getPostList(String category, String searchTag, String searchWord) {
		SearchDto s = new SearchDto(category, searchTag, searchWord);
		if (searchWord.equals("")) {
			return mapper.getPostList(category);
		} else {
			return mapper.getSaerchPostList(s);
		}
	}

	public CompanyBoardDto read(String no) {
		return mapper.read(no);
	}

	public void hitsUp(String no) {
		mapper.hitsUp(no);
	}

	public void commentsWrite(CompanyBoardCommentDto c) {
		mapper.commentsWrite(c);
	}

	public ArrayList<CompanyBoardCommentDto> commentsRead(String no) {
		return mapper.commentsRead(no);
	}

	public void deletePost(String no) {
		mapper.deletePost(no);
	}

	public void deleteComment(String no) {
		mapper.deleteComment(no);
	}

	public void modifyPost(CompanyBoardDto c) {
		mapper.modifyPost(c);
	}

	public ArrayList<CompanyBoardDto> getAllPostList(String searchTag, String searchWord, boolean d,
			String searchCategory) {
		SearchDto s = new SearchDto(searchCategory, searchTag, searchWord);
		if (d == false) {
			if (searchWord.equals("") && searchCategory.equals("")) {
				return mapper.getAllPostList();
			} else if (searchWord.equals("") && !searchCategory.equals("")) {
				return mapper.getCategoryAllPostList(searchCategory);
			} else if (!searchWord.equals("") && !searchCategory.equals("")) {
				return mapper.getCategorySearchAllPostList(s);
			} else {
				return mapper.getSearchAllPostList(s);
			}
		} else {
			if (searchWord.equals("") && searchCategory.equals("")) {
				return mapper.getDelPostList();
			} else if (searchWord.equals("") && !searchCategory.equals("")) {
				return mapper.getCategoryDelPostList(searchCategory);
			} else if (!searchWord.equals("") && !searchCategory.equals("")) {
				return mapper.getCategorySearchDelPostList(s);
			} else {
				return mapper.getSearchDelPostList(s);
			}
		}
	}

	public void recoverPost(Integer postNo) {
		mapper.recoverPost(postNo);
	}

	public void dataBaseDelPost(Integer postNo) {
		mapper.dataBaseDelPost(postNo);
	}

	public void addCategory(String name) {
		mapper.addCategory(name);
	}

	public ArrayList<CompanyBoardCategoryDto> categoryList() {
		return mapper.categoryList();
	}

	public void deleteCategory(String name) {
		mapper.deleteCategory(name);
		mapper.deleteCategoryPosts(name);
	}

	/* 게시판 메인 페이지 상단 공지 글, 인기 글 */
	@Override
	public List<CompanyBoardDto> getTopNoticePosts(int limit) {
		return mapper.selectTopPostsByCategory(limit);
	}

	@Override
	public List<CompanyBoardDto> getTopPopularPosts(int limit) {
		return mapper.selectTopPostsByHits(limit);
	}
}
