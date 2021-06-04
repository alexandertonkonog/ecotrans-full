import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateFormat } from '../../../dev/functions';
import { setBreadcrumbs } from '../../../redux/mainReducer';
import { getEntity } from '../../../redux/iblockReducer';
import More from '../../../components/More/More';
import Loader from '../../../components/Loader/Loader';
import image from '../../../images/default-image.png';
import '../../../css/news/new.css';

const PromoDetail = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();
    let params = useParams();
    let data = useSelector(state => state.iblock.detailSale);
    useEffect(() => {
        let breads = [
            {id: 1, name: 'Главная', link: '/'},
            {id: 2, name: 'Новости', link: '/akcii'},
            {id: 3, name: props.name, withoutLink: true},
        ];
        dispatch(setBreadcrumbs(breads));
        return () => {
            dispatch(setBreadcrumbs(null));
        }
    }, [])
    useEffect(() => {
        const getOneNewFunction = async () => {
            let result = await dispatch(getEntity({id: 2, link: params.id}));
            if (!result.success) {
                history.push('/404');
            }
        }
        getOneNewFunction();
    }, [params.id])
    if (!data) {
        return (
            <div className="block new short-padding"><Loader /></div>
        )
    }
    let img = data.img && data.img.fullLink ? data.img.fullLink : image;
    return (
        <div className="block new">
            <Helmet>
                <title>{data.seoTitle}</title>
                <meta name="description" content={data.seoDescription} />
                <meta name="keywords" content={data.seoKeywords} />
            </Helmet>
            <div className="section-nav-container">
                <h1 className="main-title ">{data.name}</h1>
            </div>
            <div className="card__footer">
                <p className="card__type card__text_orange">Акция</p>
                <p className="card__date">{DateFormat.backTimeFormat(data.createdAt)}</p>
            </div>
            <img src={img} className="new__img short-padding" alt={data.name} title={data.name} />
            <div className="new__body main__col" dangerouslySetInnerHTML={{__html: data.text}}></div>
            {data.next && <More text={data.next.name} link={'/akcii/' + data.next.linkName} />}
        </div>
    );
}

PromoDetail.defaultProps = {
    nextName: 'ООО «Экотранс» — профессиональное обращение с отходами',
    nextLink: '2',
}

export default PromoDetail;