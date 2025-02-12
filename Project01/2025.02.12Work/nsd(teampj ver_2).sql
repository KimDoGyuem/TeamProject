use my_cat;
show tables;
SHOW TRIGGERS;		
show databases;

drop table company_member;
create table company_member(
	company_name varchar(20) not null,
	company_id varchar(20) primary key,
    password varchar(20) not null,
    position varchar(20),
    position_rank int default 2,
    department varchar(20) default '',
    profile_photo varchar(5) DEFAULT '1'
);

select * from company_member order by position_rank asc;
INSERT INTO `company_member` VALUES ('부부장','bb','bb00','부장',1,'영업','1'),('왕사장','boss','00','사장',0,'','4'),('최부장','c1','c100','부장',1,'개발','1'),
('강부장','t1','t100','사원',2,'','1'),('여부장','t2','t200','부장',1,'','1'),('호부장','t3','t300','부장',1,'','1'),('남궁부장','t4','t400','부장',1,'','1'),
('길사원','t5','t500','사원',2,'','1'),('김사원','w1','11','사원',2,'관리','3'),('이사원','w2','22','사원',2,'기획','1'),('최사원','w4','44','사원',2,'','1'),
('정사원','w5','55','사원',2,'','1'),('강사원','w6','66','사원',2,'','1'),('조사원','w7','77','사원',2,'','1'),('윤사원','w8','88','사원',2,'관리','1'),
('장사원','w9','99','사원',2,'관리','1');
INSERT INTO `company_member` VALUES ('김주딱', 'admin', '00', '관리자', 0, '', 1);

##사원 비밀번호 자동 입력 트리거 
DELIMITER $$
CREATE TRIGGER set_pw_auto_generation_trigger 
BEFORE INSERT ON company_member
FOR EACH ROW
BEGIN
    IF NEW.password IS NULL THEN					## password 는 변수명임..
        -- password에 company_id 값과 추가 문자열 'a'를 결합하여 설정
        SET NEW.password = CONCAT(NEW.company_id, '00');
    END IF;
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS set_pw_auto_generation_trigger;		## 트리거 삭제문

drop table department_list;
create table department_list(
	department_no int primary key auto_increment,
	department_name varchar(20),
    team_leader varchar(20) default '미정'
);
select * from department_list;
INSERT INTO `department_list` VALUES (1,'기획','정사원'),(2,'관리','윤사원'),(3,'영업','부부장'),(4,'개발','최부장'),(5,'기술혁신','미정');

drop table project_list;
create table project_list(
	project_no int primary key auto_increment,
	project_name varchar(50) ,
	project_content varchar(50),
    project_startDate date,
    project_endDate date,
    is_finished boolean default false
);
select * from project_list;
SELECT * from project_list where is_finished = true order by project_startDate;

INSERT INTO `project_list` VALUES (1,'신작프로젝트','신작개발','2025-01-01','2025-01-31',0),(2,'광고프로젝트','신작광고외주','2025-01-06','2025-01-17',0),
(3,'신작QA','베타버젼 테스트','2024-12-01','2025-02-28',1),(4,'과자협업프로젝트','부식계약','2025-02-04','2025-02-08',0),
(5,'프로젝트 연혁배치 테스트','11월 시작','2024-11-01','2025-02-28',1);

drop table project_member_list;
create table project_member_list(
	company_id varchar(20),
    project_no int
);
select * from project_member_list;
INSERT INTO `project_member_list` VALUES ('bb',3),('boss',5),('bb',6),('w1',6),('w1',5),('bb',2),('bb',1),('w1',2),('w5',3),('w6',3),('w7',3),('w8',3),('w9',3),
('c1',4),('c1',1),('w1',4),('boss',4),('bb',4),('t1',4),('t2',4),('t22',4),('tt1',4),('w2',4),('w4',4),('w5',4),('w6',4),('w7',4),('w9',4);

## 이슈 리스트 테이블
drop table project_issue_list;
create table project_issue_list(
	issue_no int primary key auto_increment,
    issue_project_no int not null,
    issue_title varchar(50),
    issue_details text,
    issue_label varchar(20),
    issue_author varchar(20),
    issue_datetime datetime default now(),
    issue_is_closed boolean default false,
    issue_closer varchar(20) default '',
    issue_closedDatetime datetime
);
select * from project_issue_list;
INSERT INTO `project_issue_list` (issue_no, issue_project_no, issue_title, issue_details, issue_label, issue_author, issue_datetime, issue_is_closed, issue_closedDatetime) 
VALUES (1,3,'이슈존재테스트','이슈내용테스트','bug','박사원','2025-01-16 10:30:25',1,'2025-01-17 11:55:51'),(2,3,'이슈존재테스트','이슈내용테스트','bug','박사원','2025-01-17 09:07:55',1,'2025-01-17 14:13:29'),
(3,3,'이슈존재테스트','이슈내용테스트','bug','박사원','2025-01-17 09:07:56',0,NULL),(4,3,'이슈존재테스트','이슈내용테스트','bug','박사원','2025-01-17 09:07:56',0,NULL),
(5,1,'버그발생테스트','버그발생','bug','왕사장','2025-01-17 10:59:04',1,'2025-01-17 11:00:00'),(7,1,'NEW ISSUE TEST','TEST Details','duplicate','왕사장','2025-01-24 09:48:22',0,NULL),
(8,2,'이슈등록 1','버그 등록 테스트','bug','김사원','2025-02-04 09:37:03',0,NULL),(9,2,'이슈 등록 2','도큐멘테이션 테스트','documentation','김사원','2025-02-04 09:37:25',0,NULL),
(10,2,'이슈등록 3','듀플리케이트 테스트 3','duplicate','김사원','2025-02-04 09:37:42',0,NULL),(11,2,'이슈 닫기 테스트','이슈 연사람은 김사원','bug','김사원','2025-02-04 09:38:13',1,'2025-02-04 09:39:42');

## 이슈 코멘트 테이블
drop table project_issue_comment;
create table project_issue_comment(
	comment_no int primary key auto_increment,
    comment_issue_no int not null,
    comment_text text,
    comment_author varchar(20),
    comment_datetime datetime default now()
);
select * from project_issue_comment;
INSERT INTO `project_issue_comment` VALUES (1,1,'이슈코멘트테스트','이사원','2025-01-16 10:34:22'),(2,1,'이슈코멘트테스트','이사원','2025-01-17 09:08:15'),
(3,1,'이슈코멘트테스트','이사원','2025-01-17 09:08:15'),(4,5,'ㅈ됨버그뜸','왕사장','2025-01-17 10:59:18'),(5,2,'ㅋㅋ','왕사장','2025-01-17 11:31:00'),
(6,1,'코멘트','김사원','2025-01-17 14:12:47'),(7,3,'이슈코멘트테스트','왕사장','2025-01-22 09:45:24'),(8,8,'수정댓글2','왕사장','2025-02-04 12:14:47'),
(9,8,'댓글2','이사원','2025-02-04 12:15:04'),(10,8,'댓글3','최사원','2025-02-04 12:15:38'),(11,8,'댓글4','정사원','2025-02-04 12:15:57'),
(12,8,'수정테스트','김사원','2025-02-04 12:49:48');

##여기부터 게시판
drop table company_board;
create table company_board(
	cb_no int primary key auto_increment, ##글번호 
    company_id varchar(20),	##작성자id
	company_name varchar(20),	##작성자 이름
    cb_title varchar(255),		##글제목
    cb_text text,			##글내용
    cb_category varchar(50),	##카테고리
    cb_datetime DATETIME DEFAULT now(),	##작성 날짜
    cb_modify_datetime DATETIME DEFAULT now(), ##수정 날짜
    cb_hits int default 0,	##조회수
    cb_is_deleted BOOLEAN DEFAULT FALSE ##삭제 로직
);
select * from company_board order by cb_no desc;
INSERT INTO `company_board` VALUES (1,'boss','왕사장','아재개그','이것은 뭘까요?','자유','2025-01-22 09:37:25','2025-01-22 09:37:25',0,0),
(2,'w1','김사원','영화 감상','오징어 게임2 재미있어요.','자유','2025-01-22 09:37:26','2025-01-22 09:37:26',0,0),
(3,'w2','이사원','주식 토크','요즘 주식이 올랐어요.','자유','2025-01-22 09:37:26','2025-01-22 09:37:26',0,0),
(4,'boss','왕사장','아재개그','이것은 뭘까요?','자유','2025-01-22 09:37:27','2025-01-22 09:37:27',0,0),
(5,'w1','김사원','영화 감상','오징어 게임2 재미있어요.','자유','2025-01-22 09:37:28','2025-01-22 09:37:28',0,0),
(6,'w2','이사원','주식 토크','요즘 주식이 올랐어요.','자유','2025-01-22 09:37:28','2025-01-22 09:37:28',1,0),
(7,'w3','박사원','취미 생활','최근에 취미로 배드민턴을 하고 있어요.','자유','2025-01-22 09:37:29','2025-01-22 09:37:29',0,0),
(8,'w4','최사원','퇴근후 풋살','오늘도 퇴근후에 풋살 차실래요?','자유','2025-01-22 09:37:29','2025-01-22 09:37:29',0,0),
(9,'w5','정사원','신입사원','안녕하십니까 신입사원 정사원 입니다.','자유','2025-01-22 09:37:29','2025-01-22 09:37:29',0,0),
(10,'w6','강사원','점심메뉴','점심시간에 돈까스를 먹었습니다.','자유','2025-01-22 09:37:30','2025-01-22 09:37:30',157,0),
(11,'w7','조사원','결재 서류 확인','결재 받을게 있는데 지금 가도되나요?','자유','2025-01-22 09:37:30','2025-01-22 09:37:30',0,0),
(12,'w8','윤사원','건강 이슈로 인한 조퇴','몸이 안좋아서 먼저 조퇴 하겠습니다.','자유','2025-01-22 09:37:31','2025-01-22 09:37:31',2,0),
(13,'w9','장사원','2025년 새해가 시작되었어요','새해 복 많이 받으세요.','자유','2025-01-22 09:37:32','2025-01-22 09:37:32',4,0),
(14,'boss','왕사장','프로젝트 진행 현황','디자인 작업중','공지','2025-01-22 10:17:18','2025-01-22 10:17:18',1,0),
(15,'boss','왕사장','디자인 작업내용','게시판 탭 분리 or 통합 버젼\n\n마이페이지 프로필 이미지 크기 동일하게 / 배치 고민\n\n이슈페이지 디자인 작업중','공지','2025-01-22 10:19:25','2025-01-22 10:19:25',8,0),
(19,'boss','왕사장','인기글 테스트','인기글<img src=\"http://localhost:8080/spring/uploads/f60882c7-011a-4dcb-89d2-3885b35d556d_test2.webp\" alt=\"첨부 이미지\">','자유','2025-02-05 15:29:33','2025-02-05 15:29:33',2,0);

INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES
('w1', '김사원', '점심 뭐 먹지?', '오늘 점심 뭐 먹을까요? 다들 추천 좀 해주세요!', '자유'),
('w2', '이사원', '업무 프로세스 개선 건의', '현재 결재 시스템이 너무 오래 걸립니다. 개선이 필요해 보입니다.', '건의'),
('w3', '박사원', '주말에 등산 가실 분!', '이번 주말에 북한산 등산 가실 분 계신가요? 초보 환영입니다!', '취미'),
('w4', '최사원', '회의 시간 조정 요청', '매주 월요일 오전 9시 회의가 너무 힘듭니다. 오후로 조정 가능할까요?', '건의'),
('w1', '김사원', '오늘 퇴근 후 번개?', '퇴근하고 간단히 한잔할 사람 있나요? 댓글 달아주세요~', '자유'),
('w2', '이사원', '헬스장 같이 다니실 분!', '회사 근처 헬스장 등록할까 하는데 같이 다니실 분 찾습니다.', '취미'),
('w3', '박사원', '모니터 추가 지급 요청', '업무할 때 듀얼 모니터가 필요합니다. 추가 지급 가능할까요?', '건의'),
('w4', '최사원', '넷플릭스 추천 좀 해주세요', '요즘 볼만한 드라마나 영화 있을까요? 추천 부탁드려요!', '자유'),
('w1', '김사원', '독서 모임 모집', '월 1회 독서 모임 진행하려고 합니다. 관심 있으신 분 댓글 주세요!', '취미'),
('w2', '이사원', '점심시간 늘릴 수 없을까요?', '현재 점심시간이 1시간인데 1시간 30분으로 늘릴 수 있을까요?', '건의'),
('w3', '박사원', '사내 동아리 개설 희망', '요가 동아리 만들고 싶은데 관심 있는 분 있나요?', '취미'),
('w4', '최사원', '출퇴근 시간 유연 근무 제안', '출퇴근 시간을 조금 조정하면 효율이 올라갈 것 같은데 의견 주세요!', '건의'),
('w1', '김사원', '이번 주말 날씨 대박!', '주말에 날씨가 너무 좋다고 하네요. 나들이 계획 있으신가요?', '자유'),
('w2', '이사원', '캠핑 동호회 모집', '1박 2일 캠핑 함께 하실 분 계신가요? 초보도 환영입니다!', '취미'),
('w3', '박사원', '회의실 예약 시스템 개선 요청', '회의실 예약이 너무 어렵습니다. 개선이 필요해 보입니다.', '건의'),
('w4', '최사원', '이직 고민 중...', '요즘 회사에서 고민이 많습니다. 다들 이직 생각해보신 적 있나요?', '자유'),
('w1', '김사원', '야구 같이 보러 가실 분!', '이번 주말 야구 직관 가실 분 구합니다!', '취미'),
('w2', '이사원', '새로운 휴게 공간 마련 제안', '사무실 내 휴게 공간이 부족한데 추가 공간 마련이 가능할까요?', '건의'),
('w3', '박사원', '회사 앞 맛집 공유', '회사 근처에서 가장 맛있는 식당은 어디일까요? 추천 부탁드립니다.', '자유'),
('w4', '최사원', '퇴근 후 러닝모임 모집', '러닝 모임 시작하려고 합니다. 초보자도 환영합니다!', '취미'),
('w1', '김사원', '팀 회식 날짜 조율', '팀 회식 일정 조정이 필요해 보입니다. 다들 가능한 날짜 남겨주세요!', '자유'),
('w2', '이사원', '회사 내 자판기 추가 요청', '자판기가 한 대뿐이라 줄이 너무 깁니다. 추가 가능할까요?', '건의'),
('w3', '박사원', '게임 같이 하실 분!', '퇴근 후 롤이나 배그 하실 분 구해요!', '취미'),
('w4', '최사원', '주차 공간 문제 해결 요청', '주차 공간이 너무 부족합니다. 개선 방안이 필요합니다.', '건의'),
('w1', '김사원', '사무실 온도 조절 좀...', '너무 덥거나 너무 춥거나... 온도 조절 좀 해주세요!', '건의'),
('w2', '이사원', '이번 주말 캠핑 떠나요!', '같이 캠핑 가실 분 모집합니다! 초보 환영!', '취미'),
('w3', '박사원', '코딩 스터디 모집', '개발자분들 함께 공부하실 분 찾습니다!', '취미'),
('w4', '최사원', '출근 시간 변경 가능?', '조금 더 유연하게 출퇴근하면 어떨까요? 의견 주세요!', '건의'),
('w1', '김사원', '다들 점심 먹었나요?', '오늘 점심 뭐 드셨나요? 추천 좀 해주세요!', '자유'),
('w2', '이사원', '퇴근 후 볼링 치러 가실 분!', '볼링 치러 갈 사람 구합니다!', '취미'),
('w3', '박사원', '사내 워크숍 제안', '팀 빌딩을 위해 워크숍을 가면 어떨까요?', '건의'),
('w4', '최사원', '명절 선물 추천', '명절 선물 뭐가 좋을까요? 추천 부탁드립니다.', '자유'),
('w1', '김사원', '헬스장 등록하려고 하는데...', '헬스장 추천 좀 해주세요!', '취미'),
('w2', '이사원', '노트북 업그레이드 요청', '업무용 노트북이 너무 느려요. 업그레이드 가능할까요?', '건의'),
('w3', '박사원', '영화 보러 가실 분?', '이번 주말 신작 보러 가실 분?', '취미'),
('w4', '최사원', '사무실 정수기 문제', '정수기에서 이상한 맛이 나는데 점검 요청드립니다.', '건의'),
('w1', '김사원', '커피 마실 사람!', '점심 먹고 커피 한 잔 하실 분?', '자유'),
('w2', '이사원', '개발자 스터디 그룹 모집', '프로그래밍 공부 함께 하실 분 구합니다!', '취미'),
('w3', '박사원', '회식 메뉴 추천', '회식 메뉴 추천해주세요! 고기? 회?', '자유'),
('w4', '최사원', '출퇴근 교통비 지원 가능?', '대중교통비 지원이 있으면 좋겠는데 가능할까요?', '건의');

update company_board set cb_hits = 300, cb_datetime = '2025-02-01 12:00:00', cb_modify_datetime = '2025-02-01 12:00:00' where cb_no = 23;

drop table company_board_comment;
create table company_board_comment(
	comment_no int primary key auto_increment,
	cb_no int,		##해당 글번호
    company_id varchar(20),	##댓글 작성자id
	company_name varchar(20),	##작성자 이름
    cb_comment_text text,	##댓글 내용
    cb_comment_datetime DATETIME DEFAULT now(),	##댓글 작성 날짜
    cb_comment_is_deleted BOOLEAN DEFAULT FALSE,	##삭제 로직
    FOREIGN KEY (cb_no) REFERENCES company_board(cb_no) ON DELETE CASCADE ##메인 게시글 삭제 시 댓글 자동 삭제 로직
);
select * from company_board_comment;

## 카테고리 관리 로직
create table company_board_category(
	cb_category_name varchar(50)
);
select * from company_board_category;
insert into company_board_category(cb_category_name) values('전체'), ('공지'), ('자유'), ('건의'), ('취미');

create table trendingPeriod(
	period varchar(50),
    select_period int default 0
);
select * from trendingPeriod;
insert into trendingPeriod(period) values('day');
insert into trendingPeriod(period) values('week');
insert into trendingPeriod(period) values('month');
UPDATE trendingPeriod set select_period = 1 where period ='day';