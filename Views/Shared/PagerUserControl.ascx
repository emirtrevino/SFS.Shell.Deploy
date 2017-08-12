<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<MvcContrib.Pagination.IPagination>" %>
<%@ Import Namespace="MvcContrib.UI.Pager" %>
<p/>
  <%= Html.Pager(Model)
        .First(GlobalMessages.FIRST)
        .Last(GlobalMessages.LAST)
        .Next(GlobalMessages.NEXT)
              .Previous(GlobalMessages.PREVIOUS)%>
<p/>
