import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD9WCySkXTfvNbRQ_m_YXyudjf_mV4S3WQ",
    authDomain: "chat-app-b727d.firebaseapp.com",
    projectId: "chat-app-b727d",
    storageBucket: "chat-app-b727d.appspot.com",
    messagingSenderId: "677296032456",
    appId: "1:677296032456:web:6014c62458e33dc982b3fd"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;