import React from 'react';
import number from '../../../images/contact/number.svg';

const Call = () => {
    return (
        <section className="call-block contact-call grid">
            <div className="contact-call__body">
                <h3 className="micro-title contact-call__title">Горячая линия, аварийно-диспетчерская служба</h3>
                <h2 className="small-title contact-call__number">+7 (800) 600-49-11</h2>
            </div>
            <a href={"tel:" + '78006004911'} style={{backgroundImage: 'url(' + number + ')'}} className="contact-call__img"></a>
        </section>
    );
}

export default Call;