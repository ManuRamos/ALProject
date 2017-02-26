package com.ocaso.action;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hbm.impl.Cliente;
import com.ocaso.utils.HibernateUtil;

import org.hibernate.Session;
import org.springframework.web.servlet.ModelAndView;

public class OcasoActions {
	
	public ModelAndView almacenar(HttpServletRequest request, HttpServletResponse response){
		

		ModelAndView vista=new ModelAndView();
		vista.setViewName("index");
		
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date parsed;
		try {

			//Class.forName("oracle.jdbc.driver.­OracleDriver");
//			parsed = format.parse("20110210");
//	        java.sql.Date date = new java.sql.Date(parsed.getTime());
//    	
//	        System.out.println("Maven + Hibernate + MySQL");
//	        Session session = HibernateUtil.getSessionFactory().openSession();
//	        System.out.println("Sesion establecida");
//	
//	        session.beginTransaction();
//	        System.out.println("Transacción iniciada");
//	        
//	        Cliente cliente = new Cliente(1, "nombre4", "apellido14", "apellido24", "09874564g", 'A',
//	    			1, "String comentarioContacto4", "String direccion4", "06875", date, "localidad",
//	    			1, 1, 0, 'M', "a@a.com", "String documento");
//	        System.out.println("objeto creado");
//	
//	        session.save(cliente);
//	        System.out.println("objeto salvado");
//	        
//	        session.getTransaction().commit();
//	        System.out.println("Commit");
//	        
//	        HibernateUtil.shutdown();
//	        System.out.println("sesion cerrada");

			vista.addObject("message", "Todo perfecto!");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			vista.addObject("message", "Se ha producido un error!");
		}
		
		return null;
	}
}
