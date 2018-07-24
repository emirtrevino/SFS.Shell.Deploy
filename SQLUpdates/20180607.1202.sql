
ALTER TABLE dbo.secModuleUser ADD NewNotifications INTEGER NULL;

ALTER TABLE dbo.secModuleUser ADD TotalNotifications INTEGER NULL;

ALTER TABLE dbo.secUserCompanies ADD NewNotifications INTEGER NULL;

ALTER TABLE dbo.secUserCompanies ADD TotalNotifications INTEGER NULL;



/******************** Update Table: secNotification ************************/

ALTER TABLE dbo.secNotification ADD UriActionIOS VARCHAR(255) NULL;

ALTER TABLE dbo.secNotification ADD UriActionAndroid VARCHAR(255) NULL;

ALTER TABLE dbo.secNotification ADD UriActionWeb VARCHAR(255) NULL;