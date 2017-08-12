<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%
    var x = ViewData;
    
     %>
<a href="mailto:<%= Html.AttributeEncode(Model) %>"><%= Html.Encode(ViewData.TemplateInfo.FormattedModelValue) %></a>