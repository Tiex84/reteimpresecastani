import React, { Component } from 'reactn';
import {
    Dimensions,
    Platform
} from 'react-native';


module.exports = {
    centrato: {justifyContent: 'center',alignItems: 'center'},
    textArray: {
        big: {fontSize: 22,},
        medium: {fontSize: 16,},
        small:{fontSize: 10},
        alert:{fontSize: 12},
        home:{fontSize: Platform.OS == 'ios' ? 13 : 13},
    },
    initialLayout: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    validateEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    shadow:{
        shadowColor: "#666",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    colori:{
        primary: "#ff575a",
        secondary: "#72161f",
        dark_gray: "#2d2d2d",
        gray: "#F8F8F8",
        medium_gray: "#999999",
        light_gray: "#f3f3f3",
        dark_blue: "#30373d",
        darkness_blue: "#202528"
    }


};