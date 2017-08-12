<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h2>
        <%=Server.GetLastError().GetBaseException().ToString()%>
    </h2>
</body>
</html>