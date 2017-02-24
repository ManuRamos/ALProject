package com.hbm.impl;

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
