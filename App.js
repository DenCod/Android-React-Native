import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import ListEmployee from './src/screens/ListEmployee';
import CreateEmployee from './src/screens/CreateEmployee';
import EditEmployee from './src/screens/EditEmployee';

// Buat Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListEmployee} options={{ title: 'List Karyawan' }} />
          <Stack.Screen name="Create" component={CreateEmployee} options={{ title: 'Tambah Karyawan' }} />
          <Stack.Screen name="Update" component={EditEmployee} options={{ title: 'Edit Karyawan' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;