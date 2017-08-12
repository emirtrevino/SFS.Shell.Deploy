<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<script runat="server">
    public string GetClassMenu(string menukey) {
        
        string result = "";
        switch (menukey)
        {
            case "profile": 
                if (Request.Path.ToLower().Contains("profile"))
                    result = @"class=""selected""";
                
                break;
            case "account":
                if (Request.Path.ToLower().Contains("account"))
                    result = @"class=""selected""";

                break;
            case "home":
                    if (Request.Path.ToLower().Contains("inicio"))
                        result = @"class=""selected""";
                break;
            default:
                
                break;
        }
     
        
           
        
        

        
        return result;
    }
</script>
 <ul id="menu" > 
                    <li <%=GetClassMenu("home") %>><a href="<%= ResolveUrl("~/")%>"><%: GlobalMessages.HOME %></a> </li>
                    <li <%=GetClassMenu("profile") %>><a href="<%= ResolveUrl("~/")%>MyProfile"><%: GlobalMessages.PROFILE %></a> </li>
<% if (SFSdotNet.Framework.My.Context.CurrentContext.User != null)
   { %>
    <% if (SFSdotNet.Framework.My.Context.CurrentContext.User.secRoles.FirstOrDefault(p => p.RoleId.ToString() == "") != null)
       { %>

    <% } %>
<%} %>
<%      SFSdotNet.Framework.My.Context.CurrentContext.Permission.ModuleKey = "SFSdotNet.Framework.";
        if (SFSdotNet.Framework.My.Context.CurrentContext.Permission.IsAllowed("superadmin", "superadmin"))
        {
   %>   
                    <li <%=GetClassMenu("admin") %>><a href="<%=ResolveUrl("~/") %>Admin"><%: GlobalMessages.ADMIN%></a> </li>
<%      } %>                    
                    <li <%=GetClassMenu("account") %>><a href="<%= ResolveUrl("~/")%>MyAccount"><%: GlobalMessages.ACCOUNT %></a> </li>
                     <li <%=GetClassMenu("myservices") %>><a href="#"><%: GlobalMessages.MY_SERVICES %></a> </li>
                </ul>