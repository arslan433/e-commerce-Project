import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { url } from './url';
import { TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { cleanCart } from '../redux/Cartreducer';
export default function ConfirmationScreen() {

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [userId, setUserId] = useContext(UserType)

  useEffect(() => {
    fetchAddresses()

  }, [])


  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${url}/addresses/${userId}`)
      const addresses = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(addresses)

  const cart = useSelector((state) => state.cart.cart)
  // console.log("the ", cart)
  const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
  // console.log(total)



  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption

      }
      const response = await axios.post(`${url}/orders`, orderData)
      if (response.status === 200) {
        navigation.navigate("Order")
        dispatch(cleanCart())
        console.log("Order has been created", response.data)
      }
      else {
        console.log("Order has not been created", response.data)
      }

    }
    catch (error) {
      console.log("error in handle place order", error)
        Alert.alert("Error", "Failed to place order")
    }
  }



  const [selectedAddress, setSelectedAddress] = useState("")
  const [options, setOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")



  const pay = async () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <ScrollView className='mt-[50]'>
      <View className='flex-1 px-4 pt-8'>
        <View className='flex-row  justify-between mb-[15] items-center'>
          {
            steps.map((step, index) => (
              <View key={index} className='justif-center items-center'>
                {
                  index > 0 && (
                    <View
                      style={[
                        { flex: 1, height: 1, backgroundColor: "green" },
                        index <= currentStep && { backgroundColor: "green" },
                      ]}
                    />
                  )}
                <View className='items-center justify-center h-[30] w-[30] bg-gray-400 rounded-full' style={index < currentStep && { backgroundColor: "green" }}>

                  {
                    index < currentStep ? (
                      <Text
                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                      >
                        &#10003;
                      </Text>
                    ) : (
                      <Text
                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                      >
                        {index + 1}
                      </Text>
                    )
                  }
                </View>

                <Text className='mt-2'>{step.title}</Text>


              </View>
            ))
          }
        </View>
      </View>

      {currentStep == 0 && (
        <View className='mx-3'>
          <Text className='font-bold text-lg'>Select Delivery Address</Text>

          <View>
            {addresses.map((item, index) => (
              <TouchableOpacity onPress={() => setSelectedAddress(item)} key={index} className='flex-row items-center gap-x-1 border mx-1 border-gray-400 rounded-lg p-2 pb-4 my-2'>

                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome6 name="dot-circle" size={20} color="#008397" />
                ) : (

                  <Entypo name="circle" size={20} color="gray" />
                )
                }


                <View className='pl-3 '>
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text numberOfLines={0} className='text-gray-600 w-24'
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

                  {selectedAddress && selectedAddress._id === item?._id && (
                    <TouchableOpacity
                      onPress={() => setCurrentStep(1)}
                      style={{ backgroundColor: '#008397' }} className='p-2 mt-3 justify-center items-center rounded-full'>
                      <Text className='text-white font-semibold'>Deliver to this Address</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {currentStep == 1 && (
        <View className='flex-1 mx-3'>
          <Text className='font-bold text-lg'>Choose Your Delivery Options</Text>
          <View className='flex-row mt-4 gap-x-3 justify-center items-center bg-white p-3 mx-2 border border-gray-400 rounded-lg'>
            {
              options ? (
                <FontAwesome6 name="dot-circle" size={20} color="#008397" />

              ) : (
                <Entypo name="circle" onPress={() => setOptions(!options)} size={20} color="gray" />

              )
            }
            <Text className='pr-2'>
              <Text className='text-green-600'>Tomorrow at 10pm </Text>
              - Free Delivery with our Prime Membership
            </Text>
          </View>
          {
            options ? (
              <TouchableOpacity
                onPress={() => setCurrentStep(2)}
                style={{ backgroundColor: '#008397' }} className='p-2 mt-8 justify-center items-center rounded-full mx-5 '>
                <Text className='text-white font-semibold'>Proceed to Payment</Text>
              </TouchableOpacity>
            ) : null
          }

        </View>
      )}

      {currentStep == 2 && (
        <View className='flex-1 mx-3'>
          <Text className='font-bold text-lg'>Select Payment Method</Text>

          <View className='flex-row  gap-x-3 mx-3 my-3 bg-white border border-gray-300 rounded-lg p-2 items-center mt-8'>
            {selectedOption === "cash" ? (
              <FontAwesome6 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo onPress={() => setSelectedOption("cash")} name="circle" size={20} color="gray" />
            )
            }

            <Text>Cash on Delivery (COD)</Text>
          </View>
          <View className='flex-row  gap-x-3 mx-3 my-3 bg-white border border-gray-300 rounded-lg p-2 items-center'>
            {selectedOption === "card" ? (
              <FontAwesome6 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo onPress={() => {
                setSelectedOption("card"), Alert.alert("Credit / Debit card ", "Pay online", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("cancel is pressed"),
                  },
                  {
                    text: "OK",
                    onPress: () => pay(),
                  }
                ])
              }} name="circle" size={20} color="gray" />
            )}
            <Text>Credit / Debit Card</Text>
          </View>
          {
            selectedOption === "cash" || selectedOption === "card" ? (
              <TouchableOpacity
                onPress={() => setCurrentStep(3)}
                style={{ backgroundColor: '#008397' }} className='p-2 mt-8 justify-center items-center rounded-full mx-5 '>
                <Text className='text-white font-semibold'>Place Order</Text>
              </TouchableOpacity>
            ) : null
          }

        </View>
      )}

      {currentStep == 3 && selectedOption === "cash" && (
        <View className='flex-1 mx-3'>
          <Text className='font-bold text-lg'>Review Your Order</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
            className='rounded-lg'
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </View>

          <View className='bg-white p-3 border border-gray-300 mt-3 rounded-lg'>
            <Text className='font-semibold'>Shipping to {selectedAddress?.name}</Text>
            <View className="justify-between flex-row items-center mt-1">
              <Text className='text-gray-500'>Items Price</Text>
              <Text className='text-gray-500'>${total}</Text>
            </View>
            <View className="justify-between flex-row items-center mt-1">
              <Text className='text-gray-500'>Delivery Charges</Text>
              <Text className='text-gray-500'>$0</Text>
            </View>
            <View className="justify-between flex-row items-center mt-1">
              <Text className='text-black text-base font-bold'>Total</Text>
              <Text className='text-red-600 font-bold text-base'>${total}</Text>
            </View>
          </View>
          <View className='bg-white p-3 border border-gray-300 mt-3 rounded-lg'>
            <Text className='text-gray-500'>Pay with</Text>
            <Text className='font-bold text-base'>Pay on Delivery (Cash)</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handlePlaceOrder()}
              style={{ backgroundColor: '#008397' }} className='p-2 mt-8 justify-center items-center rounded-full mx-5 '>
              <Text className='text-white font-semibold'>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  )
}