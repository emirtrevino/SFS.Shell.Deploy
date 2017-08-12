
(function ($) {
    $.fn.formConfig = function (options) {
        var defaults = {
            identifierAttribute: 'cfId',
            containerClassName: 'fcContainer',
            inputClassName: 'fcField',
            labelClassName: 'fcLabel',
            groupClassName: 'fcGroup',
            helpClassName: 'fcHelp',
            commentsClassName: 'fcComments',
            iconsPath: '/PEGASO.Adenda.Web/Content/icons/'
        };
        var options = $.extend({}, defaults, options);

        return this.each(
            function () {
                // itera sobre un formulario
                $("#formconfig").dialog({ autoOpen: false, modal: true, draggable: true,
                    buttons: {
                        'Aplicar': function () {
                            jsonConfig.Forms[0].Fields[currentFieldIndex] = currentField;
                            updateField(currentField);

                            $("#formconfig").dialog("close");
                        },
                        'Cancelar': function () {
                            $("#formconfig").dialog("close");
                        }
                    }
                });


                $("." + options.containerClassName).hover(
                    function () {
                        $(this).addClass("hoverConfig");
                        var container = $(this);
                        $(this).prepend("<a href='#' class='configicon' id='lnkconfig'><img src='" + options.iconsPath + "cog.png' border='0'   /></a>");
                        $("#lnkconfig").click(
                            function (event) {
                                //alert("test");
                                event.preventDefault();
                                $("#innerformconfig").tabs();
                                showConfigField(container.attr(options.identifierAttribute).replace("_container", ""));
                                $("#formconfig").dialog("open");
                                //initFormConfig();
                                $('#formconfig #ui-tab-dialog-close').append($('a.ui-dialog-titlebar-close'));

                                //alert($("#formconfig").length);

                            }
                        );
                    },
                    function () {
                        $(this).removeClass("hoverConfig");

                        $(".configicon").remove();
                    }

                );

            });
    };
})(jQuery);
        // actualiza el elemento del objeto y el html
        function updateField(config) {
            config.DisplayText =  $("#DisplayText").val();
            config.Help = $("#Help").val();

            config.DataSource = new Object();
            config.DataSource.Type = $("#sourceType").val();
            config.URI = $("#uri").val();
            config.UIType = $("#dsTypeListSelect").val();
            var params = $("#dsParamsListItems").find("li");
            config.DataSource.Parameters = new Array();
            var param = null;
            for (var i = 0; i < params.length ; i++) {
                param = $(params[i]);
                config.DataSource.Parameters[i] = new Object();
                if (param.attr("forCfId") != '' && param.attr("forCfId") != null) {
                    config.DataSource.Parameters[i].CfId = param.attr("forCfId");
                } else if ((param.attr("paramValue") != '' && param.attr("paramName") != '') || (param.attr("paramValue") != null  && param.attr("paramName") != null)) {
                    config.DataSource.Parameters[i].Name = param.attr("paramName");
                    config.DataSource.Parameters[i].FixValue = param.attr("paramValue");
                }
            }
            if ($("#dsDisplayText").val() != '') {
                config.DataSource.TextProperty = $("#dsDisplayText").val();
            }
            if ($("#dsDisplayValue").val() != '') {
                config.DataSource.ValueProperty = $("#dsDisplayValue").val();
            }


            return config;
            //jsonConfig.Forms[0].Fields[currentFieldIndex] =  config;
//            var dc = $('[cfId="' + config.Id + '_container"]');
//            $('[cfId="' + config.Id + '_label"]').text(config.DisplayText);

//            if (config.Help.length > 0) {
//                if ($('[cfId="' + config.Id + '_help"]').length > 0) {
//                    $('[cfId="' + config.Id + '_help"]').show();
//                    $('[cfId="' + config.Id + '_help"]').attr('title', config.Help);
//                } else {
//                    $('[cfId="' + config.Id + '_label"]').after('<span class="help"> <a href="javascript:void(0)" class="helpt" title="' + config.Help + '" cfId="' + config.Id + '_help"> ? </a> </span>');
//                }
//            } else {
//                $('[cfId="' + config.Id + '_help"]').hide();
//            }


        }
        // crea el field cuando no existe, cuando es nuevo
        function newConfigField(id) {
            var field = new Object();
            // general
            var dc = $('[cfId="' + id + '_container"]');
            field.Id = id;
            field.DisplayText = $.trim($('[cfId="' + id + '_label"]').text());
            if ($('[cfId="' + id + '_help"]').length > 0) {
                field.Help = $.trim($('[cfId="' + id + '_help"]').attr("title"));
            } else {
                //dc.find(".desc").append("<span class='help'><a href='#'  class='helpt'>?</a></span>");
            }
            
            field.Comments = "";
            // datos
            field.DataSource = new Object();
            field.DataSource.Type = '';

//            if ($("#sourceType").val() != '') {
//                field.DataSource = new Object();

//                field.DataSource.Type = $("#sourceType").val();
//                if (field.DataSource.Type == "fixedList") {
//                    field.DataSource.IdList = $("#lists").val();

//                }
//                field.DataSource.HierarchyType = $("#hierarchyType").val();
               

//            } else { 
//            
//            }
            // eventos

            return field;
        }

        function newConfigDataSource() {
            var result = new Object();
            result.Type = "FixLocal";
            result.URI = "";
            result.ValueProperty = "Value";
            result.TextProperty = "Text";
            //result.HierarchyType = $("")
            return result;
        }
        function newConfigEvent() {
            var result = new Object();
            result.EventType = "OnChange";

            return result;
        }

        window.getParameterByName = function (name) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(window.location.href); if (results == null) return ""; else return decodeURIComponent(results[1].replace(/\+/g, " ")); }
