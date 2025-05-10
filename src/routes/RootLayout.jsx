import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      {/* The Outlet component is a placeholder for the child routes. */}
    </>    
  );
}

export default RootLayout;
// This component is the root layout of the application. It imports the MainHeader component and renders it.