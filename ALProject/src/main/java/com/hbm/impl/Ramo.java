package com.hbm.impl;

import java.util.HashMap;

public class Ramo {
	private Integer ident;
	private String nombre;
	
	public Ramo(){
		
	}

	public Ramo(Integer ident, String nombre) {
		super();
		this.ident = ident;
		this.nombre = nombre;
	}

	public Ramo(HashMap<String, Object> fieldList) {
		super();
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
