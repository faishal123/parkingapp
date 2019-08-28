import React from 'react';
import {Link} from 'react-router-dom';

const Choices = (props) => {
        return(
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <img alt="gambar registered" src={props.gambarRegistered} className="left floated mini ui image" />
                        <br></br>
                        <div className="header" style={{color:'#7a7a7a'}}>
                            {props.tulisan.first.judul}
                        </div>
                        <div className="description" style={{color:'#7a7a7a'}}>
                            {props.tulisan.first.isi}
                        </div>
                    </div>
                    <div className="extra content">
                        <Link to="/registered">
                            <button className="fluid ui inverted blue button">
                                Registered Vehicle
                                <i class="chevron right icon"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="content">
                        <img alt="gambar history" src={props.gambarHistory} className="left floated mini ui image" />
                        <br></br>
                        <div className="header" style={{color:'#7a7a7a'}}>
                            {props.tulisan.second.judul}
                        </div>
                        <div className="description" style={{color:'#7a7a7a'}}>
                            {props.tulisan.second.isi}
                        </div>
                    </div>
                    <div className="extra content">
                        <Link to="/history">
                            <button className="fluid ui inverted blue button">
                                History
                                <i class="chevron right icon"></i>
                            </button>
                        </Link>
                    </div>
                </div>
                
            </div>
        );
}


export default Choices;