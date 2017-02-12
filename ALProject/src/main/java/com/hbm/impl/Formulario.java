package com.hbm.impl;

public class Formulario {
	private Integer ident;
	private String nombre;
	private Integer usuario;
	
	public Formulario(){
		
	}

	public Formulario(Integer ident, String nombre, Integer usuario) {
		super();
		this.ident = ident;
		this.nombre = nombre;
		this.usuario = usuario;
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

	public Integer getUsuario() {
		return usuario;
	}

	public void setUsuario(Integer usuario) {
		this.usuario = usuario;
	}
	
}
