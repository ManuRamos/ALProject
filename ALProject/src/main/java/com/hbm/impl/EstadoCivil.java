package com.hbm.impl;

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
