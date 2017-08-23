
/******************** Update Table: secModuleSettings ************************/

ALTER TABLE dbo.secModuleSettings ADD ValueInt INTEGER NULL;

ALTER TABLE dbo.secModuleSettings ADD ValueBoolean BIT NULL;

ALTER TABLE dbo.secModuleSettings ADD ValueDecimal DECIMAL(10, 2) NULL;

ALTER TABLE dbo.secModuleSettings ADD ValueString VARCHAR(255) NULL;