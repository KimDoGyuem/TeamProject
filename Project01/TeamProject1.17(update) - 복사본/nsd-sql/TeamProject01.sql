use my_cat;
show tables;
create table company_member(
	name varchar(20) not null,
	company_id varchar(20) primary key,
    password varchar(20) not null,
    position varchar(20),
    p_rank int default 2,
    department varchar(20) default '',
    profile_photo varchar(5) DEFAULT '1'
);
ALTER TABLE company_member ADD COLUMN profile_photo varchar(5) default '1';

select * from company_member order by p_rank asc;
insert into company_member(name,company_id,password,position,p_rank) values('김사원','w1','11','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('이사원','w2','22','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('박사원','w3','33','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('최사원','w4','44','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('정사원','w5','55','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('강사원','w6','66','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('조사원','w7','77','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('윤사원','w8','88','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('장사원','w9','99','사원',2);
insert into company_member(name,company_id,password,position,p_rank) values('왕사장','boss','00','사장',0);

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

insert into company_member(name,company_id,position,p_rank) values('김씨','000','사원',2);	##테스트 insert 문

DROP TRIGGER IF EXISTS set_pw_auto_generation_trigger;		## 트리거 삭제문
SHOW TRIGGERS;		##트리거 목록 확인


create table project_list(
	no int primary key auto_increment,
	project_name varchar(50) ,
	project_content varchar(50),
    project_period text,
    is_finished boolean default false
);
select * from project_list;
ALTER TABLE project_list ADD COLUMN is_finished boolean default false;
update project_list set is_finished = false where no = 3;
create table project_member_list(
	company_id varchar(50),
    project_number int
);
select * from project_member_list;

create table department_list(
	no int primary key auto_increment,
	department_name varchar(50),
    team_leader varchar(50) default '미정'
);
select * from department_list;

drop table company_member;
truncate department_list;

##여기부터 게시판
create table company_board(
	cb_no int primary key auto_increment, ##글번호 
    company_id varchar(50),	##작성자id
	company_name varchar(50),	##작성자 이름
    cb_title varchar(255),		##글제목
    cb_text text,			##글내용
    cb_category varchar(50),	##카테고리
    cb_date DATETIME DEFAULT now(),	##작성 및 수정 날짜
    cb_hits int default 0,	##조회수
    cb_is_deleted BOOLEAN DEFAULT FALSE ##삭제 로직
);
select * from company_board order by cb_no desc;
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('boss', '왕사장', '아재개그', '이것은 뭘까요?', '자유');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w1', '김사원', '영화 감상', '오징어 게임2 재미있어요.', '자유');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w2', '이사원', '주식 토크', '요즘 주식이 올랐어요.', '자유');

INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('boss', '왕사장', '아재개그', '이것은 뭘까요?', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w1', '김사원', '영화 감상', '오징어 게임2 재미있어요.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w2', '이사원', '주식 토크', '요즘 주식이 올랐어요.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w3', '박사원', '취미 생활', '최근에 취미로 배드민턴을 하고 있어요.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w4', '최사원', '퇴근후 풋살', '오늘도 퇴근후에 풋살 차실래요?', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w5', '정사원', '신입사원', '안녕하십니까 신입사원 정사원 입니다.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w6', '강사원', '점심메뉴', '점심시간에 돈까스를 먹었습니다.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w7', '조사원', '결재 서류 확인', '결재 받을게 있는데 지금 가도되나요?', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w8', '윤사원', '건강 이슈로 인한 조퇴', '몸이 안좋아서 먼저 조퇴 하겠습니다.', 'free');
INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('w9', '장사원', '2025년 새해가 시작되었어요', '새해 복 많이 받으세요.', 'free');


INSERT INTO company_board (company_id, company_name, cb_title, cb_text, cb_category) VALUES ('boss', '왕사장', '회사 내 분리수거 철저히 하기', '이것은 뭘까요?', '공지');

UPDATE company_board SET cb_category = '공지' WHERE cb_category = 'notice';
UPDATE company_board SET cb_category = '자유' WHERE cb_category = 'free';
UPDATE company_board SET cb_hits = cb_hits + 30 WHERE cb_no = 55;

create table company_board_comment(
	comment_no int primary key auto_increment,
	cb_comment_no int,		##해당 글번호
    company_id varchar(50),	##댓글 작성자id
	company_name varchar(50),	##작성자 이름
    cb_comment_text text,	##댓글 내용
    cb_comment_date DATETIME DEFAULT now(),	##댓글 작성 날짜
    cb_comment_is_deleted BOOLEAN DEFAULT FALSE,	##삭제 로직
    FOREIGN KEY (cb_comment_no) REFERENCES company_board(cb_no) ON DELETE CASCADE ##메인 게시글 삭제 시 댓글 자동 삭제 로직
);
select * from company_board_comment;

## 카테고리 관리 로직
create table company_board_category(
	cb_category_name varchar(50)
);
select * from company_board_category;
insert into company_board_category(cb_category_name) values('공지'), ('자유');

drop table company_board;
truncate company_board;

## 이슈 리스트 테이블
drop table project_issue_list;
create table project_issue_list(
	issue_no int primary key auto_increment,
    issue_project_no int not null,
    issue_title varchar(50),
    issue_details text,
    issue_label varchar(20),
    issue_author varchar(20),
    issue_date datetime default now(),
    issue_is_closed boolean default false,
    issue_closedDate datetime
);
select * from project_issue_list;
insert into project_issue_list (issue_project_no, issue_title, issue_details, issue_label, issue_author) values(3, '이슈존재테스트', '이슈내용테스트', 'bug', '박사원');
select count(*) from project_issue_list where issue_project_no = 3;

## 이슈 코멘트 테이블
drop table project_issue_comment;
create table project_issue_comment(
	comment_no int primary key auto_increment,
    comment_issue_no int not null,
    comment_text text,
    comment_author varchar(20),
    comment_date datetime default now()
);
insert into project_issue_comment (comment_issue_no, comment_text, comment_author) values(1, '이슈코멘트테스트', '이사원');
select * from project_issue_comment;