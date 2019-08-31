import React from 'react';
import {Field,reduxForm} from 'redux-form';
import axios from 'axios';
import {connect} from 'react-redux';
import {insertUser} from '../actions';
import {Link} from 'react-router-dom';

class Insert extends React.Component{

    renderInput(formProps){
        let errorMessage
        if(formProps.meta.error&&formProps.meta.touched){
            errorMessage = <div className='ui red message'>
                <p style={{textAlign:'justify'}}>
                Please fill this field.
                </p>
            </div>
        }
        else{
            errorMessage = null
        }
        return(
            <div className="field">
                <label style={{color:'#7a7a7a'}}>{formProps.label}</label>
                <input onChange={formProps.input.onChange} value={formProps.input.value}/>
                {errorMessage}
            </div>
        )
    }

    renderSuccess = (message) => {
        if(message==='yes'){
            return <div className="ui green message">
                <div className="header">
                    1 User registered successfully.
                </div>
            </div>
        }
        else{
            return null
        }
    }

    onSubmit = (formValues) => {
        axios.post('http://localhost:5000/contoh', formValues, {
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).then(response => {
            this.props.insertUser(response.data);
            this.props.reset('insertUser');
            console.log(response);
        })
    }

    render(){
        return(
            <div onClick={() => this.props.insertUser('reset')} className="ui container fluid" style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                <div onClick={() => this.props.insertUser('reset')} className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'50px'}}>
                    <Link to='/registered'>    
                        <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                    </Link>
                    <h1 className="ui header" style={{fontSize:'3em', color:'#7a7a7a'}}>Register</h1>
                    <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name='name' component={this.renderInput} label="Name"/>
                        <Field name='email' component={this.renderInput} label="E-mail"/>
                        <Field name='phone' component={this.renderInput} label="Phone Number"/>
                        <Field name='license' component={this.renderInput} label="License Plate"/>
                        <button className="ui inverted blue fluid huge button" type="submit">Submit</button>
                        {this.renderSuccess(this.props.insert)}
                    </form>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.name){
        errors.name="Please fill this field"
    }
    if(!formValues.license){
        errors.license="Please fill this field"
    }
    if(!formValues.email){
        errors.email="Please fill this field"
    }
    if(!formValues.phone){
        errors.phone="Please fill this field"
    }
    return errors;
}

const mapStateToProps = (state) => {
    return state;
}

const exportInsert = connect(
    mapStateToProps, {
        insertUser:insertUser
    }
)(Insert)

export default reduxForm({
    form:'insertUser',
    validate:validate
})(exportInsert)