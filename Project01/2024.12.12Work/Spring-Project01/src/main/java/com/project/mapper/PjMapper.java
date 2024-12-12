package com.project.mapper;

import com.project.dto.LoginDto;

public interface PjMapper {

	public int login (LoginDto l);
	
	public LoginDto loginInfo(LoginDto l);
}
