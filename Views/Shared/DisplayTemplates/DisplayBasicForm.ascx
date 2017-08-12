<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<% 
    if (Model == null) { 
       %>
    <%= ViewData.ModelMetadata.NullDisplayText %>
<% } else if (ViewData.TemplateInfo.TemplateDepth > 1) { %>
    <%= ViewData.ModelMetadata.SimpleDisplayText %>
<% } else { %>
    <ul>

    <% foreach (var prop in ViewData.ModelMetadata.Properties.Where(pm => pm.ShowForDisplay && !ViewData.TemplateInfo.Visited(pm))) { %>
        <% if (prop.HideSurroundingHtml) { %>
            <%= Html.Display(prop.PropertyName) %>
        <% } else { %>
            <li>
                    <div class="display-label">
                        <%: Html.Label(prop.PropertyName) %> 
                    </div>
            
                    <div class="display-field">
                        <%= Html.Display(prop.PropertyName)%>
                    </div>
            </li>
        <% } %>
    <% } %>

</ul>
<% } %>        
<%--                <li>
                <div class="desc">
                    <%: Html.LabelFor(m => m.Email, "desc")%>
                </div>
                <div class="editor-field">

                    <%: Html.TextBoxFor(m => m.Email, new {  @class = "field text large" })%>
                    <%: Html.ValidationMessageFor(m => m.Email)%>
                    <%: Html.DescriptionShort(AccountMessages.REGISTER_EMAIL_DESCRIPTION) %>

                    
                </div>
                </li>
 

--%>           

