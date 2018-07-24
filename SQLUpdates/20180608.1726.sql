
/******************** Add Table: dbo.secChatGroup ************************/

/* Build Table Structure */
CREATE TABLE dbo.secChatGroup
(
	GuidChatGroup UniqueIdentifier NOT NULL,
	CreatedDate DATETIME NULL,
	UpdatedDate DATETIME NULL,
	NumPersons INTEGER NULL,
	GuidModule UniqueIdentifier NULL,
	GuidUserCompany UniqueIdentifier NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secChatGroup ADD CONSTRAINT pksecChatGroup
	PRIMARY KEY (GuidChatGroup);


/******************** Add Table: dbo.secChatGroupUser ************************/

/* Build Table Structure */
CREATE TABLE dbo.secChatGroupUser
(
	GuidChatGroupUser UniqueIdentifier NOT NULL,
	GuidUser UniqueIdentifier NULL,
	GuidChatGroup UniqueIdentifier NULL,
	CreatedDate DATETIME NULL,
	IsDeleted BIT DEFAULT 'false' NOT NULL,
	IsOwner BIT DEFAULT 'false' NOT NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secChatGroupUser ADD CONSTRAINT pksecChatGroupUser
	PRIMARY KEY (GuidChatGroupUser);


	
/* Add Foreign Key: fk_secChatGroup_secModule */
ALTER TABLE dbo.secChatGroup ADD CONSTRAINT fk_secChatGroup_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secChatGroup_secUserCompanies */
ALTER TABLE dbo.secChatGroup ADD CONSTRAINT fk_secChatGroup_secUserCompanies
	FOREIGN KEY (GuidUserCompany) REFERENCES dbo.secUserCompanies (GuidUserCompany)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secChatGroupUser_secChatGroup */
ALTER TABLE dbo.secChatGroupUser ADD CONSTRAINT fk_secChatGroupUser_secChatGroup
	FOREIGN KEY (GuidChatGroup) REFERENCES dbo.secChatGroup (GuidChatGroup)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secChatGroupUser_secUsers */
ALTER TABLE dbo.secChatGroupUser ADD CONSTRAINT fk_secChatGroupUser_secUsers
	FOREIGN KEY (GuidUser) REFERENCES dbo.secUsers (GuidUser)
	ON UPDATE NO ACTION ON DELETE NO ACTION;