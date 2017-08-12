<?php

//include('parse-class.php');



$user = "PRIMETRAMX153329";

$pass = "PRIMETRAMX153329";

$destino = "http://testapi.interface-xml.com/appservices/ws/FrontendService";

$objClient = new SoapClient($destino, array('trace' => true,'exceptions' => 0, 'encoding' => 'UTF-8'));

$xml = '<hb:getHotelValuedAvail xmlns:hb="http://axis.frontend.hydra.hotelbeds.com" type="xsd:string">
<HotelValuedAvailRQ echoToken="DummyEchoToken"
sessionId="1234"
xmlns="http://www.hotelbeds.com/schemas/2005/06/messages"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.hotelbeds.com/schemas/2005/06/messages HotelValuedAvailRQ.xsd">
<Language>ENG</Language>
<Credentials>
<User>'.$user.'</User>

<Password>'.$pass.'</Password>
</Credentials>
<PaginationData itemsPerPage="999" pageNumber="1"/>

<CheckInDate date="20131209"/>
<CheckOutDate date="20131212"/>

<Destination code="BCN" type="SIMPLE"/>
<OccupancyList>
<HotelOccupancy>
<RoomCount>1</RoomCount>
<Occupancy>
<AdultCount>1</AdultCount>
<ChildCount>0</ChildCount>
</Occupancy>
</HotelOccupancy>
</OccupancyList>
</HotelValuedAvailRQ>
</hb:getHotelValuedAvail>';





$soapvar = new SoapVar($xml, XSD_ANYXML);

$objResponse = $objClient->__soapCall("getHotelValuedAvail", array($soapvar)); 

//print_r(html_entity_decode($objClient->__getLastResponse()));

$contents = html_entity_decode($objClient->__getLastResponse());



//$contents = file_get_contents('hotelbeds.xml');//Or however you what it
//echo $contents;
//echo "<br>------------------------------------------------------------------------------------<br>";
//$result = xml2array($contents);



echo "<pre>";
print_r($contents);
echo "</pre>";

?>
