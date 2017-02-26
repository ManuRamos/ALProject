package com.hbm.impl;

import java.lang.reflect.Method;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map.Entry;

public class ProductoContratado {
	private Integer numPoliza;
	private Integer cliente;
	private Date fechaAlta;
	private Date fechaBaja;
	private Integer Ramo;
	private Integer nombreProducto;
	private Integer Estado;
	
	public ProductoContratado(){
		
	}
	public ProductoContratado(Integer numPoliza, Integer cliente, Date fechaAlta, Date fechaBaja, Integer ramo,
			Integer nombreProducto, Integer estado) {
		super();
		this.numPoliza = numPoliza;
		this.cliente = cliente;
		this.fechaAlta = fechaAlta;
		this.fechaBaja = fechaBaja;
		this.Ramo = ramo;
		this.nombreProducto = nombreProducto;
		this.Estado = estado;
	}

	public ProductoContratado(HashMap<String, Object> fieldList) {
		
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
	
	public Integer getNumPoliza() {
		return numPoliza;
	}
	public void setNumPoliza(Integer numPoliza) {
		this.numPoliza = numPoliza;
	}
	public Integer getCliente() {
		return cliente;
	}
	public void setCliente(Integer cliente) {
		this.cliente = cliente;
	}
	public Date getFechaAlta() {
		return fechaAlta;
	}
	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}
	public Date getFechaBaja() {
		return fechaBaja;
	}
	public void setFechaBaja(Date fechaBaja) {
		this.fechaBaja = fechaBaja;
	}
	public Integer getRamo() {
		return Ramo;
	}
	public void setRamo(Integer ramo) {
		Ramo = ramo;
	}
	public Integer getNombreProducto() {
		return nombreProducto;
	}
	public void setNombreProducto(Integer nombreProducto) {
		this.nombreProducto = nombreProducto;
	}
	public Integer getEstado() {
		return Estado;
	}
	public void setEstado(Integer estado) {
		Estado = estado;
	}
}
