import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { API } from '../../config/api'

import Toast from "react-native-toast-message";

export default function Profile({route, navigation}) {

    const [loading,setloading] = useState(false)
    const [data,setData] = useState(null)

    //const {user} = route.params;

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async() => {
        setloading(true)
        try{
            const res = await API.get(`user/${user}`);
            setData(res.data.data);
            setloading(false)

        } catch(err){
            setloading(false)
            Toast.show({
                type: "error",
                text1: "Error fetch data"
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text onPress={()=>{alert(user)}} style={styles.header}>Profile</Text>
                <Text style={styles.text}>Email: {loading ? "Loading..." : data?.email}</Text>
                <Text style={styles.text}>Username: {loading ? "Loading..." : data?.username}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={styles.button} ><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
            </View>
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 70,
        alignItems: "flex-start",
    },
    headerContainer: {
        backgroundColor: "#61B0B7",
        width: "100%",
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 15,
        color: "#fff"
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        color: "#fff"
    },
    buttonContainer : {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingTop: "100%"
    },
    button: {
        height: 30,
      width: "50%",
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
      borderRadius: 5
    },
    buttonText: {
        color: "#fff"
    }
})
