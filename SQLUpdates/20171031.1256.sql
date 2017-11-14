
/******************** Update Table: secTimeZone ************************/

ALTER TABLE dbo.secTimeZone ADD CreatedDate DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD CreatedBy UniqueIdentifier NULL;

ALTER TABLE dbo.secTimeZone ADD UpdatedDate DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD UpdatedBy UniqueIdentifier NULL;

ALTER TABLE dbo.secTimeZone ADD UseDST BIT NULL;

ALTER TABLE dbo.secTimeZone ADD StartDST DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD EndDST DATETIME NULL;

ALTER TABLE dbo.secTimeZone ADD HrsOffsetDST INTEGER NULL;

ALTER TABLE dbo.secTimeZone ADD HrsOffset INTEGER NULL;

