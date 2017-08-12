    <%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div  class="navbar1 grid_16 ">
<ul class="row1">333333
<%=  Html.MvcSiteMap().Menu("SiteMapCustomMenu",SiteMap.RootNode, true, false, 2
         
    ) 
    
    
    %>
    </ul>
 </div>
<div class="clear"></div>
<div id="Div1" class="navbar2 grid_16 ">
<ul class="row2">aaaaaa
<%  TempData["row3"] = null;
    TempData["allMenus"] = new List<SiteMapNode>(); 
    %>
   <%=  
    Html.MvcSiteMap().Menu("SiteMapCustomMenuRow2",(SiteMapNode)TempData["currentSecondNode"],true,false,2
         
    ) 
    
    
    %>

    aaaaaaaa
    </ul>
</div>
    <% TempData["row3"] = true;  %>
  
  <%
      foreach (var node in ((List<SiteMapNode>)TempData["allMenus"]).AsParallel())
      { %><ul id="sm<%=node.Key %>" class="jeegoocontext cm_default">
 <%=Html.MvcSiteMap().Menu("SiteMapCustomMenu",node,true,false,4) %> 
    
            </ul>
<%      }
    %>

             <ul id="mchangeCompany" class="jeegoocontext cm_default">
<% if (System.Web.HttpContext.Current.Request.IsAuthenticated)
   { %>
<li><% Html.RenderPartial("ButtonLink", ButtonLinkModel.GetForPopUp(SFSdotNet.Framework.Web.Mvc.Resources.GlobalMessages.CHANGE_COMPANY, 3, "",  ResolveUrl("~/") + "SFSdotNetFrameworkSecurity/MyCompanyChange/ChangeView?popup=1&ReturnUrl=" + Request.Url.ToString(), null)); %></li>
<% } %>
</ul>