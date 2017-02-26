package com.ocaso.core;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;

public class Eraser {

	public static void borraObjeto(Session sessHbn, Integer ident, String classObj) throws Exception{
		
		String classDMI = "com.ocaso.DM.impl." + classObj + "DMImpl";
		
    	Class<?> cls = Class.forName(classDMI);
    	
    	HashMap<String, Object> fieldListValue = new HashMap<String, Object>();
    	fieldListValue.put("ident", ident);
    	
    	//se busca el objeto
		Method methodSearch = cls.getDeclaredMethod("get"+classObj+"ByCriteria",Class.forName("org.hibernate.Session"),fieldListValue.getClass());
		List listaObjetos=(List) methodSearch.invoke(null, sessHbn,fieldListValue);
    	
    	Object objeto=listaObjetos.get(0);
		
		//call the printIt method
		Method method = cls.getDeclaredMethod("delete"+classObj,Class.forName("org.hibernate.Session"),objeto.getClass());
		method.invoke(null, sessHbn,objeto);
	}
}
