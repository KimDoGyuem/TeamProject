package com.project.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.DepartmentDto;
import com.project.dto.IssueCommentDto;
import com.project.dto.IssueDto;
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
		if (service.login(l) == 1) {
			LoginDto lo = service.onLogin(l);
			// 세션 시간 설정
			s.setMaxInactiveInterval(-1);
			s.setAttribute("loginId", lo.getCompany_id());
			s.setAttribute("loginRank", lo.getPosition_rank());
			s.setAttribute("loginName", lo.getCompany_name());
		}
		return service.login(l);
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
	public void endProject(@RequestParam("no") String no) {
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
	public ArrayList<LoginDto> getEmployeeList() {
		ArrayList<LoginDto> l = service.getEmployeeList();
		return l;
	}

	@RequestMapping("/getDepartmentList")
	public ArrayList<DepartmentDto> getDepartmentList() {
		ArrayList<DepartmentDto> d = service.getDepartmentList();
		return d;
	}

	@RequestMapping("/addDepartment")
	public void addDepartment(@RequestParam("name") String name) {
		service.addDepartment(name);
	}

	@RequestMapping("/deleteEmployee")
	public void deleteEmployee(@RequestParam("id") String id) {
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
	public void exclude(@RequestParam("id") String id) {
		service.emExclude(id);
	}

	@RequestMapping("/changePosition")
	public void changePosition(@RequestBody LoginDto l) {
		service.changePosition(l);
	}

	@RequestMapping("/deleteDepartment")
	public void deleteDepartment(@RequestParam("department") String departmentName) {
		service.deleteDepartment(departmentName);
	}

	@RequestMapping("/departmentLeader")
	public void departmentLeader(@RequestBody DepartmentDto d) {
		service.departmentLeader(d);
	}

	@RequestMapping("/modifyMyPw")
	public void modifyMyPw(@RequestBody LoginDto l) {
		service.modifyMyPw(l);
	}

	@RequestMapping("/modifyMyPP")
	public void modifyMyPP(@RequestBody LoginDto l, HttpSession s) {
		service.modifyMyPP(l);
		s.setAttribute("loginProfilePhoto", l.getProfile_photo());

	}

	@RequestMapping("/loginInfo")
	public LoginDto loginInfo(HttpSession s) {
//		System.out.println("아이디는=="+s.getAttribute("loginId"));
//		System.out.println("랭크는=="+s.getAttribute("loginRank"));
//		System.out.println("이름은=="+s.getAttribute("loginName"));
		/*
		 * String id = (String)s.getAttribute("loginId"); int rank = 0;
		 * if(s.getAttribute("loginRank") == null) { rank = 3; }else { rank =
		 * (int)s.getAttribute("loginRank"); } String name =
		 * (String)s.getAttribute("loginName"); String profile_photo = (String)
		 * s.getAttribute("loginProfilePhoto");
		 */
		String id = (String) s.getAttribute("loginId");
		LoginDto lo = service.loginInfo(id);
//		s.setAttribute("loginId", lo.getCompany_id());
//		s.setAttribute("loginRank", lo.getP_rank());
//		s.setAttribute("loginName", lo.getName());
//		s.setAttribute("loginProfilePhoto", lo.getProfile_photo());
		return lo;
	}

	@RequestMapping("/issueCheck")
	public boolean issueCheck(@RequestParam("pjNo") Long pjNo) {
		return service.issueCheck(pjNo);
	}

	@RequestMapping("/getIssue")
	public ArrayList<IssueDto> getIssue(@RequestParam("pjNo") Long pjNo) {
		return service.getIssue(pjNo);
	}

	@RequestMapping("/getIssueByIssueNo")
	public IssueDto getIssueByIssueNo(@RequestParam("issueNo") Long issueNo) {
		return service.getIssueByIssueNo(issueNo);
	}

	@RequestMapping("/issueWrite")
	public void issueWrite(@RequestBody IssueDto i) {
		service.issueWrite(i);
	}

	@RequestMapping("/issueCommentWrite")
	public void issueCommentWrite(@RequestBody IssueCommentDto c) {
		service.issueCommentWrite(c);
	}

	@RequestMapping("/issueClose")
	public void issueClose(@RequestBody IssueDto i) {
		service.issueClose(i);
	}

	@RequestMapping("/issueReOpen")
	public void issueReOpen(@RequestParam("issueNo") Long issueNo) {
		service.issueReOpen(issueNo);
	}

	@RequestMapping("/issueModify")
	public void issueModify(@RequestBody IssueDto i) {
		service.issueModify(i);
	}

	@RequestMapping("/issueCommentModify")
	public void issueCommentModify(@RequestBody IssueCommentDto c) {
		service.issueCommentModify(c);
	}

	@RequestMapping("/getEndProjectList")
	public ArrayList<ProjectManagementDto> getEndProjectList() {
		return service.getEndProjectList();
	}

	@RequestMapping("/checkProjectParticipation")
	public boolean checkProjectParticipation(@RequestBody ProjectMemberDto p) {
		return service.checkProjectParticipation(p);
	}
}
