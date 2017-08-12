<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% Html.RenderPartial("ButtonLink", ButtonLinkModel.GetCustom(GlobalMessages.MODIFY, 2, "edit", ResolveUrl("~/") + "MyAccount/MyAccountEditGen")); %>
