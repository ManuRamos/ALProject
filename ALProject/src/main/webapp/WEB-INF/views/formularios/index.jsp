<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
</head>
<script>

function lanzarHibernate(){
	var urlstr="/ocaso/almacenar.alp";
	
    $.ajax({
        type: "post",
        url: urlstr, //this is my servlet
        dataType: "json",
        success: function(){      
                alert("ok");
        },error: function(){
				alert("error");
            }
    });
}
</script>
<body>
 <p>My mother has <span style="color:blue">blue</span> eyes.</p> 
</body>
</html>