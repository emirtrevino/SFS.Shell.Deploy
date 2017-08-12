<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.DynamicUI>" %>

<% bool fromPegaso = false;
    if (ViewData["fromPegaso"] != null){
        fromPegaso = (bool)ViewData["fromPegaso"];
    }
    if (fromPegaso){
 %>
 
<% } %>
<%
    string id = Model.Id;
    bool addRoot = false;
    if (ViewData["addRoot"] != null)
        addRoot = (bool)ViewData["addRoot"];
    
    string jsonData = "{}";
    if (ViewData["jsonData"] != null) {
        jsonData = (string)ViewData["jsonData"];
        
    }
    bool isNew = true;
    if (ViewData["isNew"] != null)
        isNew = (bool)ViewData["isNew"];
        
     %>
<%="<script>"%>
function SetIndexesToList(id){
    var index = 0;

    $("#List" + id).find(".linktoedit").each(function() {     
        $(this).attr("onclick", "showDetails" + id + "("  + index.toString() + ");")
        index++;
    }); 
    index = 0;
     $("#List" + id).find(".linktodelete").each(function() {     
        $(this).attr("onclick", "delete" + id + "("  + index.toString() + ");")
        index++;
    }); 

}
function ChangeUndefidiesToValues(id, data){
    var index = 0;
  
    $("#List" + id).find("td.cont").each(function() { 
            
        $(this).html(data[index]);
        index++;
    }); 
}

   <% Guid guidForm = Guid.NewGuid(); 
    var test = jsonData;

   %>
   
    if (typeof jsonXmlObject == 'undefined'){
        var tempObject<%= id %> = jQuery.parseJSON('<%= jsonData%>');
    }else{
        var tempObject<%= id %> = jsonXmlObject;
    }
     var jsonObject  = jQuery.parseJSON('{}');
     var jsonConfig  = jQuery.parseJSON('{}');
    var errorValidationXml = "";
  <%--  function validateXml(){
                var result = false;
                var obj = JSON.stringify(jsonObject);
                /*var clickelement = $(getClickElement());
                clickelement.attr("disabled", true);*/

                
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: "",
                    data: obj,
                    /*error: onError,*/
                    contentType: "application/json",
                    cache: false,
                    success: function (data) {
                            
                       if(data == "ok"){
                            result= true;
                            errorValidationXml = "";
                       }else{
                            result = false;
                            errorValidationXml = data;
                       }
                    },
                    dataType: 'json'
                });
                return result;
    }--%>
    function setData<%:id%>() {

<% foreach(var field in Model.ListColumns) { %>
                      //  $("#<%: field.Id %>").val(item.<%=field.Name %>);
<% } %>
    }
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function checkVersion()
{
  var msg = "You're not using Internet Explorer.";
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver >= 8.0 ) 
      msg = "You're using a recent copy of Internet Explorer."
    else{
        msg = "Este componente requiere de Internet Explorer 8 o posterior.\n";
        if (document.documentMode != null )
            msg += "Su explorador esta corriendo en modo: " + document.documentMode;
        
        alert( msg );
      }
  }
  
}
      
    $(document).ready(
        function () {
        
        checkVersion();
<% if (jsonData == "{}")
   { %>
        createProperties<%=id %>();
<% } %>            
             EventManager.Subscribe('onSetData<%:id%>', setData<%:id%>);
            
         var $form = $('#form_<%= guidForm.ToString() %>'); 
           //Unbind existing validation 
           //$form.unbind(); 
           $form.removeData('unobtrusiveValidation'); 
           $form.removeData('validator'); 
			$.validator.unobtrusive.parseDynamicContent($form);

        //jQuery.validator.unobtrusive.parse($("#form_<%= guidForm.ToString() %>"));
        $("#savebtn<%=id %>").click(function(event){
              event.preventDefault();
                // Target Form 
                    <%
            //string pre = "";
            //string pos = "";
            //if((bool)ViewData["addRoot"] == true){
            //    pre =@"{""?xml"":{ ""@version"": ""1.0"",""@standalone"": ""no""}, ""root"": ";
            //    pos ="}";
            //}
         %>
            
           var $form = $('#form_<%= guidForm.ToString() %>'); 
           //Unbind existing validation 
           //$form.unbind(); 
           $form.removeData('unobtrusiveValidation'); 
           $form.removeData('validator'); 
           $.validator.unobtrusive.parseDynamicContent($form);
           //$form.validate();
          <%--  $.validator.addMethod("validateWithSchema",
               function (value, element, param) {
                  alert("test");
                  var result = false; //validateXml();
               
                  return result;
                }, "El xml formado no es válido, es un error de sistema");
                $.validator.unobtrusive.adapters.addBool("validateWithSchema");
          <%--  $.validator.unobtrusive.adapters.add("validateWithSchema", {},function (options) {        
                   options.rules["validateWithSchema"] = options.params.param;
                    options.messages["validateWithSchema"] = options.message;

            });--%>
           //$form.validate();
           $("#xmlProxy").val("ok");
           isValid<%:id%> = $form.valid();
           
           log("es válido: " + isValid<%:id%>.toString());
            
           if (isValid<%:id%>){
                
                EventManager.Publish('onSaveObj<%:id%>');
                EventManager.Publish('onChangeOrder<%:id%>');
<% 
    string pre = "";
    string pos = "";
    if ((bool)ViewData["addRoot"] == true)
    {
        pre = @"{""?xml"":{ ""@version"": ""1.0"",""@standalone"": ""no""}, ""root"": ";
        pos = "}";
    }
    if (jsonData != "{}")
   { %>
                
                 jsonObject = jQuery.parseJSON('{"jsonObject": "' + escape('<%=pre%>' +JSON.stringify(tempObject<%= id%>).replaceAll("_arroba_","@").replaceAll('{}','""') +'<%=pos%>') + '"}');
<% }
   else
   { %>
   <%
            
           
         %>
         var jsonObject = jQuery.parseJSON('{"jsonObject": "' + escape('<%=pre %>' + JSON.stringify(tempObject<%= id %>).replaceAll("_arroba_","@").replaceAll('{}','""') +'<%=pos %>') + '"}');
         //var jsonObject = jQuery.parseJSON('{"jsonObject": "' + escape('<%=pre %>' + $.toJSON(tempObject<%= id %>).replaceAll("_arroba_","@").replaceAll('{}','""') +'<%=pos %>') + '"}');
<% } %>
                //changeOrderOfAttributes(tempObject<%= id %>);
                // callServerSend("<%=ResolveUrl("~/") %>Dynamicforms/ValidateData", jsonObject, validateDataEnd);
                callServerSend("<%=ResolveUrl("~/") %>Dynamicforms/DataReceive?xsdUrl=<%=Request.QueryString["xsdUrl"] %>&redirectPost=<%= HttpUtility.UrlEncode(Request.QueryString["dataReceive"]) %>", jsonObject, saveObjectEnd );
        
            }
        });
        
        // save root
         EventManager.Subscribe('onSaveObj<%:id%>', saveObj<%:id%>); 
                
    });

    function changeOrderOfAttributes(element) {
        var i =0;
        for (p in element){
            // elimina propiedades arroba
            if (p.toString().startsWith("_arroba_")){
                
            }
            
        }
    }
    var isValid<%:id%> = false;
    function saveObj<%=id %>(elem) {
        
    }

    function validateDataEnd(data){
        if (data == "ok"){
            callServerSend("<%=ResolveUrl("~/") %>Dynamicforms/DataReceive?redirectPost=<%=Request.QueryString["dataReceive"] %>", jsonObject, saveObjectEnd);
        }else{
            // show error

        }
    }
    function saveObjectEnd(data) {
        var $form = null;
        
        if (data.Result == "ok"){
            if (typeof onSavingForm == "undefined"){
                alert("Los datos han sido guardados!!");
            }
            $("#xmlProxy").val("ok");
             var $form = $('#form_<%= guidForm.ToString() %>'); 
             $form.removeData('unobtrusiveValidation'); 
            $form.removeData('validator'); 
            $.validator.unobtrusive.parseDynamicContent($form);
             $form.valid();
             $(".validation-summary-errors") .removeClass("validation-summary-errors").addClass("validation-summary-valid"); 
             if (typeof onSavingForm != "undefined"){
                window["onSavingForm"](data);
             }
        }else{
            $("#xmlProxy").attr("data-val-required", "Error en la validación del XML: " + data.Messages[0])
            $("#xmlProxy").val("");
            alert($("#xmlProxy").attr("data-val-required"));
             var $form = $('#form_<%= guidForm.ToString() %>'); 
            $form.removeData('unobtrusiveValidation'); 
            $form.removeData('validator'); 
            $.validator.unobtrusive.parseDynamicContent($form);
           //$("#savebtn<%=id %>").click();
            $form.valid();
 
        }
    }
   function createProperties<%=id %>(){

<%  
    //if (!addRoot && Model.RootForm.Id != Model.Id)
    //{
        foreach (var field in Model.ListColumns)
        {  %>
                 //tempObject<%= id%>.<%: field.Name%> = $("#<%: field.Id%>").val();
                 //<%: field.Name%>
        <%}
    //}%>
}  
<%="</script>"%>
<form action="#" class="dynamicform" id="form_<%= guidForm.ToString() %>">
<div class='validation-summary-valid' data-valmsg-summary='true'>
    <span>Por favor corrige los siguientes errores</span>
    <ul><li style="display:none"></li></ul>
</div>
<input type="hidden" data-val='true' data-val-required='Error en la validación del XML' name='xmlProxy' id='xmlProxy' value='ok' />

<%
    foreach (var field in this.Model.FieldsOrdered)
    {
        if (!field.IsList)
        {
            if (field.OrXElement == null && !field.XElement.Name.LocalName.ToLower().Contains("complextype") && !field.XElement.Name.LocalName.ToLower().Contains("simpletype") )%>
        <% Html.RenderAction("FieldEdit", "DynamicForms", new { field = field }); %>
<%      }
        else
        { %>  
        <% Html.RenderAction("FieldList", "DynamicForms", new { field = field }); %>
<%      }    
    }    

string visibility ="";    
if (Request.QueryString["buttons"] != null){
    if (Request.QueryString["buttons"] == "false"){
        visibility = "display: none;";
    }
}
%>
<p>
<script>
    function forceEmpty() {
        return $('#forceEmpty').attr('checked') ? true : false;
    }
</script>
<input type="checkbox" id="forceEmpty" /> Forzar inclusión de elementos vacíos

</p>

   <a class="button saveform principal positive  save " style="<%=visibility%>"  id="savebtn<%=id %>" href="#"   >Guardar</a>  
   
</form>  
<%    if (!string.IsNullOrEmpty(Request.QueryString["config"])){
            Html.RenderPartial("FormConfigUI");  
   } %> 

   <%    if (!string.IsNullOrEmpty(Request.QueryString["design"])){
            Html.RenderPartial("FormSchemaDesigner");  
   } %> 
<%="<script>" %>
    
    $(document).ready(


    function () {
    <%    if (!string.IsNullOrEmpty(Request.QueryString["config"])){ %>
         jsonConfig = jQuery.parseJSON('<%=ViewData["configObject"]%>');  
<%   } %>
    
        // if (qtip_loaded) {
        log("se ejecutó qtip");
        $("a[title]").qtip({ show: { event: "click"} });

        //}
        log("revisando objeto");
        //            log(tempObject<%= id %>);

        //            log(tempObject<%= id %>.AddendaModelo);
        //            log(tempObject<%= id %>.AddendaModelo.requestForPayment);
        //            log(tempObject<%= id %>.AddendaModelo.requestForPayment._arroba_type);
        //AddendaModelo.requestForPayment._arroba_type
        EventManager.Publish('onSetData<%:id%>');
    });
<%="</script>" %>
