import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import Btn from '../components/Btn'
import { API } from '../../config/api'
import Toast from 'react-native-toast-message';

export default function Register({navigation}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    //const [user,setUser] = useState('')

    const handleTextInput = async() => {
        setLoading(true)
        try {
            const data = {
                email,
                password,
                username
            }
            const config = {
                headers: {
                    'Content-type' : "application/json"
                }
            }
            
            const res = await API.post("/user/register", data, config)

            Toast.show({
                type: 'success',
                text1: "Register Success"
            })
    
            setTimeout(()=>{
                setLoading(false)
                //setUser(res.data.data)
                const user = res.data.data
                //alert(user.id)
                setEmail('')
                setPassword('')
                setUsername('')
                navigation.navigate("ToDoList-Screen", {screen: "ToDoList",params: {user: user.id}})
            }, 700)
            
        } catch (err) {
            setLoading(false)
            setError(err.response?.data.error.message)
            Toast.show({
                type: 'error',
                text1: error ? error : "Something Occured Please Try Agin"
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header} >Register</Text>
            <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)} placeholder='Email' />
            <TextInput style={styles.textInput} onChangeText={(text) => setPassword(text)} placeholder='Password' />
            <TextInput style={styles.textInput} onChangeText={(text) => setUsername(text)} placeholder='Username' />
            <Btn handleTextInput={handleTextInput} buttonText="Register" loading={loading}  bgColor="blue" />
            <Text onPress={()=>{navigation.navigate("Login")}}>Alredy Has An Account?? Click Here</Text>
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
