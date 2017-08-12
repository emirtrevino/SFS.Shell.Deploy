<%@ Page Title="" Language="C#"  Inherits="System.Web.Mvc.ViewPage<SFSdotNet.Framework.Web.Mvc.Models.DynamicUI>" %>

<style type="text/css">
    .hoverConfig{
        border: 1px solid #009933;
    }
    .configicon
    {
       
        position:relative;
        right: 10px;
        top: 0px;
        float: right;
       
    }
.input-validation-error { border: 1px solid #f00 }
.input-validation-valid  { /* Optional: you can set whatever style you want */ }
.field-validation-error { color: #f00 }
.field-validation-valid { display: none }
.validation-summary-errors { font-weight: bold; color: #f00 }
.validation-summary-valid { display: none }


.formconfig .ui-dialog .ui-dialog-content, .formconfig .ui-tabs { padding:0; }
.formconfig.ui-dialog-titlebar { display:none; }
#tenant_info { border:0; }
.formconfig #ui-tab-dialog-close { position:absolute; right:0; top:23px; }
.formconfig #ui-tab-dialog-close a { float:none; padding:0; }

.formconfig label, .formconfig input { display:block; }
.formconfig		input.text { margin-bottom:12px; width:95%; padding: .4em; }
.formconfig		fieldset { padding:0; border:0; margin-top:25px; }


    BODY
    {
        filter: none;
    }
    #contentWrapper
    {
        
        background-image: none;
    }
    .form legend 
    {
         /*font-size: 14px;*/
          padding: opx;
          margin:0px;
          
        }
.form fieldset
{
     margin: 0px;
     padding:  0px;
    }
    a.closeedit:link, a.closeedit:active, a.closeedit:visited, a.closeedit:over
    {
         color:Red;
      
        }
    .closeedit
    {
          background-image: url('<%=ResolveUrl("~/")%>Content/icons/application_form_delete.png');
          background-repeat: no-repeat;
          background-position: left center;
          padding-left: 20px;
        
        }
    a.viewforedit:link, a.viewforedit:active, a.viewforedit:visited, a.viewforedit:over
    {
         color:Blue;
        
        }
.viewforedit
{
          background-image: url('<%=ResolveUrl("~/")%>Content/icons/application_form_add.png');
          background-repeat: no-repeat;
          background-position: left center;
          padding-left: 20px;
}

  </style>

  <div id="mainWrapper" class="clearfix">
 <div id="contentWrapper">
<div class="container_16 clearfix" id="contentContainer">

        <div class="grid_16">
        <div class="grid_16 alpha omega" >
<%
    if (Request.QueryString["links"] == "true")
    {
        string adendaUrl = VirtualPathUtility.ToAbsolute("~/Transfer.ashx?url=" + HttpUtility.UrlEncode( (string)ViewData["xsdUrl"]));
        string datosUrl = VirtualPathUtility.ToAbsolute("~/Transfer.ashx?url=" + (string)ViewData["xmlDataUrl"]);
        //string recibeDatosUrl = VirtualPathUtility.ToAbsolute("~/Receive.ashx?idComprobante=" + Request.QueryString["idComprobante"] + "&idAdenda=" + addenda.IdAddenda.ToString()); %>
        <div id="links"> <a href="<%=adendaUrl %>" target="_blank">Descargar esquema</a>  |  <a href="<%=datosUrl %>" target="_blank">Descargar xml original</a></div>

<%    }%>          
     
	<div class="spacetop spacebottom">
	<%  
        Html.EnableUnobtrusiveJavaScript();
        Html.EnableClientValidation(); %>
	
 		<div class="form col1 edit">
        

<%  
    Html.RenderAction("FormEdit", "DynamicForms", new { area = "",  xmlDataUrl= ViewData["xmlDataUrl"],
       xsdUrl =  ViewData["xsdUrl"], partialView = true, dataReceive =  ViewData["dataReceive"],
    
   }); %>
   <script>

//       $.getScript('<%=ResolveUrl("~/") %>Scripts/jquery.qtip.min.js', function (data, textStatus) {
//           qtip_loaded = true;
//           $(document).ready(
//                            function () {
//                                log("se cargó qtip");
//                                $("a[title]").qtip({ show: { event: "click"} });
//                            }
//                            );
//       });
//   
   </script>
            </div></div>
    </div>
    </div></div>
    </div>
    </div>
    <% if (!string.IsNullOrEmpty(Request.QueryString["config"])) { %>
    <a href="#" id="saveAllConfig">Guardar</a>
    <script>
        $(document).ready(function () {
            $("#saveAllConfig").click(function (event) {
                event.preventDefault();
                var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/SaveConfig';
                var jsonString = jQuery.parseJSON('{"jsonObject": "' + escape(JSON.stringify(jsonConfig)) + '"}');
                callServerSend(urlAction, jsonString, saveAllConfigDone);
            });
        });

        function saveAllConfigDone(data) {
            alert(data);
        }
        <%} %>
    </script>
