import React, { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const webviewRef = useRef<WebView>(null); // 타입 명시


  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'http://localhost:5173/' }}
        style={{ flex: 1 }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        onMessage={async (event) => {
          const message = event.nativeEvent.data;
          if (message === 'getNetworkStatus') {
            const state = await NetInfo.fetch();
            let networkType = '오프라인';
            if (state.isConnected) {
              if (state.type === 'wifi') networkType = 'Wi-Fi';
              else if (state.type === 'cellular') networkType = 'LTE';
              else networkType = state.type;
            }
            webviewRef.current?.postMessage(`network:${networkType}`);
          }
          if (message === 'getRandomNumber') {
            setTimeout(() => {
              const randomNumber = Math.floor(Math.random() * 100) + 1;
              webviewRef.current?.postMessage(`random:${randomNumber}`);
            }, 3000);
          }
        }}
      />
    </View>
  );
}