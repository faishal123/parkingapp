import React from 'react';
import {Field,reduxForm} from 'redux-form';
import axios from 'axios';
import {connect} from 'react-redux';
import {deleteUser} from '../actions';
import {Link} from 'react-router-dom';

class Delete extends React.Component{

    renderInput(formProps){
        let errorMessage
        if(formProps.meta.error&&formProps.meta.touched){
            errorMessage = <div className='ui red message'>
                <p style={{textAlign:'justify'}}>
                Please fill the field.
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
        );
    }

    onSubmit = (formValues) => {
        axios.get('http://localhost:5000/delete',{
            params:formValues
        }).then((response)=>{
            this.props.deleteUser(response.data);
            this.props.reset('deleteUser');
        })
    }

    renderSuccess = (message) => {
        if(message==='yes'){
            return <div className="ui green message">
                <div className="header">
                    1 User deleted successfully.
                </div>
            </div>
        }
        else if(message==='no'){
            return <div className="ui red message">
                <div className="header">
                    Delete Failed.
                </div>
                <p style={{textAlign:'justify'}}>
                    Please make sure you spelled the name and license number correctly.
                </p>
            </div>
        }
        else{
            return null
        }
    }

    render(){
        return(
            <div onClick={() => this.props.deleteUser('reset')} className='ui container fluid' style={{background:'#f3f9ff', height:'100%', minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'top', alignItems:'top',paddingTop:'50px', position:'relative', flexWrap:'wrap'}}>
                <div onClick={() => this.props.deleteUser('reset')} className="ui raised very padded segment" style={{backgroundColor:'white', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', width:'40%', marginBottom:'50px'}}>
                    <Link to='/registered'>    
                        <i className="chevron left big icon" style={{color:'#7a7a7a'}}></i>
                    </Link>
                    <h1 className="ui header" style={{fontSize:'3em', color:'#7a7a7a'}}>Delete</h1>
                    <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name='name' component={this.renderInput} label="Name"/>
                        <Field name='license'component={this.renderInput} label="License Plate"/>
                        <button className="ui fluid vertical animated huge button" type="submit">
                            <div className="visible content">
                                Delete
                            </div>
                            <div className="hidden content">
                                Are you sure ?
                            </div>
                        </button>
                        <div className="ui message">
                            <p style={{textAlign:'justify'}}>*Please note that once you've deleted the data,  you cannot recover it. So please make sure you entered the right name and license plate.</p>
                        </div>
                        {this.renderSuccess(this.props.delete)}
                    </form>
                </div>
            </div>
        );
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
    return errors
}

const mapStateToProps = (state) => {
    return state;
}

const exportDelete = connect(
    mapStateToProps, {
        deleteUser:deleteUser
    }
)(Delete)

export default reduxForm({
    form:'deleteUser',
    validate:validate
})(exportDelete);