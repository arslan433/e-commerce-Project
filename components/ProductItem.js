import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { addToCart } from '../redux/Cartreducer';
import { useDispatch } from 'react-redux';

export default function ProductItem({item}) {
  const dispatch = useDispatch()
    const [addedToCart , setAddedToCart] = useState(false)
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));

    setTimeout(() => {
        setAddedToCart(false);
    }, 60000);
};
  return (
    <TouchableOpacity className="my-[25] mx-[13]">
        <Image className="h-[150] w-[150]" style={{resizeMode:"contain"}} source={{uri:item?.image}}/>
        <Text numberOfLines={1} className="w-[150] mt-[10]">{item?.title}</Text>
        <View className="flex-row justify-between items-center ">
            <Text className="font-bold">${item?.price}</Text>
            <Text className="font-bold text-yellow-500">{item?.rating?.rate} ratings</Text>
        </View>

        <TouchableOpacity onPress={() => addItemToCart(item)} className="bg-yellow-500 justify-center items-center p-[10] mx-1 rounded-3xl mt-2">
        {
                        addedToCart? (
                            <Text className=" text-blue-900 text-base font-semibold">Added to Cart</Text>
                        ) : (
                            <Text className='text-base text-blue-900 font-semibold '> Add to Cart</Text>
                        )
                    }
        </TouchableOpacity>
    </TouchableOpacity>
  )
}