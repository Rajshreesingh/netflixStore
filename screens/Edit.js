import React,{useState, useEffect} from 'react'
import {
  
    StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { 
    NativeBaseProvider,
    Text,
    Container,
    FormControl,
    formItem,
    Theme,
    Input,
    Button,
    HStack,
    ScrollView,
    Stack,
 } from 'native-base';
 import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({route}) => {
    const [name, setName] = useState('')
    const [totalNoSeason, setTotalNoSeason] = useState('')
    const [id, setId] = useState(null)
    const navigation = useNavigation();
    const update = async () => {
        try {
            if (!name || !totalNoSeason) {
               return alert("Please enter value in both") 
            }

            const seasontoUpdate = {
                id,
                name,
                totalNoSeason,
                isWatched:false
            }

            const storedValues = await AsyncStorage.getItem('@season_list')
        
            const list = await JSON.parse(storedValues)

            list.map((singleSeason) => {
                if (singleSeason.id == id) {
                    singleSeason.name = name;
                    singleSeason.totalNoSeason = totalNoSeason;
                    
                }
                return singleSeason;

            })

            await AsyncStorage.setItem('@season_list', JSON.stringify(list))
        
            navigation.navigate('Home') 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const {season} = route.params
        const {id, name, totalNoSeason} = season
        setId(id)
        setName(name)
        setTotalNoSeason(totalNoSeason)
    }, [])
    return (
        <NativeBaseProvider>
        <Container style={styles.containers}>
            <ScrollView>
                
                <FormControl>
                    <Stack space={5}>
                        <Stack>
                        
                        <HStack alignItems="center">
                            <Text style={styles.heading} >Edit to watch List</Text>
                        </HStack>
                        
                       
                        <Input variant="rounded" p={2} placeholder="Season name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.inpText}
                        />
                        </Stack>
                        <Stack>
                        
                        <Input variant="rounded" p={2} placeholder="Total no of Seasons"
                        value={totalNoSeason}
                        onChangeText={(text) => setTotalNoSeason(text)}
                        style={{color:"#eee"}}
                        />
                        <Button rounded={20} marginTop={10}
                        onPress={update}
                        >
                        <Text>Update</Text>
                        </Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </ScrollView>
        </Container>
      </NativeBaseProvider>
    )
} 

export default Edit

const styles = StyleSheet.create({
    containers:{
        backgroundColor:'#ffffff',
       
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
    inpText:{
        color:'#ffffff'
    }
});