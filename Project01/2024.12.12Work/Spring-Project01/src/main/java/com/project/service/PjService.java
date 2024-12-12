package com.project.service;

import com.project.dto.LoginDto;

public interface PjService {
	
	public int login(LoginDto l);
	
	public LoginDto loginInfo(LoginDto l);
}
