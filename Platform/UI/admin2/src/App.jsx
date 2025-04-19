import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Component/Protected';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Dashboard from './pages/Dashboard';
import Setting from './pages/Setting';
import Etudiant from './pages/Etudiant/etudiant';
import NewEncadreur from './pages/Encadreur/NewEncadreur';
import Encadreur from './pages/Encadreur/encadreur';
import NewGroupe from './pages/Etudiant/NewGroupe';
import EditEtudiant from './pages/Etudiant/EditEtudiant';
import GroupePage from './pages/Etudiant/GroupePage';
import FillLists from './pages/FillLists';
import EditEncadreur from './pages/Encadreur/EditEncadreur';
import Projet from './pages/Sujet/sujet';
import Admin from './pages/Admin/Admin';
import Projects from './pages/Sujet/projet';
import EditProfile from './pages/EditProfile';
import AdminPage from './pages/Admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<MainPage />} />}>
            <Route index element={<Dashboard />} />
            <Route path="/Etudiant" element={<Etudiant />} />
            <Route path="/Encadreur" element={<Encadreur />} />
            <Route path='/Admin' element={<Admin/>}></Route>
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Projet" element={<Projet/>} />
            <Route path='/EditProfile' element={<EditProfile/>}/>
          </Route>
          <Route path="/:user_id/Edit" element={<ProtectedRoute element={<EditEtudiant />} />} />
          <Route path='/:id/:titre' element={<ProtectedRoute element={<Projects/>}/>}></Route>
          <Route path="/:user_id/EditEnc" element={<ProtectedRoute element={<EditEncadreur />} />} />
          <Route path="/New_Groupe" element={<ProtectedRoute element={<NewGroupe />} />} />
          <Route path="/:user_id/Groupe" element={<ProtectedRoute element={<GroupePage />} />} />
          <Route path="/New_Encadreur" element={<ProtectedRoute element={<NewEncadreur />} />} />
          <Route path="/FillLists" element={<ProtectedRoute element={<FillLists />} />} />
          <Route path='/New_admin' element={<ProtectedRoute element={<AdminPage/>} /> }/>
          <Route path='/:user_id/EditAmin' element={<ProtectedRoute element={<AdminPage/>}/>}></Route> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
