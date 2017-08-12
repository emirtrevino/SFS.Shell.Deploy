<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% Html.RenderPartial("ButtonLink", ButtonLinkModel.GetCustom(GlobalMessages.SAVE, 2, "save")); %>

<% Html.RenderPartial("ButtonLink", ButtonLinkModel.GetCustom(GlobalMessages.CANCEL, 3, "cancel", ResolveUrl("~/") + "MyAccount")); %>
