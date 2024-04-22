import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement authentication logic here (e.g., checking credentials)
    // For simplicity, we just navigate to the home screen
    if (email && password) {
      navigation.navigate('Home');
    } else {
      alert('Please enter your email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={{ color: '#2196F3' }}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
