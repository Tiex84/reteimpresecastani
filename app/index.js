import React, { Component } from 'reactn';
import {
    StatusBar,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    ToastAndroid,
    BackHandler,
    TouchableOpacity
} from 'react-native';

import { Router, Scene, Overlay, Drawer, Lightbox, modal, Stack, Actions, ActionConst, Tabs } from 'react-native-router-flux';

import Initial from './containers/initial';
import Home from './containers/home';
import Categorie from './containers/categorie';
import Negozi from './containers/negozi';
import Negozio from './containers/negozio';
import Ricerca from './containers/ricerca';
import Notizie from './containers/notizie';
import Notizia from './containers/notizia';
import Login from './containers/login';
import Registrazione from './containers/registrazione';
import Progetti from './containers/progetti';


import DrawerContent from './components/drawerContent';

const ionicon = (icon) => Platform.OS == 'ios' ? `ios-${icon}` : `md-${icon}`;
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var Globals = require('./components/Globals');


import OneSignal from 'react-native-onesignal';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            index : 1
        };

        }


    async hardwareBackPress() {

        const route = Actions.currentScene.replace('_', '');


        if (route === 'home') {
            //alert('ok')
            if (this.state.index == 1) {
                ToastAndroid.showWithGravityAndOffset(
                    'Premi di nuovo per uscire',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    200
                );
                this.state.index = 0;
            } else {
                this.state.index = 1;
                BackHandler.exitApp();
                return true;
            }

        }else {
            this.state.index = 1;
            Actions.pop()
        }

        return true;
    }

    componentDidMount() {
        //alert('entrato')
        BackHandler.addEventListener('hardwareBackPress', () => this.hardwareBackPress());
        //BackHandler.addEventListener('hardwareBackPress',this.BackButtonPressed.bind(this));
    }

    componentWillUnmount() {
        //alert('uscito')
        BackHandler.removeEventListener('hardwareBackPress', () => this.hardwareBackPress());
    }

    onBackNoti() {
        if (window.fromNotiIntial){
            window.fromNotiIntial = false;
            Actions.drawer();

        }else
            Actions.pop();
    }

    backButton = () => {
        return (
            <TouchableOpacity style={{ paddingLeft: 15, }} onPress={()=>this.onBackNoti()}>
                <Icon name={ionicon('arrow-back')} size={30} color='white' />
            </TouchableOpacity>
        );
    }


    renderBotton = () => {
        return (
            <View style={{flexDirection:'row', marginBottom: 8, marginRight: 5}}>

                <TouchableOpacity onPress={() => {
                    Actions.ricerca()
                } } style={{height: 40, alignItems: 'center',justifyContent: 'center', paddingRight: 5}} >
                    <Icon name={"ios-search"} size={30} color={"white"} />
                </TouchableOpacity>

            </View>
        );
    }


    render() {



        const navBarStyle = { color: 'white' };

        return (
            <Router key="RouterFlux" navigationBarStyle={styles.navBar} >
                <Overlay key="overlay">
                    <Lightbox key="lightbox">
                        <Scene key="root" animation='fade' headerMode={'screen'} >
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideNavBar={true} key="initial" component={Initial} title="Initial" />

                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="categorie" component={Categorie} title="Categorie" />
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="negozi" component={Negozi} title="Negozi" />
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="negozio" component={Negozio} title="Negozio" onBack={this.onBackNoti.bind(this)}/>
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="notizie" component={Notizie} title="Notizie" />
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="notizia" component={Notizia} title="Notizia" onBack={this.onBackNoti.bind(this)}/>
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="login" component={Login} title="Login" />
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="registrazione" component={Registrazione} title="Registrazione" />
                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="progetti" component={Progetti} title="Progetti" />



                            <Scene navigationBarStyle={{backgroundColor: Globals.colori.primary}} hideNavBar={true} hideDrawerButton titleStyle={navBarStyle} back renderBackButton={this.backButton} key="ricerca" component={Ricerca} title="Ricerca" />

                            <Drawer
                                type={ActionConst.REPLACE}
                                animation='fade'
                                //hideNavBar
                                key="drawer"
                                contentComponent={DrawerContent}
                                drawerWidth={300}
                                drawerIcon={<Icon name={ionicon('menu')} size={30} color={'white'} style={{marginBottom:7}} />}
                                titleStyle={styles.navigationBarTitleStyle}
                                navigationBarTitleImageStyle={{resizeMode: 'contain', height: 40, width: 120, marginBottom:8, alignItems: 'flex-start', padding:3, }}
                                renderRightButton={this.renderBotton()}
                                navigationBarStyle={{backgroundColor: Globals.colori.primary}}
                                navigationBarTitleImage={require('../assets/logo-ric33.png')}

                            >


                                <Scene hideNavBar={true}  key="home" component={Home} title="Home" type={ActionConst.REPLACE}/>


                            </Drawer>

                        </Scene>

                    </Lightbox>
                </Overlay>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'white',
    },
    tarBarStyle: {
        backgroundColor: '#FFFFFF',
        opacity: 0.5,
    },
    barButtonIconStyle: {
        tintColor: 'rgb(132,165,48)'
    },
    navigationBarTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'red',
    },
})