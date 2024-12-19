package com.project.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.project.dto.DepartmentDto;
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
		ArrayList<ProjectManagementDto> pr = mapper.getProjectList();
		ArrayList<LoginDto> lo = mapper.getEmployeeList();
		for(LoginDto l : lo) { //사원 정보 쭉 나열됨
			for(ProjectManagementDto p : pr) { //프로젝트 정보 쭉 나열됨
				if(p.getNo() == l.getProject_no()) { //프로젝트 번호와 사원pj번호 일치 시 
					p.employee.add(l); //프로젝트의 멤버 리스트에 사원 정보 들어감 
					break;
				}
			}
		}
		return pr;
	}
	
	public void endProject(String no) {
		mapper.endProject(no);
		mapper.ProjectReset(no);
	}
	
	public void projectMemberAdd(LoginDto l) {
		mapper.projectMemberAdd(l);
	}
	
	public void pmExclude(String id) {
		mapper.pmExclude(id);
	}
	
	public ArrayList<LoginDto> getEmployeeList(){
		return mapper.getEmployeeList();
	}
	
	public ArrayList<DepartmentDto> getDepartmentList(){
		ArrayList<DepartmentDto> de = mapper.getDepartmentList();
		ArrayList<LoginDto> lo = mapper.getEmployeeList();
		for(LoginDto l : lo) {
			for(DepartmentDto d : de) {
				if(d.getNo() == l.getDepartment_no()) {
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
	
	public void departmentMemberAdd(LoginDto l) {
		mapper.departmentMemberAdd(l);
	}
	
	public void emExclude(String id) {
		mapper.emExclude(id);
	}
	
	public void changePosition(LoginDto l) {
		mapper.changePosition(l);
	}
	
	public void deleteDepartment(String no) {
		mapper.departmentReset(no);
		mapper.deleteDepartment(no);
	}
	
	public void departmentLeader(DepartmentDto d) {
		mapper.departmentLeader(d);	
	}
}
