
import React, {Component} from 'reactn';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions,ImageBackground, Image, FlatList, TouchableOpacity} from 'react-native';
import { Actions, ActionConst } from "react-native-router-flux";


import Api from '../components/api';

import Loader from "./loader";
var Globals = require('../components/Globals');

import SearchBar from 'react-native-searchbar';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ionicon = (icon) => Platform.OS == 'ios' ? `ios-${icon}` : `md-${icon}`;

import HTML from 'react-native-render-html';

export default class Negozi extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            listaRicerca: [],
            textRicerca: ''

        }

    }
    componentDidMount() {


    }


    async getNegozi() {


        var risposta = await Api.get('webSite', '/wp-json/wp/v2/scheda_attivita?_embed&search='+this.state.textRicerca).then(resp => {
            return resp;
        })



        this.setState(
            {
                listaRicerca : risposta,
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
        return <TouchableOpacity  activeOpacity={1}  style={{ backgroundColor: 'white', width: Dimensions.get('window').width - 20, flexDirection:'row', height:150, margin: 10, ...Globals.centrato, ...Globals.shadow, borderRadius:10}}
                                 onPress={()=> Actions.negozio({title: '', id: item.id})}>
            <View style={{ backgroundColor: 'white', flex: .4, flexDirection:'column', height:150, ...Globals.centrato, ...Globals.shadow, borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
                <Image
                    source={ { uri: image }  }
                    style={{width: "90%" , height:  "90%", borderRadius: 5}}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{ backgroundColor: 'white',flex: .585, flexDirection:'column', height:150, ...Globals.shadow, justifyContent: 'center', paddingLeft:10}}>
                <HTML html={item.title.rendered } baseFontStyle={{fontSize: 17, fontWeight: 'bold', color: 'black', textAlign:'center'}} imagesMaxWidth={Dimensions.get('window').width} />

                <Text style={{fontSize: 12,  color: 'black', textAlign:'left'}}>{item.acf.mappa.address}</Text>
            </View>
            <View style={{ backgroundColor: Globals.colori.primary, flex: .015, flexDirection:'column', height:150, ...Globals.centrato, ...Globals.shadow, borderTopRightRadius:10, borderBottomRightRadius:10}}>
            </View>
        </TouchableOpacity>
    }

    render() {






        return (
            <View style={styles.container}>
                <SearchBar
                    focusOnLayout={true}
                    ref={(ref) => this.searchBar = ref}
                    showOnLoad
                    onBack={() => {
                        Actions.pop()
                    }}
                    onX={() => {this.setState({listaRicerca : [], endReached:true, textRicerca:'', search: false})}}
                    backgroundColor={Globals.colori.primary}
                    iconColor={'white'}
                    textColor={'white'}
                    placeholderTextColor={'#b0b0b0'}
                    placeholder={'Cerca...'}
                    autoCorrect={false}
                    backButton={<Ionicons name={ionicon('arrow-back')} style={{ marginTop: Platform.OS == 'ios' ? 2 : 0, marginLeft:5}} size={30} color='white'  />}
                    fontSize={20}
                    onSubmitEditing={() => {
                        this.setState({load : true, search: true}, () => {

                            this.getNegozi()

                        })
                    }}
                    handleChangeText={(input) => {
                        this.setState({textRicerca: input}, () => {
                            if(this.state.textRicerca.length == 0)
                                this.setState({search: false, listaRicerca : [], endReached:true, textRicerca:''})
                        } )
                    }}
                />
                {
                    this.state.load ?
                     <Loader/> :
                        <FlatList
                            style={{width: Globals.initialLayout.width,marginTop:60,}}
                            removeClippedSubViews
                            disableVirtualization
                            showsVerticalScrollIndicator={false}
                            data={this.state.listaRicerca}
                            initialNumToRender={7}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => {
                                return this.renderNegozi(item)
                            }}
                        />
                }




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
