
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
            load: true,
            negozio: []
        }

    }
    componentDidMount() {

        this.getNegozio()

    }


    async getNegozio() {


        var risposta = await Api.get('webSite', 'wp-json/wp/v2/scheda_attivita/'+this.props.id+'?_embed').then(resp => {
            return resp;
        })



        this.setState(
            {
                negozio : risposta,
                load: false

            }
        )

        console.log(risposta)

    }


    callNumber = (url) =>{
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }


    render() {
        if(this.state.load)
            return <Loader/>;


        var image = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';
        if(this.state.negozio.featured_media != 0){
            var _embedded = this.state.negozio._embedded;
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

                <View style={{height:100,  width:Dimensions.get('window').width, marginTop: 20, ...Globals.centrato}}>
                    <HTML html={this.state.negozio.title.rendered } baseFontStyle={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                    <Text style={{fontSize: 17,  color: 'black', textAlign:'center'}}>{this.state.negozio.acf.mappa.address}</Text>

                </View>

                <View style={{height:100,  width:Dimensions.get('window').width, marginTop: 5, flexDirection:'row', ...Globals.centrato}}>

                    {
                        this.state.negozio.acf.telefono != '' ?

                            <TouchableOpacity style={{
                                backgroundColor: 'white',
                                flex: .3333333,
                                flexDirection: 'column',
                                height: '100%',
                                width: '100%',
                                margin: 10, ...Globals.centrato
                            }}
                                              onPress={() => this.callNumber(`tel:+39${this.state.negozio.acf.telefono}`)}
                            >
                                <View style={{
                                    backgroundColor: 'white',
                                    flex: .8,
                                    flexDirection: 'row',
                                    height: '100%',
                                    width: '100%', ...Globals.centrato
                                }}>
                                    <Image
                                        source={require(`../../assets/phone-call.png`)}
                                        style={{width: "70%", height: "70%"}}
                                        resizeMode={'contain'}
                                    />

                                </View>
                                <View style={{
                                    backgroundColor: 'white',
                                    flex: .2,
                                    flexDirection: 'row',
                                    height: '100%',
                                    width: '100%',
                                    margin: 10, ...Globals.centrato
                                }}>
                                    <Text style={{fontSize: 15, color: 'black', textAlign: 'center'}}>Chiama</Text>

                                </View>
                            </TouchableOpacity> : null
                    }
                    {
                        this.state.negozio.acf.email != '' ?
                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                      onPress={()=> Linking.openURL('mailto:'+this.state.negozio.acf.email) }
                    >
                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                            <Image
                                source={require(`../../assets/mail.png`)  }
                                style={{width: "80%" , height:  "80%"}}
                                resizeMode={'contain'}
                            />

                        </View>
                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>Contatta</Text>

                        </View>
                    </TouchableOpacity>
                            : null
                    }
                    {
                        this.state.negozio.acf.sito_internet != '' ?
                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                      onPress={()=>  {
                                          Linking.canOpenURL( this.state.negozio.acf.sito_internet.url).then(supported => {
                                              if (supported) {
                                                  Linking.openURL( this.state.negozio.acf.sito_internet.url);
                                              } else {
                                                  console.log('Don\'t know how to open URI: ');
                                              }
                                              return false
                                          });
                                      }
                                      }
                    >
                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                            <Image
                                source={require(`../../assets/monitor.png`)  }
                                style={{width: "100%" , height:  "100%"}}
                                resizeMode={'contain'}
                            />

                        </View>
                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>Sito web</Text>

                        </View>
                    </TouchableOpacity> : null}


                </View>




                <View style={{width:Dimensions.get('window').width - 30, marginTop: 40, marginLeft: 15, marginRight:15}}>
                    {
                        this.state.negozio.content.rendered.length > 0 ?
                            <HTML html={this.state.negozio.content.rendered } baseFontStyle={{ fontSize: 18,  }} imagesMaxWidth={Dimensions.get('window').width} /> : null
                    }


                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 10, marginLeft: 15, marginRight:15}}>

                    <Text style={{fontSize: 20, fontWeight:'bold', color: 'black', textAlign:'left'}}>Orari:</Text>

                </View>
                <View style={{width:Dimensions.get('window').width - 30, marginTop: 10, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>lunedi:</Text>
                    {
                        this.state.negozio.acf.lunedi.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.lunedi.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                        }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>martedi:</Text>
                    {
                        this.state.negozio.acf.martedi.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.martedi.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>mercoledi:</Text>
                    {
                        this.state.negozio.acf.mercoledi.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.mercoledi.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>giovedi:</Text>
                    {
                        this.state.negozio.acf.giovedi.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.giovedi.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>venerdi:</Text>
                    {
                        this.state.negozio.acf.venerdi.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.venerdi.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>sabato:</Text>
                    {
                        this.state.negozio.acf.sabato.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :

                            this.state.negozio.acf.sabato.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <View style={{width:Dimensions.get('window').width - 30, marginTop: 2, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>

                    <Text style={{fontSize: 17, fontWeight:'bold', color: 'black'}}>domenica:</Text>
                    {
                        this.state.negozio.acf.domenica.chiusura ? <Text style={{fontSize: 15,  color: 'black'}}>   Chiuso</Text> :
                        this.state.negozio.acf.domenica.orari.map( (s, i) => {
                            return <Text key={i} style={{fontSize: 15,  color: 'black'}}>   {s.apertura} {s.chiusura ? s.chiusura : ''}</Text>
                            }
                        )
                    }

                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ backgroundColor: 'white', height: this.state.negozio.acf.gallery.length > 0 ? 240 : 0, width:Dimensions.get('window').width, marginTop: 10 }}>
                    {
                        this.state.negozio.acf.gallery.length > 0 ?

                        this.state.negozio.acf.gallery.map( (s, i) => {
                            var image = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';

                            return  <View activeOpacity={1} key={'hash'+i} style={[{margin:20, backgroundColor:'white', width: 340, ...Globals.shadow
                            }]}
                            >
                                <ImageBackground
                                    source={{ uri:  s.url  }}
                                    style={{width: '100%', height: '100%', flex: 1, borderRadius: 20, ...Globals.centrato}}
                                    //imageStyle={{ borderRadius: 20 }}
                                >


                                </ImageBackground>
                            </View>
                        })

                            : null
                    }
                </ScrollView>


                <View style={{width:Dimensions.get('window').width - 30, marginTop: 30, marginLeft: 15, marginRight:15, ...Globals.centrato, flexDirection:'row'}}>



                </View>
            </ScrollView>
        );
    }
}
//replace(/(<([^>]+)>)/ig,"")
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
