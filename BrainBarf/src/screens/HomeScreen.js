import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Touchable, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Navbar from '../components/Navbar';



export default function Intro({ navigation }) {
  return (
      <SafeAreaView style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: '#27272A',}} >
        <Navbar />
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF10FF80',}} >

            <View>
                <Text>DU LOGGET INN</Text>
            </View>
            <StatusBar style="light" />
        </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
});

