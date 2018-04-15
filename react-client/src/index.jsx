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
     movieName:""
     
   },
   data:""
     
   }
   this.onChange = this.onChange.bind(this);
   this.submit = this.submit.bind(this);
   this.fetch = this.fetch.bind(this);
   this.homepage = this.homepage.bind(this)
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
       alert(data)
       }
   });
 }
 fetch() {
   $.ajax({
     url: '/movies',
     type: 'GET',
     success: (data) => {
      this.setState({data:data});
      //console.log(this.state.data);
       }
   });
 }
 homepage(){
  $.ajax({
     url: '/',
     type: 'GET',
     success: (data) => {
      this.setState({data:""});
     // console.log("data",this.state.data);
       }
   });
 }

 render () {
  if(this.state.data!==""){
    console.log("here",this.state.data)
   return (
<center><div><h4>*userNames are ordered  alphabetically</h4><div>{this.state.data.map((movie) =>
 <div> {movie.userName+" , "+movie.movieName}</div>

)} </div><h3 onClick={this.homepage}>Click Here For HomePage</h3></div></center>)}
   else {return (
   <center>
   <div>
 <h1>Suggest Movies!</h1>
 <input type="text" name="userName" placeholder="userName" value={this.state.userName} onChange={this.onChange}/><br/><br/><br/>
 <input type="text" name="passWord" placeholder="passWord" value={this.state.passWord} onChange={this.onChange}/><br/><br/><br/>
 <input type="text" name="movieName" placeholder="movieName" value={this.state.movieName} onChange={this.onChange}/><br/><br/><br/>
 <button onClick={this.submit}>Suggest</button><br/>
 <h3 onClick={this.fetch}>Click Here For Movies Recommendations!</h3>
   </div>
   </center>
   )}
 }
}

ReactDOM.render(<App />, document.getElementById('app'));