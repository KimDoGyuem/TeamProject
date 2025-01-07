package com.project.mapper;

import java.util.ArrayList;

import com.project.dto.DepartmentDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.dto.ProjectMemberDto;

public interface PjMapper {

	public int login (LoginDto l);
	
	public LoginDto onLogin(LoginDto l);
	
	public void addProject(ProjectManagementDto p);
	
	public ArrayList<ProjectManagementDto> getProjectList();
	public ArrayList<ProjectMemberDto>getProjectMemberlist();
	
	public void endProject1(String no);
	public void endProject2(String no);
	
	public void projectMemberAdd(ProjectMemberDto p);
	public int projectMemberSearchCount(ProjectMemberDto p);
	
	public void pmExclude(ProjectMemberDto p);
	
	public ArrayList<LoginDto> getEmployeeList();
	
	public ArrayList<DepartmentDto> getDepartmentList();
	
	public void addDepartment(String name);
	
	public void deleteEmployee(String id);
	
	public void departmentMemberAdd(LoginDto l);
	
	public void emExclude(String id);
	
	public void changePosition(LoginDto cp);
	
	public void deleteDepartment(String departmentName);
	public void departmentReset(String departmentName);
	
	public void departmentLeader(DepartmentDto d);
	
}
