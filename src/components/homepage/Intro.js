import React from 'react';

const Intro = (props) => {
        return(
                <div className="ui container" style={{color:'#7a7a7a', paddingLeft:'75px', paddingRight:'75px'}}> 
                    <h1 style={{fontSize:'3em'}}>{props.tulisan.judul}</h1>
                    <div className="ui justified container">
                        <p>{props.tulisan.isi}</p>
                        <img alt="gambar palang" src={props.gambarPalang} className="ui centered medium image" style={{paddingTop:'25px'}}/>
                    </div>
                    
                </div>
        );
    }

export default Intro;