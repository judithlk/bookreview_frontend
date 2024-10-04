"use client"

import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
type PropType = {
    children: React.ReactNode
}

export const BaseProvider = ({children}: PropType) => {
    return(
    <Provider store={store}>
        {children}
    </Provider>
    )
}