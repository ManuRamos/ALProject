package com.hbm.impl;

import java.util.HashMap;

public class NombreProducto {
	private Integer ident;
	private String nombre;
	
	public NombreProducto(){
		
	}
	
	public NombreProducto(Integer ident, String nombre) {
		super();
		this.ident = ident;
		this.nombre = nombre;
	}

	public NombreProducto(HashMap<String, Object> fieldList) {
		this.ident = (Integer) fieldList.get("ident");
		this.nombre = (String) fieldList.get("nombre");
	}


	public Integer getIdent() {
		return ident;
	}
	public void setIdent(Integer ident) {
		this.ident = ident;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
