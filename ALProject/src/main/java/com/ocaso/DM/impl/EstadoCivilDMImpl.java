package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.EstadoCivil;

public class EstadoCivilDMImpl {

	public static List getEstadoCivilByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(EstadoCivil.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){        		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}
	
	public static void saveOrUpdateEstadoCivil(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{

    	EstadoCivil Ecv =new EstadoCivil(fieldListValue);
        
        sessHbn.saveOrUpdate(Ecv);

	}

	public static void deleteEstadoCivil(Session sessHbn, EstadoCivil Ecv) {
		sessHbn.delete(Ecv);
	}

}
