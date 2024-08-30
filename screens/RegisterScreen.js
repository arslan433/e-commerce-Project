import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { url } from './url';

export default function RegisterScreen() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        }
        //send post request to backend api
        axios.post(`${url}/register`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response)
            Alert.alert(
                "Successfully registered",
                "Your account has been registered"
            );
            setName("");
            setEmail("");
            setPassword("");
        }) .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred during registration"
                )
                console.log("Registration failed", error)
            })
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
                <View className='items-center'>
                    <Text className="font-bold mt-8  text-lg text-customBlue">Register to your account</Text>
                </View>
                <Animated.View className='mt-[70]' entering={FadeInLeft.delay(200).duration(1000).springify().damping(3)}>

                    <View className='flex-row bg-black/10 rounded-lg py-[6] space-x-2 pt-2 '>
                        <Ionicons name="person-sharp" style={{ marginLeft: 8 }} size={28} color="gray" />
                        <TextInput placeholder="Enter your Name" className=' my-[1] w-[270] text-base' onChangeText={(text) => setName(text)} value={name} />
                    </View>
                </Animated.View>
                <Animated.View className='mt-[30] ' entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}>

                    <View className='flex-row bg-black/10 rounded-lg py-[6] space-x-2 pt-2 '>
                        <MaterialIcons style={{ marginLeft: 8 }} name="email" size={28} color="gray" />
                        <TextInput placeholder="Enter your email" className=' my-[1] w-[270] text-base' onChangeText={(text) => setEmail(text)} value={email} />
                    </View>
                </Animated.View>
                <Animated.View className='mt-[30]' entering={FadeInRight.delay(200).duration(1000).springify().damping(3)}>
                    <View className='flex-row  bg-black/10 rounded-lg py-[6] space-x-2 pt-2'>
                        <MaterialIcons style={{ marginLeft: 8 }} name="lock" size={28} color="gray" />
                        <TextInput placeholder="Enter your Password" className=' my-[1]  text-base'
                            onChangeText={(text) => setPassword(text)} value={password}
                            secureTextEntry={true}
                        />
                    </View>
                </Animated.View>

                <View>
                    <View className='flex-row justify-between mt-[15] space-x-3'>
                        <Text >Keep me logged in</Text>
                        <Text style={{ color: '#007fff' }} className='font-semibold'>Forgot Password</Text>
                    </View>



                </View>
                <Animated.View className='text-center items-center mt-24' entering={FadeInDown.delay(400).duration(1000).springify().damping(3)}>
                    <TouchableOpacity className='w-[200]' onPress={()=>handleRegister()}>
                        <Text style={{ backgroundColor: '#FF9900' }} className='text-center text-black rounded-lg font-bold text-xl py-3 pb-4 '>Register</Text>
                    </TouchableOpacity>

                </Animated.View>
                <Animated.View className='flex-row justify-center mt-[10]' entering={FadeInDown.delay(600).duration(1000).springify().damping(3)}>
                    <Text className='text-gray-500 text-base'>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#007fff' }} className='font-semibold text-base'>
                            Login
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

