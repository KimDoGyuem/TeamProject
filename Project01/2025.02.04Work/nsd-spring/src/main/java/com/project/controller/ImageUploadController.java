package com.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/imageUpload")
public class ImageUploadController {

	// 파일 저장 경로 설정
	private String uploadDir = "uploads";

	@PostMapping("/upload")
	public List<String> upload(@RequestParam("image") List<MultipartFile> files) {
		System.out.println("이미지 넘어옴");
		List<String> uploadedUrls = new ArrayList<>();
		try {
			// "uploads" 폴더가 없으면 자동 생성
			File directory = new File(uploadDir);
			if (!directory.exists()) {
				// 폴더 자동 생성
				directory.mkdirs();
			}
			// 업로드 폴더 위치 확인 용 로그
			System.out.println("업로드 폴더 위치: " + directory.getAbsolutePath());
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					// 파일명 중복 방지를 위한 UUID 추가
					String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
					// 저장할 파일 경로 설정
					String filePath = Paths.get(uploadDir, fileName).toString();
					// 파일 저장
					File dest = new File(filePath);
					file.transferTo(dest);
					// 업로드 된 파일의 URL 생성
					String fileUrl = "http://localhost:8080/spring/uploads/" + fileName;
					uploadedUrls.add(fileUrl);
				}
			}
		} catch (IOException e) {
			throw new RuntimeException("파일 업로드 실패", e);
		}
		return uploadedUrls;
	}

}
