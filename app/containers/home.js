
import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions,ImageBackground, Image, TouchableOpacity} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');
import HTML from 'react-native-render-html';


export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            schede_att: [],
            categorie: [],
            notizie: [],
            offerte: []
        }

    }
    componentDidMount() {

        this.getScheda_attivita()

    }

    async getScheda_attivita() {
        const params = {
            per_page: 100,
        };

        var risposta = await Api.get('webSite', 'wp-json/wp/v2/scheda_attivita?_embed', params).then(resp => {
            return resp;
        })

        this.shuffle(risposta);

        var json = risposta.slice(0, 10);


        this.setState(
            {
                schede_att : json,
            }
        )

        this.getCategorie()
    }

    async getCategorie() {
        const params = {
            per_page: 6,
        };

        var risposta = await Api.get('webSite', 'wp-json/wp/v2/tipologia_attivita?', params).then(resp => {
            return resp;
        })



        this.setState(
            {
                categorie : risposta,
            }
        )

        this.getNotizie()
    }

    async getNotizie() {
        const params = {
            per_page: 2,
        };

        var risposta = await Api.get('webSite', 'wp-json/wp/v2/posts?_embed&categories=6', params).then(resp => {
            return resp;
        })



        this.setState(
            {
                notizie : risposta,
                load: false
            }
        )

        this.getOfferte()
    }


    async getOfferte() {
        const params = {
            per_page: 6,
        };

        var risposta = await Api.get('webSite', 'wp-json/wp/v2/posts?_embed&categories=27', params).then(resp => {
            return resp;
        })



        this.setState(
            {
                offerte : risposta,
                load: false

            }
        )

    }

    shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    render() {
        if(this.state.load)
            return <Loader/>;


            var icons = {
                'abbigliamento' : require(`../../assets/icons/abbigliamento.png`),
                'alimentari' : require(`../../assets/icons/alimentari.png`),
                'articoli-sportivi' : require(`../../assets/icons/articoli-sportivi.png`),
                'bar' : require(`../../assets/icons/bar.png`),
                'calzature' : require(`../../assets/icons/calzature.png`),
                'centro-benessere' : require(`../../assets/icons/centro-benessere.png`),
                'edicola' : require(`../../assets/icons/edicola.png`),
                'erboristeria' : require(`../../assets/icons/erboristeria.png`),
                'estetica' : require(`../../assets/icons/estetica.png`),
                'fotografo' : require(`../../assets/icons/fotografo.png`),
                'giocheria' : require(`../../assets/icons/giocheria.png`),
                'mail' : require(`../../assets/icons/mail.png`),
                'monitor' : require(`../../assets/icons/monitor.png`),
                'onoranze-funebri' : require(`../../assets/icons/onoranze-funebri.png`),
                'ottica' : require(`../../assets/icons/ottica.png`),
                'parrucchiere' : require(`../../assets/icons/parrucchiere.png`),
                'pasticceria' : require(`../../assets/icons/pasticceria.png`),
                'phone-call' : require(`../../assets/icons/phone-call.png`),
                'pizzeria' : require(`../../assets/icons/pizzeria.png`),
                'profumeria' : require(`../../assets/icons/profumeria.png`),
                'puff' : require(`../../assets/icons/puff.png`),
                'servizi-immobiliari' : require(`../../assets/icons/servizi-immobiliari.png`),
                'studio-medioc' : require(`../../assets/icons/studio-medico.png`),
                'vendita-ambulante' : require(`../../assets/icons/vendita-ambulante.png`),
                'farmacia' : require(`../../assets/icons/farmacia.png`),
                'assicurazioni' : require(`../../assets/icons/assicurazioni.png`),

            }
        var placeholder = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';
        return (
            <ScrollView style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ backgroundColor: Globals.colori.primary, height: 240, width:Dimensions.get('window').width }}>
                    {

                        this.state.schede_att.map( (s, i) => {
                            var image = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';
                            if(s.featured_media != 0){
                                var _embedded = s._embedded;
                                var link = _embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
                                //var sizes = "https://dev.reteimpresecastani.com/wp-content/uploads/"+media_details.file;
                                image = link;

                            }
                            return  <TouchableOpacity activeOpacity={1} key={'hash'+i} style={[{margin:20, backgroundColor:'white', borderRadius: 20, width: 340, ...Globals.shadow
                            }]} onPress={(event) => {
                                Actions.negozio({title: '', id: s.id})
                            }}
                            >
                                <ImageBackground
                                    source={{ uri:  image  }}
                                    style={{width: '100%', height: '100%', flex: 1, borderRadius: 20, ...Globals.centrato}}
                                    imageStyle={{ borderRadius: 20 }}
                                >
                                    <View style={{width: '100%', height: '100%',flex:1, borderRadius: 20, backgroundColor:'rgba(135,135,135,0.25)', ...Globals.centrato}}>

                                    </View>
                                    <View style={{top:0, left:0, right:0, bottom:0, position:'absolute', borderRadius: 20, ...Globals.centrato}}>
                                        <HTML html={s.title.rendered } baseFontStyle={{fontSize: 25, fontWeight: 'bold', color: 'white', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />


                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>
                <ImageBackground style={{ backgroundColor: 'white', height: 366, width:Dimensions.get('window').width, ...Globals.centrato }}
                                 source={ require(`../../assets/bg-onda.png`)  }
                                 resizeMode="cover"
                >
                    <View style={{ backgroundColor: 'white', height: 350, width:Dimensions.get('window').width-20, borderRadius: 5, flexDirection:'column',...Globals.shadow }}>
                        <View style={{ backgroundColor: 'red', height: 300, width:Dimensions.get('window').width-20, ...Globals.centrato, borderTopRightRadius: 5,borderTopLeftRadius: 5}}>

                            <View style={{ backgroundColor: 'white', flex:.15, width:Dimensions.get('window').width-20, borderTopRightRadius: 5,borderTopLeftRadius: 5, }}>
                                <Text style={{fontSize: 22, color: 'black', marginLeft: 10, textAlign:'left', marginTop:10, fontWeight: '500'}}>Cerca tra le categorie</Text>

                            </View>
                            <View style={{ backgroundColor: 'white', flex:.85, width:Dimensions.get('window').width-20, ...Globals.centrato}}>
                                <View style={{ flex:.5, width:Dimensions.get('window').width-20, ...Globals.centrato, flexDirection:'row'}}>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.negozi({id_negozio : this.state.categorie[0].id})}
                                    >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ icons[this.state.categorie[0].slug]  }
                                                style={{width: "70%" , height:  "70%"}}
                                                resizeMode={'contain'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[0].name}</Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.negozi({id_negozio : this.state.categorie[1].id})}
                                    >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ icons[this.state.categorie[1].slug]  }
                                                style={{width: "70%" , height:  "70%"}}
                                                resizeMode={'contain'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[1].name}</Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.negozi({id_negozio : this.state.categorie[2].id})}
                                    >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ icons[this.state.categorie[2].slug]  }
                                                style={{width: "70%" , height:  "70%"}}
                                                resizeMode={'contain'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[2].name}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex:.5, width:Dimensions.get('window').width-20, ...Globals.centrato, flexDirection:'row'}}>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.negozi({id_negozio : this.state.categorie[3].id})}
                                    >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ icons[this.state.categorie[3].slug]  }
                                                style={{width: "70%" , height:  "70%"}}
                                                resizeMode={'contain'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[3].name}</Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                          onPress={()=> Actions.negozi({id_negozio : this.state.categorie[4].id})}
                                        >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                                            <Image
                                                                source={ icons[this.state.categorie[4].slug]  }
                                                                style={{width: "70%" , height:  "70%"}}
                                                                resizeMode={'contain'}
                                                            />

                                                        </View>
                                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[4].name}</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.3333333, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.negozi({id_negozio : this.state.categorie[5].id})}
                                    >
                                        <View style={{ backgroundColor: 'white', flex:.8, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                                            <Image
                                                                source={ icons[this.state.categorie[5].slug]  }
                                                                style={{width: "70%" , height:  "70%"}}

                                                                resizeMode={'contain'}
                                                            />

                                                        </View>
                                                        <View style={{ backgroundColor: 'white', flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                                            <Text style={{fontSize: 15, color: 'black', textAlign:'center'}}>{this.state.categorie[5].name}</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white',height:10}}/>
                        <View style={{ backgroundColor: 'white',height:40, borderBottomRightRadius: 5,borderBottomLeftRadius: 5,flexDirection:'row'}}>
                            <View style={{ backgroundColor: 'white',flex:.7, borderBottomRightRadius: 5,borderBottomLeftRadius: 5}}>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,marginRight:-0.5,  flex:.3, borderBottomRightRadius: 5,borderTopLeftRadius: 20, height:'100%', ...Globals.centrato}}
                                  onPress={()=> Actions.categorie()}
                            >
                                <Text style={{fontSize: 15, color: 'white', marginLeft: 5, textAlign:'left', fontWeight: '500'}}>Vedi tutte</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <View style={{ backgroundColor: 'white', height: this.global.token != '' ? 366 : 200, width:Dimensions.get('window').width, ...Globals.centrato, paddingBottom: 20, marginTop: 30}}>
                    {
                        this.global.token != '' ?
                            (
                                this.state.offerte.length > 0 ?
                                    <View style={{ backgroundColor: 'white', height: 350, width:Dimensions.get('window').width-20, borderRadius: 5, flexDirection:'column',...Globals.shadow }}>
                                        <View style={{ backgroundColor: 'red', height: 300, width:Dimensions.get('window').width-20, ...Globals.centrato, borderTopRightRadius: 5,borderTopLeftRadius: 5}}>

                                            <View style={{ backgroundColor: 'white', flex:.2, width:Dimensions.get('window').width-20, borderTopRightRadius: 5,borderTopLeftRadius: 5, }}>
                                                <Text style={{fontSize: 22, color: 'black', marginLeft: 10, textAlign:'left', marginTop:10, fontWeight: '500'}}>Offerte</Text>

                                            </View>
                                            <View style={{ backgroundColor: 'white', flex:.8, width:Dimensions.get('window').width-20, ...Globals.centrato}}>
                                                <View style={{ flex:1, width:Dimensions.get('window').width-20, ...Globals.centrato, flexDirection:'row'}}>
                                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.5, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                                      onPress={()=> Actions.notizia({title: '', notizia: this.state.offerte[0]})}>
                                                        <View style={{ backgroundColor: 'white', flex:.7, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                                            <Image
                                                                source={ { uri : this.state.offerte[0]._embedded['wp:featuredmedia'] ? this.state.offerte[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : placeholder }  }
                                                                style={{width: "90%" , height:  "90%"}}
                                                                resizeMode={'cover'}
                                                            />

                                                        </View>
                                                        <View style={{ backgroundColor: 'white', flex:.3, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                                            <HTML html={this.state.offerte[0].title.rendered} baseFontStyle={{fontSize: 14, color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.5, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                                      onPress={()=> Actions.notizia({title: '', notizia: this.state.offerte[1]})}>

                                                    <View style={{ backgroundColor: 'white', flex:.7, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                                            <Image
                                                                source={ { uri : this.state.offerte[1]._embedded['wp:featuredmedia'] ? this.state.offerte[1]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : placeholder }  }
                                                                style={{width: "90%" , height:  "90%"}}
                                                                resizeMode={'cover'}
                                                            />

                                                        </View>
                                                        <View style={{ backgroundColor: 'white', flex:.3, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                                            <HTML html={this.state.offerte[1].title.rendered} baseFontStyle={{fontSize: 14, color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                                                        </View>
                                                    </TouchableOpacity>

                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: 'white',height:10}}/>
                                        <TouchableOpacity style={{ backgroundColor: 'white',height:40, borderBottomRightRadius: 5,borderBottomLeftRadius: 5,flexDirection:'row'}}
                                                          onPress={()=> Actions.notizie({categories: 27, title: 'Offerte'})} >
                                            <View style={{ backgroundColor: 'white',flex:.7, borderBottomRightRadius: 5,borderBottomLeftRadius: 5}}>
                                            </View>
                                            <View style={{ backgroundColor: Globals.colori.primary,marginRight:-0.5,  flex:.3, borderBottomRightRadius: 5,borderTopLeftRadius: 20, height:'100%', ...Globals.centrato}}>
                                                <Text style={{fontSize: 15, color: 'white', marginLeft: 5, textAlign:'left', fontWeight: '500'}}>Vedi tutte</Text>

                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    :  <Text style={{fontSize: 18, color: 'black', marginLeft: 10, textAlign:'left' }}>Nessuna offerta trovata</Text>
                            )

                            : <View style={{ backgroundColor: 'white', height: 200, width:Dimensions.get('window').width-20, borderRadius: 5, flexDirection:'column',...Globals.shadow, ...Globals.centrato }}>

                                    <View style={{ backgroundColor: 'white', flex:.2, width:Dimensions.get('window').width-20, borderTopRightRadius: 5,borderTopLeftRadius: 5, }}>
                                        <Text style={{fontSize: 22, color: 'black', marginLeft: 10, textAlign:'left', marginTop:10, fontWeight: '500'}}>Offerte</Text>

                                    </View>
                                    <View style={{ backgroundColor: 'white', flex:.8, width:Dimensions.get('window').width-20, ...Globals.centrato, borderBottomRightRadius: 5, borderBottomLeftRadius: 5}}>
                                        <Text style={{fontSize: 18, color: 'black', marginLeft: 10, textAlign:'left' }}>Accedi per le offerte</Text>
                                        <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,
                                            marginTop: 10,
                                            height: 40, width: 140,  borderRadius: 10, ...Globals.centrato}}
                                                          onPress={()=> Actions.login()}
                                        >
                                            <Text style={{fontSize: 15, color: 'white',textAlign:'left', fontWeight: '500'}}>Login</Text>

                                        </TouchableOpacity>
                                    </View>



                            </View>

                    }
                </View>

                <View style={{ backgroundColor: 'white', height: 366, width:Dimensions.get('window').width, ...Globals.centrato }}>
                    <View style={{ backgroundColor: 'white', height: 300, width:Dimensions.get('window').width-20, borderRadius: 5, flexDirection:'column',...Globals.shadow }}>
                        <View style={{ backgroundColor: 'white', height: 250, width:Dimensions.get('window').width-20, ...Globals.centrato, borderTopRightRadius: 5,borderTopLeftRadius: 5}}>

                            <View style={{ backgroundColor: 'white', flex:.2, width:Dimensions.get('window').width-20, borderTopRightRadius: 5,borderTopLeftRadius: 5, }}>
                                <Text style={{fontSize: 22, color: 'black', marginLeft: 10, textAlign:'left', marginTop:10, fontWeight: '500'}}>Le notize dal quartiere</Text>

                            </View>
                            <View style={{ backgroundColor: 'white', flex:.8, width:Dimensions.get('window').width-20, ...Globals.centrato}}>
                                <View style={{ flex:1, width:Dimensions.get('window').width-20, ...Globals.centrato, flexDirection:'row'}}>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.5, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.notizia({title: '', notizia: this.state.notizie[0]})}>
                                        <View style={{ backgroundColor: 'white', flex:.7, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ { uri : this.state.notizie[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }  }
                                                style={{width: "90%" , height:  "90%"}}
                                                resizeMode={'cover'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.3, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <HTML html={this.state.notizie[0].title.rendered} baseFontStyle={{padding:7, fontSize: 14, color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'white', flex:.5, flexDirection:'column', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}
                                                      onPress={()=> Actions.notizia({title: '', notizia: this.state.notizie[0]})}>
                                        <View style={{ backgroundColor: 'white', flex:.7, flexDirection:'row', height:'100%', width:'100%', ...Globals.centrato}}>
                                            <Image
                                                source={ { uri : this.state.notizie[1]._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }  }
                                                style={{width: "90%" , height:  "90%"}}
                                                resizeMode={'cover'}
                                            />

                                        </View>
                                        <View style={{ backgroundColor: 'white', flex:.3, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                                            <HTML html={this.state.notizie[1].title.rendered} baseFontStyle={{padding:7, fontSize: 14, color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white',height:10}}/>
                        <View style={{ backgroundColor: 'white',height:40, borderBottomRightRadius: 5,borderBottomLeftRadius: 5,flexDirection:'row'}}>
                            <View style={{ backgroundColor: 'white',flex:.7, borderBottomRightRadius: 5,borderBottomLeftRadius: 5}}>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: Globals.colori.primary,marginRight:-0.5,  flex:.3, borderBottomRightRadius: 5,borderTopLeftRadius: 20, height:'100%', ...Globals.centrato}}
                                  onPress={()=> Actions.notizie({categories: 6})} >
                                <Text style={{fontSize: 15, color: 'white', marginLeft: 5, textAlign:'left', fontWeight: '500'}}>Vedi tutte</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
