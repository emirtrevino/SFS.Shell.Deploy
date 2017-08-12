<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% if (!string.IsNullOrEmpty(Model))
   { %>
<%= HttpUtility.HtmlDecode(Model)%>
<%} %>
        