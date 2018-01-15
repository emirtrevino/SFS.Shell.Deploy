ALTER TABLE dbo.secModule ADD GuidCompUISetting UniqueIdentifier NULL;
ALTER TABLE dbo.secModule ADD CONSTRAINT fk_secModule_secCompUISetting
	FOREIGN KEY (GuidCompUISetting) REFERENCES dbo.secCompUISetting (GuidCompUISetting)
	ON UPDATE NO ACTION ON DELETE NO ACTION;