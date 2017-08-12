<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<script runat="server">
    private bool? Value {
        get {
            if (ViewData.Model == null) {
                return null;
            }
            return Convert.ToBoolean(ViewData.Model, System.Globalization.CultureInfo.InvariantCulture);
        }
    }
</script>
<% if (ViewData.ModelMetadata.IsNullableValueType) { %>
<% if (Value == null)
   { %>
<%: GlobalMessages.UNDEFINED %>
<% }else if(Value.Value){ %>
<%: GlobalMessages.YES %>
<% }else{ %>
<%: GlobalMessages.NO %>

<%  } %>
    <%--<select class="list-box tri-state" disabled="disabled">
        <option value="" <%= Value.HasValue ? "" : "selected='selected'" %>><%: GlobalMessages.NOT_DEFINED %></option>
        <option value="true" <%= Value.HasValue && Value.Value ? "selected='selected'" : "" %>><%: GlobalMessages.YES %></option>
        <option value="false" <%= Value.HasValue && !Value.Value ? "selected='selected'" : "" %>><%: GlobalMessages.NO %></option>
    </select>--%>
<% } else { %>
<% if(Value.Value){ %>
<%: GlobalMessages.YES %>
<% }else{ %>
<%: GlobalMessages.NO %>

<%  } %><% } %>