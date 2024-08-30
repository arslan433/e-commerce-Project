/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./screens/LoginScreen.{js,jsx,ts,tsx}" , "./screens/RegisterScreen.{js,jsx,ts,tsx}" , "./screens/HomeScreen.{js,jsx,ts,tsx}" , "./components/ProductItem.js", "./screens/ProductInfoScreen.js", "./screens/AddAddressScreen.js","./screens/AddressScreen.js", "./screens/CartScreen.js" , "./screens/ConfirmationScreen.js" ,"./screens/ProfileScreen.js"],
  theme: {
    extend: {
      colors: {
        customBlue: '#041E42',
        freeDelivery: '#00ced1'
      },
    },
  },
  plugins: [],
}

