<%@ Page Title="" Language="C#" Inherits="System.Web.Mvc.ViewPage<GenericPageModel>" %>
<%
    Html.RenderAction(Model.ActionName, Model.ControllerName, Model.RouteValues);
     %>