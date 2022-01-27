import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import Btn from '../components/Btn'
import { API } from '../../config/api'
import Toast from 'react-native-toast-message';



export default function Login({navigation}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    //const [user,setUser] = useState('')

    const handleTextInput = async() => {
        setLoading(true)
        try {
            const data = {
                email,
                password
            }
            const config = {
                headers: {
                    'Content-type' : "application/json"
                }
            }
            
            const res = await API.post("/user/login", data, config)

            Toast.show({
                type: 'success',
                text1: "Login Success"
            })
    
            setTimeout(()=>{
                setLoading(false)
                
                const user = res.data.data

                setPassword('')
                setEmail('')
                navigation.navigate('ToDoList-Screen', {
                    screen: 'ToDoList',
                    params: { user: user.id },
                  });
            }, 700)
            
        } catch (err) {
            setLoading(false)
            setError(true)
            Toast.show({
                type: 'error',
                text1: error ? err.response.data.error.message : "There is error Please Try Again"
            })
        }
        
    }


    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header} >Login</Text>
            <TextInput style={styles.textInput} defaultValue={email} onChangeText={(text) => setEmail(text)} placeholder='Email' />
            <TextInput style={styles.textInput} defaultValue={password} onChangeText={(text) => setPassword(text)} placeholder='Password' />
            <Btn handleTextInput={handleTextInput} buttonText="Login" loading={loading}  bgColor="blue" />
            <Text onPress={()=>{navigation.navigate("Register")}}>Doesn't Have Account?? Click Here</Text>
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 24,
        marginBottom: 10
    },
    textInput: {
        height: 45,
        paddingLeft: 10,
        width: "70%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    }
})
