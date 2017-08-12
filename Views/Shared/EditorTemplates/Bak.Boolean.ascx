<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<script runat="server">
    private List<SelectListItem> TriStateValues {
        get {
            return new List<SelectListItem> {
                new SelectListItem { Text ="No definido", Value = String.Empty, Selected = !Value.HasValue },
                new SelectListItem { Text = "SI", Value = "true", Selected = Value.HasValue && Value.Value },
                new SelectListItem { Text = "NO", Value = "false", Selected = Value.HasValue && !Value.Value },
            };
        }
    }
    private bool? Value {
        get {
            if (ViewData.Model == null) {
                return null;
            }
            return Convert.ToBoolean(ViewData.Model, System.Globalization.CultureInfo.InvariantCulture);
        }
    }
</script>
<% string classExtra = "";
   
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    string sffAttr = "";
    if (ViewData["sff"] != null)
        sffAttr = ViewData["sff"].ToString();
    if (ViewData["currentProperty"] != null)
    {
        PropertyDefinition propDef = (PropertyDefinition)ViewData["currentProperty"];
        //if (ViewData["fieldMultiLine"] != null)
        //{
      
        if (propDef.HorizontalSize != null)
        {
           classExtra = classExtra + " span12 ";
        }
        //}
    }     
%>
<% if (ViewData.ModelMetadata.IsNullableValueType) { %>
    <%= Html.DropDownList("", TriStateValues, new { sff = sffAttr, @class = "list-box tri-state " + classExtra })%>
<% } else { %>

    <%=Html.CheckBox("", Value ?? false, new { @class = "check-box" }) %>

<%-- <input type="checkbox" class="check-box"  id="<%=ViewData.ModelMetadata.PropertyName%>" name="<%=ViewData.ModelMetadata.PropertyName%>" value="<%=ViewData.Model.ToString().ToLower() %>" />--%>

    <script>
        $(document).ready(function () {
            $('#<%=ViewData.ModelMetadata.PropertyName%>').wrap('<div class="switch" data-on-label="<%=GlobalMessages.YES %>" data-off-label="<%=GlobalMessages.NO %>" />').parent().bootstrapSwitch();
        });
       
       // $('.switch').bootstrapSwitch('toggleActivation');
    </script>
<% } %>