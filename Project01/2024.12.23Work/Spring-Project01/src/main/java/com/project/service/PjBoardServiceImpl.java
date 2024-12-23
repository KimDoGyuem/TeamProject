package com.project.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.project.board.dto.CompanyBoardCommentDto;
import com.project.board.dto.CompanyBoardDto;
import com.project.board.dto.SaerchDto;
import com.project.mapper.PjBoardMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class PjBoardServiceImpl implements PjBoardService{

	private PjBoardMapper mapper;
	
	public void write(CompanyBoardDto c) {
			mapper.write(c);
	}
	
	public ArrayList<CompanyBoardDto> getPostList(String category,String searchTag,String searchWord){
		SaerchDto s = new SaerchDto(category,searchTag,searchWord);
		if(searchWord.equals("")) {
			System.out.println("실행됨1");
			return mapper.getPostList(category);
		}else {
			System.out.println("실행됨2");
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
	
	public ArrayList<CompanyBoardCommentDto> commentsRead(String no){
		return mapper.commentsRead(no);
	}
	
	public void deletePost(String no) {
		mapper.deletePost(no);
	}
	
	public void deleteComment(String text) {
		mapper.deleteComment(text);
	}
	
	public void modifyPost(CompanyBoardDto c) {
		mapper.modifyPost(c);
	}
}
