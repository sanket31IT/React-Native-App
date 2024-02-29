import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';

const EmailAndPasswordValidation = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password fields cannot be blank');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password should be 8 characters or longer');
      return;
    }

    if (
      (email === 'shreyash.b@sankeysolutionscom' && password === 'Shrey@12') ||
      (email === 'ashwin.s@sankeysolutionscom' && password === 'ash@1005')
    ) {
      navigation.navigate('Home', { email: email });
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')} // Adjust the path to your circle logo image
        style={styles.logo}
      />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Enter Email"
        placeholderTextColor="black"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={{ height: 20 }} />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Enter Password"
        placeholderTextColor="black"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <View style={{ height: 50 }} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDA0DD',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 20,
    padding: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'pink',
    height: 50,
    width: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmailAndPasswordValidation;
