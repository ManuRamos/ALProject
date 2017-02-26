package com.hbm.impl;

import java.lang.reflect.Method;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map.Entry;

public class Cliente {

	private Integer ident;
	private String nombre;
	private String apellido1;
	private String apellido2;
	private String dni;
	private char clase;
	private Integer medioDeContacto;
	private String comentarioContacto;
	private String direccion;	
	private String cp;
	private Date fechaNac;
	private String localidad;
	private Integer provincia;
	private Integer estadoCivil;
	private Integer conyuge;
	private char sexo;
	private String email;
	private String documento;
	
	public Cliente(){
		
	}
	
	public Cliente(HashMap<String, Object> fieldList){
		
		for(Entry<String, Object> entry : fieldList.entrySet()){
        	String key=entry.getKey(); 
        	
        	if(key.equals("sexo")){
        		this.setSexo((char)entry.getValue());
        	}else if(key.equals("clase")){
        		this.setClase((char)entry.getValue());
        	}else{			
	        	
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
	}
	
	public Cliente(Integer ident, String nombre, String apellido1, String apellido2, String dni, char clase,
			Integer medioDeContacto, String comentarioContacto, String direccion, String cp, Date fechaNac, String localidad,
			Integer provincia, Integer estadoCivil, Integer conyuge, char sexo, String email, String documento) {
		super();
		this.ident = ident;
		this.nombre = nombre;
		this.apellido1 = apellido1;
		this.apellido2 = apellido2;
		this.dni = dni;
		this.clase = clase;
		this.medioDeContacto = medioDeContacto;
		this.comentarioContacto = comentarioContacto;
		this.direccion = direccion;
		this.cp = cp;
		this.fechaNac = fechaNac;
		this.localidad = localidad;
		this.provincia = provincia;
		this.estadoCivil = estadoCivil;
		this.conyuge = conyuge;
		this.sexo = sexo;
		this.email = email;
		this.documento = documento;
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
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	public char getClase() {
		return clase;
	}
	public void setClase(char clase) {
		this.clase = clase;
	}
	public Integer getMedioDeContacto() {
		return medioDeContacto;
	}
	public void setMedioDeContacto(Integer medioDeContacto) {
		this.medioDeContacto = medioDeContacto;
	}
	public String getComentarioContacto() {
		return comentarioContacto;
	}
	public void setComentarioContacto(String comentarioContacto) {
		this.comentarioContacto = comentarioContacto;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getCp() {
		return cp;
	}
	public void setCp(String cp) {
		this.cp = cp;
	}
	public Date getFechaNac() {
		return fechaNac;
	}
	public void setFechaNac(Date fechaNac) {
		this.fechaNac = fechaNac;
	}
	
	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}
	public Integer getProvincia() {
		return provincia;
	}
	public void setProvincia(Integer provincia) {
		this.provincia = provincia;
	}
	public Integer getEstadoCivil() {
		return estadoCivil;
	}
	public void setEstadoCivil(Integer estadoCivil) {
		this.estadoCivil = estadoCivil;
	}
	public Integer getConyuge() {
		return conyuge;
	}
	public void setConyuge(Integer conyuge) {
		this.conyuge = conyuge;
	}
	public char getSexo() {
		return sexo;
	}
	public void setSexo(char sexo) {
		this.sexo = sexo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
}
