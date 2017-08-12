<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<style>
	.demo ul { list-style-type: none; margin: 0; padding: 0; margin-bottom: 10px; }
	.demo li { margin: 5px; padding: 5px; width: 150px; }
	
		.wrap {
		position:relative;
		
               /*replace 900px with your width*/
		
	}

	#header, #footer {
		
		float:left;
	}
		#footer {
		position:fixed;
		bottom:0;
		z-index:999999;
	}


	</style>
    <script>
        $(function () {
            $("#sortable").sortable({
                revert: true
            });
            $("#draggable").draggable({
                connectToSortable: "#sortable",
                helper: "clone",
                revert: "invalid"
            });
            $("ul, li").disableSelection();
        });
	</script>
     <div id="footer" class="grid_16">
          <div class="wrap">


<div class="demo">
    <div>
    <div id="draggable">Nuevo campo</div>
    </div>
<%--<div id="sortable">
	<div class="ui-state-default">Item 1</div>
	<div class="ui-state-default">Item 2</div>--%>
	<%--<li class="ui-state-default">Item 3</li>
	<li class="ui-state-default">Item 4</li>
	<li class="ui-state-default">Item 5</li>--%>
<%-- </div> --%>

</div>



          </div>
     </div>
