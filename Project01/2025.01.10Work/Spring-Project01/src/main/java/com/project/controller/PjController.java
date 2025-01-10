package com.project.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.DepartmentDto;
import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
import com.project.dto.ProjectMemberDto;
import com.project.service.PjService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Log4j
@AllArgsConstructor
@RestController
@RequestMapping("/company/*")
public class PjController {

	private PjService service;
	
	@RequestMapping("/login")
	public int login(@RequestBody LoginDto l, HttpSession s) {
		if(service.login(l)==1) {
			LoginDto lo = service.onLogin(l);
			s.setAttribute("loginId", lo.getCompany_id());
			s.setAttribute("loginRank", lo.getP_rank());
			s.setAttribute("loginName", lo.getName());
		}
		return service.login(l);
	}
	
	@RequestMapping("/loginInfo")
	public LoginDto loginInfo(HttpSession s) {
//		System.out.println("아이디는=="+s.getAttribute("loginId"));
//		System.out.println("랭크는=="+s.getAttribute("loginRank"));
//		System.out.println("이름은=="+s.getAttribute("loginName"));
		String id = (String)s.getAttribute("loginId");
		int rank = 0; 
		if(s.getAttribute("loginRank") == null) {
			rank = 3;
		}else {
			rank = (int)s.getAttribute("loginRank");
		}
		String name = (String)s.getAttribute("loginName");
		
		if(id==null) {
			System.out.println("아이디가 null이다===");
		}
		
		LoginDto logInfo = new LoginDto();
		logInfo.setCompany_id(id);
		logInfo.setP_rank(rank);
		logInfo.setName(name);
		return logInfo;
	}
	
	@RequestMapping("logout")
	public void logout(HttpSession s) {
		s.invalidate();
	}
	
	@RequestMapping("/addProject")
	public void addProject(@RequestBody ProjectManagementDto p) {
		service.addProject(p);
	}
	
	@RequestMapping("/getProjectList")
	public ArrayList<ProjectManagementDto> getProjectList() {
		ArrayList<ProjectManagementDto> p = service.getProjectList();
		return p;
	}
	
	@RequestMapping("/endProject")
	public void endProject(@RequestParam("no")String no) {
		service.endProject(no);
	}
	
	@RequestMapping("/projectMemberAdd")
	public int projectMemberAdd(@RequestBody ProjectMemberDto p) {
		return service.projectMemberAdd(p);
	}
	
	@RequestMapping("/pmExclude")
	public void pmExclude(@RequestBody ProjectMemberDto p) {
		service.pmExclude(p);
	}
	
	@RequestMapping("/getEmployeeList")
	public ArrayList<LoginDto> getEmployeeList(){
		ArrayList<LoginDto> l = service.getEmployeeList();
		return l;
	}
	
	@RequestMapping("/getDepartmentList")
	public ArrayList<DepartmentDto> getDepartmentList(){
		ArrayList<DepartmentDto> d = service.getDepartmentList();
		return d;
	}
	
	@RequestMapping("/addDepartment")
	public void addDepartment(@RequestParam("name")String name) {
		service.addDepartment(name);
	}
	
	@RequestMapping("/deleteEmployee")
	public void deleteEmployee(@RequestParam("id")String id) {
		service.deleteEmployee(id);
	}
	
	@RequestMapping("/addEmployee")
	public void addEmployee(@RequestBody LoginDto l) {
		service.addEmployee(l);
	}
	
	@RequestMapping("/departmentMemberAdd")
	public void departmentMemberAdd(@RequestBody LoginDto l) {
		service.departmentMemberAdd(l);
	}
	
	@RequestMapping("/emExclude")
	public void exclude(@RequestParam("id")String id) {
		service.emExclude(id);
	}
	
	@RequestMapping("/changePosition")
	public void changePosition(@RequestBody LoginDto l) {
		service.changePosition(l);
	}
	
	@RequestMapping("/deleteDepartment") 
	public void deleteDepartment(@RequestParam("department")String departmentName) {
		service.deleteDepartment(departmentName);
	}
	
	@RequestMapping("/departmentLeader")
	public void departmentLeader(@RequestBody DepartmentDto d) {
		service.departmentLeader(d);
	}
}
