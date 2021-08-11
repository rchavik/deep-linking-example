import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, LinkingOptions, useLinkTo, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Linking from "expo-linking";
import { AlertsProvider } from "react-native-paper-alerts";
import { Provider } from "react-native-paper";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";

const prefix = Linking.makeUrl("/");
const linking: LinkingOptions = {
  prefixes: [prefix],
  config: {
    screens: {
      SidebarRight: {
        path: '',
      },
      HomeStack: {
        path: '',
        initialRouteName: 'Home',
        screens: {
          Home: {
            path: 'tabs',
            screens: {
              TabA: 'tab-a',
              TabB: 'tab-b',
            },
          },
          Profile: {
            path: "user/:id",
            parse: {
              id: id => `there, ${id}`,
            },
            stringify: {
              id: id => id.replace("there, ", ""),
            },
          },
        },
      },
      Settings: "settings",
    },
  },
};

const LeftDrawer = createDrawerNavigator();

const SidebarLeft = (props: any) => {
  return (
    <LeftDrawer.Navigator
      drawerPosition='left'
      drawerContent={(props) => {
        return (
          <View>
            <Text>Left Drawer</Text>
          </View>
        )
      }}
    >
      <LeftDrawer.Screen name='SidebarRight' component={ SidebarRight } />
    </LeftDrawer.Navigator>
  )
}

const RightDrawer = createDrawerNavigator();

const SidebarRight = (props: any) => {
  return (
    <RightDrawer.Navigator
      drawerPosition='right'
      drawerContent={(props) => {
        return (
          <View>
            <Text>Right Drawer</Text>

          </View>
        )
      }}
    >
      <RightDrawer.Screen name='HomeStack' component={ HomeStack } />
    </RightDrawer.Navigator>
  )
}

function Profile({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Profile
      </Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the Settings Page.</Text>
    </View>
  );
}

const HomeStack = (props: any) => {
  const MyStack = createStackNavigator();

  return (
    <MyStack.Navigator>
      <MyStack.Screen name="Home" component={Tabs} />
      <MyStack.Screen name="Profile" component={Profile} />
      <MyStack.Screen name="Settings" component={Settings} />
    </MyStack.Navigator>
  );
};

const Buttons = ({navigation}) => {
  return (
    <>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')} 
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")} 
      />

      <Button
        title="Open Left Drawer"
        onPress={() => navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().openDrawer() }
      />

      <Button
        title="Open Right Drawer"
        // onPress={() => navigation.navigate('SidebarRight') }
        onPress={() => navigation.openDrawer() }
      />
    </>
  )
}

const TabA = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tab A</Text>
      <Buttons navigation={ navigation }/>
    </View>
  )
};

const TabB = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tab B</Text>
    </View>
)

const MyTabs = createMaterialTopTabNavigator();

const Tabs = () => (
  <MyTabs.Navigator>
    <MyTabs.Screen name="TabA" component={ TabA } />
    <MyTabs.Screen name="TabB" component={ TabB } />
  </MyTabs.Navigator>
)


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={ initialWindowMetrics }>
      <Provider>
        <AlertsProvider>
          <NavigationContainer linking={ linking }>
            <SidebarLeft />
          </NavigationContainer>
        </AlertsProvider>
      </Provider>
    </SafeAreaProvider>
  );
}