package com.hbm.impl;

import java.sql.Date;

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
		Ramo = ramo;
		this.nombreProducto = nombreProducto;
		Estado = estado;
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
