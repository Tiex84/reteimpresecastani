/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator, Image, AsyncStorage} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";
var Globals = require('../components/Globals');
import LinearGradient from 'react-native-linear-gradient';
import OneSignal from "react-native-onesignal";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super();

        this.state = {
            index : 1,

        };


        this.setGlobal({
            noti: true
        });

        OneSignal.init("ab891b7b-7e94-4b0b-b14a-e08789ea8ee9");

        this.onReceived = this.onReceived.bind(this);
        this.onOpened = this.onOpened.bind(this);
        this.onIds = this.onIds.bind(this);


        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {

    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        if(this.global.noti){
            this.setGlobal({
                noti: false
            });
        }

        window.fromNotiIntial = true;

        AsyncStorage.getItem('token', (err, result) => {
            if ( result == null ){

                if(openResult.notification.payload.additionalData.post_type == 'post' && openResult.notification.payload.additionalData.cat[0] == 6)
                    Actions.notizia({id: openResult.notification.payload.additionalData.id});

            }else{
                if(openResult.notification.payload.additionalData.post_type == 'post')
                    Actions.notizia({id: openResult.notification.payload.additionalData.id});
            }

        }).done();

        if(openResult.notification.payload.additionalData.post_type == 'scheda_attivita')
            Actions.negozio({title: '', id: openResult.notification.payload.additionalData.id});
        else
            Actions.drawer()
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    componentDidMount() {


        AsyncStorage.getItem('token', (err, result) => {
            if ( result == null ){
                this.setGlobal({
                    token: '',


                });
            }else{
                this.setGlobal({
                    token: result,

                });
            }

        }).done();





        //AsyncStorage.removeItem('token')


        setTimeout(() => {
            if(this.global.noti)
                Actions.drawer()
        }, 6000)

    }

    render() {

        StatusBar.setBarStyle('light-content', true);

        if (Platform.OS == 'android')
        	StatusBar.setBackgroundColor('#ff575a');


        return (
            <LinearGradient  colors={['#ff575a', '#BC53B5']} style={styles.container}>
                <Image
                    source={ require(`../../assets/logo_ric.png`)  }
                    style={{width: "20%" , height:  "20%"}}
                    resizeMode={'contain'}
                />
                <Text style={{fontSize: 25, fontWeight:'bold', color: 'white', textAlign:'center'}}>Rete Imprese Castani</Text>
                <Text style={{fontSize: 17,  color: 'white', textAlign:'center',  marginBottom: 30, marginTop:5}}>Ridiamo valore al nostro quartiere</Text>

                <ActivityIndicator size="small" />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Globals.colori.primary,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
