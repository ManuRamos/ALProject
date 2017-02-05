package com.ocaso.common;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.hibernate.Session;

import com.hbm.impl.Cliente;
import com.ocaso.utils.HibernateUtil;
//import oracle.jdbc.driver.OracleDriver;

public class AppMain {


    public static void main( String[] args )
    {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date parsed;
		try {

			//Class.forName("oracle.jdbc.driver.­OracleDriver");
			parsed = format.parse("20110210");
	        java.sql.Date date = new java.sql.Date(parsed.getTime());
    	
	        System.out.println("Maven + Hibernate + MySQL");
	        Session session = HibernateUtil.getSessionFactory().openSession();
	        System.out.println("Sesion establecida");
	
	        session.beginTransaction();
	        System.out.println("Transacción iniciada");
	        
	        Cliente cliente = new Cliente(1, "nombre", "apellido1", "apellido2", "09874562g", 'A',
	    			1, "String comentarioContacto", "String direccion", "06875", date, "localidad",
	    			1, 1, 0, 'M', "a@a.com", "String documento");
	        System.out.println("objeto creado");
	
	        session.save(cliente);
	        System.out.println("objeto salvado");
	        
	        session.getTransaction().commit();
	        System.out.println("Commit");
	        
	        HibernateUtil.shutdown();
	        System.out.println("sesion cerrada");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

}
