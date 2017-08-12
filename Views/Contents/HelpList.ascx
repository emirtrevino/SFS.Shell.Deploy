<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<List<SFSdotNet.Framework.Web.Mvc.Models.Features.HelpTitleModel>>" %>
<div class="padding10">
<% foreach (var _new in Model)
   { %>
<span style=" font-size:110%; font-weight:bold; "><a href="<%= _new.Url %>"><%: _new.Title  %></a>

</span><br />

       
<%   } %>
</div>