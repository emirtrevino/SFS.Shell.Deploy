<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<script>
    

    $(document).ready(function () {
        $("#BusinessObjectKey").val('<%: Request.QueryString["bo"] %>');
        $("#HtmlContent").val(encode($('#<%: Request.QueryString["htmlFilterId"] %>').html()));

        $("#Query").val(GetFilter('<%: Request.QueryString["idFilter"] %>'));

    });
</script>

