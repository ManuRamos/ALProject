package com.ocaso.common;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.Cliente;
import com.ocaso.utils.HibernateUtil;

import com.ocaso.DM.impl.ClienteDMImpl;
//import oracle.jdbc.driver.OracleDriver;

public class AppMain {


    public static void main( String[] args )
    {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date parsed;
        Session session = HibernateUtil.getSessionFactory().openSession();
		try {

			//Class.forName("oracle.jdbc.driver.­OracleDriver");
			parsed = format.parse("20110209");
	        java.sql.Date date = new java.sql.Date(parsed.getTime());
    	
	        System.out.println("Maven + Hibernate + MySQL");
	        session = HibernateUtil.getSessionFactory().openSession();
	        System.out.println("Sesion establecida");
	
	        session.beginTransaction();
	        System.out.println("Transacción iniciada");
	        
	        HashMap<String, Object> fieldListValue = new HashMap<String, Object>();
	        
	        fieldListValue.put("fechaNacGE", date);
	        fieldListValue.put("comentarioContacto", "String comentarioContacto");
	        
	        List lista=ClienteDMImpl.getCllientesByCriteria(session, fieldListValue);
	        
	        HashMap<String, Object> fieldListValue2 = new HashMap<String, Object>();
	        
	        fieldListValue2.put("Nombre", "Nombre Nuevo16");
	        
	        ClienteDMImpl.updateCliente(session, fieldListValue2, (Cliente) lista.get(0));
	        
	        Cliente cliente = new Cliente(1, "nombre", "apellido1", "apellido2", "09874562g", 'A',
	    			1, "String comentarioContacto", "String direccion", "06875", date, "localidad",
	    			1, 1, 0, 'M', "a@a.com", "String documento");
	        System.out.println("objeto creado");
	
	        session.save(cliente);
	        System.out.println("objeto salvado");
	        
	        session.getTransaction().commit();
	        System.out.println("Commit");
	        session.beginTransaction();
	        
	        Criteria criteria = session.createCriteria(Cliente.class);
	        
	        //criteria.add(Expression.eq("ident",46));
	        criteria.add(Expression.eq("nombre", "Nombre Nuevo16"));
	        
	        List<Cliente> listCli=criteria.list();
	        
	        ClienteDMImpl.deleteCliente(session, listCli.get(0));
	        
	        System.out.println("Todo ok");
	        
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
	        session.getTransaction().commit();
	        System.out.println("Commit");
			HibernateUtil.shutdown();
	        System.out.println("sesion cerrada");
		}
    }

}
