
/******************** Update Table: secTimeZone ************************/

ALTER TABLE dbo.secTimeZone ADD CreatedDate DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD CreatedBy UniqueIdentifier NULL;

ALTER TABLE dbo.secTimeZone ADD UpdatedDate DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD UpdatedBy UniqueIdentifier NULL;


/******************** Add Table: dbo.secUpdate ************************/

/* Build Table Structure */
CREATE TABLE dbo.secUpdate
(
	GuidUpdate UniqueIdentifier NOT NULL,
	VersionID DECIMAL(8, 4) NOT NULL,
	VersionName VARCHAR(255) NULL,
	ScriptSQL VARCHAR(MAX) NULL,
	CreatedDate DATETIME NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secUpdate ADD CONSTRAINT pksecUpdate
	PRIMARY KEY (GuidUpdate);