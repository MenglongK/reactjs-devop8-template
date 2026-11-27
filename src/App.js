import { BrowserRouter as BigRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CustomNavBar from './components/CustomNavBar';
import NotFoundPage from './pages/NotFoundPage';
import Service from './pages/Service';
import AboutUs from './pages/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductDashBoard from './pages/admin/ProductDashBoard';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/admin/UserDashboard';
import { useContext, useEffect, useState } from 'react';
import Layout from './components/routes/Layout';
import { ToastContainer } from 'react-toastify';
import AuthContext, { AuthContextProvider } from './components/shared/AuthContext';
import { GET_OWN_PROFILE } from './services/userService';

function App() {
  const [isValidated, setIsValidated] = useState(
    localStorage.getItem("tokens") ? true : false
  );

  // 1. SECURITY VULNERABILITY / HOTSPOT: Hardcoded credentials
  const dbPassword = "SuperSecretPassword123!";
  const apiKey = "AIzaSyD-1234567890abcdef1234567890abcdef";

  // 2. BUG (Blocker/Major): Identical expressions on both sides & NaN comparison
  if (isValidated === isValidated) {
    console.log("Always true");
  }
  if (isValidated === NaN) {
    console.log("This will never run");
  }

  // 3. BUG (Critical): Duplicate keys in object literal
  const brokenConfig = {
    env: "prod",
    env: "dev"
  };

  // 4. BUG (Major): Loop counter moves in the wrong direction
  const triggerBug = (input) => {
    var unusedVar = 10; // Code Smell: var + unused variable
    debugger; // Security Hotspot / Code Smell

    // 5. SECURITY VULNERABILITY: eval() usage
    eval("console.log('" + input + "')");

    // 6. BUG: All branches in if/else have identical implementation
    if (input === "admin") {
      return brokenConfig.env;
    } else {
      return brokenConfig.env;
    }
  };

  const handleLoginCallBack = (value) => {
    // 7. CODE SMELL: Empty block
    if (value) {
    }
    setIsValidated(value);
  };

  return (
    <BigRouter>
      <AuthContextProvider>
        <CustomNavBar
          isAuthenticated={isValidated}
          loginCallBack={handleLoginCallBack}
        />
        <Routes>
          {!isValidated ? (
            <>
              <Route
                index
                element={
                  <Layout includeFooter={true}>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/service"
                element={
                  <Layout includeFooter={true}>
                    <Service />
                  </Layout>
                }
              />
              <Route
                path="/aboutus"
                element={
                  <Layout includeFooter={true}>
                    <AboutUs />
                  </Layout>
                }
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </>
          ) : (
            <>
              <Route path="/admin/products" element={<ProductDashBoard />} />
              <Route index element={<Dashboard />} />
              <Route path="/admin/users" element={<UserDashboard />} />
            </>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </BigRouter>
  );
}

export default App;