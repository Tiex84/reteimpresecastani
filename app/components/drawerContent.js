import React from 'reactn';
import {
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
    Button,
    TouchableOpacity,
    ImageBackground,
    Platform,
    Linking, Alert, AsyncStorage, Image
} from 'react-native';

import { Actions,ActionConst } from 'react-native-router-flux';

var Globals = require('./Globals');

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';


class DrawerContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                <View style={[styles.container]}>

                    <ImageBackground style={styles.header}
                                     source={ require(`../../assets/images/menu.png`)  }
                                     imageStyle={{ borderRadius: 20 }}
                    >
                        <Image
                            source={ require(`../../assets/logo_ric.png`)  }
                            style={{width: "40%" , height:  "40%"}}
                            resizeMode={'contain'}
                        />

                    </ImageBackground>
                    <View style={styles.body}>
                        <TouchableOpacity style={{ flexDirection:'row', marginTop:30, marginLeft: 15 }} onPress={() => Actions.categorie()}>
                            <Icon name={'md-list'} size={35} color='black' style={{ width:40, paddingLeft:5 }} />
                            <Text style={{ paddingLeft:10,fontSize:18,color:'black', marginTop:3}} >Categorie</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection:'row', marginTop:20, marginLeft: 15 }} onPress={() => Actions.notizie({categories: 6}) }>
                            <MaterialCommunityIcons name={'map-legend'} size={35} color='black' style={{ width:40 }} />
                            <Text style={{ paddingLeft:10,fontSize:18,color:'black', marginTop:3}} >Dal quartiere</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection:'row', marginTop:20, marginLeft: 15 }} onPress={() => Actions.progetti()}>
                            <FontAwesome5 name={'money-bill-wave'} size={28} color='black' style={{ width:40 }} />
                            <Text style={{ paddingLeft:10,fontSize:18,color:'black', marginTop:3}} >Donazioni</Text>
                        </TouchableOpacity>

                        {
                            this.global.token != '' ?
                                <TouchableOpacity style={{ flexDirection:'row', marginTop:20, marginLeft: 15 }} onPress={() => Actions.notizie({categories: 27, title: 'Offerte'})}>
                                    <MaterialIcons name={'local-offer'} size={32} color='black' style={{ width:40, paddingLeft: 5 }} />
                                    <Text style={{ paddingLeft:10,fontSize:18,color:'black', marginTop:3}} >Offerte</Text>
                                </TouchableOpacity>
                                : null

                        }

                        {
                            this.global.token != '' ?
                                <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,
                                    height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'40%', marginTop: 40, ...Globals.centrato, alignSelf:'center'}}
                                                  onPress={()=>{
                                                      this.setGlobal({
                                                             token: '',
                                                        });

                                                      AsyncStorage.removeItem('token')
                                                  }}
                                >
                                    <Text style={{fontSize: 15, color: 'white',textAlign:'left', fontWeight: '500'}}>Logout</Text>

                                </TouchableOpacity>
                                : null

                        }

                    </View>
                    <View style={styles.footer}>


                    </View>
                </View>
        );
    }
}

// this.setGlobal({
//             token: '',
//
//
//         });
//
//
//
//         //AsyncStorage.removeItem('token')

//#595656
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: .35,
        ...Globals.centrato,
        width: '100%', height: '100%'
    },
    body:{
        flex: .55,
        paddingLeft:10
    },
    footer:{
        flex: .10,
        flexDirection: "row",
        //backgroundColor:'white'
    }
});

export default (DrawerContent);
