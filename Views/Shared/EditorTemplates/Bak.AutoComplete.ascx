<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<%   PropertyDefinition property = (PropertyDefinition)ViewData["currentProperty"];
    string classExtra = "";
    string idTab = "";
    if (!string.IsNullOrEmpty(Request.QueryString["idTab"]))
        idTab = Request.QueryString["idTab"];

    string extraParam = "";
    if (!string.IsNullOrEmpty(property.UseMode))
    {
        extraParam = "&usemode=" + property.UseMode;
    }
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    UIModel uiModel = (UIModel)ViewData["uiModel"];
    var propertyName = ViewData.ModelMetadata.PropertyName;
    if (uiModel.IsMultiColumn)
    {
        classExtra = classExtra + " span12 ";
    }
    else {
        classExtra = classExtra + " span8 ";
    
    }
    string selector = "#" + propertyName;
    
    string filtrablePropertyPathName = propertyName;
    var propertyValue =  ViewData.ModelMetadata.Model;
    var displayText = "";
    string dataTypeValue = "";
    if (ViewData.ModelMetadata.ModelType.FullName.Contains("Nullable")) {
        var nullableTypes = ViewData.ModelMetadata.ModelType.GetGenericArguments();
        if (nullableTypes.Count() == 1) {
            if (nullableTypes[0].Name.Contains("Guid")) {
                dataTypeValue = "Guid";
            }
        }
    }
    if (ViewData["DisplayText"] != null)
        displayText = ViewData["DisplayText"].ToString();
    var id = Guid.NewGuid().ToString();
    
    RouteValueDictionary result =
        (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "result").Single().Value;
    string resultPropertyText = "";
    string resultPropertyValue = "";
    if (result != null) {
        if (string.IsNullOrEmpty(property.PropertyNavigationText))
        {
            resultPropertyText = result.FirstOrDefault(p => p.Key == "propertyText").Value.ToString();
        }
        else {
            resultPropertyText = property.PropertyNavigationText;
        }
        resultPropertyValue = result.FirstOrDefault(p => p.Key == "propertyValue").Value.ToString();
        
    }
   
    RouteValueDictionary urlData = 
        (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "AutoCompleteUrlData").Single().Value;

        
    var url = SFSdotNet.Framework.Web.Mvc.Extensions.RouteHelper.GetUrl(this.ViewContext.RequestContext, urlData);
    if (!string.IsNullOrEmpty(uiModel.Id))
    {
        extraParam = extraParam  + "&ui=" + uiModel.Id;
            
    }
    if (ViewData["filtrablePropertyPathName"] != null)
        filtrablePropertyPathName = ViewData["filtrablePropertyPathName"].ToString();
    string sizeClass = "";
    if (ViewData["fromfilter"] != null) { 
    
    }

    
    bool isIntegrated = false;
    string queryForGlobals = "";
    if (property.CustomProperties.Exists(p => p.Name == "Integrable" && p.Value == "true") && (!property.CustomProperties.Exists(p => p.Name == "GlobalData" && p.Value == "CompanyUser") && !property.CustomProperties.Exists(p => p.Name == "GlobalData" && p.Value == "GlobalUser")))
    {
        isIntegrated = true;
        resultPropertyValue = "Id";
        resultPropertyText = "Title";
    }
    else { 
        // es user a través de un proxy
        if ((property.CustomProperties.Exists(p => p.Name == "GlobalData" && p.Value == "CompanyUser") || property.CustomProperties.Exists(p => p.Name == "GlobalData" && p.Value == "GlobalUser")) && property.IsNavigationProperty)
        {
            
            queryForGlobals = "&fmode=" + property.CustomProperties.FirstOrDefault(p => p.Name == "GlobalData").Value;
            resultPropertyText = "UserName";
            if (string.IsNullOrEmpty(uiModel.AreaAction) && this.ViewContext.RouteData.DataTokens["area"] != null )
            {
                uiModel.AreaAction = this.ViewContext.RouteData.DataTokens["area"].ToString();
            }
            url = url.Replace(property.PathName, "SFSdotNetFrameworkSecurity/secUsers");//.Replace(uiModel.AreaAction, "SFSdotNetFrameworkSecurity").Replace("agrProxyUsers", "secUsers").Replace("accProxyUsers", "secUsers");

            extraParam = extraParam + queryForGlobals;
            
        }
    }
    
    %>
<% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser )
   {
       //if (property.SystemProperty == SystemProperties.GlobalUser)
       //{
       //    if (!extraParam.Contains("usemode=globaluser"))
       //    {
       //        extraParam = extraParam + "&usemode=globaluser";
       //    }
       //}
       //if (property.SystemProperty == SystemProperties.CompanyUser)
       //{
       //    if (!extraParam.Contains("usemode=companyuser"))
       //    {
       //        extraParam = extraParam + "&usemode=companyuser";
       //    }
       //}

       %>     
<style>
    .select2-container .select2-choice {
        height:auto;
    }
</style>
<% } 
   
   
   %>
<script>
    $.validator.setDefaults({ ignore: [] });
</script>
<input type="hidden" data-val="true" data-val-required="<%= string.Format(SFSdotNet.Framework.Web.Mvc.Resources.GlobalMessages.THE_FIELD_IS_REQUIRED, property.PropertyDisplayName ) %>" name="<%= propertyName %>" value="<%= propertyValue %>" id="<%= propertyName %>" dataTypeValue="<%=dataTypeValue %>"  class="autocomplete  <%: classExtra  %>" propertyKeyName="<%: resultPropertyValue %>" filtrablePathName="<%: filtrablePropertyPathName %>" />
<input type="text" name="<%= propertyName %>Text" value="<%: displayText %>" id="<%= propertyName %>Text" class="autocomplete noquery    field text <%: classExtra  %>" />


<script type="text/javascript">
    function FormatSelection(item) {
        return item.FullName;
    }
    $(document).ready(function () {
        <% if (property.SystemProperty != SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
           {%>          
        $('#<%= propertyName %>Text').change(function () {
            //alert($(this).val())
            $("#<%= propertyName %>").val($(this).val());
        });
        <%    } %>
        if (jQuery().select2 == undefined) {
            loadCSS("<%=ResolveUrl("~/") %>Scripts/select2/select2.css");
            loadCSS("<%=ResolveUrl("~/") %>Scripts/select2/select2-bootstrap.css");
                $.ajax({
                    url: "<%=ResolveUrl("~/") %>Scripts/select2/select2.min.js",
                      dataType: "script",
                      async: false
                });
        }
        var <%= propertyName %>_text_search = "";
        var <%= propertyName %>_text_finded = false;
        $('#<%= propertyName %>Text').select2({
            width: 'resolve',
            placeholder: "write 2 chars",
          
            minimumInputLength: 2,
<% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser )
   {%>   
            <% if (propertyValue != null ) {%>       
            initSelection : function (element, callback) {
                var url = "<%=VirtualPathUtility.ToAbsolute("~/")%>SFSdotNetFrameworkSecurity/secUsers/GetByKeyJson?id=<%= propertyValue %>&dec=true<%=extraParam%>";
                $.ajax({
                    cache: false,
                    url: url,
                    dataType: 'json',
                    data: null,
                    success: function (data) {
                        var data= { id: data.<%: resultPropertyValue %>,  img: data.UrlImage, email: data.Email , img:"<%=VirtualPathUtility.ToAbsolute("~/")%>Content/images/no_image.jpg", text: data.<%: resultPropertyText %>, textHtml: data.<%: resultPropertyText %> };
                        callback(data);
                       
                    }
                });
                //var data = [];
                //$(element.val().split(",")).each(function () {
                var data= {id: "<%=propertyValue%>", email:"", img:"<%=VirtualPathUtility.ToAbsolute("~/")%>Content/images/no_image.jpg", text: "<%=GlobalMessages.PROCESSING_PLEASE_WAIT%>...", textHtml: "<%=GlobalMessages.PROCESSING_PLEASE_WAIT%>..."};
                //});
                callback(data);
            },
            <% } %>
<% }else{  %>
            <% if (propertyValue != null ) {%>       
            initSelection : function (element, callback) {
           
<%      if (!isIntegrated ) {%>
                var data= {id: "<%=propertyValue%>", text: "<%=displayText%>"};
                callback(data);
                <%      }else{ %>
                var data= {id: "<%=propertyValue%>", text: "<%=displayText%>"};
                callback(data);

<%      }%>
            },
            <%  } %>

            <% 

%>

<% 






} %>

            //maximumSelectionSize: 1,
            // multiple:false,
            allowClear: true, 
            <% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
               {%>        
            createSearchChoice: function(term) {
                if (<%= propertyName %>_text_finded == false){
                    var xtranew = "";
                    //if (item.id == "00000000-0000-0000-0000-000000000000"){
                    xtranew = "<span class='label label-warning'><%=GlobalMessages.NEW%></span><br/>(<%=GlobalMessages.MUST_BE_AN_EMAIL%>)";
                    //}
                    return {
                        id: "00000000-0000-0000-0000-000000000000|" + term,
                        text: term,
                        img: "<%=VirtualPathUtility.ToAbsolute("~/")%>Content/images/no_image.jpg",
                        email: "",
                        textHtml : term + " " + xtranew
                    };
                }
            },
            <% } %> 
            //tags: true,
            ajax: {
                url: "<%= url %>" + "|" + "<%=extraParam%>",
                cache:false, 
                dataType: 'json',
                data: function (term, page) {
                    <%= propertyName %>_text_search = term;
                    return {
                        q: term
                    };
                },
                //formatSelection :FormatSelection,

                results:
                     function (data, page) { 
                         if (data.length == 0){
                             <%= propertyName %>_text_finded = false;
                         }
                         return {
                             <% if (!string.IsNullOrEmpty(resultPropertyText) && !string.IsNullOrEmpty(resultPropertyValue)) { %>  
                             
                             results: $.map(data, function (item) {
                                 if (<%= propertyName %>_text_search == item.Email){
                                     <%= propertyName %>_text_finded = true;
                                 }else{
                                    <%= propertyName %>_text_finded = false;
                                 }
                                 return {
                                     isInvited: item.IsInvited,
                                     id: item.<%: resultPropertyValue %>,
                                    <% if (!isIntegrated) { %>
                                     text: item.<%: resultPropertyText %>
                                     <% }else{ %>
                                         text: getHtmlAutocompleteIntegrations(item) + "<strong>" + item.<%: resultPropertyText %> + "</strong>"
                                    <% }%>
                                     <% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
                                        {%>            
                                     ,
                                     img: item.UrlImage,
                                     email: item.Email,
                                     textHtml:  item.<%: resultPropertyText %>
                                     <% } %>
                                    
                                 };
                             })
                             //results: data
                              
                             <% } %>
                         };
                     }
            },
            formatSelection: function(term) { 
                <% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
                   {%>            
                return "<div class='select2-user-result'><table><tr><td><img width='40' height='40' style='width:40px;height:40px' src='" + term.img + "' /></td><td><strong>" + term.textHtml + "</strong><br /> " + term.email + "</td></tr></table></div>"; 
                <% }else{ %>
                return term.text; 
                <% } %>
            },
            formatResult: function(term) {
                <% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
                   {%> 
                var isinvitedHtml ="";
                if (term.isInvited == true){
                    isinvitedHtml =  "<span class='label'>Ha sido invitado pero no se ha registrado</span>";
                }
                return "<div class='select2-user-result'><table><tr><td><img width='40' height='40' style='width:40px;height:40px'  src='" + term.img + "' /></td><td><strong>" + term.textHtml + "</strong><br /> " + term.email +  isinvitedHtml + "</td></tr></table></div>"; 
                <% }else{ %>
                return "<div class='select2-user-result'>" + term.text + "</div>"; 

                <% } %>
                //return term.text;

                //if (term.isNew) {
                //    return '<span class="label label-important">New</span> ' + term.text;
                //}
                //else {
                //    return term.text;
                //}
            }
            <% if (property.SystemProperty == SystemProperties.GlobalUser || property.SystemProperty == SystemProperties.CompanyUser)
               {%>  
        }).on("change", function(e){
            //if (e.removed != null){
            var data = $("#" + $(e.currentTarget).attr("id")).select2("data");
            if (data == null ){
                $(e.currentTarget).parents(".control-group").find("#<%= propertyName %>").attr("value", "");
                $(e.currentTarget).parents(".control-group").find("#<%= propertyName %>Text").attr("value", "");
                    
            }else{
                setTimeout(function () {
                    if (data.id.contains("|")){
                        data.id = data.id.split("|")[0];
                    }
                    $(e.currentTarget).parents(".control-group").find("#<%= propertyName %>").attr("value", data.id);

                }, 1000);
                setTimeout(function () {

                    $(e.currentTarget).parents(".control-group").find("#<%= propertyName %>Text").attr("value", data.text);

                }, 1000);
                   
            }
            //}

        });

        <% } else{ %>     
    });
          
   <% } %>   
        
    });
   

</script>
