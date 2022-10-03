import { Box, Container, Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";
import NavBar from "../components/navbar";
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
  }, []);

  return (
    <Container>
      <NavBar />
      <Hero />
      <Data />
      <AppFooter />
    </Container>
  );
}

// export const getServerSideProps = async ({ req, res }) => {
//   const { token } = req.cookies;
//   if (token) {
//     return {
//       props: {
//         token,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// };
