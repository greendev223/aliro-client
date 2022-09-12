import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import Navbar from "./components/common/Navbar/Navbar";
import FormPage from "./screens/FormPage";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/Register";
import AssessmentPage from "./screens/assessmentPage/AssessmentScreen";
import HomePage from "./screens/homePage/HomePage";
import UserProvider from "./contexts/UserProvider";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AgreementPage from "./screens/agreementPage/AgreementScreen";

function App() {
    return (
        <>
            <BrowserRouter>
                <ApiProvider>
                    <UserProvider>
                        <Navbar />
                        <Routes>
                            <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
                            <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
                            <Route path='/agreement' element={<AgreementPage/> }/>
                            <Route path="*" element={
                                <PrivateRoute>
                                    <Routes>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/form' element={<FormPage />} />                                        
                                        <Route path='/results' element={<AssessmentPage />} />
                                        <Route path='*' element={<Navigate to="/" />} />

                                    </Routes>
                                </PrivateRoute>
                            } />
                        </Routes>
                    </UserProvider>
                </ApiProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
