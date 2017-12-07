package com.suolu.pojo;
/**
 * 封装easyui-tree的数据模型
 * 参照EasyUi-Tree节点参数来完成模型封装
 * @author caleb
 *
 */
public class TreeNodeResult {
	private Integer id;//树的id
	private String text;//显示的文本内容
	private String state;//显示在页面上的状态，Open Or Close
	private Integer parentId;//父节点ID
	public TreeNodeResult(){}
	public TreeNodeResult(Integer id, String text, String state, Integer parentId) {
		this.id = id;
		this.text = text;
		this.state = state;
		this.parentId = parentId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	
}
