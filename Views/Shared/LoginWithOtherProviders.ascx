<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%
    string HostName = Request.Url.Host;
    string port = "";
    if (Request.Url.Port != 80)
        port = string.Format(":{0}", Request.Url.Port.ToString());
    

 %>
<%--<%=Html.RpxLoginEmbedded("manjarfood", string.Format("http://{0}{1}/Account/Login", HostName, port))%>
--%>
<%
    string returnUrl = "";
    if (!string.IsNullOrEmpty(Request.QueryString["returnUrl"]))
        returnUrl ="?ReturnUrl="+ Request.QueryString["returnUrl"];
    
     %>aaa
<a class="rpxnow" onclick="return false;" href="<%: string.Format(@"https://bonavive.rpxnow.com/openid/v2/signin?token_url=http://{0}{1}/Account/Login{2}&default_provider=yahoo&default_provider=es&flags=show_provider_list", HostName, port, returnUrl) %>"><img src="<%= ResolveUrl("~/")%>Content/Login_options.png" title=""  alt="" border="0" /></a>