import React from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import axios from "axios"; // const axios = require('axios');
import { Ionicons } from "@expo/vector-icons";

class HomeScreen extends React.Component {
  state = {
    tab: [],
    update: false
  };
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
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
  Update = () => {
    console.log(this.state.update);
    while (this.state.update === false) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 250
          }}
        >
          <ActivityIndicator size="large" color="#ea3554" />
          <Text>Update</Text>
        </View>
      );
    }
  };
  goTo = id => {
    this.props.navigation.navigate("Other", { id: id });
  };

  render() {
    return (
      <View>
        {this.Update()}
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#dbdbdb",
                marginLeft: 10,
                marginRight: 10
              }}
            />
          )}
          data={this.state.tab.rooms}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.goTo(item._id)}
              style={styles.page}
            >
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.photos[0]
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    bottom: 40,
                    height: 60,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "white", fontSize: 30 }}>
                    {item.price} €
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: 250,
                  marginRight: 50
                }}
              >
                <Text numberOfLines={1} style={styles.text}>
                  {item.title}
                </Text>
                <Image
                  style={styles.image2}
                  source={{
                    uri: item.user.account.photos[0]
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: -110,
                  marginTop: -20,
                  flexDirection: "row"
                }}
              >
                {this.ettoile(item.ratingValue)}
                <Text
                  style={{
                    marginTop: 7,
                    marginLeft: 10,
                    color: "grey"
                  }}
                >
                  {item.reviews} reviews
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  componentDidMount = async () => {
    try {
      // On charge les données ici
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      this.setState({ tab: response.data, update: true });
    } catch (error) {}
  };
}
let styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    marginBottom: 20,
    position: "relative"
  },
  image2: {
    height: 50,
    width: 50,
    borderRadius: 30
  },
  page: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30
  },
  text: {
    fontSize: 20,
    marginRight: 5
  }
});

export default HomeScreen;
