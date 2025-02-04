package com.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.DepartmentDto;
import com.project.dto.IssueCommentDto;
import com.project.dto.IssueDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.dto.ProjectMemberDto;
import com.project.mapper.PjMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@Service
@AllArgsConstructor
public class PjServiceImpl implements PjService {

	private PjMapper mapper;

	public int login(LoginDto l) {
		return mapper.login(l);
	}

	public LoginDto onLogin(LoginDto l) {
		return mapper.onLogin(l);
	}

	public void addProject(ProjectManagementDto p) {
		mapper.addProject(p);
	}

	public ArrayList<ProjectManagementDto> getProjectList() {
		ArrayList<ProjectManagementDto> pl = mapper.getProjectList();
		ArrayList<LoginDto> lo = mapper.getEmployeeList();
		ArrayList<ProjectMemberDto> pro = mapper.getProjectMemberlist();
		List<Integer> endedPj = mapper.endCheck();
		ArrayList<Integer> endedPjAl = new ArrayList<>(endedPj);

		// 프로젝트 현황판용 finished된 프로젝트는 안보이게 걸러내는 과정 진행
		for (LoginDto l : lo) {
			for (ProjectManagementDto p : pl) {
				for (ProjectMemberDto pm : pro) {
					// 중복 추가를 방지하기 위해 조건 추가
					if (p.getNo() == pm.getProject_number() && l.getCompany_id().equals(pm.getCompany_id())
							&& !endedPjAl.contains(pm.getProject_number()) && !p.getEmployee().contains(l)) {
						// 이미 추가된 직원인지 확인
						p.getEmployee().add(l);
					}
				}
			}
		}

		/* 기존 방식 */
//		for (LoginDto l : lo) {
//			for (ProjectManagementDto p : pl) {
//				for (ProjectMemberDto pm : pro) {
//					if (p.getNo() == pm.getProject_number() && l.getCompany_id().equals(pm.getCompany_id())) {
//						p.getEmployee().add(l);
//					}
//				}
//			}
//		}

		return pl;
	}

	public void endProject(String no) {
		mapper.endProject(no);
	}

	public List<Integer> endCheck() {
		return mapper.endCheck();
	}

	public int projectMemberAdd(ProjectMemberDto p) {
		if (mapper.projectMemberSearchCount(p) > 0) {
			return 1;
		} else {
			mapper.projectMemberAdd(p);
			return 0;
		}
	}

	public void pmExclude(ProjectMemberDto p) {
		mapper.pmExclude(p);
	}

	public ArrayList<LoginDto> getEmployeeList() {
		return mapper.getEmployeeList();
	}

	public ArrayList<DepartmentDto> getDepartmentList() {
		ArrayList<DepartmentDto> de = mapper.getDepartmentList();
		ArrayList<LoginDto> lo = mapper.getEmployeeList();
		for (LoginDto l : lo) {
			for (DepartmentDto d : de) {
				if (d.getDepartment_name().equals(l.getDepartment())) {
					d.employee.add(l);
					break;
				}
			}
		}
		return de;
	}

	public void addDepartment(String name) {
		mapper.addDepartment(name);
	}

	public void deleteEmployee(String id) {
		mapper.deleteEmployee(id);
	}

	public void addEmployee(LoginDto l) {
		mapper.addEmployee(l);
	}

	public void departmentMemberAdd(LoginDto l) {
		mapper.departmentMemberAdd(l);
	}

	public void emExclude(String id) {
		mapper.emExclude(id);
	}

	public void changePosition(LoginDto l) {
		String position = "";
		switch (l.getP_rank()) {
		case 0:
			position = "사장";
			break;
		case 1:
			position = "부장";
			break;
		case 2:
			position = "사원";
			break;
		}
		LoginDto cp = new LoginDto(l.getCompany_id(), position, l.getP_rank());

		mapper.changePosition(cp);
	}

	public void deleteDepartment(String departmentName) {
		mapper.departmentReset(departmentName);
		mapper.deleteDepartment(departmentName);
	}

	public void departmentLeader(DepartmentDto d) {
		mapper.departmentLeader(d);
	}

	public void modifyMyPw(LoginDto l) {
		mapper.modifyMyPw(l);
	}

	public void modifyMyPP(LoginDto l) {
		mapper.modifyMyPP(l);
	}

	public LoginDto loginInfo(String id) {
		return mapper.loginInfo(id);
	}

	public boolean issueCheck(Long pjNo) {
		int count = mapper.issueCheck(pjNo);
		if (count != 0)
			return true;
		else
			return false;
	}

	public ArrayList<IssueDto> getIssue(Long pjNo) {
		return mapper.getIssue(pjNo);
	}

	public IssueDto getIssueByIssueNo(Long issueNo) {
		IssueDto i = mapper.getIssueByIssueNo(issueNo);
		i.setComments(mapper.getIssueComment(issueNo));

		return i;
	}

	public void issueWrite(IssueDto i) {
		mapper.issueWrite(i);
	}

	public void issueCommentWrite(IssueCommentDto c) {
		mapper.issueCommentWrite(c);
	}

	public void issueClose(Long issueNo) {
		mapper.issueClose(issueNo);
	}

	public void issueReOpen(Long issueNo) {
		mapper.issueReOpen(issueNo);
	}

	public void issueModify(IssueDto i) {
		mapper.issueModify(i);
	}

	public void issueCommentModify(IssueCommentDto c) {
		mapper.issueCommentModify(c);
	}

	public ArrayList<ProjectManagementDto> getEndProjectList() {
		return mapper.getEndProjectList();
	}
}
