import { View, Text, ScrollView, TextInput, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/Cartreducer';
import { useNavigation } from '@react-navigation/native';
export default function CartScreen() {
    const navigation = useNavigation()
    const cart = useSelector((state) => state.cart.cart)
    // console.log("the ", cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    // console.log(total)

    const dispatch = useDispatch()
    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }

    const deleteItem = (item) => {
        dispatch(removeFromCart(item))
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} className='mt-[50] bg-white'>
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
            <View className='flex-row p-2 items-center'>
                <Text className='text-base'>Subtotal : </Text>
                <Text className='font-bold text-lg'>${total}</Text>
            </View>
            <Text className='mx-2'>EMI details available</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate("Confirm")}
            className='bg-yellow-500 mx-4 pb-1.5 pt-1 items-center justify-center mt-3 rounded'>
                <Text className='font-semibold text-base'>Proceed to buy ({cart?.length}) items</Text>
            </TouchableOpacity>
            <Text style={{ height: 1, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 15 }} />

            <View className='mx-2'>
                {
                    cart?.map((item, index) => (
                        <View key={index}
                            className='my-2 border-2 border-t-0 border-x-0 border-b-1 border-gray-300'
                        >
                            <TouchableOpacity className='my-2 flex-row justify-around'>
                                <View>
                                    <Image style={{ width: 140, height: 140, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                                </View>

                                <View >

                                    <Text numberOfLines={3} className='w-[150] mt-2 '>{item?.title}</Text>

                                    <Text className='font-semibold text-lg'>${item?.price}</Text>
                                    <Image
                                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                                        source={{
                                            uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                                        }}
                                    />
                                    <Text style={{ color: "green" }}>In Stock</Text>
                                    {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                                        {item?.rating?.rate} ratings
                                    </Text> */}
                                </View>
                            </TouchableOpacity>




                            <View className='mt-3 mb-2 flex-row items-center'>
                                <View className='flex-row gap-x-4 items-center px-[10] py-[5]'>

                                    {
                                        item?.quantity <= 1 ? (
                                            <TouchableOpacity
                                                onPress={() => deleteItem(item)}
                                                className='bg-gray-300 p-1 rounded-l'>
                                                <AntDesign name="delete" size={18} color="red" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() => decreaseQuantity(item)}
                                                className='bg-gray-300 p-1 rounded-l'>
                                                <AntDesign name="minus" size={18} color="black" />
                                            </TouchableOpacity>
                                        )
                                    }

                                  

                                    <TouchableOpacity>
                                        <Text>{item?.quantity}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => increaseQuantity(item)}
                                        className='bg-gray-300 p-1 rounded-r'>
                                        <AntDesign name="plus" size={18} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    onPress={()=>deleteItem(item)}
                                    className='border-gray-300 border rounded p-2'>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View className='flex-row gap-x-3 px-[10] py-[5] mb-4'>
                                <TouchableOpacity className='border-gray-300 border rounded p-2'>
                                    <Text>Save for Later</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='border-gray-300 border rounded p-2'>
                                    <Text>See More Like this</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))
                }
            </View>


        </ScrollView>
    )
}