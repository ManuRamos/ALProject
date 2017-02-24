package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.CamposForm;

public class CamposFormDMImpl {

	public static List getCamposFormByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(CamposForm.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateCamposForm(Session sessHbn, HashMap<String, Object> fieldListValue, CamposForm camF) throws Exception{
    	Class cls = Class.forName("com.hbm.impl.CamposForm");
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){
        	String key=entry.getKey();
        	
        	String mapKey = key.substring(0, 1).toUpperCase() + key.substring(1);

    		//call the printIt method
    		Method method = cls.getDeclaredMethod("set"+key,entry.getValue().getClass());
    		method.invoke(camF, entry.getValue());
        }
        
        sessHbn.saveOrUpdate(camF);

	}

	public static void deleteCamposForm(Session sessHbn, CamposForm camF) {
		sessHbn.delete(camF);
	}
}
