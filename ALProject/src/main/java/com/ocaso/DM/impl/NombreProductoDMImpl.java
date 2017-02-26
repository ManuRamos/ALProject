package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.NombreProducto;

public class NombreProductoDMImpl {

	public static List getNombreProductoByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(NombreProducto.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){        		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateNombreProducto(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{
		
		NombreProducto NmP= new NombreProducto (fieldListValue);
        
        sessHbn.saveOrUpdate(NmP);

	}

	public static void deleteNombreProducto(Session sessHbn, NombreProducto NmP) {
		sessHbn.delete(NmP);
	}
}
