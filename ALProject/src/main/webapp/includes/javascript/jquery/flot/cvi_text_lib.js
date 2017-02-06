// cvi_text_lib.js version 1.01 (13-Mar-2008)
// (c) 2008 by Christian Effenberger. All Rights reserved. 
// Distributed under Netzgestade Software License Agreement
// http://www.netzgesta.de/dev/text/LISENSE.txt

// font characters 30-127 and 160-255 (ISO-8859-1) 
// font charset UTF-8 or ISO-8859-1 is recommended
// font type (built in) is a sans-serif multiple master   
// single line stroke font, similar to "VAG Rounded",
// "DIN 17" and a few other fonts of that kind.
// Create your own font e.g. strokeFont["serif"] = {};
// and load as an external js file after cvi_text_lib.js
// font size is limited to min 1 max 99999 default is 12px
// font weight is limited to min 1 max 400 default is 100%
// font weight for normal text should not be more than 200%
// font width is limited to min 10 max 400 default is 100%
// char space is limited to min 10 max 1000 default is 100%
// color and opacity is set through context.strokeStyle

// extend CanvasRenderingContext2D with strokeText
//   context.strokeText(text,x,y,fontsize,fontweight,fontwidth,charspace,fonttype)
//     fontsize == baseline == textheight / 32 * 25
// IE specific
//   STRING = get_strokeText(text,x,y,fontsize,fontweight,fontwidth,charspace,fonttype,color,opacity,rotation,id)
//     fontsize == baseline == textheight / 32 * 25

// webKit patch function (Safari)
//   set_textRenderContext(context)

// check if the text function is available
//   BOOLEAN = check_textRenderContext(context)
// IE specific
//   BOOLEAN = check_strokeTextCapability()
 
// helper function
//   draw_boundingBox(context,x,y,baseline,textheight,textwidth)
// IE specific
//   STRING = get_boundingBox(context,x,y,baseline,textheight,textwidth,linewidth,color,opacity,rotation,id)

// utility functions
//   STRING = get_widthText(string,textwidth,fontsize,fontwidth,charspace,fonttype)
//   FLOAT  = get_textWidth(string,fontsize,fontwidth,charspace,fonttype)
//   FLOAT  = get_textHeight(fontsize)
//   FLOAT  = get_baseLine(fontsize)

// howto
//   <script src="cvi_text_lib.js"></script>
//   <script>
//     var context = canvas.getContext('2d');
//     set_textRenderContext(context);
//     if(check_textRenderContext(context)) {
//     ...
//       context.strokeText(text,x,y,fontsize);
//     ...
//     }
//   </script>
//   <!--[if gte IE 6]>
//   <script>
//     if(check_strokeTextCapability()) {
//     ...
//       string = get_strokeText(text,x,y,fontsize,fontweight,fontwidth,charspace,fonttype,color,opacity,rotation,id)
//       document.getElementById("div").innerHTML = string;
//     ...
//     }
//   </script>
//   <![endif]-->

function check_strokeTextCapability() {
	if(document.namespaces['v'] == null) {var stl = document.createStyleSheet(); stl.addRule("v\\:*", "behavior: url(#default#VML);"); document.namespaces.add("v", "urn:schemas-microsoft-com:vml"); }
	if(typeof get_strokeText == 'function' && document.namespaces['v'] != null) {return true;}else {return false;}
}
function get_boundingBox(x,y,baseline,lineheight,linewidth,weight,color,opacity,rotation) {
	rotation=typeof(rotation)!='undefined'?rotation:0; color=typeof(color)!='undefined'?color:'#000000'; opacity=typeof(opacity)!='undefined'?opacity:1; id=typeof(id)!='undefined'?'id="'+id+'"':''; var w=parseInt(linewidth), b=parseInt(baseline), h=parseInt(lineheight);
	return '<v:shape '+id+' filled="f" stroked="t" coordorigin="0,0" coordsize="'+w+','+h+'" path="m 0,'+b+' l 0,0,'+w+',0,'+w+','+b+',0,'+b+',0,'+h+','+w+','+h+','+w+','+b+' e" style="rotation:'+rotation+';position:absolute;margin:0px;top:'+Math.round(y)+'px;left:'+Math.round(x)+'px;width:'+w+'px;height:'+h+'px;"><v:stroke color="'+color+'" opacity="'+opacity+'" weight="'+weight+'" /></v:shape>';	
}
function get_strokeText(string,x,y,size,weight,width,space,font,color,opacity,rotation,id) {
	function qC(cX,cY,CPx,CPy,aX,aY) {var t = new Array(6); t[0]=cX+2.0/3.0*(CPx-cX); t[1]=cY+2.0/3.0*(CPy-cY); t[2]=t[0]+(aX-cX)/3.0; t[3]=t[1]+(aY-cY)/3.0; t[4]=aX; t[5]=aY; return t;}
	size=typeof(size)!='undefined'?size:12; weight=typeof(weight)!='undefined'?weight:100; width=typeof(width)!='undefined'?width:100; space=typeof(space)!='undefined'?space:100;
	font=typeof(font)!='undefined'?font:"sans-serif"; string=typeof(string)!='undefined'?string:' '; var xx=typeof(x)!='undefined'?x:0; var yy=typeof(y)!='undefined'?y:0;
	rotation=typeof(rotation)!='undefined'?rotation:0; color=typeof(color)!='undefined'?color:'#000000'; opacity=typeof(opacity)!='undefined'?opacity:1; id=typeof(id)!='undefined'?'id="'+id+'"':'';
	var i=0,j=0,f=10,path="",a,b,z,k,c,p,o,len=string.length,mag=size/25.0,fac=Math.max(Math.min(weight,400),1)/40, faw=Math.max(Math.min(width,400),10)/100;
	var spc=Math.max(Math.min(space,1000),10)/100,mx=((mag*16*faw)*spc)-(mag*16*faw),lw=(fac*mag);x=0;y=size;
	var ww=Math.round(get_textWidth(string,size,width,space,font)), hh=Math.round(get_textHeight(size));
	var out='<v:shape '+id+' filled="f" stroked="t" coordorigin="0,0" coordsize="'+parseInt(ww*f)+','+parseInt(hh*f)+'"';
	for(i=0; i<len; i++) { c=strokeFont[font][string.charAt(i)]; if(!c) {continue;} o=0; 
		for(j=0; j<c.n; j++) {
			if(typeof(c.d[o])!="string") {o++; continue;} p=c.d[o]; o++; a=c.d[o];
			if(p=="m") {path+=' m '+parseInt((x+a[0]*mag*faw)*f)+','+parseInt((y-a[1]*mag)*f); o++;}else
			if(p=="q") {z=c.d[o-2]; o++; b=c.d[o]; k=qC(z[0],z[1],a[0],a[1],b[0],b[1]); path+=' c '+parseInt((x+k[0]*mag*faw)*f)+','+parseInt((y-k[1]*mag)*f)+','+parseInt((x+k[2]*mag*faw)*f)+','+parseInt((y-k[3]*mag)*f)+','+parseInt((x+k[4]*mag*faw)*f)+','+parseInt((y-k[5]*mag)*f); o++;}else 
			if(p=="b") {o++; b=c.d[o]; o++; z=c.d[o]; path+=' c '+parseInt((x+a[0]*mag*faw)*f)+','+parseInt((y-a[1]*mag)*f)+','+parseInt((x+a[0]*mag*faw)*f)+','+parseInt((y-a[1]*mag)*f)+','+parseInt((x+z[0]*mag*faw)*f)+','+parseInt((y-z[1]*mag)*f); o++;}else
			if(p=="l") {path+=' l '+parseInt((x+a[0]*mag*faw)*f)+','+parseInt((y-a[1]*mag)*f); o++; while(typeof(c.d[o])!="string" && o<c.d.length) {a=c.d[o]; path+=' l '+parseInt((x+a[0]*mag*faw)*f)+','+parseInt((y-a[1]*mag)*f); o++;}}
		} x+=((c.w*faw)*mag)+mx;
	} out+=' path="'+path+' e" style="rotation:'+rotation+';position:absolute;margin:0px;top:'+Math.round(yy)+'px;left:'+Math.round(xx)+'px;width:'+ww+'px;height:'+hh+'px;"><v:stroke color="'+color+'" opacity="'+opacity+'" weight="'+lw+'" miterlimit="0" endcap="round" joinstyle="round" /></v:shape>';	
	return out;
}
function get_baseLine(size) {return size;} 
function get_textHeight(size) {size=typeof(size)!='undefined'?size:12; return 32*(size/25);} 
function get_textWidth(string,size,width,space,font) {
	size=typeof(size)!='undefined'?size:12; width=typeof(width)!='undefined'?width:100; space=typeof(space)!='undefined'?space:100; string=typeof(string)!='undefined'?string:' ';
	font=typeof(font)!='undefined'?font:"sans-serif"; var total=0,len=string.length,mg=size/25.0,fw=Math.max(Math.min(width,400),10)/100,sp=Math.max(Math.min(space,1000),10)/100,m=((mg*16*fw)*sp)-(mg*16*fw); 	
	for(var i=0; i<len; i++) {var c=strokeFont[font][string.charAt(i)]; if(c) total += ((c.w*fw)*mg)+m;}return total-(m);
}
function get_widthText(string,width,size,fontwidth,space,font) {
	size=typeof(size)!='undefined'?size:12; fontwidth=typeof(fontwidth)!='undefined'?fontwidth:100; space=typeof(space)!='undefined'?space:100; string=typeof(string)!='undefined'?string:' '; width=typeof(width)!='undefined'?width:100;
	font=typeof(font)!='undefined'?font:"sans-serif"; var cur=0,total=0,len=string.length,mg=size/25.0,fw=Math.max(Math.min(fontwidth,400),10)/100,sp=Math.max(Math.min(space,1000),10)/100,m=((mg*16*fw)*sp)-(mg*16*fw); 	
	for(var i=0; i<len; i++) {var c=strokeFont[font][string.charAt(i)]; if(c) {cur = ((c.w*fw)*mg)+m; if((total+cur-(m)) <= width) {total += cur;}else {break; }}else {break; }} return string.substring(0,i); 
}
function draw_boundingBox(ctx,x,y,baseline,lineheight,linewidth) {ctx.strokeRect(x,y+baseline,linewidth,lineheight-baseline); ctx.strokeRect(x,y,linewidth,baseline);}
function do_drawText(string,x,y,size,weight,width,space,font) {
	size=typeof(size)!='undefined'?size:12; weight=typeof(weight)!='undefined'?weight:100; width=typeof(width)!='undefined'?width:100; space=typeof(space)!='undefined'?space:100;
	font=typeof(font)!='undefined'?font:"sans-serif"; x=typeof(x)!='undefined'?x:0; y=typeof(y)!='undefined'?y+size:0+size; string=typeof(string)!='undefined'?string:' ';
	var i=0,j=0,a,b,z,c,p,o,len=string.length,mag=size/25.0,fac=Math.max(Math.min(weight,400),1)/40, faw=Math.max(Math.min(width,400),10)/100;
	var spc=Math.max(Math.min(space,1000),10)/100,mx=((mag*16*faw)*spc)-(mag*16*faw),lw=this.lineWidth, ml=this.miterLimit, lj=this.lineJoin, lc=this.lineCap;
	this.lineWidth=(fac*mag); this.miterLimit=0; this.lineJoin="round"; this.lineCap="round";
	for(i=0; i<len; i++) { c=strokeFont[font][string.charAt(i)]; if(!c) {continue;} o=0; this.beginPath(); 
		for(j=0; j<c.n; j++) {
			if(typeof(c.d[o])!="string") {o++; continue;} p=c.d[o]; o++; a=c.d[o];
			if(p=="m") {this.moveTo(x+a[0]*mag*faw, y-a[1]*mag); o++;}else
			if(p=="q") {o++; b=c.d[o]; this.quadraticCurveTo(x+a[0]*mag*faw, y-a[1]*mag, x+b[0]*mag*faw, y-b[1]*mag); o++;}else 
			if(p=="b") {o++; b=c.d[o]; o++; z=c.d[o]; this.bezierCurveTo(x+a[0]*mag*faw, y-a[1]*mag, x+b[0]*mag*faw, y-b[1]*mag, x+z[0]*mag*faw, y-z[1]*mag); o++;}else 
			if(p=="l") {this.lineTo(x+a[0]*mag*faw, y-a[1]*mag); o++; while(typeof(c.d[o])!="string" && o<c.d.length) {a=c.d[o]; this.lineTo(x+a[0]*mag*faw, y-a[1]*mag); o++;}}
		} this.stroke(); x+=((c.w*faw)*mag)+mx;
	} this.lineWidth=lw; this.miterLimit=ml; this.lineJoin=lj; this.lineCap=lc;
}
function set_textRenderContext(ctx) {if(typeof CanvasRenderingContext2D == 'undefined') {ctx.strokeText=do_drawText;}}
function check_textRenderContext(ctx) {if(typeof ctx.strokeText == 'function') {return true;}else {return false;}}
if(typeof CanvasRenderingContext2D != 'undefined') {CanvasRenderingContext2D.prototype.strokeText=do_drawText; }
var strokeFont = new Array();
strokeFont["sans-serif"] = {
	' ': {w:16,n:1,d:[]},
	'!': {w:10,n:4,d:['m',[5,21],'l',[5,7],'m',[5,2],'l',[4,1],[5,0],[6,1],[5,2]]},
	'"': {w:14,n:4,d:['m',[4,21],'l',[4,14],'m',[10,21],'l',[10,14]]},
	'#': {w:21,n:8,d:['m',[11,25],'l',[4,-7],'m',[17,25],'l',[10,-7],'m',[4,12],'l',[18,12],'m',[3,6],'l',[17,6]]},
	'$': {w:20,n:12,d:['m',[16,18],'q',[15,21],[10,21],'q',[5,21],[4,17],'q',[3,12],[7,11],'l',[13,10],'q',[18,9],[17,4],'q',[16,0],[10,0],'q',[4,0],[3,4],'m',[8,25],'l',[6,-4],'m',[14,25],'l',[12,-4]]},
	'%': {w:24,n:12,d:['m',[21,21],'l',[3,0],'m',[7,21],'q',[3,21],[3,17],'q',[3,13],[7,13],'q',[11,13],[11,17],'q',[11,21],[7,21],'m',[17,8],'q',[13,8],[13,4],'q',[13,0],[17,0],'q',[21,0],[21,4],'q',[21,8],[17,8]]},
	'&': {w:26,n:14,d:['m',[23,12],'q',[23,14],[22,14],'q',[20,14],[19,11],'l',[17,6],'q',[15,0],[9,0],'q',[3,0],[3,5],'q',[3,8],[7,10],'l',[12,13],'q',[14,15],[14,17],'q',[14,21],[11,21],'q',[8,21],[8,17],'q',[8,14],[12,8],'q',[17,0],[21,0],'q',[23,0],[23,2]]},
	'\'': {w:10,n:2,d:['m',[5,19],'l',[4,20],[5,21],[6,20],[6,18],[5,16],[4,15]]},
	'(': {w:14,n:3,d:['m',[11,25],'q',[4,19],[4,9],'q',[4,-1],[11,-7]]},
	')': {w:14,n:3,d:['m',[3,25],'q',[10,19],[10,9],'q',[10,-1],[3,-7]]},
	'*': {w:16,n:6,d:['m',[8,21],'l',[8,9],'m',[3,18],'l',[13,12],'m',[13,18],'l',[3,12]]},
	'+': {w:26,n:4,d:['m',[13,18],'l',[13,0],'m',[4,9],'l',[22,9]]},
	',': {w:10,n:2,d:['m',[6,1],'l',[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]]},
	'-': {w:26,n:2,d:['m',[4,9],'l',[22,9]]},
	'.': {w:10,n:2,d:['m',[5,2],'l',[4,1],[5,0],[6,1],[5,2]]},
	'/': {w:22,n:2,d:['m',[20,25],'l',[2,-7]]},
	'0': {w:20,n:7,d:['m',[10,21],'q',[3,21],[3,12],'l',[3,9],'q',[3,0],[10,0],'q',[17,0],[17,9],'l',[17,12],'q',[17,21],[10,21]]},
	'1': {w:20,n:3,d:['m',[6,17],'q',[8,18],[11,21],'l',[11,0]]},
	'2': {w:20,n:5,d:['m',[17,0],'l',[3,0],[13,10],'q',[16,13],[16,16],'q',[16,21],[10,21],'q',[4,21],[4,16]]},
	'3': {w:20,n:5,d:['m',[5,21],'l',[16,21],[10,14],'q',[17,14],[17,7],'q',[17,0],[10,0],'q',[5,0],[3,4]]},
	'4': {w:20,n:2,d:['m',[13,0],'l',[13,21],[3,7],[18,7]]},
	'5': {w:20,n:6,d:['m',[15,21],'l',[5,21],[4,12],'q',[5,14],[10,14],'q',[17,14],[17,7],'q',[17,0],[10,0],'q',[5,0],[3,4]]},
	'6': {w:20,n:8,d:['m',[16,18],'q',[15,21],[10,21],'q',[3,21],[3,12],'l',[3,7],'q',[3,0],[10,0],'q',[17,0],[17,7],'q',[17,13],[10,13],'q',[3,13],[3,7]]},
	'7': {w:20,n:2,d:['m',[3,21],'l',[17,21],[7,0]]},
	'8': {w:20,n:9,d:['m',[10,13],'q',[15,13],[15,17],'q',[15,21],[10,21],'q',[5,21],[5,17],'q',[5,13],[10,13],'q',[3,13],[3,7],'q',[3,0],[10,0],'q',[17,0],[17,7],'q',[17,13],[10,13]]},
	'9': {w:20,n:8,d:['m',[17,14],'q',[17,8],[10,8],'q',[3,8],[3,14],'q',[3,21],[10,21],'q',[17,21],[17,14],'l',[17,9],'q',[17,0],[10,0],'q',[5,0],[4,3]]},
	':': {w:10,n:4,d:['m',[5,14],'l',[4,13],[5,12],[6,13],[5,14],'m',[5,2],'l',[4,1],[5,0],[6,1],[5,2]]},
	';': {w:10,n:4,d:['m',[5,14],'l',[4,13],[5,12],[6,13],[5,14],'m',[6,1],'l',[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]]},
	'<': {w:24,n:2,d:['m',[20,18],'l',[4,9],[20,0]]},
	'=': {w:26,n:4,d:['m',[4,12],'l',[22,12],'m',[4,6],'l',[22,6]]},
	'>': {w:24,n:2,d:['m',[4,18],'l',[20,9],[4,0]]},
	'?': {w:18,n:8,d:['m',[3,16],'q',[3,21],[9,21],'q',[15,21],[15,16],'q',[15,11],[10,11],'q',[9,11],[9,10],'l',[9,7],'m',[9,2],'l',[8,1],[9,0],[10,1],[9,2]]},	
	'@': {w:27,n:17,d:['m',[21,3],'q',[20,1],[14,0],'l',[13,0],'q',[4,1],[3,10],'l',[3,11],'q',[4,20],[13,21],'l',[14,21],'q',[23,20],[24,11],'l',[24,10],'q',[24,6],[20,6],'q',[17,6],[18,10],'q',[18,6],[13,6],'q',[8,6],[9,11],'q',[10,15],[14,15],'q',[19,15],[18,10],'m',[18,10],'l',[19,14]]},
	'A': {w:18,n:6,d:['m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'B': {w:21,n:9,d:['m',[4,11],'l',[12,11],'m',[13,0],'l',[4,0],[4,21],[12,21],'q',[17,21],[17,16],'q',[17,11],[12,11],'q',[18,11],[18,6],'l',[18,5],'q',[18,0],[13,0]]},
	'C': {w:21,n:7,d:['m',[11,21],'q',[17,21],[18,16],'m',[18,5],'q',[17,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'D': {w:21,n:5,d:['m',[11,0],'l',[4,0],[4,21],[11,21],'q',[18,21],[18,12],'l',[18,9],'q',[18,0],[11,0]]},
	'E': {w:19,n:4,d:['m',[17,21],'l',[4,21],[4,0],[17,0],'m',[4,11],'l',[12,11]]},
	'F': {w:18,n:4,d:['m',[17,21],'l',[4,21],[4,0],'m',[4,11],'l',[12,11]]},
	'G': {w:21,n:8,d:['m',[11,21],'q',[17,21],[18,16],'m',[13,8],'l',[18,8],[18,5],'q',[17,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'H': {w:22,n:6,d:['m',[4,21],'l',[4,0],'m',[18,21],'l',[18,0],'m',[4,11],'l',[18,11]]},
	'I': {w:8,n:2,d:['m',[4,21],'l',[4,0]]},
	'J': {w:16,n:5,d:['m',[12,21],'l',[12,5],'q',[12,0],[7,0],'q',[2,0],[2,5],'l',[2,7]]},
	'K': {w:21,n:6,d:['m',[4,21],'l',[4,0],'m',[18,21],'l',[4,7],'m',[9,12],'l',[18,0]]},
	'L': {w:17,n:2,d:['m',[4,21],'l',[4,0],[16,0]]},
	'M': {w:24,n:2,d:['m',[4,0],'l',[4,21],[12,0],[20,21],[20,0]]},
	'N': {w:22,n:2,d:['m',[4,0],'l',[4,21],[18,0],[18,21]]},
	'O': {w:22,n:7,d:['m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'P': {w:21,n:6,d:['m',[4,10],'l',[13,10],'q',[18,10],[18,15],'l',[18,16],'q',[18,21],[13,21],'l',[4,21],[4,0]]},
	'Q': {w:22,n:9,d:['m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21],'m',[12,4],'l',[18,-2]]},
	'R': {w:21,n:8,d:['m',[4,10],'l',[13,10],'q',[18,10],[18,15],'l',[18,16],'q',[18,21],[13,21],'l',[4,21],[4,0],'m',[13,10],'l',[18,0]]},
	'S': {w:20,n:8,d:['m',[16,18],'q',[15,21],[10,21],'q',[5,21],[4,17],'q',[3,12],[7,11],'l',[13,10],'q',[18,9],[17,4],'q',[16,0],[10,0],'q',[4,0],[3,4]]},
	'T': {w:16,n:4,d:['m',[8,21],'l',[8,0],'m',[1,21],'l',[15,21]]},
	'U': {w:22,n:5,d:['m',[4,21],'l',[4,6],'q',[4,0],[11,0],'q',[18,0],[18,6],'l',[18,21]]},
	'V': {w:18,n:2,d:['m',[1,21],'l',[9,0],[17,21]]},
	'W': {w:24,n:2,d:['m',[2,21],'l',[7,0],[12,21],[17,0],[22,21]]},
	'X': {w:20,n:4,d:['m',[3,21],'l',[17,0],'m',[17,21],'l',[3,0]]},
	'Y': {w:18,n:4,d:['m',[1,21],'l',[9,11],[17,21],'m',[9,11],'l',[9,0]]},
	'Z': {w:20,n:2,d:['m',[3,21],'l',[17,21],[3,0],[17,0]]},
	'[': {w:14,n:2,d:['m',[11,25],'l',[4,25],[4,-7],[11,-7]]},
	'\\': {w:14,n:2,d:['m',[0,21],'l',[14,-3]]},
	']': {w:14,n:2,d:['m',[3,25],'l',[10,25],[10,-7],[3,-7]]},
	'^': {w:16,n:2,d:['m',[3,16],'l',[8,21],[13,16]]},
	'_': {w:16,n:2,d:['m',[0,-2],'l',[16,-2]]},
	'`': {w:10,n:2,d:['m',[6,21],'l',[5,20],[4,18],[4,16],[5,15],[6,16],[5,17]]},
	'a': {w:19,n:10,d:['m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'b': {w:19,n:10,d:['m',[4,21],'l',[4,0],'m',[10,14],'l',[9,14],'q',[6,14],[4,12],'m',[4,2],'q',[6,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'c': {w:18,n:10,d:['m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[15,11],'q',[14,14],[10,14]]},
	'd': {w:19,n:10,d:['m',[15,21],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'e': {w:18,n:8,d:['m',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[3,8],'l',[15,8],'q',[15,14],[9,14]]},
	'f': {w:12,n:5,d:['m',[10,21],'q',[5,21],[5,17],'l',[5,0],'m',[2,14],'l',[9,14]]},
	'g': {w:19,n:12,d:['m',[15,14],'l',[15,-2],'q',[15,-7],[10,-7],'q',[7,-7],[6,-6],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'h': {w:19,n:6,d:['m',[4,21],'l',[4,0],'m',[4,10],'q',[6,14],[11,14],'q',[15,14],[15,10],'l',[15,0]]},
	'i': {w: 8,n:4,d:['m',[3,21],'l',[4,20],[5,21],[4,22],[3,21],'m',[4,14],'l',[4,0]]},
	'j': {w:10,n:5,d:['m',[5,21],'l',[6,20],[7,21],[6,22],[5,21],'m',[6,14],'l',[6,-3],'q',[6,-8],[1,-7]]},
	'k': {w:17,n:6,d:['m',[4,21],'l',[4,0],'m',[14,14],'l',[4,4],'m',[8,8],'l',[15,0]]},
	'l': {w: 8,n:2,d:['m',[4,21],'l',[4,0]]},
	'm': {w:26,n:10,d:['m',[4,14],'l',[4,0],'m',[4,10],'q',[6,14],[10,14],'q',[13,14],[13,10],'l',[13,0],'m',[13,10],'q',[15,14],[19,14],'q',[22,14],[22,10],'l',[22,0]]},
	'n': {w:19,n:6,d:['m',[4,14],'l',[4,0],'m',[4,10],'q',[6,14],[11,14],'q',[15,14],[15,10],'l',[15,0]]},
	'o': {w:19,n:7,d:['m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'p': {w:19,n:10,d:['m',[4,14],'l',[4,-7],'m',[10,14],'l',[9,14],'q',[6,14],[4,12],'m',[4,2],'q',[6,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'q': {w:19,n:10,d:['m',[15,14],'l',[15,-7],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'r': {w:13,n:4,d:['m',[4,14],'l',[4,0],'m',[4,8],'q',[5,14],[12,14]]},
	's': {w:16,n:7,d:['m',[13,11],'q',[13,14],[8,14],'q',[3,14],[3,11],'q',[3,8],[8,7],'q',[13,6],[13,3],'q',[13,0],[8,0],'q',[3,0],[3,3]]},
	't': {w:12,n:5,d:['m',[5,21],'l',[5,4],'q',[5,-1],[10,0],'m',[2,14],'l',[9,14]]},
	'u': {w:19,n:6,d:['m',[4,14],'l',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'v': {w:16,n:2,d:['m',[2,14],'l',[8,0],[14,14]]},
	'w': {w:22,n:2,d:['m',[3,14],'l',[7,0],[11,14],[15,0],[19,14]]},
	'x': {w:17,n:4,d:['m',[3,14],'l',[14,0],'m',[14,14],'l',[3,0]]},
	'y': {w:16,n:5,d:['m',[2,14],'l',[8,0],'m',[14,14],'l',[8,0],'q',[5,-7],[1,-7]]},
	'z': {w:17,n:2,d:['m',[3,14],'l',[14,14],[3,0],[14,0]]},
	'{': {w:14,n:9,d:['m',[9,25],'q',[5,24],[5,20],'q',[5,17],[7,16],'q',[9,15],[8,12],'q',[7,9],[4,9],'q',[7,9],[8,6],'q',[9,3],[7,2],'q',[5,1],[5,-2],'q',[5,-6],[9,-7]]},
	'|': {w: 8,n:2,d:['m',[4,25],'l',[4,-7]]},
	'}': {w:14,n:9,d:['m',[5,25],'q',[9,24],[9,20],'q',[9,17],[7,16],'q',[5,15],[6,12],'q',[7,9],[10,9],'q',[7,9],[6,6],'q',[5,3],[7,2],'q',[9,1],[9,-2],'q',[9,-6],[5,-7]]},
	'~': {w:24,n:4,d:['m',[3,6],'q',[3,12],[10,10],'l',[14,8],'q',[21,4],[21,10]]},
	' ': {w:16,n:1,d:[]},
	'�': {w:10,n:4,d:['m',[5,10],'l',[5,-4],'m',[5,17],'l',[4,16],[5,15],[6,16],[5,17]]},
	'�': {w:18,n:14,d:['m',[9,14],'l',[9,18],'m',[9,0],'l',[9,-4],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[15,11],'q',[14,14],[10,14]]},
	'�': {w:18,n:8,d:['m',[4,11],'l',[13,11],'m',[16,18],'q',[15,21],[11,21],'q',[5,21],[6,16],'q',[7,8],[6,2],'q',[5,0],[4,0],'l',[16,0]]},
	'�': {w:19,n:13,d:['m',[15,3],'l',[17,1],'m',[15,13],'l',[17,15],'m',[5,3],'l',[3,1],'m',[5,13],'l',[3,15],'m',[10,14],'q',[4,14],[4,8],'q',[4,2],[10,2],'q',[16,2],[16,8],'q',[16,14],[10,14]]},
	'�': {w:18,n:8,d:['m',[4,7],'l',[14,7],'m',[4,11],'l',[14,11],'m',[1,21],'l',[9,11],[17,21],'m',[9,11],'l',[9,0]]},
	'�': {w: 8,n:4,d:['m',[4,25],'l',[4,12],'m',[4,6],'l',[4,-7]]},
	'�': {w:20,n:12,d:['m',[16,18],'q',[16,21],[10,21],'q',[4,21],[4,18],'q',[4,15],[10,14],'q',[16,13],[16,10],'q',[16,6],[10,7],'m',[10,14],'q',[4,15],[4,11],'q',[4,8],[10,7],'q',[16,6],[16,3],'q',[16,0],[10,0],'q',[4,0],[4,3]]},
	'�': {w:16,n:4,d:['m',[4,25],'l',[4,23],'m',[12,25],'l',[12,23]]},
	'�': {w:27,n:15,d:['m',[18,13],'q',[17,15],[14,15],'q',[9,15],[9,11],'l',[9,10],'q',[9,6],[14,6],'q',[17,6],[18,8],'m',[24,10],'q',[24,0],[14,0],'l',[13,0],'q',[3,0],[3,10],'l',[3,11],'q',[3,21],[13,21],'l',[14,21],'q',[24,21],[24,11],'l',[24,10]]},
	'�': {w:14,n:9,d:['m',[4,12],'l',[10,12],'m',[10,21],'l',[10,15],'m',[4,18],'q',[4,15],[7,15],'q',[10,15],[10,18],'q',[10,21],[7,21],'q',[4,21],[4,18]]},
	'�': {w:24,n:4,d:['m',[12,16],'l',[3,9],[12,2],'m',[21,16],'l',[12,9],[21,2]]},
	'�': {w:22,n:2,d:['m',[4,12],'l',[18,12],[18,8]]},
	'�': {w:22,n:2,d:['m',[4,9],'l',[18,9]]},
	'�': {w:27,n:17,d:['m',[9,6],'l',[9,15],[16,15],'m',[9,10],'l',[16,10],[18,6],'m',[16,10],'q',[18,10],[18,12],'l',[18,13],'q',[18,15],[16,15],'m',[24,10],'q',[24,0],[14,0],'l',[13,0],'q',[3,0],[3,10],'l',[3,11],'q',[3,21],[13,21],'l',[14,21],'q',[24,21],[24,11],'l',[24,10]]},
	'�': {w:16,n:2,d:['m',[0,24],'l',[16,24]]},
	'�': {w:10,n:5,d:['m',[3,23],'q',[3,21],[5,21],'q',[7,21],[7,23],'q',[7,25],[5,25],'q',[3,25],[3,23]]},
	'�': {w:22,n:6,d:['m',[11,18],'l',[11,6],'m',[4,12],'l',[18,12],'m',[4,2],'l',[18,2]]},
	'�': {w:14,n:6,d:['m',[10,11],'l',[4,11],'q',[4,15],[7,15],'q',[10,15],[10,18],'q',[10,21],[7,21],'q',[4,21],[4,18]]},
	'�': {w:14,n:5,d:['m',[4,14],'q',[4,11],[7,11],'q',[10,11],[10,14],'q',[10,17],[7,17],'l',[10,21],[4,21]]},
	'�': {w:19,n:2,d:['m',[9,18],'l',[12,20]]},
	'�': {w:19,n:7,d:['m',[4,14],'l',[4,-6],'m',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'�': {w:18,n:5,d:['m',[8,11],'q',[3,11],[3,16],'q',[3,21],[9,21],'m',[9,0],'l',[9,21],[15,21],[15,0]]},
	'�': {w:10,n:2,d:['m',[5,14],'l',[4,13],[5,12],[6,13],[5,14]]},
	'�': {w:18,n:2,d:['m',[10,0],'l',[10,-2],[7,-4]]},
	'�': {w:10,n:2,d:['m',[4,19],'l',[6,21],[6,11]]},
	'�': {w:14,n:7,d:['m',[4,12],'l',[10,12],'m',[4,18],'q',[4,15],[7,15],'q',[10,15],[10,18],'q',[10,21],[7,21],'q',[4,21],[4,18]]},
	'�': {w:24,n:4,d:['m',[3,16],'l',[12,9],[3,2],'m',[12,16],'l',[21,9],[12,2]]},
	'�': {w:24,n:6,d:['m',[4,19],'l',[6,21],[6,11],'m',[16,15],'l',[6,5],'m',[19,0],'l',[19,10],[14,4],[20,4]]},
	'�': {w:24,n:10,d:['m',[4,19],'l',[6,21],[6,11],'m',[16,15],'l',[6,5],'m',[20,0],'l',[14,0],'q',[14,4],[17,4],'q',[20,4],[20,7],'q',[20,10],[17,10],'q',[14,10],[14,7]]},
	'�': {w:24,n:10,d:['m',[4,14],'q',[4,11],[7,11],'q',[10,11],[10,14],'q',[10,17],[7,17],'l',[10,21],[4,21],'m',[18,15],'l',[8,5],'m',[19,0],'l',[19,10],[14,4],[20,4]]},
	'�': {w:18,n:7,d:['m',[9,21],'l',[8,20],[9,19],[10,20],[9,21],'m',[9,14],'l',[9,10],'q',[3,10],[3,5],'q',[3,0],[9,0],'q',[15,0],[15,5]]},	
	'�': {w:18,n:6,d:['m',[7,25],'l',[10,23],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:6,d:['m',[8,23],'l',[11,25],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:6,d:['m',[7,23],'l',[9,25],[11,23],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:6,d:['m',[6,23],'l',[8,25],[10,23],[12,25],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:10,d:['m',[5,25],'l',[5,23],'m',[13,25],'l',[13,23],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:10,d:['m',[7,23],'q',[7,21],[9,21],'q',[11,21],[11,23],'q',[11,25],[9,25],'q',[7,25],[7,23],'m',[1,0],'l',[9,21],[17,0],'m',[4,7],'l',[14,7]]},
	'�': {w:18,n:12,d:['m',[9,21],'l',[1,0],'m',[4,7],'l',[9,7],'m',[9,21],'l',[9,0],'m',[9,21],'l',[17,21],'m',[9,11],'l',[17,11],'m',[9,0],'l',[17,0]] },
	'�': {w:21,n:9,d:['m',[11,0],'l',[11,-2],[8,-4],'m',[11,21],'q',[17,21],[18,16],'m',[18,5],'q',[17,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:19,n:8,d:['m',[7,25],'l',[10,23],'m',[17,21],'l',[4,21],[4,0],[17,0],'m',[4,11],'l',[12,11]]},
	'�': {w:19,n:8,d:['m',[9,23],'l',[12,25],'m',[17,21],'l',[4,21],[4,0],[17,0],'m',[4,11],'l',[12,11]]},
	'�': {w:19,n:8,d:['m',[8,23],'l',[10,25],[12,23],'m',[17,21],'l',[4,21],[4,0],[17,0],'m',[4,11],'l',[12,11]]},
	'�': {w:19,n:10,d:['m',[6,25],'l',[6,23],'m',[15,25],'l',[15,23],'m',[17,21],'l',[4,21],[4,0],[17,0],'m',[4,11],'l',[12,11]]},
	'�': {w:8,n:4,d:['m',[3,25],'l',[6,23],'m',[4,21],'l',[4,0]]},
	'�': {w:8,n:4,d:['m',[2,23],'l',[5,25],'m',[4,21],'l',[4,0]]},
	'�': {w:8,n:4,d:['m',[2,23],'l',[4,25],[6,23],'m',[4,21],'l',[4,0]]},
	'�': {w:8,n:6,d:['m',[2,25],'l',[2,23],'m',[6,25],'l',[6,23],'m',[4,21],'l',[4,0]]},
	'�': {w:21,n:7,d:['m',[2,10],'l',[11,10],'m',[11,0],'l',[4,0],[4,21],[11,21],'q',[18,21],[18,12],'l',[18,9],'q',[18,0],[11,0]]},
	'�': {w:22,n:4,d:['m',[8,23],'l',[10,25],[12,23],[14,25],'m',[4,0],'l',[4,21],[18,0],[18,21]]},
	'�': {w:22,n:9,d:['m',[8,25],'l',[11,23],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:22,n:9,d:['m',[10,23],'l',[13,25],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:22,n:9,d:['m',[9,23],'l',[11,25],[13,23],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:22,n:9,d:['m',[8,23],'l',[10,25],[12,23],[14,25],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:22,n:13,d:['m',[6,25],'l',[6,23],'m',[16,25],'l',[16,23],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:12,n:4,d:['m',[2,16],'l',[10,6],'m',[10,16],'l',[2,6]]},
	'�': {w:22,n:9,d:['m',[3,1],'l',[19,20],'m',[11,21],'q',[19,21],[19,12],'l',[19,9],'q',[19,0],[11,0],'q',[3,0],[3,9],'l',[3,12],'q',[3,21],[11,21]]},
	'�': {w:22,n:7,d:['m',[8,25],'l',[11,23],'m',[4,21],'l',[4,6],'q',[4,0],[11,0],'q',[18,0],[18,6],'l',[18,21]]},
	'�': {w:22,n:7,d:['m',[10,23],'l',[13,25],'m',[4,21],'l',[4,6],'q',[4,0],[11,0],'q',[18,0],[18,6],'l',[18,21]]},
	'�': {w:22,n:7,d:['m',[9,23],'l',[11,25],[13,23],'m',[4,21],'l',[4,6],'q',[4,0],[11,0],'q',[18,0],[18,6],'l',[18,21]]},
	'�': {w:22,n:9,d:['m',[7,25],'l',[7,23],'m',[15,25],'l',[15,23],'m',[4,21],'l',[4,6],'q',[4,0],[11,0],'q',[18,0],[18,6],'l',[18,21]]},
	'�': {w:18,n:6,d:['m',[8,23],'l',[11,25],'m',[1,21],'l',[9,11],[9,0],'m',[17,21],'l',[9,11]]},
	'�': {w:19,n:7,d:['m',[4,18],'l',[4,-5],'m',[4,14],'l',[9,14],'q',[16,14],[16,7],'q',[16,0],[9,0],'l',[4,0]]},
	'�': {w:21,n:9,d:['m',[8,0],'l',[11,0],'q',[17,0],[17,5],'l',[17,6],'q',[17,10],[11,12],'q',[16,13],[16,16],'q',[16,21],[10,21],'q',[4,21],[4,16],'l',[4,0]]},
	'�': {w:19,n:12,d:['m',[7,20],'l',[10,18],'m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:19,n:12,d:['m',[9,18],'l',[12,20],'m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:19,n:12,d:['m',[7,18],'l',[9,20],[11,18],'m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:19,n:12,d:['m',[7,18],'l',[9,20],[11,18],[13,20],'m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:19,n:14,d:['m',[4,20],'l',[4,18],'m',[15,20],'l',[15,18],'m',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:19,n:15,d:['m',[7,18],'q',[7,16],[9,16],'q',[11,16],[11,18],'q',[11,20],[9,20],'q',[7,20],[7,18],  'm',[15,14],'l',[15,0],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[13,0],[15,2],'m',[15,12],'q',[13,14],[10,14]]},
	'�': {w:21,n:10,d:['m',[11,14],'l',[11,0],'m',[11,8],'l',[18,8],'q',[18,14],[12,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[13,0],'q',[17,0],[18,3]]},
	'�': {w:18,n:10,d:['m',[10,0],'l',[10,-2],[7,-4],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[15,11],'q',[14,14],[10,14]]},
	'�': {w:18,n:10,d:['m',[7,20],'l',[10,18],'m',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[3,8],'l',[15,8],'q',[15,14],[9,14]]},
	'�': {w:18,n:10,d:['m',[9,18],'l',[12,20],'m',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[3,8],'l',[15,8],'q',[15,14],[9,14]]},
	'�': {w:18,n:10,d:['m',[7,18],'l',[9,20],[11,18],'m',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[3,8],'l',[15,8],'q',[15,14],[9,14]]},
	'�': {w:18,n:12,d:['m',[4,20],'l',[4,18],'m',[15,20],'l',[15,18],'m',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[14,0],[15,3],'m',[3,8],'l',[15,8],'q',[15,14],[9,14]]},
	'�': {w:8,n:4,d:['m',[3,20],'l',[6,18],'m',[4,14],'l',[4,0]]},
	'�': {w:8,n:4,d:['m',[2,18],'l',[5,20],'m',[4,14],'l',[4,0]]},
	'�': {w:8,n:4,d:['m',[2,18],'l',[4,20],[6,18],'m',[4,14],'l',[4,0]]},
	'�': {w:8,n:6,d:['m',[2,20],'l',[2,18],'m',[6,20],'l',[6,18],'m',[4,14],'l',[4,0]]},
	'�': {w:19,n:12,d:['m',[8,17],'l',[10,21],'m',[7,20],'l',[11,18],'q',[16,16],[16,8],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:8,d:['m',[7,18],'l',[9,20],[11,18],[13,20],'m',[4,14],'l',[4,0],'m',[4,10],'q',[6,14],[11,14],'q',[15,14],[15,10],'l',[15,0]]},
	'�': {w:19,n:9,d:['m',[7,20],'l',[10,18],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:9,d:['m',[9,18],'l',[12,20],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:9,d:['m',[7,18],'l',[9,20],[11,18],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:9,d:['m',[7,18],'l',[9,20],[11,18],[13,20],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:11,d:['m',[4,20],'l',[4,18],'m',[15,20],'l',[15,18],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:18,n:6,d:['m',[9,15],'l',[9,14],'m',[4,9],'l',[14,9],'m',[9,4],'l',[9,3]]},
	'�': {w:19,n:9,d:['m',[3,1],'l',[15,14],'m',[10,14],'l',[9,14],'q',[3,14],[3,7],'q',[3,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:19,n:8,d:['m',[7,20],'l',[10,18],'m',[4,14],'l',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'�': {w:19,n:8,d:['m',[9,18],'l',[12,20],'m',[4,14],'l',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'�': {w:19,n:8,d:['m',[7,18],'l',[9,20],[11,18],'m',[4,14],'l',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'�': {w:19,n:10,d:['m',[4,20],'l',[4,18],'m',[15,20],'l',[15,18],'m',[4,14],'l',[4,4],'q',[4,0],[8,0],'q',[13,0],[15,4],'m',[15,14],'l',[15,0]]},
	'�': {w:16,n:7,d:['m',[7,18],'l',[10,20],'m',[2,14],'l',[8,0],'m',[14,14],'l',[8,0],'q',[5,-7],[1,-7]]},
	'�': {w:19,n:10,d:['m',[4,21],'l',[4,-7],'m',[10,14],'l',[9,14],'q',[6,14],[4,12],'m',[4,2],'q',[6,0],[9,0],'l',[10,0],'q',[16,0],[16,7],'q',[16,14],[10,14]]},
	'�': {w:16,n:9,d:['m',[2,20],'l',[2,18],'m',[14,20],'l',[14,18],'m',[2,14],'l',[8,0],'m',[14,14],'l',[8,0],'q',[5,-7],[1,-7]]}
};
