package com.project.mapper;

import java.util.ArrayList;
import java.util.List;

import com.project.dto.DepartmentDto;
import com.project.dto.IssueCommentDto;
import com.project.dto.IssueDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.dto.ProjectMemberDto;

public interface PjMapper {

	public int login(LoginDto l);

	public LoginDto onLogin(LoginDto l);

	public void addProject(ProjectManagementDto p);

	public ArrayList<ProjectManagementDto> getProjectList();

	public ArrayList<ProjectMemberDto> getProjectMemberlist();

	public void endProject(String no);

	public List<Integer> endCheck();

	public void projectMemberAdd(ProjectMemberDto p);

	public int projectMemberSearchCount(ProjectMemberDto p);

	public void pmExclude(ProjectMemberDto p);

	public ArrayList<LoginDto> getEmployeeList();

	public ArrayList<DepartmentDto> getDepartmentList();

	public void addDepartment(String name);

	public void deleteEmployee(String id);

	public void addEmployee(LoginDto l);

	public void departmentMemberAdd(LoginDto l);

	public void emExclude(String id);

	public void changePosition(LoginDto cp);

	public void deleteDepartment(String departmentName);

	public void departmentReset(String departmentName);

	public void departmentLeader(DepartmentDto d);

	public void modifyMyPw(LoginDto l);

	public void modifyMyPP(LoginDto l);

	public LoginDto loginInfo(String id);

	// issueCheck매퍼 추가
	public int issueCheck(Long pjNo);

	// getIssue매퍼 추가
	public ArrayList<IssueDto> getIssue(Long pjNo);

	// getIssueComment매퍼 추가
	public ArrayList<IssueCommentDto> getIssueComment(Long issueNo);

	// getIssueByIssueNo매퍼 추가
	public IssueDto getIssueByIssueNo(Long issueNo);

	// issueWrite매퍼 추가
	public void issueWrite(IssueDto i);

	// issueCommentWrite매퍼 추가
	public void issueCommentWrite(IssueCommentDto c);

	// issueClose매퍼 추가
	public void issueClose(Long issueNo);
	
	// 종료된 프로젝트 리스트 호출
	public ArrayList<ProjectManagementDto> getEndProjectList();
}
