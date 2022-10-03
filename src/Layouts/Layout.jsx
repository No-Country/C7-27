import { Box, Grid, Typography } from "@mui/material";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { actionAuthenticateUser } from "../store/slices/user";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        dispatch(actionAuthenticateUser(token));
        console.log("asd");
        router.push("/dashboard");
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <Grid
      container
      justifyContent="space-between"
      flexDirection={{ xs: "column-reverse", md: "row" }}
      spacing={0}
      width={"100%"}
      height={{ md: "100vh" }}
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
        <Box>
          <Typography variant="h3" component="h2">
            <AccessibleForwardIcon
              onClick={() => router.push("/")}
              sx={{ fontSize: 40 }}
              color="primary"
            />
            Hospital Name
          </Typography>
        </Box>
      </Grid>
      <Grid
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
        xs={12}
        overflow="hidden"
        maxHeight={{ xs: "30vh", md: "100vh" }}
        width={"100%"}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)",
          backgroundSize: "calc(100vh - 16vh)",
        }}
      >
        <Box display={{ md: "none" }}>
          <img
            src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            alt="hospital"
            width={"100%"}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
