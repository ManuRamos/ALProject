/* Custom variables */

/* Offset position of tooltip */
var x_offset_tooltip = 5;
var y_offset_tooltip = 0;

/* Don't change anything below here */


var ajax_tooltipObj = false;
var ajax_tooltipObj_iframe = false;

var ajax_tooltip_MSIE = false;
if (navigator.userAgent.indexOf('MSIE') >= 0)ajax_tooltip_MSIE = true;


var currentTooltipObject = false;

ajax_showTooltip = function(e, externalFile, inputObj)
{
    currentTooltipObject = inputObj;
	//window.onresize = function(e) { ajax_positionTooltip(e); } ;
    if (document.all)e = event;


    if (!ajax_tooltipObj)    /* Tooltip div not created yet ? */
    {
        ajax_tooltipObj = document.createElement('DIV');
        ajax_tooltipObj.style.position = 'absolute';

        ajax_tooltipObj.id = 'ajax_tooltipObj';

        document.body.appendChild(ajax_tooltipObj);


        var leftDiv = document.createElement('DIV');
        /* Create arrow div */
        leftDiv.className = 'ajax_tooltip_arrow';
        leftDiv.id = 'ajax_tooltip_arrow';
        ajax_tooltipObj.appendChild(leftDiv);

        var contentDiv = document.createElement('DIV');
        /* Create tooltip content div */
        contentDiv.className = 'ajax_tooltip_content';
        ajax_tooltipObj.appendChild(contentDiv);
        contentDiv.id = 'ajax_tooltip_content';
        contentDiv.style.marginBottom = '15px';

		// Creating button div
        var buttonDiv = document.createElement('DIV');
        buttonDiv.style.cssText = 'position:absolute;left:20px;top:2px;text-align:center;font-size:0.8em;height:15px;z-index:10000000';
		//buttonDiv.innerHTML = '<a href="#" onclick="ajax_hideTooltip();return false">X</a>';
        ajax_tooltipObj.appendChild(buttonDiv);

        if (ajax_tooltip_MSIE) {    /* Create iframe object for MSIE in order to make the tooltip cover select boxes */
            ajax_tooltipObj.style.cursor = 'move';
            ajax_tooltipObj_iframe = document.createElement('<IFRAME frameborder="0">');
            ajax_tooltipObj_iframe.style.position = 'absolute';
            ajax_tooltipObj_iframe.border = '0';
            ajax_tooltipObj_iframe.frameborder = 0;

            ajax_tooltipObj_iframe.src = 'about:blank';
            contentDiv.appendChild(ajax_tooltipObj_iframe);
            ajax_tooltipObj_iframe.style.left = '0px';
            ajax_tooltipObj_iframe.style.top = '0px';
            ajax_tooltipObj_iframe.style.width = '300px';

        }
    }
	// Find position of tooltip
    ajax_tooltipObj.style.display = 'block';
    ajax_loadContent('ajax_tooltip_content', externalFile);


    if (ajax_tooltip_MSIE) {
        ajax_tooltipObj_iframe.style.width = '100px';
        ajax_tooltipObj_iframe.style.height = '200px';
    }


    ajax_positionTooltip(e, inputObj);
   // document.getElementById("ajax_tooltipObj").onblur = fueraTooltip;
}


function ajax_positionTooltip(e, inputObj)
{	
	if (document.body && document.body.offsetWidth) {
	 winW = document.body.offsetWidth;
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
	    document.documentElement &&
	    document.documentElement.offsetWidth ) {
	 winW = document.documentElement.offsetWidth;
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
	
    ajax_tooltipObj.style.left = (e.clientX+20) + 'px';
    ajax_tooltipObj.style.top = e.clientY + 'px';
    ajax_tooltipObj.style.width = (winW- e.clientX - 20) + 'px';
    ajax_tooltipObj.style.height = (winH- e.clientY) +'px';   
}


ajax_hideTooltip = function ()
{

    if (ajax_tooltipObj)
        ajax_tooltipObj.style.display = 'none';
}

ajaxTooltip_getTopPos = function(inputObj)
{
    //var returnValue = inputObj.style.top;
    var returnValue = window.event.screenY - 200;
    // Comento estas lineas: no queremos posicion relativa, queremos posicion absoluta en la pantalla
    // while((inputObj = inputObj.offsetParent) != null){
    //	if(inputObj.tagName!='HTML')returnValue += inputObj.offsetTop;
    //}
    return returnValue;
}

ajaxTooltip_getLeftPos = function (inputObj)
{
    var returnValue = inputObj.offsetLeft;
    while ((inputObj = inputObj.offsetParent) != null) {
        if (inputObj.tagName != 'HTML')returnValue += inputObj.offsetLeft;
    }
    return returnValue;
}
