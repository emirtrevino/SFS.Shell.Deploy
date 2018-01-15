

/******************** Update Table: secCompUISetting ************************/

ALTER TABLE dbo.secCompUISetting ADD GuidModule UniqueIdentifier NULL;


/* Add Foreign Key: fk_secCompUISetting_secModule */
ALTER TABLE dbo.secCompUISetting ADD CONSTRAINT fk_secCompUISetting_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;