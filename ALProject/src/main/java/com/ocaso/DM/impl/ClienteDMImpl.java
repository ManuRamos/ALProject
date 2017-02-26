package com.ocaso.DM.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.hbm.impl.Cliente;

public class ClienteDMImpl {

	public static List getClienteByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(Cliente.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){
        	
        	if(entry.getValue() instanceof Date){
        		switch(entry.getKey()){
	        		case "fechaNacLE": criteria.add(Expression.le("fechaNac",entry.getValue()));break;
	        		case "fechaNacGE": criteria.add(Expression.ge("fechaNac",entry.getValue()));break;
	        		case "fechaNacLT": criteria.add(Expression.lt("fechaNac",entry.getValue()));break;
	        		case "fechaNacGT": criteria.add(Expression.gt("fechaNac",entry.getValue()));break;
        		}
        	}else{
        		
        		criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        	}
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateCliente(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{
    	
    	Cliente cl= new Cliente(fieldListValue);
        
        sessHbn.saveOrUpdate(cl);

	}

	public static void deleteCliente(Session sessHbn, Cliente cl) {
		sessHbn.delete(cl);
	}

}
