<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.MenuHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>

<ul>
<% var currentnode = System.Web.SiteMap.CurrentNode;
   string classCurrent = "";
   System.Web.SiteMapNode proxyNode = null;
    foreach (var node in Model.Nodes) {
        
        %>
    <li class="<%=classCurrent %>"><%=Html.DisplayFor(m => node)%>
    <% 
        if (node.Children.Any()) { %>
        <%=Html.DisplayFor(m => node.Children)%>
    <% } %>
    </li>
<% } %>
</ul>