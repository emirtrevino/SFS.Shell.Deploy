var getCSS = function (prop, fromClass) {

    var $inspector = $("<div>").css('display', 'none').addClass(fromClass);
    $("body").append($inspector); // add to DOM, in order to read the CSS property
    try {
        return $inspector.css(prop);
    } finally {
        $inspector.remove(); // and remove from DOM
    }
};
function setCSS(selector, prop, value) {
    $("head").append('<style type="text/css"></style>');
    var newStyleElement = $("head").children(':last');
    newStyleElement.html(selector + '{ ' + prop + ':' + value + '; }');
}

function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}
function loadCSS(file) {
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", file)
    document.getElementsByTagName("head")[0].appendChild(fileref)
}


Utilities = new Object();
Utilities.require = function (file, callback) {
    //alert("version nueva");
    callback = callback ||
    function () { };
    var filenode;
    var jsfile_extension = /(.js)$/i;
    var cssfile_extension = /(.css)$/i;
    var head = document.head || document.getElementsByTagName("head")[0];

    if (jsfile_extension.test(file)) {
        filenode = document.createElement('script');
        filenode.src = file;
        // IE
        filenode.onreadystatechange = function () {
            if (filenode.readyState === 'loaded' || filenode.readyState === 'complete') {
                filenode.onreadystatechange = null;
                callback();
            }
        };
        // others
        filenode.onload = function () {
            callback();
        };

        head.appendChild(filenode);
    } else if (cssfile_extension.test(file)) {
        filenode = document.createElement('link');
        filenode.rel = 'stylesheet';
        filenode.type = 'text/css';
        filenode.href = file;
        head.appendChild(filenode);
        callback();
    } else {
        console.log("Unknown file type to load.")
    }
};

Utilities.requireFiles = function () {
    var index = 0;
    return function (files, callback) {
        index += 1;
        Utilities.require(files[index - 1], callBackCounter);

        function callBackCounter() {
            if (index === files.length) {
                index = 0;
                callback();
            } else {
                Utilities.requireFiles(files, callback);
            }
        };
    };
}();
function addEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Handler could not be attached");
    }
}

Date.prototype.addDays = function (days) {
    var ms = new Date().getTime() + (86400000 * days);
    var added = new Date(ms);
    return added;
};
(function ($) {

    $.extend({
        playSound: function () {
            if (typeof (soundManager) == "undefined") {
                $.ajax({
                    url: rootSfsAppUrl + "Scripts/soundmanager2/soundmanager2-jsmin.js",
                    dataType: "script",

                    success: function () {
                        alert(soundManager);
                    }
                });
            }
            //return $("<embed src='" + arguments[0] + "' hidden='true' autostart='true' loop='false' class='playSound'>").appendTo('body');
        }
    });

})(jQuery);

String.prototype.contains = function (s) {
    return this.indexOf(s) !== -1;
};
String.prototype.endsWith = function (pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
};
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch (er) { }
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));
/// <reference path="jquery-1.4.4.js" />
/// <reference path="jquery.validate.js" />
/// <reference path="jquery.validate.unobtrusive.js" />

if ($.validator != undefined) {
    $.validator.setDefaults({
        focusCleanup: true,
        focusInvalid: true,
        ignore: "",
        highlight: function (element) {
            if (getUIVersion() == 1) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            } else {
                $(element).closest('.form-group').removeClass('success has-success').addClass('error has-error');
            }
        },
        unhighlight: function (element) {
            if (getUIVersion() == 1) {
                $(element)
            .addClass('valid')
            .closest('.control-group').removeClass('error').addClass('success');
            } else {
                $(element)
           .addClass('valid')
           .closest('.form-group').removeClass('error has-error').addClass('success has-success');
            }
        }
    });
}
(function ($) {
    if ($.validator != undefined) {

        $.validator.unobtrusive.parseDynamicContent = function (selector) {
            //use the normal unobstrusive.parse method
            $.validator.unobtrusive.parse(selector);

            //get the relevant form
            var form = $(selector).first().closest('form');

            //get the collections of unobstrusive validators, and jquery validators
            //and compare the two
            var unobtrusiveValidation = form.data('unobtrusiveValidation');
            var validator = form.validate({
                focusCleanup: true,
                focusInvalid: true
            });

            $.each(unobtrusiveValidation.options.rules, function (elname, elrules) {
                if (validator.settings.rules[elname] == undefined) {
                    var args = {};
                    $.extend(args, elrules);
                    args.messages = unobtrusiveValidation.options.messages[elname];
                    //edit:use quoted strings for the name selector
                    $("[name='" + elname + "']").rules("add", args);
                } else {
                    $.each(elrules, function (rulename, data) {
                        if (validator.settings.rules[elname][rulename] == undefined) {
                            var args = {};
                            args[rulename] = data;
                            args.messages = unobtrusiveValidation.options.messages[elname][rulename];
                            //edit:use quoted strings for the name selector
                            $("[name='" + elname + "']").rules("add", args);
                        }
                    });
                }
            });
        }
    }
})($);
function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
function log(text) {
    if (typeof (console) != 'undefined') {
        if (console != null) {
            if (console.log != undefined) {
                console.log(text);
            }
        }
    }
}
function isPathObjectUndefined(obj) {
    var result = false;
    try {
        if (typeof obj == 'undefined') {
            result = true;
        }
    } catch (e) {
        result = true;
    }
    return result;
}
function prepareTabs() {
    //$('.tabs').bind('change', function (e) {
    //    var now_tab = e.target;
    //    var link = $(now_tab).attr('href');
    //    $.ajax({

    //        url: url,
    //        dataType: "html",
    //        cache: false,
    //        success: function (data) {
    //            $("#" + ).html(data);
    //        }
    //    });

    //});

}

function convertDateLocale(text) {
    var date = convertUTCToLocal(text);
    return date.toISOString();
}
jQuery.fn.resetSummary = function () {
    var form = this.is('form') ? this : this.closest('form');
    form.find("[data-valmsg-summary=true]")
        .removeClass("validation-summary-errors")
        .addClass("validation-summary-valid")
        .find("ul")
        .empty();
    return this;
};
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
function onChangeField(jqElement, eventHandler) {


    if (jqElement.hasClass("datetime")) {
        $("#div-con-" + jqElement.attr("id")).on("changeDate", function (e) {
            eventHandler(jqElement, e.date);
        });
    } else if (jqElement.hasClass("time") == true) {
        // es control de hr
        $('#_' + jqElement.attr("id")).timepicker().on('changeTime.timepicker', function (e) {
            jqElement.attr("sfs-time", e.time.value);
            jqElement.attr("sfs-hour", e.time.hours);
            jqElement.attr("sfs-minute", e.time.minutes);
            jqElement.attr("sfs-meridian", e.time.meridian);
            eventHandler(jqElement, e.time);
        });

    } else if (jqElement.is("textarea") && jqElement.attr("rows") == "0") {
        //se asume que es text rich editor
        $("#" + jqElement.attr("id") + "_editor").on('summernote.change', function (we, contents, $editable) {
            //eventHandler(jqElement, contents);
        });
        $("#dc" + jqElement.attr("id") + " div.note-editable").on('change', function () {
            alert("aaa");
        });
        //note-editable 
        //jqElement.after("<textarea style=\"display:none\" id=\"" + jqElement.attr("id") + "_proxy\"></textarea>");
        //var jqElementProxy = $("#" + jqElement.attr("id") + "_proxy");

        //jqElement.attr("onkeyup", "onChangeUtilProxy(this.value, '" + jqElementProxy.attr("id") + "')");
        //jqElement.change(function (e) {
        //    document.getElementById("" + jqElementProxy.attr("id")).value = $(this).text();

        //});

        //window.onload = function () {
        //    var tE = document.querySelector('#' + "" + jqElement.attr("id") + ''); //The readonly textarea

        //    //Redefine the value property for the textarea
        //    tE._value = tE.value;
        //    Object.defineProperty(tE, 'value', {
        //        get: function () { return this._value },
        //        set: function (v) {
        //            console.log(this.id, ' - the value changed to: ' + v)
        //            this._value = v;
        //            this.setAttribute('value', v) //Setting the attribute (browser stuff)
        //            eventHandler(jqElement, v);
        //        }
        //    })
        //}

    }
}
function onChangeUtilProxy(value, idProxy) {
    document.getElementById(idProxy).value = value
}
function setTime(jqElement, hours, minutes, ampm) {
    var sbTime = new Array();
    sbTime.push(hours);
    sbTime.push(":");
    sbTime.push(minutes);

    if (ampm != null && ampm != undefined) {
        sbTime.push(" " + ampm);
    }

    $("#_" + jqElement.attr("id")).timepicker('setTime', sbTime.join(""));
}
$(document).ready(function () {
    $(".sidebar-toggle").on("click", function (e) {
        e.preventDefault();
        setTimeout(function () {
            var val = "1";
            if ($("body").hasClass("sidebar-collapse") == false) {
                val = "0";
            }

            var url = rootSfsAppUrl + "Features/SessionSet?name=collapsed-menu&value=" + val;
            callServerGet(url, function (data) {
            });

        }, 1000);
    });

    //var validator = $('form').data('validator');
    //if (validator != undefined) {
    //    validator.settings.showErrors = function (map, errors) {
    //        this.defaultShowErrors();
    //        this.checkForm();
    //        if (this.errorList.length)
    //            $(this.currentForm).triggerHandler("invalid-form", [this]);
    //        else
    //            $(this.currentForm).resetSummary();
    //    }
    //}


    // setup defaults for $.validator outside domReady handler

    if ($.fn.modalmanager != undefined) {

        if (getUIVersion() == 2) {
            $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
            '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
                '<div class="progress progress-striped active">' +
                    '<div class="progress-bar" style="width: 100%;"></div>' +
                '</div>' +
            '</div>';
        } else {
            $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner" style="width: 300px; margin-left: -100px;"><div class="preloader-big"></div></div>';

        }


    }
    if (typeof $.views != 'undefined') {
        if (typeof $.views.registerHelpers != 'undefined') {
            $.views.registerHelpers({
                getSafeKeyId:
                    function (text) {
                        return text.replaceAll("+", "").replaceAll("=", "");
                    }
            });
            $.views.registerHelpers({
                getExtension: function (text) {
                    if (text == null || text.length == 0)
                        return "unk";

                    var parts = text.split(".");
                    if (parts.length > 1)
                        return parts[parts.length - 1];
                    else
                        return "unk";
                }
            });

            $.views.registerHelpers({ parseDateLocale: function (text) { return ParseISO8601(text).toLocaleString(); } });
            $.views.registerHelpers({ htmlDecode: function (text) { return /*$('<div />').html(text).html()*/ Encoder.htmlDecode(text); } });
        }
        if (typeof $.views.helpers != 'undefined') {
            $.views.helpers({
                getExtension: function (text) {
                    if (text == null || text.length == 0)
                        return "unk";
                    var parts = text.split(".");
                    if (parts.length > 1)
                        return parts[parts.length - 1];
                    else
                        return "unk";
                }
            });
            $.views.helpers({ getSafeKeyId: function (text) { return text.replaceAll("+", "").replaceAll("=", ""); } });
            $.views.helpers({ parseDateLocale: function (text) { return ParseISO8601(text).toLocaleString(); } });
            $.views.helpers({ htmlDecode: function (text) { return /*$('<div />').html(text).html()*/ Encoder.htmlDecode(text); } });
        }
    }

    refreshForm();
    // showMessages();
    checkPendings();





});

function replaceQueryString(url, param, value) {
    var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i");
    if (url.match(re))
        return url.replace(re, '$1' + param + "=" + value + '$2');
    else
        return url + '&' + param + "=" + value;
}
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisArg */) {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}
function parseDate(string) {
    if (string.contains("T")) {
        var partsA = string.split("T");
        var partsA1 = partsA[0].split("-");
        var partsTime = partsA[1];
        var partsHMS = partsTime;
        var millisecond = 0;

        if (partsTime.contains(".")) {
            partsHMS = partsTime.split(".")[0].split(":");
            millisecond = parseInt(partsTime.split(".")[1]);
        }
        var year = parseInt(partsA1[0]);
        var month = parseInt(partsA1[1]);
        var day = parseInt(partsA1[2]);
        var hour = parseInt(partsHMS[0]);
        var minute = parseInt(partsHMS[1]);
        var second = parseInt(partsHMS[2]);

        return new Date(year, month - 1, day, hour, minute, second, millisecond);
    } else if (string.contains("Date(")) {
        return new Date(parseInt(string.replace('/Date(', '')));
    }
}

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function removeItemOfArray(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}


jQuery.fn.ForceNumericOnly =
function () {
    return this.each(function () {
        $(this).keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                //$("#errmsg").html("Digits Only").show().fadeOut("slow");
                return false;
            }
        })
    })
};
function enableChangeTextUI(containerSelector, moduleKey, objectKey, objectSet, lang, usemode) {
    var allSelector = "";
    var url = "";
    if (typeof (appNameKey) != "undefined") {
        url = rootSfsAppUrl + "Features/SetUIText?overrideModule=" + appNameKey + "&";

    } else {
        url = rootSfsAppUrl + "Features/SetUIText?";

    }
    if (containerSelector == null || typeof (containerSelector) == 'undefined') {
        allSelector = "form [lang=''], .form [lang=''], h1[lang=''], h2[lang=''], h3[lang=''], h[lang='']";
    } else {
        allSelector = containerSelector + " form [lang=''], " + containerSelector + " .form [lang=''], h1[lang=''], h2[lang=''], h3[lang=''], h[lang='']";
    }

    $(allSelector).each(function (index, element) {
        $(this).attr("lang", "1");
        $(this).dblclick(function (e) {
            e.preventDefault();
            openModal($("<a href='' startUrl='" + url + "propertyName=" + $(this).attr("property") + "&businessObjectKey=" + objectKey + "&moduleKey=" + moduleKey + "&lang=" + lang + "&usemode=" + usemode + "'  popupId='modalChangeTextUI' id='modalChangeTextUI'  ></a>"), function () {

            });

        });
    });

}
function enableFocusFX(containerSelector) {
    if (containerSelector == null || typeof (containerSelector) == 'undefined') {
        $('.form input, .form textarea, .form select, .form button, .form a').focus(function () {
            $(this).parents('.focushl').addClass("over");
        }).blur(function () {
            $(this).parents('.focushl').removeClass("over");
        });
    } else {
        $(containerSelector + '.form input, ' + containerSelector + ' .form textarea, ' + containerSelector + ' .form select, ' + containerSelector + ' .form button,  ' + containerSelector + ' .form a').focus(function () {
            $(this).parents('.focushl').addClass("over");
        }).blur(function () {
            $(this).parents('.focushl').removeClass("over");
        });

    }
}
function IsValidForm(idForm) {

    return validForm($get("formWizardProspects"));
}
function validForm(form) {
    if (form != undefined) {

        currentFormId = form.id;
        var _obj = Sys.Mvc.FormContext.getValidationForForm(form);

        if (_obj != undefined) {

            var errs = _obj.validate('submit');
            return (!(errs && errs.length));
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function setTooltips(target) {



}

function setDateConfig(jqElement, method, options) {
    var idFormContainer = jqElement.attr("form-container");
    if (idFormContainer != null && idFormContainer != "") {
        idFormContainer = "#" + idFormContainer + " ";
    } else {
        idFormContainer = "";
    }

    if (options == undefined) {
        options = new Object();

    }
    if (options.beforeShowDay == undefined) {
        options.beforeShowDay = null;
    }
    if (options.changeDate == undefined) {
        options.changeDate = null;
    }
    if (typeof (method) == 'undefined') {
        method = "datepicker";
    }
    jqElement.attr("typeControl", method)
    var fromDate = null;
    var toMaxDate = null;
    var setted = false;
    if (method == "datepicker") {
        if ($(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker") != undefined && $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker") != null) {
            setted = true;
        }
    } else {
        if ($(idFormContainer + "#div-con-" + jqElement.attr("id")).data(method) != undefined) {
            setted = true;
        }
    }
    if (setted == false) {
        if (method == "datepicker") {
            var textFromDate = $(idFormContainer + "#" + jqElement.attr("id")).attr("from-date");
            if (textFromDate != null && textFromDate.length > 0) {
                fromDate = new Date(textFromDate);
            }
            var textToMaxDate = $(idFormContainer + "#" + jqElement.attr("id")).attr("to-date");
            if (textToMaxDate != null && textToMaxDate.length > 0) {
                toMaxDate = new Date(textToMaxDate);
            }
            if (jqElement.attr("uiVersion") == "1") {
                var datecon = $(idFormContainer + "#div-con-" + jqElement.attr("id")).datepicker({
                    autoclose: true,
                    onRender: function (date) {
                        if (fromDate != null) {
                            return date.valueOf() <= fromDate.valueOf() ? 'disabled' : '';

                        }
                        if (toMaxDate != null) {
                            return date.valueOf() >= toMaxDate.valueOf() ? 'disabled' : '';

                        }

                    },
                    format: jqElement.attr("data-format")
                }).on('changeDate', function (ev) {

                    datecon.hide();
                    writeDateOnInput($(idFormContainer + "#" + $(this).attr("id").replace("div-con-", "")), ev.date);
                    $(idFormContainer + "#" + $(this).attr("id").replace("div-con-", "")).change();
                }).data('datepicker');

            } else if (jqElement.attr("uiVersion") == "2") {

                var optionsForSet = new Object();
                //optionsForSet.todayBtn = "linked";
                //optionsForSet.keyboardNavigation = false;
                //optionsForSet.forceParse = false;
                //optionsForSet.todayHighlight = true,
                optionsForSet.todayBtn = "linked";
                optionsForSet.autoclose = true;
                //if (options.beforeShowDay != null) {
                //    optionsForSet.beforeShowDay = options.beforeShowDay;
                //};


                $(idFormContainer + "#div-con-" + jqElement.attr("id")).datepicker(optionsForSet)
                //.on("changeDate", function (ev) {
                //    writeDateOnInput($(idFormContainer + "#" + $(this).attr("id").replace("div-con-", "")), ev.date);
                //    $(idFormContainer + "#" + $(this).attr("id").replace("div-con-", "")).change();
                //    if (options.changeDate != null) {
                //        optionsForSet.changeDate = options.changeDate(ev);
                //    }
                //});

            }

        } else if (method == "datetimepicker") {
            if (jqElement.attr("uiVersion") == "1") {
                $(idFormContainer + "#div-con-" + jqElement.attr("id")).datetimepicker({ autoclose: true, format: jqElement.attr("data-format") });
            } else {

                $(idFormContainer + "#div-con-" + jqElement.attr("id")).datetimepicker({ format: jqElement.attr("data-format") });
            }
        }
    }

}
function cleanDateConfig(jqElement, method) {
    var idFormContainer = jqElement.attr("form-container");
    if (idFormContainer != null && idFormContainer != "") {
        idFormContainer = "#" + idFormContainer + " ";
    } else {
        idFormContainer = "";
    }
    if (typeof (method) === 'undefined') {
        method = "datepicker";
    }
    var setted = false;
    if (method == "datepicker") {
        if ($(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker") != undefined && $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker") != null) {
            setted = true;
        }
    } else {
        if ($(idFormContainer + "#div-con-" + jqElement.attr("id")).data(method) != undefined) {
            setted = true;
        }
    }
    if (setted == true) {
        $.removeData($(idFormContainer + "#div-con-" + jqElement.attr("id"))[0], method);
        $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker", null);
    }

}


function showMoreData(jqElement, data, visibleField, hiddenField) {
    //  $('tr.itemData', jqElement).eq(3).after("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
    $(jqElement).find("tr").each(function () {
        $(this).find("td.cel" + hiddenField).each(function () {
            $(this).hide();
        });
        $(this).find("th.cel" + hiddenField).each(function () {
            $(this).hide();
        });

    });
    for (var i = 0; i < data.length; i++) {


        $('tr.itemData', jqElement).eq(i).find("td.cel" + visibleField).each(function () {
            $(this).append(" <a href='#' class='rowMoreData'><span class='rowMoreData fa fa-chevron-down'> </span></a>");
            //$(this).attr("style" , "border:red;")
        });

        $('tr.itemData', jqElement).eq(i).find("td.cel" + visibleField).each(function () {
            $(this).find("a.rowMoreData").click(function (e) {
                e.preventDefault();
                var status = $(this).attr("status");
                if (status == null) {
                    status = "closed";
                }
                if (status == "closed") {
                    $(this).closest("td").addClass("showMoreRow");
                    showMoreDataItem($(this).closest("tr"), $(this).closest("tr").find("td.cel" + hiddenField).html(), $(this).closest("tr").attr("key").replaceAll("-", ""));
                    $(this).attr("status", "opened");
                } else {
                    $(this).closest("td").removeClass("showMoreRow");
                    $(".smr" + $(this).closest("tr").attr("key").replaceAll("-", ""), jqElement).remove();
                    $(this).attr("status", "closed");

                }

            });
        });
    }

    /*$('a.rowMoreData', jqElement).each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            showMoreDataItem($(this).closest("tr"), $(this).closest("tr").find(".cel" + hiddenField));
        });
       
    });*/



}
function showMoreDataItem(trItem, data, id) {
    //var trItem = null;
    var cols = $("td", trItem).length;
    //var tr = [];
    //tr.push("<tr>");

    trItem.after("<tr class='showMoreRow smr" + id + " auto-break'><td></td><td colspan='" + (cols - 1).toString() + "' class='auto-break'>" + data + "</td></tr>");

}
function getDate(jqElement, method) {
    if (typeof (method) === 'undefined') {
        method = jqElement.attr("typeControl");
        if (method == null)
            method = "datepicker";
    }

    setDateConfig(jqElement, method);
    if (method == "datepicker") {
        if ($("#div-con-" + jqElement.attr("id")).data("date") != null) {
            if ($("#div-con-" + jqElement.attr("id")).data("date").toString() != jqElement.val()) {
                $("#div-con-" + jqElement.attr("id")).datepicker('setValue', jqElement.val());
                var date = null;
                if (jqElement.attr("uiVersion") == "1") {
                    date = $("#div-con-" + jqElement.attr("id")).data("datepicker").date;
                } else {
                    date = $("#div-con-" + jqElement.attr("id")).datepicker("getDate");
                }
                writeDateOnInput(jqElement, date);
                //$("#div-con-" + jqElement.attr("id")).datepicker("changeData");
            } else {
                var dateWrited = readDateOnInput(jqElement);
                if (dateWrited != null) {
                    if (dateWrited.toString() != jqElement.val()) {
                        if (jqElement.attr("uiVersion") == "1") {
                            writeDateOnInput(jqElement, $("#div-con-" + jqElement.attr("id")).data("datepicker").date);

                        } else {
                            writeDateOnInput(jqElement, $("#div-con-" + jqElement.attr("id")).datepicker("getDate"));

                        }
                    }
                }
            }
        }

        return readDateOnInput(jqElement);
    } else
        return $("#div-con-" + jqElement.attr("id")).data(method).getDate();
}
function writeDateOnInput(jqElement, date) {
    jqElement.attr("d-y", date.getFullYear());
    jqElement.attr("d-m", date.getMonth());
    jqElement.attr("d-d", date.getDate());
}
function readDateOnInput(jqElement) {
    //var date = new Date();
    if (jqElement.attr("d-y") != null) {

        return new Date(parseInt(jqElement.attr("d-y")), parseInt(jqElement.attr("d-m")), parseInt(jqElement.attr("d-d")));
    } else {
        return null;
    }


}

function setDate(jqElement, date, method) {
    var idFormContainer = jqElement.attr("form-container");
    if (idFormContainer != null && idFormContainer != "") {
        idFormContainer = "#" + idFormContainer + " ";
    } else {
        idFormContainer = "";
    }

    if (typeof (method) === 'undefined') {
        method = jqElement.attr("typeControl");
        if (method == null)
            method = "datepicker";
    }

    setDateConfig(jqElement, method);
    //$("#div-con-" + jqElement.attr("id")).data(method).setDate(date);
    if (method == "datepicker") {
        if ($(idFormContainer + "#div-con-" + jqElement.attr("id")).datepicker != undefined) {
            $(idFormContainer + "#div-con-" + jqElement.attr("id")).datepicker("update", date);

        } else {
            $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker").setValue(date);

        }
        $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("datepicker").setValue(date);
        writeDateOnInput(jqElement, date);


    } else {
        if (jqElement.attr("uiVersion") == "1") {
            $(idFormContainer + "#div-con-" + jqElement.attr("id")).data(method).setLocalDate(date);

        } else {
            $(idFormContainer + "#div-con-" + jqElement.attr("id")).data("DateTimePicker").date(date);

        }

    }
    //alert($("#" + jqElement.attr("id")).val());
}

function setDateTime() {
    //$(".datetime").each(function () {
    //    var options = {};
    //    if ($(this).attr("showtime")) {

    //    }
    //    if ($(this).attr("showdate")) {

    //    }

    //    $("#div-con-" + $(this).attr("id")).datetimepicker(options);
    //});
}
function setAsyncLink(jqElement) {
    jqElement.click(function (e) {
        e.preventDefault();
        var url = $(this).attr("href");

        callServerGet(url, function () {
            jqElement.button('loading');
            checkPendings();
        }, $(this));

    });
}
function refreshForm(idForm) {
    var preSelect = "";
    if (idForm != null) {
        preSelect = "" + idForm + " ";
    }
    if ($(preSelect + ".numeric").length > 0) {
        $(preSelect + ".numeric").numeric();
    }
    if ($(preSelect + ".integer").length > 0) {
        $(preSelect + ".integer").numeric(false);
    }
    if (preSelect.length == 0) {
        setDateTime();
        setTooltips();
        enableFocusFX();
        //$.unblockUI();
        if (typeof (existSimpleList) != 'undefined') {
            SimpleList();
        }
    }

    $(preSelect + ".popuplink").unbind("click", clickOpenModal);
    $(preSelect + ".popuplink").bind("click", clickOpenModal);
    //_blockUI();

}
function clickOpenModal(e) {
    e.preventDefault();
    openModal($(this));
}

Encoder = {

    // When encoding do we convert characters into html or numerical entities
    EncodeType: "entity",  // entity OR numerical

    isEmpty: function (val) {
        if (val) {
            return ((val === null) || val.length == 0 || /^\s+$/.test(val));
        } else {
            return true;
        }
    },

    // arrays for conversion from HTML Entities to Numerical values
    arr1: ['&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;', '&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;', '&lt;', '&gt;', '&OElig;', '&oelig;', '&Scaron;', '&scaron;', '&Yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;', '&rlm;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&Dagger;', '&permil;', '&lsaquo;', '&rsaquo;', '&euro;', '&fnof;', '&Alpha;', '&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', '&Lambda;', '&Mu;', '&Nu;', '&Xi;', '&Omicron;', '&Pi;', '&Rho;', '&Sigma;', '&Tau;', '&Upsilon;', '&Phi;', '&Chi;', '&Psi;', '&Omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&Prime;', '&oline;', '&frasl;', '&weierp;', '&image;', '&real;', '&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&lArr;', '&uArr;', '&rArr;', '&dArr;', '&hArr;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;', '&clubs;', '&hearts;', '&diams;'],
    arr2: ['&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;', '&#174;', '&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;', '&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;', '&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;', '&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;', '&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;', '&#254;', '&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;', '&#8204;', '&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;', '&#8240;', '&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;', '&#923;', '&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;', '&#947;', '&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;', '&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;', '&#8260;', '&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;', '&#8658;', '&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;', '&#8727;', '&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;', '&#8800;', '&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;', '&#8969;', '&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'],

    // Convert HTML entities into numerical entities
    HTML2Numerical: function (s) {
        return this.swapArrayVals(s, this.arr1, this.arr2);
    },

    // Convert Numerical entities into HTML entities
    NumericalToHTML: function (s) {
        return this.swapArrayVals(s, this.arr2, this.arr1);
    },


    // Numerically encodes all unicode characters
    numEncode: function (s) {

        if (this.isEmpty(s)) return "";

        var e = "";
        for (var i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (c < " " || c > "~") {
                c = "&#" + c.charCodeAt() + ";";
            }
            e += c;
        }
        return e;
    },

    // HTML Decode numerical and HTML entities back to original values
    htmlDecode: function (s) {

        var c, m, d = s;

        if (this.isEmpty(d)) return "";

        // convert HTML entites back to numerical entites first
        d = this.HTML2Numerical(d);

        // look for numerical entities &#34;
        arr = d.match(/&#[0-9]{1,5};/g);

        // if no matches found in string then skip
        if (arr != null) {
            for (var x = 0; x < arr.length; x++) {
                m = arr[x];
                c = m.substring(2, m.length - 1); //get numeric part which is refernce to unicode character
                // if its a valid number we can decode
                if (c >= -32768 && c <= 65535) {
                    // decode every single match within string
                    d = d.replace(m, String.fromCharCode(c));
                } else {
                    d = d.replace(m, ""); //invalid so replace with nada
                }
            }
        }

        return d;
    },

    // encode an input string into either numerical or HTML entities
    htmlEncode: function (s, dbl) {

        if (this.isEmpty(s)) return "";

        // do we allow double encoding? E.g will &amp; be turned into &amp;amp;
        dbl = dbl || false; //default to prevent double encoding

        // if allowing double encoding we do ampersands first
        if (dbl) {
            if (this.EncodeType == "numerical") {
                s = s.replace(/&/g, "&#38;");
            } else {
                s = s.replace(/&/g, "&amp;");
            }
        }

        // convert the xss chars to numerical entities ' " < >
        s = this.XSSEncode(s, false);

        if (this.EncodeType == "numerical" || !dbl) {
            // Now call function that will convert any HTML entities to numerical codes
            s = this.HTML2Numerical(s);
        }

        // Now encode all chars above 127 e.g unicode
        s = this.numEncode(s);

        // now we know anything that needs to be encoded has been converted to numerical entities we
        // can encode any ampersands & that are not part of encoded entities
        // to handle the fact that I need to do a negative check and handle multiple ampersands &&&
        // I am going to use a placeholder

        // if we don't want double encoded entities we ignore the & in existing entities
        if (!dbl) {
            s = s.replace(/&#/g, "##AMPHASH##");

            if (this.EncodeType == "numerical") {
                s = s.replace(/&/g, "&#38;");
            } else {
                s = s.replace(/&/g, "&amp;");
            }

            s = s.replace(/##AMPHASH##/g, "&#");
        }

        // replace any malformed entities
        s = s.replace(/&#\d*([^\d;]|$)/g, "$1");

        if (!dbl) {
            // safety check to correct any double encoded &amp;
            s = this.correctEncoding(s);
        }

        // now do we need to convert our numerical encoded string into entities
        if (this.EncodeType == "entity") {
            s = this.NumericalToHTML(s);
        }

        return s;
    },
    // Encodes the basic 4 characters used to malform HTML in XSS hacks
    XmlEncode: function (s) {
        if (!this.isEmpty(s)) {

            // do we convert to numerical or html entity?

            s = s.replaceAll(/\'/g, "&apos;"); //no HTML equivalent as &apos is not cross browser supported
            s = s.replaceAll(/\"/g, "&quot;");
            s = s.replaceAll(/</g, "&lt;");
            s = s.replaceAll(/>/g, "&gt;");
            s = s.replaceAll(/&/g, "&amp;");
            s = s.replaceAll("&amp;apos;", "&apos;");
            s = s.replaceAll("&amp;quot;", "&quot;");
            s = s.replaceAll("&amp;lt;", "&lt;");
            s = s.replaceAll("&amp;gt;", "&gt;");
            return s;
        } else {
            return "";
        }
    },

    // Encodes the basic 4 characters used to malform HTML in XSS hacks
    XSSEncode: function (s, en) {
        if (!this.isEmpty(s)) {
            en = en || true;
            // do we convert to numerical or html entity?
            if (en) {
                s = s.replaceAll(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
                s = s.replaceAll(/\"/g, "&quot;");
                s = s.replaceAll(/</g, "&lt;");
                s = s.replaceAll(/>/g, "&gt;");
            } else {
                s = s.replaceAll(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
                s = s.replaceAll(/\"/g, "&#34;");
                s = s.replaceAll(/</g, "&#60;");
                s = s.replaceAll(/>/g, "&#62;");
            }
            return s;
        } else {
            return "";
        }
    },

    // returns true if a string contains html or numerical encoded entities
    hasEncoded: function (s) {
        if (/&#[0-9]{1,5};/g.test(s)) {
            return true;
        } else if (/&[A-Z]{2,6};/gi.test(s)) {
            return true;
        } else {
            return false;
        }
    },

    // will remove any unicode characters
    stripUnicode: function (s) {
        return s.replace(/[^\x20-\x7E]/g, "");

    },

    // corrects any double encoded &amp; entities e.g &amp;amp;
    correctEncoding: function (s) {
        return s.replace(/(&amp;)(amp;)+/, "$1");
    },


    // Function to loop through an array swaping each item with the value from another array e.g swap HTML entities with Numericals
    swapArrayVals: function (s, arr1, arr2) {
        if (this.isEmpty(s)) return "";
        var re;
        if (arr1 && arr2) {
            //ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
            // array lengths must match
            if (arr1.length == arr2.length) {
                for (var x = 0, i = arr1.length; x < i; x++) {
                    re = new RegExp(arr1[x], 'g');
                    s = s.replace(re, arr2[x]); //swap arr1 item with matching item from arr2	
                }
            }
        }
        return s;
    },

    inArray: function (item, arr) {
        for (var i = 0, x = arr.length; i < x; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    }

}
function encode(input) {
    //alert($('<div/>').text(input).html());
    return Encoder.htmlEncode(input);//$('<div/>').text(input).html().replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function decode(input) {
    return Encoder.htmlDecode(input); //$('<div/>').html(input).text().replace(/"/g,).replace(/'/g, '&#39;');
}
function refreshForms() {
    $(".numeric").numeric();
    $(".integer").numeric(false);
    setTooltips();
    enableFocusFX();
    jQuery.timeago.settings.allowFuture = true;
    // $.unblockUI();
    if (typeof (existSimpleList) != 'undefined') {
        SimpleList();
        $('.timeago').timeago();
    }
    //setTooltips();
    //_blockUI();

    //SetSelectableChecks();
}
function SimpleList() {
    $(document).ready(function () {
        if ($.fn.tableHover != undefined) {
            $('.simple-list, .simple-list tbody').tableHover();
            $('.simple-list tbody tr:odd').addClass('odd');
            $('.simple-list tbody  tr:even').addClass('even');
        }
    });

}

var currentFormId = "";
function refreshCurrentTab(e) {
    if ($("#HashErrors") == undefined) {
        $('#' + currentTabsId + '').tabs("load", currentTabIndex);
    } else {
        if ($("#HashErrors").val() == false) {
            $('#' + currentTabsId + '').tabs("load", currentTabIndex);
        }
    }

}

function onMessageSuccess(data) {
    // $.fancybox.resize();
    if (data.indexOf("ajaxTopRedirect") == -1) {
        //$.unblockUI();
    }

}
function onPopupSuccess() {
    onMessageSuccess();
}
var currentTabsId = "";
var currentTabId = "";
var currentTabIndex = 0;
function updateForms() {


}
function refreshAjaxRegion(panel) {
    $('a.ajax-same', panel).click(function () {
        $(panel).html('<div class="ajax-context"><img src="<%=ResolveUrl("~/") %>Content/ajax-loader.gif" /> <%= GlobalMessages.LOADING %></div>');
        $.ajax({
            url: this.href,
            contentType: "text/html",
            cache: false,
            success: function (data) {

                $(panel).html(data);
                refreshForms();
            }
        });
        return false;
    });
}

function onChangeCompareFieldChange(jqElement) {
    if (jqElement.val() == "== null") {
        jqElement.closest('tr').find("input.value").addClass("null");
    } else {
        if (jqElement.closest('tr').find("input.value").hasClass("null"))
            jqElement.closest('tr').find("input.value").removeClass("null");
    }
}
// #region "Filter Builder"

function GetFilter(id, includeText, variablename) {
    var tf = [];
    var tfp = [];
    var textp = [];
    var text = [];
    var comp = "=";
    var excludeFilter = false;
    var sqOpen = false;
    var nCondSF = 0;
    var contContains = false;
    var openContains = false;
    var containsPrevQuery = false;
    $(".specific" + id + " ." + id).each(function () {
        var isNum = false;
        tfp = [];
        textp = [];
        excludeFilter = false;
        var sqCurrent = "";
        var val = $(this).val();
        if ($(this).hasClass("contact")) {
            if (tf.join("").toString().endsWith("(") == false) {
                tfp.push($(this).val());
            }
            if (includeText) {
                textp.push($("#" + $(this).attr("id") + " option:selected").text());
            }
        }
        if ($(this).hasClass("fieldFilter")) {

            if ($(this).val().indexOf("|") != -1 && val.indexOf(".Count()") == -1) {
                var itPrefix = "it.";
                /*if (sqOpen == true )
                {
                    itPrefix = "";
                }*/
                if (containsPrevQuery == true) {
                    tfp.push(" AND " + itPrefix + $(this).val().toString().split("|")[0]);
                    containsPrevQuery = false;
                } else {
                    tfp.push(itPrefix + $(this).val().toString().split("|")[0]);

                }

                if (includeText) {
                    textp.push($("#" + $(this).attr("id") + " option:selected").text());
                }
            } else {
                if (val.indexOf(".Count()") != -1) {
                    // es navegacion de muchos
                    if (val.indexOf("|") != -1) {
                        // es usemode 
                        var propNavParts = val.split("|");
                        var extraQuery = null;
                        var nameProp = null;
                        for (var i = 0; i < propNavParts.length; i++) {
                            if (propNavParts[i].indexOf(":") == -1) {
                                nameProp = propNavParts[i];
                            } else {
                                if (propNavParts[i].indexOf("query:") != -1) {
                                    extraQuery = propNavParts[i].replace("query:", "");
                                }
                            }
                        }
                        var itPrefix2 = "it.";
                        /*if (sqOpen == true) {
                            itPrefix2 = "";
                        }*/
                        if (extraQuery != null) {

                            tfp.push(itPrefix2 + nameProp.replace(".Count()", ".Count( " + extraQuery + ""));
                            containsPrevQuery = true;
                        } else {
                            tfp.push(itPrefix2 + nameProp.replace(".Count()", ".Count( "));
                            containsPrevQuery = false;
                        }
                        sqOpen = true;
                        isNum = true;
                    } else {

                        tfp.push(val.replace(".Count()", ".Count( "));
                        sqOpen = true;
                        isNum = true;
                    }
                    //                }else if(val.indexOf("Contains") != -1){ 

                } else {
                    isNum = false;
                    //alert($(this).attr("sff"));
                    if (containsPrevQuery == true) {
                        tfp.push(" AND " + val);
                    } else {
                        tfp.push(val);
                    }
                }
            }
        }

        if ($(this).hasClass("compare")) {
            if ($(this).val() == "gt") {
                comp = ">";
            } else if ($(this).val() == "lt") {
                comp = "<";
            } else if ($(this).val() == "let") {
                comp = "<=";
            } else if ($(this).val() == "get") {
                comp = ">=";
            } else if ($(this).val() == "ndays" || $(this).val() == "ldays" || $(this).val() == "today" || $(this).val() == "now") {
                comp = "cudt-" + $(this).val() + "-";
            } else if ($(this).val() == "Contains") {
                comp = "Contains(\"";
                openContains = true;
                contContains = true;

                /*} else if ($(this).val() == "== null") {
                    comp = $(this).val()//"IS NULL";
                
                */} else {
                comp = $(this).val();
            }

            if (sqOpen) {
                // existe un subfiltro abierto y aun no se sale de ahi
                if ($(this).attr("sff").length > 0) {
                    tfp.push(comp);
                } else {
                    // ya se salio del subfiltro
                    tfp.push(" ) "); // cerramos
                    tfp.push(comp);
                    if (includeText) {
                        textp.push(" " + $("#" + $(this).attr("id") + " option:selected").text());
                    }
                    sqOpen = false;
                }
            } else {
                tfp.push(comp);
                if (includeText) {
                    textp.push(" " + $("#" + $(this).attr("id") + " option:selected").text());
                }
            }


        }
        //start value
        if ($(this).hasClass("value") && !$(this).hasClass("null")) {
            //tfp.push(GetValueFrom($(this)));
            var str = GetValueFrom($(this));
            var strtext = "";
            if (includeText) {
                strtext = getTextFromValue($(this));
            }
            if (str.length == 0) {
                excludeFilter = true;

            } else {
                if (openContains == false) { // parentesis abierto


                    if (!isNaN(parseFloat(str)) || str.contains("Guid")) {
                        tfp.push("" + str + "");
                    } else if (str == "false" || str == "true") {
                        tfp.push(str);
                    } else if (str.contains("DateTime(")) {
                        tfp.push("" + str + "");
                    } else {
                        tfp.push("\"" + str + "\"");
                    }
                    if (includeText) {
                        textp.push(" " + strtext);
                    }
                } else {
                    //if (includeText) {
                    //    texp.push();
                    //}
                    tfp.push(str);
                    if (includeText) {
                        textp.push(strtext);
                    }
                    tfp.push("\")");
                    openContains = false;
                }
            }
        }
        if (excludeFilter == false) {
            if (tf.join("").toString().length > 0) {

                tf.push(" ");

            }
            if ($(this).hasClass("ndays") && $(this).closest('tr').find("div.ndays").css("display") == "inline") {
                if ($(this).hasClass("ndays")) {
                    var dir = $(this).closest('tr').find("button.ndaysdir").text();
                    if (dir == "+") {
                        dir = "p";
                    } else {
                        dir = "l";
                    }
                    tfp.push("-" + $(this).closest('tr').find("span.relativeday").attr("relday") + "-" + dir + "-" + $(this).closest('tr').find("input.timevalue").val());
                }
            }
            if (includeText) {
                if (text.join("").toString().length > 0) {

                    text.push(" ");

                }
                text.push(textp.join("").toString())
            }
            tf.push(tfp.join("").toString())

        }
    }
        );
    var query = tf.join("").toString();
    if (query.startsWith("AND")) {
        query = query.slice(3, query.length);
    }
    if (contContains) {
        query = query.replaceAll(" Contains(\" ", ".Contains(\"");
    }

    window[variablename] = text.join("").toString();

    return query;
    //alert(query);
}
// #endregion
function ajaxTopRedirect(url) {
    //blockUI();
    window.location.href = url;
}
function isRedirect(e) {
    var result = false;
    if (e._response.get_responseData().indexOf("ajaxTopRedirect") != -1) {
        result = true;
    }
    return result;
}



if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
          this[from] === elt)
                return from;
        }
        return -1;
    };
}
String.prototype.contains = function (it) { return this.indexOf(it) != -1; };
String.prototype.replaceAll = function (stringToFind, stringToReplace) {
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}
var lastLinkElement = null;
$(function () {
    $('a').mouseover(function () {
        lastLinkElement = this;
    });
});


function getSafeKeyId_bak(safeKey) {
    safeKey = safeKey.replaceAll("+", "");
    safeKey = safeKey.replaceAll("=", "");
    return safeKey;
}

// #region "List select"
function updateSelected(allselected, arraySelect, id) {
    //alert(arraySelect.length);
    if (allselected) {
        $("input.select").each(
            function () {
                if ($(this).attr("list") == "list" + id) {
                    $(this).prop("checked", true);
                    markSelectRow(null, $(this));
                }
            }

        );
        var il_ = null;
        for (var i = 0; i < arraySelect.length; i++) {
            il_ = $(":checkbox[value=" + arraySelect[i] + "]");
            if (il_.length > 0) {
                il_.prop("checked", false);
                markUnSelectRow(null, il_);
            }
        }
        updateNumSelected(arraySelect, id);
    }
    else if (allselected == false && arraySelect.length == 0) {
        updateNumSelected(arraySelect, id);
        // deseleccionando todo
        $("input.select").each(
                function () {
                    if ($(this).attr("list") == "list" + id) {
                        $(this).prop("checked", false);
                        markUnSelectRow(null, $(this));
                    }
                }

            );

    } else {

        var el_ = null;
        for (var i = 0; i < arraySelect.length; i++) {
            el_ = $(":checkbox[value=" + arraySelect[i] + "]");
            if (el_.length > 0) {
                el_.attr("checked", true);
                markSelectRow(null, el_);
            }
        }
        updateNumSelected(arraySelect, id);
    }
}
function selectAll(elem, type, id) {
    //alert("sadas");
    // type = "all", "page"
    if (type == "all") {
        if ($(elem).is(':checked')) {
            window["selectAllRealResults" + id]();
            updateSelected(true, window["selectRows" + id], id)
            $("#seln" + id).text($("#realn" + id).text());
        } else {
            window["unSelectAllRealResults" + id]();
            var arryTest = [];
            updateSelected(false, arryTest, id)
        }

    } else if (type == "page") {
        if ($(elem).is(':checked')) {
            $("input.select").each(
                    function () {
                        if ($(this).attr("list") == "list" + id) {
                            if ($(this).is(':checked') == false) {
                                $(this).prop("checked", true);
                                //$(this).attr("checked", "checked");
                                window["selectRow" + id]($(this).val());
                                markSelectRow(null, $(this));
                            }
                        }
                    }

                );
        } else {
            $("input.select").each(
                    function () {
                        if ($(this).attr("list") == "list" + id) {
                            if ($(this).is(':checked') == true) {
                                $(this).prop("checked", false);
                                window["unSelectRow" + id]($(this).val());
                                markUnSelectRow(null, $(this));
                            }
                        }
                    }

                );
        }
        //updateSelected(false, selectRows_id_List, id)
        updateNumSelected(window["selectRows" + id], id);

    }



}
var actionsWaitComplete = new Array();
function waitActionComplete(actionId) {
    setActionComplete(actionId, false);
}

function setActionComplete(actionId, completed) {
    var setted = false;
    for (var i = 0; i < actionsWaitComplete.length; i++) {
        if (actionsWaitComplete[i].actionId == actionId) {
            setted = true;
            actionsWaitComplete[i].completed = completed;
        }
    }


    if (setted == false) {
        var actionWait = new Object();
        actionWait.actionId = actionId;
        actionWait.completed = completed;
        actionsWaitComplete.push(actionWait);
    }

}
function completeAction(actionId) {
    setActionComplete(actionId, true);
}
function isActionComplete(actionId) {
    for (var i = 0; i < actionsWaitComplete.length; i++) {
        if (actionsWaitComplete[i].actionId == actionId) {

            return actionsWaitComplete[i].completed;
        }
    }
    return false;
}
function validateFields(jqSelect) {
    var result = false;
    jqSelect.each(function () {

    });
    return result;

}
function setWizard(jqForm, jqBackBtn, jqNextBtn) {
    var currentStep = 1;
    var submitBtn = jqNextBtn.closest("form").find(".btn-primary.save");
    var cancelBtn = jqNextBtn.closest("form").find(".secondary.cancel");
    cancelBtn.hide();
    submitBtn.hide();
    $(".wizard-menu li a", jqForm).click(function (e) {
        var stepClick = $(this).attr("step");

        if (stepClick != undefined) {

        }

    });
    $(".wizard-panel").hide();
    $(".wizard-panel.panel-1").show();
    $(".wizard-menu .step-" + currentStep).addClass("completed");
    jqNextBtn.click(function (e) {
        // click en boton siguiente
        e.preventDefault();
        var nextStep = currentStep + 1;
        $(".wizard-panel.panel-" + currentStep);

        $(".wizard-panel").hide();
        $(".wizard-panel.panel-" + nextStep).show();
        $(".wizard-menu .step-" + nextStep).addClass("completed");
        // si es ultimo paso desaparece este boton
        var steps = $(".wizard-menu li").length;
        if (nextStep == steps) {
            $(this).hide();
            submitBtn.show();
        }
        jqBackBtn.show();
        currentStep = nextStep;
    });
    jqBackBtn.click(function (e) {
        // click en boton siguiente
        e.preventDefault();
        var prevStep = currentStep - 1;
        $(".wizard-panel.panel-" + currentStep);

        $(".wizard-panel").hide();
        $(".wizard-panel.panel-" + prevStep).show();
        $(".wizard-menu .step-" + currentStep).removeClass("completed");
        // si es primer paso desaparece este botón
        var steps = $(".wizard-menu li").length;
        if (prevStep == 1) {
            $(this).hide();
        }
        submitBtn.hide();
        jqNextBtn.show();
        currentStep = prevStep;
    });

}



function unSelectRow(value, id) {

}
function CustomAction(elem, url, id, key, done) {
    var jqElem = $("#" + elem.id);
    var query = "";
    var selAll = false;
    var selItemsArray = [];
    if (key != null && key != '') {
        selItemsArray.push(key);
    } else {
        query = window["fullQueryList" + id];

        selAll = window["allSelected" + id];
        selItemsArray = window["selectRows" + id];



        var urlConfirm = "";

    }
    var actionName = null;
    var withConfirm = true;
    if ($("a#customAction" + id).length == 0) {
        jqElem.after("<a href='#'  popupId='modalCustomAction" + id + "' id='customAction" + id + "' startUrl='" + url + "' messageConfirm='" + jqElem.attr("messageConfirm") + "' ></a>");
        actionName = jqElem.attr("actionName");
        $("a#customAction" + id).click(function (e) {
            e.preventDefault();
            waitActionComplete(actionKey);
            openModal($(this), done);
        });
    }
    if (jqElem.attr("withConfirm") == "false") {
        withConfirm = false;
    }

    var message = $("a#customAction" + id).attr("messageConfirm");
    //message = message.replace("{0}", $.trim($("#" + elem.id).text())); // actioname
    if (message != null) {
        message = message.replace("%7b0%7d", encodeURI($.trim(jqElem.text()))); // actioname
        message = message.replace("%7b1%7d", $("#seln" + id).text()); // number
    }
    var actionKey = jqElem.attr("actionKey");
    var overrideApp = jqElem.attr("overrideApp");
    var usemode = jqElem.attr("usemode");
    var preventPopup = false;
    if (jqElem.attr("prevent-popup") == "true") {
        preventPopup = true;
    }
    var isbackground = jqElem.attr("isBackground");
    waitActionComplete(actionKey + id);
    if (withConfirm) {
        $("a#customAction" + id).attr("onCloseParam", actionKey);
    } else {

    }
    var controllerName = jqElem.attr("controllerName");
    var dataAction = new Object();
    var dataActionString = "";
    if (selItemsArray.length > 0) {

        dataAction.AllSelected = selAll;
        dataAction.Selected = selItemsArray.join(",");
        dataAction.ActionKey = actionKey;
        dataAction.OverrideApp = overrideApp;
        dataAction.TitleMessage = message;
        dataAction.Usemode = usemode;
        dataAction.Query = query;
        dataAction.uiv = getUIVersion();
        dataActionString = JSON.stringify(dataAction);

        if (withConfirm) {
            $("a#customAction" + id).attr("postData", dataActionString);
        } else {
            jqElem.attr("postData", dataActionString);
        }

    } else {
        // nada seleccionado
        if (withConfirm) {
            $("a#customAction" + id).attr("forcePost", "true");
            $("a#customAction" + id).removeAttr("postData");
        } else {
            jqElem.removeAttr("postData");
        }
    }
    if (actionName == null || typeof (actionName) == "undefined") {
        actionName = "CustomActionExecute";
    }

    var separator = "?";
    if (url != null) {
        if (url.contains("?"))
            separator = "&";
        if (url.contains("popup") == false) {
            separator = separator + "popup=1&";
        }
    }
    var uiv = "uiv=" + getUIVersion();
    if (withConfirm) {
        //$("a#customAction" + id).attr("href", url + separator + "controllerName=" + controllerName + "&actionName=" + actionName + "&actionKey=" + actionKey + "&isBackground=" + isbackground + "&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray + "&desc=" + message + "&lastActionName=" + actionKey + id + "&" + uiv + "&propertyForUpdate=" + jqElem.data("param-fk"));
        $("a#customAction" + id).attr("href", url + separator + "controllerName=" + controllerName + "&actionName=" + actionName + "&actionKey=" + actionKey + "&isBackground=" + isbackground + "&query=" + query + "&allSelected=" + selAll + "&desc=" + message + "&lastActionName=" + actionKey + id + "&" + uiv + "&propertyForUpdate=" + jqElem.data("param-fk"));
        $("a#customAction" + id).click();
    } else {

        // click and action
        if (url == null) {
            var propForUpdate = "";
            if (actionKey == "delete-relation-fk") {
                propForUpdate = "&propertyForUpdate=" + jqElem.data("param-fk");
            }
            url = jqElem.attr("href") + "&actionKey=" + actionKey + "&lastActionName=" + actionKey + id + propForUpdate + "&" + uiv;
        } else {

            url = url + separator + "controllerName=" + controllerName + "&actionName=" + actionName + "&actionKey=" + actionKey + "&isBackground=" + isbackground + "&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray + "&desc=" + message + "&lastActionName=" + actionKey + id + "&propertyForUpdate=" + jqElem.data("param-fk") + "&" + uiv;
        }
        if (typeof (done) != 'undefined') {
            callServerSend(url, dataAction, function (data) {
                done();
            }, jqElem);

        } else {
            if (jqElem.attr("ajax") == "false") {

                window.location.href = url;

            } else {
                callServerSend(url, dataAction, function (data) {
                    // var _done = done;
                }, jqElem);
            }
        }
    }
    return false;

}

function detailsAction(e, context, id) {
    if (context.tagName == "A") {
        context = $(context).parents(".trRow" + id)[0];
    }
    //window.document.URL = $("#" + context.id).children().find(".list-details").attr("href");
    $("#" + context.id).children().find(".list-details").click();
}
function getUTCDate(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
function convertUTCToLocal(dateText) {
    //var toUTC = true;
    var date = new Date(dateText);
    //Local time converted to UTC
    log("Time :" + date);
    var localOffset = date.getTimezoneOffset() * 60000;
    var localTime = date.getTime();
    //if (toUTC) {
    //    date = localTime + localOffset;
    //}
    // else {
    date = localTime - localOffset;
    //}
    var newdate = Date.parse(date);
    return newdate;

}
function deleteAction(e, context, many, id, guidItem, onCloseFunction) {
    var idProxy = "";
    var startUrl = "";
    var title = "";
    var objects = "";
    var selItemsArray = new Array();
    var extraparams = "";
    var jqElem = $(e);

    var actionKey = jqElem.attr("actionKey");
    var usemode = jqElem.attr("usemode");
    var overrideApp = jqElem.attr("overrideApp");
    if (overrideApp == "undefined") {
        overrideApp = null;
    }
    if (many == false) {
        if (guidItem != null) {
            // eliminado de un elemento desde detalle
            title = $(context).attr("defaultPropertyValue");

        } else {
            var defaultProperty = "";
            if (context.tagName == "A") {
                context = $(context).parents(".trRow" + id)[0];
            }
            if ($("#" + context.id).children(".defaultProperty").length > 0) {
                defaultProperty = $("#" + context.id).children(".defaultProperty").text();
                title = defaultProperty;

            }
            objects = "&objectKey=" + $("#" + context.id).attr("safeKey");
            idProxy = "deleteProxy";
        }
    } else {
        var query = window["fullQueryList" + id]; // query linq
        //var actionKey = $(e).attr("actionKey"); //
        var selAll = window["allSelected" + id]; // todos seleccionados tru o false
        selItemsArray = window["selectRows" + id]; // lista de seleccionados
        idProxy = "deleteProxyMany";
        objects = "";
        //window["actionDeleteMany" + id]();
        var actionKey = "deletemany";
        if ($("#" + idProxy + id).attr("startUrl").indexOf("relationship:") != -1) {
            extraparams = "&actionKey=deleterelmany&query=" + query + "&allSelected=" + selAll + "&overrodeApp=" + overrideApp; //+ "&selected=" + selItemsArray;
            actionKey = "deleterelmany";
        } else {
            extraparams = "&actionKey=deletemany&query=" + query + "&allSelected=" + selAll + "&overrodeApp=" + overrideApp; // + "&selected=" + selItemsArray;
        }
        //  $("a#customAction" + id).attr("href", url + "?controllerName=" + controllerName + "&actionName=CustomActionExecute&actionKey=" + actionKey + "&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray + "&desc=" + message);


    }
    if (many == false && guidItem != null) {
        // eliminando uno solo, nueva versión
        var desc = $(context).attr("messageConfirm");
        desc = desc.replace("{0}", title);
        desc = desc.replace("%7b0%7d", title);
        var fullUrl = rootSfsAppUrl + "Messages/Confirm?actionKey=deletemany&areaName=" + $(context).attr("areaName") + "&controllerName=" + $(context).attr("controllerName") + "&actionName=CustomActionExecute&desc=" + desc + "&selected=" + guidItem + "&uiv=" + getUIVersion();

        openModal($("<a href='' forcePost='true' startUrl='" + fullUrl + "' popupId='modalDel" + $(context).attr("id") + "' id='proxyDyn" + $(context).attr("id") + "'  ></a>"), onCloseFunction);

    } else {
        startUrl = $("#" + idProxy + id).attr("startUrl");
        var desc = $("#" + idProxy + id).attr("messageConfirm");
        desc = desc.replace("{0}", $("#seln" + id).text());
        desc = desc.replace("%7b0%7d", $("#seln" + id).text());

        var concatUrl = "?";
        if (startUrl.contains("?")) {
            concatUrl = "&";
        }
        var dataAction = new Object();
        dataAction.AllSelected = selAll;
        dataAction.ActionKey = actionKey;
        dataAction.Selected = selItemsArray.join(",");
        dataAction.Usemode = usemode;
        dataAction.Query = query;
        dataAction.OverrideApp = overrideApp;
        dataAction.uiv = getUIVersion();


        var dataActionString = Encoder.XmlEncode(JSON.stringify(dataAction));

        if (selItemsArray.length > 0) {


            $("#" + idProxy + id).attr("postData", dataActionString);
        } else {
            $("#" + idProxy + id).attr("forcePost", "true");
            $("#" + idProxy + id).attr("postData", dataActionString);
        }
        //if ($("#" + idProxy + id).length > 0) {
        $("#" + idProxy + id).attr("href", startUrl + concatUrl + "title=" + title + "&uiv=" + getUIVersion() + "&desc=" + desc + extraparams + objects);

        $("#" + idProxy + id).click();
        //} else {
        //    openModal(e, onCloseFunction);
        //}
    }
    return false;
}
function ExportDownload(elem, url, id) {
    var query = window["fullQueryList" + id];
    var selAll = window["allSelected" + id];

    var selItemsArray = window["selectRows" + id];
    var actionKey = "";
    if ($("#" + elem.id).attr("actionKey")) {
        actionKey = $("#" + elem.id).attr("actionKey");
    }
    var jqElem = $("#" + elem.id);
    var usemode = "";
    if (jqElem.attr("usemode") != null) {
        usemode = jqElem.attr("usemode");

    }
    var title = jqElem.attr("titleExport");
    var format = $("#" + elem.id).attr("format");
    window.location.href = url + "?title=" + title + "&usemode=" + usemode + "&query=" + query + "&allSelected=" + selAll.toString() + "&selected=" + selItemsArray.join("|").toString() + "&orderBy=" + window["currentOrderBy" + id] + "&direction=" + window["currentOrderDir" + id] + "&format=" + format + "&actionKey=" + actionKey;
}
function isVisibleInScroll(element, fullyInView, defaultValue) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    if (element != null && typeof (element.offset()) != "undefined") {
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
    return defaultValue;
}
function updateNumSelected(arraySelected, id) {
    var n = 0;
    if (window["allSelected" + id] == false) {
        n = arraySelected.length;
    } else {

        n = parseInt($("#realn" + id).text()) - arraySelected.length;
    }
    $("#seln" + id).text(n);
    // ej. 2
    // deshabilitar todos los

    if (n > 0) {
        $("#expn" + id).text(n + " " + $("#expn" + id).attr("selectedText"));
        $("#selnd" + id).text(n);
        $("#cusact" + id).text(n);
        setDisabled($("#place-list" + id + " .onlysel"), false);
        //$("#place-list" + id + " .onlysel").removeAttr('disabled');
        //$("#place-list" + id + " .onlysel").removeClass('disabled');
        //$("#selnd" + id).removeAttr('disabled');
    } else {
        $("#expn" + id).text($("#expn" + id).attr("resultsText"));
        setDisabled($("#place-list" + id + " .onlysel"));

        //$("#place-list" + id + " .onlysel").attr('disabled', 'disabled');
        //$("#place-list" + id + " .onlysel").addClass('disabled');
        // $("#selnd" + id).removeAttr('disabled');
        $("#selnd" + id).text(n);
        $("#cusact" + id).text(n);
    }
}
function markSelectRow(id, jelem) {
    if (jelem != null) {
        jelem.parents("tr").addClass("sover");
        //jelem.parents("tr").attr("oriclass", jelem.parents("tr").attr("class"));
        //selectRow_id_List(jelem.val());
        //$(this).parents("td").addClass("sover");
    }
}

function markUnSelectRow(id, jelem) {
    if (jelem != null) {
        jelem.parents("tr").removeClass("sover"); //even

        //unSelectRow_id_List($(this).val());

    }
}
function SetSelectableChecks(id) {
    $("#tableSearchresult" + id + " input.select").click(
        function () {
            //alert($(this).val());
            if ($(this).is(':checked')) {
                window["selectRow" + id]($(this).val());
                markSelectRow(null, $(this));
            } else {
                // desseleccionando
                window["unSelectRow" + id]($(this).val());
                markUnSelectRow(null, $(this));
            }
            updateNumSelected(window["selectRows" + id], id);
        }
    );
}
function getFormatted(value, type, symbol) {
    var result = "";
    if (type == "currency") {
        if (typeof (accounting) == "undefined") {
            $.ajax({
                url: rootSfsAppUrl + "Scripts/accounting.min.js",
                dataType: "script",
                async: false
            });

        }

        result = accounting.formatMoney(value);

    }
    return result;
}
(function ($) {

    $.fn.addHtmlField = function (options) {

        // Establish our default settings
        var settings = $.extend({
            type: 'text',
            data: null,
            placeHolder: null,
            allowUnregistered: true,
            id: null,
            typeInput: 'text',
            style: '',
            url: null,
            width: null,
            extraQuery: null,
            format: "",
            options: null,
            onChange: null,
            onEnterKeyPress: null
        }, options);

        return this.each(function () {
            var placeHolderX = " ";
            if (settings.placeHolder != null && settings.placeHolder.length > 0) {
                placeHolderX = settings.placeHolder;
            }
            var sbHtml = new Array();
            if (settings.type == "date") {

                sbHtml.push("<div id='div-con-" + settings.id + "' class='input-group date " + settings.id + "' data-format='" + settings.format + "' data-date-format='" + settings.format + "'>");
                sbHtml.push(" <input form-container='" + settings.formContainer + "' class='datetime form-control is-datetimeEntry ' uiVersion='2' typeControl='datepicker' type='" + settings.typeInput + "' name='" + settings.id + "' id='" + settings.id + "' data-format='" + settings.format + "'  />");
                //sbHtml.push(" <div typeControl='datepicker' type='" + settings.typeInput + "' uiVersion='2' name='" + settings.id + "' id='" + settings.id + "'></div>");
                sbHtml.push(" <span class='input-group-addon'><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></span>");
                sbHtml.push("</div>");
            } else if (settings.type == "autocomplete") {
                sbHtml.push("<input type=\"text\" id=\"" + settings.id + "Text\" name=\"" + settings.id + "Text\" class=\"autocomplete noquery  form-control  field text\" />");
                sbHtml.push("<input type=\"hidden\" id=\"" + settings.id + "\" name=\"" + settings.id + "\" class=\"autocomplete\" />");

            } else if (settings.type == "text") {
                sbHtml.push("<input type=\"text\" id=\"" + settings.id + "\" name=\"" + settings.id + "\" class=\"field noquery  form-control  text\" />");

            } else if (settings.type == "tags") {
                sbHtml.push("<input type=\"text\" id=\"" + settings.id + "Text\" name=\"" + settings.id + "Text\" class=\"autocomplete noquery  form-control  field text\" />");
                sbHtml.push("<input type=\"hidden\" id=\"" + settings.id + "\" name=\"" + settings.id + "\" class=\"autocomplete\" />");

            }

            $(this).append(sbHtml.join(""));
            if (settings.id != null) {
                if (settings.type == "date") {
                    var methodName = "datepicker";

                    if (jQuery().datepicker == undefined) {
                        $.ajax({
                            url: rootSfsAppUrl + "/Static/v2/" + methodName + "/js/bootstrap-" + methodName + ".js",
                            dataType: "script",
                            async: false

                        });
                    }
                    //cleanDateConfig($(this).find("#" + settings.id), "datepicker");
                    setDateConfig($(this).find("#" + settings.id), "datepicker");
                } else if (settings.type == "autocomplete") {
                    //start autocomplete
                    if (jQuery().select2 == undefined) {
                        $.ajax({
                            url: rootSfsAppUrl + "Scripts/select2/select2.min.js",
                            dataType: "script",
                            async: false
                        });
                    }
                    var text_search = "";
                    var text_finded = false;
                    var url = settings.url;
                    if (url == null) {
                        if (settings.globaData == "user-global") {
                            url = rootSfsAppUrl + "SFSdotNetFrameworkSecurity/secUsers/GetByJson?filter=" + "|" + "&usemode=globaluser&ui=cmeTask&fmode=GlobalUser&" + settings.extraQuery;
                        }
                    }

                    $('#' + settings.id + 'Text').select2({
                        closeOnSelect: true,

                        theme: "bootstrap",

                        width: '100%',
                        dropdownAutoWidth: true,

                        placeholder: placeHolderX,

                        minimumInputLength: 4,
                        formatInputTooShort: function (input, min) {
                            return "";
                        },

                        allowClear: true,

                        createSearchChoice: function (term, data) {

                            if (text_finded == false) {
                                if (settings.globaData == "user-global") {
                                    if (settings.allowUnregistered == false) {
                                        return false;
                                    }
                                    var xtranew = "";
                                    //if (item.id == "00000000-0000-0000-0000-000000000000"){
                                    xtranew = "<span class='label label-warning'>Nuevo</span><br/>(Debe ser un correo electr&#243;nico)";
                                    //}
                                    return {
                                        id: "00000000-0000-0000-0000-000000000000|" + term,
                                        text: term,
                                        idFile: "00000000-0000-0000-0000-000000000000",
                                        img: rootSfsAppUrl + "Content/images/no_image.jpg",
                                        email: "",
                                        textHtml: term + " " + xtranew
                                    };
                                } else {
                                    if (settings.allowUnregistered == false) {
                                        return false;
                                    }
                                    if ($(data).filter(function () {
                                        return this.text.localeCompare(term) === 0;
                                    }).length === 0) {
                                        if (data.id == undefined) {
                                            return { id: "00000000-0000-0000-0000-000000000000|" + term + '', text: term + ' (<strong>new</strong>)' };
                                        }
                                        return {
                                            id: data.id,
                                            text: data.Name
                                        };
                                    }
                                }
                            }
                        },

                        ajax: {
                            url: function () {
                                return url;
                            },
                            cache: false,
                            dataType: 'json',
                            data: function (term, page) {
                                text_search = term;
                                return {
                                    q: term
                                };
                            },
                            //formatSelection :FormatSelection,

                            results:
                                function (data, page) {
                                    if (data.length == 0) {
                                        text_finded = false;
                                    }
                                    return {

                                        results: $.map(data, function (item) {


                                            if (text_search == item.Email) {
                                                text_finded = true;
                                            } else {
                                                text_finded = false;
                                            }
                                            if (settings.globaData == "user-global") {
                                                return {
                                                    isInvited: item.IsInvited,
                                                    id: item.Id,

                                                    textHtml: getHtmlAutocompleteIntegrations(item) + "<strong>" + item.UserName + "</strong>"


                                                    ,
                                                    img: item.UrlImage,
                                                    email: item.Email,
                                                    idFile: item.GuidSecFile,
                                                    displayName: item.DisplayName,

                                                    text: item.UserName


                                                };
                                            } else {
                                                return { id: item.Value, text: item.Text };


                                            }

                                        })

                                        //results: data

                                    };
                                }
                        },
                        formatSelection: function (term) {
                            if (settings.globaData == "user-global") {
                                var append = "<br /> " + term.email + "";
                                if (term.email == "") {
                                    append = "";
                                    term.email = term.text;
                                    term.displayName = term.text;
                                }
                                return "<div class='select2-user-result'><table displayName='" + term.displayName + "' email='" + term.email + "'><tr><td><img width='40' displayName='" + term.displayName + "' email='" + term.email + "' idFile='" + term.idFile + "' height='40' style='width:40px;height:40px' src='" + term.img + "' /></td><td><strong>" + term.textHtml + "</strong>" + append + "</td></tr></table></div>";
                            } else {
                                return term.text;
                            }
                        },
                        formatResult: function (term) {
                            if (settings.globaData == "user-global") {
                                var isinvitedHtml = "";
                                if (term.isInvited == true) {
                                    isinvitedHtml = "<span class='label'>Ha sido invitado pero no se ha registrado</span>";
                                }
                                return "<div class='select2-user-result'><table displayName='" + term.displayName + "' email='" + term.email + "'><tr><td><img displayName='" + term.displayName + "' email='" + term.email + "' width='40' height='40' idFile='" + term.idFile + "' style='width:40px;height:40px'  src='" + term.img + "' /></td><td><strong>" + term.textHtml + "</strong><br /> " + term.email + isinvitedHtml + "</td></tr></table></div>";

                            } else {
                                return term.text;
                            }

                        },
                        initSelection: function (element, callback) {
                            if (settings.globaData == "user-global") {

                            } else {
                                var data = [];
                                $(element.val().split(",")).each(function () {
                                    data.push({ id: this.split("|")[0], text: this.split("|")[1] });
                                });
                                callback(data);
                            }
                        },


                    }).on("change", function (e) {
                        //if (e.removed != null){
                        var data = $("#" + $(e.currentTarget).attr("id")).select2("data");
                        if (data == null) {
                            $(e.currentTarget).parents("div").find("#" + settings.id).attr("value", "");
                            $(e.currentTarget).parents("div").find("#" + settings.id + "Text").attr("value", "");
                            $("#" + settings.id).trigger("change");
                        } else {
                            $(e.currentTarget).parents("div").find(".select2-container .select2-choice").css("height", "auto");
                            $(e.currentTarget).parents("div").find(".select2-container .select2-choice").css("min-height", "30px");

                            // setTimeout(function () {
                            if (data.id.contains("|")) {
                                data.id = data.id.split("|")[0];
                            }
                            $(e.currentTarget).parents("div").find("#" + settings.id).attr("value", data.id);

                            // }, 1000);
                            // setTimeout(function () {

                            $(e.currentTarget).parents("div").find("#" + settings.id + "Text").attr("value", data.text);
                            if (options != null && options.options != null && typeof (options.options.onSelectDone) != "undefined") {
                                options.options.onSelectDone(data);
                            }
                            //}, 1000);
                            $("#" + settings.id).trigger("change");
                        }
                        //}

                    }).on("select2-selecting", function (e) {
                        //  alert($(document.activeElement).val());
                        log("loaded (data property omitted for brevity)");
                    });
                    //end autocomplete
                } else if (settings.type == "text") {
                    if (settings.onEnterKeyPress != null) {

                        $('#' + settings.id + '').listenForEnter()
                            .bind('pressedEnter', function (event) {



                                settings.onEnterKeyPress(event, $(this));

                            });
                    }

                } else if (settings.type == "tags") {
                    var text_search = "";
                    var text_finded = false;
                    var url = settings.url;

                    //start autocomplete
                    if (jQuery().select2 == undefined) {
                        $.ajax({
                            url: rootSfsAppUrl + "Scripts/select2/select2.min.js",
                            dataType: "script",
                            async: false
                        });
                    }

                    $('#' + settings.id + 'Text').val(settings.data);
                    $('#' + settings.id + 'Text').select2({

                        tags: true,
                        formatResult: function (ade) {
                            return "" + ade.text;
                        },
                        formatSelection: function (ade) {
                            return "" + ade.text;
                        },
                        escapeMarkup: function (m) {
                            return m;
                        },
                        tokenSeparators: [','],
                        placeholder: placeHolderX,
                        width: '100%',
                        minimumInputLength: 3,
                        multiple: true,
                        createSearchChoice: function (term, data) {
                            if ($(data).filter(function () {
                             return this.text.localeCompare(term) === 0;
                            }).length === 0) {
                                if (data.GuidTag == undefined) {
                                    return { id: "00000000-0000-0000-0000-000000000000|" + term + '', text: term + ' (<strong>new</strong>)' };
                                }
                                return {
                                    id: data.GuidTag,
                                    text: data.Name
                                };
                            }
                        },

                        ajax: {
                            url: function () {
                                return url;
                            },
                            cache: false,
                            dataType: 'json',
                            data: function (term, page) {
                                text_search = term;
                                return {
                                    q: term
                                };
                            },
                            //formatSelection :FormatSelection,

                            results:
                                function (data, page) {
                                    return {
                                        results: $.map(data, function (item) {
                                            return { id: item.GuidTag, text: item.Name };

                                        })
                                    };
                                }
                        },

                        initSelection: function (element, callback) {
                            //debugger;
                            var data = [];
                            if (options.data != null) {
                                if (typeof (options.data) == "string") {
                                    $("#" + settings.id).attr("value", options.data);
                                    options.data = options.data.split(",");

                                } else {
                                    $("#" + settings.id).attr("value", options.data.join(","));
                                }
                            }

                            $(element.val().split(",")).each(function () {
                                data.push({ id: this.split("|")[0], text: this.split("|")[1] });
                            });
                            callback(data);
                        },
                        maximumSelectionSize: 300,

                        // override message for max tags
                        formatSelectionTooBig: function (limit) {
                            return "Max tags is only " + limit;
                        }

                    }).on("change", function (e) {
                        var data = $("#" + $(e.currentTarget).attr("id")).select2("data");

                        if (data == null) {
                            $(e.currentTarget).parents("div").find("#" + settings.id).attr("value", "");
                            $(e.currentTarget).parents("div").find("#" + settings.id + "Text").attr("value", "");
                            $("#" + settings.id).trigger("change");
                        } else {
                            //$(e.currentTarget).parents("div").find(".select2-container .select2-choice").css("height", "auto");
                            //$(e.currentTarget).parents("div").find(".select2-container .select2-choice").css("min-height", "30px");

                            // setTimeout(function () {
                            var dataArray = new Array();
                            for (var i = 0; i < data.length; i++) {
                                //if (data[i].contains("|")) {
                                if (data[i].id.contains("|")) {
                                    dataArray.push(data[i].id);
                                } else {
                                    dataArray.push(data[i].id + "|" + data[i].text);
                                }
                                //}
                            }
                            //if (data.id.contains("|")) {
                            //    data.id = data.id.split("|")[0];
                            //}
                            $(e.currentTarget).parents("div").find("#" + settings.id).attr("value", dataArray.join(","));



                            $("#" + settings.id).trigger("change");
                        }
                        console.log(data.length)
                        //$('#' + settings.id).attr("value", $('#' + settings.id + 'Text').val());
                        //$('#' + settings.id).val($('#' + settings.id + 'Text').val());
                        //$("#" + settings.id).trigger("change");

                    }).on("select2-selecting", function (e) {
                        //  alert($(document.activeElement).val());
                        log("loaded (data property omitted for brevity)");
                    });
                    //end autocomplete
                }

            }
        });

    }

}(jQuery));

(function ($) {

    $.fn.addHtmlButton = function (options) {

        // Establish our default settings
        var settings = $.extend({
            type: 'a',
            id: null,
            classNames: "btn-default",
            text: 'text',
            options: null
        }, options);

        return this.each(function () {
            var sbHtml = new Array();
            sbHtml.push("<a href=\"#\" class=\"btn " + settings.classNames + "\">" + settings.text + "</a>");
            $(this).append(sbHtml.join(""));
            if (settings.id != null) {

            }
        });

    }

}(jQuery));


function loadingInline(text) {
    return "<span class='loading-inline'><img src='" + rootSfsAppUrl + "Content/ajax-loader.gif' /> " + text + "</span>";

}
function setTabIndex(jqElement, index) {
    if (jqElement.hasClass("autocomplete")) {
        $("#s2id_" + jqElement.attr("id") + "Text .select2-focusser").attr("tabindex", index);
    } else if (jqElement.hasClass("datetime")) {
        $("#" + jqElement.attr("id")).attr("tabindex", index);

    } else if (jqElement.hasClass("time")) {
        $("#_" + jqElement.attr("id")).attr("tabindex", index);

    } else {

        jqElement.attr("tabindex", index);
    }
}
function setFocus(jqElement) {
    if (jqElement.hasClass("autocomplete")) {
        var tar = $("#" + jqElement.attr("id") + "Text");
        if (tar.length > 0) {
            tar.select2("focus");
        }
    } else {
        jqElement.focus();

    }

}
function setFormatListForWorkFlow(jqElement, data, wfInfo, defaultProperty, idTab) {
    //wfInfo = list secWFProcess
    for (var iWFProcess = 0; iWFProcess < wfInfo.length; iWFProcess++) {
        var defaultState = wfInfo[iWFProcess].secWFState;
        //for (var iState = 0; iState < wfInfo[iWFProcess].secWFStates.length; iState++) {
        for (var i = 0; i < data.length; i++) {
            $('tr.itemData', jqElement).eq(i).find("td.cel" + defaultProperty).each(function () {
                if (wfInfo[iWFProcess].secBizObjProperty != null) {
                    var currentState = null;
                    if (data[i][wfInfo[iWFProcess].secBizObjProperty.Name] != null) {
                        var stateFinded = $.grep(wfInfo[iWFProcess].secWFStates, function (e) { return e.GuidWFState == data[i][wfInfo[iWFProcess].secBizObjProperty.Name]; });
                        //for (var i = 0; i < wfInfo[iWFProcess].secWFStates.length; i++) {
                        if (stateFinded.length > 0) {
                            //$($(this).find("a")[0]).after("<span class='" + stateFinded[0].ColorClassName + "'>" + stateFinded[0].Title + "</span>");
                            currentState = stateFinded[0];
                        }
                        //}
                        //$($(this).find("a")[0]).after("<span class='" + wfInfo[iWFProcess].secWFStates[iState].ColorClassName + "'>" + wfInfo[iWFProcess].secWFStates[iState].Title + "</span>");
                    }

                    if (currentState != null) {

                        $($(this).find("a")[0]).after(" <span class='" + currentState.ColorClassName + "'>" + currentState.Title + "</span>");
                        if (currentState.ColorClassNameRow != null) {
                            $(this).closest("tr").find("td").each(function () {
                                $(this).addClass(currentState.ColorClassNameRow);
                            });
                        }
                    } else {
                        $($(this).find("a")[0]).after(" <span class='label label-default'>En espera</span>");

                    }
                }
            });
        }
        //}

    }
    /*for (var i = 0; i < data.length; i++) {

        if (data[i].IsException == true) {
            $('tr.itemData', jqElement).eq(i).find("td").each(function () {
                $(this).addClass("list-error");
            });
        }

        if (data[i].Title != null) {
            $('tr.itemData', jqElement).eq(i).find("td.celTitle").each(function () {

                if (data[i].Title.length > 99) {

                    $($(this).find("a")[0]).text(data[i].Title.substring(0, 97) + "...");
                    $($(this).find("a")[0]).attr("title", data[i].Title)

                }
            });
        }

    }*/
}

// #endregion
function getHtmlAutocompleteIntegrations(item) {
    var sb = new Array();
    if (item.Integrations != undefined) {
        for (var i = 0; i < item.Integrations.length; i++) {
            sb.push("<img src='" + item.Integrations[i].ModuleIconUrl + "'/> (" + item.Integrations[i].EntityName + ") ");
        }
    }
    return sb.join("").toString();
}
function getClickElement() {
    var element = null;
    if (typeof (event) == "undefined" || event == null) {
        element = lastLinkElement;
    } else {
        element = event.srcElement;
    }
    return element;
}
function changeIntegrationList(selectElement, id, other) {
    var url = rootSfsAppUrl + selectElement.attr("int-module") + "/" + selectElement.attr("int-setname") + "/ListViewGen?idTab=" + selectElement.attr("int-setname") + "&fk=&fkValue=&int=1";
    if (other == true) {
        callServerGetHtml(url, function (data) {
            $("#place-list" + id + " .current").hide();
            $("#place-list" + id + " .other").html(data);
        }, null);
    } else {
        $("#place-list" + id + " .current").show();
        $("#place-list" + id + " .other").html("");

    }
}
function addIntegratedInfoForm(idCurrent, idIntegration, intDef, entity, module, jqMenu, caseForm, idTab) {
    // hace la llamada al metodo  del servidor para traer la info de integración del registro
    if (idIntegration == null) {
        idIntegration = "";
    }
    var url = rootSfsAppUrl + "Features/GetIntegrationInfoItem?idCurrent=" + idCurrent + "&idIntegration=" + idIntegration + "&entity=" + entity + "&module=" + module;
    callServerGet(url, function (data) {
        for (var i = 0; i < data.IntegratedItems.length; i++) {
            if (data.IntegratedItems[i].ItemID != null) {
                jqMenu.find("#det-integrations").prepend("<li><a startFilter='" + data.IntegratedItems[i].StartFilterForIntegrate + "' href='" + data.IntegratedItems[i].ItemUrl + "' target='_blank'> <img title='" + data.IntegratedItems[i].ModuleName + "' alt='" + data.IntegratedItems[i].ModuleName + "' src='" + data.IntegratedItems[i].ModuleIconUrl + "'  /> (" + data.IntegratedItems[i].EntityName + ") " + data.IntegratedItems[i].ItemDescription + "</a></li>");
            } else {
                jqMenu.find("#det-integrations").prepend("<li><a startFilter='" + data.IntegratedItems[i].StartFilterForIntegrate + "' href='" + data.IntegratedItems[i].ItemUrl + "' class='not-integrated'> <img title='" + data.IntegratedItems[i].ModuleName + "' alt='" + data.IntegratedItems[i].ModuleName + "' src='" + data.IntegratedItems[i].ModuleIconUrl + "'  /> " + data.IntegratedItems[i].ItemDescription + "</a></li>");
            }
        }
        if (idIntegration != "") {
            jqMenu.find("#det-integrations").append("<li><a href='#' class='not-integrated manage-integration' integrationid='' ><i class=' icon-resize-full'></i> Desintegrar del catálogo actual</a></li>");
        }
        //             <li role='presentation'><a href='#' class='lnk-Int-Details' integrationid='' ><i class=' icon-resize-full'></i> Desintegrar del catálogo actual</a></li>

        prepareOpenDetailsIntegration(idCurrent, idIntegration, intDef, entity, module, jqMenu, caseForm);
    });
}
function changeListLayout(jqElement, wrapper) {
    jqElement.find(".headers").hide();
    var indexTD = null;
    var indexLoop = 0;
    jqElement.find(".headers").find("td").each(function () {
        if ($(this).hasClass("max100percent") && indexTD == null) {
            indexTD = indexLoop;
        }
        if (indexTD != null) {
            indexLoop++;
        }
    });
    jqElement.find(".headers").after("<tr class=' headers headerIntegrated'></tr>");
    var htmlHeader = new Array();

    htmlHeader.push("<td> </td>");
    jqElement.find(".headerIntegrated").append(htmlHeader.join("").toString());

}
function prepareOpenDetailsIntegration(idCurrent, idIntegration, intDef, entity, module, jqElement, caseForm) {
    if (caseForm == "details") {
        jqElement.find(".not-integrated").click(function (e) {
            e.preventDefault();
            var startFilter = "";
            if ($(this).attr("startFilter") != null && $(this).attr("startFilter").length > 0) {
                startFilter = $(this).attr("startFilter");
            }
            var url = $(this).attr("href") + "?startFilter=" + startFilter + "&idTab=int2Other&fk=&fkValue=&popup=1&isLookUp=true&forSelect=1&propReturn=int2OtherResult&dialogId=modal_int2Other";
            //var int2OtherResult = null;
            var isIntDetails = false;
            if ($(this).hasClass("manage-integration")) {
                isIntDetails = true;
            }
            if (isIntDetails) {
                url = rootSfsAppUrl + "SFSdotNetFrameworkSecurity/secSyncIntegrators/DetailsViewGen/" + idIntegration + "?popup=1&dec=true";
            }
            openModal($("<a popupId='modal_int2Other' href='" + url + "'></a>"), function () {
                if (window["int2OtherResult"] != null) {

                    callServerGet(rootSfsAppUrl + "Features/SetIntegrationTwoItems?currentModule=" + module + "&currentEntity=" + entity + "&currentId=" + idCurrent + "&intDef=" + intDef + "&otherId=" + window["int2OtherResult"].Id,
                   function (data) {

                   });
                }
            });

        });

    } else {


    }
}
function integratedInfoFormDone(data) {
    // agrega la info que obtuvo del server
}
// #region "CallServer"
function callServerGet(url, endMethod, jqElement) {
    if (typeof (jqElement) != "undefined" && jqElement != null) {
        if (jqElement.attr("data-loading-text") != null) {
            jqElement.button('loading');
        }
    }

    $.ajax({
        cache: false,
        url: url,
        dataType: 'json',
        data: null,
        success: function (data) {
            if (typeof (jqElement) != "undefined" && jqElement != null) {
                if (jqElement.attr("data-loading-text") != null) {
                    if (jqElement.attr("data-complete-text") != null) {
                        jqElement.button('complete');
                    } else {
                        jqElement.button('reset');
                    }
                }
            }
            this.t_endMethod = endMethod;
            this.t_endMethod(data);
        }
    });

}

jQuery().ajaxStart(function () {
    alert("it begins");
})


function prepareErrorField(jqElement, message) {

}
function setErrorField(jqElement, message) {
    jqElement.each(function () {
        //if (highlight == true )
        $("#dc" + $(this).attr("id")).addClass("error");
        $("#dc" + $(this).attr("id"))
        $(this).attr("sfs-validation-error", message);
        $(this).addClass("sfs-validation-error");

        var form = $(this).closest("form");
        if (message != null) {
            form.find("#frmSummaryErrors").find(".alert").show();

            form.find("#frmSummaryErrors").find("ul").append("<li class='" + $(this).attr("id") + "'>" + message + "</li>")
        }

        //setDisabled(form.find(".button.save"));

        //$(this).val("");
        //setRequired($(this), true, true);

    });
}
function setOkValidation(jqElement) {
    jqElement.each(function () {
        //if (highlight == true )
        $("#dc" + $(this).attr("id")).removeClass("error");
        $(this).removeAttr("data-val-range-min");
        $(this).removeAttr("data-val-range-max");
        $(this).removeAttr("data-val-range");
        $(this).rules('remove');

        var form = $(this).closest("form");
        $(this).removeAttr("sfs-validation-error");
        $(this).removeClass("sfs-validation-error");
        /*if ( form.find(".sfs-validation-error").length == 0){
            form.find(".button.save").removeAttr("disabled");
        }*/
        var messageLi = form.find("#frmSummaryErrors ul li." + $(this).attr("id"));
        if (messageLi != undefined && messageLi != null) {
            messageLi.remove();
        }
        //} else {
        //    //if (highlight == true)
        //    $("#dc" + $(this).attr("id")).removeClass("error");
        //    $(this).removeAttr("data-val-range");
        //    $(this).removeAttr("data-val-range-max");
        //    $(this).removeAttr("data-val-range-min");


        //}
    });
    /*
        var $form = jqElement.closest("form");
        $form.removeData('validator');
        $form.removeData('unobtrusiveValidation');
        //$.validator.unobtrusive.parseDynamicContent(form);
        $.validator.unobtrusive.parse($form);
        $form.valid();
        */
}

function setRangeValidation(jqElement, from, to, message) {
    var typeData = "";
    if (jqElement.attr("typeData") != undefined && jqElement.attr("typeData") != null) {
        typeData = jqElement.attr("typeData");

    }
    var nameRule = "";
    if (from != null && to != null) {
        nameRule = "fromTo";
    } else if (from != null) {
        nameRule = "from";
    } else if (to != null) {
        nameRule = "to";
    }
    jQuery.validator.addMethod("rangeVal",
        function (value, element, params) {

            var val = null;
            if (typeData == "date") {
                val = getDate(jqElement);
            } else if (typeData == "integer") {
                val = parseInt(jqElement.val());
            } else if (typeData == "decimal") {
                val = parseFloat(jqElement.val()).toFixed(2);

            }

            if (nameRule == "fromTo") {



                return val >= from && val <= to;
            } else if (nameRule == "from") {
                return val >= from;

            } else if (nameRule == "to") {
                return val <= to;
            }

        }, message);
    jqElement.each(function () {
        $(this).rules('add', { rangeVal: nameRule });

        // if (highlight == true) {
        $("#dc" + $(this).attr("id")).addClass("error");
        $("#dc" + $(this).attr("id")).addClass("has-error");
        //}
        $(this).attr("data-val-range-min", from);
        $(this).attr("data-val-range-max", to);
        $(this).attr("data-val-range", message);

        //} else {
        //    if (highlight == true)
        //        $("#dc" + $(this).attr("id")).removeClass("error");
        //    $(this).removeAttr("data-val-range");
        //    $(this).removeAttr("data-val-range-max");
        //    $(this).removeAttr("data-val-range-min");


        //}
    });

    //var $form = jqElement.closest("form");
    //$form.removeData('validator');
    //$form.removeData('unobtrusiveValidation');
    ////$.validator.unobtrusive.parseDynamicContent(form);
    //$.validator.unobtrusive.parse($form);
    //$form.valid();





}
function setDisabledOne(element, disabled) {

}

function setDisabled(jqElements, disabled) {
    jqElements.each(function () {
        var jqElement = $(this);
        if (disabled == undefined) {
            disabled = true;
        }
        var tagName = "";
        if (jqElement.prop("tagName") != undefined && jqElement.prop("tagName").toLowerCase() == "a") {
            tagName = "a";
        } else if (jqElement.prop("tagName") != undefined && jqElement.prop("tagName").toLowerCase() == "button") {
            tagName = "button";
        } else if (jqElement.prop("tagName") != undefined && jqElement.prop("tagName").toLowerCase() == "select") {
            tagName = "select";
        }
        if (jqElement.prop("tagName") != undefined && jqElement.prop("tagName").toLowerCase() == "input") {
            if (jqElement.attr("type") == "checkbox") {
                tagName = "checkbox";
            }
        }
        if (disabled == true) {

            jqElement.attr("onmousedown", "return false;");
            jqElement.attr("onselectstart", "return false;");

            if (tagName == "a") {
                jqElement.off("click");
                jqElement.attr("old-href", jqElement.attr("href"));
                jqElement.attr("old-onclick", jqElement.attr("onclick"))
                jqElement.removeAttr("href");
                jqElement.removeAttr("onclick");
                jqElement.attr("disabled", "disabled");

            } else if (tagName == "checkbox") {
                jqElement.off("click");
                jqElement.attr("disabled", true);

            } else if (tagName == "button") {
                jqElement.off("click");
                jqElement.attr("disabled", true);
            } else if (jqElement.hasClass("autocomplete")) {

                //setTimeout(function () {
                jqElement.closest("div").find("input.autocomplete.field.text").select2("readonly", true);
                //try{
                //    jqElement.select2().enable(false);
                //}catch(e){
                //    jqElement
                //}
                //}, 1000);
            } else {

                if (jqElement.hasClass("datetime") == true) {
                    jqElement.closest("div").find("span.add-on").hide();
                    jqElement.closest("div").find("span.input-group-addon").hide();

                } else if (jqElement.hasClass("autocomplete") == true) {
                    jqElement.closest("div").find("input.autocomplete.field.text").select2("disable");
                }
                jqElement.prop("readonly", true);
                if (tagName == "select") {
                    jqElement.addClass("disabled");
                    jqElement.attr("readonly", "readonly");

                }
                var orIndex = jqElement.attr("tabindex");
                if (orIndex != undefined && orIndex != null && orIndex != "-1") {
                    jqElement.attr("orindex", orIndex);
                    jqElement.attr("tabindex", "-1");
                }
            }
        } else {
            if (tagName == "a") {
                jqElement.on("click");
                jqElement.attr("href", jqElement.attr("old-href"));
                jqElement.attr("onclick", jqElement.attr("old-onclick"));
                jqElement.attr("disabled", false);
                jqElement.removeAttr("disabled");
                jqElement.removeClass("disabled");


            } else if (tagName == "button") {
                jqElement.on("click");
                jqElement.removeAttr("disabled");
                jqElement.removeClass("disabled");
            }
            else if (tagName == "checkbox") {
                jqElement.on("click");
                jqElement.removeAttr("disabled");


            }

            if (tagName == "select") {
                jqElement.removeAttr("disabled");
                jqElement.removeClass("disabled");
                jqElement.removeAttr("onmousedown");
                jqElement.removeAttr("onselectstart");
                jqElement.prop("readonly", false);
                jqElement.removeAttr("readonly");
            } else {
                jqElement.removeAttr("onmousedown");
                jqElement.removeAttr("onselectstart");

                if (jqElement.hasClass("datetime") == true) {
                    jqElement.closest("div").find("span.add-on").show();
                    jqElement.closest("div").find("span.input-group-addon").show();
                } else if (jqElement.hasClass("autocomplete") == true) {
                    jqElement.closest("div").find("input.autocomplete.field.text").select2("enable");
                }

                jqElement.prop("readonly", false);
                jqElement.removeAttr("readonly");
                jqElement.removeAttr("disabled");
                jqElement.removeClass("disabled");


            }

            var orIndex = jqElement.attr("orindex");
            if (orIndex != undefined && orIndex != null) {
                jqElement.attr("tabindex", orIndex);
            }
            jqElement.removeAttr("orindex");
        }
    });


}
function setRequired(jqElement, required, highlight) {
    if (typeof (required) == "undefined") {
        required = true;
    }
    if ($.isArray(jqElement)) {
        if (jqElement.length > 0) {
            for (var i = 0; i < jqElement.length; i++) {
                jqElement[i].each(function () {
                    if (required == true) {
                        if (highlight == true)
                            $("#dc" + $(this).attr("id")).addClass("error");
                        //$(this).attr("data-val", true);
                        var textError = valRequiredMessage.replace("{0}", $('label[property="' + $(this).attr("id") + '"]').text());
                        //$(this).closest("form").validate();
                        $(this).rules("add", {
                            required: true,
                            //minlength: 2,
                            messages: {
                                required: textError
                                //,
                                //minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
                            }
                        });
                        $(this).attr("data-val", true);
                        $(this).attr("data-val-required", textError);

                        $("#dc" + $(this).attr("id") + " .field-validation-valid").text(textError);
                        if ($("#dc" + $(this).attr("id") + " .reqsymb").length > 0) {
                            $("#dc" + $(this).attr("id") + " .reqsymb").text("*");
                            $("#dc" + $(this).attr("id") + " .reqsymb").addClass("error");

                        } else {
                            $('label[property="' + $(this).attr("id") + '"]').after("<span class=\"reqsymb error\">*</span>");

                        }
                    } else {
                        //if (highlight == true)
                        $("#dc" + $(this).attr("id")).removeClass("error");
                        $("#dc" + $(this).attr("id")).removeClass("has-error");
                        $(this).removeAttr("data-val");
                        $(this).removeAttr("data-val-required");
                        $(this).rules('remove', 'required');
                        $("#dc" + $(this).attr("id") + " .reqsymb").text("");
                        $("#dc" + $(this).attr("id") + " .reqsymb").removeClass("error");
                    }

                });
            }
            /*
            var $form = jqElement[0].closest("form"); // se asume que todos son del mismo formulario
            $form.removeData('validator');
            $form.removeData('unobtrusiveValidation');
            //$.validator.unobtrusive.parseDynamicContent(form);
            $.validator.unobtrusive.parse($form);
            $.validator.setDefaults({
                focusInvalid: true
            });
            */
        }

    } else {
        jqElement.each(function () {
            var formParent = $(this).closest("form");
            if (required == true) {
                if (highlight == true)
                    $("#dc" + $(this).attr("id")).addClass("error");
                // $(this).attr("data-val", true);
                var textError = valRequiredMessage.replace("{0}", $('label[property="' + $(this).attr("id") + '"]', formParent).text());
                //$(this).closest("form").validate();
                //$(this).attr("data-val-required", textError);
                $(this).attr("data-val", true);
                $(this).attr("data-val-required", textError);
                $(this).rules("add", {
                    required: true,
                    //minlength: 2,
                    messages: {
                        required: textError
                        //,
                        //minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
                    }
                });
                $("#dc" + $(this).attr("id") + " .field-validation-valid", formParent).text(textError);
                if ($("#dc" + $(this).attr("id") + " .reqsymb", formParent).length > 0) {
                    $("#dc" + $(this).attr("id") + " .reqsymb", formParent).text("*");
                    $("#dc" + $(this).attr("id") + " .reqsymb", formParent).addClass("error");
                } else {
                    $('label[property="' + $(this).attr("id") + '"]', formParent).after("<span class=\"reqsymb error\">*</span>");
                }

            } else {
                //if (highlight == true)
                $("#dc" + $(this).attr("id"), formParent).removeClass("error");
                $("#dc" + $(this).attr("id"), formParent).removeClass("has-error");
                $(this).removeAttr("data-val");
                $(this).removeAttr("data-val-required");
                $(this).rules('remove', 'required');
                $("#dc" + $(this).attr("id") + " .reqsymb", formParent).text("");
                $("#dc" + $(this).attr("id") + " .reqsymb", formParent).removeClass("error");

            }

        });
    }
    //var $form = jqElement.closest("form");
    /*$form.removeData('validator');
    $form.removeData('unobtrusiveValidation');
    //$.validator.unobtrusive.parseDynamicContent(form);
    $.validator.unobtrusive.parse($form);
    */
    if (required == false) {
        //$form.valid();
    }

}

function setCompleteValidations(jqElement) {
    var $form = jqElement; // se asume que todos son del mismo formulario
    $form.removeData('validator');
    $form.removeData('unobtrusiveValidation');
    //$.validator.unobtrusive.parseDynamicContent(form);
    $.validator.unobtrusive.parse($form);
    $.validator.setDefaults({
        ignore: [],
        focusInvalid: true
    });
}
function callServerGetHtml(url, endMethod, jqElement) {
    var orCont = null;
    if (jqElement != undefined) {
        if (jqElement.attr("data-loading-text") != null) {
            jqElement.button('loading');
        }
    } else {
        //showLoading();
    }
    //clickelement.attr("disabled", true);

    $.ajax({
        url: url,
        dataType: 'html',
        data: null,
        cache: false,
        success: function (data) {
            if (jqElement != undefined) {
                if (jqElement.attr("data-loading-text") != null) {
                    if (jqElement.attr("data-complete-text") != null) {
                        jqElement.button('complete');
                    } else {
                        jqElement.button('reset');
                    }
                }
            }
            this.t_endMethod = endMethod;
            this.t_endMethod(data);

        }
    });

    return false;

}

function callServerSend(url, jsonPostData, endMethod, jqElement) {
    var data = JSON.stringify(jsonPostData);
    if (jqElement != undefined) {
        if (jqElement.attr("data-loading-text") != null) {
            jqElement.button('loading');
        }
    } else {
        //showLoading();
    }

    var that = this;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        error: function (data) {
            var x = data;
        },
        // error: onError,
        //        beforeSend: function (x) {
        //            if (x && x.overrideMimeType) {
        //                x.overrideMimeType("application/json;charset=iso-8859-1");
        //            }
        //        },

        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {

            if (jqElement != undefined) {
                if (jqElement.attr("data-loading-text") != null) {
                    if (jqElement.attr("data-complete-text") != null) {
                        jqElement.button('complete');
                    } else {
                        jqElement.button('reset');
                    }
                }
            }
            this.t_endMethod = endMethod;
            this.t_endMethod(data);
        },
        dataType: 'json'
    });


}
// #endregion



function FixField(id, type) {
    var elem = null;
    if (type == "year") {
        elem = $("#" + id + "_Year");
        if (isNaN(elem.val()) == false) {
            // es numero
            if (elem.val().length == 2) {
                elem.val("20" + elem.val());
            }
        } else {
            elem.val("");
        }
    } else if (type == "month") {
        elem = $("#" + id + "_Month");
        if (isNaN(elem.val()) == false) {
            var _month = parseInt(elem.val());
            if (_month > 12) {
                elem.val("12");
            } else if (_month < 1) {
                elem.val("01");
            }
            if (elem.val().length == 1) {
                elem.val("0" + elem.val());
            }

        } else {
            elem.val("");
        }
    } else if (type == "day") {
        elem = $("#" + id + "_Day");
        if (isNaN(elem.val()) == false) {
            // es numero
            var year = 2000;
            var month = 01;
            if (isNaN($("#" + id + "_Year").val()) == false) {
                year = parseInt($("#" + id + "_Year").val());
            }
            if (isNaN($("#" + id + "_Month").val()) == false) {
                month = parseInt($("#" + id + "_Month").val());
            }
            if (month < 1) {
                $("#" + id + "_Month").val("01");
                month = 01;
            } else if (month > 12) {
                $("#" + id + "_Month").val("12");
                month = 12;

            }
            var days = parseInt(elem.val());
            var _daysInMonth = daysInMonth(month, year);
            if (days > _daysInMonth) {
                elem.val(_daysInMonth.toString());
            } else if (days < 1) {
                elem.val("01");
            }
            if (elem.val().length == 1) {
                elem.val("0" + elem.val());
            }

        } else {
            elem.val("");
        }
    }

}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
var DateDiff = {

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
}
Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}
function getTextFromValue(element) {
    var result = "";
    if (element.hasClass("noquery"))
        return result;
    if (element.length == 0) {

        if (element.hasClass("date") || element.hasClass("datetime")) {
            if (element.closest('tr').find("div.ndays").css("display") == "inline") {
                // se presume que es fecha relativa 

                result = element.closest('tr').find("span.relativeday").text() + " " + element.closest('tr').find("input.timevalue").val() + " " + element.closest('tr').find("button.ndaysdir").text() + " " + element.closest('tr').find("input.ndays").val() + " days";

            } else { // es fecha absoluta
                result = element.val();

            }
        } else if (element.hasClass("autocomplete")) {

            if (element.hasClass("value") == false) {
                result = $("#" + element.attr("id") + "Text").select2('data').text;
            }

        } else {
            //if (element.attr("dataTypeValue") != null) {
            //    if (element.attr("dataTypeValue") == "Guid") {
            //        result = "Guid(\"" + element.val() + "\")";
            //    } else {
            //        result = element.val();
            //    }
            //} else {
            //    result = element.val();
            //}
        }
        // no se encuentra
    } else {
        if (element.hasClass("autocomplete")) {
            if (element.hasClass("value") == false) {
                result = $("#" + element.attr("id") + "Text").select2('data').text;
            }
        } else {
            if (element.attr("dataTypeValue") != null) {
                if (element.attr("dataTypeValue") == "Guid") {
                    result = "Guid(\"" + element.val() + "\")";
                } else {
                    result = element.val();
                }
            } else {
                result = element.val();
            }

        }
        if (element.hasClass("date") || element.hasClass("datetime") || element.hasClass("ndays")) {
            if (element.closest('tr').find("div.ndays").css("display") == "inline") {
                // se presume que es fecha relativa
                result = "(" + element.closest('tr').find("span.relativeday").text() + " " + element.closest('tr').find("input.timevalue").val() + " " + element.closest('tr').find("button.ndaysdir").text() + " " + element.closest('tr').find("input.ndays").val() + " days) ";

            } else { // es fecha absoluta
                result = element.val();

            }
        }


    }
    return result;

}
function setValue(jqElement, value) {
    if (jqElement.hasClass("autocomplete")) {
        $("#" + jqElement.attr("id") + "Text").select2("val", value);
        $("#" + jqElement.attr("id") + "Text").val(value).trigger('change');
        //jqElement.closest("div").find(".select2-search-choice-close")[0].click();


    } else {
        jqElement.val(value);
    }
}
function GetValueFrom(element) {
    var result = "";
    if (element.hasClass("noquery"))
        return result;
    if (element.length == 0) {

        if (element.hasClass("date") || element.hasClass("datetime")) {
            // se presume que es fecha
            result = element.val();
        } else if (element.hasClass("autocomplete")) {

            if (element.hasClass("text") == false) {
                result = element.val();
            }

        } else {
            if (element.attr("dataTypeValue") != null) {
                if (element.attr("dataTypeValue") == "Guid") {
                    result = "Guid(\"" + element.val() + "\")";
                } else {
                    result = element.val();
                }
            } else {
                result = element.val();
            }
        }
        // no se encuentra
    } else {
        if (element.hasClass("autocomplete")) {
            if (element.hasClass("text") == false) {
                if (element.attr("dataTypeValue") != null) {
                    if (element.attr("dataTypeValue") == "Guid") {
                        result = "Guid(\"" + element.val() + "\")";
                    } else {
                        result = element.val();
                    }
                } else {
                    result = element.val();
                }
            } else {
                result = element.val();
            }
        } else {
            if (element.attr("dataTypeValue") != null) {
                if (element.attr("dataTypeValue") == "Guid") {
                    result = "Guid(\"" + element.val() + "\")";
                } else {
                    result = element.val();
                }
            } else {
                result = element.val();
            }

        }
        if (element.hasClass("date") || element.hasClass("datetime")) {
            result = "DateTime(" + getDate(element, "datetimepicker").getUTCFullYear() + "," + (getDate(element, "datetimepicker").getUTCMonth() + 1) + "," + getDate(element, "datetimepicker").getUTCDate() + ")";

        }


    }
    return result;

}


// jQuery plugin: SafeEnter 1.0
// http://plugins.jquery.com/project/SafeEnter
// by teedyay
//
// Fires an event when the user presses Enter, but not whilst they're in the browser's autocomplete suggestions

//codesnippet:2e23681e-c3a9-46ce-be93-48cc3aba2c73
(function ($) {
    $.fn.listenForEnter = function () {
        return this.each(function () {
            $(this).focus(function () {
                $(this).data('safeEnter_InAutocomplete', false);
            });
            $(this).keypress(function (e) {
                var key = (e.keyCode ? e.keyCode : e.which);
                switch (key) {
                    case 13:
                        // Fire the event if:
                        //   - we're not currently in the browser's Autocomplete, or
                        //   - this isn't a textbox, or
                        //   - this is Opera (which provides its own protection)
                        if (!$(this).data('safeEnter_InAutocomplete') || !$(this).is('input[type=text]') || $.browser.opera) {
                            $(this).trigger('pressedEnter', e);
                        }
                        $(this).data('safeEnter_InAutocomplete', false);
                        e.preventDefault();
                        break;

                    case 40:
                    case 38:
                    case 34:
                    case 33:
                        // down=40,up=38,pgdn=34,pgup=33
                        $(this).data('safeEnter_InAutocomplete', true);
                        break;

                    default:
                        $(this).data('safeEnter_InAutocomplete', false);

                        break;
                }
            });
        });
    };

    $.fn.clickOnEnter = function (target) {
        return this.each(function () {
            $(this)
				.listenForEnter()
				.bind('pressedEnter', function () {
				    $(target).click();
				});
        });
    };




})(jQuery);
function lang_sfs() {
    var culture = $.cookie('lang_sfs');
    if (culture != null) {
        if (culture.length > 2) {
            return culture.substring(0, 2);
        } else {
            return culture;
        }
    } else {
        return null;
    }
}
function repositionModal(jqModal, jqElement) {
    jqModal.modal("layout");
    if (typeof (jqElement) != "undefined") {
        if (jqElement.attr("top") == null) {
            jqElement.attr("top", "0");
        }
        if (jqElement.attr("top") != null) {
            jqModal.css("top", jqElement.attr("top") + "px");
            jqModal.css("margin-top", "auto");

        }
    }
    /*  if (typeof (jqElement) != "undefined" &&
          (jqElement.attr("left") != null || jqElement.attr("top") != null || jqElement.attr("width") != null)
          ) {
          if (jqElement.attr("top") != null) {
              jqModal.css("top", jqElement.attr("top") + "px");
              jqModal.css("margin-top", "auto");
  
          }
          if (jqElement.attr("left") != null) {
              jqModal.css("left", jqElement.attr("left") + "px");
              //jqModal.css("right", jqElement.attr("right") + "px");
  
              //jqModal.css("width", "auto");
  
             
          }
          if (jqElement.attr("width") != null) {
              if (jqElement.attr("width") != "auto") {
                  jqModal.css("width", jqElement.attr("width") + "px");
                  jqModal.css("margin-left", "auto");
                  var left = ($(window).width() - parseInt(jqElement.attr("width"))) / 2;
                  jqModal.css("left", left + "px");
              } else {
                  jqModal.css("width", "auto");
              }
              
              //jqModal.css("right", jqElement.attr("right") + "px");
  
              //jqModal.css("width", "auto");
  
              
          }
          //jqModal.modal("layout");
      } else {
          jqModal.modal("layout");
      }*/
}
function getLocaleText(key) {
    var lang = lang_sfs();
    switch (key) {
        case "yes":
            switch (lang) {
                case "es":
                    return "SI";
                default:
                    return "YES";
            }
            break;
        case "not":
            switch (lang) {
                case "es":
                    return "NO";
                default:
                    return "NOT";
            }
            break;

        default:
    }
}
function formatBooleanCells(propertyNames) {
    var replaces = new Array();
    replaces[0] = new Object();
    replaces[0].oldContent = "true";
    replaces[0].newContent = "<span class='label label-success'>" + getLocaleText("yes") + "</span>";
    replaces[1] = new Object();
    replaces[1].oldContent = "false";
    replaces[1].newContent = "<span class='label'>" + getLocaleText("not") + "</span>";

    changeListData(propertyNames, replaces);
}
function changeListData(propertyNames, replaces) {
    var cols = propertyNames.replaceAll(" ", "").split(",");

    var colstring = "";
    if (propertyNames.contains(",")) {
        colstring = cols.join(", .cel");
    } else {
        colstring = propertyNames;
    }
    $(".cel" + colstring).each(function () {
        for (var i = 0; i < replaces.length; i++) {
            $(this).html($(this).html().replace(replaces[i].oldContent, replaces[i].newContent));
        }


    });
}
function getUIVersion() {
    if (typeof (uiVersion) == "undefined") {
        return 1;
    } else {
        return uiVersion;
    }
}

function openModalConfirm(settings, onOk) {

    //var id = "confirm-modal";
    if (settings.buttonText == null) {

    }
    $("body").append('<div id="' + settings.id + '" style="" class="modal fade " data-width="800"> <div class="modal-dialog modal-lg"> <div class="modal-content">  <div class="modal-body text-left">' + settings.content + '</div> <div class="modal-footer">  <button type="button" data-dismiss="modal" class="btn btn-primary" id="primary-btn-' + settings.id + '">' + settings.buttonText + '</button><button type="button" data-dismiss="modal" class="btn">Cancel</button> </div>  </div></div></div>');
    $('#' + settings.id).modal()
    .one('click', '#primary-btn-' + settings.id, function (e) {
        //$form.trigger('submit');
        onOk();
    });
}

function openModal(jqElement, onClose) {
    var url = jqElement.attr("href");
    var preventClose = jqElement.attr("preventClose");
    if (preventClose == undefined)
        preventClose = false;
    else
        preventClose = true;
    if (url.length == 0) {
        url = jqElement.attr("startUrl");
    }
    if (url.contains("popup") == false) {
        if (url.contains("?")) {
            url = url + "&popup=1&";
        } else {
            url = url + "?popup=1&";
        }
    }
    if (url.contains("overrideModule") == false) {
        if (typeof (overrideApp) != "undefined") {
            url = url + "&overrideModule=" + overrideApp + "&";
        } else if (jqElement.attr("overrideApp") != undefined) {
            if (url.contains("?")) {
                url = url + "&overrideModule=" + jqElement.attr("overrideApp") + "&";
            } else {
                url = url + "?overrideModule=" + jqElement.attr("overrideApp") + "&";
            }
        }
    }

    var id = jqElement.attr("popupId");
    var onCloseParam = jqElement.attr("onCloseParam");
    if (id == undefined) {
        id = jqElement.attr("id") + "_popup";
    }
    //id = "modal123";
    var isNew = false;
    if ($("#" + id).length > 0) {
        $("#" + id).remove();
    }
    //$("body").removeClass("modal-open");
    //$("body").removeClass("page-overflow");
    //$(".modal-scrollable").remove();
    //$(".modal-backdrop").remove();
    if ($("#" + id).length == 0) {


        if (getUIVersion() == 2) {
            $("body").append('<div id="' + id + '" style="" class="modal inmodal fade " data-width="800"> <div class="modal-dialog modal-lg"> <div class="modal-content">  <div class="modal-body text-left"><div class="preloader-big"></div></div></div></div></div>');

        } else {
            $("body").append('<div id="' + id + '" class="modal hide fade">  <div class="modal-body text-left"><div class="preloader-big"></div></div></div>');
        }
        isNew = true;
    }
    if (getUIVersion() == 2) {
        $("#" + id).html('<div class="modal-dialog modal-lg "  data-width="800"> <div class="modal-content"><div class="modal-body text-left"><div class="preloader-big"></div></div></div></div></div>');

    } else {
        $("#" + id).html('<div class="modal-body text-left"><div class="preloader-big"></div></div></div>');
    }
    //repositionModal($("#" + id), jqElement);

    if (preventClose) {
        $("#" + id).modal({ keyboard: false, backdrop: 'static' });
    }
    $("#" + id).on('shown.bs.modal', function (e) {
        repositionModal($("#" + id), jqElement);
    });
    $("#" + id).modal({ modalOverflow: true });
    $("#" + id).modal("show");

    if (onClose == undefined) {
        if (jqElement.attr("onCloseMethod") != undefined) {
            onClose = window[jqElement.attr("onCloseMethod")];
        }
    }
    if (isNew == true) {
        if (typeof (onClose) != 'undefined' || onClose != null) {
            $("#" + id).on('hidden', function () {
                if (onCloseParam != null)
                    onClose(onCloseParam);
                else
                    onClose();
                setTimeout(function () {
                    $("#" + id).remove();
                }, 500);

            })
        } else {

            $("#" + id).on('hidden', function () {
                setTimeout(function () {
                    $("#" + id).remove();
                }, 500);

            });
        }
    } else {
        $("#" + id).on('hidden', function () {
            setTimeout(function () {
                $("#" + id).remove();
            }, 500);

        });
    }
    var methodType = "GET";
    var data = null;
    if ((jqElement.attr("postData") != null && jqElement.attr("postData").length > 0) || jqElement.attr("forcePost") == "true") {
        methodType = "POST";
        data = { postData: jqElement.attr("postData") };
    }
    var nocacheControl = "";
    if (methodType == "POST") {
        var currentTime = new Date();
        var n = currentTime.getTime();
        nocacheControl = "&nc=" + n.toString();

    }
    $.ajax({
        type: methodType,
        url: url + nocacheControl,
        dataType: "html",
        data: data,
        cache: false,
        error: function (data) {
            var x = data;
        },
        success: function (data) {


            $("#" + id).html(data);
            setTooltips($("#" + id));
            repositionModal($("#" + id), jqElement);
            if (preventClose) {
                $("#" + id).find(".modal-header").find(".close").hide();
            }
        }
    });
}
var checkPendingsNext = new Date();

function checkPendings() {
    setTimeout(function () {
        callServerGet(rootSfsAppUrl + "Ajax/GetPendings", checkPendingsEnd);
    }, 2000);
}
function showMessages() {
    callServerGet(rootSfsAppUrl + "Messages/GetLatests", showMessagesEnd);
}

function processMessages() {
    callServerGet(rootSfsAppUrl + "Messages/ProcessMessages", processMessagesEnd);
}
function processMessagesEnd(data) {
    //alert("fueron procesados " + data.toString() + "mensajes");

}
var processPendingNotify = null;
function getPendingProcess() {
    callServerGet(rootSfsAppUrl + "Ajax/GetPendingProcess", getPendingProcessEnd);
}
function getPendingProcessEnd(data) {
    var options = { title: "Procesando" };
    var pending = 0;
    var sbText = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].Finished == false) {
            if (data[i].PercentCompleted != null && data[i].PercentCompleted > 0) {
                sbText.push("<span class=''>" + data[i].Title + " " + data[i].PercentCompleted + "%</span>");
            } else {
                sbText.push("<span class=''>" + data[i].Title + "</span>");
            }
            pending++;
        } else {
            sbText.push("<span class='label label-success'>" + data[i].Title + "</span>");
            var menuAction = $(".item-custom-action." + data[i].Id);
            if (menuAction.length > 0 && menuAction.attr("clientFuntionOnFinish") != null) {
                if (menuAction.attr("clientFuntionOnFinish").length > 0) {
                    if (window[menuAction.attr("clientFuntionOnFinish")] != undefined) {
                        window[menuAction.attr("clientFuntionOnFinish")]();
                    }
                }
            }
        }

    }
    if (pending > 0) {
        options.text = sbText.join("<br/>");
        processPendingNotify.pnotify(options);
        setTimeout(function () {

            getPendingProcess();

        }, 8000);
    } else {
        options = { title: "Terminado", icon: "picon picon-process-done-ok" };
        options.text = sbText.join("<br/>");

        processPendingNotify.pnotify(options);
        setTimeout(function () {
            options.hide = true;
            options.closer = true;
            processPendingNotify.pnotify(options);
            processPendingNotify = null;
            //getPendingProcess();

        }, 8000);
        //if (processPendingNotify.pnotify_remove) processPendingNotify.pnotify_remove();
    }
}
function getUnReadedMessages() {
    callServerGet(rootSfsAppUrl + "Messages/CheckNewMessages", getUnReadedMessagesEnd);
}
function getUnNotifiedMessages() {
    callServerGet(rootSfsAppUrl + "Messages/CheckNewMessages", getUnNotifiedMessagesEnd);
}
function getUnReadedMessagesEnd(data) {
    alert(data);
}
function getUnNotifiedMessagesEnd(data) {

}
function showError(title, errorbody) {
    /*if (typeof (title) != 'undefined' || typeof (errorbody) != 'undefined') {
        if ($("#global-error-modal").length == 0) {
            $("body").append("<div id='global-error-modal' class='modal hide fade'> <div class='modal-header'><h3>Lo sentimos, este es un error inesperado</h3></div><div class='modal-body'>" + title + "<textarea rows='10' class='input-xxlarge'>" + errorbody + "</textarea></div><div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Close</button></div> </div>");
        }
        if (typeof (title) != 'undefined') {
            title = title.replaceAll("<style>", "<nostyle style='display:none'>");
            title = title.replaceAll('<style type="text/css">', "<nostyle style='display:none'>");


            title = title.replaceAll("</style>", "</nostyle>");
        }
        if (errorbody != null) {
            errorbody = errorbody.replaceAll("<style>", "<nostyle style='display:none'>");
            errorbody = errorbody.replaceAll("</style>", "</nostyle>");
        }
        $("#global-error-modal").html("<div class='modal-header'><h3>Lo sentimos, este es un error inesperado</h3></div><div class='modal-body'>" + title + "<textarea rows='10' class='input-xxlarge'>" + errorbody + "</textarea></div><div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Close</button></div> ");
        $("#global-error-modal").modal("show");
    }*/
}
function showErrorFromMvc(response) {
    showError(response.responseText);
}

$(document).ready(function () {
    //if (typeof (Pace) != "undefined") {
    //    $(document).ajaxStart(function () { Pace.restart(); });
    //}
    $(function () {
        //setup ajax error handling
        $.ajaxSetup({
            cache: false,
            beforeSend: function (xhr) {
                if (window.event != null) {
                    if (window.event.srcElement != null) {
                        if ($(window.event.srcElement).hasClass("btn") && $(window.event.srcElement).attr("data-loading-text")) {
                            $(window.event.srcElement).button("loading");
                        }
                    }
                }
            },
            error: function (x, status, error) {
                showError(x.responseText);
                $('.btn').button('reset');
            },
            complete: function (xhr, status) {
                if (status === 'error' || !xhr.responseText) {
                    showError(xhr.responseText);
                    $('.btn').button('reset')
                }

            }
        });
    });

});
function setFieldValue(fieldName, value, formId) {
    var placeField = $("#dc" + fieldName + " display-field");
    if (placeField.length == 0) {
        placeField = $("#dc" + fieldName + " editor-field");
    }
    if (placeField.length == 1) {
        placeField.val(value);
    }
}
var currentSoundNotify = null;
var currentSoundCheckIn = null;
function playSoundSetup(typeSound) {
    //alert(soundManager);
    soundManager.setup({
        url: rootSfsAppUrl + 'Scripts/soundmanager2/swf/',
        onready: function () {
            currentSoundNotify = soundManager.createSound({
                id: 'aSound',
                url: rootSfsAppUrl + 'Content/newMessageSound.mp3'
            });
            currentSoundCheckIn = soundManager.createSound({
                id: 'check-in',
                url: rootSfsAppUrl + 'Content/beep-08b.mp3'
            });
            if (typeSound == "new-messate")
                currentSoundNotify.play();
            if (typeSound == "check-in")
                currentSoundCheckIn.play();
        },
        ontimeout: function () {
            // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
        }
    });
}


function playSoundNotify() {
    if (typeof (soundManager) == "undefined") {
        $.ajax({
            url: rootSfsAppUrl + "Scripts/soundmanager2/script/soundmanager2-jsmin.js",
            dataType: "script",

            success: function () {
                playSoundSetup();
            }
        });
    } else {
        if (currentSoundNotify == null) {
            playSoundSetup("new-message");

        } else {
            currentSoundNotify.play();
        }
    }
}
function playSound(typeSound) {
    if (typeof (soundManager) == "undefined") {
        $.ajax({
            url: rootSfsAppUrl + "Scripts/soundmanager2/script/soundmanager2-jsmin.js",
            dataType: "script",

            success: function () {
                playSoundSetup(typeSound);
            }
        });
    } else {
        if (typeSound == "new-message") {
            if (currentSoundNotify == null) {
                playSoundSetup(typeSound);

            } else {
                currentSoundNotify.play();
            }
        } else if (typeSound == "check-in") {
            if (currentSoundCheckIn == null) {
                playSoundSetup(typeSound);

            } else {
                currentSoundCheckIn.play();
            }
        }
    }
}
function showNotification(message, type) {
    $.pnotify.defaults.history = false;
    var typeName = "";
    if (type == "ok") {
        typeName = "success";
    } else {
        typeName = type;
    }
    var processPendingNotify = $.pnotify({
        //nonblock: true,
        type: typeName,
        // hide: false,
        //closer: false,
        //sticker: false,
        //title:  ' Procesando...',
        text: message
        //,
        //icon: 'picon picon-process-progress'
    });
    processPendingNotify.pnotify_display();

}
function checkPendingsEnd(data) {

    if (data != null) {
        if (data.MessagesForShow != null) {
            if (data.MessagesForShow > 0) {
                showMessages();
            }
            if (data.MessagesForProcess > 0) {
                processMessages();
            }
            if (data.OtherSystemPendings > 0) {
                checkSystemPendings();
            }

            if (data.UnReadedMessages > 0) {
                $("#unreadedmessages").text(data.UnReadedMessages.toString());
                //alert("Reproducir sonido");
            }
            if (data.ProcessPending > 0) {
                getPendingProcess();
                $.pnotify.defaults.history = false;
                if (processPendingNotify) {
                    processPendingNotify.pnotify_display();
                } else {
                    processPendingNotify = $.pnotify({
                        nonblock: true,
                        hide: false,
                        closer: false,
                        sticker: false,
                        title: data.ProcessPending + ' Procesando...',
                        text: 'Espere por favor',
                        icon: 'picon picon-process-progress'
                    });
                }
            }
            var overrideAppStr = "";
            if (typeof (overrideApp) != "undefined") {
                overrideAppStr = overrideApp;
            }
            if (data.UnNotifiedMessages > 0) {
                //$.pnotify.defaults.history = false;
                //playSoundNotify();
                //$.pnotify({
                //    title: data.UnNotifiedMessages.toString() + ' Nuevos mensajes',
                //    text: '<a href="' + rootSfsAppUrl + 'SFSdotNetFrameworkSecurity/secMessages?overrideModule=' + overrideAppStr + '&usemode=myall">ver mensajes</a>',
                //    icon: 'picon picon-mail-unread-new'
                //});
            }
        }
    }
}
function checkSystemPendings() {
    if ($("#verifyEmail-322").length == 0) {
        openModal($("<a preventClose='true'   href='" + rootSfsAppUrl + "SFSdotNetFrameworkSecurity/MyAccount/UnverifiedEmail?popup=true' popupId='verifyEmail-322'></a>"));
    }
}

function showMessagesEnd(data) {
    if (data != null) {
        if (getUIVersion() == 2) {
            for (var i = 0; i < data.length; i++) {
                showNotification(data[i].Message, data[i].Type.toLowerCase());

            }
        } else {
            var title = null;
            if ($("#frmTitle").length > 1) {
                title = $($("#frmTitle")[0]);
            } else {
                title = $("#frmTitle");
            }
            if ($("#frmTitle").length == 0 && $(".page-header").length == 1) {
                title = $(".page-header");//.closest(".row-fluid");
            }

            for (var i = 0; i < data.length; i++) {
                if (data[i].Type.toLowerCase() == "ok") {
                    title.after('<div class="row-fluid"><div class="span12 alert alert-block alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>' + data[i].Message + '</div></div>');

                } else if (data[i].Type.toLowerCase() == "warning") {
                    title.after('<div class="row-fluid"><div class="span12 alert alert-block alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button>' + data[i].Message + '</div></div>');
                    // $.ctNotify(data[i].Message);
                } else if (data[i].Type.toLowerCase() == "error") {
                    title.after('<div class="row-fluid"><div class="span12 alert alert-block alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>' + data[i].Message + '</div></div>');
                    // $.ctNotify(data[i].Message);
                } else {
                    title.after('<div class="row-fluid"><div class="span12 alert alert-block alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button>' + data[i].Message + '</div></div>');
                    // $.ctNotify(data[i].Message, data[i].Type);
                }



            }
        }

    }
}

function closeCurrentDialog(element) {

    var dialog = $(element).parents(".modal"); // buscar hacia arriba el dialog a cerrar
    if (dialog.length > 0) {

        dialog.modal("hide");


    }
    return false;
}

EventManager =
		{
		    Registry: [],

		    Subscribe: function (eventName, method) {
		        if (method === undefined) return;

		        var events = this.Registry[eventName];
		        if (events === undefined) {
		            this.Registry[eventName] = [];
		            events = this.Registry[eventName];
		        }
		        if (typeof (method) === 'function') {
		            var methodIndex = -1;
		            for (var i = 0; i < events.length; i++) {
		                if (events[i] === method) {
		                    methodIndex = i;
		                    break;
		                }
		            }
		            if (methodIndex === -1) {
		                events.push(method);
		            }

		        }
		    },

		    UnSubscribe: function (eventName, method) {
		        if (method === undefined) return;

		        var events = this.Registry[eventName];
		        if (events !== undefined) {
		            var methodIndex = -1;
		            for (var i = 0; i < events.length; i++) {
		                if (events[i] === method) {
		                    methodIndex = i;
		                    break;
		                }
		            }
		            if (methodIndex !== -1) {
		                events.splice(methodIndex, 1);
		            }
		        }
		    },

		    Publish: function (eventName) {
		        var events = this.Registry[eventName];
		        var args = [];
		        var i;
		        for (i = 1; i < arguments.length; i++) {
		            args.push(arguments[i]);
		        }

		        if (events !== undefined) {
		            for (i = 0; i < events.length; i++) {
		                events[i].apply(this, args);
		            }
		        }
		    },
		    UnSubscribeAll: function (eventName) {

		        var events = this.Registry[eventName];
		        if (events !== undefined) {

		            this.Registry[eventName] = [];

		        }
		    }

		};
function isPropertyDefined(name, obj) {
    var result = false;
    if (obj[name] != undefined) {
        result = true;

    }

    return result;
}

function ArrayIndexOf(a, fnc) {
    if (!fnc || typeof (fnc) != 'function') {
        return -1;
    }
    if (!a || !a.length || a.length < 1) return -1;
    for (var i = 0; i < a.length; i++) {
        if (fnc(a[i])) return i;
    }
    return -1;
}
function setOrderFields(fieldsOrdered, obj) {
    if (fieldsOrdered.length > 0) {

        var newObj = new Object();
        //fieldsOrdered: col1|col2|col3|
        var colsOrdered = fieldsOrdered.split("|");
        //var prop = {name: };
        // se asume que todas vienen desordenadas
        var undorderProps = new Array();
        var proxyObj = new Object();
        var arrobaProps = new Array();
        var proplast = null;
        for (var prop in obj) {
            if (prop.startsWith("_arroba_")) {
                arrobaProps.push(prop);
            } else if (prop == "_root_") {
                proplast = prop;
            } else {
                undorderProps.push({ name: prop, value: obj[prop] });
            }
        }
        //se eliminan todas las prop del obj
        //for (var i = 0; i < undorderProps.length; i++) {
        //delete obj[undorderProps[i].name];
        //}
        var propFinded = null;
        for (var i = 0; i < arrobaProps.length; i++) {
            newObj[arrobaProps[i]] = obj[arrobaProps[i]];
        }
        for (var i = 0; i < colsOrdered.length; i++) {
            //newObj[colsOrdered[i]] = undorderProps
            var index = ArrayIndexOf(undorderProps, function (elem) {
                return elem.name == colsOrdered[i];
            });
            if (index != -1) {
                newObj[colsOrdered[i]] = undorderProps[index].value;
                undorderProps.remove(index);
            }

        }
        if (proplast) {
            newObj[_root_] = proplast;
        }
        return newObj;
    } else {
        return obj;
    }
}

function propertyPathContainsValue(objPath, valueText) {
    var result = false;
    var text = JSON.stringify(objPath);
    if (text.contains("__issue__")) {
        result = true;
    }

    return result;
}

function pathObjectIsDefined(namepath) {
    var result = true;
    var path = new Array();



    return result;
}

/*
* Translated default messages for the jQuery validation plugin.
* Locale: ES
*/
if (jQuery.validator != undefined) {
    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio.",
        remote: "Por favor, rellena este campo.",
        email: "Por favor, escribe una dirección de correo válida",
        url: "Por favor, escribe una URL válida.",
        date: "Por favor, escribe una fecha válida.",
        dateISO: "Por favor, escribe una fecha (ISO) válida.",
        number: "Por favor, escribe un número entero válido.",
        digits: "Por favor, escribe sólo dígitos.",
        creditcard: "Por favor, escribe un número de tarjeta válido.",
        equalTo: "Por favor, escribe el mismo valor de nuevo.",
        accept: "Por favor, escribe un valor con una extensión aceptada.",
        maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
        minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
        rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
        range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
        max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
        min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
    });

}

function resolveReferences(json) {
    if (typeof json === 'string')
        json = jQuery.parseJSON(json);

    var byid = {}, // all objects by id
        refs = []; // references to objects that could not be resolved
    json = (function recurse(obj, prop, parent) {
        if (typeof obj !== 'object' || !obj) // a primitive value
            return obj;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            for (var i = 0; i < obj.length; i++)
                // check also if the array element is not a primitive value
                if (typeof obj[i] !== 'object' || !obj[i]) // a primitive value
                    return obj[i];
                else if ("$ref" in obj[i])
                    obj[i] = recurse(obj[i], i, obj);
                else
                    obj[i] = recurse(obj[i], prop, obj);
            return obj;
        }
        if ("$ref" in obj) { // a reference
            var ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            // else we have to make it lazy:
            refs.push([parent, prop, ref]);
            return;
        } else if ("$id" in obj) {
            var id = obj.$id;
            delete obj.$id;
            if ("$values" in obj) // an array
                obj = obj.$values.map(recurse);
            else // a plain object
                for (var prop in obj)
                    obj[prop] = recurse(obj[prop], prop, obj);
            byid[id] = obj;
        }
        return obj;
    })(json); // run it!

    for (var i = 0; i < refs.length; i++) { // resolve previously unknown references
        var ref = refs[i];
        ref[0][ref[1]] = byid[ref[2]];
        // Notice that this throws if you put in a reference at top-level
    }
    return json;
}



(function ($) {

    $.fn.fill = function (options) {
        var defaults = { data: null };
        var options = $.extend({}, defaults, options);

        return this.each(
    function () {
        $(this).empty();
        var optionsHtml = "";
        for (var i = 0; i <= options.data.length - 1; i++) {
            optionsHtml = optionsHtml + "<option value='" + options.data[i].Value + "'>" + options.data[i].Text + "</option>";
        }
        $(this).append(optionsHtml);
    });

    };

})(jQuery);


function ParseISO8601(s) {

    return new Date(s).toLocaleString();

}

/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */
(function (Date, undefined) {
    var origParse = Date.parse, numericKeys = [1, 4, 5, 6, 7, 10, 11];
    Date.parse = function (date) {
        var timestamp, struct, minutesOffset = 0;

        // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
        // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
        // implementations could be faster
        //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
        if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
            // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
            for (var i = 0, k; (k = numericKeys[i]) ; ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            if (struct[8] !== 'Z' && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];

                if (struct[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
        else {
            timestamp = origParse ? origParse(date) : NaN;
        }

        return timestamp;
    };
}(Date));

function setFullBlocks(idContainer, totalBlocks) {
    if (typeof (totalBlocks) == "undefined" || totalBlosck == null) {
        totalBlocks = 10;
    }
    var marginV = $(window).height() * 0.05;
    var marginH = $(window).width() * 0.05;

    //alert($(window).height() + ", " + $(document).height());
    var vSize = $(window).height() - (marginV);
    var hSize = $(window).width() - (marginH);
    var vSizeBaseBlock = vSize / totalBlocks;
    var vSizeSpace = vSizeBaseBlock * 0.2;
    vSizeBaseBlock = vSizeBaseBlock - vSizeSpace;
    $(".container").width(hSize);
    $(".container").css("margin-top", (marginV / 2).toString() + "px");
    $(".container").css("max-width", hSize);
    var fontSize = vSizeBaseBlock - (vSizeBaseBlock * 0.60);
    var cssBlocks = new Array();
    // cssBlocks.push(".show-grid { margin-bottom: " + vSizeSpace + "px; }");
    cssBlocks.push(" #full-fit-container .row-fluid [class*=\"span\"] { text-align: center; line-height: " + vSizeBaseBlock + "px;  min-height: " + vSizeBaseBlock + "px; margin-bottom: " + vSizeSpace + "px }");
    cssBlocks.push(" .link-block {  font-size: " + fontSize + "px; width:100%; position:absolute; overflow:hidden; bottom:0px;top:0px;display:block; }");
    cssBlocks.push(" .input-block { vetical-align:center; font-size: " + fontSize + "px; width:100%; height: " + vSizeBaseBlock + "px; }");
    cssBlocks.push(" .big-text { font-size: " + (vSizeBaseBlock / 1.5) + "px; }");
    cssBlocks.push(" .normal-text { font-size: " + (vSizeBaseBlock / 2) + "px; }");
    cssBlocks.push(" .medium-text { font-size: " + (vSizeBaseBlock / 3) + "px; }");
    cssBlocks.push(" .small-text { font-size: " + (vSizeBaseBlock / 4) + "px; }");
    //cssBlocks.push(".row-fluid [class*=\"span\"] { { min-height: " + vSizeBaseBlock + "px; }");
    for (var i = 1; i <= 10; i++) {
        var specificSizeBlock = vSizeBaseBlock;
        if (i > 1) {
            specificSizeBlock = (vSizeBaseBlock * i) + (vSizeSpace * (i - 1));
        }
        cssBlocks.push(" .row [class*='span'] .block" + i);
        cssBlocks.push("{ max-height: " + specificSizeBlock + "px; min-height: " + specificSizeBlock + "px; position:relative; }");

    }
    $("head").append('<style id="blocks">' + cssBlocks.join("").toString() + ' </style>');
}
function setPopupCore(jqElements) {
    jqElements.magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        callbacks: {
            beforeOpen: function () {
                console.log('Start of popup initialization');
            },
            elementParse: function (item) {
                var href = item.el.attr("href");
                var v = 1;
                if (href.contains("image.ashx?")) {
                    if (href.contains("down=1") == false) {
                        href = href + "&down=1";
                    }
                   
                } else {
                    v = 2;
                }
                // Function will fire for each target element
                // "item.el" is a target DOM element (if present)
                // "item.src" is a source that you may modify
                if (v == 1) {
                    item.el.attr("href", href);
                    var fileName = item.el.attr("file-name");
                    if (fileName != null && (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".gif") || fileName.toLowerCase().endsWith(".png") || fileName.toLowerCase().endsWith(".bmp")))
                    {
                        item.type = "image";
                    } else {
                        item.src = '<div style="position: relative;background: #FFF;padding: 20px;width: auto;max-width: 500px;margin: 20px auto;" class="white-popup"><a href="' + href + '"><img src="' + item.el.find("img").attr("src") + '"> Descargar </a> </div>';
                        item.type = 'inline';
                    }
                } else {
                    if (href.toLowerCase().endsWith(".xlsx") || href.toLowerCase().endsWith(".docx") || href.toLowerCase().endsWith(".xls") || href.toLowerCase().endsWith(".doc") || href.toLowerCase().endsWith(".ppt") || href.toLowerCase().endsWith(".pptx")) {
                        item.src = "https://view.officeapps.live.com/op/view.aspx?src=" + escape(href);
                        item.type = 'iframe';

                    } else if (href.toLowerCase().endsWith(".pdf")) {

                        item.src = rootSfsAppUrl + "Static/v2/pdf/web/viewer.html?file=" + escape("http://" + href);
                        item.type = 'iframe';
                    } else if (href.toLowerCase().endsWith(".png") || href.toLowerCase().endsWith(".jpg") || href.toLowerCase().endsWith(".gif") || href.toLowerCase().endsWith(".jpg")) {

                        item.type = "image";
                    }
                    else {
                        item.src = '<div style="position: relative;background: #FFF;padding: 20px;width: auto;max-width: 500px;margin: 20px auto;" class="white-popup"><a href="' + href + '"><img src="' + item.el.find("img").attr("src") + '"> Descargar </a> </div>';
                        item.type = 'inline';

                    }
                }
                console.log('Parsing content. Item object that is being parsed:', item);
            },
            change: function () {
                console.log('Content changed');
                console.log(this.content); // Direct reference to your popup element
            },
            resize: function () {
                console.log('Popup resized');
                // resize event triggers only when height is changed or layout forced
            },
            open: function () {
                console.log('Popup is opened');
            },

            beforeClose: function () {
                // Callback available since v0.9.0
                console.log('Popup close has been initiated');
            },
            close: function () {
                console.log('Popup removal initiated (after removalDelay timer finished)');
            },
            afterClose: function () {
                console.log('Popup is completely closed');
            },

            markupParse: function (template, values, item) {
                // Triggers each time when content of popup changes
                // console.log('Parsing:', template, values, item);
            },
            updateStatus: function (data) {
                console.log('Status changed', data);

            },
            imageLoadComplete: function () {

                console.log('Image loaded');
            },


            // Only for ajax popup type
            parseAjax: function (mfpResponse) {
                console.log('Ajax content loaded:', mfpResponse);
            },
            ajaxContentAdded: function () {
                // Ajax content is loaded and appended to DOM
                console.log(this.content);
            }
        },
        image: {
            tError: '<p><a target="_blank" href="%url%"><img style="height:100px;" height="100" src="%url%" border="0" /></a></p><a  target="_blank" href="%url%">@(GlobalMessages.IMAGE_NOT_DISPLAY_CLICK_DOWNLOAD)</a> ' // Error message
        }
    });
}
function setPopup(jqElements) {
    if (typeof (jQuery().magnificPopup) == "undefined") {
        Utilities.requireFiles([rootSfsAppUrl + "Static/v2/magnificPopup/jquery.magnific-popup.min.js"], function () {
            setPopupCore(jqElements);
        });
    } else {
        setPopupCore(jqElements);
    }

}