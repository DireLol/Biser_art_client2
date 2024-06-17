import axios from 'axios'

//На какой-то запрос или ответ мы можем повесить некоторую самую обычную функцию, которая называется интерцептор
//а интерцептор она потому что как бы перехватывает запрос или ответ 
const $api =axios.create({
    withCredentials:true,
    baseURL: process.env.REACT_APP_API_URL
})

$api.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;