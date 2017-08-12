var map;
var shape = null;
var time = null;

function GetMapRegister() {
    map = new VEMap('BingMap');
    map.SetDashboardSize(VEDashboardSize.Tiny);
    map.AttachEvent("onclick", PixelClick);
    map.LoadMap();
}
function GetMapDiscount() {
    map = new VEMap('BingMap');
    map.SetDashboardSize(VEDashboardSize.Tiny);
    map.LoadMap();
    var lat = $('input#Latitude').attr('value');
    var lon = $('input#Longitude').attr('value');
    var zoom = 15;
    map.SetCenterAndZoom(new VELatLong(lat, lon), zoom);
}
function RefreshMap() {
/*
    try {
        map.Find(null,
                    document.getElementById("Country").value + " " +
                    document.getElementById("State").value);
    }
    catch (e) {
        alert(e.message);
    }
*/
}

function ExactLocation(Lat, Lon) {
    var LL = new VELatLong(Lat, Lon);
    map.SetCenterAndZoom(LL, 13);
    ReplaceShape(LL)
}
function ShowResults() {
/*
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var BingResults = document.getElementById("BingResults");
            var xmlDoc = xmlhttp.responseXML;
            var EstimatedTotal = xmlDoc.getElementsByTagName("EstimatedTotal")[0].childNodes[0].nodeValue;
            var Locations = xmlDoc.getElementsByTagName("Location");

            while (BingResults.childNodes[0]) {
                BingResults.removeChild(BingResults.childNodes[0]);
            }

            BingResults.appendChild(document.createTextNode("Found " + EstimatedTotal));
            var i = 0;
            for (var Location = null; i < EstimatedTotal; i++) {
                if (Locations[i].getElementsByTagName("AdminDistrict").length) {
                    var AdminDistrict = Locations[i].getElementsByTagName("AdminDistrict")[0].childNodes[0].nodeValue;
                }
                var CountryRegion = Locations[i].getElementsByTagName("CountryRegion")[0].childNodes[0].nodeValue;
                var FormattedAddress = Locations[i].getElementsByTagName("FormattedAddress")[0].childNodes[0].nodeValue;

                var Latitude = Locations[i].getElementsByTagName("Latitude")[0].childNodes[0].nodeValue;
                var Longitude = Locations[i].getElementsByTagName("Longitude")[0].childNodes[0].nodeValue;

                var Link = null;
                BingResults.appendChild(document.createElement("br"));
                Link = BingResults.appendChild(document.createElement("a"));
                BingResults.appendChild(document.createElement("br"));
                Link.appendChild(document.createTextNode(CountryRegion + " " + AdminDistrict + ": " + FormattedAddress));
                Link.setAttribute('href', "#");
                Link.setAttribute('onclick', "ExactLocation(" + Latitude + "," + Longitude + ");");
            }


        }
    }
    x | xmlhttp.open("GET", "http://dev.virtualearth.net/REST/v1/Locations/" + document.getElementById("Address").value + "?o=xml&key=ArGwYjnC32d9nuu3lgWpWf-296ysYoKNfJggTJiLalFpHe4fHAt05l5FdYq697Z2", true);
    xmlhttp.send();*/
}
function PixelClick(e) {
    var x = e.mapX;
    var y = e.mapY;
    var pixel = new VEPixel(x, y);
    var LL = map.PixelToLatLong(pixel);
    ReplaceShape(LL);

}

function ReplaceShape(LatLon) {
    $('input#Latitude').attr('value',LatLon.Latitude);
    $('input#Longitude').attr('value',LatLon.Longitude);
    if (shape != null) {
        map.DeleteShape(shape);
        shape = null;
    }

    shape = new VEShape(VEShapeType.Pushpin, LatLon);
    shape.SetTitle('You are here.');
    map.AddShape(shape);
}