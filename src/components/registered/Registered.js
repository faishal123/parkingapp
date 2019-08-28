import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import List from './List';
import gambarRegistered from '../../images/registered.png';
import {Link} from 'react-router-dom';

class Registered extends React.Component{

    state={items:[
        {
            "id":"1",
            "license":"Loading...",
            "name":"Loading..."
        }
    ],isLoaded:false};

    componentDidMount(){
        axios.get('http://localhost:5000/contoh').then((response) => {
            this.setState({items:response.data})
//            console.log(this.state.items);
        })
    }

    onSearchSubmit = (term) => {
        axios.get('http://localhost:5000/contoh', {
            params: {query: term}
        }).then((response)=>{
            this.setState({items:response.data})
        })
    }

    render(){
        return(
            <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top', position:'relative', flexWrap:'wrap', paddingTop:'100px', paddingLeft:'100px', paddingRight:'100px'}}>
                <div className="ui grid" style={{width:'100%'}}>
                    <div className="right floated seven wide column">
                        <h1 className="ui header" style={{float:'right', fontSize:'2.5em', color:'#7a7a7a'}}>
                        <img className="ui small right floated image" alt="gambar registered" src={gambarRegistered}/>
                        Registered Vehicle</h1>
                        <br></br>
                        <SearchBar onSubmit={this.onSearchSubmit}/>
                        <br></br>
                        <Link to='/insert'>
                            <button className="fluid ui button" style={{backgroundColor:'white', boxShadow:'0px 0px 3px grey'}}>
                                <h3 style={{color:'#7a7a7a'}}>Add New Vehicle
                                <i className="plus big icon" style={{marginLeft:'30px', color:'#7a7a7a'}}></i>
                                </h3>
                            </button>
                        </Link>
                        <br></br>
                        <Link to='/delete'>
                            <button className="fluid ui button" style={{backgroundColor:'white', boxShadow:'0px 0px 3px grey'}}>
                                <h3 style={{color:'#7a7a7a'}}>Delete a Vehicle
                                <i className="trash alternate big icon" style={{marginLeft:'30px', color:'#7a7a7a'}}></i>
                                </h3>
                            </button>
                        </Link>
                    </div>
                    <div className="nine wide column">
                        <List data={this.state.items}/>
                    </div>
                    </div>
            </div>
        );
    }
}

export default Registered