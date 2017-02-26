<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="static/includes/css/jquery-ui-1.8.7.css" type="text/css">
<script src="static/includes/js/jquery-3.1.1.js"></script>
<script src="static/includes/js/mio.js"></script>
</head>
<script>
function lanzarHibernate(){
	lanzaPrueba();
	
	var urlstr="ocaso/almacenar.alp";
	
	$.ajax({
	    type: "post", url: urlstr,
	    success: function (data, text) {
	        alert("ok");
	    },
	    error: function (request, status, error) {
	        alert(request.responseText);
	    }
	});
}

function errorfunc(msg){
var i1=0;
	
	alert(msg);
}
</script>
<body>
<h2>Spring Page Redirection</h2>
<p>Click below button to redirect the result to new page</p>
<form method="GET" action="ocaso/almacenar.alp">
<table>
    <tr>
    <td>
    <input type="submit" value="Redirect Page"/>
    </td>
    </tr>
</table>  
</form>
</body>
</html>