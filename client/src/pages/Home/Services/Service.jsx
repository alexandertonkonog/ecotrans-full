import React from 'react';
import {Link} from 'react-router-dom';

const Service = (item) => {
    return (
        <Link key={item.id} to={item.link} className="home-service__card">
            <div className="home-service__card-img-container" style={{backgroundImage: 'url(' + item.logo + ')'}}></div>  
            <p className="home-service__card-title">{item.name}</p>
        </Link>
    );
}

export default Service;