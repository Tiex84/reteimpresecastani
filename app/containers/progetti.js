
import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions,ImageBackground, Image, FlatList, TouchableOpacity} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');
import HTML from 'react-native-render-html';


export default class Negozi extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            negozi: []
        }

    }
    componentDidMount() {

        this.getNegozi()

    }


    async getNegozi() {


        var risposta = await Api.get('webSite', 'wp-json/wp/v2/progetti?_embed').then(resp => {
            return resp;
        })

        console.log(risposta)

        this.setState(
            {
                negozi : risposta,
                load: false

            }
        )

    }


    renderNegozi(item){

        var image = 'https://reteimpresecastani.com/wp-content/themes/rete-imprese-castani/img/placeholder.jpg';
        if(item.featured_media != 0){
            var _embedded = item._embedded;
            var link = _embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
            //var sizes = "https://dev.reteimpresecastani.com/wp-content/uploads/"+media_details.file;
            image = link;

        }
        return <TouchableOpacity activeOpacity={1} style={{ backgroundColor: 'white', width: Dimensions.get('window').width - 20, flexDirection:'row', height:150, margin: 10, ...Globals.centrato, ...Globals.shadow, borderRadius:10}}
                                 onPress={()=> Actions.notizia({title: '', notizia: item})}>
            <View style={{ backgroundColor: 'white', flex: .4, flexDirection:'column', height:150, ...Globals.centrato, ...Globals.shadow, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
                <Image
                    source={ { uri: image }  }
                    style={{width: "90%" , height:  "90%", borderRadius: 5}}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{ backgroundColor: 'white',flex: .585, flexDirection:'column', height:150, ...Globals.shadow, justifyContent: 'center', paddingLeft:10}}>
                <HTML html={item.title.rendered } baseFontStyle={{fontSize: 17, fontWeight: 'bold', color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

            </View>
            <View style={{ backgroundColor: Globals.colori.primary, flex: .015, flexDirection:'column', height:150, ...Globals.centrato, ...Globals.shadow, borderTopRightRadius:10, borderBottomRightRadius:10}}>
            </View>
        </TouchableOpacity>
    }

    render() {
        if(this.state.load)
            return <Loader/>;





        return (
            <View style={styles.container}>


                <FlatList
                    removeClippedSubViews
                    disableVirtualization
                    showsVerticalScrollIndicator={false}
                    style={{ width: Globals.initialLayout.width, }}
                    data={this.state.negozi}
                    initialNumToRender={7}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return this.renderNegozi(item)
                    }}
                />

            </View>
        );
    }
}

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
