<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.MenuTabModel>" %>
<style>
.ui-tabs-paging-next { 
	float: right !important;
}
.ui-tabs-paging-prev,
.ui-tabs-paging-next {
	background: transparent !important;
	border: 0 !important;
	margin-bottom: 1px !important;
}
 
#example2 .ui-tabs-paging-prev,
#example2 .ui-tabs-paging-next {
	font-weight: bold;
}
.ui-tabs-paging-prev a,
.ui-tabs-paging-next a {
    display: block; 
    position: relative; 
    top: 1px; 
    border: 0;
    z-index: 2; 
    padding: 0;
    /* color: #444; */ 
    text-decoration: none;
	background: transparent !important; 
	cursor: pointer;
}
.ui-tabs-paging-next a:hover,
.ui-tabs-paging-next a:focus,
.ui-tabs-paging-next a:active,
.ui-tabs-paging-prev a:hover,
.ui-tabs-paging-prev a:focus,
.ui-tabs-paging-prev a:active { 
	background: transparent; 
}
.ui-tabs-paging-disabled {
	visibility: hidden;
}
            </style>
<div class="<%=Config.GetValue("parentformclass").ToString() %> alpha">


    <div id="<%=Model.TabId %>" >

            <ol class="tabs">

            


<%
    int selectedIndex = 0;
    if (!string.IsNullOrEmpty(Request.QueryString["currentTabIndex"]))
        selectedIndex = int.Parse(Request.QueryString["currentTabIndex"]);
        
    if (!string.IsNullOrEmpty(Request.QueryString["action"]))
    {
        var _model = Model.Items.FirstOrDefault(p => p.Actions.Count(x => x.ToString().ToLower() == Request.QueryString["action"].ToLower()) > 0);
        if (_model != null)
        {
            _model.Selected = true;
            if (Request.QueryString["action"].Contains("/"))
            {
                if (Request.QueryString["action"].Split(char.Parse("/"))[0].Length > 0)
                {
                    _model.ControllerName = Request.QueryString["action"].Split(char.Parse("/"))[0];
                }
                _model.ActionName = Request.QueryString["action"].Split(char.Parse("/"))[1];
            }
            else
            {
                _model.ActionName = Request.QueryString["action"];
            }
            if (Model.TabSelectedIndex == null)
                Model.TabSelectedIndex = _model.Index;

           
        }
    }
    else {
        if (Model.TabSelectedIndex == null )
            Model.TabSelectedIndex = selectedIndex;
    }
    foreach (var item in Model.Items)
    {
        if (item.Selected)
        {

            item.Link = "#currentTabContent";
    
            %>       

           <li ><a  href="<%= item.Link %>"  title="<%: item.Help %>"><span><%=item.Text%></span></a></li>
  

        
<%    }
        else { %>
             <li ><a  href="<%= item.Link %>"  title="<%: item.Help %>"><span><%=item.Text%></span></a></li>
      
<%        }
    }%>
            </ol>
            <div id="currentTabContent">
  <% foreach (var item in Model.Items)
     {
         if (item.Selected)
         {%>
  
           <% 
if (!string.IsNullOrEmpty(item.RenderUrl))
{ 
                %>
                   <script>
                       $(document).ready(function () {
                           $("#currentTabContent").html('<div class="ajax-context"><img src="<%=ResolveUrl("~/") %>Content/ajax-loader.gif" /> <%= GlobalMessages.LOADING %></div>');
                       });
                       $.ajax({
                           url: "<%=item.RenderUrl %>&currentTabIndex=" + $("#<%=Model.TabId %>").tabs("option", "selected"),
                           contentType: "text/html",
                           cache: false,
                           success: function (data) {
                               $("#currentTabContent").html(data);

                           }

                       });
                   </script>
<%
}
else if (!string.IsNullOrEmpty(item.ActionName) || !string.IsNullOrEmpty(item.ControllerName))
{
    if (string.IsNullOrEmpty(item.ControllerName))
        Html.RenderAction(item.ActionName, item.routeValues);
    else
        Html.RenderAction(item.ActionName, item.ControllerName, item.routeValues);

}
else
{
    // Html.RenderPartial(item.PartialView, item.Model);
}

         } %>
            
       
<%     } %>          
           </div>
    </div>
    
 </div>
 
 <script type="text/javascript">
    

 $(document).ready(function() {
        
         $('#<%=Model.TabId %>').tabs({
                ajaxOptions: { dataType: 'html', cache:false },
                selected: <%= Model.TabSelectedIndex %>,
                cache: false,
			    
    		    load: function(event, ui) { refreshForms(); },
                spinner: '<div class="ajax-context"><img src="<%=ResolveUrl("~/") %>Content/ajax-loader.gif" /> <%= GlobalMessages.LOADING %></div>'
                });


           	
		 });
        //$("#<%=Model.TabId %>").tabs('paging', { cycle: true, nextButton: 'next &gt;', prevButton: '&lt; prev' });
   

 </script>
 