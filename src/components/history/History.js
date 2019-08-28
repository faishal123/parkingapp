import React from 'react';
import axios from 'axios';
import ListHistory from './ListHistory';
import SearchBarHistory from './SearchBarHistory';
import gambarHistory from '../../images/history.png';

class History extends React.Component{

    state={
        data:[]
    };

    onFormSubmit = (term) => {
        console.log(term)
        axios.get('http://localhost:5000/history',{
            params: {query: term}
        }).then((response)=>{
            console.log(response);
            this.setState({data:response.data})
        })
    }

    componentDidMount(){
        axios.get('http://localhost:5000/history').then((response) => {
            this.setState({data:response.data})
//            console.log(this.state.data);
        })
    }

    render(){
        return(
            <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top', position:'relative', flexWrap:'wrap', paddingTop:'100px', paddingLeft:'100px', paddingRight:'100px'}}>
                <div className="ui grid" style={{width:'100%'}}>
                    <div className="right floated seven wide column">
                        <h1 className="ui header" style={{float:'right', fontSize:'2.5em', color:'#7a7a7a'}}>
                        <img className="ui small right floated image" alt="gambar history" src={gambarHistory}/>
                        Access History</h1>
                        <br></br>
                        <SearchBarHistory onSubmit={this.onFormSubmit} />
                    </div>
                    <div className="nine wide column">
                        <ListHistory items={this.state.data}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;