<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>

<ul class="siteMap">
<% foreach (var node in Model.Nodes.OrderBy(p=>p.Title)) { %>
    <li><%=Html.DisplayFor(m => node)%>
    <% if (node.Children.Any(p => (p.MetaAttributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(p.MetaAttributes["visiblemenu"]) : true) == true))
       { %>
        <%=Html.DisplayFor(m => node.Children)%>
    <% } %>
    </li>
<% } %>
</ul>