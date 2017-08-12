
/******************** Update Table: secUpdate ************************/

ALTER TABLE dbo.secUpdate ADD GuidModule UniqueIdentifier NULL;

/* Add Foreign Key: fk_secUpdate_secModule */
ALTER TABLE dbo.secUpdate ADD CONSTRAINT fk_secUpdate_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;