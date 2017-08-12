<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.MenuHelperModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>


<% 
    var currentnode = System.Web.SiteMap.CurrentNode;
    
    //string currentKey = "";
    //if (currentnode != null) {
       
    //}
    string classCurrent = "n";
    System.Web.SiteMapNode proxyNode = null ;
    foreach (var node in Model.Nodes.Where(p=>p.IsClickable ))
   {
       
       if (node.MetaAttributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(node.MetaAttributes["visiblemenu"]) : true)
       {
           if (!node.Url.Contains("/EditGen") && !node.Url.Contains("/DetailsGen") && !node.Url.Contains("/CreateGen"))
           {
               proxyNode = System.Web.SiteMap.RootNode.GetAllNodes().OfType<SiteMapNode>().Where(p=>p.Url == node.Url).FirstOrDefault();
               if (proxyNode.IsAccessibleToUser(this.Context)){
               if (currentnode.Url.Equals(proxyNode.Url))
               {
                   classCurrent = "current";
               }
               else
               {
                   
                   if (currentnode.IsDescendantOf(proxyNode))
                   {
                       classCurrent = "current";
                   }
                   else
                   {
                       classCurrent = "n";
                   }
               }      
           %>
    <li class="<%= classCurrent %>"><%=Html.DisplayFor(m => node)%>
    <%    %>
        <%--<%=Html.DisplayFor(m => node.Children)%>--%>
        
    <%      
        %>

    </li>
<%              }
            }
        }
   }%>

