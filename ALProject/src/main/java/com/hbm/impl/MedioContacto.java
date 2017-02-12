package com.hbm.impl;

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
