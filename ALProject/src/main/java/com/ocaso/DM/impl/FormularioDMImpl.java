package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.ProductoContratado;

public class FormularioDMImpl {

	public static List getFormularioByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(ProductoContratado.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){ 		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateFormularioContratado(Session sessHbn, HashMap<String, Object> fieldListValue, ProductoContratado prodCont) throws Exception{
    	Class cls = Class.forName("com.hbm.impl.Formulario");
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){
        	String key=entry.getKey();
        	
        	String mapKey = key.substring(0, 1).toUpperCase() + key.substring(1);

    		//call the printIt method
    		Method method = cls.getDeclaredMethod("set"+key,entry.getValue().getClass());
    		method.invoke(prodCont, entry.getValue());
        }
        
        sessHbn.saveOrUpdate(prodCont);

	}

	public static void deleteFormularioContratado(Session sessHbn, ProductoContratado prodCont) {
		sessHbn.delete(prodCont);
	}
}
