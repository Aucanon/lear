import React, { Component } from 'react'
import StudentList from './components/StudentList'
import StudentTitle from './components/StudentTitle'
import AddStudent from './components/AddStudent'

class App extends Component {

  state = {
    studentList: [{
      "number": "01",
      "name": "张三",
      "sex": "男",
      "age": 10,
      "date": "2020-12-04",
      "hobbies": ["足球", "篮球"],
      "college": "大前端"
  }, {
      "number": "02",
      "name": "李四",
      "sex": "男",
      "age": 20,
      "date": "2030-12-05",
      "hobbies": ["足球", "羽毛球"],
      "college": "Java"
  }, {
      "number": "03",
      "name": "王五",
      "sex": "男",
      "age": 30,
      "date": "2040-11-03",
      "hobbies": ["足球", "羽毛球", "篮球"],
      "college": "python"
  }]
  }
  addStudent = (student, callback) => {
    this.setState({
      studentList: [...this.state.studentList, student]
    }, () => {
      callback()
      console.log(this.state.studentList);
    })
  }

  removeStudent = (number) => {
    const studentList = JSON.parse(JSON.stringify(this.state.studentList))
      const index = studentList.findIndex(student => student.number === number)
      studentList.splice(index, 1)
      this.setState({
        studentList
      }, () => {
        console.log(this.state.studentList);
      })
  }

  render() {
    return (
       <div  className={'container'}>
        <StudentTitle/>
        <AddStudent addStudent={this.addStudent}/>
        <StudentList studentList={this.state.studentList} removeStudent={this.removeStudent}/>
       </div>
    )
  }
}


export default App
