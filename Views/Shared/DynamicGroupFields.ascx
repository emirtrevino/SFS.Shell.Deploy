<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.DynamicUI>" %>
<% 
    string idForm = "";
    if (!string.IsNullOrEmpty(Request.QueryString["idList"])) {
        idForm = Request.QueryString["idList"];
        if (this.Model.FieldParent == null)
        {%>
   <div class="popup" >
    <div class="container_16">
    <form id="form_<%=Request.QueryString["idList"] %>" action="#" class="form col1 edit">
    
    <div class="validation-summary-valid" data-valmsg-summary="true">
    <span>Por favor corrige los errores</span>
    <ul><li style="display:none"></li></ul>
</div>

<%     }
    } %>
<%  
    string id ="";
    int? index = null;

    if (!string.IsNullOrEmpty(Request.QueryString["index"]))
        index = int.Parse(Request.QueryString["index"]);
        
    bool isNew = true;
    if (!string.IsNullOrEmpty(Request.QueryString["isNew"]))
        isNew = bool.Parse(Request.QueryString["isNew"]);

    string jsonPath = "";
    if (!string.IsNullOrEmpty(Request.QueryString["jsonPath"]))
        jsonPath = Request.QueryString["jsonPath"];
    else
        jsonPath = "tempObject" + Model.RootForm.Id;
    id = Model.Id;
    bool isEmptyCollapsable = false;
    if (Model.IsEmpty && !Model.IsRequired && Model.XElement != null) {
        if (Model.XElement.Attribute("minOccurs") != null)
            if (Model.XElement.Attribute("minOccurs").Value == "0")
                isEmptyCollapsable = true;
            
    }
   if (!Model.IsEmpty)
   {
       
        if (Model.IsItemFromCurrentList)
        { %>
        <!--if (Model.IsItemFromCurrentList)-->
   <%="<script>"%>
   
		

        var existsIssues<%:idForm%> = false;
        $(document).ready(function(){

        refreshForm();
        //Registry = []
        //$.validator.unobtrusive.parse("form_<%=Request.QueryString["idList"] %>");
        //$.validator.unobtrusive.parseDynamicContent("form_<%=Request.QueryString["idList"] %>");
        $("#savebtn<%=id %>").click(function(event){
            event.preventDefault();
           var $form = $('#form_<%=Request.QueryString["idList"] %>'); 
           //Unbind existing validation 
           //$form.unbind(); 
            $form.removeData('unobtrusiveValidation'); 
           $form.removeData('validator'); 
           $.validator.unobtrusive.parseDynamicContent($form);
            //onSaveObj<%:idForm%>();
            isValid<%:idForm%> = $("#form_<%=Request.QueryString["idList"] %>").valid();
             if (isValid<%:idForm%>){
                EventManager.Publish('onSaveObj<%:idForm%>');
                EventManager.Publish('onChangeOrder<%:idForm%>');
                //changeOrder<%:idForm%>();
                 popupSaved<%=Request.QueryString["idList"]%> = true;
                log("refresh<%= Request.QueryString["idList"] %>()");
                //length<%= Request.QueryString["idList"] %>++;
                refresh<%= Request.QueryString["idList"] %>();
                var elem = document.getElementById("form_<%=Request.QueryString["idList"] %>");
                log("closeCurrentDialog(elem)");
                closeCurrentDialog(elem);
                //saveObj<%:idForm%>();
            }
        });
    });
  
   <%       if (jsonPath.EndsWith("[]") && index != null)
            { %>
                var nextIndex<%=id %> = <%=jsonPath.Replace("[]","").Length%> + 1;
<%          }         

            if (Model.JsonPath.EndsWith("[]")) { // esta tambien es una lista independientemente que el parent lo sea
           
            %>
            <%  if (!isNew) { %>
                    
                    $(document).ready(function () { // test 988
                        //setData();
                       <%--  if (typeof onSetData<%:idForm%>Published != 'undefined'){
                            
                            onSetData<%:idForm%>Published = true;
                         }--%>
                        // var item = <%= jsonPath %>;   
                        EventManager.UnSubscribeAll('onSetData<%:idForm%>');
                        EventManager.Subscribe('onSetData<%:idForm%>', setData<%:idForm%>);
                        //onSetData<%:idForm%>();
                        
                        //EventManager.UnSubscribeAll('onSetData<%:idForm%>');
                    });
                    function setData<%:idForm%>() {
<%                  foreach(var field in Model.ListColumns) { %>
                        //$("#<%: field.Id %>").val(item.<%=field.Name %>);
<%                  } %>
                    }
                
            <% } %>
        $(document).ready(function () {
            <%--if (typeof onSaveObj<%:idForm%>Published != 'undefined'){
                
                onSaveObj<%:idForm%>Published = true;
            }--%>
            EventManager.Subscribe('onSaveObj<%:idForm%>', saveObj<%:idForm%>);
        });
var isValid<%:idForm%> = false;
function saveObj<%:idForm%>() {
            // groupfields
          
           
           log("inicia save<%:id %>");
            // guardado de todos los campos 
            // se entiende que es una forma de n campos
           
             

                  
        <%  
            foreach (var choice in Model.Choices) { 
            %>
            choiceSave<%= choice.Id%>();
   <%         }
           string jsonPath2 = jsonPath;
            if (isNew) { %>
                
                <% if (jsonPath2.EndsWith("[0]"))
                   {%>
                   log("es el primero del array <%=jsonPath2 %>");
                    if (<%=jsonPath2.Remove(jsonPath2.Length - 3, 3) %>  == null){
                        <%=jsonPath2.Remove(jsonPath2.Length - 3, 3) %> = new Array();
                    }
                <% } %>
                             
<%               if (jsonPath.EndsWith("[]"))
                   jsonPath2 = jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]");
               %>
             log("<%=jsonPath2 %>");
            if (<%=jsonPath2%> == null || typeof <%=jsonPath2%> == "string")
            {
                <%=jsonPath2%> = new Object();
            }
        <% }else{ %>
            //var item = <%= jsonPath %>;   
        <% }%>
        <%  StringBuilder sb =  new StringBuilder();
            foreach (var field in Model.ListColumns) { //listcolumns contiene solo hijos
                  %>
                 <%=jsonPath2%>.<%: field.Name %> = $("#<%: field.Id %>").val();
                 //<%: field.Name %>
    <%  } %>
            <% if (isNew) { %>
                //<%=jsonPath.Replace("[]","") %>.push(item);
            <%}else{ %>
               // <%= jsonPath %> = item;
            <%} %>
                //alert(<%=jsonPath.Replace("[]","") %>.length);
                //ShowObject();
               

            
        

        }
<%      if (isNew)
        { %>
   // es nuevo
$(document).ready(
    function(){
    createProperties<%=id%>();
});
function createProperties<%=id%>(){
    <% if (jsonPath2.EndsWith("[0]"))
       {%>
    if (<%=jsonPath2.Remove(jsonPath2.Length - 3, 3)%>  == null){
        <%=jsonPath2.Remove(jsonPath2.Length - 3, 3)%> = new Array();
    }
    <% } %>
    if(<%=jsonPath2%> == null){
        <%=jsonPath2%> = new Object(); //tes 324
    }
<%      foreach (var field in Model.ListColumns)
        {  %>
                 <%=jsonPath2%>.<%: field.Name%> = $("#<%: field.Id%>").val();
                 //<%: field.Name%>
 <%     } %>
}
<%  } %>        
<%}else{ %>
            // IsEmpty = true
            //<%=jsonPath %><%= Model.JsonPath %> = jQuery.parseJSON('{}'); //abr 243
            <%  string spec2 = Model.GetJsonPathMerged(jsonPath, Model.JsonPath);
                spec2 = spec2.Replace("[]","");
              
            %>
            //<%=spec2 %> = jQuery.parseJSON('{}');
            
<%  if (isNew)
    { %>
        <% if (jsonPath.EndsWith("[0]") || jsonPath.EndsWith("[]"))
           {%>
                   log("es el primero del array <%=jsonPath %>");
                    if (<%=spec2 %>  == null){
                        <%=spec2 %> = new Array();
                    }
        <% }else{ %>

            if (<%=spec2 %> == null)
                <%=spec2 %> = jQuery.parseJSON('{}');

        <% } %>
$(document).ready(
    function(){
    //createProperties<%=id%>();
});
function createProperties<%=id%>(){

<% foreach (var field in Model.ListColumns)
   {  %>
                 <%=spec2%>.<%: field.Name%> = $("#<%: field.Id%>").val();
                 //<%: field.Name%>
        <%} %>
}
<%} %>        
             
    <%  } %>
   <%="</script>"%>
   <% 
       }else{
             %>
 <%="<script>" %>

   <% 
           string fullJsonPath = Model.GetJsonPathMerged(jsonPath, Model.JsonPath);
           if (fullJsonPath.EndsWith("[]") )  
           { %>
        //if(<%=fullJsonPath.Replace("[]","") %> != null){    
        //    <%=fullJsonPath.Replace("[]","") %> = []; // test ttt
        //}
<%         }else{
             if (Model.JsonPathIsItemFromList(jsonPath)) // se trata de un array, el parent que contiene al current
                {
                    if (isNew)
                    {%>
                        //<%= fullJsonPath %> =jQuery.parseJSON('{}'); //344
                        
                    <%}
                    else
                    { %>
                    
              <%    }
             }
             else
             { 
                   %>
                //createProperties<%=Model.FieldParentNotEmpty.Id%>();
                log('<%=fullJsonPath%> = jQuery.parseJSON("{}")');
                //<%=fullJsonPath %> = jQuery.parseJSON('{}'); //test 345 funcionaba antes de la edicion de datos existentes
                   function createProperties<%=id %>(){
<% //foreach (var field in Model.ListColumns) {  %>
                <%-- //<%=fullJsonPath %>.<%: field.Name %> = $("#<%: field.Id %>").val();
                 //<%: field.Name %>--%>
        <%//} %>
}  
         <%  } %>
    
    <%       } %>
        
 <%="</script>" %>

   <% } %>
  

<% }
    if (!Model.IsEmpty || isEmptyCollapsable)
    { %>
<div id="div<%=id %>">
<fieldset  style=" padding:5px; border:1px; border-color:Black; border-style: solid;"><legend><%: Model.DisplayName %>
<% if (!string.IsNullOrEmpty(Model.Documentation)){ %><span class="help"> <a href="javascript:void(0)" class="helpt" title="<%= Model.Documentation %>"> ? </a> </span> <% } %>
                                <%    
       if (Model.IsRequired)
       { %>
                                   <span style=" color:Red; font-weight:bold;">*</span> 
                                &nbsp;<%}
       else
       { %>&nbsp; &nbsp; <a href="#" style="font-size:90%" id='lnkView_<%=id %>' class="viewforedit" >Capturar</a>

                                <%} %>

                                
</legend>
 <%} %>
<% if (!Model.IsRequired)
   {%>
<div id="vv_<%=id %>" class=" xmlelement ">
<%} %>
<% 
    

   if (Model.IsList && !Model.IsEmpty  && !Model.IsItemFromCurrentList )
   { %> <%--es lista y no es item de current list--%>
   <% Html.RenderAction("FieldList", "DynamicForms", new { field = Model }); %>
<%   }
   else
   {
       // crear un proxy para dividir atributos de elementos cuando un campo es un elemento simple
       // pero además contiene atributos
       //if (Model.Fields.Where(p=>p.) )
       foreach (var field in Model.FieldsOrdered)
       { 

           %>
            <div id="sortable">
       <% Html.RenderAction("FieldEdit", "DynamicForms", new { field = field }); %>
       </div>
<%   }
   }%>
<% if (!Model.IsRequired)
   { %>
   </div>
<%} %>
 

   <% if (!Model.IsEmpty  || isEmptyCollapsable )
          
   {
       if (!Model.IsRequired)
       {%>

                                   &nbsp;
                                   &nbsp; 
                                   <a href="#" id='lnkClose_<%=id %>'  style="font-size:90%"  class="closeedit" >No capturar</a>


<% } %>
</fieldset>
</div>
<% } %>
<%  if (Model.IsItemFromCurrentList)
    {
         %>
 
 <a class="button principal positive  save "  id="savebtn<%=id %>" href="#"   >Agregar</a>

   <script>
       $(document).ready(
        function () {
            //if (qtip_loaded) {
                $("a[title]").qtip({ show: { event: "click"} });
                //}
<% if(!isNew) { %>
                EventManager.Publish('onSetData<%:idForm%>');
                log("validando issues : " + existsIssues<%:idForm%>);
                if ( existsIssues<%:idForm%> == true){
                    var $form = $('#form_<%=Request.QueryString["idList"] %>'); 
                    $form.removeData('unobtrusiveValidation'); 
                    $form.removeData('validator'); 
                    $.validator.unobtrusive.parseDynamicContent($form);
                    $form.valid();
                }
<%} %>
            }
        
    );
</script>


<% } %>
<% if (!string.IsNullOrEmpty(Request.QueryString["idList"])) {
       if (this.Model.FieldParent == null)
       { %>
    </form>
   </div>
    </div>

<%="<script>" %>

        $(document).ready(function () {

            refreshForm();

        });

<%="</script>" %>
<%  
       }
    } %>
<%="<script>" %>
<% bool setOrder = false;
    if (!Model.IsEmpty ){
        setOrder =true;
    }else if(Model.XElement != null ){
        if (Model.XElement.Name.LocalName.ToLower() == "sequence"){
            setOrder = true;
        }
        else if (Model.XElement.Name.LocalName.ToLower() == "complextype")
        {
        setOrder = true;
        }
    
    }
    if (setOrder )
   {
       if (string.IsNullOrEmpty(id))
           id = Model.Id;
       if (string.IsNullOrEmpty(idForm))
           idForm = Model.RootForm.Id;
       if (Model.Fields.Where(p => (p.Name != "_root_" && !p.Name.StartsWith("_arroba_")) /*|| ()*/).Count() > 0)
       {
           string spec = Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "[" + Request.QueryString["length"] + "]");
           spec = spec.Replace("[]","");
        %>
        function changeOrder<%:id%>(){
            var isdefined = true;
            try{
                if(typeof <%= spec%>  == 'undefined'){
                    isdefined = false;
                }
            }catch(error){
                isdefined=false;
            }
<%  StringBuilder sb = new StringBuilder();
    List<string> props = new List<string>();
    foreach (var item in Model.Fields.Where(p => p.Name != "_root_" && !p.Name.StartsWith("_arroba_") )) //&& p.FieldType != DynamicUITypes.Choice))
    {
        //item.Test();
        string name = item.Name;
        if (string.IsNullOrEmpty(item.Name)) {
            //name = "Totales";
        }
        
        if (sb.Length > 0)
            sb.Append("|");
            if (name == "Choice"){
                foreach (var itemC in item.Fields)
                { 
                     if (sb.Length > 0)
                        sb.Append("|");
                    sb.Append(itemC.Name);
                }

            }else{
                sb.Append(name);
            }
        props.Add(name);
    }
     %>
     if (isdefined) {
     

            <%=spec%> = setOrderFields("<%=sb.ToString()%>",<%= spec%>);
        }
    }
        EventManager.Subscribe('onChangeOrder<%:idForm%>', changeOrder<%:id%>);
<% }
   } %>
<%="</script>" %>
<%="<script>" %>
 $(document).ready(function() {
<% if (!Model.IsRequired)
   { %>

   

       var isdefined = true;
       try{
   
            if (typeof <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]","")%> == 'undefined'){
                isdefined = false;
            }
       }catch(error){
            isdefined = false;
       }
    if (isdefined == false){


            $("#lnkClose_<%=id %>").hide();
            $("#vv_<%=id %>").hide();
            $("#lnkView_<%=id %>").show();

    }else{
          $("#lnkClose_<%=id %>").show();
            $("#vv_<%=id %>").show();
            $("#lnkView_<%=id %>").hide();
    }
<%      } %>
            log("xmlelement <%=id %> :" +  $("#vv_<%=id %> > .xmlelement").length);
            $("#vv_<%=id %> > .xmlelement").each(function() { 

            log("Existe? " + isdefined);
                if (isdefined == false){

                    log("escondiendo " + $(this).attr("id"));
                    $(this).hide();


                }else{
                    log("mostrando " + $(this).attr("id"));
                    $(this).show();
                
                }

            });

            //por defecto todo lo que es validado, ya no debe ser validado
            log("Cantidad de validadores true " + $("#vv_<%=id %>").find(":input[data-val=true]").length);
            $("#vv_<%=id %>").find(":input[data-val=true]").each(function() {
                log("iterando validador <%=id %>: " + $(this).attr("id") );  
                 if ($(this).parents(".xmlelement").length > 0)
                 { 
                    log("econtró parent: <%=id %> .xmlelement : " + $(this).parents(".xmlelement").length);
                    
                          
                        if( $(this).parents(".xmlelement:first").css("display") == "none"){
                            log("No validar " + $(this).attr("id"))
                            $(this).attr("data-val", "false");
                        }else{
                            
                            log("Validar " +  $(this).attr("id"));
                        }
                }else{
                           log("No econtró parent <%=id %>: .xmlelement  ");

                }
            });
            

            $("#lnkView_<%=id %>").click(
                function(event) {
                
                    event.preventDefault();
                    log("Ver y cantidad de validadores false" + $("#vv_<%=id %>").find(":input[data-val=false]").length);
                     $("#vv_<%=id %>").show();
                    $(this).hide();
                    $("#vv_<%=id %>").find(":input[data-val=false]").each(function() {
                        //aa
                        if ($(this).parents(".xmlelement").length > 0)
                        { 
                        <% if (Model.IsItemFromCurrentList) { %>
                       
                        <%} %>
                            if( $(this).parents(".xmlelement:first").css("display") != "none"){
                                log("Agregando validación a: " + $(this).attr("id"));
                                $(this).attr("data-val", "true");
                            }else{
                                log("No Agregando validación a: " + $(this).attr("id"));
                            
                            }
                        }
                        
                    });
                   
                    $("#lnkClose_<%=id %>").show();
            });

            $("#lnkClose_<%=id %>").click(function(event){

           
                    event.preventDefault();
                    $("#vv_<%=id %>").hide();
                    $(this).hide();
                    $("#lnkView_<%=id %>").show();
                     $("#vv_<%=id %>").find(":input[data-val=true]").each(function() { 
                        log("Quitando validación a: " + $(this).attr("id"));
                        $(this).attr("data-val", "false");
                    });
                    $("#vv_<%=id %>").find(".xmlelement").each(function() { 
                        $(this).hide();
                     });
                    //delete <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath)%>;
                    log("Eliminado: <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath)%>")
            });

        });




<%="</script>" %>  
