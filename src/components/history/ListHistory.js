import React from 'react';

function showAction(item){
    if(item==='MASUK'){
        return <div className="ui green basic label">
            Masuk
        </div>
    }
    else{
        return <div className="ui red basic label">
            Keluar
        </div>
    }
}

const ListHistory = (props) => {
    return(
        <div className="ui raised very padded container segment" style={{backgroundColor:'white', paddingTop:'30px', paddingBottom:'30px', paddingLeft:'50px', paddingRight:'50px', color:'#7a7a7a', marginBottom:'50px'}}>
            <div className="ui middle aligned divided very relaxed list">
                {props.items.map(item=>(
                    <div className="item" key={item[0]}>
                        <div className='right floated content'>
                            {showAction(item[2])}
                        </div>
                        <div className='middle aligned content'>
                            <h4>{item[1]}</h4>
                        </div>
                        <div className='middle aligned content'>
                            {item[3]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListHistory