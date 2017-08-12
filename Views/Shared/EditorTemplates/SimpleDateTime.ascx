<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.SimpleDateTime>" %>
<%@ Import Namespace="SFSdotNet.Framework.Web.Mvc.Extensions" %>

<% 
    string controlId = this.ViewData.ModelMetadata.PropertyName;
    if (ViewData["cusprop"] != null ){
        controlId = ViewData["cusprop"].ToString();
    }
    bool includeTime = false;
    bool includeDate = true;
    bool freeMinutes = true;
    string customMinutes = "";
    string classExtra = "";
    if (ViewData["class"] != null)
        classExtra = ViewData["class"].ToString();
    if (ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "DateTime").Count() > 0)
    {
        RouteValueDictionary props = (RouteValueDictionary)ViewData.ModelMetadata.AdditionalValues.Where(x => x.Key == "DateTime").FirstOrDefault().Value;

        if (props.FirstOrDefault(p => p.Key == "ShowTime").Value != null)
        {
            includeTime = (bool)props.FirstOrDefault(p => p.Key == "ShowTime").Value;
        }

        if (props.FirstOrDefault(p => p.Key == "ShowDate").Value != null)
        {
            includeDate = (bool)props.FirstOrDefault(p => p.Key == "ShowDate").Value;
        }

        if (props.FirstOrDefault(p => p.Key == "CustomMinutes").Value != null)
        {
            customMinutes = (string)props.FirstOrDefault(p => p.Key == "CustomMinutes").Value;
            if (!string.IsNullOrEmpty(customMinutes))
                freeMinutes = false;
        
        }

    }
    %>
    <% if (includeDate)
       {%>
      	<script type="text/javascript" >
      	    $(function () {

      	        // initialise the "Select date" link
      	   
      	      $('#date-pick-<%=controlId  %>')
					.datePicker(
      	        // associate the link with a date picker
						{
						createButton: false,
						startDate: '01/01/1950',
						endDate: '31/12/2020'
		            }
					).bind(
      	        // when the link is clicked display the date picker
						'click',
						function () {
                            if ($(this).dpGetSelected()[0] != undefined){
						        updateSelects($(this).dpGetSelected()[0]);
                            }
						    $(this).dpDisplay();
						    return false;
						}
					).bind(
      	        // when a date is selected update the SELECTs
						'dateSelected',
						function (e, selectedDate, $td, state) {
						    updateSelects(selectedDate);
						}
					).bind(
						'dpClosed',
						function (e, selected) {
						    updateSelects(selected[0]);
						}
					);

      	        var updateSelects = function (selectedDate) {
                    if (typeof(selectedDate) != "undefined"){
      	                var selectedDate = new Date(selectedDate);
      	                $('#<%=controlId  %>_Day').val(selectedDate.getDate());
      	                $('#<%=controlId  %>_Month').val((selectedDate.getMonth() + 1));

      	                $('#<%=controlId  %>_Year').val(selectedDate.getFullYear());
                        var min= "00";
                        var hour = "00";
                        if ($('#<%=controlId  %>_Hour').length >0 && $('#<%=controlId  %>_Minutes').length > 0){
                        
                        }
                        FixField("<%=controlId  %>", "year");
                        FixField("<%=controlId  %>", "month");
                        FixField("<%=controlId  %>", "day");

                        $('#<%=controlId  %>').val($('#<%=controlId  %>_Year').val() + $('#<%=controlId  %>_Month').val() + $('#<%=controlId  %>_Day').val() + " " + hour + ":" + min);


      	            }
                }
      	        // listen for when the selects are changed and update the picker
      	        $('#<%=controlId  %>_Day, #<%=controlId  %>_Month, #<%=controlId  %>_Year')
					.bind(
						'change',
						function () {
                            if ($('#<%=controlId  %>_Year').val() != "" && $('#<%=controlId  %>_Month').val() != "" && $('#<%=controlId  %>_Day').val() != "" ){
						    var d = new Date(
										$('#<%=controlId  %>_Year').val(),
										$('#<%=controlId  %>_Month').val() - 1,
										$('#<%=controlId  %>_Day').val()
      									);
                            
						    $('#date-pick-<%=controlId  %>').dpSetSelected(d.asString());
                            }
						}
					);

      	        // default the position of the selects to today
<% if (Model != null ) {%>
						var today = new Date();
                        today.setDate(<%: Model.Day.ToString() %>);
                        today.setMonth(<%: Model.Month.ToString() %>-1);                        
                        today.setFullYear(<%: Model.Year.ToString() %>);
                updateSelects(today);
<%} %>      	        

      	        // and update the datePicker to reflect it...
      	        $('#<%=controlId  %>_Day').trigger('change');
      	    });
		</script>
                        <input type="hidden"  id="<%=controlId  %>" class="field date datetime <%: classExtra  %>" value="" />
                        <input name="<%=controlId  %>.Day" class="field date " style="width:20px;" type="text" id="<%=controlId  %>_Day"  />
 
                        <input name="<%=controlId  %>.Month" class="field date " style="width:20px;" type="text" id="<%=controlId  %>_Month"  />


					    <input name="<%=controlId  %>.Year" class="field date " style="width:60px;" type="text" id="<%=controlId  %>_Year"  />

<%   }   
    if (includeTime)
        { %>
            <select name="<%=controlId  %>.Hour" id="<%=controlId  %>_Hour" class="date hour ">
            <option value="01">01 Hrs (01 AM)</option>
            <option value="02">02 Hrs (02 AM)</option>
            <option value="03">03 Hrs (03 AM)</option>
            <option value="04">04 Hrs (04 AM)</option>
            <option value="05">05 Hrs (05 AM)</option>
            <option value="06">06 Hrs (06 AM)</option>
            <option value="07">07 Hrs (07 AM)</option>
            <option value="08">08 Hrs (08 AM)</option>
            <option value="09">09 Hrs (09 AM)</option>
            <option value="10">10 Hrs (10 AM)</option>
            <option value="11">11 Hrs (11 AM)</option>
            <option value="12">12 Hrs (12 AM)</option>
            <option value="13">13 Hrs (01 PM)</option>
            <option value="14">14 Hrs (02 PM)</option>
            <option value="15">15 Hrs (03 PM)</option>
            <option value="16">16 Hrs (04 PM)</option>
            <option value="17">17 Hrs (05 PM)</option>
            <option value="18">18 Hrs (06 PM)</option>
            <option value="19">19 Hrs (07 PM)</option>
            <option value="20">20 Hrs (08 PM)</option>
            <option value="21">21 Hrs (09 PM)</option>
            <option value="22">22 Hrs (10 PM)</option>
            <option value="23">23 Hrs (11 PM)</option>
            <option value="24">24 Hrs (12 PM)</option>
            </select>
<%          if (freeMinutes && string.IsNullOrEmpty(customMinutes))
            { %>
					    <input name="<%=controlId  %>.Minutes" class="field date minutes " style="width:30px;" type="text" id="<%=controlId  %>_Minutes"  />

<%          }
            else
            { %>            
            <select name="<%=controlId  %>.Minutes" id="<%=controlId  %>_Minutes" class=" date minutes ">
<%          foreach(string min in customMinutes.Split(char.Parse("|"))) { %>
            <option value="<%= min %>"><%= min %></option>
<%          } %>
            </select>
<%          } %>
           <%-- <select name="<%=controlId  %>.AP" id="<%=controlId  %>_AP" class="">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
            </select>--%>

<%      } %>
<%  if (includeDate)
   {%>
<a href="noJs.html" id="date-pick-<%=controlId  %>"><img border="0" src="<%=ResolveUrl("~/") %>Content/calendar.png" /></a>
<%} %>
<script>
    function OnChangeInit<%=controlId.Replace("-","")  %>() {
        $('#<%=controlId  %>_Year').change(OnChangeDone<%=controlId.Replace("-","")  %>);
        $('#<%=controlId  %>_Month').change(OnChangeDone<%=controlId.Replace("-","")  %>);
        $('#<%=controlId  %>_Day').change(OnChangeDone<%=controlId.Replace("-","")  %>);
        if ($('#<%=controlId  %>_Hour').length > 0){
            $('#<%=controlId  %>_Hour').change(OnChangeDone<%=controlId.Replace("-","")  %>);
        }
        if ($('#<%=controlId  %>_Minutes').length > 0){
            $('#<%=controlId  %>_Minutes').change(OnChangeDone<%=controlId.Replace("-","")  %>);
        }
    }

    function OnChangeDone<%=controlId.Replace("-","")  %>(){
        var valueDate = "";
        if ($('#<%=controlId  %>_Year').val() != "" && $('#<%=controlId  %>_Month').val() != "" && $('#<%=controlId  %>_Day').val() != ""){
            FixField("<%=controlId  %>", "year");
            FixField("<%=controlId  %>", "month");
            FixField("<%=controlId  %>", "day");


            valueDate =$('#<%=controlId  %>_Year').val() + $('#<%=controlId  %>_Month').val() + $('#<%=controlId  %>_Day').val();

        }
        var hour ="00";
        var min="00";
        if ($('#<%=controlId  %>_Hour').length > 0 ){
            hour = $('#<%=controlId  %>_Hour').val();
        }
        if ($('#<%=controlId  %>_Minutes').length > 0 ){
            min = $('#<%=controlId  %>_Minutes').val();
        }
        if (valueDate.length > 0){
            valueDate = valueDate + " " + hour + ":" + min;
        }
        $('#<%=controlId  %>').val(valueDate);
    }

    OnChangeInit<%=controlId.Replace("-","")  %>();

</script>
