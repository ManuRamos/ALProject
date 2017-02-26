package com.ocaso.DM.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.TipoCampo;

public class TipoContactoDMImpl {

	public static List getTipoCampoByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(TipoCampo.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){ 		
        	criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateTipoCampo(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{
        
		TipoCampo tipoCampo=new TipoCampo();
		
        sessHbn.saveOrUpdate(tipoCampo);

	}

	public static void deleteTipoCampoContratado(Session sessHbn, TipoCampo tipoCampo) {
		sessHbn.delete(tipoCampo);
	}
}
