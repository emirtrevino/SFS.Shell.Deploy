<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapPathHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>
<div id="breadcrumb">  
   
<ul class="crumbs">
<% 
   
    
    int level = 1;
    int index = 9;
    foreach (var node in Model) {
        if(level > 2){
            ViewData["indexBrad"] = index;
%>      <li <%=(index == 9 ? "class='first'" : "") %>>
    <%=Html.DisplayFor(m => node)%>
    <% 
if (node != Model.Last()) { %>
      <%-- <span class="divider">/</span>--%>
<% }     %>

        </li>
<%          index--;  
        } level++; 
        %>
<% } %>

    </ul>

</div>