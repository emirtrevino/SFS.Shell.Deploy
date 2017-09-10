
/******************** Update Table: secBusinessObject ************************/

ALTER TABLE dbo.secBusinessObject ADD CosmosDBRows BIGINT NULL;

ALTER TABLE dbo.secBusinessObject ADD TableStorageRows BIGINT NULL;

ALTER TABLE dbo.secBusinessObject ADD SQLEnabled BIT NULL;

ALTER TABLE dbo.secBusinessObject ADD CosmosDBEnabled BIT NULL;

ALTER TABLE dbo.secBusinessObject ADD TableStorageEnabled BIT NULL;
