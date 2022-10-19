import { Box } from "../components/auth";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import Data from "../components/Data";
import AppFooter from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionAuthenticateUser } from "../store/slices/user";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        dispatch(actionAuthenticateUser(token));
        // router.push("/dashboard");
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 5,
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Hero />
      <Data />
      <AppFooter />
    </Box>
  );
}
