import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import AuthLoadingScreen from "./containers/AuthLoadingScreen";
import SignInScreen from "./containers/SignInScreen";
import HomeScreen from "./containers/HomeScreen";
import OtherScreen from "./containers/OtherScreen";
import TabNavigator from "./containers/TabNavigator";

const AppStack = createStackNavigator({
  Tab: TabNavigator,
  Home: HomeScreen,
  Other: OtherScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
