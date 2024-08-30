import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from './url';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async() => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
            } catch (error) {
                console.error(error);
            }
        };
        checkLoginStatus();
    }, [])
    const handlelogin = () => {
        const user = {
            email: email,
            password: password
        }
        axios.post(`${url}/login`, user)
            .then((response) => {
                console.log("Response Data:", response.data);
                const token = response.data.token;
                if (token) {
                    AsyncStorage.setItem('authToken', token);
                    navigation.replace("Main");
                } else {
                    Alert.alert('Login failed', 'Token not received. Please try again.');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Response data:", error.response.data);
                    Alert.alert('Login failed', error.response.data.message || "An error occurred during login");
                } else if (error.request) {
                    console.log("Request data:", error.request);
                    Alert.alert('Login failed', 'No response from server. Please try again later.');
                } else {
                    console.log("Error message:", error.message);
                    Alert.alert('Login failed', 'An unexpected error occurred. Please try again.');
                }
            });


    }
    return (
        <SafeAreaView className='flex items-center '>
            <View>
                <Animated.Image entering={FadeInUp.duration(1000).springify().damping(3)}
                    className='w-[150] h-[100] mt-16'
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <Animated.View className='items-center' entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}>
                    <Animated.Text

                        className="font-bold mt-8  text-lg text-customBlue">Login into your account</Animated.Text>
                </Animated.View>
                <Animated.View className='mt-[70] ' entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}>

                    <View className='flex-row bg-black/10 rounded-lg py-[6] space-x-2 pt-2 '>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={28} color="gray" />
                        <TextInput placeholder="Enter your email" className=' my-[1] w-[270] text-base'
                            value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                </Animated.View>
                < Animated.View className='mt-[30]' entering={FadeInDown.delay(400).duration(1000).springify().damping(3)}>
                    <View className='flex-row  bg-black/10 rounded-lg py-[6] space-x-2 pt-2'>
                        <MaterialIcons style={{ marginLeft: 8 }} name="lock" size={28} color="gray" />
                        <TextInput placeholder="Enter your Password" className=' my-[1]  text-base'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}>
                    <View className='flex-row justify-between mt-[15] space-x-3'>
                        <Text >Keep me logged in</Text>
                        <Text style={{ color: '#007fff' }} className='font-semibold'>Forgot Password</Text>
                    </View>


                </Animated.View>
                <Animated.View className='text-center items-center mt-24' entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}>
                    <TouchableOpacity className='w-[200]' onPress={() => handlelogin()}>
                        <Text style={{ backgroundColor: '#FF9900' }} className='text-center text-black rounded-lg font-bold text-xl py-3 pb-4 '>Login</Text>
                    </TouchableOpacity>

                </Animated.View>
                <Animated.View className='flex-row justify-center mt-[10]' entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}>
                    <Text className='text-gray-500 text-base'>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.push('Register')}>
                        <Text style={{ color: '#007fff' }} className='font-semibold text-base'>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

