import React, { Component } from 'react'
import ReactNative, {BackHandler} from 'react-native'
import { Router, Scene } from 'react-native-router-flux';


import {
    Alert,Platform
} from 'react-native';



var Globals = require('./Globals');


var Hosts = {
    webSite : "https://reteimpresecastani.com/",
}

var headersTypes = {
    false : {'Accept': 'application/json', 'Content-Type': 'multipart/form-data', 'dataType': 'json',},
    true : {'Accept': 'application/json', 'Content-Type': 'multipart/form-data',"otherHeader": "foo"}
}




class Api extends Component {
    constructor(props) {
        super(props);


    }






    static get(route, api, params = {}) {
        return this.xhr(route, api, params, 'GET');
    }

    static post(route, api, params = {}) {
        return this.xhr(route, api, params, 'POST')
    }

    static xhr(route, api, params, verb) {



        let url = Hosts[route] + api;// + (window.token ? "?token="+window.token : "?");
        let headers = headersTypes[("picture" in params || "back" in params || "front" in params || "selfie" in params)];
        let isEmpty = Object.keys(params).length === 0;
        let body = (isEmpty || verb == 'GET') ? null : new FormData();

        let stringsP = ''


        for (var key in params) {
            if(key != "picture" || key != "back" || key != "front" || key != "selfie")
                stringsP += ' - ' + key + '=' + params[key];

            if(verb == 'GET')
                url += '&' + key + '=' + params[key];
            else {
                if(key == "picture" || key == "back" || key == "front" || key == "selfie")
                {
                    //body.append(key, params[key])
                    body.append(key, {uri: params[key],name: 'photo.jpg',filename :'imageName.jpg',type: 'image/jpg'});
                    body.append('Content-Type', 'image/jpg');
                }
                else
                    body.append(key, params[key]);
            }
        }

        var options = { method: verb , headers: headers, body: body};
        //console.log(options)
        // this.props.setSpinner(false);
        console.log('link ' + url);

        // if(url == 'http://192.168.1.162:8000/api/confirmOrder?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8yMTIuNDcuMjM3Ljg2XC9hcGlcL2xvZ2luIiwiaWF0IjoxNTMxNDY4NzQ4LCJuYmYiOjE1MzE0Njg3NDgsImp0aSI6IjJpZm01SFY0cTdIMnpHalAiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.2FcG06StdS86cgDrQ9wuoXIm7JapiE-5AenV1zgD1WM')
        //   url = 'http://requestbin.fullcontact.com/s3ae4ws3'

        return fetch(url, options)
            .then((response) => response.json()
                .then((responseJson) => {

                    //alert(responseJson.length)

                    if (responseJson || responseJson === 0){



                        return responseJson;
                    }




                    this.alertCustom();
                    return {};
                }))
            .catch((error) => {
                this.alertCustom();
                return {};
            });


    }



    static alertCustom(){

        Alert.alert(
            "Attention",
            "Connection error! Try again!",
            [
                {text: "close",
                    onPress: () => {
                        //BackHandler.exitApp();
                    },
                    style: 'cancel'}],
            {cancelable: false}
        );


    }
}
export default Api;
