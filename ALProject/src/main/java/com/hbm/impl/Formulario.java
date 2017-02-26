package com.hbm.impl;

import java.util.HashMap;

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

	public Formulario(HashMap<String, Object> fieldList) {
		super();
		this.ident = (Integer) fieldList.get("ident");
		this.nombre = (String) fieldList.get("nombre");
		this.usuario = (Integer) fieldList.get("usuario");
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
