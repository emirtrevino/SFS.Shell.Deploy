<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<script runat="server">
    private object ModelValue {
        get {
            if (ViewData.TemplateInfo.FormattedModelValue == ViewData.ModelMetadata.Model) {
                return String.Format(System.Globalization.CultureInfo.CurrentCulture,
                                     "{0:0}", ViewData.ModelMetadata.Model);
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
%>
<% Html.ValidationMessageFor(model =>model );
   string propertyname = ViewData.ModelMetadata.PropertyName;
   if (string.IsNullOrEmpty(propertyname))
   {
       propertyname = ViewData["id"].ToString();
   }
%>
<% 
    string wsize = "";
    bool multiline = false;
    if (ViewData["currentProperty"] != null)
    {
        PropertyDefinition propDef = (PropertyDefinition)ViewData["currentProperty"];
        //if (ViewData["fieldMultiLine"] != null)
        //{
        multiline = propDef.IsMultiline;
        if (propDef.HorizontalSize != null)
        {
            wsize = "span12";
        }
        //}
    }
    classExtra = classExtra + " " + wsize;
    if (ViewData["uiMask"] == null)
   { 
       %>

<%= Html.TextBox("", ModelValue, new { sff = sffAttr, @class = "field text small " + classExtra, style = "" })%>

<%} else { %>
<input name='<%=propertyname %>' <%=sffAttr %> id='<%=propertyname %>' type='hidden' value='' />
<%= Html.TextBox("mask" + propertyname, ModelValue, new { sff = sffAttr, @class = "field text small " + classExtra, style = "" })%>
   
<%   } %>

<script>
<% if (ViewData["uiMask"] == null)
   { %>
    $("#<%: propertyname  %>").ForceNumericOnly();
<% }else{ %>
    $("#mask<%: propertyname  %>").mask('<%=ViewData["uiMask"] %>');
    $("#mask<%: propertyname  %>").change(function () {
            $("#<%: propertyname  %>").val($(this).mask());
    });
<%} %>
</script>
