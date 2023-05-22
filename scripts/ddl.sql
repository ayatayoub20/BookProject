-- bms.book definition

-- Drop table

-- DROP TABLE bms.book;

CREATE TABLE bms.book (
	book_id serial4 NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(1000) NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial4 NOT NULL,
	store_name varchar(300) NOT NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);


--app audit
CREATE TABLE bms.app_audit(
auditId serial not null,
auditAction varchar(100) not null,
auditData json null ,
auditBy varchar(50) not null,
auditOn timestamp not null,
auditStatus varchar(50) not null,
auditError json null ,
constraint app_audit_pk primary key (auditId)
);

CREATE TABLE bms.app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	full_name varchar(500) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on timestamp NULL,
	created_by varchar(100) NULL,
    updated_on timestamp NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);

CREATE TABLE bms.app_group (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);

CREATE TABLE bms.app_role (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);

CREATE TABLE bms.user_group (
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE bms.group_role (
	group_role_id serial NOT NULL,
	group_id int4 NULL,
    role_id int4 null,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE bms.user_type (
	user_type_id serial NOT NULL,
	user_type_name varchar(500) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);