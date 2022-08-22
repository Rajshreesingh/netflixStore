import React, {useState, useEffect} from 'react'
import {
    
    StyleSheet,
    ScrollView,
    FlatList,
   TouchableOpacity,
} from 'react-native'

import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {  NativeBaseProvider, Fab, 
    List,
    Text,
    InputRightAddon,
    InputLeftAddon,
    Container,
    Button,
    VStack,
    HStack,
    Heading,
    Stack,
    Box,
    View,
    Center,
    CheckIcon,
    IconButton,
    Checkbox,
Spinner,
Image,
Wrap,

    
 } from 'native-base';
 import AsyncStorage from '@react-native-async-storage/async-storage';


import { NativeBaseConfigProvider } from 'native-base/lib/typescript/core/NativeBaseContext'
import { FloatingAction } from "react-native-floating-action";
import {FAB} from 'react-native-fab'

const Home = ({navigation, route}) => {
    const [listOfSeasons, setListOfSeasons] = useState([])
    const [loading, setLoading] = useState([false])
    
    const isFocused = useIsFocused()
    const getList = async () =>{
        setLoading(true)

        const storeValue = await AsyncStorage.getItem('@season_list')
        if(!storeValue){
            setListOfSeasons([])
        }
        const list = JSON.parse(storeValue)
        setListOfSeasons(list)
        setLoading(false)
    }

    const deleteSeasons = async (id) =>{
        const newList = await listOfSeasons.filter((list) => list.id !==id)
    
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
        setListOfSeasons(newList)
    }

    const markComplete = async (id) => {
        const newArr = listOfSeasons.markComplete((list) =>{
            if(list.id == id){
                list.isWatched = !list.isWatched
            }
            return list
        })

        
        await AsyncStorage.setItem('', JSON.stringify(newArr))
        setListOfSeasons(newArr)
    }
    useEffect(() => {
        getList();
    }, [isFocused])
    if(loading){
        return(
            <NativeBaseProvider>
            <Container>
                <Spinner color="#00b7c2"></Spinner>
            </Container>
            </NativeBaseProvider>
        )
    }
    return (
        <NativeBaseProvider>
       <ScrollView contentContainerStyle={styles.containers}>
            {listOfSeasons.length == 0 ? (
                <Container style={styles.containers}>
                    <Text style={{color:"#fff"}}>
                        Watchlist list is empty Please add Seansons
                    </Text>
                </Container>
            ) :(
              
                <View>
                <Text style={styles.headings}>Next series to Watch</Text>
                {listOfSeasons.map((season) => (
                    <List key={season.id} style={styles.listItem}>
                
                    <HStack space={2} width='100%'>
                        <Button style={styles.actionButton}

                        onPress={() => deleteSeasons(season.id)}
                        >
                            <Icon  name="trash" size={20} color='#fff'  active  />
                        </Button>
                        <Button style={styles.actionButton}
                        onPress={() => {navigation.navigate('Edit', {season})
                                }}
                        >
                            <Icon  name="edit" size={20} color='#fff'  active  />
                        </Button>
                        <Text style={styles.seasonName}>{season.name}</Text>
                        <Text style={styles.seasonName}> {season.totalNoSeason}</Text>
                       
                        <Checkbox _checked={season.isWatched}
                        onPress={() => markComplete(season.id)}
                        ></Checkbox>
                    </HStack>
                    
                   
                </List>
                ))}
                </View>
               
               
            )}
<View style={styles.bottom}>
<View>
        <Image
            // FAB using TouchableOpacity with an image
            // For online image
            /*source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}*/
            // For local image
            source={require('../assets/netflix-logo-small.png')}
            style={styles.floatingLogo}
            
          />
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        borderRadius='3xl'>
        <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
            
          />
          
        </TouchableOpacity>
        
        </View>
        </ScrollView>
       </NativeBaseProvider>
    )
} 

export default Home


const styles = StyleSheet.create ({
    emptyContainers:{
        backgroundColor: '#1b262c',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    containers:{
        backgroundColor:'#ffffff',
        flex:1,
    },
    headings:{
        textAlign:'center',
        color:'#00b7c2',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    actionButton:{
        marginLeft:5,
        justifyContent:'flex-start',
       flexWrap:'wrap',
       width:40,
       //backgroundColor:'#f00',
       marginBottom:10,

    },
    seasonName:{
        color:'#fdcb9e',
        textAlign:'justify',
    },
    listItem:{
        marginLeft:0,
        marginBottom:20,
        borderWidth:0
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
       marginLeft:200,
       marginTop:30
        
        
        //backgroundColor:'#5067FF',
       
      },
      floatingLogo: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
        marginRight:10,
        
        //backgroundColor:'#5067FF',
       
      },
      button: {
        backgroundColor: '#859a9b',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      bottom:{
          flexDirection:'row'
      }

});