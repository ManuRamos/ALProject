package com.hbm.impl;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map.Entry;

public class Usuario {
	private Integer ident;
	private String nombre;
	private String apellido1;
	private String apellido2;
	private String nick;
	private String pass;
	private String email;
	
	public Usuario(){
		
	}

	public Usuario(Integer ident, String nombre, String apellido1, String apellido2, String nick, String pass,
			String email) {
		super();
		this.ident = ident;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.nick = nick;
		this.pass = pass;
		this.email = email;
	}

	public Usuario(HashMap<String, Object> fieldList) {
		
		for(Entry<String, Object> entry : fieldList.entrySet()){
        	String key=entry.getKey();        	
        	String mapKey = key.substring(0, 1).toUpperCase() + key.substring(1);

    		Method method;
			try {
				method = this.getClass().getDeclaredMethod("set"+mapKey,entry.getValue().getClass());
	    		method.invoke(this, entry.getValue());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
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

	public String getApellido1() {
		return apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

	public String getApellido2() {
		return apellido2;
	}

	public void setApellido2(String apellido2) {
		this.apellido2 = apellido2;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
