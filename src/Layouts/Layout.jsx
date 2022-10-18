import { Box, Grid } from "../components/auth";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { actionAuthenticateUser } from "../store/slices/user";
import { Logo } from "../components/ui/Logo";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();

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
    <Grid
      container
      justifyContent="space-between"
      flexDirection={{ xs: "column-reverse", md: "row" }}
      spacing={0}
      width={"100%"}
      height={{ xs: "100vh" }}
    >
      <Grid
        item
        xs={12}
        md={7}
        display="flex"
        padding={3}
        sx={{ position: "absolute" }}
        top={0}
      >
        <Logo />
      </Grid>

      <Grid
        item
        container
        justifyContent={"center"}
        alignItems={"center"}
        display="flex"
        flexGrow={1}
        xs={12}
        md={7}
        pt={{ xs: 12 }}
        pl={{ xs: 2 }}
        pr={{ xs: 2 }}
      >
        {children}
      </Grid>
      <Grid
        item
        md={5}
        xs={0}
        overflow="hidden"
        maxHeight={{ xs: "30vh", md: "100vh" }}
        width={"100%"}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)",
          // backgroundSize: "calc(100vh - 16vh)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <Box display={{ md: "none" }} xs={0}>
          <Image
            src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            alt="hospital"
            layout="fill"
          />
        </Box> */}
      </Grid>
    </Grid>
  );
};
