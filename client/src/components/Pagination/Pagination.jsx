import React, {useState, useEffect} from 'react';

const Pagination = (props) => {
    let [paginationList, setPaginationList] = useState([]);
    const getPaginationList = () => {
        if (props.max < props.active) return;
        let array = []
        for (let i = 1; i <= props.max; i++) {
            array.push({value: i, active: i === props.active});
        }
        if (props.max > 4) {
            if (props.active === 1) {
                array = array.slice(0, 4)
            } else if (props.active === props.max) {
                array = array.slice(props.active - 4, props.active + 1)
            } else if (props.max - props.active === 1) {
                array = array.slice(props.active - 3, props.active + 1)
            } else {
                array = array.slice(props.active - 2, props.active + 2)
            }
        }
        setPaginationList(array);
    }
    useEffect(() => {
        getPaginationList();
    }, [props.active]);
    const changePaginationItem = (vector) => {
        if (vector && props.max !== props.active) {
            props.clickItem(props.active + 1);
        } else if (!vector && props.active !== 1) {
            props.clickItem(props.active - 1);
        }
    }
    return (
        <div className="pagination-container">
            <p className="pagination">
                <span
                    onClick={() => changePaginationItem(false)}
                    className={props.active === 1 
                        ? 'pagination__manager pagination__manager_disable' 
                        : 'pagination__manager'}>
                    <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.73106 15.8177C9.10789 16.2214 9.08607 16.8542 8.68232 17.2311C8.27857 17.6079 7.64578 17.5861 7.26894 17.1823L8.73106 15.8177ZM1 9L0.268945 9.68232C-0.0896476 9.29811 -0.0896476 8.70189 0.268945 8.31768L1 9ZM7.26895 0.817682C7.64578 0.413931 8.27857 0.392111 8.68232 0.768945C9.08607 1.14578 9.10789 1.77857 8.73106 2.18232L7.26895 0.817682ZM7.26894 17.1823L0.268945 9.68232L1.73106 8.31768L8.73106 15.8177L7.26894 17.1823ZM0.268945 8.31768L7.26895 0.817682L8.73106 2.18232L1.73106 9.68232L0.268945 8.31768Z" fill="black"/>
                    </svg>
                </span>
                {paginationList.map(item => <span
                    key={item.value}
                    onClick={() => props.clickItem(item.value)}
                    className={item.active ? 'pagination__item pagination__item_active' : 'pagination__item'}>{item.value}</span>)}
                <span 
                    onClick={() => changePaginationItem(true)}
                    className={props.active === props.max 
                        ? 'pagination__manager pagination__manager_disable pagination__item_next' 
                        : 'pagination__manager  pagination__item_next'}>
                    <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.73106 15.8177C9.10789 16.2214 9.08607 16.8542 8.68232 17.2311C8.27857 17.6079 7.64578 17.5861 7.26894 17.1823L8.73106 15.8177ZM1 9L0.268945 9.68232C-0.0896476 9.29811 -0.0896476 8.70189 0.268945 8.31768L1 9ZM7.26895 0.817682C7.64578 0.413931 8.27857 0.392111 8.68232 0.768945C9.08607 1.14578 9.10789 1.77857 8.73106 2.18232L7.26895 0.817682ZM7.26894 17.1823L0.268945 9.68232L1.73106 8.31768L8.73106 15.8177L7.26894 17.1823ZM0.268945 8.31768L7.26895 0.817682L8.73106 2.18232L1.73106 9.68232L0.268945 8.31768Z" fill="black"/>
                    </svg>
                </span>
            </p>
            <button className="btn btn_white pagination__btn" onClick={props.showAll} >Показать все</button>
        </div>
    );
}

Pagination.defaultProps = {
    active: 2,
    max: 3,
    clickItem: (id) => {
        
    },
    showAll: () => {

    }
}

export default Pagination;