import React,{Component} from 'react'
import './App.css';
import db from './db.json'

//const data = JSON.parse(JSON.stringify(db))
const data = db.atletas

export default class Tabela extends Component{  
 

  
  renderTable(){
    
      return(
        <table className='table mt-4'>
          <thead>{this.getKey(data)}</thead>
          <tbody>{this.getRows(data)}</tbody>
        </table>
      )
        
    }

  getKey(data){
    return Object.keys(data[0]).map(key =>{
      return <th>{key}</th>
    })
  }
  getRows(data){
    return data.map(obj =>{
      return <tr>{this.getCells(obj)}</tr>
    })
  }
  getCells(obj){
    return Object.values(obj).map(value =>{
      return <td>{value}</td>
    })
  }
  render(){
    return (
       this.renderTable()
 
     
    )
  }
  
  
}


