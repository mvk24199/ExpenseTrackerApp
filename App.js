import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen from './components/AddExpenseScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{ title: 'Add Expense' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
