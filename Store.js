import { configureStore } from "@reduxjs/toolkit";
import Cartreducer from "./redux/Cartreducer";

export default configureStore({
    reducer: {
        cart: Cartreducer
    }
})