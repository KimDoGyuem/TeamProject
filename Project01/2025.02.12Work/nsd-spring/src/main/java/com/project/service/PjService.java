package com.project.service;

import java.util.ArrayList;
import java.util.List;

import com.project.dto.DepartmentDto;
import com.project.dto.IssueCommentDto;
import com.project.dto.IssueDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.dto.ProjectMemberDto;

public interface PjService {

	public int login(LoginDto l);

	public LoginDto onLogin(LoginDto l);

	public void addProject(ProjectManagementDto p);

	public ArrayList<ProjectManagementDto> getProjectList();

	public void endProject(String no);

	public List<Integer> endCheck();

	public int projectMemberAdd(ProjectMemberDto p);

	public void pmExclude(ProjectMemberDto p);

	public ArrayList<LoginDto> getEmployeeList();

	public ArrayList<DepartmentDto> getDepartmentList();

	public void addDepartment(String name);

	public void deleteEmployee(String id);

	public void addEmployee(LoginDto l);

	public void departmentMemberAdd(LoginDto l);

	public void emExclude(String id);

	public void changePosition(LoginDto l);

	public void deleteDepartment(String departmentName);

	public void departmentLeader(DepartmentDto d);

	public void modifyMyPw(LoginDto l);

	public void modifyMyPP(LoginDto l);

	public LoginDto loginInfo(String id);

	public boolean issueCheck(Long pjNo);

	public ArrayList<IssueDto> getIssue(Long pjNo);

	public IssueDto getIssueByIssueNo(Long issueNo);

	public void issueWrite(IssueDto i);

	public void issueCommentWrite(IssueCommentDto c);

	public void issueClose(IssueDto i);

	public void issueReOpen(Long issueNo);

	public void issueModify(IssueDto i);

	public void issueCommentModify(IssueCommentDto c);

	public ArrayList<ProjectManagementDto> getEndProjectList();

	public boolean checkProjectParticipation(ProjectMemberDto p);

}
