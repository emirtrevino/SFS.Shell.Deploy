<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.SimpleDate>" %>
<%@ Import Namespace="SFSdotNet.Framework.Web.Mvc.Extensions" %>


      	<script type="text/javascript" >
      	    $(function () {

      	        // initialise the "Select date" link
      	   
      	      $('#date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>')
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
      	                $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Day').val(selectedDate.getDate());
      	                $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Month').val((selectedDate.getMonth() + 1));

      	                $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Year').val(selectedDate.getFullYear());
      	            }
                }
      	        // listen for when the selects are changed and update the picker
      	        $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Day, #<%=this.ViewData.ModelMetadata.PropertyName %>_Month, #<%=this.ViewData.ModelMetadata.PropertyName %>_Year')
					.bind(
						'change',
						function () {
                            if ($('#<%=this.ViewData.ModelMetadata.PropertyName %>_Year').val() != "" && $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Month').val() != "" && $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Day').val() != "" ){
						    var d = new Date(
										$('#<%=this.ViewData.ModelMetadata.PropertyName %>_Year').val(),
										$('#<%=this.ViewData.ModelMetadata.PropertyName %>_Month').val() - 1,
										$('#<%=this.ViewData.ModelMetadata.PropertyName %>_Day').val()
									);
						    $('#date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>').dpSetSelected(d.asString());
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
      	        $('#<%=this.ViewData.ModelMetadata.PropertyName %>_Day').trigger('change');
      	    });
		</script>
                        <input name="<%=this.ViewData.ModelMetadata.PropertyName %>.Day" class="field date" style="width:20px;" type="text" id="<%=this.ViewData.ModelMetadata.PropertyName %>_Day"  />
 
                        <input name="<%=this.ViewData.ModelMetadata.PropertyName %>.Month" class="field date" style="width:20px;" type="text" id="<%=this.ViewData.ModelMetadata.PropertyName %>_Month"  />


					    <input name="<%=this.ViewData.ModelMetadata.PropertyName %>.Year" class="field date" style="width:60px;" type="text" id="<%=this.ViewData.ModelMetadata.PropertyName %>_Year"  />


                          

                                  <a href="noJs.html" id="date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>"><img border="0" src="<%=ResolveUrl("~/") %>Content/calendar.png" /></a>
