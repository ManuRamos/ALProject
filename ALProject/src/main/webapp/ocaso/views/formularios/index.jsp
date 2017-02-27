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
var pestanaActual=0;

function po_goPestania(i) {
    if (pestanaActual != i) {
        if (i == "0") {
            document.criteriosBusqueda.location.href = "<%=request.getContextPath()%>/ocaso/views/formularios/vistaCliente.jsp";
        } else {
            document.criteriosBusqueda.location.href = "<%=request.getContextPath()%>/ocaso/views/formularios/vistaMantenimiento.jsp";

        }
        pestanaActual=i;
    }
}
</script>
<!-- <body onload="po_goPestania(0);"> -->
<!--     <table class="tabPanel" cellspacing="0" cellpadding="0" border="0"> -->
<!--         <tr><td></td></tr> -->
<!--         <tr> -->
<!--             Pestaña 1 -->
<!--             <td id="coltab0a" class='tabPanelLeftSelected'></td> -->
<!--             <td id="coltab0b" class="tabPanelSelected" title="Agenda de Hospitalización" -->
<!--                 onmouseover='window.status="Agenda de Hospitalización";return true'> -->
<!--                 <a id="enlace0" href='javascript:po_goPestania("0");' class="blanco">Agenda de Hospitalización"</a></td> -->
<!--             <td id='coltab0c' class='tabPanelRightUnionSelected' nowrap="nowrap"></td> -->
<!--             Pestaña 2 -->
<!--             <td id="coltab1b" class="tabPanel" title="Alta Temporal" -->
<!--                 onmouseover='window.status="Alta Temporal";return true'> -->
<!--                 <a id="enlace1" href='javascript:po_goPestania("1");' class="blanco">Alta Temporal</a></td> -->
<!--              <td id='coltab1c' class='tabPanelRight' nowrap="nowrap"></td> -->
<!--         </tr> -->
<!--     </table> -->
<!--     <table  class=criterios cellSpacing=0 cellPadding=0 border=0> -->
<!--         <TR class=cabeceracriterios> -->
<!--             <td class=esqsupizq> </td> -->
<!--             <td><hpu:toggleBtn nombreContenido="motivo"/></td> -->
<!--             <td> -->
<!--                 Criterios de la Agenda de Hospitalización -->
<!--                 <span id="spanFavoritos"/> -->
<!--             </td> -->
<!--             <td class=esqsupder></td> -->
<!--         </TR> -->
<!--      </table> -->
<!--     <span id="capaCriterios"> -->
<!--     <iframe frameborder=0  src="" width="100%"  height="100%"  name="criteriosBusqueda" id="criteriosBusqueda" scrolling='no'></iframe> -->
<!--     </span> -->
<!-- </body> -->
<body>
	<div id="tabs">
	<ul>
	     <li><a href="<%=request.getContextPath()%>/ocaso/views/formularios/vistaCliente.jsp" class="selected" target="mainFrame"  >Cliente</a></li>
	     <li><a href="<%=request.getContextPath()%>/ocaso/views/formularios/vistaMantenimiento.jsp" target="mainFrame"  >Mantenimiento</a></li>
	</ul>
	</div>
<body>
</html>