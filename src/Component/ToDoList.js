import React, { Component } from 'react'
import UnDo from './UnDo'
import Done from './Done'
import '../css/ToDoList.css'
import storage from '../Storage/Storage'

export default class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {
          title:'',
          isChecked:false
        }
      ],
      countUndo:0,
      countDone:0,
    }
  }

  //回车事件
  handleKeyPress(e){
      if(e.charCode === 13){
        let list = {
            title:e.target.value.trim(),
            isChecked:false
        }
        console.log(list);
        let newlist =  this.state.list
        newlist.push(list);
        let countUndo;
        console.log(newlist);
        let Newlist = newlist.filter(item => item.title !== '')
        countUndo = Newlist.filter(item => item.isChecked === false).length
        this.setState({
            list:Newlist,
            countUndo,
        });
        e.target.value=""
        storage.setStorage("lists",this.state.list);
      }
      
  }

  //改变事件性质undo-done
  handleChangeList(index){
      let data=this.state.list;
      data[index].isChecked=!data[index].isChecked;
      console.log(data);
      let countUndo;
      let countDone;
      countUndo = data.filter(item => item.isChecked === false).length
      countDone = data.filter(item => item.isChecked === true).length
      this.setState({
        list:data,
        countUndo,
        countDone
      });
      storage.setStorage("lists",data);
  }

  //删除事件
  handleDeleteList(index){
    let data=this.state.list;
    data.splice(index,1); 
    let countUndo;
    let countDone;
    countUndo = data.filter(item => item.isChecked === false).length
    countDone = data.filter(item => item.isChecked === true).length
    this.setState({
        list:data,
        countUndo,
        countDone
    });
    storage.setStorage("lists",data);
  }
  
  //修改事件
  handleValue(index,e){
    console.log(e);
    let data = this.state.list;
    data[index].title = e.target.value;
    console.log(data);
    this.setState({
      list:data
    })
    storage.setStorage("lists",data);
  }

  render() {
    return (
      <div className="block">
        <div className="title">
          <div className="titleLeft"><h2>ToDoList</h2></div>
          <div className="titleRight">
            <input  type="text" onKeyPress={this.handleKeyPress.bind(this)}></input>
          </div>
        </div>
        <div>
          <span>未做的事情</span> <span>{this.state.countUndo}</span>       
          <UnDo list={this.state.list} 
            onChangeList={this.handleChangeList.bind(this)} 
            onDeleteList={this.handleDeleteList.bind(this)} 
            onChangeValue={this.handleValue.bind(this)}
            />
        </div>
        <div>
          <span>已完成的事情</span> <span>{this.state.countDone}</span>       
          <Done list={this.state.list}
          onChangeList={this.handleChangeList.bind(this)} 
          onDeleteList={this.handleDeleteList.bind(this)}
          onChangeValue={this.handleValue.bind(this)}
          />
        </div>
      </div>
    )
  }

  componentDidMount(){
    let data=storage.getStorage("lists");
    let countUndo;
    let countDone;
    if (data) {
      countUndo = data.filter(item => item.isChecked === false).length
      countDone = data.filter(item => item.isChecked === true).length
    }
    if(data){
        this.setState({
            list:data,
            countUndo,
            countDone
        });
    }
  }
}
