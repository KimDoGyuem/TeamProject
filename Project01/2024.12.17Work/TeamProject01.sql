use my_cat;
create table company_member(
	name char(20) not null,
	company_id char(20) primary key,
    password char(20) not null,
    position_rank int default 0,
    department_no int default 0,
    project_no int default 0
);
select * from company_member;
insert into company_member(name,company_id,password,position_rank) values('사원01','w1','11',1);
insert into company_member(name,company_id,password,position_rank) values('사원02','w2','22',1);
insert into company_member(name,company_id,password,position_rank) values('사원03','w3','33',1);
insert into company_member(name,company_id,password,position_rank) values('사원04','w4','44',1);
insert into company_member(name,company_id,password,position_rank) values('사원05','w5','55',1);
insert into company_member(name,company_id,password,position_rank) values('사원06','w6','66',1);
insert into company_member(name,company_id,password,position_rank) values('사원07','w7','77',1);
insert into company_member(name,company_id,password,position_rank) values('사원08','w8','88',1);
insert into company_member(name,company_id,password,position_rank) values('사원09','w9','99',1);
insert into company_member(name,company_id,password,position_rank) values('사원10','w10','1010',1);
insert into company_member(name,company_id,password,position_rank) values('사장','boss','00',7);

create table project_list(
	no int primary key auto_increment,
	project_name char(50) ,
	project_content char(50),
    project_period char(50)
);
select * from project_list;

create table department_list(
	no int primary key auto_increment,
	department_name char(50)
);
select * from department_list;

drop table company_member;
truncate department_list;