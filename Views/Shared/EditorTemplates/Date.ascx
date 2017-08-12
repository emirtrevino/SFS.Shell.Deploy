<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<System.DateTime?>" %>
<%= Html.HeaderResources("datepicker")%>

        
      	<script type="text/javascript" charset="utf-8">
      	    $(function () {

      	        // initialise the "Select date" link
      	        $('#date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>')
					.datePicker(
      	        // associate the link with a date picker
						{
						createButton: false,
						startDate: '01/01/1950',
						endDate: '31/12/2010'
		}
					).bind(
      	        // when the link is clicked display the date picker
						'click',
						function () {
						    updateSelects($(this).dpGetSelected()[0]);
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
      	            var selectedDate = new Date(selectedDate);
      	            $('#d-<%=this.ViewData.ModelMetadata.PropertyName %> option[value=' + selectedDate.getDate() + ']').attr('selected', 'selected');
      	            $('#m-<%=this.ViewData.ModelMetadata.PropertyName %> option[value=' + (selectedDate.getMonth() + 1) + ']').attr('selected', 'selected');
      	            $('#y-<%=this.ViewData.ModelMetadata.PropertyName %> option[value=' + (selectedDate.getFullYear()) + ']').attr('selected', 'selected');
      	        }
      	        // listen for when the selects are changed and update the picker
      	        $('#d-<%=this.ViewData.ModelMetadata.PropertyName %>, #m-<%=this.ViewData.ModelMetadata.PropertyName %>, #y-<%=this.ViewData.ModelMetadata.PropertyName %>')
					.bind(
						'change',
						function () {
						    var d = new Date(
										$('#y-<%=this.ViewData.ModelMetadata.PropertyName %>').val(),
										$('#m-<%=this.ViewData.ModelMetadata.PropertyName %>').val() - 1,
										$('#d-<%=this.ViewData.ModelMetadata.PropertyName %>').val()
									);
						    $('#date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>').dpSetSelected(d.asString());
						}
					);

      	        // default the position of the selects to today
      	        var today = new Date();
      	        updateSelects(today.getTime());

      	        // and update the datePicker to reflect it...
      	        $('#d-<%=this.ViewData.ModelMetadata.PropertyName %>').trigger('change');
      	    });
		</script>

 
                        <select name="d-<%=this.ViewData.ModelMetadata.PropertyName %>" id="d-<%=this.ViewData.ModelMetadata.PropertyName %>" >
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
								<option value="31">31</option>
							</select>
					

                            
                            <select name="m-<%=this.ViewData.ModelMetadata.PropertyName %>" id="m-<%=this.ViewData.ModelMetadata.PropertyName %>" >
								<option value="1">Jan</option>
								<option value="2">Feb</option>
								<option value="3">Mar</option>
								<option value="4">Apr</option>
								<option value="5">May</option>
								<option value="6">Jun</option>
								<option value="7">Jul</option>
								<option value="8">Aug</option>
								<option value="9">Sep</option>
								<option value="10">Oct</option>
								<option value="11">Nov</option>
								<option value="12">Dec</option>
							</select>
					

                          
                            <select name="y-<%=this.ViewData.ModelMetadata.PropertyName %>" id="y-<%=this.ViewData.ModelMetadata.PropertyName %>" >
                           <% 
                               
                               for (int i = DateTime.Today.Year ; i < DateTime.Today.AddYears(-100).Year ; i++)
                              {
                                  Writer.Write(@"<option value=""{0}"">{0}</option>", i.ToString());                                  
                              } %>
                                                           
                            </select>
<input type="hidden" value="<%: this.ViewData.ModelMetadata.PropertyName %>" id="<%: this.ViewData.ModelMetadata.PropertyName %>" value="01/01/2010" />
<%: Html.Hidden(this.ViewData.ModelMetadata.PropertyName, "01/01/2009" ) %>
                            <a href="noJs.html" id="date-pick-<%=this.ViewData.ModelMetadata.PropertyName %>">...</a>
