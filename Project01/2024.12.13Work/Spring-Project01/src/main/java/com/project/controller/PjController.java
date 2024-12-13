package com.project.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.LoginDto;
import com.project.dto.ProjectManagementDto;
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
	public int login(@RequestBody LoginDto l) {
		return service.login(l);
	}
	
	@RequestMapping("/loginInfo")
	public LoginDto loginInfo(@RequestBody LoginDto l) {
		LoginDto logInfo = service.loginInfo(l);
		return logInfo;
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
	public void endProject(@RequestParam("name")String name) {
		service.endProject(name);
	}
	
	@RequestMapping("/getEmployeeList")
	public ArrayList<LoginDto> getEmployeeList(){
		ArrayList<LoginDto> l = service.getEmployeeList();
		return l;
	}
}
