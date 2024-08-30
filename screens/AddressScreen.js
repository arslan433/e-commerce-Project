import { View, Text, ScrollView, TextInput, Platform, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from './url'
import { Buffer } from 'buffer';

import { useNavigation } from '@react-navigation/native'
export default function AddressScreen() {
    const navigation = useNavigation()
    const [name, setName] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [houseNo, setHouseNo] = useState("")
    const [street, setStreet] = useState("")
    const [landmark, setLandmark] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [userId, setUserId] = useContext(UserType)


    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };
    
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                
                if (token) {
                    const decodedToken = decodeJWT(token);
                    const userId = decodedToken.userId;
                    setUserId(userId);
                } else {
                    console.error("Token not found");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        fetchUser();
    }, []);


    const handleAddress = () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }
        axios.post(`${url}/addresses `, { userId, address }).then((response) => {
            Alert.alert('Success ', "Addresses added successfully")
            setName("")
            setMobileNo("")
            setHouseNo("")
            setStreet("")
            setLandmark("")
            setPostalCode("")

            setTimeout(() => {
                navigation.goBack()
            }, 500);

        }).catch((error) => {
            Alert.alert('Error ', "Failed to add addresses")
            console.log(error)
        })

    }
    return (
        <ScrollView className='mt-[28]'>
            <View className='h-[50] ' style={{ backgroundColor: "#00ced1" }} />
            <View className='p-2'>
                <Text className='font-bold text-base'>
                    Add a new address
                </Text>
                <TextInput placeholder='Pakistan' className='border-slate-300 border p-1 my-2 rounded' />

                <View>
                    <Text className='font-bold text-sm'>
                        Full Name (First and last name)
                    </Text>
                    <TextInput placeholder='Name' className='border-slate-300 border p-1 my-2 rounded'
                        value={name} onChangeText={(text) => setName(text)}
                    />
                </View>
                <View>
                    <Text className='font-bold text-sm'>
                        Mobile No
                    </Text>
                    <TextInput placeholder='Mobile' className='border-slate-300 border p-1 my-2 rounded'
                        value={mobileNo} onChangeText={(text) => setMobileNo(text)}
                    />
                </View>
                <View>
                    <Text className='font-bold text-sm'>
                        House no, Flat, Building,
                    </Text>
                    <TextInput placeholder='Address' className='border-slate-300 border p-1 my-2 rounded'
                        value={houseNo} onChangeText={(text) => setHouseNo(text)}
                    />
                </View>
                <View>
                    <Text className='font-bold text-sm'>
                        Area, Street, Village
                    </Text>
                    <TextInput placeholder='Address' className='border-slate-300 border p-1 my-2 rounded'
                        value={street} onChangeText={(text) => setStreet(text)}
                    />
                </View>
                <View>
                    <Text className='font-bold text-sm'>
                        Landmark
                    </Text>
                    <TextInput placeholder='eg: near metro station' className='border-slate-300 border p-1 my-2 rounded'
                        value={landmark} onChangeText={(text) => setLandmark(text)}
                    />
                </View>
                <View>
                    <Text className='font-bold text-sm'>
                        Pin code
                    </Text>
                    <TextInput placeholder='46000' className='border-slate-300 border p-1 my-2 rounded'
                        value={postalCode} onChangeText={(text) => setPostalCode(text)}
                        keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}

                    />
                </View>
                <TouchableOpacity onPress={handleAddress} className='mt-3 justify-center mx-3'>
                    <Text className='text-white text-center font-bold text-sm py-2 px-4 rounded bg-yellow-600'>
                        Add Address
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}