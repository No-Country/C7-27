import {
  Box,
  Grid,
  Typography,
  AccessibleForwardIcon,
} from "../components/auth";

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
        <Box>
          <Typography variant="h3" component="h2">
            <AccessibleForwardIcon
              onClick={() => router.push("/")}
              sx={{ fontSize: 40 }}
              color="primary"
            />
            MediApp
          </Typography>
        </Box>
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
        xs={12}
        overflow="hidden"
        // width={"100%"}
        sx={{
          backgroundImage: "url(/static/images/hospital2.png)",
          backgroundSize: "calc(100vh - 16vh)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // display: { xs: "none", md: "initial" },
        }}
      ></Grid>
    </Grid>
  );
};
