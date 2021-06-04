import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import { getEntities } from '../../../redux/iblockReducer';
import res from '../../../images/partner/res.jpg';

const Resident = () => {
    const dispatch = useDispatch();
    const resident = useSelector(state => state.iblock.partnerResident);

    useEffect(() => {
        dispatch(getEntities({id: 22, limit: 6, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!resident) {
        return <section className="partner-res main-padding">
            <Loader />
        </section>
    }

    if (!resident.count) {
        return <></>
    }
    return (
        <section className="partner-res middle-padding block">
            <img src={res} alt="Мусор" title="Мусор" className="partner-res__bg"/>
            <h2 className="small-title mb-max middle-padding pb0">Резидентам гарантировано:</h2>
            <div className="partner-res__list">
                {resident.list.map(item => {
                    return (
                        <div key={item.id} className="partner-res__item">
                            <div 
                                className="partner-res__img"
                                style={{backgroundImage: 'url(' + item.smallImg.fullLink + ')'}}>
                            </div>
                            <p className="partner-res__text">{item.name}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Resident;