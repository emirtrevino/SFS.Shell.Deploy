<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.SimpleTime>" %>
<%@ Import Namespace="SFSdotNet.Framework.Web.Mvc.Extensions" %>



 
                        <select  name="<%=this.ViewData.ModelMetadata.PropertyName %>.Hour" id="<%=this.ViewData.ModelMetadata.PropertyName %>_Hour" >
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
							</select>
					

                            
                            <input class="field" name="<%=this.ViewData.ModelMetadata.PropertyName %>.Minute" id="<%=this.ViewData.ModelMetadata.PropertyName %>_Minute" maxlength="2" style=" width:25px" type="text" />
                             <select  name="<%=this.ViewData.ModelMetadata.PropertyName %>.AP" id="<%=this.ViewData.ModelMetadata.PropertyName %>_AP" >
								<option value="1">AM</option>
								<option value="2">PM</option>
                                </select>


