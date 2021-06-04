import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { getEntities } from '../../../../redux/iblockReducer';
import pdf from '../../../../images/company/pdf.svg';

const Info = () => {
    const dispatch = useDispatch();
    const docs = useSelector(state => state.iblock.agreeDocs);
    useEffect(() => {
        dispatch(getEntities({id: 7, limit: 100, page: 1}));
    }, [])

    const docsFiltered = docs && docs.list.filter(item => item.smallImg);

    const docsFirst = docs && docsFiltered.filter(item => {
        let field = item.properties.find(elem => elem.userFieldId === 3);
        if (!field) return false;
        return +field.value === 1;
    })
    const docsSecond = docs && docsFiltered.filter(item => {
        let field = item.properties.find(elem => elem.userFieldId === 3);
        if (!field) return false;
        return +field.value === 2;
    })
    return (
        <>
            <h1 className="main-title page-title title-padding">Заключение договора</h1>
            <section className="contract-des text-col middle-padding pt0">
                <p className="main-text text-grey mb-middle">Хозяйствующие субъекты, являющиеся собственниками твердых коммунальных отходов обязаны заключить договор на оказание услуг по обращению с твердыми коммунальными отходами с региональным оператором, в зоне деятельности которого образуются твердые коммунальные отходы и находятся места их накопления. Согласно ч. 4 ст. 24.7 Федерального закона от 24.06.1998 № 89-ФЗ «Об отходах производства и потребления».</p>
                <p className="main-text text-grey mb-middle">Порядок заключения договора с региональным оператором регламентируется Правилами обращения с твердыми коммунальными отходами, утвержденными постановлением Правительства Российской Федерации от 12.11.2016 № 1156.</p>
                <p className="main-text text-grey">Невыполнение вышеуказанных норм законодательства образует состав административного правонарушения, предусмотренного ч. 1 ст. 8.2 КоАП РФ.
 Расчет объема ТКО производится в соответствии с Правилами коммерческого учета объема ТКО, утвержденными постановлением Правительства РФ от 03.06.2016г. № 505 «Об утверждении Правил коммерческого учета объема и (или) массы ТКО» расчетным путем исходя из утвержденных нормативов накопления ТКО.</p>
            </section>
            {docs ? <>
                {docsFirst.length ? <section className="mb-max">
                    <h2 className="small-title mb-middle">Шаблоны договоров</h2>
                    {docsFirst.map(item => {
                        return (
                            <a href={item.smallImg.fullLink} key={item.id} className="doc__item">
                                <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                <p className="doc__title">{item.name}</p>
                            </a>
                        );
                    })}   
                </section> : <></>}
                {docsSecond.length ? <section className="mb-max">
                    <h2 className="small-title mb-middle">Шаблоны писем для отправки обращений</h2>
                    {docsSecond.map(item => {
                        return (
                            <a href={item.smallImg.fullLink} key={item.id} className="doc__item">
                                <div className="doc__icon" style={{backgroundImage: 'url(' + pdf + ')'}}></div>
                                <p className="doc__title">{item.name}</p>
                            </a>
                        );
                    })}
                </section> : <></>}
            </> : <div className="average-padding"><Loader /></div>}
        </>
    );
}

export default Info;