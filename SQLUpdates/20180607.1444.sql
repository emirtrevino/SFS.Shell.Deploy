
/* Build Table Structure */
CREATE TABLE dbo.secModuleUserCompany
(
	GuidModuleUserCompany UniqueIdentifier NOT NULL,
	GuidModule UniqueIdentifier NULL,
	GuidCompany UniqueIdentifier NULL,
	GuidUser UniqueIdentifier NULL,
	NewNotifications INTEGER NULL,
	TotalNotifications INTEGER NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secModuleUserCompany ADD CONSTRAINT pksecModuleUserCompany
	PRIMARY KEY (GuidModuleUserCompany);


	
/* Add Foreign Key: fk_secModuleUserCompany_secCompanies */
ALTER TABLE dbo.secModuleUserCompany ADD CONSTRAINT fk_secModuleUserCompany_secCompanies
	FOREIGN KEY (GuidCompany) REFERENCES dbo.secCompanies (GuidCompany)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secModuleUserCompany_secModule */
ALTER TABLE dbo.secModuleUserCompany ADD CONSTRAINT fk_secModuleUserCompany_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secModuleUserCompany_secUsers */
ALTER TABLE dbo.secModuleUserCompany ADD CONSTRAINT fk_secModuleUserCompany_secUsers
	FOREIGN KEY (GuidUser) REFERENCES dbo.secUsers (GuidUser)
	ON UPDATE NO ACTION ON DELETE NO ACTION;