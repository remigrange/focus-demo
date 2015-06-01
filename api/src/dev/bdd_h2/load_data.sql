insert into ALIAS(ALS_ID, TITLE, ADDITION) select * from CSVREAD('alias.csv');
insert into COUNTRY(COU_CD, LABEL) select * from CSVREAD('country.csv');
insert into GENRE(GEN_CD, LABEL) select * from CSVREAD('genre.csv');
insert into LANGUAGE(LAN_CD, LABEL) select * from CSVREAD('language.csv');
insert into ROLE_MOVIE(RLM_CD, LABEL) select * from CSVREAD('role_movie.csv');
insert into TITLE(TIT_CD, LABEL) select * from CSVREAD('title.csv');
insert into MOVIE(MOV_ID, TITLE, RELEASED, RUNTIME, DESCRIPTION, METADAS_JSON, IMDBID, YEAR) select * from CSVREAD('movie.csv');
insert into PEOPLE(PEO_ID, LAST_NAME, FIRST_NAME, IMDBID, TIT_CD, PEO_NAME) select * from CSVREAD('people.csv');
insert into CASTING(CAST_ID, CHARACTER_NAME, PEO_ID, MOV_ID, RLM_CD) select * from CSVREAD('casting.csv');
insert into MOV_ALS(MOV_ID, ALS_ID) select * from CSVREAD('mov_als.csv');
insert into MOV_COU(MOV_ID, COU_CD) select * from CSVREAD('mov_cou.csv');
insert into MOV_GEN(MOV_ID, GEN_CD) select * from CSVREAD('mov_gen.csv');
insert into MOV_LAN(MOV_ID, LAN_CD) select * from CSVREAD('mov_lan.csv');
insert into ROLE_PEOPLE(RLP_ID, COMMENT, PEO_ID, MOV_ID, RLM_CD) select * from CSVREAD('role_people.csv');

alter SEQUENCE SEQ_ALIAS restart with select max(als_id +1 ) from alias;
alter SEQUENCE SEQ_MOVIE restart with select max(mov_id +1 ) from MOVIE;
alter SEQUENCE SEQ_PEOPLE restart with select max(peo_id +1 ) from PEOPLE;
alter SEQUENCE SEQ_CASTING restart with select max(cast_id +1 ) from CASTING;
alter SEQUENCE SEQ_ROLE_PEOPLE restart with select max(rlp_id +1 ) from ROLE_PEOPLE;


