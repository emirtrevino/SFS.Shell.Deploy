<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% 
    if (ViewData.TemplateInfo.TemplateDepth > 1) { %>
    <%= ViewData.ModelMetadata.SimpleDisplayText %>
<% } else { %>
    <ul>

    <% 
        foreach (var prop in ViewData.ModelMetadata.Properties.Where(pm => pm.ShowForEdit && !ViewData.TemplateInfo.Visited(pm))) { %>
        <% 

            
            

           if (prop.HideSurroundingHtml) { %>
            <%= Html.Display(prop.PropertyName) %>
        <% }
           else if (prop.TemplateHint != "ChildList" && prop.TemplateHint != "HiddenInput")
           { %>
            <li>
                    <div class="editor-label">
                        <%: Html.Label(prop.PropertyName, prop.IsRequired, "desc") %>
                    </div>
            
                    <div class="editor-field">
                                
                            <%= Html.Editor(prop.PropertyName, new { @class ="field text medium" }) %>
                            <%: Html.ValidationMessageFor(p=>prop) %>
                          
                    </div>
            </li>
        <% }
           else if (prop.TemplateHint == "HiddenInput")
           {
             %>
                <%= Html.Hidden(prop.PropertyName) %>
             <%} %>
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

