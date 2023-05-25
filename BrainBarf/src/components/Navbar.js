import { StyleSheet,  SafeAreaView, Image, TouchableWithoutFeedback, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Navbar({}) {
    return (
        <SafeAreaView style={styles.navbar}>
        <View></View>
        <Text style={{fontWeight: 'bold', color: '#FF10F0', fontSize: 30}}>BB</Text>
        <View></View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Text: {
      color: "#fff"
    },
    navbar: {
      width: '100%',
      maxHeight: 50,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: '#27272A',
      alignSelf: 'flex-start',
      paddingVertical: 5,
      flexDirection: 'row',
    },
    bText: {
      fontWeight: "bold", 
      fontSize: 32,
      color: "#fff"
    },
    logo: {
      maxHeight: 25,
      maxWidth: 38,
    },
  });