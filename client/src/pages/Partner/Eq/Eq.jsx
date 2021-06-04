import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';


const Eq = () => {
    const dispatch = useDispatch();
    const eq = useSelector(state => state.iblock.partnerEq);

    useEffect(() => {
        dispatch(getEntities({id: 21, limit: 6, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!eq) {
        return <section className="partner-right-container main-padding">
            <Loader />
        </section>
    }

    if (!eq.count) {
        return <section className="partner-right-container"></section>
    }

    return (
        <section className="partner-right-container container_grey average-padding">
            <div className="partner-right block">
                <h3 className="micro-title mb-large">На участке имеется все необходимое оборудование и коммуникации для производственной деятельности:</h3>
                <div className="partner-right__list mb-small">
                    {eq.list.map(item => {
                        return (
                            <div key={item.id} className="partner-right__item partner-right__item_full">
                                <img src={item.smallImg.fullLink} alt="" className="partner-right__img" />
                                <div className="partner-right__item-body">
                                    <p className="partner-right__item-title">{item.name}</p>
                                    <p className="main-text">{item.smallText}</p>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Eq;