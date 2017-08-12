<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<style type="text/css">
.global-error
{
     font-size:120%;
     
    }
.global-error td
{
 vertical-align:top;    
}
</style>
 <div class="grid_10 alpha omega" id="BasicData"  >

 <div class="space">
  <div class="form col1">
  <h1><%: GlobalMessages.UNEXPECTED_ERROR %></h1>
    <div class="line"></div>
<table class="global-error" width="100%">
<tr>
    <td valign="top">
        <img src="<%=ResolveUrl("~/") %>Content/mono.png" alt="Error" />
    </td>
    
    <td valign="top">
        <span style="font-size:140%"><%: GlobalMessages.WE_ARE_EMBARASSED %></span>
        <h2><%: GlobalMessages.GLOBAL_ERROR_MESSAGE %></h2>
        <span>
        <%: GlobalMessages.GLOBAL_ERROR_DESCRIPTION  %>
        </span>
    </td>
</tr>
</table>

<div class="buttons">
<p>
    <% if (Request.UrlReferrer != null)
       {
           Html.RenderPartial("ButtonLink", ButtonLinkModel.GetCustom(GlobalMessages.RETURN_PRE_PAGE, 1, "return", Request.UrlReferrer.ToString()));
       }%>
    &nbsp;<% Html.RenderPartial("ButtonLink", ButtonLinkModel.GetCustom(GlobalMessages.GO_TO_HOME, 3, "home", ResolveUrl("~/"))); %>

</p>
</div>

</div>
</div>
</div>
