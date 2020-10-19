
import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions,ImageBackground, Image, FlatList, TouchableOpacity, WebView, Linking} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');



import HTML from 'react-native-render-html';



export default class Negozio extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: this.props.id ? true : false,
            negozio: [],
            notizia: this.props.notizia
        }

    }
    componentDidMount() {

        if(this.props.id)
            this.getInfo()
    }

    async getInfo() {


        var risposta = await Api.get('webSite', 'wp-json/wp/v2/posts/'+this.props.id+'?_embed').then(resp => {
            return resp;
        })



        this.setState(
            {
                notizia : risposta,
                load: false

            }
        )

        console.log(risposta)

    }





    render() {
        if(this.state.load)
            return <Loader/>;


        var image = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';
        if(this.state.notizia.featured_media != 0){
            var _embedded = this.state.notizia._embedded;
            var link = _embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
            //var sizes = "https://dev.reteimpresecastani.com/wp-content/uploads/"+media_details.file;
            image = link;

        }


        return (
            <ScrollView style={styles.container}>
                <View style={{height:300,  width:Dimensions.get('window').width}}>

                    <Image
                        source={ { uri: image }  }
                        style={{width: "100%" , height:  "100%"}}
                        resizeMode={'cover'}
                    />


                </View>

                <View style={{height:100,  width:Dimensions.get('window').width, marginTop: 20, ...Globals.centrato, marginLeft:15, marginRight:15}}>
                    <HTML html={this.state.notizia.title.rendered } baseFontStyle={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />


                </View>



                <View style={{width:Dimensions.get('window').width - 30, marginTop: 10, marginLeft: 15, marginRight:15}}>
                    {
                        this.state.notizia.content.rendered.length > 0 ?
                            <HTML html={this.state.notizia.content.rendered } baseFontStyle={{ fontSize: 18,  }} imagesMaxWidth={Dimensions.get('window').width} /> : null
                    }


                </View>


                {
                    this.state.notizia.acf.gofundme_url ? <View style={{width:Dimensions.get('window').width, marginTop: 10, marginLeft: 15, marginRight:15, ...Globals.centrato}}>
                        <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,
                            height: 50, borderColor: Globals.colori.primary, borderWidth: 1, borderRadius: 15, width:'40%', marginTop: 20, ...Globals.centrato}}
                                          onPress={()=> {
                                              Linking.canOpenURL( this.state.notizia.acf.gofundme_url ).then(supported => {
                                                  if (supported) {
                                                      Linking.openURL(  this.state.notizia.acf.gofundme_url );
                                                  } else {
                                                      console.log('Don\'t know how to open URI: ');
                                                  }
                                                  return false
                                              });
                                          }
                                          }
                        >
                            <Text style={{fontSize: 20, color: 'white',textAlign:'left', fontWeight: '500'}}>Dona ora!</Text>

                        </TouchableOpacity>

                    </View> : null
                }


                <View style={{width:Dimensions.get('window').width - 30, marginTop: 30, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>



                </View>
            </ScrollView>
        );
    }
}
//replace(/(<([^>]+)>)/ig,"")   acf
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
