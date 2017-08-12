<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<SFSdotNet.Framework.Web.Mvc.Models.Features.NewsTitleModel>>" %>
<div class="padding10">
<% foreach (var _new in Model)
   { %>
<span style=" font-size:110%; font-weight:bold; "><a href="<%= _new.Url %>"><%: _new.Title  %></a>
<% if (_new.IsNew)
   {%>
    <img src="<%=ResolveUrl("~/") %>Content/icons/new.png" />
<% } %>
</span><br />
<span style="font-size:80%; color: Gray;"><%: _new.DateString %></span>
<p>
<%= _new.Description %>
</p>

       
<%   } %>
<div><a href="<%=ResolveUrl("~/") %>Contents/News"></a></div>
</div>