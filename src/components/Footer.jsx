import { Stack } from "@mui/system";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
} from "../components/auth";

const iconStyle = {
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

function Copyright() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography sx={{ fontWeight: "400" }}>
        © MediApp {new Date().getFullYear()}
      </Typography>{" "}
    </Box>
  );
}

export default function AppFooter() {
  return (
    <>
      <Stack
        justifyContent="space-between"
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={2}
        paddingX={{ sm: 15, xs: 5 }}
        paddingTop={2}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems={{ xs: "center", sm: "flex-start" }}
          gap={0}
          sx={{ order: { xs: 1, sm: 0 }, marginTop: { xs: "1rem" } }}
        >
          <Typography variant="h5" sx={{ fontWeight: "400" }}>
            Contact
          </Typography>
          <Box sx={iconStyle}>
            <LocationIcon sx={{ fontSize: 25 }} />
            <Typography variant="h7" sx={{ fontWeight: "400" }}>
              Av. Cabildo 2260, Buenos Aires
            </Typography>
          </Box>
          <Box sx={iconStyle}>
            <PhoneIcon sx={{ fontSize: 25 }} />
            <Typography variant="h7" sx={{ fontWeight: "400" }}>
              142345678
            </Typography>
          </Box>
          <Box sx={iconStyle}>
            <MailIcon sx={{ fontSize: 25 }} />
            <Typography variant="h7" sx={{ fontWeight: "400" }}>
              mail@gmail.com
            </Typography>
          </Box>{" "}
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          sx={{ order: { xs: 1, sm: 0 } }}
          //paddingLeft={5}
        >
          <Typography variant="h5" sx={{ fontWeight: "400" }}>
            Social
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            gap={3}
          >
            <Box component="a" href="#" sx={iconStyle}>
              <FacebookIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box component="a" href="#" sx={iconStyle}>
              <TwitterIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box component="a" href="#" sx={iconStyle}>
              <InstagramIcon sx={{ fontSize: 30 }} />
            </Box>
          </Stack>
        </Stack>

        {/* <Box
          sx={{
            height: "210px",
            width: { sm: "252px" },
            border: "1px solid",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.4293497354935!2d-58.45877867074515!3d-34.56070999434532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d4a282e349%3A0x5eee1174ce4f659!2sAv.%20Cabildo%202260%2C%20C1428AAR%20CABA!5e0!3m2!1ses-419!2sar!4v1666128393005!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </Box> */}
      </Stack>

      <Stack alignItems="center" paddingBottom={2}>
        <Copyright />
      </Stack>
    </>
  );
}
