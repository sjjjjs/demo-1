import React, { useEffect, useRef } from 'react';
import styles from './box.module.css';

export default function Box(props) {

    const outerEle = useRef();
    const innerEle = useRef();

    const scrollTop = outerEle.current ? outerEle.current.scrollTop : 0;
    const scrollHeight = outerEle.current ? outerEle.current.scrollHeight : 0;
    const clientHeight = outerEle.current ? outerEle.current.clientHeight : 0;

    console.log([ scrollHeight, scrollTop, clientHeight ])

    useEffect(() => {
        if (clientHeight < scrollHeight && scrollTop < (scrollHeight - clientHeight)) {
            outerEle.current.scrollTop = scrollHeight;
        }
    }, [ scrollHeight, scrollTop, clientHeight ]);

    return (
        <div ref={outerEle} className={styles.outer}>
            <div ref={innerEle} className={styles.inner}>
                {props.children}
            </div>
        </div>
    );
}