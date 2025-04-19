import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './App.css'
import HomeLayout from './Layout/Homelayout'; 
import '../public/index.js'
import Projet from './Details/projet'
import UserEncadreurs from './CheckUser/Encadreur/UserEncadreur.jsx';
import E_Abouts from "./CheckUser/Encadreur/E_About.jsx";
import E_sujets from "./CheckUser/Encadreur/E_Sujet.jsx";
import UserEtudiants from './CheckUser/Etudiant/UserEtudiant.jsx';
import A_propos from './CheckUser/Etudiant/Apropos.jsx';
import ProjetEn from './Details/projetEn.jsx'
import {Home,Features,Logout,E_About,E_binome,E_sujet,UserEncadreur,UserEtudaint,T_about,T_encadreur,T_favorite,T_sujet,T_ListDeChoix,E_About_edit,T_About_edit,Create_Sjt,PFE} from './pages/index.js'

import { useState } from "react";

function App() {
  const [user,setuser] = useState('')
  const [notifications,setnotifications] = useState([])
  
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<HomeLayout user={user} setuser={setuser} notifications={notifications} setnotifications={setnotifications} />}>
            <Route index element={<Home/>}></Route>
            <Route path="/features" element={<Features/>}></Route>
            <Route path="/user" element={<UserEncadreur user={user} setuser={setuser}/>}>
              <Route path="profile" element={<E_About user={user} setuser={setuser}/>}></Route>
              <Route path="Sujet" element={<E_sujet/>}></Route>
              <Route path="binomes" element={<E_binome/>}></Route>
              <Route path="editProfile" element={<E_About_edit user={user} setuser={setuser} />}></Route>
            </Route>
            <Route path="/:id" element={<UserEtudaint setuser={setuser} user={user}/>}>
              <Route path="profile" element={<T_about user={user} setuser={setuser}/>}></Route>
              <Route path="editProfile" element={<T_About_edit user={user} setuser={setuser}/>}></Route>
              <Route path="Sujet" element={<T_sujet user={user}/>}></Route>
              <Route path="Encadreur" element={<T_encadreur/>}></Route>
              <Route path="Favorite" element={<T_favorite/>}></Route>
              <Route path="List_De_choix" element={<T_ListDeChoix user={user}/>}></Route>
              <Route path="PFE" element={<PFE/>}></Route>
            </Route>
            <Route path='/:id/:titre' element={<Projet/>}></Route>
            <Route path='/E/:id/:titre' element={<ProjetEn/>}></Route>
            <Route path='/Create/:id' element={<Create_Sjt setuser={setuser}/>}></Route>
            <Route path="/create" element={<Create_Sjt />} />
            <Route path="/E/:user_id" element = {<UserEncadreurs/>}>
              <Route path="profile" element={<E_Abouts/>} ></Route>
              <Route path="Sujet" element={<E_sujets/>}></Route>
            </Route>
            <Route path='ET/:user_id' element={<UserEtudiants/>}>
              <Route path="profile" element={<A_propos/>} ></Route>
            </Route>
        </Route>
        <Route path="/Logout" element={<Logout setuser={setuser}/>}></Route>
      </Route>
    )
  )
 
  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App
