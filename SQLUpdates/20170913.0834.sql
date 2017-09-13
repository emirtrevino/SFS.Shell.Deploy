
/******************** Update Table: secBusinessObject ************************/

ALTER TABLE dbo.secBusinessObject ADD GuidReusableNoSQLGetDefault UniqueIdentifier NULL;

/* Add Foreign Key: fk_Reusable_NoSQLGetDefault */
ALTER TABLE dbo.secBusinessObject ADD CONSTRAINT fk_Reusable_NoSQLGetDefault
	FOREIGN KEY (GuidReusableNoSQLGetDefault) REFERENCES dbo.secReusableCatalogValues (GuidReusableCatalogValue)
	ON UPDATE NO ACTION ON DELETE NO ACTION;


/******************** Update Table: secBusinessObject ************************/
ALTER TABLE dbo.secBusinessObject DROP CONSTRAINT fk_Reusable_NoSQLGetDefault;
ALTER TABLE dbo.secBusinessObject DROP COLUMN GuidReusableNoSQLGetDefault;

ALTER TABLE dbo.secBusinessObject DROP CONSTRAINT fk_Reusable_StorageType;
ALTER TABLE dbo.secBusinessObject DROP COLUMN GuidReusableStorageType;


ALTER TABLE dbo.secBusinessObject ADD GuidReusableStoragePrimary UniqueIdentifier NULL;

/* Add Foreign Key: fk_ReusableStorageType */
ALTER TABLE dbo.secBusinessObject ADD CONSTRAINT fk_ReusableStorageType
	FOREIGN KEY (GuidReusableStoragePrimary) REFERENCES dbo.secReusableCatalogValues (GuidReusableCatalogValue)
	ON UPDATE NO ACTION ON DELETE NO ACTION;


/************ Remove Foreign Keys ***************/

ALTER TABLE dbo.secBusinessObject DROP CONSTRAINT fk_secBusinessObject_secNoSQLOption;


