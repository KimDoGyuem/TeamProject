package com.project.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.LoginDto;
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
}
