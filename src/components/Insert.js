import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Insert extends React.Component{
    
    state={
        name:'',
        email:'',
        license:'',
        phone:'',
        errorMessage:'',
        successMessage:''
    };

    validate = () => {
        if(!this.state.name || !this.state.email || !this.state.phone || !this.state.license){
            this.setState({errorMessage:'Please fill out all the available fields.'});
            return false
        }
        return true
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({successMessage:''})
        if(this.validate()){
            const addUser = {
                'name':this.state.name,
                'license':this.state.license,
                'phone':this.state.phone,
                'email':this.state.email
            }
            console.log(addUser);
            axios.post('http://localhost:5000/contoh', addUser, {
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(response =>{
                console.log(response);
                this.setState({successMessage:response});
            })

            this.setState({
                errorMessage:'',
                name:'',
                email:'',
                phone:'',
                license:'',
                successMessage:''
            });
        }
        else{
            console.log(this.state.errorMessage);
        }
    }

    render(){
        let showError;
        let showSuccess;

        if(!this.state.successMessage){
            showSuccess = <div></div>
        }
        else{
            showSuccess = <div className="ui green message">
                <div className="header">{this.state.successMessage.data} successfully</div>
            </div>
        }

        if(!this.state.errorMessage){
            showError = <div></div>
        }
        else{
            showError = <div className="ui red message">
                <div className="header">Forbidden</div>
                <p>{this.state.errorMessage}</p>
            </div>
        }

        return(
            <div className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                <div className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'50px'}}>
                    <Link to='/registered'>    
                        <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                    </Link>
                    <h1 className="ui header" style={{fontSize:'3em', color:'#7a7a7a'}}>Register</h1>
                    <form className="ui form" onSubmit={this.onFormSubmit}>
                        <div className='field'>
                            <label style={{color:'#7a7a7a'}}>Name</label>
                            <input placeholder='Name' value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
                        </div>
                        <div className='field'>
                            <label style={{color:'#7a7a7a'}}>License Plate</label>
                            <input placeholder='License Plate' value={this.state.license} onChange={(e)=>{this.setState({license:e.target.value})}}/>
                        </div>
                        <div className='field'>
                            <label style={{color:'#7a7a7a'}}>E-mail</label>
                            <input placeholder='E-mail' value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                        </div>
                        <div className='field'>
                            <label style={{color:'#7a7a7a'}}>Phone Number</label>
                            <input placeholder='Phone Number' value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}}/>
                        </div>
                        <br></br>
                        <button className="ui inverted blue fluid huge button" type="submit">Submit</button>
                        {showError}
                        {showSuccess}
                    </form>
                </div>
            </div>
        );
    }
}

export default Insert;