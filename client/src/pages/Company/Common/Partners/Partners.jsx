import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';

const Partners = () => {
    const dispatch = useDispatch();
    const companyPartners = useSelector(state => state.iblock.companyPartners);
    useEffect(() => {
        dispatch(getEntities({id: 19, limit: 6, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!companyPartners) {
        return <section className="company-partners main-padding">
            <Loader />
        </section>
    }

    return (
        <section className="company-partners">
            <h2 className="small-title">Мы сотрудничаем с большим количеством предприятий и организаций:</h2>
            <div className="company-partners__list">
                {companyPartners.list.map(item => (
                    <div key={item.id} className="company-partners__item">
                        {item.smallImg && <img src={item.smallImg.fullLink} className="company-partners__icon" title={item.name} alt={item.name} />}
                        <p className="company-partners__text">{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Partners;