import { Alert, Image, Platform, StyleSheet, Text, ToastAndroid, View, } from "react-native";
import Constants from "expo-constants";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import ReservationScreen from "./ReservationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Icon } from "react-native-elements";
import logo from "../assets/images/logo.png";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import FavoriteScreens from "./FavoriteScreens";
import LoginScreen from "./LoginScreen";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: {backgroundColor: '#5637DD'}
};

const HomeNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="home"
                          component={HomeScreen}
                          options={({navigation}) => ({
                              title: 'Home',
                              headerLeft: () => (
                                  <Icon
                                      name="home"
                                      type="font-awesome"
                                      iconStyle={styles.stackIcon}
                                      onPress={() => navigation.toggleDrawer()}
                                  />
                              )
                          })}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={({navigation}) => ({
                    headerLeft: () => (
                        <Icon
                            name="info-circle"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ReservationNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Reservation"
                component={ReservationScreen}
                options={({navigation}) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name="tree"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const FavoritesNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Favorites"
                component={FavoriteScreens}
                options={({navigation}) => ({
                    title: 'Favorite Campsites',
                    headerLeft: () => (
                        <Icon
                            name="heart"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={({navigation, route}) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route),
                    headerLeft: () => (
                        <Icon
                            name={
                                getFocusedRouteNameFromRoute(route) ===
                                'Register' ?
                                    'user-plus' :
                                    'sign-in'
                            }
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Contact"
                component={ContactScreen}
                options={({navigation}) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name="address-card"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Directory"
            screenOptions={screenOptions}>
            <Stack.Screen
                name="Directory"
                component={DirectoryScreen}
                options={({navigation}) => ({
                    title: 'Campsite Directory',
                    headerLeft: () => (
                        <Icon
                            name="list"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
            <Stack.Screen
                name="CampsiteInfo"
                component={CampsiteInfoScreen}
                options={({route}) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image source={logo} style={styles.drawerImage}/>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Nucamp</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{fontWeight: 'bold'}}/>
    </DrawerContentScrollView>
);

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);

    useEffect(() => {
        /*
        This works.  :)
        Regarding the variable return discussion, see this SO post. Good discussion of each approach, pros and cons.
        https://stackoverflow.com/questions/31733811/local-variables-before-return-statements-does-it-matter#:~:text=Declaring%20a%20variable%20only%20to,name%20what%20is%20being%20returned
         */
        showNetInfo().then(() => {
            return NetInfo.addEventListener(
                (connectionInfo) => {
                    handleConnectivityChange(connectionInfo);
                }
            );
        });

        // Or....
        // showNetInfo(); //not using a then or catch block
        // And..

        const unsubscribeNetInfo  = NetInfo.addEventListener(
            (connectionInfo) => {
                handleConnectivityChange(connectionInfo);
            }
        );

        return unsubscribeNetInfo;
    }, []);

    const showNetInfo = async () => {
        const connectionInfo = await NetInfo.fetch();

        Platform.OS === 'ios' ? Alert.alert('Initial Network Connection Type:', connectionInfo.type) :
            ToastAndroid.show(
                'Initial Network Connectivity Type: ' + connectionInfo.type, ToastAndroid.LONG
            );
    };

    const handleConnectivityChange = (connectionInfo) => {
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.';
                break;
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.';
                break;
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.';
                break;
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.';
                break;
        }

        Platform.OS === 'ios' ? Alert.alert('Connection Change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    };

    return (
        <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={CustomDrawerContent}
                drawerStyle={{backgroundColor: '#CEC8ff'}}
            >
                <Drawer.Screen
                    name="Login"
                    component={LoginNavigator}
                    options={{
                        drawerIcon: ({color}) => (
                            <Icon
                                name="sign-in"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Home"
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({color}) => (
                            <Icon
                                name="home"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Directory"
                    component={DirectoryNavigator}
                    options={{
                        title: 'Campsite Directory',
                        drawerIcon: ({color}) => (
                            <Icon
                                name="list"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="ReserveCampsite"
                    component={ReservationNavigator}
                    options={{
                        title: 'Reserve Campsite',
                        drawerIcon: ({color}) => (
                            <Icon
                                name="tree"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Favorites"
                    component={FavoritesNavigator}
                    options={{
                        title: 'My Favorites',
                        drawerIcon: ({color}) => (
                            <Icon
                                name="heart"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="About"
                    component={AboutNavigator}
                    options={{
                        drawerIcon: ({color}) => (
                            <Icon
                                name="info-circle"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Contact"
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({color}) => (
                            <Icon
                                name="address-card"
                                type="font-awesome"
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;