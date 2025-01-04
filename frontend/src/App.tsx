import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import AuthCallBackPage from "./pages/AuthCallBack/AuthCallBackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLaout from "./layout/MainLaout"
import ChatPage from "./pages/Chat/ChatPage"
import AlbumPage from "./pages/albums/AlbumPage"
import AdminPage from "./pages/admin/AdminPage"
import {Toaster} from "react-hot-toast"
import NotFoundPage from "./pages/404/NotFoundPage"



function App() {

  return (
    <>
    <Routes>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"}/>}/>
      <Route path="/auth-callback" element={<AuthCallBackPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
      <Route element={<MainLaout/>}>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/albums/:albumid" element={<AlbumPage/>}/>
      </Route>
    </Routes>
    <Toaster/>
    </>

  )
}

export default App
