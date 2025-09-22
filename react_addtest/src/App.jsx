import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [network, setNetwork] = useState('');
  const [random, setRandom] = useState('');

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const data = event.data;
      if (typeof data === 'string') {
        if (data.startsWith('network:')) {
          setNetwork(data.replace('network:', ''));
        }
        if (data.startsWith('random:')) {
          setRandom(data.replace('random:', ''));
        }
      }
    });
  }, []);

  return (
    <div className="container">
      <h1>네트워크 상태 확인</h1>
      <button
        onClick={() => {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('getNetworkStatus');
          }
        }}
      >
        네트워크 상태 확인
      </button>
      <div style={{ marginTop: '20px', fontSize: '1.2em' }}>
        {network ? `네트워크 상태: ${network}` : '네트워크 상태를 확인하려면 버튼을 누르세요.'}
      </div>
      <hr />
      <h1>랜덤 숫자 요청</h1>
      <button
        onClick={() => {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('getRandomNumber');
            setRandom(''); // 요청 후 초기화
          }
        }}
      >
        랜덤 숫자 요청 (3초 후 응답)
      </button>
      <div style={{ marginTop: '20px', fontSize: '1.2em' }}>
        {random
          ? `랜덤 숫자: ${random}`
          : '랜덤 숫자를 받으려면 버튼을 누르세요.'}
      </div>
    </div>
  );
}

export default App;
