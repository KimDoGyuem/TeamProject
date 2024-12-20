package com.project.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	public ArrayList<CompanyBoardDto> getPostList(@RequestParam("category")String category) {
		ArrayList<CompanyBoardDto> c = service.getPostList(category); 
		return c;
	}
	
	@RequestMapping("/read")
	public CompanyBoardDto read(@RequestParam("postNo")String no) {
		return service.read(no);
	}
	
	@RequestMapping("/commentsWrite")
	public void commentsWrite(@RequestBody CompanyBoardDto c) {
		service.commentsWrite(c);
	}
}
