package com.project.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.project.board.dto.CompanyBoardDto;
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
	
	public ArrayList<CompanyBoardDto> getPostList(String category){
		return mapper.getPostList(category);
	}
	
	public CompanyBoardDto read(String no) {
		mapper.hitsUp(no);
		return mapper.read(no);
	}
	
	public void commentsWrite(CompanyBoardDto c) {
		mapper.commentsWrite(c);
	}
}
