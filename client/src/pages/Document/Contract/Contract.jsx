import React from 'react';
import Info from './Info/Info';
import Docs from './Docs/Docs';
import '../../../css/document/contract.css';
import More from '../../../components/More/More';

const Contract = () => {
    
    return (
        <div className="contract block">
            <Info />
            <Docs />
            <More text="Документы потребителям" link="/dokumenti/dokumenti-potrebitelyam" />
        </div>
    );
}

export default Contract;