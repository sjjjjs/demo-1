import React, { useState } from 'react';
import Box from './box';
import Message from './message';

export default function MessageFlow(props) {
    const { messages = [], autoScroll = true } = props;
    const [ imageLoadedCount, setImageLoadedCount ] = useState(0);
    return (
        <Box autoScroll={autoScroll} imageLoadedCount={imageLoadedCount}>
            {
                messages.map(
                    message =>
                        <Message
                            onAsyncUpdate={() => setImageLoadedCount(r =>r+ 1)} 
                            key={message.id}
                            {...message}
                        />
                )
            }
        </Box>
    );
}