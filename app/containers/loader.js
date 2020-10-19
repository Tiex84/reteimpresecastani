import React, { Component } from 'reactn';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';


export default class RandomLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentWillUnmount() {
    }


    render() {

        return (
            <View style={styles.container}>

                        <ActivityIndicator size="small" />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: "row"
    },
});