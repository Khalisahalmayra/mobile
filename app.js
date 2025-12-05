import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screen
import Home from './screens/HomeScreen';
import Wishlist from './screens/WishlistScreen';
import Categories from './screens/CategoriesScreen';
import Notification from './screens/NotificationScreen';
import Profile from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { paddingBottom: 5, height: 60 },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wishlist" component={Wishlist} />
        <Tab.Screen name="Kategori Buku" component={Categories} />
        <Tab.Screen name="Notifikasi" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
