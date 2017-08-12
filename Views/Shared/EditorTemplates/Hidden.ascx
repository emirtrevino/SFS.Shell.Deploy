<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<% string classExtra = "";

   string wsize = "span8";
   bool multiline = false;
   PropertyDefinition property = null;
   if (ViewData["currentProperty"] != null)
   {
        property = (PropertyDefinition)ViewData["currentProperty"];
       //if (ViewData["fieldMultiLine"] != null)
       //{
       multiline = property.IsMultiline;
       if (property.HorizontalSize != null)
       {
           wsize = "span12";
       }
       //}
   }
   if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
   else
       ViewData.Add("class", "field text " + wsize + " " + classExtra);     
    string sffAttr = "";
    if (ViewData["sff"] != null)
        sffAttr = ViewData["sff"].ToString();
    else
        ViewData.Add("sff",  sffAttr);


    string requiredAttributes = "";
    if ( property != null && property.IsRequired == true ) {
        requiredAttributes = "data-val=\"true\" data-val-required=\"" + string.Format(SFSdotNet.Framework.Web.Mvc.Resources.GlobalMessages.THE_FIELD_IS_REQUIRED, property.PropertyDisplayName ) + "\"";
    }   
            
if (!multiline ){
   if (property != null ) {  %>
    <input name="<%=property.PropertyName %>" sff="<%: ViewData["sff"] %>" class="<%: ViewData["class"]  %>" id="<%=property.PropertyName %>" <%=requiredAttributes %> type="text"  value="" />
 <%   }else{ %>
<%= Html.TextBox("", ViewData.TemplateInfo.FormattedModelValue, ViewData)%>
<%      }
}else{
   if (property != null && property.IsRequired == true ) {  %>
    <textarea name="<%=property.PropertyName %>" sff="<%: ViewData["sff"] %>" class="<%: ViewData["class"]  %>" id="<%=property.PropertyName %>" rows="5" cols="0"  <%=requiredAttributes %>  ></textarea>
       
<%   }else{ %>
<%= Html.TextArea("", ViewData.TemplateInfo.FormattedModelValue.ToString(),5,0, ViewData)%>
    
<% }    } %>