package com.ocaso.core;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;

import com.ocaso.DM.impl.CamposFormDMImpl;
import com.ocaso.DM.impl.FormularioDMImpl;

public class Lister {

	public static List listarObjetos(Session sessHbn, HashMap<String, Object> fieldListValue, String classObj) throws Exception{
		
		String classDMI = "com.ocaso.DM.impl." + classObj + "DMImpl";
		
    	Class<?> cls = Class.forName(classDMI);
    	
    	//se listan todos los objetos que cumplan con el criterio
		Method methodSearch = cls.getDeclaredMethod("get"+classObj+"ByCriteria",Class.forName("org.hibernate.Session"),fieldListValue.getClass());
		List listaObjetos=(List) methodSearch.invoke(null, sessHbn,fieldListValue);
		
		return listaObjetos;
	}	
	
	public static HashMap<String, List> listarObjetosYFormulario(Session sessHbn, HashMap<String, Object> fieldListValue, String classObj) throws Exception{

		HashMap<String, Object> listaBusqueda=new HashMap<String, Object>();
		
		String classDMI = "com.ocaso.DM.impl." + classObj + "DMImpl";
		
    	Class<?> cls = Class.forName(classDMI);
    	
    	//se listan todos los objetos que cumplan con el criterio
		Method methodSearch = cls.getDeclaredMethod("get"+classObj+"ByCriteria",Class.forName("org.hibernate.Session"),fieldListValue.getClass());
		List listaObjetos=(List) methodSearch.invoke(null, sessHbn,fieldListValue);
		
		listaBusqueda.put("clase", classObj);
		listaBusqueda.put("usuario", 1);//Meter usuario en Session

		List listaFormulario=CamposFormDMImpl.getCamposFormByCriteria(sessHbn, listaBusqueda);
		
		HashMap<String, List> mapaObjetoFormulario = new HashMap<String, List>();
		
		mapaObjetoFormulario.put("objeto", listaObjetos);
		mapaObjetoFormulario.put("formulario", listaFormulario);
		
		return mapaObjetoFormulario;
	}
}
