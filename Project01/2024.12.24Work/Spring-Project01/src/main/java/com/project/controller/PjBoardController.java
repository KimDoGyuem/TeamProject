package com.project.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	public ArrayList<CompanyBoardDto> getPostList
	(@RequestParam("category")String category, @RequestParam("searchTag")String searchTag, @RequestParam("searchWord")String searchWord)
	{
		ArrayList<CompanyBoardDto> c = service.getPostList(category,searchTag,searchWord); 
		return c;
	}
	
	@RequestMapping("/read")
	public CompanyBoardDto read(@RequestParam("postNo")String no) {
		return service.read(no);
	}
	@RequestMapping("/hitsUp")
	public void hitsUp(@RequestParam("no")String no) {
		service.hitsUp(no);
	}
	
	@RequestMapping("/commentsWrite")
	public void commentsWrite(@RequestBody CompanyBoardCommentDto c) {
		service.commentsWrite(c);
	}
	
	@RequestMapping("/commentsRead")
	public ArrayList<CompanyBoardCommentDto> commentsRead(@RequestParam("commentNo")String no) {
		ArrayList<CompanyBoardCommentDto> c = service.commentsRead(no); 
		return c;
	}
	
	@RequestMapping("/deletePost")
	public void deletePost(@RequestParam("postNo")String no) {
		service.deletePost(no);
	}
	
	@RequestMapping("/deleteComment")
	public void deleteComment(@RequestParam("text")String text) {
		service.deleteComment(text);
	}
	
	@RequestMapping("/modifyPost")
	public void modifyPost(@RequestBody CompanyBoardDto c) {
		service.modifyPost(c);
	}
}
