<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<script type="text/javascript">
	//<![CDATA[

    $(function () {
        var config = {
        enterMode: CKEDITOR.ENTER_BR,       
        htmlEncodeOutput: true, 
        toolbar:
		[
			['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink'],
			['UIColor'], ['Maximize']
		]
         };

        // Initialize the editor.
        // Callback function can be passed and executed after full instance creation.
        $('#<%: this.ViewData.ModelMetadata.PropertyName %>').ckeditor(config);
    });
 
	//]]>
	</script>
<% 
    string content = "";
    if (ViewData.Model != null)
        content = ViewData.Model;
        %>
<textarea id="<%=ViewData.ModelMetadata.PropertyName %>", rows='0' cols='0' name="<%=ViewData.ModelMetadata.PropertyName %>" class="field text medium"><%= content %></textarea>
<%
    //Html.TextArea("", ViewData.TemplateInfo.FormattedModelValue.ToString(), 0, 0, new { @class = "field text medium" })%>
        