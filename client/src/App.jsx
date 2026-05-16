import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import DashboardAdmin from './pages/DashboardAdmin.jsx'
import DashboardDemo from './pages/DashboardDemo.jsx'
import Home from './pages/Home.jsx'
import IndustrySite from './pages/IndustrySite.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="clinic" element={<IndustrySite />} />
        <Route path="real-estate" element={<IndustrySite />} />
        <Route path="home-services" element={<IndustrySite />} />
        <Route path="dashboard/demo" element={<DashboardDemo />} />
        <Route path="dashboard/admin" element={<DashboardAdmin />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
