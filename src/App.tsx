import React from 'react';
import './App.css';

const ipAddress = "http://127.0.0.1:5000"

class App extends React.Component {
  state = {
    students: [],
  }

  public async getUsers(): Promise<any> {
    const response = await fetch(ipAddress)

    if (!response.ok) {
      return;
    }

    return await response.json();
  }
  
  public componentDidMount(): void {
    this.getUsers().then(
      (value) => {
        console.log(value)
      }
    )
  }

  public render() {
    return (
      <div className="App">
        <h1>Students</h1>
          {this.state.students.map((data, key) => {
              return (
                <p>{data}</p>
              );
          })}
      </div>
    );
  }
}

export default App;
