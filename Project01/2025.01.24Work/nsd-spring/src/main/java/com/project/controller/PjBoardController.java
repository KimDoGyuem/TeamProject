package com.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.board.dto.CompanyBoardCategoryDto;
import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;
import com.project.service.PjBoardService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@AllArgsConstructor
@RestController
@RequestMapping("/companyBoard/*")
public class PjBoardController {

	private PjBoardService service;

	@RequestMapping("/write")
	public void write(@RequestBody CompanyBoardDto c) {
		service.write(c);
	}

	@RequestMapping("/getPostList")
	public ArrayList<CompanyBoardDto> getPostList(@RequestParam("category") String category,
			@RequestParam("searchTag") String searchTag, @RequestParam("searchWord") String searchWord) {
		ArrayList<CompanyBoardDto> c = service.getPostList(category, searchTag, searchWord);
		return c;
	}

	@RequestMapping("/read")
	public CompanyBoardDto read(@RequestParam("postNo") String no) {
		return service.read(no);
	}

	@RequestMapping("/hitsUp")
	public void hitsUp(@RequestParam("no") String no) {
		service.hitsUp(no);
	}

	@RequestMapping("/commentsWrite")
	public void commentsWrite(@RequestBody CompanyBoardCommentDto c) {
		service.commentsWrite(c);
	}

	@RequestMapping("/commentsRead")
	public ArrayList<CompanyBoardCommentDto> commentsRead(@RequestParam("commentNo") String no) {
		ArrayList<CompanyBoardCommentDto> c = service.commentsRead(no);
		return c;
	}

	@RequestMapping("/deletePost")
	public void deletePost(@RequestParam("postNo") String no) {
		service.deletePost(no);
	}

	@RequestMapping("/deleteComment")
	public void deleteComment(@RequestParam("no") String no) {
		service.deleteComment(no);
	}

	@RequestMapping("/modifyPost")
	public void modifyPost(@RequestBody CompanyBoardDto c) {
		service.modifyPost(c);
	}

	@RequestMapping("/getAllPostList")
	public ArrayList<CompanyBoardDto> getAllPostList(@RequestParam("searchTag") String searchTag,
			@RequestParam("searchWord") String searchWord, @RequestParam("del") boolean d,
			@RequestParam("searchCategory") String searchCategory) {
		ArrayList<CompanyBoardDto> c = service.getAllPostList(searchTag, searchWord, d, searchCategory);
		return c;
	}

	@RequestMapping("/recoverPost")
	public void recoverPost(@RequestBody Map<String, List<Integer>> rpl) {
		List<Integer> recoverPostList = rpl.get("postNos");
		for (Integer postNo : recoverPostList) {
			service.recoverPost(postNo);
		}
	}

	@RequestMapping("/dataBaseDelPost")
	public void dataBaseDelPost(@RequestBody Map<String, List<Integer>> dpl) {
		List<Integer> deletePostList = dpl.get("postNos");
		for (Integer postNo : deletePostList) {
			service.dataBaseDelPost(postNo);
		}
	}

	@RequestMapping("/addCategory")
	public void addCategory(@RequestParam("name") String name) {
		service.addCategory(name);
	}

	@RequestMapping("/categoryList")
	public ArrayList<CompanyBoardCategoryDto> categoryList() {
		ArrayList<CompanyBoardCategoryDto> c = service.categoryList();
		return c;
	}

	@RequestMapping("/deleteCategory")
	public void deleteCategory(@RequestParam("name") String name) {
		service.deleteCategory(name);
	}

	/* 게시판 메인 페이지 상단 공지 글, 인기 글 */
	@RequestMapping("/getNoticeAndPopularPosts")
	public Map<String, List<CompanyBoardDto>> getNoticeAndPopularPosts(@RequestParam("period") String period) {
		// 공지 글 3개
		List<CompanyBoardDto> noticePosts = service.getTopNoticePosts(5);
		// 인기 글 5개
		List<CompanyBoardDto> popularPosts = service.getTopPopularPosts(5, period);

		// 결과를 Map 형태로 반환
		Map<String, List<CompanyBoardDto>> result = new HashMap<>();
		result.put("noticePosts", noticePosts);
		result.put("popularPosts", popularPosts);

		return result;
	}

	@RequestMapping("/onTtrendingPeriod")
	public void onTtrendingPeriod(@RequestParam("tp") String tp) {
		service.onTtrendingPeriod(tp);
	}

	@RequestMapping("/currentTrendingPeriod")
	public String currentTrendingPeriod() {
		return service.currentTrendingPeriod();
	}
}
