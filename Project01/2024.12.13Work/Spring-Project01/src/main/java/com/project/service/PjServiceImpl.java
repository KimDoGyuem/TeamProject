package com.project.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.mapper.PjMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class PjServiceImpl implements PjService{

	private PjMapper mapper;
	
	public int login(LoginDto l) {
		return mapper.login(l);
	}
	
	public LoginDto loginInfo(LoginDto l) {
		return mapper.loginInfo(l);
	}
	
	public void addProject(ProjectManagementDto p) {
		mapper.addProject(p);
	}
	
	public ArrayList<ProjectManagementDto> getProjectList() {
		return mapper.getProjectList();
	}
	
	public void endProject(String name) {
		mapper.endProject(name);
	}
	
	public ArrayList<LoginDto> getEmployeeList(){
		return mapper.getEmployeeList();
	}
}
