package com.hbm.impl;

import java.util.HashMap;

public class Suplemento {
	private Integer ident;
	private Integer prod_pertenece;
	private char activo;
	private String descripcion;
	
	public Suplemento(){
		
	}

	public Suplemento(Integer ident, Integer prod_pertenece, char activo, String descripcion) {
		super();
		this.ident = ident;
		this.prod_pertenece = prod_pertenece;
		this.activo = activo;
		this.descripcion = descripcion;
	}

	public Suplemento(HashMap<String, Object> fieldList) {
		super();
		this.ident = (Integer) fieldList.get("ident");
		this.prod_pertenece = (Integer) fieldList.get("prod_pertenece");
		this.activo = (char) fieldList.get("activo");
		this.descripcion = (String) fieldList.get("descripcion");
	}

	public Integer getIdent() {
		return ident;
	}

	public void setIdent(Integer ident) {
		this.ident = ident;
	}

	public Integer getProd_pertenece() {
		return prod_pertenece;
	}

	public void setProd_pertenece(Integer prod_pertenece) {
		this.prod_pertenece = prod_pertenece;
	}

	public char getActivo() {
		return activo;
	}

	public void setActivo(char activo) {
		this.activo = activo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
}
