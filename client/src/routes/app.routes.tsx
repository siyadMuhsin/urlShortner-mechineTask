import { Route,BrowserRouter as Router ,Routes } from "react-router-dom";
import { AuthForm } from "../pages/AuthPage";
import Home from "../pages/Home";
import ProtectedRoute from "./protected.routes";
import { AuthProvider } from "../context/auth.context";


const AppRouter = () => {
  return (
   <Router>
    <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
    </AuthProvider>
   </Router>
    
  )
}

export default AppRouter