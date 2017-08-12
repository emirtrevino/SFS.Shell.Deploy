<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<%--<% if (!string.IsNullOrEmpty(Request.QueryString["config"]))
   { %>--%>
   <script type="text/javascript" src="<%=ResolveUrl("~/") %>Scripts/FormConfig.js" ></script>

   
<%--<%} %>--%>
<div class="formconfig" id="formconfig">
<script>
    
    var currentField = null;
    var currentFieldIndex = null;
  
    function currentConfigField(id) {
        var index = ArrayIndexOf(jsonConfig.Forms[0].Fields, function (elem) {
            return elem.Id == id;
        });
        if (index == -1) {
            // no existe
            currentField = newConfigField(id);

            currentFieldIndex = 0;
        } else {
            currentField = jsonConfig.Forms[0].Fields[index];
            currentFieldIndex = index;
        }
    }

    function showConfigField(id) {
        currentConfigField(id);
        $("#fieldId").val(currentField.Id);
        $("#DisplayText").val(currentField.DisplayText);
        $("#Comments").val(currentField.Comments);
        $("#Help").val(currentField.Help);
        $("#uri").val(currentField.DataSource.URI);
        $("#dsDisplayText").val(currentField.DataSource.TextProperty);
        $("#dsDisplayValue").val(currentField.DataSource.ValueProperty);
        //datos
        if (currentField.DataSource != null)
            if (currentField.DataSource.Type != null)
                $("#sourceType").val(currentField.DataSource.Type);
        // parámetros para envio
        if ($("#sourceType").val() == '') {
            $("#dsParamsSend").hide();

        } else {
            $("#dsParamsSend").show();
            $("#dsParamsList").show();
            // llenar lista de parametros
            if (currentField.DataSource.Parameters.length > 0) {
                $("#dsParamsListItems").empty();
                for (var i = 0; i < currentField.DataSource.Parameters.length; i++) {
                    if (currentField.DataSource.Parameters[i].CfId != null && currentField.DataSource.Parameters[i].CfId != '') {

                        $("#dsParamsListItems").append("<li forCfId='" + currentField.DataSource.Parameters[i].CfId + "'> <a href='javascript:void(0);' onclick='deleteParam(this);'>Eliminar</a> " + $('[cfId="' + currentField.DataSource.Parameters[i].CfId + '_label"]').text() + " (" + $('[cfId="' + currentField.DataSource.Parameters[i].CfId + '_input"]').val() + ") </li>");
                    } else if (currentField.DataSource.Parameters[i].Name != '' && currentField.DataSource.Parameters[i].FixValue != '') {
                        $("#dsParamsListItems").append("<li paramType='fixed' paramName='" + currentField.DataSource.Parameters[i].Name + "' paramValue='" + currentField.DataSource.Parameters[i].FixValue + "'> <a href='javascript:void(0);' onclick='deleteParam(this);'>Eliminar</a> " + currentField.DataSource.Parameters[i].Name + " (" + currentField.DataSource.Parameters[i].FixValue + ") </li>");
                    }
                }
            } else {
                //
                $("#dsParamsListItems").empty();
            }
            
        }

    }
</script>
       
        <script>
            
        </script>
        <div id="innerformconfig">
             <ul id="config_tabs">
			     <li><a href="#conf_general">General</a></li>
			     <li><a href="#conf_sources">Datos</a></li>
                 <li><a href="#conf_visibility">Visibilidad</a></li>
			     <li><a href="#conf_events">Eventos</a></li>
			     <li id="ui-tab-dialog-close"></li>
		     </ul>
             <div id="config_content">
             <div id="conf_visibility">
                
             </div>
			    <div id="conf_general">
				   <form>
	                <fieldset><legend>test</legend>
                        <label for="fieldId">Id</label>
                        <input type="text" name="fieldId" id="fieldId" value="" />

                        <label for="DisplayText">Texto</label>
                        <input type="text" name="DisplayText" id="DisplayText" value="" />

                        <label for="Comments">Comentarios</label>
                        <input type="text" name="Comments" id="Comments" value="" />

                        <label for="Help">Ayuda</label>
                        <input type="text" name="Help" id="Help" value="" />

                    </fieldset>
                    </form>
			    </div>
			    <div id="conf_sources">
               <%-- <script>
                    $(document).ready(
                        function () {
                            $("#sourceType").change(function () { 
                                
                            });
                        }
                    );
                </script>--%>
				    <form>
	                <fieldset><legend>Fuentes de datos</legend>
                        <label for="sourceType">Id</label>
                        <select id='sourceType' name='sourceType'>
                            <option value='' selected="selected">Ninguna</option>
                            <option value='fixedList'>Lista fija</option>
                            <option value='sqlquery'>Consulta SQL</option>
                            <option value='soapservice'>Servicio SOAP</option>
                            <option value='jsonservice'>Servicio JSON</option>
                        </select>
                        <div id='dservice'>
                        <label for="uri">URI</label>
                        <input  id='uri' name='uri' type='text'/>
                        </div>
                        <div id='dsqlquery'>
                        <label for="sql">Consulta</label>
                        <textarea rows="5" id='sql' name='sql' cols='60' ></textarea>
                        </div>
                        <div id='dfixedList'>
                        <label for="lists">Lista </label>
                        
                     <select id='lists' name='lists' >
                        <option value=''> Nuevo...</option>
                     </select>
                    <label for="listNameNew">Nueva lista</label>
                    <input id='listNameNew' name='listNameNew' type="text"  /> <a href="#" id="lnkAddList" >Agregar</a>
                    <label for="listItems">Elementos de la lista</label>
                    <select id='listItems' name='listItems' multiple="multiple" >
                       
                     </select>
                     <a href="#" id="lnkDeleteItem">Eliminar</a>
                     <label for="listItemValue">Nuevo elemento</label>
                      valor: <input id='listItemValue' name='listItemValue' type="text"  />
                      texto: <input id='listItemNameNew' name='listItemNameNew' type="text"  /> <a href="#" id="lnkAddListItem" >Agregar</a>

                      <label for='hierarchyType'> Jerarquía</label>
                    <select id='hierarchyType' name='hierarchyType' >
                     <option value='none' selected='selected'>Sin jerarquía</option>
                       <option value='oneselect' >Solo una selección </option>
                       <option value='multiselect'>Múltiple selección</option>
                      
                     </select>

                        </div>

                        <label for="dsTypeListSelect">Tipo de lista</label>
                        <select id="dsTypeListSelect" name="dsTypeListSelect">
                            <option value="autocompletefree">Autocompletar libre</option>
                            <option value="autocomplete">Autocompletar restringido</option>
                            <option value="dropdown" selected="selected">Combo simple</option>
                            <option value="lookup">Herramienta de búsqueda</option>
                        </select>
                        <div id="dsParamsSend">
                            <strong> Parámetros</strong>
                            <div id="dsParamInputSec">

                            <label for="dsParamsSendSelect">Agregar parámetro</label>
                            <select id="dsParamsSendSelect">
                                <option value="">Sin parámetros</option>
                                <option value="fixed">Parámetro fijo</option>
                                <option value="input">Campo en la forma</option>

                            </select>
                            <select id="dsParamSendInputs">
                            </select>
                            </div>
                            <div id="dsParamFixedSec">
                            <label>Parámetro fijo</label>
                            Nombre: <input type="text" value="" id="dsFixedParamName" /><br />
                            Valor: <input type="text" value="" id="dsFixedParamValue" />
                            </div>
                            
                            <a href="#" id="lnkAddParam">Agregar parámetro</a>
                            <div id="dsParamsList">
                            <ol id="dsParamsListItems">
                               <%-- <li id="" valueCfdi="" valueDisplay="" valueParam=""> </li>--%>
                               
                            </ol>
                            </div>
                         
                        
                        </div>
                        <div id="dsTextAndValue">
                            <strong> Campos a usar</strong>
                            <label for="dsDisplayText">Display Text</label>
                            <input type="text" id="dsDisplayText"  />

                            <label for="dsDisplayValue">Display Value</label>
                            <input type="text" id="dsDisplayValue"  />


                        </div>
                        
                    </fieldset>
                    </form>
                    <script>
                        // traer las listas fijas existentes
                        function getLists() {
                            var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/GetFixedLists';
                            callServerGet(urlAction, getListsDone);
                        }
                        function getItemsOfList() {
                            var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/GetListItems?listId=' + $("#lists").val();
                            callServerGet(urlAction, getItemsOfListDone);
                        }
                        function getItemsOfListDone(data) {
                            $("#listItems").fill({ data: data });
                            $("#listItems").append("<option value=''>Nuevo...</option>");
                            $("#listItemValue").val("");
                            $("#listItemNameNew").val("");
                        }

                        function addListDone(data) {
                            $("listNameNew").val("");
                            getLists();
                        }
                        function addListItemDone(data) {
                            $("listItemNameNew").val("");
                            getItemsOfList();
                        }
                        function getListsDone(data) {
                            $("#lists").fill({ data: data });
                            $("#lists").append("<option value='' selected='selected'>Nuevo...</option>");
                        }
                        function deleteItemDone(data) {
                            getItemsOfList();
                        }
                        function fillAllInputs() {

                            $("#dsParamSendInputs").empty();
                            var items = new Array();

                            for (var i = 0; i < $('.field').length - 1; i++) {
                                var field = $($('.field')[i]);
                                if (field.attr("cfId") != '') {
                                    var label = $('[cfId="' + field.attr("cfId").replace("_input", "") + '_label"]');  //$("#" + field.attr("cfId").replace("_input", "_label"));
                                    if (label.length > 0 ){
                                        var item = new Object();
                                        item.Value = field.attr("cfId");
                                        item.Text = label.text(); //
                                        items[i] = item;
                                    }
                                }
                            }

                            $("#dsParamSendInputs").fill({ data: items });

                        }

                        function initJSON() {

                        }
                        function initAllDataSources() {
                            $("#dsParamsSendSelect").change(function () {
                                if ($(this).val() == '') {
                                    // sin parámetros
                                    $("#dsParamFixedSec").hide();
                                    $("#dsParamSendInputs").hide();

                                } else if ($(this).val() == 'fixed') {
                                    // parametro fijo
                                    $("#dsParamSendInputs").hide();
                                    $("#dsParamFixedSec").show();
                                } else if ($(this).val() == 'input') {
                                    $("#dsParamSendInputs").show();
                                    $("#dsParamFixedSec").hide();
                                    fillAllInputs();
                                }
                            });

                            $("#lnkAddParam").click(function (event) {
                                event.preventDefault();
                                if ($("#dsParamsSendSelect").val() == 'input') {
                                    $("#dsParamsListItems").append("<li paramType='input' forCfId='" + $("#dsParamSendInputs").val().replace("_input", "") + "' ><a href='javascript:void(0)' class='dsParamsDel' onclick='deleteParam(this);' >Eliminar</a> " + $("#dsParamSendInputs").find("option:selected").text() + " (" + $('[cfId="' + $("#dsParamSendInputs").val() + '"]').val() + ")</li>");
                                } else if ($("#dsParamsSendSelect").val() == 'fixed') {
                                    $("#dsParamsListItems").append("<li paramType='fixed' paramName='" + $("#dsFixedParamName").val() + "' paramValue='" + $("#dsFixedParamValue").val() + "' ><a href='javascript:void(0)' class='dsParamsDel' onclick='deleteParam(this);' >Eliminar</a> " + $("#dsFixedParamName").val() + " (" + $('#dsFixedParamValue').val() + ")</li>");
                                }

                                $("#dsFixedParamName").val("");
                                $("#dsFixedParamValue").val("");

                            });


                        }
                        function deleteParam(elem) {
                            $(elem).parent("li").remove();
                            return false;
                        }
                        function initFixedList() {
                            $("#lnkDeleteItem").click(function (event) {
                                event.preventDefault();
                                var selectedOptions = $('#listItems option:selected');

                                var selectedValues = $.map(selectedOptions, function (option) {
                                    return option.value;
                                }).join('|');
                                var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/RemoveItemsOfFixedList?listId=' + $("#lists").val() + '&values=' + selectedValues;
                                callServerGet(urlAction, deleteItemDone);


                            });
                            // traer listas
                            getLists();
                            $("#lnkAddList").click(function (event) {
                                event.preventDefault();
                                if ($("#listNameNew").val() != '') {
                                    var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/CreateFixedList?name=' + $("#listNameNew").val();
                                    callServerGet(urlAction, addListDone);
                                } else {

                                }
                            });

                          
                            $("#lnkAddListItem").click(function (event) {
                                event.preventDefault();
                                if ($("#listItemNameNew").val() != '') {
                                    var urlAction = '<%=ResolveUrl("~/") %>DynamicForms/AddItemToFixedList?listId=' + $("#lists").val() + '&value=' + $("#listItemValue").val() + '&text=' + $("#listItemNameNew").val();

                                    callServerGet(urlAction, addListItemDone);
                                } else {

                                }
                            });
                            //                            $("#lists").change(function () {
                            //                                if ($(this).val() == '') {
                            //                                    //se ha seleccionado nueva lista
                            //                                    
                            //                                } else { 
                            //                                    
                            //                                }
                            //                            });
                        }
                        $(document).ready(

                            function () {
                               

                                $("#dfixedList").hide();
                                //initFixedList();
                                $("#lnkDeleteItem").hide();
                                $("#dservice").hide();
                                $("#dsqlquery").hide();
                                $("#lists").change(function () {
                                    if ($(this).val() == '') {
                                        $("#listNameNew").show();
                                        $("#lnkAddList").show();
                                    } else {
                                        $("#listNameNew").hide();
                                        $("#lnkAddList").hide();

                                        getItemsOfList();
                                    }
                                });
                                $("#listItems").change(function () {
                                    if ($(this).val() == '') {
                                        $("#lnkDeleteItem").hide();
                                    } else {
                                        $("#lnkDeleteItem").show();
                                    }
                                });
                                $("#sourceType").change(
                                    function () {
                                        if ($(this).val() == 'fixedList') {
                                            $("#dfixedList").show();
                                            initFixedList();
                                            $("#dservice").hide();
                                            $("#dsqlquery").hide();
                                            $("#dsParamsSend").show();
                                            startLists();
                                            
                                        } else if ($(this).val() == 'soapservice' || $(this).val() == 'jsonservice') {
                                            $("#dfixedList").hide();

                                            $("#dservice").show();
                                            $("#dsqlquery").hide();
                                            
                                            $("#dsParamsSend").show();
                                        } else if ($(this).val() == 'sqlquery') {
                                            $("#dfixedList").hide();

                                            $("#dservice").hide();
                                            $("#dsqlquery").show();
                                            $("#dsParamsSend").show();
                                        } else {

                                            $("#dfixedList").hide();

                                            $("#dservice").hide();
                                            $("#dsqlquery").hide();
                                            $("#dsParamsSend").hide();
                                        }
                                    }
                                );
                            }
                        );

                        function startLists() {

                        }
                    </script>
			    </div>
			    <div id="conf_events">
				    some jobs
			    </div>
		    </div>

        </div>

</div>
<script>
    $(document).ready(function () {

        var fcParams = {

            applicationId: 'identificadorunico',
            formId: 'formaunica'

        };
        $(".dynamicform").formConfig(fcParams);
        initAllDataSources();
    });

    


   </script>