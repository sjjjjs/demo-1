import { useState } from 'react';
import MessageFlow from './component/MessageFlow/index';
import MessageTool from './component/MessageTool/index';
import styles from './app.module.css';

function App() {
  const [messages, setMessages] = useState([]);
  const appendMessage = m => setMessages(r => [...r, m]);
  return (
    <div className={styles.box}>
        <div className={styles.messageBox}>
          <MessageFlow messages={messages} autoScroll={true} />
        </div>
        <div className={styles.actionBox}>
          <MessageTool onMessage={appendMessage} />
        </div>
    </div>
  );
}

export default App;