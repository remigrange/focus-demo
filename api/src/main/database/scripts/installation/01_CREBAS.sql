-- ============================================================
--   Nom de SGBD      :  PostgreSql                     
--   Date de création :  12 mars 2015  10:55:37                     
-- ============================================================



-- ============================================================
--   Sequences                                      
-- ============================================================
create sequence SEQ_ALIAS
	start with 1000 cache 20; 

create sequence SEQ_APPLICATION_USER
	start with 1000 cache 20; 

create sequence SEQ_COUNTRY
	start with 1000 cache 20; 

create sequence SEQ_FILE_INFO
	start with 1000 cache 20; 

create sequence SEQ_GENRE
	start with 1000 cache 20; 

create sequence SEQ_LANGUAGE
	start with 1000 cache 20; 

create sequence SEQ_MOVIE
	start with 1000 cache 20; 

create sequence SEQ_PEOPLE
	start with 1000 cache 20; 

create sequence SEQ_PROFIL
	start with 1000 cache 20; 

create sequence SEQ_ROLE_MOVIE
	start with 1000 cache 20; 

create sequence SEQ_ROLE_PEOPLE
	start with 1000 cache 20; 

create sequence SEQ_SECURITY_ROLE
	start with 1000 cache 20; 

create sequence SEQ_TITLE
	start with 1000 cache 20; 

create sequence SEQ_USER_AUTHENTIFICATION
	start with 1000 cache 20; 


-- ============================================================
--   Table : ALIAS                                        
-- ============================================================
create table ALIAS
(
    ALS_ID      	 NUMERIC     	not null,
    TITLE       	 VARCHAR(3000)	,
    ADDITION    	 TEXT        	,
    constraint PK_ALIAS primary key (ALS_ID)
);

comment on column ALIAS.ALS_ID is
'ALS_ID';

comment on column ALIAS.TITLE is
'Title';

comment on column ALIAS.ADDITION is
'addition';

-- ============================================================
--   Table : APPLICATION_USER                                        
-- ============================================================
create table APPLICATION_USER
(
    USR_ID      	 NUMERIC     	not null,
    LAST_NAME   	 VARCHAR(50) 	,
    FIRST_NAME  	 VARCHAR(50) 	,
    EMAIL       	 VARCHAR(150)	,
    PRO_ID      	 NUMERIC     	,
    constraint PK_APPLICATION_USER primary key (USR_ID)
);

comment on column APPLICATION_USER.USR_ID is
'USR_ID';

comment on column APPLICATION_USER.LAST_NAME is
'Last Name';

comment on column APPLICATION_USER.FIRST_NAME is
'First Name';

comment on column APPLICATION_USER.EMAIL is
'email';

comment on column APPLICATION_USER.PRO_ID is
'Profil';

create index APPLICATION_USER_PRO_ID_FK on APPLICATION_USER (PRO_ID asc);
-- ============================================================
--   Table : COUNTRY                                        
-- ============================================================
create table COUNTRY
(
    COU_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_COUNTRY primary key (COU_CD)
);

comment on column COUNTRY.COU_CD is
'COU_CD';

comment on column COUNTRY.LABEL is
'Label';

-- ============================================================
--   Table : FILE_INFO                                        
-- ============================================================
create table FILE_INFO
(
    FIL_ID      	 NUMERIC     	not null,
    FILE_NAME   	 VARCHAR(100)	,
    MIME_TYPE   	 VARCHAR(100)	,
    LENGTH      	 NUMERIC     	not null,
    LAST_MODIFIED	 TIMESTAMP   	not null,
    FILE_PATH   	 VARCHAR(250)	,
    constraint PK_FILE_INFO primary key (FIL_ID)
);

comment on column FILE_INFO.FIL_ID is
'FIL_ID';

comment on column FILE_INFO.FILE_NAME is
'FILE_NAME';

comment on column FILE_INFO.MIME_TYPE is
'MIME_TYPE';

comment on column FILE_INFO.LENGTH is
'LENGTH';

comment on column FILE_INFO.LAST_MODIFIED is
'LAST_MODIFIED';

comment on column FILE_INFO.FILE_PATH is
'FILE_PATH';

-- ============================================================
--   Table : GENRE                                        
-- ============================================================
create table GENRE
(
    GEN_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_GENRE primary key (GEN_CD)
);

comment on column GENRE.GEN_CD is
'GEN_CD';

comment on column GENRE.LABEL is
'Label';

-- ============================================================
--   Table : LANGUAGE                                        
-- ============================================================
create table LANGUAGE
(
    LAN_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_LANGUAGE primary key (LAN_CD)
);

comment on column LANGUAGE.LAN_CD is
'LAN_CD';

comment on column LANGUAGE.LABEL is
'Label';

-- ============================================================
--   Table : MOVIE                                        
-- ============================================================
create table MOVIE
(
    MOV_ID      	 NUMERIC     	not null,
    TITLE       	 VARCHAR(3000)	,
    RELEASED    	 DATE        	,
    RUNTIME     	 NUMERIC     	,
    DESCRIPTION 	 TEXT        	,
    METADAS_JSON	 VARCHAR(3000)	,
    IMDBID      	 VARCHAR(100)	,
    constraint PK_MOVIE primary key (MOV_ID)
);

comment on column MOVIE.MOV_ID is
'MOV_ID';

comment on column MOVIE.TITLE is
'TITLE';

comment on column MOVIE.RELEASED is
'Released';

comment on column MOVIE.RUNTIME is
'Runtime';

comment on column MOVIE.DESCRIPTION is
'Description';

comment on column MOVIE.METADAS_JSON is
'metadas Json';

comment on column MOVIE.IMDBID is
'imdbID';

-- ============================================================
--   Table : PEOPLE                                        
-- ============================================================
create table PEOPLE
(
    PEO_ID      	 NUMERIC     	not null,
    LAST_NAME   	 VARCHAR(50) 	,
    FIRST_NAME  	 VARCHAR(50) 	,
    PEO_NAME    	 VARCHAR(250)	,
    IMDBID      	 VARCHAR(100)	,
    TIT_CD      	 VARCHAR(100)	,
    constraint PK_PEOPLE primary key (PEO_ID)
);

comment on column PEOPLE.PEO_ID is
'PEO_ID';

comment on column PEOPLE.LAST_NAME is
'Last Name';

comment on column PEOPLE.FIRST_NAME is
'First Name';

comment on column PEOPLE.PEO_NAME is
'Peo Name';

comment on column PEOPLE.IMDBID is
'imdbID';

comment on column PEOPLE.TIT_CD is
'Title';

create index PEOPLE_TIT_CD_FK on PEOPLE (TIT_CD asc);
-- ============================================================
--   Table : PROFIL                                        
-- ============================================================
create table PROFIL
(
    PRO_ID      	 NUMERIC     	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_PROFIL primary key (PRO_ID)
);

comment on column PROFIL.PRO_ID is
'PRO_ID';

comment on column PROFIL.LABEL is
'Label';

-- ============================================================
--   Table : ROLE_MOVIE                                        
-- ============================================================
create table ROLE_MOVIE
(
    RLM_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_ROLE_MOVIE primary key (RLM_CD)
);

comment on column ROLE_MOVIE.RLM_CD is
'RLM_CD';

comment on column ROLE_MOVIE.LABEL is
'Label';

-- ============================================================
--   Table : ROLE_PEOPLE                                        
-- ============================================================
create table ROLE_PEOPLE
(
    RLP_ID      	 NUMERIC     	not null,
    ROLE_NAME   	 TEXT        	,
    PEO_ID      	 NUMERIC     	not null,
    MOV_ID      	 NUMERIC     	,
    RLM_CD      	 VARCHAR(100)	not null,
    constraint PK_ROLE_PEOPLE primary key (RLP_ID)
);

comment on column ROLE_PEOPLE.RLP_ID is
'RLP_ID';

comment on column ROLE_PEOPLE.ROLE_NAME is
'Role Name';

comment on column ROLE_PEOPLE.PEO_ID is
'People';

create index ROLE_PEOPLE_PEO_ID_FK on ROLE_PEOPLE (PEO_ID asc);
comment on column ROLE_PEOPLE.MOV_ID is
'Movie';

create index ROLE_PEOPLE_MOV_ID_FK on ROLE_PEOPLE (MOV_ID asc);
comment on column ROLE_PEOPLE.RLM_CD is
'Role movie';

create index ROLE_PEOPLE_RLM_CD_FK on ROLE_PEOPLE (RLM_CD asc);
-- ============================================================
--   Table : SECURITY_ROLE                                        
-- ============================================================
create table SECURITY_ROLE
(
    SRO_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(250)	,
    constraint PK_SECURITY_ROLE primary key (SRO_CD)
);

comment on column SECURITY_ROLE.SRO_CD is
'SRO_CD';

comment on column SECURITY_ROLE.LABEL is
'Label';

-- ============================================================
--   Table : TITLE                                        
-- ============================================================
create table TITLE
(
    TIT_CD      	 VARCHAR(100)	not null,
    LABEL       	 VARCHAR(100)	,
    constraint PK_TITLE primary key (TIT_CD)
);

comment on column TITLE.TIT_CD is
'TIT_CD';

comment on column TITLE.LABEL is
'Label';

-- ============================================================
--   Table : USER_AUTHENTIFICATION                                        
-- ============================================================
create table USER_AUTHENTIFICATION
(
    AUTH_ID     	 NUMERIC     	not null,
    LOGIN       	 VARCHAR(50) 	,
    PASSWORD    	 VARCHAR(32) 	,
    USR_ID      	 NUMERIC     	not null,
    constraint PK_USER_AUTHENTIFICATION primary key (AUTH_ID)
);

comment on column USER_AUTHENTIFICATION.AUTH_ID is
'AUTH_ID';

comment on column USER_AUTHENTIFICATION.LOGIN is
'Login';

comment on column USER_AUTHENTIFICATION.PASSWORD is
'Password';

comment on column USER_AUTHENTIFICATION.USR_ID is
'Application user';

create index USER_AUTHENTIFICATION_USR_ID_FK on USER_AUTHENTIFICATION (USR_ID asc);

alter table USER_AUTHENTIFICATION
	add constraint FK_AUTH_USR foreign key (USR_ID)
	references APPLICATION_USER (USR_ID);

create table MOV_ALS
(
	MOV_ID      	 NUMERIC     	 not null,
	ALS_ID      	 NUMERIC     	 not null,
	constraint PK_MOV_ALS primary key (MOV_ID, ALS_ID),
	constraint FK_MOV_ALS_MOVIE 
		foreign key(MOV_ID)
		references MOVIE (MOV_ID),
	constraint FK_MOV_ALS_ALIAS 
		foreign key(ALS_ID)
		references ALIAS (ALS_ID)
);

create index MOV_ALS_MOVIE_FK on MOV_ALS (MOV_ID asc);

create index MOV_ALS_ALIAS_FK on MOV_ALS (ALS_ID asc);

create table MOV_COU
(
	MOV_ID      	 NUMERIC     	 not null,
	COU_CD      	 VARCHAR(100)	 not null,
	constraint PK_MOV_COU primary key (MOV_ID, COU_CD),
	constraint FK_MOV_COU_MOVIE 
		foreign key(MOV_ID)
		references MOVIE (MOV_ID),
	constraint FK_MOV_COU_COUNTRY 
		foreign key(COU_CD)
		references COUNTRY (COU_CD)
);

create index MOV_COU_MOVIE_FK on MOV_COU (MOV_ID asc);

create index MOV_COU_COUNTRY_FK on MOV_COU (COU_CD asc);

create table MOV_FIL
(
	MOV_ID      	 NUMERIC     	 not null,
	FIL_ID      	 NUMERIC     	 not null,
	constraint PK_MOV_FIL primary key (MOV_ID, FIL_ID),
	constraint FK_MOV_FIL_MOVIE 
		foreign key(MOV_ID)
		references MOVIE (MOV_ID),
	constraint FK_MOV_FIL_FILE_INFO 
		foreign key(FIL_ID)
		references FILE_INFO (FIL_ID)
);

create index MOV_FIL_MOVIE_FK on MOV_FIL (MOV_ID asc);

create index MOV_FIL_FILE_INFO_FK on MOV_FIL (FIL_ID asc);

create table MOV_GEN
(
	MOV_ID      	 NUMERIC     	 not null,
	GEN_CD      	 VARCHAR(100)	 not null,
	constraint PK_MOV_GEN primary key (MOV_ID, GEN_CD),
	constraint FK_MOV_GEN_MOVIE 
		foreign key(MOV_ID)
		references MOVIE (MOV_ID),
	constraint FK_MOV_GEN_GENRE 
		foreign key(GEN_CD)
		references GENRE (GEN_CD)
);

create index MOV_GEN_MOVIE_FK on MOV_GEN (MOV_ID asc);

create index MOV_GEN_GENRE_FK on MOV_GEN (GEN_CD asc);

create table MOV_LAN
(
	MOV_ID      	 NUMERIC     	 not null,
	LAN_CD      	 VARCHAR(100)	 not null,
	constraint PK_MOV_LAN primary key (MOV_ID, LAN_CD),
	constraint FK_MOV_LAN_MOVIE 
		foreign key(MOV_ID)
		references MOVIE (MOV_ID),
	constraint FK_MOV_LAN_LANGUAGE 
		foreign key(LAN_CD)
		references LANGUAGE (LAN_CD)
);

create index MOV_LAN_MOVIE_FK on MOV_LAN (MOV_ID asc);

create index MOV_LAN_LANGUAGE_FK on MOV_LAN (LAN_CD asc);

create table PEO_FIL
(
	PEO_ID      	 NUMERIC     	 not null,
	FIL_ID      	 NUMERIC     	 not null,
	constraint PK_PEO_FIL primary key (PEO_ID, FIL_ID),
	constraint FK_PEO_FIL_PEOPLE 
		foreign key(PEO_ID)
		references PEOPLE (PEO_ID),
	constraint FK_PEO_FIL_FILE_INFO 
		foreign key(FIL_ID)
		references FILE_INFO (FIL_ID)
);

create index PEO_FIL_PEOPLE_FK on PEO_FIL (PEO_ID asc);

create index PEO_FIL_FILE_INFO_FK on PEO_FIL (FIL_ID asc);

alter table PEOPLE
	add constraint FK_PEO_TIT foreign key (TIT_CD)
	references TITLE (TIT_CD);

create table PRO_SRO
(
	PRO_ID      	 NUMERIC     	 not null,
	SRO_CD      	 VARCHAR(100)	 not null,
	constraint PK_PRO_SRO primary key (PRO_ID, SRO_CD),
	constraint FK_PRO_SRO_PROFIL 
		foreign key(PRO_ID)
		references PROFIL (PRO_ID),
	constraint FK_PRO_SRO_SECURITY_ROLE 
		foreign key(SRO_CD)
		references SECURITY_ROLE (SRO_CD)
);

create index PRO_SRO_PROFIL_FK on PRO_SRO (PRO_ID asc);

create index PRO_SRO_SECURITY_ROLE_FK on PRO_SRO (SRO_CD asc);

alter table ROLE_PEOPLE
	add constraint FK_RLP_MOV foreign key (MOV_ID)
	references MOVIE (MOV_ID);

alter table ROLE_PEOPLE
	add constraint FK_RLP_PEO foreign key (PEO_ID)
	references PEOPLE (PEO_ID);

alter table ROLE_PEOPLE
	add constraint FK_RLP_RLM foreign key (RLM_CD)
	references ROLE_MOVIE (RLM_CD);

alter table APPLICATION_USER
	add constraint FK_USR_PRO foreign key (PRO_ID)
	references PROFIL (PRO_ID);

