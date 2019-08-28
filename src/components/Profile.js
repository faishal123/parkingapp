import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function showAction(item){
    if(item=='MASUK'){
        return <div className="ui green basic label">
            Masuk
        </div>
    }
    else{
        return <div className="ui red basic label">
            Keluar
        </div>
    }
}

class Profile extends React.Component{
    
    state={
        name:'',
        email:'',
        license:'',
        phone:'',
        data:[]
    }

    getHistory(query){
        axios.get('http://localhost:5000/history', {
            params:{
                query:query
            }
        }).then((response)=>{
            this.setState({
                data:response.data
            })
        })
    }

    componentDidMount(){
        axios.get('http://localhost:5000/profile', {
            params:this.props.match.params
        }).then((response)=>{
            this.setState({
                name:response.data[0][1],
                license:response.data[0][2],
                email:response.data[0][3],
                phone:response.data[0][4]
            })
            this.getHistory(response.data[0][1])
        })
    }   

    render(){
        console.log(this.state.data);
        if(this.state.name){
            return(
                <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'center', alignItems:'middle',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                    <div className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'100px', height:'100%'}}>
                        <Link to='/registered'>    
                            <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                        </Link>
                        <h1 className="ui header" style={{color:'#7a7a7a'}}>{this.state.name}</h1>
                        <div className="ui section divider"></div>
                        <div className="ui grid" >
                            <div className="eight wide column">
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>License Plate :</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>Email :</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>Phone Number :</h4>
                            </div>
                            <div className="eight wide column">
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.state.license}</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.state.email}</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.state.phone}</h4>
                            </div>
                        </div>
                        <div className="ui section divider"></div>
                        {this.state.data.map(item=>(
                            <div className="ui very relaxed list">
                                <div className="item">
                                    <div className="ui right floated content">
                                        {showAction(item[2])}
                                    </div>
                                    <div className="content">
                                        {item[3]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'center', alignItems:'middle',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                    <div className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'100px', height:'100%'}}>
                        <div class="ui active centered inline massive loader"></div>
                    </div>
                </div>
            );
        }
    }
}


export default Profile