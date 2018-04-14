import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      states:{
      userName:"",
      passWord:"",
      movieName:""}
      
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this)
  }
  onChange (e) {
   var states = this.state.states;
   var name = e.target.name; 
   var value = e.target.value; 
   states[name] = value;
   this.setState({states});
    
  }

  submit() {
    $.ajax({
      url: '/movies', 
      type: 'POST',
      data: this.state,
      success: (data) => {
        console.log("post",data)
        }
    });
  }

  render () {
    return (<div>
  <h1>Suggest Movies!</h1>
  <input type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange}/><br/>
  <input type="text" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/>
  <input type="text" name="movieName" placeholder="movieName" value={this.state.movieName} onChange={this.onChange}/><br/>
  <button onClick={this.submit}>Submit</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));