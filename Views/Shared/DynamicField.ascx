<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.DynamicUI>" %>
<% 
    string idForm = "";
    if (!string.IsNullOrEmpty(Request.QueryString["idList"]))
    {
        idForm = Request.QueryString["idList"];
    }
    else {
        idForm = Model.RootForm.Id;
    }
    bool isNew = true;
    if (ViewData["isNew"] != null )
        isNew  = (bool)ViewData["isNew"];
    
    string jsonPath = "";
    if (!string.IsNullOrEmpty(Request.QueryString["jsonPath"]))
    {
        
        jsonPath = Request.QueryString["jsonPath"];
    }
    else
    {
        jsonPath = "tempObject" + Model.RootForm.Id;
    }
    bool formField = false;
    if (ViewData["formfield"] != null)
    {
        formField = (bool)ViewData["formfield"];
    }
    bool test = Model.IsRequired;
    string id = Model.Id;
    string name = Model.ConceptualName;
    string idPath = Model.IdXPath;
    int? index  =null;
    if(!string.IsNullOrEmpty(Request.QueryString["index"]))
        index = int.Parse(Request.QueryString["index"]);
    string maxLengthAtt = "";
    bool multiline = false;
    if (Model.MaxLength >= 40){
        multiline = true;
    }
    if (Model.MaxLength > 0)
    {
        maxLengthAtt = string.Format("maxlength='{0}'", Model.MaxLength.ToString());
    }
    //else {
    //    maxLengthAtt = string.Format("MaxLength='{0}'", Model.MaxLength.ToString());
    //}
    string disabled = "";
    if (!Model.Editable)
    {
        disabled = "disabled='disabled'";
    }
    string value = "";
    if (Model.DefaultValue != null) {
        value = Model.DefaultValue;
    }
   
   
    StringBuilder sbVal = new StringBuilder();
    //sbVal.Append(" ");

    if (Model.Restrictions.FirstOrDefault(p => p.RestrictionType == RestrictionTypes.Pattern) == null)
    {
        if (Model.FieldType == DynamicUITypes.Date)
        {
            Model.Restrictions.Add(new DynamicRestriction() { RestrictionType = RestrictionTypes.Pattern, Value = @"(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])" });
        }else if(Model.FieldType == DynamicUITypes.DateTime){
            Model.Restrictions.Add(new DynamicRestriction() { RestrictionType = RestrictionTypes.Pattern, Value = @"(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])" });
        
        } 

    }

    foreach (var restriction in Model.Restrictions)
    {
        
        switch (restriction.RestrictionType)
        {
            case RestrictionTypes.Range:
                if (sbVal.Length > 0)
                    sbVal.Append(" ");
                if (Model.MaxValue == 0) {
                    Model.MaxValue = 99999;
                }
                sbVal.Append(string.Format(@"data-val-range-max='{0}' data-val-range-min='{1}'", Model.MaxValue.ToString(), Model.MinValue.ToString()));                
                sbVal.Append(string.Format(@" data-val-range='{0}' ", "El valor del campo " + Model.DisplayName + " no esta dentro del rango"));                
                break;
            case RestrictionTypes.Required:
                if (sbVal.Length > 0)
                    sbVal.Append(" ");
                sbVal.Append(string.Format(@"data-val-required='{0}'", "El campo " + Model.DisplayName + " es requerido"));
                break;
            case RestrictionTypes.Compare:
                
                break;
            case RestrictionTypes.Pattern:
                if (sbVal.Length > 0)
                    sbVal.Append(" ");
                sbVal.Append(string.Format(@"data-val-regex-pattern='{0}'", restriction.Value.ToString()));
                sbVal.Append(string.Format(@" data-val-regex='{0}'", "El formato de " + Model.DisplayName + " no es correcto"));
                break;
            default:
                break;
        }
        

    }
    string maxLength = "";
    if (sbVal.Length > 0)
    sbVal.Append(" ");
    if (Model.FieldType != DynamicUITypes.Select)
    {
        if (Model.MaxLength != null && Model.MinLength != null)
        {
            if (Model.MaxLength == Model.MinLength)
            {
                sbVal.Append(@" data-val-regex-pattern='^[a-zA-Z0-9]{" + Model.MaxLength.Value.ToString() + "}$' "); 
                sbVal.Append(" data-val-regex='El tamaño de " + Model.DisplayName + " debe ser de " + Model.MinLength.Value.ToString() + " caracteres' ");
            }
            else
            {
                if (Model.MaxLength != null)
                {
                    maxLength = string.Format(@" maxlength='{0}' ", Model.MaxLength.ToString());
                    sbVal.Append(string.Format(@" data-val-length-max='{0}' ", Model.MaxLength.ToString()));
                }
                if (Model.MinLength != null)
                {
                    sbVal.Append(string.Format(@" data-val-length-min='{0}' ", Model.MinLength.ToString()));
                }
                if (Model.MinLength != null || Model.MaxLength != null)
                {
                    sbVal.Append(string.Format(@" data-val-length='{0}' ", "El número de digitos de " + Model.DisplayName + " no esta dentro del rango "));
                }
                else
                {


                }
            }
        }
        if (Model.Length != null)
        {
            sbVal.Append(@" data-val-regex-pattern='^[a-zA-Z0-9]{" + Model.Length.Value.ToString() + "}$' "); ///^[a-zA-Z0-9]{6,}$/
            sbVal.Append(" data-val-regex='El tamaño de " + Model.DisplayName + " debe ser de " + Model.Length.Value.ToString() + " caracteres' ");
        }
    }
    if (sbVal.Length > 0) {
        sbVal.Append(@" data-val='true' ");
    }
    bool oneItemInCurrentList = false;
    if (ViewData["oneItemInCurrentList"] != null)
        oneItemInCurrentList = (bool)ViewData["oneItemInCurrentList"];    %>

<% bool isFormField = false;
    if (ViewData["formfield"] != null)
   {
       if (((bool)ViewData["formfield"]) == true)
           
       {
           isFormField = true;%>
   <div class="popup" >
    <div class="container_16">
    <form id="form_<%=Request.QueryString["idList"] %>" action="#" class="form col1 edit">
    
    <div class='validation-summary-valid' data-valmsg-summary='true'>
    <span>Por favor corrige los errores</span>
    <ul><li style="display:none"></li></ul>
</div>
<div id="div_<%=id %>">
<fieldset  style=" padding:5px; border:1px; border-color:Black; border-style: solid;"><legend><span cfId='<%=idPath %>_label'><%: Model.DisplayName %> </span>
<% if (!string.IsNullOrEmpty(Model.Documentation))
                                { %><span class="help"> <a href="javascript:void(0)" class="helpt" cfId='<%=idPath %>_help' title="<%= Model.Documentation %>"> ? </a> </span> <% } %>
                                <%    
                                    if (Model.IsRequired)
                                     { %>
                                   <span cfId='<%=idPath %>_req' style=" color:Red; font-weight:bold;">*</span> 
                                <%} %>
</legend>

<%      }
   } %>




<div id="div<%=id %>" class="ui-state-default">
			<div id="dc<%: id %>" cfId="<%=idPath %>_container" class="li fcContainer <%= (Model.FieldParent == null &&  !string.IsNullOrEmpty(Request.QueryString["idList"]) && !isFormField)  ? "" : "focushl" %> ">
				<div class="spacetop spacebottom">
				<div class="<%= (Model.FieldParent == null &&  !string.IsNullOrEmpty(Request.QueryString["idList"]) && !isFormField)  ? "" : "grid_4" %> alpha desc">
				<% 
                    var dname = Model.DisplayName; %>
                <span cfId='<%=idPath %>_label'><%=dname %></span> 
                <% if (!string.IsNullOrEmpty(Model.Documentation))
                                { %><span class="help"> <a href="javascript:void(0)" class="helpt" title="<%= Model.Documentation %>" cfId='<%=idPath %>_help'> ? </a> </span> <% } %>
                                <%    
                                    if (Model.IsRequired)
                                     { %>
                                   <span cfId='<%=idPath %>_req' style=" color:Red; font-weight:bold;">*</span> 
                                <%} %>
                                </div>

				
				<div class="grid_7 omega editor-field">
<%  
    if (Model.IsList && !Model.IsEmpty  && !oneItemInCurrentList ) // Se trata de un elemento que es una lista porque se repite N o cierta cantidad de veces
    { %>
<%=" <script>"%>    
    <% if(isNew ){          
    
            if (jsonPath.EndsWith("[]") && index != null) {%>
                //TODO
        <%  }else{
                if (string.IsNullOrEmpty(Request.QueryString["xPath"])) { %>
                    <%--if (<%= Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]","") %> == null)
                    {
                        createProperties<%=Model.FieldParentNotEmpty.Id%>();
                        <%= Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]","") %> = []; //rrr
                    }--%>
            <%  }else{ %>
                    if (item.<%=Model.Name %> == null ){
                        //createProperties<%=id %>(); 
                        item.<%=Model.Name %> = []; // rrs
                    }

            <%  } %>
        <%  } %>
    <% }else{ %>
    <%  } %>
<%=" </script>"%> 
    <% Html.RenderAction("FieldList", "DynamicForms", new { field = Model }); %>
<%  }
    else
    {
        string fullJsonPath = "";
%>
        <%="<script>" %>
            <%  string jsonPathForEdit = "";
                if ( oneItemInCurrentList && formField) {
                    fullJsonPath = Model.GetJsonPathMerged(jsonPath,Model.JsonPath);
                    //string endName =jsonPath.Split(char.Parse("."))[jsonPath.Split(char.Parse(".")).Length - 1];
                    //jsonPath = jsonPath.Remove((jsonPath.Length - endName.Length), endName.Length); // se asume que se repite el elemento y se elimina entonces del parent
                    //jsonPathForEdit  = Model.GetJsonPathMerged(jsonPath,Model.JsonPath);
                    if (!isNew )
                        jsonPathForEdit = jsonPath;
                    else
                        jsonPathForEdit = fullJsonPath;
                        
                    %>
            <% if (!isNew)
               { %>
                    var item = <%= jsonPathForEdit %>;  // test 572  

                    $(document).ready(function () {
                     
                    });
                    //function setData() {
                    //    $("#<%: id%>").val(item.<%=Model.Name%>);
                    //}
                
            <% }
               else
               { %>
                 


            <%} %>
        <%--   // function save<%= id %>(elem) { // field 
                <% 
                    if (isNew) {
                        if (jsonPath.EndsWith("[]"))
                        {%>
                    if (<%=jsonPath.Replace("[]", "")%> == null)
                    <%=jsonPath.Replace("[]", "")%> = [];

                        <%}
                        else
                        {%>
                    if (<%=jsonPath.Replace("[]", "")%> == null)
                    <%=jsonPath.Replace("[]", "")%> = new Object();
                    <%} %>
                    if (<%=jsonPathForEdit.Replace("[]","")%> == null){
                    //    createProperties<%: Request.QueryString["parentId"]%>();   
                        <%=jsonPathForEdit.Replace("[]", "")%> = [];
                    //}
                    //<%=jsonPathForEdit.Replace("[]", "")%>.push(JSON.parse("{\"<%=Model.Name %>\": \"" + $("#<%= id %>").val() + "\"}"));
                <%}else{ %>
                   // <%= jsonPathForEdit.Replace("[]", "[" + index.Value.ToString() + "]")%> = JSON.parse("{\"<%=Model.Name %>\": \"" + $("#<%= id %>").val() + "\"}");
                <%} %>
                //alert(<%=jsonPathForEdit.Replace("[]", "")%>.length);
                //ShowObject();
                //refresh<%= Request.QueryString["idList"] %>();
                //closeCurrentDialog(elem);
                }--%>
            
            <%
            }else{
                if (isNew)
                    fullJsonPath = Model.GetJsonPathMerged(jsonPath, Model.JsonPath);
                else
                    fullJsonPath = jsonPath;
            %>
                <% 
                    if (fullJsonPath.EndsWith("[]"))
                   { %>
                   //if (<%=fullJsonPath.Replace("[]","") %> == null) {
                   //     <%=fullJsonPath.Replace("[]","") %> = []; // test 01
                   //}
                <% }else{

                       if (Model.JsonPathIsItemFromList(jsonPath))
                       {%>
                    //item.<%=Model.Name %> =""; //223
                    <% }else{ %>
                    log('<%=fullJsonPath%> = ""');
                    //<%=fullJsonPath%> = ""; //222
                    // esto funcionaba antes de la edicion de datos existentes
                    <%} %>
                <% } %>
            <%} %>

           $(document).ready(function(){
<%--<%  bool thisElementIsRequired = false;
    if (Model.FieldParentNotEmpty != null) { 
        if (Model.FieldParentNotEmpty.IsRequired) { %>
            if (Model.IsRequired){
                thisElementIsRequired = true;
            }
<%      }
    }else{  
        if ()%>
    
<% } %>   --%>   

<% 
    if (Model.IsRequired) { 
    %>
    
<%  } %>                 
           });

        <%="</script>" %>
        
<%        
        switch (Model.FieldType)
        {
            case DynamicUITypes.Choice :
%>
            <select name='<%: name %>' id='<%: id %>'>
<%
foreach (var item in Model.ListOptions)
{ %>
            <option value='<%: item.Key %>'><%: item.Value%></option> 
<%  } %>                
            </select>
<%="<script>" %>

function choiceSave<%=id %>(){
    // elimina las opciones no seleccionadas
    var selected = $("#<%: id %>").val();
     <%  foreach (var item in Model.Fields)
            { %>
                if ("<%=item.Id %>" != selected){
                    //no es la seleccionada, se elimina
                    <% string jsonPath2 = jsonPath;
                       if (jsonPath.EndsWith("[]"))
                           jsonPath2 = jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]");
     
                         %>
                    delete <%= Model.GetJsonPathMerged(jsonPath2, item.JsonPath).Replace("[]","") %>;
                }
        <%  } %>
}
function choiceChange<%=id %>(value){
 log('choiceChange<%=id %>');   
        <%  foreach (var item in Model.Fields)
             { %>
                if ($("#div<%=item.Id %>").attr("id") == "div" + value){
                    $("#div<%=item.Id %>").show();
                     $("#div<%=item.Id %>").find("*").each( 
                        function(){ 
                            
                                if ($(this).attr("data-or-val") != undefined){
                                    $(this).attr("data-val", $(this).attr("data-or-val"));
                                    if ($(this).attr("name-or") != undefined) {
                                        $(this).attr("name",   $(this).attr("name").replace("_temp", "") );
                                    }
                                }
                            

                        } 
                    ); 
                }else{
                    $("#div<%=item.Id %>").hide();
                    $("#div<%=item.Id %>").find("*").each( 
                        function(){ 
                            
                                if ($(this).attr("data-val") == "true"){
                                    $(this).attr("data-or-val", $(this).attr("data-val"));
                                    $(this).attr("data-val", "false");
                                     $(this).attr("name-or",   $(this).attr("name"));
                                     $(this).attr("name",   $(this).attr("name") + "_temp");
                                }
                            

                        } 
                    ); 

                }
        <%  } %>
}





$(document).ready(
    function (){
        choiceChange<%=id %>($("#<%: id %>").val());
      

        $("#<%: id %>").change(
            function(){
                choiceChange<%=id %>($(this).val());
            }
        );
    }
);

<%="</script>" %>

<%  
    foreach (var item in Model.Fields)
    { %>
   
            <% Html.RenderAction("FieldEdit", "DynamicForms", new { field = item }); %>
 
<%    }            
%>
test
<script> EventManager.Subscribe('onSaveObj<%:idForm%>', choiceSave<%:id%>); </script>
<%
                break;                
            case DynamicUITypes.Select:
%>
            <select  cfId='<%=idPath %>_input' name='<%: name %>' id='<%: id %>' <%= sbVal.ToString() %> class="field">
            <option value=''>Selecciona una opción</option>
<%
foreach (var item in Model.ListOptions)
{ %>
            <option value='<%: item.Key %>'><%: item.Value%></option> 
<%  } %>                
            </select>

<%            
break;
            case DynamicUITypes.MultiSelect:

break;
            case DynamicUITypes.List : %>
            Lista       
<%
break;            
            case DynamicUITypes.Integer:
%>          
            <input  cfId='<%=idPath %>_input' <%= sbVal.ToString() %> <%=disabled %> name='<%: name %>' id='<%: id %>' <%= maxLengthAtt %> class="field text medium integer" value="<%: value %>" type="text" />



<%            
            
            break;
            case DynamicUITypes.Decimal:
%>          
            <input cfId='<%=idPath %>_input' <%= sbVal.ToString() %> <%=disabled %> name='<%: name %>' id='<%: id %>' <%= maxLengthAtt %> class="numeric field text medium" value="<%: value %>" type="text" />

<%            
            
            break;
            case DynamicUITypes.Text:
            if (multiline) {
%>
            <textarea  cfId='<%=idPath %>_input' <%= sbVal.ToString() %> <%=disabled %> name='<%: name %>' id='<%: id %>' class="field text medium" <%= maxLengthAtt %>  rows="2" > <%: value %> </textarea>

<%
            }else{
%>          
            <input cfId='<%=idPath %>_input' <%= sbVal.ToString() %> <%=disabled %> name='<%: name %>' id='<%: id %>' class="field text medium" <%= maxLengthAtt %> value="<%: value %>" type="text" />


<%            }
            break;
            case DynamicUITypes.Date:
                //System.Globalization.CultureInfo current = System.Globalization.CultureInfo.CurrentCulture;
    
%>          
            <input cfId='<%=idPath %>_input'  <%= sbVal.ToString() %> name='<%: name %>' <%=disabled %> id='<%: id %>' class="field datesafe medium" <%= maxLengthAtt %> value="<%: value %>" type="text" />
           <script> 
           $("#<%: id %>").datepicker({ 
           showOn: "button",
           buttonImage: "<%= ResolveUrl("~/") %>Content/calendar.png",
           buttonImageOnly: true
           
            });
            $("#<%: id %>").datepicker( "option", "dateFormat", "yy-mm-dd")

       </script>
<%            
            break;

            case DynamicUITypes.DateTime:
                //System.Globalization.CultureInfo current = System.Globalization.CultureInfo.CurrentCulture;
    
%>          
            <input cfId='<%=idPath %>_input'  <%= sbVal.ToString() %> name='<%: name %>' <%=disabled %> id='<%: id %>' style=" width:140px" class="field datesafe medium" <%= maxLengthAtt %> value="<%: value %>" type="text" />
           <script> 
           $("#<%: id %>").datetimepicker({
           timeFormat: 'hh:mm:ss',
           showSecond: true, 
           separator: "T",
           showOn: "button",
           buttonImage: "<%= ResolveUrl("~/") %>Content/calendar.png",
           buttonImageOnly: true
           
            });
            $("#<%: id %>").datetimepicker( "option", "dateFormat", "yy-mm-dd")
            // $("#<%: id %>").datetimepicker( "option", "dateFormat", "yy-mm-dd")

       </script>
<%            
            break;
          case DynamicUITypes.Form:
          
%>          form
            <% Html.RenderAction("FieldEdit", "DynamicForms", new { field = Model }); %>
<%            
            break;
            case DynamicUITypes.TextArea:
%>          
            <input  cfId='<%=idPath %>_input' <%= sbVal.ToString() %> <%=disabled %> name='<%: name %>' id='<%: id %>' class="field text medium" value="<%: value %>" type="text" />

<%            
            break;
            default:
%>
   
<%=Model.IdXPath%> --- <%=Model.Name%> ---<%=Model.FieldType%> ---<%=Model.Fields.Count.ToString()%> 
   default 
<%
break;
        }
        
           if (Model.FieldType == DynamicUITypes.Text
        || Model.FieldType == DynamicUITypes.TextArea
        || Model.FieldType == DynamicUITypes.Date
        || Model.FieldType == DynamicUITypes.DateTime
         || Model.FieldType == DynamicUITypes.Decimal
        || Model.FieldType == DynamicUITypes.Integer
        || Model.FieldType == DynamicUITypes.Select
        ) {  %>
<%= "<script>" %>

function saveObj<%=id %>() {
    log("start SaveObj<%=id %>");
    var createProps = false;
    var parentElement = $("#<%=id %>").parents(".xmlelement:first"); 
    log("parentElement <%=id %>");
    
    if (parentElement.length > 0){
        if(parentElement.css("display") != "none"){
            createProps = true;
        }else{
            createProps = false;
        }
    }else{
        createProps = true;
    }
    if (createProps) {
      log("sí se guardan las propiedades de <%=id %>");
    if (isValid<%:idForm%> == true){
    log("<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>: "); 

<% 
    if (this.Model.IsList) // es un campo simple lista
   { 
       if (fullJsonPath.EndsWith("[0]")){
         %>
    if (<%=fullJsonPath.Remove(fullJsonPath.Length -3 , 3)%> == null ){
        <%=fullJsonPath.Remove(fullJsonPath.Length - 3, 3)%> = new Array();
    }
<%      }    
    } %>
 //<!-- inicia -->
 <%
    //Crear parents elements hasta llegar al parent inmediato
             //....PArent.Parent.Parent.[muchos]
             // se supone que es una lista a la que se le agregarán elementos
             // esta lista puede tener N parents que debemos asegurarnos de que existen
             // a.b.c.d.e
         
            StringBuilder sbPath2 = new StringBuilder();
            var npaths2 = Model.JsonPath.Split(char.Parse(".")).Where(p => !string.IsNullOrEmpty(p)).Count();
            int niter2 = 0;

            if (!string.IsNullOrEmpty(Request.QueryString["length"]))
            { %>

               <%-- if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                            <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                }--%>
            <%}
             foreach ( var path in  Model.JsonPath.Split(char.Parse(".")).Where(p=>!string.IsNullOrEmpty(p))){
                 niter2 ++;
                 if ((Model.RootForm.IsList && niter2 == 1) == false)
                 {
                     if (npaths2 > niter2)
                     {
                         if (sbPath2.Length > 0)
                             sbPath2.Append(".");
                         sbPath2.Append(path); %>
                    //if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath2.ToString()%> == null){
                    //    <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath2.ToString()%> = new Object(); //tes7346
                    //}
                    if (<%=Model.GetJsonPathMerged(jsonPath, sbPath2.ToString()).Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=Model.GetJsonPathMerged(jsonPath, sbPath2.ToString()).Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object(); //tes7346
                    }
                    <%
                     }
                 }
                 else if ((Model.RootForm.IsList && niter2 == 1)){ 
                 %>
                   if (<%=jsonPath.Replace("[]","")%> == null)
                        <%=jsonPath.Replace("[]","")%> = new Array();

                   if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object(); // test 2365
<%--<% if (Model.MinOccurs == 0)
   { %>
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>._candelete_ ="";
<% } %>    --%>                    

                    }
                 <%}
                 
             }
%>
 //<!--temrina--> 
    log("buscando: <%: id %>" );
    if ($("#<%: id %>").length == 0)
    {
        log("no encontrado: <%: id %>" );
    }
    <%
     if (fullJsonPath.EndsWith("[]")){
     %>
     if (<%=fullJsonPath.Replace("[]", "") %> == undefined ){
        <%=fullJsonPath.Replace("[]", "") %> = new Array();
     }
     <% } %>
    <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> = Encoder.XmlEncode($("#<%: id %>").val());
<% //if ((!this.Model.IsRequired && this.Model.IsAttribute))
    if (!this.Model.IsRequired)
   { %>
    if (<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> == "" && forceEmpty() ==  false){
        delete <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>;
    }
<% } %>

<% if ((!this.Model.IsRequired && !this.Model.IsAttribute && (this.Model.MinLength != null ? this.Model.MinLength.Value : 0  ) == 0))
   { %>
   //aa
   log("Prueba si no es requerido se elimina");
   //log(<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>);
   log(<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>);
    if (<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> == "" && forceEmpty() == false){
        log(<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>);
        delete <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>;
    }
<% } %>

        }
    }else{
        log("No se guardan las propiedades de <%=id %>");
    }
}
<%--<% if (this.Model.Name.StartsWith("_arroba_"))
   { %>
$(document).ready(
function(){
        
    }
);
<%} %>--%>
EventManager.Subscribe('onSaveObj<%:idForm%>', saveObj<%:id%>);

function createProps<%:id%>(){
    var createProps = false;
    var parentElement = $("#<%=id %>").parents(".xmlelement:first"); 
    if (parentElement.length > 0){
        if(parentElement.css("display") != "none"){
            createProps = true;
        }else{
            createProps = false;
        }
    }else{
        createProps = true;
    }
    return createProps;
}
function setVal<%:id%>(){
    log("setVal<%:id%>");
    var createProps = false;
    var parentElement = $("#<%=id %>").parents(".xmlelement:first"); 
    if (parentElement.length > 0){
        if(parentElement.css("display") != "none"){
            createProps = true;
        }else{
            createProps = false;
        }
    }else{
        createProps = true;
    }
    if (createProps) {
        log("sí se crean las propiedades de <%=id %>");
//<!-- inicia -->
 <%
    //Crear parents elements hasta llegar al parent inmediato
             //....PArent.Parent.Parent.[muchos]
             // se supone que es una lista a la que se le agregarán elementos
             // esta lista puede tener N parents que debemos asegurarnos de que existen
             // a.b.c.d.e
         
            StringBuilder sbPath3 = new StringBuilder();
            var npaths3 = Model.JsonPath.Split(char.Parse(".")).Where(p => !string.IsNullOrEmpty(p)).Count();
            int niter3 = 0;

            if (!string.IsNullOrEmpty(Request.QueryString["length"]))
            { %>

               <%-- if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                            <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                }--%>
            <%}
             foreach ( var path in  Model.JsonPath.Split(char.Parse(".")).Where(p=>!string.IsNullOrEmpty(p))){
                 niter3 ++;
                 if ((Model.RootForm.IsList && niter3 == 1) == false)
                 {
                     if (npaths3 > niter3)
                     {
                         if (sbPath3.Length > 0)
                             sbPath3.Append(".");
                         sbPath3.Append(path); %>
                    //if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath3.ToString()%> == null){
                    //    <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath3.ToString()%> = new Object(); //test 9928
                    //}
                    if (<%=Model.GetJsonPathMerged(jsonPath, sbPath3.ToString()).Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=Model.GetJsonPathMerged(jsonPath, sbPath3.ToString()).Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object(); //test 9928
                    }
                    <%
                     }
                 }
                 else if ((Model.RootForm.IsList && niter3 == 1)){ 
                 %>
                   if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object(); // test 5243
<%--<% if (Model.MinOccurs == 0)
   { %>
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>._candelete_ ="";
<% } %>   --%>                     

                    }
                 <%}
                 
             }
%>

    if (<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null)
        <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = "<%=value %>";

  <%-- // se trata de datos existentes
    if(typeof setted_<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]").Replace(".","").Replace("[","").Replace("]","")%> == 'undefined'){
        log("nunca se ha seteado el valor de setted_<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]").Replace(".","")%>");
        <%
             var pathex1 = System.Text.RegularExpressions.Regex.Replace(fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]").Replace("tempObject","orObject"), @"___(\d[0-9]*)___", "");
             %>
        var isdefined = true;
        try{
            if(typeof <%= pathex1%> == 'undefined'){
                isdefined= false;
            }
        }
        catch(error){
            isdefined = false;
        }
        if(isdefined){
            log("Sí esta definido <%= pathex1%>");
            <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = <%=pathex1%>;
            var setted_<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]").Replace(".", "").Replace("[", "").Replace("]", "")%> = true;
        }else{
            log("No esta definido <%= pathex1%>");
        }
    }--%>
   
 //<!--temrina--> 
    log("setVal<%:id%> : " + "<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> : " + <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>);
    if (<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> != "__issue__" && <%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %> != "__ISSUE__"){
        $("#<%: id %>").val(decode(<%=fullJsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]") %>));
    
    }else{
        existsIssues<%:idForm%> = true;
    }


    }else{
        log("No se crean las propiedades de <%=id %>");
    }
}
EventManager.Subscribe('onSetData<%:idForm%>', setVal<%:id%>);

<% if (isFormField)
   { %>
$(document).ready(function(){ 
<% if (!isNew)
   { %>
   EventManager.Subscribe('onSetData<%:idForm%>', setVal<%:id%>);
   EventManager.Publish('onSetData<%:idForm%>');
<% } %>
   $("#savebtn<%=id %>").click(function(event){
            event.preventDefault();
           var $form = $('#form_<%=Request.QueryString["idList"] %>'); 
           //Unbind existing validation 
           $form.unbind(); 
           $.validator.unobtrusive.parseDynamicContent($form);
            //onSaveObj<%:idForm%>();
            isValid<%:idForm%> = $("#form_<%=Request.QueryString["idList"] %>").valid();
             if (isValid<%:idForm%>){
                EventManager.Publish('onSaveObj<%:idForm%>');
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
<%} %>

<%= "</script>" %>
    
<%    
    }
    }

 
 %>
				
				<div class="errorMessage"></div>
			
				</div>
				<div class="clear"></div>

				</div>
	        </div>
</div>

<% if (ViewData["formfield"] != null)
   {
        if (((bool)ViewData["formfield"]) == true)
        {%>
   <a class="button principal positive  save "  id="savebtn<%=id %>" href="#"   >guardar</a>
   </fieldset>
   </div>
   </form>
   </div>
    </div>

    <script>
        $(document).ready(function () {

            refreshForm();
            $("#<%:id %>").focus().select();
        });
    </script>
<%      }
   } %>


 