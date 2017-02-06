<!--
var request; //Contiene la llamada al Servlet y el metodo que nos devuelve la respuesta del Servlet.
var SIN_INICIALIZAR   = 0;
var CARGANDO          = 1;
var CARGADO           = 2;
var INTERACTIVO       = 3;
var COMPLETADO        = 4;
var STATUS_HTTP_OK    = 200;
var STATUS_HTTP_ERROR = 500;
var STATUS_HTTP_FICHERONOENCONTRADO = 404;

/*  Para usar el almacen HttpRequest se debe Llamar al método LlamarAservlet.
 *  Tambien se debe implementar un Servlet que realice el trabajo del lado del servidor.
 *  Finalmente se debe implementar un controlador, javascript, especifico para que reciba la respuesta del
 *  Servlet. Este controlador tiene que ser una función javaScript sin parametros y que en su interior controle
 *  el objeto request. Este objeto contiene la respuesta Http del Servlet.
 *  Para ver un ejemplo de una implementacion sencilla de este comtrolador lee el archivo: procedencia.js
 */
 /*
 Esta funcion inicializa el objeto XMLHttpRequest en el momento en el que se llama por primera vez al jsp que
 incluya este js y permanece inicializado.
 */
function inicializarXMLHttpRequest(){
    request = getXMLHttpRequestObject()
}

function getXMLHttpRequestObject(){
    var aux
    if(window.XMLHttpRequest)
        aux = new XMLHttpRequest();
    //Si es internet explorer...
    else if(window.ActiveXObject)
        aux = new ActiveXObject("Microsoft.XMLHTTP");
    return aux
}

/**
* Esta función permite llamar a url en modo background
* @param url String la url a abrir (debe incluir el context root)
* @param showException booleano que indica si se muestran los errores producidos o no. Si es true, se mostrará un alert
*        con el mensaje de error, si es false, no se hará nada
*/
function backgroundCallAjax(url, showExceptions, dopost){
    if(showExceptions != null && showExceptions == true)
        llamarAServletThreadSafe(url, backgroundCallAjaxException, dopost)
    else llamarAServlet(url, backgroundCallAjaxDummy, dopost)
}

function backgroundCallAjaxDummy(){
    //No hace nada, se usa desde backgroundCallAjax
}

function backgroundCallAjaxException(reqThreadSafe, url){
    if(reqThreadSafe.readyState == COMPLETADO){
        if(reqThreadSafe.status != STATUS_HTTP_OK)
            alert("Error ajax: " + getAjaxErrorMessage(reqThreadSafe) + "\rUrl: " + url)
    }
}

function ajax_getSubmitMethod(dopost){
    return (dopost == null || dopost != true) ? "GET" : "POST"
}

function llamarAServletThreadSafe(url, controlador, dopost){
	//Uso "inner functions", lo que hace que las variables locales de la función que la contiene, mantengan los valores
	function innerAjaxBindCallback(){
		if (ajaxRequest.readyState == COMPLETADO)
            ajaxCallback(ajaxRequest, ajaxURL)
	}

    //Si no se ha pasado la función que actua como controlador muestro un aviso y salgo...
    if (typeof controlador != 'function'){
        alert("Hay que implementar la funcion pasada por parametro para usar esta funcionalidad")
        return
    }

    //Variables locales para mantener los valores mientras se ejecuta la inner function
	var ajaxRequest = getXMLHttpRequestObject()
	var ajaxCallback = controlador
    var ajaxURL = url

    ajaxRequest.onreadystatechange = innerAjaxBindCallback
    ajaxRequest.open(ajax_getSubmitMethod(dopost), ajaxURL, true); //Asincrono

	// bind our callback then hit the server...
	if (window.XMLHttpRequest)
		ajaxRequest.send(null)
	else if (window.ActiveXObject) {
		if (ajaxRequest)
			ajaxRequest.send()
	}

}

/*
* ESTA FUNCION NO SE DEBERIA UTILIZAR, EN VEZ DE ESTA UTILIZAD llamarAClase..
* Esta función contiene el código que asigna el manejador de eventos el método a llamar en el Servlet
* Así como la conexión con el Servlet.
*/
function llamarAServlet(url, controlador, dopost){
    llamarAServletPrivate(url, controlador, false, dopost)
}

function llamarAServletSincrono(url, controlador, dopost){
    llamarAServletPrivate(url, controlador, true, dopost)
}


function llamarAServletPrivate(url, controlador, sincrono, dopost){
    //inicializo el objeto XMLHttpRequest para evitar que se quede cacheado...
    inicializarXMLHttpRequest();
    //Si no se ha pasado la función que actua como controlador muestro un aviso y salgo...
    if (sincrono != true && typeof controlador != 'function'){
        alert("Hay que implementar la funcion pasada por parametro para usar esta funcionalidad");
        return;
    }
    //Si no se ha inicializado el request muestro aviso y salgo...
    if(typeof request != 'object'){
        alert("No se ha inicializado correctamente el objeto XMLHttpRequest");
        return;
    }
    //Abro la conexion con el servlet y declaro el manejador de eventos....
    //Si no es internet explorer...
    if(window.XMLHttpRequest){
        //Le asigno el manejador de evento "cambio del request"
        if(typeof controlador == 'function'){

            var wrap = function (functionToWrap, before, after, thisObject) {
                return function () {
                    var args = Array.prototype.slice.call(arguments),
                        result;

                    if (before){
                        before.apply(thisObject || this, args);
                        }

                    if(functionToWrap!=null){
                        result = functionToWrap.apply(thisObject || this, args);
                    }
                    if (after){
                        after.apply(thisObject || this, args);
                        }
                    return result;
                };
            };
            var al= function (){
                        if (request.readyState == COMPLETADO) {
                                if (request.status == STATUS_HTTP_OK) {
                                           //proceso la informacion recibida por el request en formato XML...
                                           var xml = request.responseXML;
                                           if(xml.text.length==0){
                                                if (request.responseText.indexOf('<meta name="Description" content="Pantalla de Login" >') > -1) {
                                                    alert("La sesión puede haber caducado. Actualice la página y vuelva a loguearse");
                                                    //TODO window.open("/hphis/LoginEDoctor.jsp?soloLogueo=S","loginAjaxSesionCaducada","menubar=no,toolbar=no,location=no,resizable=yes,width=650,height=450,top=50,left=75,scrollbars=yes");
                                                }
                                           }
                                 }
                        }
            };
            var myFunc = wrap(controlador, al, null,this);
            request.onreadystatechange=myFunc
        }
        try{
            //abro la conexion con el servlet y le indico que llame al método doGet...
            request.open(ajax_getSubmitMethod(dopost), url, !sincrono);
        }
        catch(e){
            alert(e);
        }
        //envío el request al servlet...
        request.send(null);
    }
    //Si es internet explorer...
    else if(window.ActiveXObject){
        if(request){
            //Le asigno el manejador de evento "cambio del request"
            if(typeof controlador == 'function')
                request.onreadystatechange = controlador;
            //abro la conexion con el servlet y le indico que llame al método doGet...
            request.open(ajax_getSubmitMethod(dopost), url, !sincrono);
            //envío el request al servlet...
            request.send();
        }
    }
}

/**
* -------------MAS INFORMACION DE COMO IMPLEMENTARLO EN HTTPREQUESTINTERFACE Y HTTPREQUESTSERVLET--------------------
* Esta función Llama al servlet que se utiliza para instanciar la clase que es encargada de realizar las validaciones
* en el servidor.
* Los parametros que se deben pasar a esta función son:
* CLASE: el nombre de la clase (completamente referenciada) que se va a instanciar y que implementa todo el código
* de control en el servidor, esta clase debe implementar el interfaz AjaxInterface.
* CONTTROLADOR: referencia a la función javascript que implementa el controlador de cambio en el protocolo http,
* esta función recibe la respuesta del servlet y es llamada cada vez que cambia el estado del objeto XMLHttpRequest.
* IMPORTANTE: ------------------El nombre no se debe pasar entre comillas.------------------------------
* PARAMETROS: los parametros que necesita la clase para realizar su tarea en el servidor. El formato de este string es
* el siguiente: nombre1=parametro1&nombre2=parametro2.....&nombren=parametron
* EJEMPLO: llamarAClase('com.hphis.Cocina',prepararComida,'cena=N&comida=N&desayuno=S')
*/
function llamarAClase(clase, controlador, parametros, contexto){
    llamarAClasePrivate(clase, controlador, parametros, false, contexto)
}

function llamarAClaseSincrono(clase, controlador, parametros, contexto){
    llamarAClasePrivate(clase, controlador, parametros, true, contexto)
}

function llamarAClasePrivate(clase,controlador,parametros,sincrono, contexto){
    var url = construirURL(parametros,clase, contexto)
    if(sincrono)
        llamarAServletSincrono(url,controlador)
    else llamarAServlet(url,controlador)
}

/**
*FUNCION INTERNA no se debe llamar desde fuera del js
*Esta función construye la url que necesita el servlet HttpRequestServlet a partir de los parametros pasados...
*/
function construirURL(parametros, clase, contexto){

    var url = contexto + "/AjaxServlet.servlet?";
    //Añado a la URL los parametros y el nombre de la clase que se debe instanciar en el servlet...
    url = url + parametros + "&classtoexecute=" + clase;
    return url;
}

function llamarAClaseAjax(ajaxId, controlador, parametros, contexto){
    llamarAClaseAjaxPrivate(ajaxId, controlador, parametros, contexto)
}

function llamarAClaseAjaxPrivate(ajaxId, controlador, parametros, contexto){
    var url = construirURLAjaxId(parametros,ajaxId,contexto)
    llamarAServletThreadSafe(url, controlador, true)
}

/**
*FUNCION INTERNA no se debe llamar desde fuera del js
*Esta función construye la url que necesita el servlet HttpRequestServlet a partir de los parametros pasados...
*/
function construirURLAjaxId(parametros, ajaxId, contexto){

    var url = contexto + "/AjaxServlet.servlet?";
    //Añado a la URL los parametros y el nombre de la clase que se debe instanciar en el servlet...
    url = url + parametros + "&ajaxId=" + ajaxId;
    return url;
}

//Esta funcion busca en el DOM de un archivo xml el tag campo y devuelve su valor.
function getXmlHttpRequestValue(xmlHttp, campo){
    try{
        //Si el nombre del nodo es igual a campo...
        if(xmlHttp.nodeName == campo){
            //Devuelve el texto que hay en el tag
            try{
                return xmlHttp.firstChild.nodeValue;
            } catch(e){
                return null;
            }
        }
        //Si el nombre del nodo no coincide con el del campo...
        else{
            var nodosHijo = xmlHttp.childNodes;

            for(var i=0;i<nodosHijo.length;i++){
                //Llamo otra vez a la misma funcion pasando esta vez un nodo hijo del anterior.
                var valorNodo = getXmlHttpRequestValue(nodosHijo[i],campo);
                if(valorNodo != 'null' && valorNodo != ''){
                    //Si es distinto de null o vacio...
                    return valorNodo;
                }
            }
            return "";
        }
    } catch(e){
        alert('Error:' + e.message);
    }
}

//Esta funcion busca en el DOM de un archivo xml el tag campo y devuelve una lista de valores
function getXmlHttpRequestListValues(xmlHttp, campo, arrayValores){
    if (typeof arrayValores == "undefined") arrayValores = new Array(); //Creamos el array
    try{
        //Si el nombre del nodo es igual a campo...
        if(xmlHttp.nodeName == campo){
            //Devuelve el texto que hay en el tag
            try{
                arrayValores[arrayValores.length] = xmlHttp.firstChild.nodeValue;
                return arrayValores;
            } catch(e){
                return null;
            }
        }
        //Si el nombre del nodo no coincide con el del campo...
        else{
            var nodosHijo = xmlHttp.childNodes;

            for(var i=0;i<nodosHijo.length;i++){
                //Llamo otra vez a la misma funcion pasando esta vez un nodo hijo del anterior.
                getXmlHttpRequestListValues(nodosHijo[i],campo, arrayValores);
            }
            return arrayValores;
        }
    } catch(e){
        alert('Error:' + e.message);
    }
}

//Dado un nombre de tag con la forma <tag codigo="xxx" descripcion="yyy"/> devuelve un map con los codigos como claves
function getCodDesc(xmlHttp,campo){

    var resultado = new Array();

    getCodDes(xmlHttp,campo,resultado);

    return resultado;
}

function getCodDes(xmlHttp,campo,resultadoParcial){

    try{

        //Si el nombre del nodo es igual a campo...
        if(xmlHttp.nodeName == campo){
            //Devuelve el texto que hay en el tag
            try{
                var codigo = xmlHttp.getAttribute('codigo');
                var descripcion = xmlHttp.getAttribute('descripcion');

                resultadoParcial[codigo] = descripcion;

            } catch(e){

                alert(e.message);
            }
        }
        //Si el nombre del nodo no coincide con el del campo...
        else{
            var nodosHijo = xmlHttp.childNodes;

            for(var i=0;i<nodosHijo.length;i++){
                //Llamo otra vez a la misma funcion pasando esta vez un nodo hijo del anterior.
                resultadoParcial = getCodDes(nodosHijo[i],campo, resultadoParcial);
            }
        }

        return resultadoParcial;
    }
    catch(e){

        alert('Error:' + e.message);
    }
}

function getAjaxErrorMessage(reqThreadSafe){
    if(reqThreadSafe != null)
        return reqThreadSafe.statusText
    else return request.statusText
}

function xmlToJson(xml) {
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

inicializarXMLHttpRequest(); //Inicializo el objeto XMLHttpRequest.
// -->