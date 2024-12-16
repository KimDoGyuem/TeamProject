package com.project.mapper;

import java.util.ArrayList;

import com.project.dto.DepartmentDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;

public interface PjMapper {

	public int login (LoginDto l);
	
	public LoginDto loginInfo(LoginDto l);
	
	public void addProject(ProjectManagementDto p);
	
	public ArrayList<ProjectManagementDto> getProjectList();
	
	public void endProject(String name);
	
	public ArrayList<LoginDto> getEmployeeList();
	
	public ArrayList<DepartmentDto> getDepartmentList();
	
	public void addDepartment(String name);
	
	public void deleteEmployee(String id);
	
	public void departmentMemberAdd(LoginDto l);
	
	public void exclude(String id);
	
	public void changePosition(LoginDto l);
	
	public void deleteDepartment(String no);
	public void departmentReset(String no);
	
}
