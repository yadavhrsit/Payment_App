import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/HomePage';
import Loginpage from './components/LoginPage';
import Registerpage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import Paymentpage from './components/PaymentPage';
import FingerprintScreen from './components/FingerPrint';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homepage} options={{ title: 'Home' }} />
        <Stack.Screen name="finger" component={FingerprintScreen} options={{ title: 'finger test' }} />
        <Stack.Screen name="Register">
          {(props) => <Registerpage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Loginpage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {(props) => <Dashboard {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Payment">
          {(props) => <Paymentpage {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
