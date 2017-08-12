<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapNodeModelList,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>
<% if (Model.Where(p => (p.Attributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(p.Attributes["visiblemenu"]) : true) == true && (!p.Url.Contains("/EditGen") && !p.Url.Contains("/DetailsGen") && !p.Url.Contains("/CreateGen"))).Count() > 0)
   { %>
<ul>
<% foreach (var node in Model.Where(p => (p.Attributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(p.Attributes["visiblemenu"]) : true) == true).OrderBy(p=>p.Title))
   {
       if (!node.Url.Contains("/EditGen") && !node.Url.Contains("/DetailsGen") && !node.Url.Contains("/CreateGen"))
       {
%>
    <li><%=Html.DisplayFor(m => node)%>
    <% if (node.Children.Any())
       { %>
        <%=Html.DisplayFor(m => node.Children)%>aaaaa
    <% } %>
    </li>
<%      }
    } %>
</ul>
<%} %>