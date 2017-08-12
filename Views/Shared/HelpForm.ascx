<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.Features.HelpModel>" %>
<H1><%: Model.Title %></H1>
<h3>Pre-requisitos</h3>
<div class="helpcontent"><ol>
<% foreach (var parent in Model.Parents)
   { %>
    <li><%: parent.Title %></li>     
<%   } %>
</ol>

<%= Model.Description %>
<h2>Campos</h2>
<ol>
<% foreach (var step in Model.Steps)
   { %>
    <li><%: step.Title %><br />
        <%= step.Description %>
    </li>     
<%   } %>
</ol>



<h3>Posteriores</h3>
<ol>
<% foreach (var child in Model.Childs)
   { %>
    <li><%: child.Title %></li>     
<%   } %>
</ol>
</div>
