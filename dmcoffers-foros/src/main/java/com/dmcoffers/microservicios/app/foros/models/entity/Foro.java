package com.dmcoffers.microservicios.app.foros.models.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="for_post")

public class Foro {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

	//@Column(name = "id_user")
	//private Usuario usuario
	
	private String description;
	private Byte multimedia;
	private Date creationtimestamp;
	private Date modificatinotimestamp;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Byte getMultimedia() {
		return multimedia;
	}
	public void setMultimedia(Byte multimedia) {
		this.multimedia = multimedia;
	}
	public Date getCreationtimestamp() {
		return creationtimestamp;
	}
	public void setCreationtimestamp(Date creationtimestamp) {
		this.creationtimestamp = creationtimestamp;
	}
	public Date getModificatinotimestamp() {
		return modificatinotimestamp;
	}
	public void setModificatinotimestamp(Date modificatinotimestamp) {
		this.modificatinotimestamp = modificatinotimestamp;
	}
	
	
	
}
