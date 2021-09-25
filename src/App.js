import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
    state ={
      manager: '',
      players: [],
      balance: '',
      value: ''
    };
 async componentDidMount(){
   //getting the manager from the network
    const manager = await lottery.methods.manager().call();
  //getting the players from the network
  const players = await lottery.methods.getPlayers().call();
  //getting the Balance of the Lottery
  const balance = await web3.eth.getBalance(lottery.options.address);


    this.setState({manager, players, balance});
  }
//function to submit Eth via form
  onSubmit = async (event) => {
    event.preventDefault();

    //get a list of the accounts first
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

  };


  render() {
    // console.log(web3);
    // web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
        There are currently {this.state.players.length} people enrolled.
        The Prize Pool contains {web3.utils.fromWei(this.state.balance, 'ether')} ether!!!</p>

        <hr/>

        <form onSubmit={this.onSubmit}>
          <h4>Want to give it a shot?</h4>
          <div>
            <label>Amount of Ether to Enter </label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
     
    );
  }
}
export default App;
