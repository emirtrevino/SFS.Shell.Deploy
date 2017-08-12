<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<% 
    string longDesc = "";
    if (ViewData.ModelMetadata.Model != null)
    {
        longDesc = ((DateTime)ViewData.ModelMetadata.Model).ToLongDateString();
    }
    
     %>
<span title="<%=longDesc %>"><%= ViewData.ModelMetadata.Model != null ? ((DateTime)ViewData.ModelMetadata.Model).ToShortDateString() : "" %></span>&nbsp;