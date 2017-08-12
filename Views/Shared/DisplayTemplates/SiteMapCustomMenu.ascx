﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.MenuHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>
<%if (TempData["allMenus"] != null && TempData["row3"] == null)
  { %>
<script  type="text/javascript">
    var menuTopOpsHor = {
        openBelowContext: true,
        event: 'mouseover',
        ignoreHeightOverflow: true,
        submenuLeftOffset: -1,
        startTopOffset: -1,
        fadeIn: 0,
        autoHide: true

    };

</script>
<%} 
    var currentnode = System.Web.SiteMap.CurrentNode;
    
    //string currentKey = "";
    //if (currentnode != null) {
       
    //}
    string classCurrent = "";
    System.Web.SiteMapNode proxyNode = null ;
    int level = 1;
    bool createMenu = false;
    System.Web.SiteMapNode pnode = null;
    string idnode = "";
    foreach (var node in Model.Nodes.Where(p=>p.IsClickable ))
   {
       if (node.MetaAttributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(node.MetaAttributes["visiblemenu"]) : true)
       {
           if (!node.Url.Contains("/EditGen") && !node.Url.Contains("/DetailsGen") && !node.Url.Contains("/CreateGen"))
           {
               
               proxyNode = System.Web.SiteMap.RootNode.GetAllNodes().OfType<SiteMapNode>().Where(p=>p.Url == node.Url).FirstOrDefault();
               
               if (TempData["allMenus"] != null && TempData["row3"] == null )
               {
                   if (node.RouteValues.ContainsKey("id"))
                   {
                       idnode = node.RouteValues["id"].ToString();
                       pnode = System.Web.SiteMap.RootNode.GetAllNodes().OfType<SiteMapNode>().Where(p => p.Key == idnode).FirstOrDefault();
                        
                   }
                   else {
                       pnode = null;
                       idnode = Guid.NewGuid().ToString();
                   }
                   if (pnode != null )
                    ((List<SiteMapNode>)TempData["allMenus"]).Add(pnode);
                   createMenu = true;
               }
               if (currentnode != null)
               {
                   if (currentnode.Url.Equals(proxyNode.Url))
                   {
                       //if (level == 1)
                       //{
                       TempData["currentSecondNode"] = proxyNode;
                       //}
                       classCurrent = "current";
                   }
                   else
                   {
                       if (currentnode.IsDescendantOf(proxyNode))
                       {
                           //if (level == 1)
                           //{
                           TempData["currentSecondNode"] = proxyNode;
                           //}
                           classCurrent = "current";
                       }
                       else
                       {
                           classCurrent = "";
                       }
                   }
               }      
           %>
    <li id="m<%= idnode %>" class="<%= classCurrent %>"><%=Html.DisplayFor(m => node)%>
    <% if (createMenu)
       {   %>
        <script>
            $(document).ready(function () {


                $('#m<%= idnode %> a').jeegoocontext('sm<%= idnode %>', menuTopOpsHor);
            });

        </script>
    <%} %>
        <%=Html.DisplayFor(m => node.Children)%>
    <%      
        %>

    </li>
<%      }
    }
       level++;
   }%>

