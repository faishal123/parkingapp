import React from 'react';

class SearchBarHistory extends React.Component{

    state={
        term:''
    }

    onInputChange = (event) => {
        this.setState({
            term:event.target.value
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render(){
        return(
            <div>
                <form className="ui small form" onSubmit={this.onFormSubmit}>
                    <div className="field" >
                        <div className="ui icon input">
                            <input placeholder="Search using name" className="prompt" type="text" onChange={this.onInputChange} value={this.state.term} style={{boxShadow:'0px 0px 2px grey'}}/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBarHistory;