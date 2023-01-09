import React from 'react';
import './App.css';

const ipAddress = "http://127.0.0.1:5000"

class App extends React.Component {
  state = {
    students: [],
    name: "",
    major: "",
    deleteName: "",
  }

  public constructor(props: any) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMajorChange = this.handleMajorChange.bind(this);
    this.handleNameDeleteChange = this.handleNameDeleteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  public async getStudents(): Promise<any> {
    const response = await fetch(ipAddress + "/get-students")

    if (!response.ok) {
      return;
    }

    return await response.json();
  }

  public async addStudent(): Promise<any> {
    const response = await fetch(ipAddress + "/add-student?"
    + new URLSearchParams({
      "name": this.state.name,
      "grade": "0",
      "major": this.state.major
    }).toString())

    if (!response.ok) {
      return;
    }
    
    this.getStudents().then(
      (value) => {
        this.setState({ students: value.students })
      }
    )

    return await response.json();
  }

  public async removeStudent(name: string): Promise<any> {
    const response = await fetch(ipAddress + "/remove-student-by-name/" + name)

    if (!response.ok) {
      return;
    }
    
    this.getStudents().then(
      (value) => {
        this.setState({ students: value.students })
      }
    )

    return await response.json();
  }
  
  public componentDidMount(): void {
    this.getStudents().then(
      (value) => {
        this.setState({ students: value.students })
      }
    )
  }
  
  public handleNameChange(event: any) {
    this.setState({name: event.target.value});
  }
  
  public handleNameDeleteChange(event: any) {
    console.log(this.state.deleteName)
    this.setState({deleteName: event.target.value});
  }
  
  public handleMajorChange(event: any) {
    this.setState({major: event.target.value});
  }

  public handleSubmit(event: any) {
    this.addStudent().then(
      () => {
        this.setState({"name": "", "major": ""})
      }
    )
    event.preventDefault();
  }

  public handleDelete(event: any) {
    console.log(this.state.deleteName)
    this.removeStudent(this.state.deleteName).then(
      () => {
        this.setState({deleteName: ""})
      }
    )
    event.preventDefault();
  }

  public render() {
    return (
      <div className="App">
        <h1>Add Students</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">name</label> <input type="text" id="name" onChange={this.handleNameChange}/>
          <br/>
          <label htmlFor="major">major</label> <input type="text" id="major" onChange={this.handleMajorChange}/>
          <br/>
          <input type="submit"/>
        </form>
        
        <h1>Remove Students</h1>
          <form onSubmit={this.handleDelete}>
            <label htmlFor="name">name</label> <input type="text" id="name" onChange={this.handleNameDeleteChange}/>
            <br/>
            <input type="submit"/>
          </form>

        <h1>View Students</h1>
        <ul>
          {this.state.students.map((data, key) => {
              return (
                <li><p>{data["name"]} ({data["major"]})</p></li>
              );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
