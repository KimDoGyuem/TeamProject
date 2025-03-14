package com.project.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.project.dto.DepartmentDto;
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

		for (LoginDto l : lo) {
			for (ProjectManagementDto p : pl) {
				for (ProjectMemberDto pm : pro) {
					if (p.getNo() == pm.getProject_number() && l.getCompany_id().equals(pm.getCompany_id())) {
						p.getEmployee().add(l);
					}
				}
			}
		}

		return pl;
	}

	public void endProject(String no) {
		mapper.endProject1(no);
		mapper.endProject2(no);
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
}
