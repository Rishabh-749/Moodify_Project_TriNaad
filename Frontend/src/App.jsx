import React from 'react'
import "./features/shared/style/global.scss"
import { RouterProvider} from "react-router";
import { router } from './app.routes'
import {AuthProvider} from "./features/auth/auth.context"
import { SongContextProvider } from "./features/Home/song.context"

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
