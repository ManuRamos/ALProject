package com.hbm.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map.Entry;

public class EstadoCivil {
	private Integer ident;
	private String descripcion;
	
	public EstadoCivil(){
		
	}

	public EstadoCivil(Integer ident, String descripcion) {
		super();
		this.ident = ident;
		this.descripcion = descripcion;
	}

	public EstadoCivil(HashMap<String, Object> fieldList) {
		super();
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