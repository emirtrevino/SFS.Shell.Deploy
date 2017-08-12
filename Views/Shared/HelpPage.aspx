<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<SFSdotNet.Framework.Web.Mvc.Models.Features.HelpModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Ayuda ( <%: Model.Title %> )
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Ayuda</h2>
    <% Html.RenderPartial("HelpForm", Model); %>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CustomScript" runat="server">
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="RightContent" runat="server">
</asp:Content>

<asp:Content ID="Content5" ContentPlaceHolderID="LeftContent" runat="server">
</asp:Content>
