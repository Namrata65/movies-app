import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Movies from '@/app/screens/Movies';
import SearchResults from '@/app/screens/SearchResults';
import TvShows from '@/app/screens/TvShows';
const Tab = createMaterialTopTabNavigator();
const TopNavigation: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#56021F',
                tabBarIndicatorStyle: { backgroundColor: '#56021F' },
                tabBarStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="Search" component={SearchResults} />
            <Tab.Screen name="TV Shows" component={TvShows} />
        </Tab.Navigator>
    );
};
export default TopNavigation;