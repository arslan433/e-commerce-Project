import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/Cartreducer'; // Adjust this path as necessary

export default function ProductInfoScreen() {
    const { width } = Dimensions.get("window")
    const height = (width * 100) / 100
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [addedToCart , setAddedToCart] = useState(false)

    const route = useRoute()

    const cart = useSelector((state) => state.cart.cart);

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));

        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };

    console.log(cart);
    return (
        <ScrollView className="mt-[50] flex-1 bg-white" showsVerticalScrollIndicator={false}>
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    route.params.carouselImages.map((item, index) => (
                        <ImageBackground key={index} source={{ uri: item }} style={{ height, width, resizeMode: "contain", marginTop: 25 }}>
                            <View className='p-2 justify-between items-center flex-row'>

                                <View className="h-[40] w-[40] items-center justify-center bg-red-600 rounded-3xl flex-row">
                                    <Text className="text-white text-xm text-center font-semibold">
                                        20% OFF
                                    </Text>
                                </View>
                                <View className="h-[40] w-[40] items-center justify-center bg-gray-200 rounded-3xl flex-row">
                                    <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                                </View>
                            </View>

                            <View className="h-[40] w-[40] items-center justify-center bg-gray-200 rounded-3xl flex-row mt-auto ml-2 mb-2 ">
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>
                        </ImageBackground>
                    ))
                }
            </ScrollView>
            <View className="p-[10]">
                <Text className='text-sm font-medium'> {
                    route?.params?.title
                }
                </Text>
                <Text className="mt-1 font-semibold text-lg">${
                    route?.params?.price
                }
                </Text>
            </View>
            <Text style={{ height: 1, borderColor: "#d0d0d0", borderWidth: 2 }} />

            <View className='flex-row items-center p-2'>
                <Text>Colour: </Text>
                <Text className="font-bold text-base">{route?.params?.color}</Text>
            </View>
            <View className='flex-row items-center p-2'>
                <Text>Size: </Text>
                <Text className="font-bold text-base">{route?.params?.size}</Text>
            </View>
            <Text style={{ height: 1, borderColor: "#d0d0d0", borderWidth: 2 }} />
            <View className='p-[10]'>
                <Text className='font-bold text-base my-[5]'> Total : ${route?.params?.price} </Text>
                <Text className='text-freeDelivery ml-1' >FREE delivery all over the Pakistan</Text>
                <View className="flex-row items-center my-2 gap-x-0.5">
                    <Ionicons name="location" size={24} color="black" />
                    <Text className=" text-sm font-medium"> 5 km away from your location</Text>
                </View>
            </View>

            <Text className='text-green-700 font-semibold mx-3 '>IN Stock</Text>
            <TouchableOpacity
                onPress={ ()=>addItemToCart(route?.params?.item)}
                className="bg-yellow-400 rounded-3xl mx-2 my-2 items-center justify-center py-1">
                    {
                        addedToCart? (
                            <Text className=" text-blue-900 text-base font-semibold my-[5]">Added to Cart</Text>
                        ) : (
                            <Text className='text-base text-blue-900 font-semibold my-[5]'> Add to Cart</Text>
                        )
                    }
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 rounded-3xl mx-2 my-2 items-center justify-center py-1">
                <Text className='text-base text-blue-900 font-semibold my-[5]'> Buy Now</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
