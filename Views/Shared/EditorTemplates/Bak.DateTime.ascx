<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<%@ Import Namespace="SFSdotNet.Framework.Web.Mvc.Extensions" %>

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
    string controlId = this.ViewData.ModelMetadata.PropertyName;
    if (ViewData["cusprop"] != null ){
        controlId = ViewData["cusprop"].ToString();
    }
    bool includeTime = false;
    bool includeDate = true;
    bool freeMinutes = true;
    string customMinutes = "";
    string classExtra = "";
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();

    classExtra = classExtra + " " + wsize;    
    if (ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "DateTime").Count() > 0)
    {
        RouteValueDictionary props = (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "DateTime").FirstOrDefault().Value;

        if (props.FirstOrDefault(p => p.Key == "ShowTime").Value != null || ViewData["fromfilter"] != null)
        {
            includeTime = (bool)props.FirstOrDefault(p => p.Key == "ShowTime").Value;
            if (ViewData["fromfilter"] != null) {
                includeTime = true;
            }
        }

      

        if (props.FirstOrDefault(p => p.Key == "ShowDate").Value != null  )
        {
            includeDate = (bool)props.FirstOrDefault(p => p.Key == "ShowDate").Value;
        }

        if (props.FirstOrDefault(p => p.Key == "CustomMinutes").Value != null)
        {
            customMinutes = (string)props.FirstOrDefault(p => p.Key == "CustomMinutes").Value;
            if (!string.IsNullOrEmpty(customMinutes))
                freeMinutes = false;
        
        }

    }
    DateTime?  ModelValue = null;
    if (ViewData.ModelMetadata.Model != null)
    {
        if (((DateTime)ViewData.ModelMetadata.Model).Year == 0001)
        {
            ModelValue = null;
        }
        else
        {
            ModelValue = (DateTime)ViewData.ModelMetadata.Model;
        }
    }
    else
        ModelValue = null;

    if (ViewData["dataValue"] != null)
        ModelValue = (DateTime)ViewData["dataValue"];
     
    
    //if (ViewData["class"] != null)
    //    classExtra = ViewData["class"].ToString();
    string sffAttr = "";
    if (ViewData["sff"] != null)
      sffAttr = ViewData["sff"].ToString();

    Html.ValidationMessageFor(model => model);
    System.Globalization.CultureInfo current = System.Globalization.CultureInfo.CurrentCulture;
           string methodName = "datepicker";
    string idInput = controlId;
    if (includeTime)
    {
        //idInput = "div-con-" + controlId;
        methodName = "datetimepicker";

    }
    
    string dataFormat =  current.DateTimeFormat.ShortDatePattern.ToString().ToLower().Replace("m", "mm").Replace("d","dd").Replace("mmmm", "mm").Replace("dddd","dd");
    if (includeTime)
        dataFormat =  current.DateTimeFormat.ShortDatePattern.ToString().ToLower().Replace("m", "MM").Replace("d","dd").Replace("MMMM", "MM").Replace("dddd","dd");

    if (includeTime)
    {
        dataFormat = dataFormat + " hh:mm ";
    }  
        %>
 <div id="div-con-<%: controlId %>" class="input-append date" data-lang="<%=System.Threading.Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName %>" data-date="<%: ModelValue != null ? ModelValue.Value.ToShortDateString() :"" %>" data-format="<%= dataFormat %>" data-date-format="<%= dataFormat %>"  >
     <input type="text" showtime="<%=includeTime.ToString().ToLower() %>"  data-lang="<%=System.Threading.Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName %>" showdate="<%=includeDate.ToString().ToLower() %>"  data-format="<%=dataFormat %>" sff="<%=sffAttr %>" id="<%=controlId %>" name="<%=controlId %>" class="field text datetime small <%=classExtra %>" style = "text-align: left;" />
      <span class="add-on">
      <i class="icon-calendar">
      </i>
    </span>
  </div>
<% 
   

  
    //current.DateTimeFormat.ShortDatePattern
   %>
  

  <script type="text/javascript">
     
     
      $(function() {
          
          if (jQuery().<%=methodName%> == undefined) {
              $.ajax({
                  url: "<%=ResolveUrl("~/") %>Scripts/datetime/bootstrap-<%=methodName%>.js",
                  dataType: "script",
                  async: false/*,
                  success: function () {
                     <% if (ModelValue  != null && ModelValue.Value.Year > 1) { %>
                      setDate($("#<%: controlId %>"), new Date(<%: ModelValue.Value.Year %>,<%: (ModelValue.Value.Month -1 ) %>,<%: (ModelValue.Value.Day) %>), "<%=methodName%>");
                     <% } %>
                  }*/
              });
        }
              cleanDateConfig($("#<%: idInput %>"), "<%=methodName%>");
              setDateConfig($("#<%: idInput %>"), "<%=methodName%>");
              <% if (ModelValue  != null && ModelValue.Value.Year > 1) { %>
      setDate($("#<%: controlId %>"), new Date(<%: ModelValue.Value.Year %>,<%: (ModelValue.Value.Month -1 ) %>,<%: (ModelValue.Value.Day) %>, <%: (ModelValue.Value.Hour) %>, <%: (ModelValue.Value.Minute) %>, <%: (ModelValue.Value.Second) %>, <%: (ModelValue.Value.Millisecond) %>), "<%=methodName%>");
              <% } %>
          
          
  });
</script>