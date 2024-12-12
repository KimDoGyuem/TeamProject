use my_cat;
create table company_member(
	company_id char(20) primary key,
    password char(20) not null,
    position_rank int default 0
);
select * from company_member;
insert into company_member values('worker1','1234',1);
insert into company_member values('boss','1234',7);
drop table company_member;
