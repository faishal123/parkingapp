import React from 'react';
import Homepage from './homepage/Homepage';
import Nav from './Nav';
import Registered from './registered/Registered';
import History from './history/History';
import Insert from './Insert';
import Delete from './Delete'
import Profile from './Profile'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <div className="ui container fluid" style={{background:'#f3f9ff'}}>
                        <Route path="/insert" component={Insert}/>
                        <Route path="/delete" component={Delete}/>
                        <Nav />
                        <Route path="/" exact component={Homepage}/>
                        <Route path="/history" component={History}/>
                        <Route path="/registered" component={Registered}/>
                        <Route path="/profile/:id" component={Profile}/>
                    </div>
                </Switch>
            </Router>
        );
    }
}

export default App;