package com.ocaso.common;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Expression;

import com.hbm.impl.CamposForm;
import com.hbm.impl.Cliente;
import com.hbm.impl.Formulario;
import com.ocaso.utils.HibernateUtil;

import com.ocaso.DM.impl.ClienteDMImpl;
import com.ocaso.core.UpdateOrCreate;
//import oracle.jdbc.driver.OracleDriver;
import com.ocaso.core.Eraser;
import com.ocaso.core.Lister;

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
	        
	        List lista=Lister.listarObjetos(session, fieldListValue,"Cliente");
	        
	        HashMap<String, List> MapaObjForm=Lister.listarObjetosYFormulario(session, fieldListValue,"Cliente");
//	        
//	        HashMap<String, Object> fieldListValue2 = new HashMap<String, Object>();
//	        
//	        fieldListValue2.put("Nombre", "Nombre Nuevo0225");
//	        
//	        HashMap<String, Object> fieldListValue3 = new HashMap<String, Object>();
//	        
//	        fieldListValue3.put("nombre", "Nombre objeto 12.31");
//	        fieldListValue3.put("apellido1", "apellido1 12.31");
//	        fieldListValue3.put("apellido2", "apellido2 12.31");
//	        fieldListValue3.put("dni", "09874562g");
//	        fieldListValue3.put("clase", 'A');
//	        fieldListValue3.put("medioDeContacto", 1);
//	        fieldListValue3.put("comentarioContacto", "String comentarioContacto 12.31");
//	        fieldListValue3.put("direccion", "String direccion 12.31");
//	        fieldListValue3.put("cp", "06875");
//	        fieldListValue3.put("fechaNac", date);
//	        fieldListValue3.put("localidad", "localidad 12.31");
//	        fieldListValue3.put("estadoCivil", 1);
//	        fieldListValue3.put("provincia", 2);
//	        fieldListValue3.put("conyuge", 2);
//	        fieldListValue3.put("conyuge", 1);
//	        fieldListValue3.put("sexo", 'M');
//	        fieldListValue3.put("email", "a@a.com");
//	        fieldListValue3.put("documento", "String documento");	        
//
//	        UpdateOrCreate.manageObjeto(session, fieldListValue3, "Cliente");
//	        System.out.println("objeto salvado");
	        
	        Formulario formul = new Formulario(2,"Form2",1);
	        
	        session.save(formul);
	        
	        
	        Criteria criteria = session.createCriteria(Formulario.class);
	        
	        criteria.add(Expression.eq("ident",1));
	        //criteria.add(Expression.eq("nombre", "Nombre Nuevo16"));
	        
	        List listCli=criteria.list();
	        
	        session.getTransaction().commit();
	        System.out.println("Commit");
	        session.beginTransaction();
	        
	        
	        
	        HashMap<String, Object> fieldListValueEra = new HashMap<String, Object>();
	        
	        fieldListValueEra.put("ident", 46);
	        
	        Cliente cl = new Cliente(fieldListValueEra);
	        
	        Eraser.borraObjeto(session, 46, "Cliente");
	        
//	        ClienteDMImpl.deleteCliente(session, listCli.get(0));
	        
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
    
//    private void ponAlgoEnSesion(HttpServletRequest request, HttpServletResponse response) {
//
//        HttpSession session = HttpServletRequest.getSession();
//        String username = (String)request.getAttribute("un");
//        session.setAttribute("UserName", username);
//    }

}
