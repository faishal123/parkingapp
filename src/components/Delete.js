import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Delete extends React.Component{

    state={
        name:'',
        license:'',
        alert:''
    }

    resetAlert = (e) => {
        this.setState({alert:''});
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:5000/delete',{
            params:this.state
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                alert:response.data,
                name:'',
                license:''
            });
        })
    }

    render(){

        let showMessage;

        if(this.state.alert=="1 record deleted"){
            showMessage = <div className="ui green message">
            <div className="header">{this.state.alert}</div>
        </div>
        }
        else if(this.state.alert=="0 record deleted"){
            showMessage = <div className="ui red message">
            <div className="header">{this.state.alert}</div>
            <p style={{textAlign:'justify'}}>Delete Failed, please check the name and license plate that you were going to delete and make sure you spelled them correctly.</p>
        </div>
        }
        else if(this.state.alert==''){
            showMessage = <div className="ui message">
            <p style={{textAlign:'justify'}}>*Please note that once you've deleted the data,  you cannot recover it. So please make sure you entered the right name and license plate.</p>
        </div>
        }

        console.log(showMessage);

        return(
            <div onClick={this.resetAlert} className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                <div onClick={this.resetAlert} className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'50px'}}>
                    <Link to='/registered'>    
                        <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                    </Link>
                    <h1 className="ui header" style={{fontSize:'3em', color:'#7a7a7a'}}>Delete</h1>
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                        <div className="field">
                            <label style={{color:'#7a7a7a'}}>Name</label>
                            <input placeholder='Name' value={this.state.name} onChange={(e) => {this.setState({name:e.target.value})}}></input>
                        </div>
                        <div className="field">
                            <label style={{color:'#7a7a7a'}}>License</label>
                            <input placeholder='License' value={this.state.license} onChange={(e) => {this.setState({license:e.target.value})}}></input>
                        </div>
                        <br></br>
                        <button className="ui fluid vertical animated huge button" type="submit">
                            <div className="visible content">
                                Delete
                            </div>
                            <div className="hidden content">
                                Are you sure ?
                            </div>
                        </button>
                        {showMessage}
                    </form>
                </div>
            </div>
        );
    }
}

export default Delete