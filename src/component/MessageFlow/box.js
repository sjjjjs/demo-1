import React, { useEffect, useRef } from 'react';
import styles from './box.module.css';

/**
 * 消息容器: 消息列表更新时，内容滑动到最底部
 * @param {object} props
 * @param {boolean|number} props.autoScroll
 *  - true: 自动滚动
 *  - false: 禁止自动滚动
 *  - Number: 距离底部小于某值时自动滚动
 */
export default function Box(props) {
    const autoScroll = props.autoScroll || false;
    const imageLoadedCount = props.imageLoadedCount || 0;
    const outerEle = useRef();
    const count = React.Children.count(props.children);
    
    useEffect(() => {
        if (outerEle && autoScroll !== false) {
            const ele = outerEle.current;
            const scrollTop = ele.scrollTop;
            const scrollHeight = ele.scrollHeight;
            const clientHeight = ele.clientHeight;
            const maxScrollTop = scrollHeight - clientHeight;

            if (
                clientHeight < scrollHeight
                && scrollTop < maxScrollTop
            ) {
                if (
                    autoScroll === true
                    || (
                        typeof autoScroll === 'number'
                        && !isNaN(autoScroll)
                        && (maxScrollTop - scrollTop < autoScroll)
                    )
                ) {
                    ele.scrollTop = maxScrollTop;
                }
            }
        }
    }, [ count, autoScroll, imageLoadedCount ] );

    return (
        <div ref={outerEle} className={styles.outer}>
            <div className={styles.inner}>
                { count > 0 ? props.children : <EmptyContent /> }
            </div>
        </div>
    );
}

function EmptyContent() {
    return (
        <p className={styles.emptyBox}>暂时没有新消息</p>
    );
}