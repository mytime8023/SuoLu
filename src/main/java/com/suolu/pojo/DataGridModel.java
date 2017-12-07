package com.suolu.pojo;

import java.util.List;

public class DataGridModel {

	private int feilei_id;
	private String feilei_name;
	private int fu_id;
	private List<DataGridModel> dataGridModelList;
	
	
	public int getFeilei_id() {
		return feilei_id;
	}
	public void setFeilei_id(int feilei_id) {
		this.feilei_id = feilei_id;
	}
	public String getFeilei_name() {
		return feilei_name;
	}
	public void setFeilei_name(String feilei_name) {
		this.feilei_name = feilei_name;
	}
	public int getFu_id() {
		return fu_id;
	}
	public void setFu_id(int fu_id) {
		this.fu_id = fu_id;
	}
	public List<DataGridModel> getDataGridModelList() {
		return dataGridModelList;
	}
	public void setDataGridModelList(List<DataGridModel> dataGridModelList) {
		this.dataGridModelList = dataGridModelList;
	}
}
