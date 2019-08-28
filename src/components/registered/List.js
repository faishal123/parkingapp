import React from 'react';
import {Link} from 'react-router-dom';

const List = (props) => {
//    console.log(props.data);
    if(props.data.length>0){
        return(
            <div className="ui raised very padded container segment" style={{backgroundColor:'white', paddingTop:'30px', paddingBottom:'30px', paddingLeft:'50px', paddingRight:'50px', borderRadius:'7%', color:'#7a7a7a', marginBottom:'50px'}}>
                <div className="ui middle aligned divided very relaxed list">
                    <div className="item">
                        <div className="right floated content">
                            <h3>License Plate</h3>
                        </div>
                        <div className="content">
                            <h3>Name</h3>
                        </div>
                    </div>
                    {props.data.map(item => (
                    <div className="item">
                        <div className="middle aligned right floated content">
                            <Link to={`/profile/${item.id}`}><i class="chevron right icon"></i></Link>
                        </div>
                        <div className="middle aligned right floated content">
                            {item.license}
                        </div>
                        <div className="content">
                            {item.name}
                        </div>
                    </div>
                    ))} 
                </div>
            </div>
        );
    }else{
        return(
            <div className="ui raised very padded container segment" style={{backgroundColor:'white', paddingTop:'30px', paddingBottom:'30px', paddingLeft:'50px', paddingRight:'50px', borderRadius:'0%', color:'#7a7a7a'}}>
               <h3>I'm sorry we couldn't find any result matching your search term, please try something else.</h3>
            </div>
        );
    }
}

export default List;