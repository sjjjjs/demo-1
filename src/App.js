import { useState, useEffect, useRef } from 'react';
import Box from './component/MessageFlow/box';

function App() {
  const [list, setList] = useState([]);
  useInterval(() => {
    setList([...list, <div key={Date.now()}>hello {Date.now()}</div>])
  }, 150);
  return (
    <Box>{list}</Box>
  );
}

export default App;

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // 保存新回调
  useEffect(() => {
      savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
      function tick() {
          savedCallback.current();
      }
      if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
      }
  }, [delay]);
}