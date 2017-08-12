<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Decimal?>" %>
<script runat="server">
    private object ModelValue {
        get {
            if (ViewData.TemplateInfo.FormattedModelValue == ViewData.ModelMetadata.Model) {
                return String.Format(System.Globalization.CultureInfo.InvariantCulture,
                                     "{0:0.00}", ViewData.ModelMetadata.Model);
            }
 
            return ViewData.TemplateInfo.FormattedModelValue;
        }
    }
</script>
<% string classExtra = "";
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    string sffAttr = "";
    if (ViewData["sff"] != null)
        sffAttr = ViewData["sff"].ToString();

    string propertyname = ViewData.ModelMetadata.PropertyName;
    if (string.IsNullOrEmpty(propertyname))
    {
        propertyname = ViewData["id"].ToString();
    }
    string classSize = "small ";
    PropertyDefinition property = null ;
    if (ViewData["currentProperty"] != null)
    {
        property = (PropertyDefinition)ViewData["currentProperty"];
        if (property.HorizontalSize != null) {
            classSize = "span12 ";
        }
    }  
        %>
<% if (ViewData["uiMask"] == null)
   { 
     if (property != null && property.IsRequired == true ) {  %>
    <input name="<%=property.PropertyName %>" id="<%=property.PropertyName %>" type="text" data-val="true" data-val-required="<%= string.Format(SFSdotNet.Framework.Web.Mvc.Resources.GlobalMessages.THE_FIELD_IS_REQUIRED, property.PropertyDisplayName ) %>" value="" />
 <%   }else{ %>
<%= Html.TextBox("", ModelValue, new { sff=sffAttr, @class = "field text " + classSize + classExtra , style = "" })%>
<%      }
    } else { %>
<input name='<%=propertyname %>' <%=sffAttr %> id='<%=propertyname %>' type='hidden' value='' />
<input name='mask<%=propertyname %>' <%=sffAttr %> id='mask<%=propertyname %>' type='text' class=' k-input k-textbox field text small <%=classExtra %>' style='' value='<%=ModelValue %>' />
<%   } %>
<% 
    Html.ValidationMessageFor(model =>model );
  
   %>
   <script>
<% if (ViewData["uiMask"] == null)
   { %>
       $("#<%: propertyname  %>").numeric();
<% }else{ %>
    $("#mask<%: propertyname  %>").mask('<%=ViewData["uiMask"] %>');
    $("#mask<%: propertyname  %>").change(function () {
            $("#<%: propertyname  %>").val($(this).mask());
    });
<%} %>
</script>