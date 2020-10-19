
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
            email: this.state.username,
            password: this.state.password
        };

        //var risposta = await Api.post('webSite', 'wp-json/wp/v2/users/register', params).then(resp => {
          //  return resp;
       // })






        let url = 'https://reteimpresecastani.com/wp-json/wp/v2/users/register';

        let verb = 'POST'
        let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'dataType': 'json' };
        let isEmpty = Object.keys(params).length === 0;
        let body = (isEmpty || verb == 'GET') ? null : new FormData();

        for (var key in params) {
            if (verb == 'GET')
                url += '&' + key + '=' + params[key];
            else {
                if (key == "picture") {
                    body.append('picture', { uri: params[key], name: 'photo.jpg', filename: 'imageName.jpg', type: 'image/jpg' });
                    body.append('Content-Type', 'image/jpg');
                }
                else
                    body.append(key, params[key]);
            }
        }
        body = JSON.stringify(params);
        var options = { method: verb, headers: headers, body: body };
        console.log(url)
        console.log(options)


        fetch(url, options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson) {

                    this.setState({ load: false})
                    if(responseJson.code == '200'){
                        Alert.alert(
                            "Complimenti",
                            "Registrazione avvenuta con successo.",
                            [

                                {text: "chiudi",
                                    onPress: () => {
                                        Actions.pop()

                                    },

                                    style: 'cancel'}],
                            {cancelable: false}
                        )
                    }else {


                        Alert.alert(
                            "Attenzione",
                            responseJson.message.replace(/(<([^>]+)>)/ig,""),
                            [

                                {text: "chiudi",
                                    onPress: () => {
                                        //BackHandler.exitApp();
                                    },

                                    style: 'cancel'}],
                            {cancelable: false}
                        )

                    }



                } else {
                    //messaggio di errore alert
                }
            })
            .catch((error) => {
                //console.error(error);
            });



    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
                    placeholder={'email'}
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

                                  if (this.state.username != '' && this.state.password != '') {
                                      if (this.validateEmail(this.state.username)) {
                                          this.setState({load: true}, () => {
                                              this.login()
                                          })
                                      }else{
                                          Alert.alert(
                                              "Attenzione",
                                              "Email non valida",
                                              [
                                                  {text: "chiudi",
                                                      onPress: () => {
                                                          //BackHandler.exitApp();
                                                      },
                                                      style: 'cancel'}],
                                              {cancelable: false}
                                          )
                                      }
                                  }
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
                    <Text style={{fontSize: 20, color: 'white',textAlign:'left', fontWeight: '500'}}>Registrati</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    backgroundColor={"transparent"}
                    style={{ justifyContent: "flex-end" }}
                    onPress={() => Linking.openURL('https://reteimpresecastani.com/privacy-policy/')}
                >
                    <Text pointerEvents="none" style={{ color: 'black', fontWeight: 'bold', fontSize: 17, textDecorationLine: "underline", marginTop:10}}>Privacy</Text>
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
