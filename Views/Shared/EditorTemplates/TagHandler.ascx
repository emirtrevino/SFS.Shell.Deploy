<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<% 
    var entityName = ViewData.ModelMetadata.AdditionalValues.SingleOrDefault(m => m.Key.Equals("EntityName")).Value.ToString();
    var idPropertyName = ViewData.ModelMetadata.AdditionalValues.SingleOrDefault(m => m.Key.Equals("IdPropertyName")).Value.ToString();
    %>
<ul id="Entity_TagHandler">
</ul>
<script language="javascript" type="text/jscript">
    $(document).ready(function () {
        $("#Entity_TagHandler").tagHandler({
            getData: {
                EntityName: '<%:entityName %>',
                IdEntity: $('#<%:idPropertyName %>').attr('value')
            },
            getURL: '<%:ResolveUrl("~/")%>Tags/GetTags',
            updateData: {
                EntityName: '<%:entityName %>',
                IdEntity: $('#<%:idPropertyName %>').attr('value')
            },
            updateURL: '<%:ResolveUrl("~/")%>Tags/UpdateTags',
            autocomplete: true,
            autoUpdate: false,
            allowEdit:<%:SFSdotNet.Framework.My.Context.CurrentContext.Permission.IsAllowed("superadmin", "superadmin")?"true":"false"%>
        });
    });
</script>
