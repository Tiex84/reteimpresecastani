
import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions,ImageBackground, Image, FlatList, TouchableOpacity} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');


export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            categorie: [],
        }

    }
    componentDidMount() {

        this.getCategorie()

    }


    async getCategorie() {
        const params = {
            per_page: 100,
        };

        var risposta = await Api.get('webSite', 'wp-json/wp/v2/tipologia_attivita?', params).then(resp => {
            return resp;
        })



        this.setState(
            {
                categorie : risposta,
                load: false

            }
        )

    }


    renderCategoria(item){
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
            'gioielleria' : require(`../../assets/icons/gioielleria.png`),
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
            'studio-medico' : require(`../../assets/icons/studio-medico.png`),
            'vendita-ambulante' : require(`../../assets/icons/vendita-ambulante.png`),
            'farmacia' : require(`../../assets/icons/farmacia.png`),
            'assicurazioni' : require(`../../assets/icons/assicurazioni.png`),

        }

        return <TouchableOpacity  activeOpacity={1} style={{  width: Dimensions.get('window').width / 3.5, flexDirection:'column', height:170, margin: 10, ...Globals.centrato}}
                   onPress={()=> Actions.negozi({id_negozio : item.id})}>
            <View style={{  flex:.8, flexDirection:'row', ...Globals.centrato,}}>
                <View style={{  flex:.8, flexDirection:'row', ...Globals.centrato, width:  100 , height: 87, borderRadius: 50, backgroundColor:'white', ...Globals.shadow}}>
                    <Image
                        source={ icons[item.slug]  }
                        style={{width: "50%" , height:  "50%", backgroundColor: 'white'}}
                        resizeMode={'contain'}
                    />

                </View>

            </View>
            <View style={{flex:.2, flexDirection:'row', height:'100%', width:'100%', margin: 10, ...Globals.centrato}}>
                <Text numberOfLines={2} style={{fontSize: 15, color: 'black', textAlign:'center'}}>{item.name}</Text>

            </View>
        </TouchableOpacity>
    }

    render() {
        if(this.state.load)
            return <Loader/>;





        return (
            <ImageBackground style={styles.container}
                             source={ require(`../../assets/images/menu.png`)  }
                             imageStyle={{resizeMode: 'repeat'}}
            >


                <FlatList
                    numColumns={3}
                    removeClippedSubViews
                    disableVirtualization
                    showsVerticalScrollIndicator={false}
                    style={{ width: Globals.initialLayout.width, }}
                    data={this.state.categorie}
                    initialNumToRender={7}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return this.renderCategoria(item)
                    }}
                />

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       width: '100%', height: '100%',
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
