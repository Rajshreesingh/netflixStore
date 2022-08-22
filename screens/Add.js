import React, {useState} from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native'

import {
    NativeBaseProvider,
    Container,
    FormControl,
    formItem,
    Theme,
    Input,
    Button,
    HStack,
    ScrollView,
    Stack,
}
from 'native-base';
import { useNavigation } from '@react-navigation/native';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
const [name, setName] = useState('');
const [totalNoSeason, settotalNoSeason] = useState('');
const navigation = useNavigation();
const addToList = async () => {
    try {
        if(!name || !totalNoSeason){
            return alert('please add both feilds')
        }

        const seansonsToAdd = {
            id: shortid.generate(),
            name: name,
            totalNoSeason: totalNoSeason,
            isWatched: false,
        }

        const storedValues = await AsyncStorage.getItem('@season_list')
        const prevList = await JSON.parse(storedValues)

        if(!prevList){
            const newList = [seansonsToAdd]
            await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
        } else {
            prevList.push(seansonsToAdd)
            await AsyncStorage.setItem('@season_list', JSON.stringify(prevList))
       
        }
        
        
        navigation.navigate('Home');
    } catch (error) {
        console.log(error)
    }
}
return (
       <NativeBaseProvider>
        <Container style={styles.containers}>
            <ScrollView>
                
                <FormControl>
                    <Stack space={5}>
                        <Stack>
                        
                        <HStack alignItems="center">
                            <Text style={styles.heading} >Add to watch List</Text>
                        </HStack>
                        
                       
                        <Input variant="rounded" p={2} placeholder="Season name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{color:"#eee"}}
                        />
                        </Stack>
                        <Stack>
                        
                        <Input variant="rounded" p={2} placeholder="Total no of Seasons"
                        value={totalNoSeason}
                        onChangeText={(text) => settotalNoSeason(text)}
                        style={{color:"#eee"}}
                        />
                        <Button rounded={20} marginTop={10}
                        onPress={addToList}
                        >
                        <Text>ADD</Text>
                        </Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </ScrollView>
        </Container>
      </NativeBaseProvider>
    )
} 

export default Add

const styles = StyleSheet.create({
    containers:{
        backgroundColor:'#1b262c',
       
       flexDirection:'row',
       flex:1,
       flexGrow:1,
       justifyContent:'flex-start'

        
    },
    heading:{
        textAlign:'center',
        color:'#00b7c2',
        marginHorizontal:5,
        marginTop:50,
        marginBottom:20,
        fontSize:20

    },
    formItem:{
        marginBottom:20,
    },
});