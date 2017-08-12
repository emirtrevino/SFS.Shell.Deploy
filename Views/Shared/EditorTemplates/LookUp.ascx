<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<% 
    string classExtra = "";
    PropertyDefinition propertyDef = ((PropertyDefinition)ViewData["currentProperty"]);
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    var propertyName = ViewData.ModelMetadata.PropertyName;
    string filtrablePropertyPathName = propertyName;
    bool IsImage = false;
    var propertyValue = ViewData.ModelMetadata.Model;
    var displayText = "";
    if (ViewData["DisplayText"] != null)
        displayText = ViewData["DisplayText"].ToString();
    var id = Guid.NewGuid().ToString();
    RouteValueDictionary lu =
        (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "LookUpData").Single().Value;
    if (ViewData.ModelMetadata.AdditionalValues.Count(x => x.Key == "FileData") > 0)
    {
        IsImage = true;
    }
    RouteValueDictionary fileDataAttributes = null;
        
    if (IsImage)
    {
        fileDataAttributes =
        (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "FileData").Single().Value;
    }
    string resultPropertyText = "";
    string resultPropertyValue = "";
    string controllerName = "";
    string areaName = "";
    string moduleNamespace = "";
    string actionName = "";
    string existFileField = ""; // Bandera manual que permite saber si la relación no es nula
    string identifierFileField = "";  // Campo manual o custom que permite conocer el Id del archivo en la entidad
    //SFSdotNet.Framework.Web.Mvc.Extensions.FileData propFileData =  null;
    bool isUniqueFile = false;
    if (IsImage) {
        if ((bool)fileDataAttributes["IsUniqueFile"]) {
            isUniqueFile = true;
        }
    }
    if (lu != null) {
        
        resultPropertyText = lu.FirstOrDefault(p => p.Key == "propertyText").Value.ToString();

        resultPropertyValue = lu.FirstOrDefault(p => p.Key == "propertyValue").Value.ToString();
        controllerName = lu.FirstOrDefault(p => p.Key == "controllerName").Value.ToString();
        areaName = lu.FirstOrDefault(p => p.Key == "areaName").Value.ToString();
        actionName = lu.FirstOrDefault(p => p.Key == "actionName").Value.ToString();
        moduleNamespace = lu.FirstOrDefault(p => p.Key == "moduleNamespace").Value.ToString();
        
        //if (lu.Count(p => p.Key == "fileDataInfo") == 1) {
        //    propFileData = (SFSdotNet.Framework.Web.Mvc.Extensions.FileData)lu.FirstOrDefault(p => p.Key == "fileDataInfo").Value;
        //}
    } %>

<input type="hidden" name="<%= propertyName %>" value="<%= propertyValue %>" id="<%= propertyName %>" class="autocomplete <%: classExtra  %>" propertyKeyName="<%: resultPropertyValue %>" filtrablePathName="<%: filtrablePropertyPathName %>" />

<%    if (!isUniqueFile)
    {
    
    if (ViewData["filtrablePropertyPathName"] != null)
        filtrablePropertyPathName = ViewData["filtrablePropertyPathName"].ToString();
    %>
<%   if(IsImage ) { %>
<div id="container-<%= propertyName %>" class=""><img class="display:none" id="img-<%= propertyName %>" src=""></div>

<%      }else{ %>
<input type="text" name="<%= propertyName %>Text" value="<%: displayText %>" id="<%= propertyName %>Text" style="width:90%" class="  autocomplete field text noquery <%: classExtra  %>" />
<%      } %>
<a href="javascript:void(0)" class="btn btn-default btn-link" onclick="openLU<%= propertyName %>();"><%--<i class="icon-search" style="margin-top: 10px;top: 10px;float: right;" ></i>--%> <i class="fa fa-list-alt icon-search" style="top: 10px;" ></i></a>

    


<div id="lookUp<%= propertyName %>" class="modal hide fade" style="display:none"></div>
<script type="text/javascript">
    var <%= propertyName %> = null;
<% if (IsImage ) {%>
    $(document).ready(function () {
        if ( $("#<%= propertyName %>").val().length > 0){
            showImage<%= propertyName %>();
        } 
    });

    function showImage<%= propertyName %>() {

        var url = "<%=ResolveUrl("~/")%>image.ashx?controller=<%=controllerName%>&ns=<%=moduleNamespace%>&idc=<%=resultPropertyValue%>&datac=<%=fileDataAttributes["PropertyData"].ToString() %>&typec=<%=fileDataAttributes["PropertyFileType"].ToString() %>&sizec=<%=fileDataAttributes["PropertyFileSize"].ToString()%>&filenamec=<%=fileDataAttributes["PropertyFileName"].ToString() %>&id=" + $("#<%= propertyName %>").val() + "&filename=adonis_tulum_rm&model=<%=fileDataAttributes["ModelPathType"].ToString()%>&type=undefined&w=100&h=100";
        $("#img-<%= propertyName %>").attr("src", url);
        $("#img-<%= propertyName %>").show();
    }
    <%  }else{ %>
    $(document).ready(function () {

        if (jQuery().select2 == undefined) {

            loadCSS("<%=SFSdotNet.Framework.Web.Urls.Tag("~/Scripts/select2/select2.css")%>");
            loadCSS("<%=SFSdotNet.Framework.Web.Urls.Tag("~/Scripts/select2/select2-bootstrap.css")%>");

            $.ajax({
                url: "<%=SFSdotNet.Framework.Web.Urls.Tag("~/Scripts/select2/select2.min.js")%>",
                dataType: "script",
                async: false
            });
        }
       $("#<%= propertyName %>Text").select2({ formatInputTooShort:function (input, min) { return "No message"; }, width: 'resolve', tags:true,minimumInputLength:1000,  minimumResultsForSearch: -1 });
        <% if (propertyValue != null ) {%>
        $("#<%= propertyName %>Text").select2("data",  { width: 'resolve', id: "<%:propertyValue %>", text: "<%= displayText %>"});
        <% }%>
        $("#<%= propertyName %>Text").on("select2-blur", function (e) {
            $(this).parents('.focushl').removeClass("over");
        });
        $("#<%= propertyName %>Text").on("select2-opening", function(e) { 
            e.preventDefault();   
        });
       // $("#<%= propertyName %>Text").select2("val", "<%:propertyValue %>")
        $("#<%= propertyName %>Text").change(function () {
            $("#<%= propertyName %>").val($(this).val());
        });

    });
    <% }%>
    function onCloseLK<%= propertyName %>() {
     if (<%= propertyName %> != null ){
                    if (typeof(onChanging<%= propertyName %>) != 'undefined'){
                        onChanging<%= propertyName %>(<%= propertyName %>);
                    }
                    $("#<%= propertyName %>").val(<%= propertyName %>.<%:resultPropertyValue %>);



                    <% if ( IsImage ) { %>
                        showImage<%= propertyName %>();

                    <% } else { %>
                    $("#<%= propertyName %>Text").select2("data", {width: 'resolve', id: <%= propertyName %>.<%:resultPropertyValue %>, text: <%= propertyName %>.<%:resultPropertyText %>});
                    //$("#<%= propertyName %>Text").select2("data", {id: <%= propertyName %>.<%:resultPropertyValue %>, text: <%= propertyName %>.<%:resultPropertyText %>}); });

                         //$.each(preload_data, function(){
                         //    if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
                         //        data.results.push({id: this.id, text: this.text });
                         //    }
                         //});
 

                    
                    <% }%>
                    if (typeof(onChanged<%= propertyName %>) != 'undefined'){
                        onChanged<%= propertyName %>(<%= propertyName %>);
                    }
                }
    }
    function openLU<%= propertyName %>() {
       
           // $('body').modalmanager('loading');
            $("#lookUp<%=propertyName%>").on('hidden', function () {
                

                if (<%= propertyName %> != null ){
                    if (typeof(onChanging<%= propertyName %>) != 'undefined'){
                        onChanging<%= propertyName %>(<%= propertyName %>);
                    }
                    $("#<%= propertyName %>").val(<%= propertyName %>.<%:resultPropertyValue %>);



                    <% if ( IsImage ) { %>
                        showImage<%= propertyName %>();

                    <% } else { %>
                    $("#<%= propertyName %>Text").select2("data", {width: 'resolve', id: <%= propertyName %>.<%:resultPropertyValue %>, text: <%= propertyName %>.<%:resultPropertyText %>});
                    //$("#<%= propertyName %>Text").select2("data", {id: <%= propertyName %>.<%:resultPropertyValue %>, text: <%= propertyName %>.<%:resultPropertyText %>}); });

                         //$.each(preload_data, function(){
                         //    if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
                         //        data.results.push({id: this.id, text: this.text });
                         //    }
                         //});
 

                    
                    <% }%>
                    if (typeof(onChanged<%= propertyName %>) != 'undefined'){
                        onChanged<%= propertyName %>(<%= propertyName %>);
                    }
                }
                // termina al cerrar
            });
<%
        string fkPropagate = "";
        if (propertyDef.CustomProperties.Exists(p => p.Name == "Fk")) {
            fkPropagate = propertyDef.CustomProperties.Find(p => p.Name == "Fk").Value;
        }
        string usemode = propertyDef.UseMode;
    %>            
        var url = '<%=ResolveUrl("~/") %><%: areaName %>/<%: controllerName %>/<%: actionName %>?usemode=<%=usemode%>&<%=propertyDef.UrlJsParamsPart%>&fk=<%=fkPropagate %>&fkValue=&idTab=<%=propertyName%>&popup=1&isLookUp=true&forSelect=1&propReturn=<%= propertyName %>&dialogId=lookUp<%= propertyName %>';

        openModal($("<a popupId='lookUp<%=propertyName%>' href='" + url + "'></a>"), onCloseLK<%= propertyName %>);

        <%--$.ajax({ url: '<%=ResolveUrl("~/") %><%: areaName %>/<%: controllerName %>/<%: actionName %>?usemode=<%=usemode%>&<%=propertyDef.UrlJsParamsPart%>&fk=<%=fkPropagate %>&fkValue=&idTab=<%=propertyName%>&popup=1&isLookUp=true&forSelect=1&propReturn=<%= propertyName %>&dialogId=lookUp<%= propertyName %>',
                 success: function (data) {
                    
                     $("#lookUp<%= propertyName %>").html(data);

                     $("#lookUp<%= propertyName %>").modal("show");

                     repositionModal($("#lookUp<%= propertyName %>"));
                     //$("#lookUp<%= propertyName %>").modal().css("top", "" +window.pageYOffset + "");
                },
                dataType: 'html', cache: false
            });--%>


    }

</script>
<% }else{
       ViewData["PropertyFileData"] = fileDataAttributes["PropertyData"];
       ViewData["PropertyFileName"] = fileDataAttributes["PropertyFileName"];
       ViewData["PropertyFileType"] = fileDataAttributes["PropertyFileType"];
       ViewData["PropertyFileSize"] = fileDataAttributes["PropertyFileSize"];
       ViewData["PropertyId"] = fileDataAttributes["PropertyId"];
       ViewData["ModelPathType"] = fileDataAttributes["ModelPathType"];
       ViewData["ModuleNamespace"] = moduleNamespace;
       ViewData["ControllerName"] = controllerName;
       ViewData["AreaName"] = areaName;
       ViewData["idForm"] = ViewData["idForm"];
       ViewData["propertyValue"] = propertyValue;
       if (((PropertyDefinition)ViewData["currentProperty"]).ImageSize == null)
           ((PropertyDefinition)ViewData["currentProperty"]).ImageSize = new ImageSize();
       ((PropertyDefinition)ViewData["currentProperty"]).ImageSize.H = 120;
         //ViewData["currentProperty"] = 
        Html.RenderPartial("UploadImageView", ViewData); %>

<% } %>