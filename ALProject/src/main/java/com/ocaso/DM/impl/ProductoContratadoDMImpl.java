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

public class ProductoContratadoDMImpl {

	public static List getProductoContratadoByCriteria(Session sessHbn, HashMap<String, Object> fieldListValue) {
		Criteria criteria = sessHbn.createCriteria(ProductoContratado.class);
        
        for(Entry<String, Object> entry : fieldListValue.entrySet()){
        	
        	if(entry.getValue() instanceof Date){
        		switch(entry.getKey()){
	        		case "fechaAltaLE": criteria.add(Expression.le("fechaAlta",entry.getValue()));break;
	        		case "fechaAltaGE": criteria.add(Expression.ge("fechaAlta",entry.getValue()));break;
	        		case "fechaAltaLT": criteria.add(Expression.lt("fechaAlta",entry.getValue()));break;
	        		case "fechaAltaGT": criteria.add(Expression.gt("fechaAlta",entry.getValue()));break;
	        		
	        		case "fechaBajaLE": criteria.add(Expression.le("fechaBaja",entry.getValue()));break;
	        		case "fechaBajaGE": criteria.add(Expression.ge("fechaBaja",entry.getValue()));break;
	        		case "fechaBajaLT": criteria.add(Expression.lt("fechaBaja",entry.getValue()));break;
	        		case "fechaBajaGT": criteria.add(Expression.gt("fechaBaja",entry.getValue()));break;
        		}
        	}else{
        		
        		criteria.add(Expression.eq(entry.getKey(),entry.getValue()));
        	}
        }
        
        List listado= criteria.list();
		
        return listado;
	}

	public static void saveOrUpdateProductoContratado(Session sessHbn, HashMap<String, Object> fieldListValue) throws Exception{

		ProductoContratado prodCont= new ProductoContratado(fieldListValue);
        
        sessHbn.saveOrUpdate(prodCont);

	}

	public static void deleteProductoContratado(Session sessHbn, ProductoContratado prodCont) {
		sessHbn.delete(prodCont);
	}

}
