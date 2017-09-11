

/******************** Add Table: dbo.coreHistoryChange ************************/



/******************** Add Table: dbo.secNoSQLMovement ************************/

/* Build Table Structure */
CREATE TABLE dbo.secNoSQLMovement
(
	GuidNoSQLMovement UniqueIdentifier NOT NULL,
	GuidBusinessObject UniqueIdentifier NULL,
	ItemsForBulk INTEGER NULL,
	PlaninglForMove INTEGER NULL,
	TotalMove INTEGER NULL,
	UpdatedDate DATETIME NULL,
	CreatedDate DATETIME NULL,
	GuidReusableStorageSource UniqueIdentifier NULL,
	GuidReusableStorageTarget UniqueIdentifier NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secNoSQLMovement ADD CONSTRAINT pksecNoSQLMovement
	PRIMARY KEY (GuidNoSQLMovement);



/******************** Update Table: secNoSQLLog ************************/

ALTER TABLE dbo.secNoSQLLog ADD GuidNoSQLMovement UniqueIdentifier NULL;

ALTER TABLE dbo.secNoSQLLog ADD Success BIT NULL;

ALTER TABLE dbo.secNoSQLLog ADD Message VARCHAR(MAX) NULL;


/* Add Foreign Key: fk_secNoSQLLog_secNoSQLMovement */
ALTER TABLE dbo.secNoSQLLog ADD CONSTRAINT fk_secNoSQLLog_secNoSQLMovement
	FOREIGN KEY (GuidNoSQLMovement) REFERENCES dbo.secNoSQLMovement (GuidNoSQLMovement)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secNoSQLMovement_secBusinessObject */
ALTER TABLE dbo.secNoSQLMovement ADD CONSTRAINT fk_secNoSQLMovement_secBusinessObject
	FOREIGN KEY (GuidBusinessObject) REFERENCES dbo.secBusinessObject (GuidBusinessObject)
	ON UPDATE NO ACTION ON DELETE NO ACTION;