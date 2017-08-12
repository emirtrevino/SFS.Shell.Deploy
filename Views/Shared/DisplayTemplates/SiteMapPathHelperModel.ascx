<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapPathHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>

<% 
    UIModel uiModel = null;
    bool isNewModel = false;
    if (this.ViewContext.ViewData["uiModel"] != null)
    {
        uiModel = (UIModel)this.ViewContext.ViewData["uiModel"];
        isNewModel = uiModel.NewUILayoutTool;
    }
 
   if (isNewModel == false)
        { %>
<div id="breadcrumb">  
    <%} %>
<%
    string classCrumbs = "crumbs";
    /*UIModel uiModel = (UIModel)ViewData["uiModel"];
    if (uiModel.UIVersion == 2)
    {
        classCrumbs = "breadcrumb";
    }*/
     %>   
<ul id="ulbread" class="<%=classCrumbs%>">
<% 
   
    
    int level = 1;
    int index = 9;
    int topLevel = 2;
    if (Request.Url.ToString().Contains("Public/Register") || 
        Request.Url.ToString().Contains("Home") || 
        Request.Url.ToString().Contains("Contents")  ||
        Request.Url.ToString().Contains("Updates") ||
        Request.Url.ToString().Contains("Issues") ||
        (Request.Url.ToString().Contains("Blog") && !Request.Url.ToString().Contains("SFSBlog") )||
        Request.Url.ToString().Contains("Public/Login"))
    {
        topLevel = 0;
    }
    foreach (var node in Model) {
        if(level > topLevel){
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
<% if (isNewModel == false)
    { %>
</div>
<% } %>