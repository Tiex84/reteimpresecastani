
import React, {Component} from 'reactn';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    AsyncStorage, Linking
} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');
import HTML from 'react-native-render-html';


export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            username:'',//'admin',
            password:''//'8YG)b088FFN0N6LtELk8vG!Z'

        }

    }
    componentDidMount() {


    }

    async login() {

        const params = {
            username: this.state.username,
            password: this.state.password
        };

        var risposta = await Api.post('webSite', 'wp-json/jwt-auth/v1/token', params).then(resp => {
            return resp;
        })


        this.setState({ load: false})
        if(risposta.message){
            Alert.alert(
                "Attenzione",
                risposta.message.replace(/(<([^>]+)>)/ig,""),
                [
                   /* {text: "Reimposta password",
                    onPress: () => {
                        //BackHandler.exitApp();
                    },

                    style: 'cancel'},*/
                    {text: "chiudi",
                        onPress: () => {
                            //BackHandler.exitApp();
                        },

                        style: 'cancel'}],
                {cancelable: false}
            )
        }else {

            AsyncStorage.setItem('token',risposta.token, () => {});

            this.setGlobal({
                token: risposta.token,
                user_display_name: risposta.user_display_name
            });
            Actions.pop()
        }

        console.log(risposta)

    }



    render() {





        return (
            <View style={styles.container}>
                <Image
                    source={ require(`../../assets/logo_ric.png`)  }
                    style={{width: 100 , height:  100, marginBottom: 50}}
                    resizeMode={'contain'}
                />

                <TextInput
                    style={{height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'70%', paddingLeft:15}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    placeholder={'username'}
                />

                <TextInput
                        style={{height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'70%', marginTop: 20, paddingLeft:15}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                        placeholder={'password'}
                        secureTextEntry={true}


                />

                <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,
                    height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'70%', marginTop: 20, ...Globals.centrato}}
                                  onPress={()=>  {
                                      if (this.state.username != '' && this.state.password != '')
                                       this.setState({load : true}, () => { this.login()})
                                  else
                                  Alert.alert(
                                        "Attenzione",
                                    "Compila tutti i campi",
                                        [
                                        {text: "chiudi",
                                            onPress: () => {
                                            //BackHandler.exitApp();
                                        },
                                            style: 'cancel'}],
                                        {cancelable: false}
                                        )
                }}
                >
                    <Text style={{fontSize: 20, color: 'white',textAlign:'left', fontWeight: '500'}}>Login</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,
                height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'70%', marginTop: 20, ...Globals.centrato}}
                onPress={()=>{
                    /*Linking.canOpenURL("https://reteimpresecastani.com/wp-login.php?action=register").then(supported => {
                        if (supported) {
                            Linking.openURL("https://reteimpresecastani.com/wp-login.php?action=register");
                        } else {
                            console.log('Don\'t know how to open URI: ');
                        }
                        return false
                    });*/
                    Actions.registrazione()
                }}
                >
                <Text style={{fontSize: 20, color: 'white',textAlign:'left', fontWeight: '500'}}>Registrati</Text>

            </TouchableOpacity>

                {
                    this.state.load ? <View style={styles.container_ab}>

                        <Loader/>

                    </View> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        ...Globals.centrato
    },
    container_ab: {
        flex: 1,
        backgroundColor: '#595e61',
        position:'absolute',
        opacity:0.2,

        top:0,
        left:0,
        right:0,
        bottom:0
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
