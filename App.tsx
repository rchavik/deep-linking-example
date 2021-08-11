import React from "react";
import { View, Text } from "react-native";
import { AlertsProvider } from "react-native-paper-alerts";
import { Provider } from "react-native-paper";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";

const TabB = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#cccccc' }}>
      <Text>Tab B</Text>
    </View>
)

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={ initialWindowMetrics }>
      <Provider>
        <AlertsProvider>
          <TabB />
        </AlertsProvider>
      </Provider>
    </SafeAreaProvider>
  );
}