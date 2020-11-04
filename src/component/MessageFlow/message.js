import React from 'react';
import styles from './message.module.css';
import defaultAvatarImage from './defaultAvatarImage.jpg';
import { classnames, noop } from '../../util/index';
import { TYPES, WAYS, DIRECTIONS } from '../../constant/index';

// 通过 type 将数据传递给指定消息组件渲染
export default function Message(props) {
    const { type, way } = props;
    if (
        way !== WAYS.WAY_SEND
        && way !== WAYS.WAY_RECEIVE
    ) return <InvalidMessage />;
    switch(type) {
        case TYPES.TYPE_TEXT: return <TextMessage {...props} />;
        case TYPES.TYPE_IMAGE: return <ImageMessage {...props} />;
        case TYPES.TYPE_SYSTEM: return <SystemMessage {...props} />;
        default: return <UnsupportMessage />;
    }
}

// 抽象可复用消息组件布局
function BaseAvatarMessage(props) {
    const { way, avatarUrl = defaultAvatarImage } = props;
    const direction = BaseAvatarMessage.wayToDirection(way);
    return (
        <div className={
                classnames([
                    styles.baseMessageBox,
                    direction === DIRECTIONS.DIRECTION_LTR
                        ? styles.baseMessageLtr 
                        : styles.baseMessageRtl
                ])
            }>
            <img
                src={avatarUrl}
                className={styles.baseAvatarMessageBoxImage}
                alt="avatar"
            />
            <div className={styles.baseMessageBoxContent}>
                {props.children}
            </div>
        </div>
    );
}
BaseAvatarMessage.wayToDirection = way => {
    switch (way) {
        case WAYS.WAY_SEND: return DIRECTIONS.DIRECTION_RTL;
        case WAYS.WAY_RECEIVE: return DIRECTIONS.DIRECTION_LTR;
        default: return DIRECTIONS.DIRECTION_RTL;
    }
}

// 文本消息
function TextMessage(props) {
    const { avatarUrl, text, way } = props;
    if (!text) return <InvalidMessage />;
    return (
        <BaseAvatarMessage way={way} avatarUrl={avatarUrl}>
            <div className={styles.textMessageBox}>
                <div className={
                    classnames([
                        styles.textMessageContent,
                        way === WAYS.WAY_SEND
                            ? styles.textMessageContentSent
                            : styles.textMessageContentReceive
                    ])
                }>{text}</div>
            </div>
        </BaseAvatarMessage>
    );
}

// 图片消息
function ImageMessage(props) {
    const { avatarUrl, imageUrl, way, onAsyncUpdate = noop } = props;
    if (!imageUrl) return <InvalidMessage />;
    return (
        <BaseAvatarMessage way={way} avatarUrl={avatarUrl}>
            <div className={styles.imageMessageBox}>
                <div className={styles.imageMessageContent}>
                    <img onLoad={onAsyncUpdate} className={styles.imageMessageImg} src={imageUrl} alt="img" />
                </div>
            </div>
        </BaseAvatarMessage>
    );
}

// 系统消息
function SystemMessage(props) {
    const { text } = props;
    if (!text) return <InvalidMessage />;
    return (
        <div className={styles.systemMessageBox}>
            <div className={styles.systemMessageText}>{text}</div>
        </div>
    );
}

// 不支持的消息
function UnsupportMessage() {
    return (
        <SystemMessage text="不支持的消息" />
    );
}

// 错误的消息
function InvalidMessage() {
    return (
        <SystemMessage text={"无效的消息"} />
    );
}