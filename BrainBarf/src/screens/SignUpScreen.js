import { useState } from 'react';
import { StyleSheet, Text, View, Button, Touchable, TouchableWithoutFeedback, TextInput, SafeAreaView } from 'react-native';
import Navbar from '../components/Navbar';

const Success = async (navigation ) => {
  var now = new Date().getTime();
  const token = ["jwt-token", JSON.stringify("json.token")];
  const auth = ["isAuth", JSON.stringify(true)];
  const setup = ["setupTime", JSON.stringify(now)];
  await AsyncStorage.multiSet([token, auth, setup]);
  // console.log(await AsyncStorage.multiGet([token[0], auth[0], setup[0]]));
  navigation.navigate('Home');
};


export default function SignUp({ navigation }) {
  const [mailInput, onChangeMail] = useState('');
  const [passInput, onChangePass] = useState('');
  const [repPassInput, onChangeRepPass] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    // Passer på at alle felt er fylt ut
    if(mailInput === "") {
      setError("Tom E-post");
    } else if(passInput === "" || repPassInput === "") {
      setError("Tomt Passord");
    } else {
      // Setter opp headers
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
        fetch("http://localhost:3000/api/reg", {
          "method" : "POST",
          "headers": headers,
          "body": JSON.stringify({
            "mail": mailInput,
            "password": passInput,
            "r_password": repPassInput
          }) // et javascript-object kan vi gjøre til JSON med json-stringify
        }).then(function(response) {
          // Vi henter ut json-bodyen i responsen med .json()
          response.json().then(function(json) {
            if(json.token == "ugyldig mail") {
              setError("Ugyldig E-postadresse");
            } else if(json.token == "Passord matcher ikke") {
              setError("Passord er ikke like");
            } else {
              Success(navigation, json);
              // localStorage.setItem("jwt-token", json.token);
              // localStorage.setItem("isAuth", true);
              // localStorage.setItem('setupTime', now);
              // const token = localStorage.getItem('jwt-token');
              // console.log(token);
            };    
          });
        });
      };
      // console.log(error, "is tha error");
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

            <TextInput style={styles.inpBubble} placeholder="E-post" value={mailInput} onChangeText={onChangeMail}></TextInput>
            <TextInput style={styles.inpBubble} placeholder="Passord" secureTextEntry={true} value={passInput} onChangeText={onChangePass}></TextInput>
            <TextInput style={styles.inpBubble} placeholder="Gjenta passord" secureTextEntry={true} value={repPassInput} onChangeText={onChangeRepPass}></TextInput>

          </View>

          <TouchableWithoutFeedback onPress={() => submit()} >
            <View style={styles.darkBubble}>
              <Text style={styles.bTitle}>Lag en ny bruker!</Text>
            </View>
          </TouchableWithoutFeedback>
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
    backgroundColor: '#501b88',
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
    backgroundColor: '#461E71',
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
