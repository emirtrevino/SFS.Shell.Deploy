<html>
	<head>
	<title>$FirstItem.Name;format="toUpper"$ </title>
	</head>
	<body>
	
<Table border="1">
   <tr>
	$ItemToDisplay.Properties.keys:{k |
							<td>$ItemToDisplay.Properties.(k);format="XML"$ </td>
							}$
        
   </tr>
   $ItemToDisplay.SubNodes.keys:{k |$ItemToDisplay.SubNodes.(k):{y | 
					$html_item(ItemToDisplayRec= y)$ }$}$					
   
  </Table>
				
		Generated on $DateCreated;format="yyyy MMM dd"$
	</body>
</html>