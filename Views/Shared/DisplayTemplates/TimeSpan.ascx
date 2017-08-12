<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%= ViewData.ModelMetadata.Model != null ? ((TimeSpan)ViewData.ModelMetadata.Model).ToString() : "" %>&nbsp;