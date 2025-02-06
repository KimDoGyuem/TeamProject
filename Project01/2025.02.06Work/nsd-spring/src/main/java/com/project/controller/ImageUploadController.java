package com.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.scheduling.annotation.Scheduled;
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
	
	// 파일 저장 로직(폴더 없을 시 폴더 생성)
	@PostMapping("/upload")
	public List<String> upload(@RequestParam("image") List<MultipartFile> files) {
		System.out.println("이미지 넘어옴");
		List<String> uploadedUrls = new ArrayList<>();
		try {
			// uploadDir 경로를 기반으로 File 객체 생성
			File directory = new File(uploadDir);
			// 경로에 파일이 존재 하는지 확인
			if (!directory.exists()) {
				// "uploads" 폴더가 없으면 자동 생성
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
	
	// 파일 삭제 로직(매달 1일 자정에 실행(Cron 표현식))
	@Scheduled(cron = "0 0 0 1 * ?")
//	@Scheduled(fixedRate = 10000)		// ★★★코드 동작 테스트(10초마다 실행)★★★
	public void deleteOldImages() {
		System.out.println("이미지 삭제 코드 실행");
		// uploadDir 경로를 기반으로 File 객체 생성
		File uploadFolder = new File(uploadDir);
		// 경로에 파일이 존재 하지 않을 시 메서드 종료
		if(!uploadFolder.exists()) {
			System.out.println("업로드 폴더가 존재하지 않음");
			return;
		}
		// 현재시간 - 설정한시간 값을 Instant 객체의 변수 expirationTime에 저장
		// Instant = Java의 날짜/시간 API에서 제공하는 UTC 기준의 타임스탬프 클래스
		// 현재시간(Instant.now()) 빼기(.minus()) 1달(1, ChronoUnit.MONTHS)
		Instant expirationTime = Instant.now().minus(1, ChronoUnit.MONTHS);
//		Instant expirationTime = Instant.now().minus(1, ChronoUnit.MINUTES);		// ★★★코드 동작 테스트(1분 지난 파일 삭제)★★★
		
		// 폴더 안의 모든 파일 목록(파일의 정보)을 File객체에 배열로 저장
		File[] files = uploadFolder.listFiles();
		// 폴더 안에 파일이 존재 할 경우
		if(files != null) {
			// Arrays.stream(files)은 배열을 스트림(Stream<File>)으로 변환 해줌
			// 스트림(Stream) = 데이터를 반복적으로 처리할 수 있는 Java의 기능/ 컬렉션, 배열, 파일 목록 등을 쉽게 처리할 수 있도록 설계됨
			// Arrays.stream(files).forEach(file -> {...})는 for(File file : files){...}이렇게 기존의 향상for문 으로 쓸 수 있음(데이터 필터링, 변환 작업을 수행 하므로 전자의 방법을 추천)
			Arrays.stream(files).forEach(file -> {
				// 데이터가 파일 인지 확인(폴더 일 경우 false)
				if(file.isFile()) {
					// 파일의 마지막 수정 시간을 가져옴
					Instant fileModifiedTime = Instant.ofEpochMilli(file.lastModified());
					// 마지막 수정 시간이 설정한 조건 시간 이전(오래된 파일) 일 경우 true
					if(fileModifiedTime.isBefore(expirationTime)) {
						// 파일 삭제 시도 후 성공시 true 실패시 false
						if(file.delete()) {
							System.out.println("파일 삭제 완료: "+file.getName());
						}else {
							System.out.println("파일 삭제 실패: "+file.getName());
						}
					}
				}
			});
		}
	}
}
