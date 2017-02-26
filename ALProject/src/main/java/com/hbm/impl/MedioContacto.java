package com.hbm.impl;

import java.util.HashMap;

public class MedioContacto {
	
	private Integer ident;
	private String descripcion;
	
	public MedioContacto(){
		
	}

	public MedioContacto(Integer ident, String descripcion) {
		super();
		this.ident = ident;
		this.descripcion = descripcion;
	}

	public MedioContacto(HashMap<String, Object> fieldList) {
		this.ident = (Integer) fieldList.get("ident");
		this.descripcion = (String) fieldList.get("descripcion");
	}

	public Integer getIdent() {
		return ident;
	}

	public void setIdent(Integer ident) {
		this.ident = ident;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
