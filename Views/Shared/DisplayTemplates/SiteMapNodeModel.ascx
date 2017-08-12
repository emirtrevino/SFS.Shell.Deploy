<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapNodeModel,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>

<% 
    string usemode = "";
    
    if (!string.IsNullOrEmpty(Request.QueryString["usemode"]))
    {
        if (Model.Url.Contains("?"))
        {
            usemode = "&usemode=" + Request.QueryString["usemode"];
        }
        else
        {
            usemode = "?usemode=" + Request.QueryString["usemode"];
        }    
    }
    int index = 0;
    if (ViewData["indexBrad"] !=null )
         index = (int)ViewData["indexBrad"] ;
if (Model.IsCurrentNode && Model.SourceMetadata["HtmlHelper"].ToString() != "MvcSiteMapProvider.Web.Html.MenuHelper")  { %>
    <%--=Model.Title --%>

<% } else if (Model.IsClickable) {
        var node = Model;
        SFSdotNet.Framework.Navigation.MenuItem menuItem = new SFSdotNet.Framework.Navigation.MenuItem();
        foreach (var nodeAttr in node.Attributes)
        {
            menuItem.Attributes.Add(new KeyValuePair<string, string>(nodeAttr.Key, nodeAttr.Value.ToString()));

        }
        System.Collections.Generic.KeyValuePair<string, string> bo = menuItem.Attributes.FirstOrDefault(p => p.Key == "businessObjectKey");

        if ((string.IsNullOrEmpty(bo.Key) || node.RouteValues.ContainsKey("usemode")) && (node.Attributes.ContainsKey("moduleKey") || !string.IsNullOrEmpty(node.Area)) && node.Attributes.ContainsKey("_resourceKey|Title"))
        {
            if (node.Attributes["moduleKey"] == null)
            {
                node.Attributes.Add("moduleKey", node.Area);
            }
            SFSdotNet.Framework.Globalization.TextUI textUI = new SFSdotNet.Framework.Globalization.TextUI(node.Attributes["moduleKey"].ToString(), null);

            menuItem.Title = textUI.GetTextFrom(node.Attributes, "Title");

        }
        else
        {
            var uiText = this.ViewContext.HttpContext.GetGlobalResourceObject(menuItem.Attributes.FirstOrDefault(p => p.Key == "moduleKey").Value + "." + menuItem.Attributes.FirstOrDefault(p => p.Key == "businessObjectKey").Value, "__entity__") as SFSdotNet.Framework.Globalization.UITexts;
            menuItem.Title = uiText.PluralName;
        }
        menuItem.Key = node.Key;
        string url = Model.Url;
        if (url.Contains("Navigation/Index"))
        {
            url = "";
        }
        string moduleKey = "";

        var module = SFSdotNet.Framework.Web.Mvc.Utils.GetRouteDataOrQueryParam(Request.RequestContext, "area");
        var overrideModule = SFSdotNet.Framework.Web.Mvc.Utils.GetRouteDataOrQueryParam(Request.RequestContext, "overrideModule");

        object controller = null;
        object action = null;
        object id = null;
        if (Model.RouteValues.ContainsKey("controller") && Model.RouteValues.ContainsKey("action") && Model.RouteValues.ContainsKey("id"))
        {
            controller = Model.RouteValues["controller"];
            action = Model.RouteValues["action"];
            id = Model.RouteValues["id"];

        }
        if (overrideModule != null && overrideModule != module)
        {

            var overrideModuleObj = SFSdotNet.Framework.Cache.Caching.SystemObjects.GetModuleByKey(overrideModule);
            if (overrideModuleObj != null)
            {
                if (!string.IsNullOrEmpty(module) && controller != null  && action != null && id != null  &&
                  (controller.ToString() == "Navigation" && action.ToString() == "Index" && id.ToString() == module))
                {

                    menuItem.Title = overrideModuleObj.Name;
                    url = VirtualPathUtility.ToAbsolute("~/") + overrideModule;
                }
                //menuItem.Title = overrideModuleObj.Name;

            }
            module = overrideModule;
        }
        if (!string.IsNullOrEmpty(module) && controller != null  && action != null && id != null  &&
            (controller.ToString() == "Navigation" && action.ToString() == "Index" && id.ToString() == module))
        {

            url = VirtualPathUtility.ToAbsolute("~/" + module);
        }else if (!string.IsNullOrEmpty(overrideModule) && overrideModule != "SFSdotNetFrameworkSecurity" && (controller == null && action == null && id == null ))
        {
            url = "";
        }

        if (Model.IsRootNode)
        {

%>

    <a href="<%=url %>" tabindex="-1" style="z-index:<%=index%>;"><span></span><%=(!string.IsNullOrEmpty(menuItem.Title) ? menuItem.Title : menuItem.Key)%></a>
<%      }
    else {
        if (url != "")
        {
         %>
        
    <a href="<%=url %><%=usemode %>" tabindex="-1" style="z-index:<%=index%>;"><%=(!string.IsNullOrEmpty(menuItem.Title) ? menuItem.Title : menuItem.Key)%></a>
<%        }
            else
            {
                %>

    <span style="z-index:<%=index%>;"><%=(!string.IsNullOrEmpty(menuItem.Title) ? menuItem.Title : menuItem.Key)%></span>

<%            }
        }
    } else { %>
    <%--<%=Model.Title %>--%>
<% } %>