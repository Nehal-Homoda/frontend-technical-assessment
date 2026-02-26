"use client"

import React from 'react'
import { store } from '@/store/store'
import { Provider } from 'react-redux'


type Props = {
    children: React.ReactNode
}

export default function StoreProvider({children}: Readonly<Props>) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
