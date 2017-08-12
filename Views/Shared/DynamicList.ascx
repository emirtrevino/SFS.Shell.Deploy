<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.DynamicUI>" %>
<% 
    string id = Model.Id;
    string jsonPath = "tempObject" + Model.RootForm.Id;
    if (!string.IsNullOrEmpty(Request.QueryString["jsonPath"])) {
        jsonPath = Request.QueryString["jsonPath"];
    }
    string idForm = "";
    if (!string.IsNullOrEmpty(Request.QueryString["idList"]))
    {
        idForm = Request.QueryString["idList"];
    }
    else
    {
        idForm = Model.RootForm.Id;
    }
     %>

<div id="listContainer<%=id %>" class="ListContainer">
<table class="simple-list nowrap-table">
<thead>
<tr class="headers">
<td style=" width:28px"></td>
<% 
    
    string value = "";
    if (Model.ListColumns.Count > 0)
    {
        foreach (var item in Model.ListColumns)
        {   %>
<td><%: item.DisplayName%> </td>
<%    }
    }
    else
    { %>
        <td><%: Model.DisplayName%></td>
    <%} %>

</tr>
</thead>
<tbody id="List<%=id %>">

</tbody>
</table></div>
<%
    //if (Model.Id.StartsWith("lineItem"))
    //{
    //    Model.MinOccurs = 2;
    //    Model.MaxOccurs = 4;
    //}
       %>
<%  var tests = Model.RestrictionsHtmlAttributes;
    StringBuilder sbRestrictions = new StringBuilder();
    if (this.Model.MinValue != null || this.Model.MaxValue != null)
   {
       
       if (this.Model.MinValue != null && this.Model.MaxValue != null)
            sbRestrictions.Append("Debe agregar entre ");
       else if (this.Model.MinValue != null && this.Model.MaxValue == null )
           sbRestrictions.Append("Debe agregar por lo menos ");
       else if (this.Model.MinValue == null && this.Model.MaxValue != null )
           sbRestrictions.Append("Debe agregar como máximo ");
           
       if (this.Model.MinValue != null)
       {
           sbRestrictions.Append(this.Model.MinValue.Value.ToString());
           
       }
       if (this.Model.MinValue != null && this.Model.MaxValue != null)
           sbRestrictions.Append(" y ");
       
       if (this.Model.MaxValue != null)
       {
           sbRestrictions.Append(this.Model.MaxValue.Value.ToString());
        }

       sbRestrictions.Append(" registros");

  }%>
  <% if (sbRestrictions.Length > 0)
     { %>
     <span style="color:Red; font-weight:bold;"><%=sbRestrictions.ToString()%></span><br />
  <% } %>


<%= "<script id='ListItem" + id +"' type='text/x-jquery-tmpl'>" %>
<tr id="row_{{=index}}" >
<td><a class="linktoedit" href="javascript: void(0);" onclick="showDetails<%=id %>({{=index}});"><img src="<%=ResolveUrl("~/") %>Content/icons/pen.png" border="0" /></a> <a class="linktodelete" href="javascript: void(0);" onclick="delete<%=id %>({{=index}});"><img src="<%=ResolveUrl("~/") %>Content/delete.png" border="0" /> </a></td>
<%
    if (Model.ListColumns.Count > 0)
    {
        foreach (var item in Model.ListColumns)
        {   %>
<td>{{=$ctx.textValue(<%: item.Name%>)}} </td>
<%    }
    }
    else
    { %>
        <td class="cont">{{=$ctx.textValue(<%: Model.Name %>)}}</td>
    <%} %>

</tr>
	
<%= "</script>"%>	    
<% 
    var popupModel = new SFSdotNet.Framework.Web.Mvc.Models.PopupModel() { FunctionName = "popup" + id, OnCloseFunction = "fooTest" + id, TargetClassName = "", ProxyId = "popupproxy" + id, StartUrl = ResolveUrl("~/") + "Dynamicforms/FormPopup?idList=" + id + "&parentId=" + Model.RootForm.Id + "&jsonPath=" + Model.GetJsonPathMerged(jsonPath, Model.JsonPath) + "&length=0&xPath=" + Model.XPath + "&xsdUrl=" + Url.Encode(Model.RootForm.SchemaUrl) };
    
    Html.RenderPartial("PopupView", popupModel); 

    //var button = ButtonLinkModel.GetForPopUp(GlobalMessages.ADD, 2, "add", ResolveUrl("~/") + ", "fooTest" + id);
    ButtonLinkModel button = (ButtonLinkModel)ButtonLinkModel.GetCustomScript(GlobalMessages.ADD, 2, "add", "add" + id + "();");
    button.Id ="btnAdd" + id;
    button.BlockUI = false;
    Html.RenderPartial("ButtonLink", button);
    string jsonPathPopup = "";
    //Model.GetJsonPathMerged(jsonPath, Model.JsonPath)
    if (!string.IsNullOrEmpty(Request.QueryString["xPath"]))
    { // asumiendo que es un popup de lista
        jsonPathPopup = jsonPath;
    }
    else {
        jsonPathPopup = Model.GetJsonPathMerged(jsonPath, Model.JsonPath);
    }
     %>
<%="<script>" %>
    
    var length<%=id %> = 0;
    function add<%=id %>(){ // funcion proxy para abrir el propup
        log("start: add<%=id %>");
        popupSaved<%=id %> = false;
        <%
             //Crear parents elements hasta llegar al parent inmediato
             //....PArent.Parent.Parent.[muchos]
             // se supone que es una lista a la que se le agregarán elementos
             // esta lista puede tener N parents que debemos asegurarnos de que existen
             // a.b.c.d.e
         
            StringBuilder sbPath = new StringBuilder();
            var npaths = Model.JsonPath.Split(char.Parse(".")).Where(p => !string.IsNullOrEmpty(p)).Count();
            int niter = 0;

            if (!string.IsNullOrEmpty(Request.QueryString["length"]))
            { %>

               <%-- if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                            <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                }--%>
            <%}
             foreach ( var path in  Model.JsonPath.Split(char.Parse(".")).Where(p=>!string.IsNullOrEmpty(p))){
                 niter ++;
                 if ((Model.RootForm.IsList && niter == 1) == false)
                 {
                     if (npaths > niter)
                     {
                         if (sbPath.Length > 0)
                             sbPath.Append(".");
                         sbPath.Append(path); %>
                    if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath.ToString()%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath.ToString()%> = new Object();
                    }
                    <%
                     }
                 }
                 
             }

            var test = jsonPath;
            
             %>        
       <%-- if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
            }--%>
            // zz.zz[]
            <% 
                if (jsonPath.EndsWith("[]"))
                {   // el ultimo [] debe ser sustituido antes de tener
                    // que agregar otro child
                    jsonPath = jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]"); %>

                if (length<%=id %> == null)
                    length<%=id %> = <%= int.Parse(Request.QueryString["length"]) %>;
                
            log(length<%=id %>);        
            var newJsonPath<%=id%> = "<%= Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "[" + "\" + length" + id + ".toString() +\"]")%>";
            $("#popupproxy<%=id%>").attr("href",$("#popupproxy<%=id%>").attr("startUrl"));
            $("#popupproxy<%=id%>").attr("href", replaceQueryString($("#popupproxy<%=id%>").attr("startUrl"),"jsonPath", newJsonPath<%=id%>));
            
            <% }
                else { %>
            $("#popupproxy<%=id%>").attr("href",$("#popupproxy<%=id%>").attr("startUrl"));
                
<%                }%>
        //$("#popupproxy<%= id%>").href("")
        popup<%=id %>();
        $("#popupproxy<%= id%>").click();
        log("end: add<%=id %>");
    }
    <%--$("#btnAdd<%=id %>").click(
        function (){
            
        }
    );--%>
    function sureCreatePath<%=id %>(){
    log("start sureCreatePat<%=id %>");
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
                    if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath2.ToString()%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath2.ToString()%> = new Object(); // test 8374
                    }
                    <%
                     }
                 }
                 else if ((Model.RootForm.IsList && niter2 == 1)){ 
                 %>
                   if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                    }
                 <%}
                 
             }
%>
 //<!--temrina-->
     log("end sureCreatePat<%=id %>");

    }
    function setLength<%=id %>(){
        log("start: setLength<%=id %>");
        <%
            
            string jsonPath2 = jsonPath;
            if (jsonPath.EndsWith("[]"))
                jsonPath2 = jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]");
             %>
        log("nace jsonpath2: " + "<%=jsonPath2%>");
        sureCreatePath<%=id %>();

        if (<%=Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", "")%> !=null){
            length<%=id %> = <%=Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", "")%>.length;
            log("array: <%=Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", "")%>");
            log("tamaño array: " + length<%=id %>);

            //alert(length<%=id %>);
        }
        log("setLength:" +  length<%=id %>);
        $("#popupproxy<%=id %>").attr("startUrl", replaceQueryString($("#popupproxy<%=id %>").attr("startUrl"),"length", length<%=id %>));
        log("setLength: " + $("#popupproxy<%=id %>").attr("startUrl"));
        $("#pvl_<%= id%>").val(length<%=id %>);
        log("end: add<%=id %>");
    }
    $(document).ready(function () {
    log("ready: List<%=id %>");
<% %>
        var existItems = true;
        try {
            if (typeof <%=Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", "")%>  == 'undefined') {
                existItems = false;
            }
        } catch (error) {
            existItems = false;
        }
        if (existItems) {
            log("existItems <%=id %>:" + existItems);

            copyValues<%=id %>();
            refresh<%=id %>();
            setLength<%=id %>();

        }
        popupSaved<%=id %> = false;
    });
    function copyValues<%=id %>(){
      <%--  log("copyValues<%=id %>");
            <% string pathN = Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", ""); %>
            if(typeof setted_<%= pathN.Replace(".","").Replace("[","").Replace("]","")%> == 'undefined'){
                log("No se había seteado la lista <%=id %>");
                <% string path1 = System.Text.RegularExpressions.Regex.Replace(pathN, @"___(\d[0-9]*)___", "").Replace("tempObject", "orObject"); %>
                var isdefined = true;
                try {
                      if (typeof <%=path1%> == 'undefined'){
                        isdefined = false;
                      }
                }catch(error){
                    isdefined = false;
                }

                if (isdefined){
                    sureCreatePath<%=id %>();
                    if (typeof <%=pathN %> == 'undefined'){
                        <%=pathN %> = new Array();
                    }
                    log("La lista Sí esta definida <%=id %>");
                    for (var i = 0; i < <%=path1%>.length; i++) {
                        <%=pathN %>[i] = new Object();
<% foreach (var field in Model.ListColumns)
   { %>
                            <%=pathN %>[i].<%=field.Name %> = <%=path1 %>[i].<%=field.Name %>;
                             
<%} %>                    }
                }else{
                    log("La lista No esta definida <%=id %>");
                }
<% if(Model.Name.Contains("lineItem")) { %>
               
<%} %>
                var setted_<%=Model.GetJsonPathMerged(jsonPath2, Model.JsonPath).Replace("[]", "").Replace(".", "").Replace("[", "").Replace("]", "")%> = true;
            }--%>
    }


    function verifyIssues<%=id %>(data){
    log("verifyIssues<%=id %>");
        var errors = 0;
            for (var i = 0; i < data.length ; i++) {
                if (propertyPathContainsValue(data[i], "__issue__")){
                    errors ++;
                    
                    $("#listContainer<%=id %> tbody tr").eq(i).addClass("input-validation-error");
                }
            }
            log("issues encontrados <%=id %>: " + errors );
            if (errors > 0){
                $("#issues_<%=id %>").val("");
                if (typeof existsIssues<%:idForm%> == 'undefined'){
<%--                if (existsIssues<%:idForm%> == false)
                {
--%>                     existsIssues<%:idForm%> = true;
                }
                $("#listContainer<%=id %>").addClass("input-validation-error");
            }else{
       

                $("#issues_<%=id %>").val("0");
                $("#listContainer<%=id %>").removeClass("input-validation-error");
                
            }

    }

    function refresh<%=id %>() {
<%--    <% if (Model.Name.Contains("lineItem"))
       { %>
       aaa
    <% } %>--%>
        log("start refresh: <%=id %> : ");

        $('#List<%=id %>').empty();
        
        <% string _jsonPath = "";
            if (jsonPath.EndsWith("[]"))
           {
               _jsonPath = jsonPath.Remove(jsonPath.Length -2,2); %>
               
<%
           }

           if (jsonPath.EndsWith("[]"))
           {   // se trata de un nuevo registro y esta es una lista del nuevo registro

                int length = int.Parse(Request.QueryString["length"]); %>
                //alert(length);
                //if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> != null){ // nuevo registro
                    //var data<%=id %> = <%=Model.GetJsonPathMerged(jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]"), Model.JsonPath).Replace("[]", "")%>;
                   // <!-- inicia -->
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
                    if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath3.ToString()%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath3.ToString()%> = new Object();
                    }
                    <%
                     }
                 }
                 else if ((Model.RootForm.IsList && niter3 == 1)){ 
                 %>
                   if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                    }
                 <%}
                 
             }
%>
                //<!--temrina-->
                var data<%=id %> = <%=Model.GetJsonPathMerged(jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]"), Model.JsonPath).Replace("[]", "")%>;
        <%  }
           else // se trata de un registro existente y esta es una lista de ese registro
           { %>
           log("Antes de data registro existente");
           
           var data<%=id %> = null; // registro existente
           // if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> != null){
           //     data<%=id %> = <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%>;
           // }
          //                     <!-- inicia -->
 <%
    //Crear parents elements hasta llegar al parent inmediato
             //....PArent.Parent.Parent.[muchos]
             // se supone que es una lista a la que se le agregarán elementos
             // esta lista puede tener N parents que debemos asegurarnos de que existen
             // a.b.c.d.e
         
            StringBuilder sbPath4 = new StringBuilder();
            var npaths4 = Model.JsonPath.Split(char.Parse(".")).Where(p => !string.IsNullOrEmpty(p)).Count();
            int niter4 = 0;

            if (!string.IsNullOrEmpty(Request.QueryString["length"]))
            { %>

               <%-- if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                            <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                }--%>
            <%}
             foreach ( var path in  Model.JsonPath.Split(char.Parse(".")).Where(p=>!string.IsNullOrEmpty(p))){
                 niter4 ++;
                 if ((Model.RootForm.IsList && niter4 == 1) == false)
                 {
                     if (npaths4 > niter4)
                     {
                         if (sbPath4.Length > 0)
                             sbPath4.Append(".");
                         sbPath4.Append(path); %>
                    if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath4.ToString()%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%>.<%=sbPath4.ToString()%> = new Object();
                    }
                    <%
                     }
                 }
                 else if ((Model.RootForm.IsList && niter4 == 1)){ 
                 %>
                   if (<%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> == null){
                        <%=jsonPath.Replace("[]", "[" + Request.QueryString["length"] + "]")%> = new Object();
                    }
                 <%}
                 
             }
%>
// <!--temrina-->
   
        if (<%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%> != null){
            if ((<%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%> instanceof Array) == false){
                // no viene como array, debe corregirse, con seguridad es un elemento
                var temp<%=id %>_fr = <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%>;
                <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%> = new Array();
                <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%>[0] = temp<%=id %>_fr;
            }
        }
         var   data<%=id %> = <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%>;

           log("Despues de data");

        <%  } %>
        if (data<%=id %> != null ){ 
            
            log("data: " + data<%=id %>.length);
           var indexadded = false;
            for (var i = 0; i <= data<%=id %>.length -1; i++) {
                if (typeof( data<%=id %>[i] ) == "string"){
                    log("error en lista: <%=id %>: " + data<%=id %>[i] )
                }else{
                    data<%=id %>[i].index = i;
                    indexadded= true;
                    log("adding index to row");
                }
            }
            $.views.registerHelpers({ getSafeKeyId: function (text) { return text.replaceAll("+", ""); } });
            $.views.registerHelpers({ textValue: function (text) { 
               
                if (text  == undefined || typeof(text)  == 'undefined' )

                    return "";
                else
                    if (text != null)
                        if (text == "__issue__")
                            return "";
                        else
                            return text;
                    else
                        return "";
             } });
            var html = $('#ListItem<%=id %>').render(data<%=id %>);
            
            $('#List<%=id %>').html(html);

            verifyIssues<%=id %>(data<%=id %>);

            if (indexadded == false){
                SetIndexesToList("<%=id %>");
                ChangeUndefidiesToValues("<%=id %>", data<%=id %>);
            }
            log("end template"); 
            if (indexadded == true){
                for (var i = 0; i <= data<%=id %>.length -1; i++) {

                    delete data<%=id %>[i].index;
                }
            }

        }
        <% if (jsonPath.EndsWith("[]"))
           { %>
           }
        <% }%>
        refreshForms();
    }
    function showDetails<%:id %>(index) {
        if ($("#popupproxy<%=id %>").attr("hrefAdd") == null )
            $("#popupproxy<%=id %>").attr("hrefAdd", $("#popupproxy<%=id %>").attr("href")); // se copia como respaldo
        var arrayPoint = "[" + index.toString() + "]";
        //alert(index);
        $("#popupproxy<%=id %>").attr('href', '<%=ResolveUrl("~/") %>Dynamicforms/FormPopup?parentId=<%: Model.RootForm.Id %>&idList=<%:id %>&jsonPath=' + '<%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath)%>'.replace('[]', arrayPoint) + '&xPath=<%=Model.XPath %>&xsdUrl=<%=  Url.Encode(Model.RootForm.SchemaUrl) %>&isNew=false&index=' +index);
         popup<%=id %>();
        $("#popupproxy<%=id %>").click();
    }

    function delete<%:id %>(index){
        
        <%=Model.GetJsonPathMerged(jsonPath, Model.JsonPath).Replace("[]", "")%>.remove(index);
        refresh<%=id %>();
        setLength<%=id %>();

    }
    function fooTest<%:id %>() {
        EventManager.UnSubscribeAll('onSaveObj<%:id %>');
        EventManager.UnSubscribeAll('onSetData<%:id%>');
       //Registry = [];
       
        log("fooTest<%:id %>()");
        if ($("#popupproxy<%=id %>").attr("hrefAdd") != null )
            $("#popupproxy<%=id %>").attr('href', $("#popupproxy<%=id %>").attr("hrefAdd")); // se recupera el respaldo
       //alert(popupSaved<%=id %>);
       
       if ( popupSaved<%=id %> == true)
       {
            log(popupSaved<%=id %>);
            setLength<%=id %>();
            popupSaved<%=id %> = false;
        }

    }
<%="</script>" %>


<input type="hidden" name='pvl_<%=id %>' id='pvl_<%=id %>' <%=Model.RestrictionsHtmlAttributes %> value="0" />
<%
    
    
     %>
<input type="hidden" id='issues_<%=id %>' name='issues_<%=id %>' data-val-required='Existe un error en la lista <%= Model.DisplayName %>' value='0' data-val='true' />
