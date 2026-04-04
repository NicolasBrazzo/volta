import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PrivateRoute } from "./api/components/PrivateRoute.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Services } from "./pages/Services.jsx";
import { Availability } from "./pages/Availability.jsx";
import { Bookings } from "./pages/Bookings.jsx";
import { Settings } from "./pages/Settings.jsx";
import { BookingPublic } from "./pages/BookingPublic.jsx";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateFreelanceProfile } from "./pages/CreateFreelanceProfile.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book/:slug" element={<BookingPublic />} />
                <Route element={<PrivateRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/first-access"
                      element={<CreateFreelanceProfile />}
                    />
                    <Route path="/services" element={<Services />} />
                    <Route path="/availability" element={<Availability />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
