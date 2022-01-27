import axios from "axios"
import Constants from "expo-constants"
const {manifest} = Constants

export const API = axios.create({
    baseURL: `http://${manifest.debuggerHost.split(':').shift()}:3000/api/v1`
})