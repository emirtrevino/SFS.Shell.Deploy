
function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
function log(text) {
    if (typeof (console) != 'undefined') {
        if (console != null) {
            console.log(text);
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
$(document).ready(function () {
    if (typeof $.views != 'undefined')
        if (typeof $.views.registerHelpers != 'undefined')
            $.views.registerHelpers({ getSafeKeyId: function (text) { return text.replaceAll("+", "").replaceAll("=", ""); } });
    refreshForm();
    showMessages();
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

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
jQuery.fn.ForceNumericOnly =
function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        })
    })
};

function enableFocusFX() {

    $('.form input, .form textarea, .form select, .form button, .form a').focus(function () {
        $(this).parents('.focushl').addClass("over");
    }).blur(function () {
        $(this).parents('.focushl').removeClass("over");
    });
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
function setTooltips() {

    $('.helpa').each(function () {
        // We make use of the .each() loop to gain access to each element via the "this" keyword...
        $(this).qtip(
      {
          content: {
              // Set the text to an image HTML string with the correct src URL to the loading image you want to use
              text: '<img class="throbber" src="' + $("#imgwait").attr("src") + '" alt="Loading..." />',
              ajax: {
                  url: $(this).attr('rel'), // Use the rel attribute of each element for the url to load
                  cache: false,
                  type: 'GET', // POST or GET
                  //contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
                  data: {}, // Data to pass along with your request
                  success: function (data, status) {
                      // Process the data

                      // Set the content manually (required!)
                      this.set('content.text', data);
                  }

              },
              title: {
                  text: $(this).attr("title") + ' - ' + $(this).text(), // Give the tooltip a title using each elements text
                  button: true
              }
          },

          show: {
              event: 'click',
              solo: true // Only show one tooltip at a time
          },
          hide: 'unfocus'
        ,
          api: {
              onContentUpdate: function () { this.updateWidth(); },
              onContentLoad: function () { this.updateWidth(); },
              beforeContentLoad: function () { this.updateWidth(); }
          }

      })
    })

    // Make sure it doesn't follow the link when we click it
   .click(function (event) { event.preventDefault(); });



}
function refreshForm() {
    if ($(".numeric").length > 0) {
        $(".numeric").numeric();
    }
    if ($(".integer").length > 0) {
        $(".integer").numeric(false);
    }

    setTooltips();
    enableFocusFX();
    $.unblockUI();
    if (typeof (existSimpleList) != 'undefined') {
        SimpleList();
    }
    _blockUI();

}


Encoder = {

	// When encoding do we convert characters into html or numerical entities
	EncodeType : "entity",  // entity OR numerical

	isEmpty : function(val){
		if(val){
			return ((val===null) || val.length==0 || /^\s+$/.test(val));
		}else{
			return true;
		}
	},
	
	// arrays for conversion from HTML Entities to Numerical values
	arr1: ['&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&Agrave;','&Aacute;','&Acirc;','&Atilde;','&Auml;','&Aring;','&AElig;','&Ccedil;','&Egrave;','&Eacute;','&Ecirc;','&Euml;','&Igrave;','&Iacute;','&Icirc;','&Iuml;','&ETH;','&Ntilde;','&Ograve;','&Oacute;','&Ocirc;','&Otilde;','&Ouml;','&times;','&Oslash;','&Ugrave;','&Uacute;','&Ucirc;','&Uuml;','&Yacute;','&THORN;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&OElig;','&oelig;','&Scaron;','&scaron;','&Yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&Dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&Alpha;','&Beta;','&Gamma;','&Delta;','&Epsilon;','&Zeta;','&Eta;','&Theta;','&Iota;','&Kappa;','&Lambda;','&Mu;','&Nu;','&Xi;','&Omicron;','&Pi;','&Rho;','&Sigma;','&Tau;','&Upsilon;','&Phi;','&Chi;','&Psi;','&Omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&Prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&lArr;','&uArr;','&rArr;','&dArr;','&hArr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;'],
	arr2: ['&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;'],
		
	// Convert HTML entities into numerical entities
	HTML2Numerical : function(s){
		return this.swapArrayVals(s,this.arr1,this.arr2);
	},	

	// Convert Numerical entities into HTML entities
	NumericalToHTML : function(s){
		return this.swapArrayVals(s,this.arr2,this.arr1);
	},


	// Numerically encodes all unicode characters
	numEncode : function(s){
		
		if(this.isEmpty(s)) return "";

		var e = "";
		for (var i = 0; i < s.length; i++)
		{
			var c = s.charAt(i);
			if (c < " " || c > "~")
			{
				c = "&#" + c.charCodeAt() + ";";
			}
			e += c;
		}
		return e;
	},
	
	// HTML Decode numerical and HTML entities back to original values
	htmlDecode : function(s){

		var c,m,d = s;
		
		if(this.isEmpty(d)) return "";

		// convert HTML entites back to numerical entites first
		d = this.HTML2Numerical(d);
		
		// look for numerical entities &#34;
		arr=d.match(/&#[0-9]{1,5};/g);
		
		// if no matches found in string then skip
		if(arr!=null){
			for(var x=0;x<arr.length;x++){
				m = arr[x];
				c = m.substring(2,m.length-1); //get numeric part which is refernce to unicode character
				// if its a valid number we can decode
				if(c >= -32768 && c <= 65535){
					// decode every single match within string
					d = d.replace(m, String.fromCharCode(c));
				}else{
					d = d.replace(m, ""); //invalid so replace with nada
				}
			}			
		}

		return d;
	},		

	// encode an input string into either numerical or HTML entities
	htmlEncode : function(s,dbl){
			
		if(this.isEmpty(s)) return "";

		// do we allow double encoding? E.g will &amp; be turned into &amp;amp;
		dbl = dbl || false; //default to prevent double encoding
		
		// if allowing double encoding we do ampersands first
		if(dbl){
			if(this.EncodeType=="numerical"){
				s = s.replace(/&/g, "&#38;");
			}else{
				s = s.replace(/&/g, "&amp;");
			}
		}

		// convert the xss chars to numerical entities ' " < >
		s = this.XSSEncode(s,false);
		
		if(this.EncodeType=="numerical" || !dbl){
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
		if(!dbl){
			s = s.replace(/&#/g,"##AMPHASH##");
		
			if(this.EncodeType=="numerical"){
				s = s.replace(/&/g, "&#38;");
			}else{
				s = s.replace(/&/g, "&amp;");
			}

			s = s.replace(/##AMPHASH##/g,"&#");
		}
		
		// replace any malformed entities
		s = s.replace(/&#\d*([^\d;]|$)/g, "$1");

		if(!dbl){
			// safety check to correct any double encoded &amp;
			s = this.correctEncoding(s);
		}

		// now do we need to convert our numerical encoded string into entities
		if(this.EncodeType=="entity"){
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
	XSSEncode : function(s,en){
		if(!this.isEmpty(s)){
			en = en || true;
			// do we convert to numerical or html entity?
			if(en){
			    s = s.replaceAll(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
			    s = s.replaceAll(/\"/g, "&quot;");
			    s = s.replaceAll(/</g, "&lt;");
			    s = s.replaceAll(/>/g, "&gt;");
			}else{
			    s = s.replaceAll(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
			    s = s.replaceAll(/\"/g, "&#34;");
			    s = s.replaceAll(/</g, "&#60;");
			    s = s.replaceAll(/>/g, "&#62;");
			}
			return s;
		}else{
			return "";
		}
	},

	// returns true if a string contains html or numerical encoded entities
	hasEncoded : function(s){
		if(/&#[0-9]{1,5};/g.test(s)){
			return true;
		}else if(/&[A-Z]{2,6};/gi.test(s)){
			return true;
		}else{
			return false;
		}
	},

	// will remove any unicode characters
	stripUnicode : function(s){
		return s.replace(/[^\x20-\x7E]/g,"");
		
	},

	// corrects any double encoded &amp; entities e.g &amp;amp;
	correctEncoding : function(s){
		return s.replace(/(&amp;)(amp;)+/,"$1");
	},


	// Function to loop through an array swaping each item with the value from another array e.g swap HTML entities with Numericals
	swapArrayVals : function(s,arr1,arr2){
		if(this.isEmpty(s)) return "";
		var re;
		if(arr1 && arr2){
			//ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
			// array lengths must match
			if(arr1.length == arr2.length){
				for(var x=0,i=arr1.length;x<i;x++){
					re = new RegExp(arr1[x], 'g');
					s = s.replace(re,arr2[x]); //swap arr1 item with matching item from arr2	
				}
			}
		}
		return s;
	},

	inArray : function( item, arr ) {
		for ( var i = 0, x = arr.length; i < x; i++ ){
			if ( arr[i] === item ){
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
    
    $.unblockUI();
    if (typeof (existSimpleList) != 'undefined') {
        SimpleList();

    }
    //setTooltips();
    _blockUI();

    //SetSelectableChecks();
}
function SimpleList() {
    $(document).ready(function () {
        $('.simple-list, .simple-list tbody').tableHover();
        $('.simple-list tbody tr:odd').addClass('odd');
        $('.simple-list tbody  tr:even').addClass('even');
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
        $.unblockUI();
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

// #region "Filter Builder"
function GetFilter(id) {
    var tf = [];
    var tfp = [];
    var comp = "=";
    var excludeFilter = false;
    var sqOpen = false;
    var nCondSF = 0;
    var contContains = false;
    var openContains = false;
    $(".specific" + id +" ." + id).each(function () {
        var isNum = false;
        tfp = [];
        excludeFilter = false;
        var sqCurrent = "";
        var val = $(this).val();
        if ($(this).hasClass("contact")) {
            if (tf.join("").toString().endsWith("(") == false) {
                tfp.push($(this).val());
            }
        }
        if ($(this).hasClass("fieldFilter")) {

            if ($(this).val().indexOf("|") != -1) {
                tfp.push($(this).val().toString().split("|")[0]);
            } else {
                if (val.indexOf(".Count()") != -1) {
                    // es navegacion de muchos
                    tfp.push(val.replace(".Count()", ".Count( "));
                    sqOpen = true;
                    isNum = true;
                    //                }else if(val.indexOf("Contains") != -1){ 

                } else {
                    isNum = false;
                    //alert($(this).attr("sff"));
                    tfp.push(val);

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
            } else if ($(this).val() == "Contains") {
                comp = "Contains(\"";
                openContains = true;
                contContains = true;
            } else {
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
                    sqOpen = false;
                }
            } else {
                tfp.push(comp);
            }


        }
        if ($(this).hasClass("value")) {
            //tfp.push(GetValueFrom($(this)));
            var str = GetValueFrom($(this));
            if (str.length == 0) {
                excludeFilter = true;

            } else {
                if (openContains == false) { // parentesis abierto


                    if (!isNaN(parseFloat(str)) ) {
                        tfp.push("" + str + "");
                    } else {
                        tfp.push("\"" + str + "\"");
                    }
                } else {
                    tfp.push(str);
                    tfp.push("\")");
                    openContains = false;
                }
            }
        }
        if (excludeFilter == false) {
            if (tf.join("").toString().length > 0) {
                tf.push(" ");
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
                    $(this).attr("checked", true);
                    markSelectRow(null, $(this));
                }
            }

        );
        var il_ = null;
        for (var i = 0; i < arraySelect.length; i++) {
            il_ = $(":checkbox[value=" + arraySelect[i] + "]");
            if (il_.length > 0) {
                il_.attr("checked", false);
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
                        $(this).attr("checked", false);
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
                            $(this).attr("checked", true);
                            window["selectRow" + id]($(this).val());
                            markSelectRow(null, $(this));
                        }
                    }

                );
        } else {
            $("input.select").each(
                    function () {
                        if ($(this).attr("list") == "list" + id) {
                            $(this).attr("checked", false);
                            window["unSelectRow" + id]($(this).val());
                            markUnSelectRow(null, $(this));
                        }
                    }

                );
        }
        //updateSelected(false, selectRows_id_List, id)
        updateNumSelected(window["selectRows" + id], id);

    }



}
function unSelectRow(value, id) {

}
function CustomAction(elem, url, id, key) {
    var query = "";
    var selAll = false;
    var selItemsArray = [];
    if (key != '') {
        selItemsArray.push(key);
    } else {
        query = window["queryB" + id];

        selAll = window["allSelected" + id];
        selItemsArray = window["selectRows" + id];



        var urlConfirm = "";

    }

    var message = $("a#customAction" + id).attr("messageConfirm");
    message = message.replace("{0}", $.trim($("#" + elem.id).text())); // actioname
    message = message.replace("{1}", $("#seln" + id).text()); // number

    var actionKey = $("#" + elem.id).attr("actionKey");
    var controllerName = $("#" + elem.id).attr("controllerName");
    $("a#customAction" + id).attr("href", url + "?controllerName=" + controllerName + "&actionName=CustomActionExecute&actionKey=" + actionKey + "&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray + "&desc=" + message);
    window["actionConfirm" + id]();
    //alert($("#customAction" + id).attr("href"));
    $("a#customAction" + id).click();
    return false;

}

function detailsAction(e, context, id) {
    if (context.tagName == "A") {
        context = $(context).parents(".trRow" + id)[0];
    }
    //window.document.URL = $("#" + context.id).children().find(".list-details").attr("href");
    $("#" + context.id).children().find(".list-details").click();
}
function deleteAction(e, context, many, id) {
    var idProxy = "";
    var startUrl = "";
    var title = "";
    var objects = "";
    var extraparams = "";
    if (many == false) {
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
    } else {
        var query = window["queryB" + id]; // query linq
        //var actionKey = $(e).attr("actionKey"); //
        var selAll = window["allSelected" + id]; // todos seleccionados tru o false
        var selItemsArray = window["selectRows" + id]; // lista de seleccionados
        idProxy = "deleteProxyMany";
        objects = "";
        window["actionDeleteMany" + id]();
        if ($("#" + idProxy + id).attr("startUrl").indexOf("relationship:") != -1) {
            extraparams = "&actionKey=deleterelmany&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray;

        } else {
            extraparams = "&actionKey=deletemany&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray;
        }
        //  $("a#customAction" + id).attr("href", url + "?controllerName=" + controllerName + "&actionName=CustomActionExecute&actionKey=" + actionKey + "&query=" + query + "&allSelected=" + selAll + "&selected=" + selItemsArray + "&desc=" + message);


    }
    startUrl = $("#" + idProxy + id).attr("startUrl");
    var desc = $("#" + idProxy + id).attr("messageConfirm");
    desc = desc.replace("{0}", $("#seln" + id).text());
    var concatUrl = "?";
    if (startUrl.contains("?")) {
        concatUrl = "&";
    }
    $("#" + idProxy + id).attr("href", startUrl + concatUrl + "title=" + title + "&desc=" + desc + extraparams + objects);

    $("#" + idProxy + id).click();
    return false;
}
function ExportDownload(elem, url, id) {
    var query = window["queryB" + id];
    var selAll = window["allSelected" + id];
    var selItemsArray = window["selectRows" + id];
    var actionKey = "";
    if ($("#" + elem.id).attr("actionKey")) {
        actionKey = $("#" + elem.id).attr("actionKey");
    }

    var format = $("#" + elem.id).attr("format");
    window.location.href = url + "?query=" + query + "&allSelected=" + selAll.toString() + "&selected=" + selItemsArray.join("|").toString() + "&orderBy=" + window["currentOrderBy" + id] + "&direction=" + window["currentOrderDir" + id] + "&format=" + format + "&actionKey=" + actionKey;
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

       setDisabled( $(".onlysel"), false);

    } else {
        $("#expn" + id).text($("#expn" + id).attr("resultsText"));

        setDisabled($(".onlysel").attr('disabled', 'disabled'));

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
    $("input.select").click(
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
// #endregion

function getClickElement() {
    var element = null;
    if (typeof (event) == "undefined" || event == null) {
        element = lastLinkElement;
    } else {
        element = event.srcElement;
    }
    return element;
}
function myfunction() {

}
// #region "CallServer"
function callServerGet(url, endMethod) {
    var clickelement = $(getClickElement());

    clickelement.attr("disabled", true);

    $.ajax({
        cache: false,
        url: url,
        dataType: 'json',
        data: null,
        success: function (data) {
            clickelement.removeAttr("disabled");
            this.t_endMethod = endMethod;
            this.t_endMethod(data);
        }
    });

}

jQuery().ajaxStart(function () {
    alert("it begins");
})

function callServerGetHtml(url, endMethod) {
    var clickelement = $(getClickElement());
    clickelement.attr("disabled", true);

    $.ajax({
        url: url,
        dataType: 'html',
        data: null,
        cache: false,
        success: function (data) {
            clickelement.removeAttr("disabled");
            this.t_endMethod = endMethod;
            this.t_endMethod(data);
        }
    });

    return false;

}
function callServerSend(url, jsonPostData, endMethod) {
    var data = JSON.stringify(jsonPostData);
    var clickelement = $(getClickElement());
    clickelement.attr("disabled", true);

    var that = this;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        error: onError,
        //        beforeSend: function (x) {
        //            if (x && x.overrideMimeType) {
        //                x.overrideMimeType("application/json;charset=iso-8859-1");
        //            }
        //        },

        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            clickelement.removeAttr("disabled");
            this.t_endMethod = endMethod;
            this.t_endMethod(data);
        },
        dataType: 'json'
    });


}
// #endregion

function onError(data) {
    var clickelement = $(getClickElement());
    clickelement.removeAttr("disabled");
    alert(data.responseText);
}
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
                 result = element.val();
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
             result = "DateTime(" + element.val().toString().substr(0, 4) + "," + element.val().toString().substr(4, 2) + "," + element.val().toString().substr(6, 2) + ")";

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

(function ($) {

    $.fn.openDialog = function (options) {

        // el control en contexto al que se le aplica el plugin es el link
        var defaults = {
            prepare: true,

            open: true,
            idDivWindow: "",
            idElementClick: "",
            sufix: "",
            onClose: null
        };
        var options = $.extend({}, defaults, options);

        return this.each(
            function () {
                var that = this;
                var jlink = $(this);
                var divpopup = null;
                if (options.prepare || options.open) {
                    this.closeFunc = options.onClose;
                    if ($("#" + $(this).attr("id") + "dialogX").length == 0) {
                        var messageProxy = $("#proxy-wait-message");
                        var message = "";
                        if (messageProxy.length > 0)
                            message = $("#proxy-wait-message").html();
                        $(this).after("<div id='" + $(this).attr("id") + "dialogX" + "'>" + message + "</div>");

                    }
                    divpopup = $("#" + $(this).attr("id") + "dialogX");

                    divpopup.dialog({ closeOnEscape: true, dialogClass: 'dialogWithDropShadow', close: function (event, ui) {
                        divpopup.dialog("destroy");
                        divpopup.empty();
                        if (options.onClose != null) {
                            that.closeFunc();
                        }

                    }, autoOpen: false, modal: true, open: function (event, ui) {
                        $.ajax({ url: jlink.attr("href"),
                            dataType: 'html', cache: false,

                            success: function (data) {
                                divpopup.empty();
                                divpopup.html(data);
                                divpopup.dialog('option', 'position', 'center');

                                //                                    $(".close-dialog").click(function () {
                                //                                            divpopup.dialog("close");
                                //                                            return false;
                                //                                      });
                            }

                        });

                    }, height: 'auto', width: 'auto', title: jlink.attr("title")
                    });
                    divpopup.dialog("resize", "auto");
                }

                if (options.open) {
                    divpopup.dialog("open");
                }
            }
            );
    };
})(jQuery);

function showMessages() {
    callServerGet(rootSfsAppUrl + "Messages/GetLatests", showMessagesEnd);
}
function showMessagesEnd(data) {
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Type != "Ok") {
                $.ctNotify(data[i].Message);
            } else {
                $.ctNotify(data[i].Message, data[i].Type);
            }
        }

    }
}

function closeCurrentDialog(element) {
    var dialog = $(element).parents(".ui-dialog"); // buscar hacia arriba el dialog a cerrar
    if (dialog.length > 0) {
        //$(dialog[0]).dialog('close');

        if (dialog.children(".ui-dialog-titlebar").length > 0) {
            if (dialog.children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").length > 0) {
                dialog.children(".ui-dialog-titlebar").children(".ui-dialog-titlebar-close").click();
                dialog.empty();
            }
        }
        return false;
    }
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
		function isPropertyDefined( name, obj) {
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