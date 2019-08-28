import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
    return(
        <div className="ui bottom fixed massive borderless menu" style={{paddingLeft:'100px', backgroundColor:'#bbe0ff'}}>
                <Link to="/">
                <div>
                    <a className="item">
                        <h1 style={{color:'#7a7a7a'}}>
                            Home
                        </h1>
                    </a>
                </div>
                </Link>
                <Link to="/registered">
                <div>
                    <a className="item">
                        <h1 style={{color:'#7a7a7a'}}>
                            Registered
                        </h1>
                    </a>
                </div>
                </Link>
                <Link to="/history">
                <div>
                    <a className="item">
                        <h1 style={{color:'#7a7a7a'}}>
                            History
                        </h1>
                    </a>
                </div>
                </Link>
        </div>
           
    );
}

export default Nav;