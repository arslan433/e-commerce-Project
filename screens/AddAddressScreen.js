import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { url } from './url';
import Entypo from '@expo/vector-icons/Entypo';

import { UserType } from '../UserContext';
export default function AddAddressScreen() {
    const navigation = useNavigation()
    const [addresses, setAddresses] = useState([])
    const [userId, setUserId] = useContext(UserType)

    useEffect(() => {
        fetchAddresses()

    }, [])

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${url}/addresses/${userId}`)
            const address = response.data
            setAddresses(address)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchAddresses()
        } , [])
    )

    // console.log("addresses", addresses)


    return (
        <ScrollView showsVerticalScrollIndicator={false}
            className="mt-[50]">
            <View style={{ backgroundColor: '#00ced1' }} className='flex-row items-center p-[6] gap-3'>
                <TouchableOpacity className='flex-row flex-1 items-center h-[38] rounded-sm bg-white  gap-x-2' >
                    <View className="">
                        <AntDesign name="search1" size={20} color="black" />

                    </View>
                    <TextInput placeholder='Search amazon.com' />
                </TouchableOpacity>
                <View className="mx-2">

                    <Feather name="mic" size={20} color="black" />
                </View>
            </View>

            <View className="p-2 ">
                <Text className='font-bold text-2xl'>Your Addresses</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Add")} className='border-y-2 border-x-0  border-slate-300 border-solid mt-2 py-2 justify-between items-center flex-row'>
                    <Text>Add a new address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />

                </TouchableOpacity>

                <TouchableOpacity>
                    {/* already added addresses */}
                    {addresses?.map((item, index) => (
                        <TouchableOpacity
                            style={{
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                padding: 10,
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 3,
                                marginRight: 5,
                                marginTop: 10,
                            }}
                            key={index}
                            className='rounded'
                        >
                            <View
                                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                            >
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                    {item?.name}
                                </Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text className='text-gray-600'
                            >
                                {item?.houseNo},{item?.landmark}
                            </Text>

                            <Text
                                className='text-gray-600'
                            >
                                {item?.street}
                            </Text>
                            <Text
                                className='text-gray-600'
                            >
                                Phone No {item?.mobileNo}
                            </Text>
                            <Text
                                className='text-gray-600'
                            >
                                postalCode: {item?.postalCode}
                            </Text>
                            <Text
                                className='text-gray-600'
                            >
                                Rawalpindi, Pakistan
                            </Text>

                            <View className='flex-row gap-x-3 itms-center'>
                                <TouchableOpacity className='bg-white p-2 border border-gray-300 mt-2 rounded'>
                                    <Text className='font-semibold'>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='bg-white p-2 border border-gray-300 mt-2 rounded'>
                                    <Text className='font-semibold'>Remove</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='bg-white p-2 border border-gray-300 mt-2 rounded'>
                                    <Text className='font-semibold'>Set as Default</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}

                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}