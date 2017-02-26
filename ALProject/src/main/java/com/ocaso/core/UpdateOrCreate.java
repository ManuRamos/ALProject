package com.ocaso.core;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;


public class UpdateOrCreate {

	public static void manageObjeto(Session sessHbn, HashMap<String, Object> fieldListValue, String classObj) throws Exception{
		String classDMI = "com.ocaso.DM.impl." + classObj + "DMImpl";
		
    	Class<?> cls = Class.forName(classDMI);
    	
		//call the method
		Method method = cls.getDeclaredMethod("saveOrUpdate"+classObj,Class.forName("org.hibernate.Session"),fieldListValue.getClass());
		method.invoke(null, sessHbn,fieldListValue);
	}	
}
