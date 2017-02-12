package com.hbm.impl;

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
