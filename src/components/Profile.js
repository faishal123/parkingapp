import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchHistory, fetchUser} from '../actions';

function showAction(item){
    if(item==='MASUK'){
        return <div className="ui green basic label">
            Masuk
        </div>
    }
    else if(item==='KELUAR'){
        return <div className="ui red basic label">
            Keluar
        </div>
    }
}

class Profile extends React.Component{

    getHistory(query){
        axios.get('http://localhost:5000/history', {
            params:{
                query:query
            }
        }).then((response)=>{
            this.props.fetchHistory(response.data);
        })
    }

    componentDidMount(){
        axios.get('http://localhost:5000/profile', {
            params:this.props.match.params
        }).then((response)=>{
            this.props.fetchUser(response.data);
            this.getHistory(response.data[0][1])
        })
    }   

    render(){
        if(this.props.user.name){
            return(
                <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'center', alignItems:'middle',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                    <div className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', color:'#7a7a7a', width:'40%', marginBottom:'100px', height:'100%'}}>
                        <Link to='/registered'>    
                            <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                        </Link>
                        <h1 className="ui header" style={{color:'#7a7a7a'}}>{this.props.user.name}</h1>
                        <div className="ui section divider"></div>
                        <div className="ui grid" >
                            <div className="eight wide column">
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>License Plate :</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>Email :</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>Phone Number :</h4>
                            </div>
                            <div className="eight wide column">
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.props.user.license}</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.props.user.email}</h4>
                                <h4 className="ui header" style={{color:'#7a7a7a'}}>{this.props.user.phone}</h4>
                            </div>
                        </div>
                        <div className="ui section divider"></div>
                        <h2 className='ui header' style={{color:'#7a7a7a'}}>Access History</h2>
                        {this.props.history.map(item=>(
                            <div className="ui very relaxed list" key={item[0]}>
                                <div className="item" key={item[0]}>
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
                        <div className="ui active centered inline massive loader"></div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {
    fetchUser:fetchUser,
    fetchHistory:fetchHistory
})(Profile)