package com.project.service;

import java.util.ArrayList;

import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;

public interface PjService {
	
	public int login(LoginDto l);
	
	public LoginDto loginInfo(LoginDto l);
	
	public void addProject(ProjectManagementDto p);
	
	public ArrayList<ProjectManagementDto> getProjectList();
	
	public void endProject(String name);
	
	public ArrayList<LoginDto> getEmployeeList();
}
