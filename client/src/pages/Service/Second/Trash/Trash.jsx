import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';

const Trash = () => {
    const dispatch = useDispatch();
    const trashClasses = useSelector(state => state.iblock.trashClasses);
    useEffect(() => {
        dispatch(getEntities({id: 18, limit: 4, page: 1, order: [['id', 'ASC']]}));
    }, [])

    if (!trashClasses) {
        return <section className="pasport-trash main-padding">
            <Loader />
        </section>
    }

    return (
        <section className="pasport-trash">
            <h2 className="dec-title pasport-trash__title">Классификация отходов</h2>
            <div className="pasport-trash__list">
                {trashClasses.count && trashClasses.list.map(item => {
                    return (
                        <div className="pasport-trash__item grid" key={item.id}>
                            <div className="pasport-trash__icon" style={{backgroundImage: 'url(' + item.smallImg.fullLink + ')'}}></div>
                            <h3 className="pasport-trash__item-title">{item.name}</h3>
                            <p className="pasport-trash__text text-grey tko__text">{item.smallText}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Trash;