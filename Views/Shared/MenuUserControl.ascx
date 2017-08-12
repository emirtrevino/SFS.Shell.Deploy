<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<ul id="menu">
    <li>
        <%=Html.ActionLink("Home", "Index", "Home") %></li>
    <li>
        <%=Html.ActionLink("Products", "Index", "Products") %></li>
    <li>
        <%=Html.ActionLink("Help", "Help", "Home") %></li>
</ul>
