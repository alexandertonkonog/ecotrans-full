import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const wrapModal = (Node, options) => {
    return (props) => {
        // let screenWidth = useSelector(state => state.main.screenWidth);
        useEffect(() => { 
            if (options.visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [options.visible])
        let addClass = options.addClass || '';
        return (
            <div className={options.visible ? "modal shadow " + addClass : "modal shadow modal_disable " + addClass}>
                <div className="modal__body">
                    <div className="modal__header">
                        <div className="modal__exit" onClick={options.callback}>&times;</div>
                    </div>
                    <div className="modal__content">
                        {!options.result && <Node {...props} />}
                        {options.result === 1 && <div className="modal__success">
                            <h2 className="small-title mb-small">{options.successTitle}</h2>
                            <p className="main-text text-grey">{options.successText}</p>
                            {options.addSuccessText && <p className="main-text text-grey mt-small">{options.addSuccessText}</p>}
                            {options.addButton && <button className="btn btn_green mt-small modal__add-btn" onClick={options.callback}>{options.addButton}</button>}
                            {options.addLinkButton && <Link to={options.addLinkButton} onClick={options.callback} className="btn btn_green mt-small modal__add-btn">{options.addLinkButtonText}</Link>}
                        </div>}
                        {options.result === 2 && <div className="modal__error">
                            <h2 className="small-title mb-small">{options.errorTitle}</h2>
                            <p className="main-text text-grey">{options.errorText}</p>
                            {options.repeat && <button className="btn btn_green mt-small modal__add-btn" onClick={options.repeat}>Попробовать еще раз</button>}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}