import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here
    // For simplicity, we navigate to the login screen after sign-up
    if (email && password) {
      alert('Account created successfully!');
      navigation.navigate('Login');
    } else {
      alert('Please enter a valid email and password.');
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#2196F3' }}>Already have an account? Log in!</Text>
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
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SignUpScreen;
