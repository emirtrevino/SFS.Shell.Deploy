<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.MenuHelperModel,MvcSiteMapProvider] ]" %>
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
    if (TempData["currentSecondNode"] != null)
    {
        var visibility = new SFSdotNet.Framework.Security.NodeMapVisibilityProvider();
        foreach (SiteMapNode node in System.Web.SiteMap.Provider.GetChildNodes((SiteMapNode)TempData["currentSecondNode"]))
        {
            
            if (visibility.IsVisible(node, this.Context, ((MvcSiteMapProvider.MvcSiteMapNode)node).RouteValues)){
            if (((MvcSiteMapProvider.MvcSiteMapNode)node).MetaAttributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(((MvcSiteMapProvider.MvcSiteMapNode)node).MetaAttributes["visiblemenu"]) : true)
            {
                if (!node.Url.Contains("/EditGen") && !node.Url.Contains("/DetailsGen") && !node.Url.Contains("/CreateGen"))
                {
                    if (((MvcSiteMapProvider.MvcSiteMapNode)node).RouteValues.ContainsKey("id"))
                        idnode = ((MvcSiteMapProvider.MvcSiteMapNode)node).RouteValues["id"].ToString();
                    if (string.IsNullOrEmpty(idnode))
                        idnode = Guid.NewGuid().ToString();
                    if (TempData["allMenus"] != null && TempData["row3"] == null)
                    {

                        ((List<SiteMapNode>)TempData["allMenus"]).Add(node);
                        createMenu = true;
                    }
                    if (currentnode != null)
                    {
                        if (currentnode.Url.Equals(node.Url))
                        {
                            //if (level == 1)
                            //{
                            TempData["current3Node"] = node;
                            //}
                            classCurrent = "current";
                        }
                        else
                        {
                            if (currentnode.IsDescendantOf(node))
                            {
                                //if (level == 1)
                                //{
                                TempData["current3Node"] = node;
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
    <li id="m<%= idnode %>" class="<%= classCurrent %>"><a href="<%=node.Url %>"><%=Html.DisplayFor(m => node.Title)%></a>
    <% if (createMenu)
       {   %>
        <script>
            $(document).ready(function () {


                $('#m<%= idnode %> a').jeegoocontext('sm<%= idnode %>', menuTopOpsHor);
            });

        </script>
    <%} %>
    

    </li>
<%                  }
                }
            }
            level++;
        }
    }%>

