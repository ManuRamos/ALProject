package com.hbm.impl;

public class CamposForm {
	private Integer ident;
	private String nombreCampo;
	private String rotulo;
	private Integer tipo;
	private Integer longitud;
	private Integer usuario;
	private char visible_res;
	private char visible_fil;
	private Integer orden;
	private Integer cod_formulario;
	
	public CamposForm(){
		
	}

	public CamposForm(Integer ident, String nombreCampo, String rotulo, Integer tipo, Integer longitud, Integer usuario,
			char visible_res, char visible_fil, Integer orden, Integer cod_formulario) {
		super();
		this.ident = ident;
		this.nombreCampo = nombreCampo;
		this.rotulo = rotulo;
		this.tipo = tipo;
		this.longitud = longitud;
		this.usuario = usuario;
		this.visible_res = visible_res;
		this.visible_fil = visible_fil;
		this.orden = orden;
		this.cod_formulario = cod_formulario;
	}

	public Integer getIdent() {
		return ident;
	}

	public void setIdent(Integer ident) {
		this.ident = ident;
	}

	public String getNombreCampo() {
		return nombreCampo;
	}

	public void setNombreCampo(String nombreCampo) {
		this.nombreCampo = nombreCampo;
	}

	public String getRotulo() {
		return rotulo;
	}

	public void setRotulo(String rotulo) {
		this.rotulo = rotulo;
	}

	public Integer getTipo() {
		return tipo;
	}

	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}

	public Integer getLongitud() {
		return longitud;
	}

	public void setLongitud(Integer longitud) {
		this.longitud = longitud;
	}

	public Integer getUsuario() {
		return usuario;
	}

	public void setUsuario(Integer usuario) {
		this.usuario = usuario;
	}

	public char getVisible_res() {
		return visible_res;
	}

	public void setVisible_res(char visible_res) {
		this.visible_res = visible_res;
	}

	public char getVisible_fil() {
		return visible_fil;
	}

	public void setVisible_fil(char visible_fil) {
		this.visible_fil = visible_fil;
	}

	public Integer getOrden() {
		return orden;
	}

	public void setOrden(Integer orden) {
		this.orden = orden;
	}

	public Integer getCod_formulario() {
		return cod_formulario;
	}

	public void setCod_formulario(Integer cod_formulario) {
		this.cod_formulario = cod_formulario;
	}
	
}
