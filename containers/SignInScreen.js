import React from "react";
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios"; // const axios = require('axios');
import { Constants, Location, Permissions } from "expo";

class SignInScreen extends React.Component {
  state = { user: "", password: "", errorMessage: null };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  onPress = async () => {
    try {
      // On charge les données ici
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        { email: this.state.user, password: this.state.password }
      );

      await AsyncStorage.setItem("userToken", "abc");
      this.props.navigation.navigate("App");
      console.log(response.data);
    } catch (error) {
      alert("Probleme de Conexion");
    }
  };
  ettoile = rate => {
    let tab = [];
    for (let i = 1; i <= 5; i++) {
      tab.push(
        <Ionicons key={i + "star"} name="md-star" size={30} color="grey" />
      );
    }
    for (let i = 0; i <= Number(rate) - 1; i++) {
      tab[i] = (
        <Ionicons key={i + "star"} name="md-star" size={30} color="#fecc02" />
      );
    }
    //console.log(tab);
    return tab;
  };
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location
      });
    }
  };

  render() {
    return (
      <View style={styles.fullscreen}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.Keyboar}
          keyboardVerticalOffset="300"
        >
          <MaterialIcons name="home" size={100} color="white" />
          <Text style={styles.welcome}>Welcome</Text>
          <View style={{ width: 250 }}>
            <TextInput
              style={styles.input}
              onChangeText={user => this.setState({ user })}
              value={this.state.user}
            />
            <TextInput
              style={styles.input}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 30,
              height: 60,
              width: 150,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.onPress}
          >
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
  componentDidMount() {
    this.getLocationAsync();
  }
}

let styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "#FF4F55",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50,
    fontSize: 20,

    color: "white"
  },
  welcome: {
    marginBottom: 40,
    marginTop: 50,
    fontSize: 30,
    color: "white",
    fontSize: 40
  },
  login: {
    color: "#FF4F55",
    fontSize: 30
  },
  Keyboar: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default SignInScreen;
