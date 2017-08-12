<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<% string classExtra = "";
    string wsize = "span8";
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
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    else
        ViewData.Add("class", "field text " + wsize + " " + classExtra);
    string sffAttr = "";
    if (ViewData["sff"] != null)
        sffAttr = ViewData["sff"].ToString();
    else
        ViewData.Add("sff", sffAttr);
     %>
<%= Html.TextArea("", ViewData.TemplateInfo.FormattedModelValue.ToString(),5,0, ViewData)%>