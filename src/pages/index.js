import { Box, Container, Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";
import NavBar from "../components/navbar";
import Hero from "../components/Hero";
import Data from "../components/Data";
import AppFooter from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionAuthenticateUser } from "../store/slices/user";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home({ token }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    try {
      dispatch(actionAuthenticateUser(token));
      // router.push("/user/page1");
    } catch (e) {}
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

export const getServerSideProps = async ({ req, res }) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`;
      const { data } = await axios.post(URL, { token });
      return {
        props: {
          user: data,
        },
      };
    } catch (e) {
      // console.log(e)
    }
  }

  return {
    props: {},
  };
};
