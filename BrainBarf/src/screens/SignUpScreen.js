import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native';
import Navbar from '../components/Navbar';
import * as Keychain from 'react-native-keychain';
// import * as jwt from 'jsonwebtoken';
const CryptoJS = require("crypto-js");
const EncryptionKey = CryptoJS.SHA256("EncryptionKey").toString();


const Success = async (navigation ) => {
    // fixe jwt for auth og bruke keychain
    

    navigation.navigate('Home');
};

export default function SignUp({ navigation }) {
    const [nameInput, onChangeName] = useState('');
    const [mailInput, onChangeMail] = useState('');
    const [passInput, onChangePass] = useState('');
    const [repPassInput, onChangeRepPass] = useState('');
    const [error, setError] = useState('');

    const checkSamePass = () => {
        if (passInput === repPassInput){
            return true;
        } else {
            return false;
        };
    }

    const handleSubmit = () => {
        console.log("test")
        if (!checkSamePass()) {
            return;
        }
        const password = CryptoJS.SHA256(passInput).toString();
        console.log("encryption")
        const email = CryptoJS.AES.encrypt(mailInput, EncryptionKey).toString();
        
        console.log(email)
        console.log(password)
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        fetch("http://localhost:3000/api/register", {
            "method" : "POST",
            "headers": headers,
            "body": JSON.stringify({
                "name": nameInput,
                "mail": email,
                "password": password,
            }) // et javascript-object kan vi gjøre til JSON med json-stringify
        }).then(function(response) {
            response.json().then(function(json) {

            // Håndterer responsen
            // Vi henter ut json-bodyen i responsen med .json()
                console.log(json);
                if (json.message == "user created"){
                    Success(navigation);
                }
            })
        })
    };
    
  return (
      <SafeAreaView style={styles.container}>
        <Navbar />
        <View style={styles.inContainer}>
          <View style={styles.mainBubble}>
            <Text style={{fontWeight:"bold", fontSize:16,}}>Lag en bruker:</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>eller logge inn?</Text>
            </TouchableWithoutFeedback>

            <TextInput style={styles.inpBubble} placeholder="Brukernavn" value={nameInput} onChangeText={onChangeName}></TextInput>
            <TextInput style={styles.inpBubble} placeholder="E-post" value={mailInput} onChangeText={onChangeMail} keyboardType='email-address'></TextInput>
            <TextInput style={styles.inpBubble} placeholder="Passord" secureTextEntry={true} value={passInput} onChangeText={onChangePass}></TextInput>
            <TextInput style={styles.inpBubble} placeholder="Gjenta passord" secureTextEntry={true} value={repPassInput} onChangeText={onChangeRepPass}></TextInput>

          </View>

          <TouchableOpacity onPress={() => handleSubmit()} >
            <View style={styles.darkBubble}>
              <Text style={styles.bTitle}>Lag en ny bruker!</Text>
            </View>
          </TouchableOpacity>
          <View></View>
        </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#27272A',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#FF10FF80',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainBubble: {
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical : 40,
    borderRadius: parseFloat("30%"),
    maxWidth: '100%',
    borderColor: '#461E71',
    borderWidth: 3,
    margin: 25,
  },
  inpBubble: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200, 
    padding: 10,
    borderColor: "#27272A",
    borderWidth: 3,
    borderRadius: parseFloat("30%"),
    maxWidth: '100%',
    margin: 25,
  },
  darkBubble: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#27272A',
    borderRadius: parseFloat("30%"),
    borderColor: '#27272A',
    borderWidth: 4,
    maxWidth: '75%',
  },
  bTitle: {
  color: "white", 
  fontWeight:'bold',
  fontSize: 20,
  },
  Title: {
  color: "white", 
  fontSize: 19,
  },
  border: {
    borderWidth: 5,
    borderColor: "#352349",
  },
  linkText: {
    color: "#501bb8",
    fontSize: 14,
  }
});
