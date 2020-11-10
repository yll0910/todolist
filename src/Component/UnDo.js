import React, { Component } from 'react'

export default class UnDo extends Component {
  changeBox(index){
    this.props.onChangeList(index)
  }
  deleteData(index){
    this.props.onDeleteList(index)
  }
  changeValue(index,e){
    this.props.onChangeValue(index,e)
  }
  render() {
    return (
      <div>
        {
          this.props.list.map((item,index) =>{
            if (!item.isChecked && item.title !== '') {
              return (
                <div key={index}>
                    <li>
                      <input type="checkbox" checked={item.isChecked} onChange={() =>this.changeBox(index)}/>
                      <input type="text" value={item.title} onChange={(e) => this.changeValue(index,e)}/>
                      <button onClick={() =>this.deleteData(index)}>删除</button>
                    </li>
                </div>
              )
            }
            return ""
          })
        }
      </div>
    )
  }
}
