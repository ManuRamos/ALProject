package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.MedioContacto;

public class MedioContactoDMImpl {

	public static List getMedioContactoByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(MedioContacto.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){        		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateMedioContacto(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{
        
    	MedioContacto MdC= new MedioContacto(fieldListValue);
        
        sessHbn.saveOrUpdate(MdC);

	}

	public static void deleteMedioContacto(Session sessHbn, MedioContacto MdC) {
		sessHbn.delete(MdC);
	}
}
