<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.Features.HelpModel>" %>
<div id="tooltip<%:  Model.PropertyName %>" class="<%=Model.Id %>">
    <%= Model.Description  %>

<div class="pull-right">
<% 
    if (string.IsNullOrEmpty(Model.PropertyName )) {
        if (!Model.GuidContent.ToString().Replace("-", "").Contains("00000000000"))
        {%>

    <div class="viewmore "><a target="_blank" href="<%= Model.ContentUrl %>">Ver más</a></div>
<%      }
    } %>
    <% 
          
    if (SFSdotNet.Framework.My.Context.CurrentContext.User != null)
   {
       if (SFSdotNet.Framework.My.Context.CurrentContext.User.secRoles.FirstOrDefault(p => p.RoleName.ToLower() == "superadmin") != null)
       {
           if (Model.GuidContent.ToString().Replace("-", "").Contains("00000000000"))
           { %>
            <a class="" style="text-align:right" href="<%= ResolveUrl("~/")  %>SFSdotNetFrameworkSecurity/secContents/CreateGen?um=<%=Model.UseMode %>&usemode=autowiki&moduleKey=<%: Model.ModuleKey %>&objectKey=<%: Model.ObjectKey %>&propertyName=<%: Model.PropertyName %>&title=<%= HttpUtility.UrlEncode( Model.Title) %>&o=<%: Model.Order.ToString() %>&actionKey=<%: Model.ActionKey %>&contentType=help" target="_blank" >Create</a>
<%          }
           else
           { %>     

           <a class="" style="text-align:right" href="<%= ResolveUrl("~/")  %>SFSdotNetFrameworkSecurity/secContents/EditGen/<%: Model.SafeKey %>?um=<%=Model.UseMode %>&moduleKey=<%: Model.ModuleKey %>&usemode=autowiki&objectKey=<%: Model.ObjectKey %>&propertyName=<%: Model.PropertyName %>&title=<%= HttpUtility.UrlEncode( Model.Title) %>&o=<%: Model.Order.ToString() %>&actionKey=<%: Model.ActionKey %>&contentType=help" target="_blank" ><%=GlobalMessages.EDIT %></a>

<%          }
        }
    } %>

</div>
</div>
