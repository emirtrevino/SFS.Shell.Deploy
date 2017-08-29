
/******************** Update Table: secBusinessObject ************************/

ALTER TABLE dbo.secBusinessObject ADD GuidNoSQLOption UniqueIdentifier NULL;

ALTER TABLE dbo.secBusinessObject ADD GuidReusableStorageType UniqueIdentifier NULL;

ALTER TABLE dbo.secBusinessObject ADD SQLRows BIGINT NULL;

ALTER TABLE dbo.secBusinessObject ADD NoSQLRows BIGINT NULL;

ALTER TABLE dbo.secBusinessObject ADD HideForPermissions BIT NULL;


/* Build Table Structure */
CREATE TABLE dbo.secNoSQLLog
(
	GuidNoSQLLog UniqueIdentifier NOT NULL,
	GuidBusinessObject UniqueIdentifier NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secNoSQLLog ADD CONSTRAINT pksecNoSQLLog
	PRIMARY KEY (GuidNoSQLLog);


/******************** Add Table: dbo.secNoSQLOption ************************/

/* Build Table Structure */
CREATE TABLE dbo.secNoSQLOption
(
	GuidNoSQLOption UniqueIdentifier NOT NULL,
	Name VARCHAR(255) NOT NULL,
	NameKey VARCHAR(100) NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secNoSQLOption ADD CONSTRAINT pksecNoSQLOption
	PRIMARY KEY (GuidNoSQLOption);



	
/* Add Foreign Key: fk_Reusable_StorageType */
ALTER TABLE dbo.secBusinessObject ADD CONSTRAINT fk_Reusable_StorageType
	FOREIGN KEY (GuidReusableStorageType) REFERENCES dbo.secReusableCatalogValues (GuidReusableCatalogValue)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secBusinessObject_secNoSQLOption */
ALTER TABLE dbo.secBusinessObject ADD CONSTRAINT fk_secBusinessObject_secNoSQLOption
	FOREIGN KEY (GuidNoSQLOption) REFERENCES dbo.secNoSQLOption (GuidNoSQLOption)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secNoSQLLog_secBusinessObject */
ALTER TABLE dbo.secNoSQLLog ADD CONSTRAINT fk_secNoSQLLog_secBusinessObject
	FOREIGN KEY (GuidBusinessObject) REFERENCES dbo.secBusinessObject (GuidBusinessObject)
	ON UPDATE NO ACTION ON DELETE NO ACTION;