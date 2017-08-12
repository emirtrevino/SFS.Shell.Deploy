<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl`1[ [MvcSiteMapProvider.Web.Html.Models.SiteMapNodeModelList,MvcSiteMapProvider] ]" %>
<%@ Import Namespace="System.Web.Mvc.Html" %>
<%@ Import Namespace="MvcSiteMapProvider.Web.Html.Models" %>
<% int n = 1;
    if (Model.Where(p => (p.Attributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(p.Attributes["visiblemenu"]) : true) == true && (!p.Url.Contains("/EditGen") && !p.Url.Contains("/DetailsGen") && !p.Url.Contains("/CreateGen"))).Count() > 0)
   {  %>
<% foreach (var node in Model.Where(p => (p.Attributes.ContainsKey("visiblemenu") ? Convert.ToBoolean(p.Attributes["visiblemenu"]) : true) == true).OrderBy(p=>p.Title))
   {
       if (!node.Url.Contains("/EditGen") && !node.Url.Contains("/DetailsGen") && !node.Url.Contains("/CreateGen"))
       {
         

        
           
           if (n == 4)
               n = 1; 
%>
<%      if (n == 1) {  %>
<div class="row-fluid">
<%    }
      
      
       %>

    <div class="span4">
        <div class="well">
            <div class="media">
                <a class="pull-left" href="#">
  <%--  <img class="media-object" data-src="holder.js/64x64" />--%>
                    </a>

                <div class="media-body">
    <h3 class="media-heading"><%=Html.DisplayFor(m => node)%></h3>
    <% if (node.Children.Any())
       { %>
        <%=Html.DisplayFor(m => node.Children)%>
    <% } %>
                    <% if (node.Controller == "Navigation"){  %>
                     <div class="pull-rigth">
                        <a href="<%=node.Url %>" class="btn btn-primary"> <%=GlobalMessages.GO_TO_THIS_AREA %></a>
                       

                        <a href="#" class="btn"> ? </a>
                    </div>
                    <%}else{
                          StringBuilder sbAdd = new StringBuilder();
                          sbAdd.Append(VirtualPathUtility.ToAbsolute("~/"));
                          sbAdd.Append(node.Area + "/");
                          sbAdd.Append(node.Controller + "/");
                          sbAdd.Append("CreateGen");

                          if (node.RouteValues.Keys.Any(p=>p == "usemode") ) {
                              
                              
                              sbAdd.Append("?usemode=" + node.RouteValues["usemode"].ToString());
                          } 
                           
                           %>
                    <div class="pull-rigth">
                        <a href="<%=node.Url %>" class="btn btn-success"> <%=GlobalMessages.GO_TO_CATALOG   %></a>
                        <a href="<%=sbAdd.ToString() %>" class="btn btn-primary"> <%=GlobalMessages.ADD_NEW  %></a>
                        <a href="#" class="btn"> ? </a>
                    </div>
                    <% } %>

                    </div>
            </div>
        </div>
    </div>

<%      if (n == 3) {  %>
</div>
<%    }
           n++;   
    
     %>

<%        }
    } %>




<%} %>