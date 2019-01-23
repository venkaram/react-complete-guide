import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      {id: '101', name: "Arun", age: 27},
      {id: '102', name: "Hema", age: 30},
      {id: '103', name: "Mano", age: 30},
      {id: '104', name: "Venkat", age: 28}
    ],
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    console.log(event);
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShowPersons = this.state.showPersons;
    this.setState({showPersons: !doesShowPersons});
  }

  deletePersonHandler = (personIndex) => {
    const p = this.state.persons.slice();
    p.splice(personIndex, 1);
    this.setState({persons: p});
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person 
                      click={this.deletePersonHandler.bind(this, index)} 
                      name={person.name} 
                      age={person.age}
                      key={person.id}
                      changed={(event)=>this.nameChangeHandler(event, person.id)}></Person>
          })}
        </div>
      );
      style.backgroundColor = 'red';
      
    }

    let classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red');
    } 
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }



    return (
      
        <div className="App">
          <h1>Hi! I'm a react App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
        </div>
      
    );
    
  }
}

export default App;
