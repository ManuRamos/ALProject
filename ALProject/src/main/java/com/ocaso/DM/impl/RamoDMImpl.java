package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.Ramo;

public class RamoDMImpl {

	public static List getRamoByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(Ramo.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){ 		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateRamo(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{

		Ramo ramo= new Ramo(fieldListValue);
		
        sessHbn.saveOrUpdate(ramo);

	}

	public static void deleteRamoContratado(Session sessHbn, Ramo ramo) {
		sessHbn.delete(ramo);
	}
}
