import { Stack } from "@mui/system";
import React from "react";
import {
  Box,
  Typography,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
} from "../components/auth";

function Copyright() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography sx={{ fontWeight: "400" }}>
        © MediApp {new Date().getFullYear()}
      </Typography>{" "}
    </Box>
  );
}

const iconStyle = {
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

export default function AppFooter() {
  return (
    <Stack
      justifyContent="space-between"
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      paddingX={5}
      paddingY={2}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={1}
      >
        <Typography variant="h5">Social</Typography>
        <Box component="a" href="#" sx={iconStyle}>
          <FacebookIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">Facebook</Typography>
        </Box>

        <Box component="a" href="#" sx={iconStyle}>
          <TwitterIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">Twitter</Typography>
        </Box>

        <Box component="a" href="#" sx={iconStyle}>
          <InstagramIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">Instagram</Typography>
        </Box>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={1}
      >
        <Typography variant="h5">Contact</Typography>
        <Box sx={iconStyle}>
          <LocationIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">Av. Cabildo 2260, Buenos Aires</Typography>
        </Box>
        <Box sx={iconStyle}>
          <PhoneIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">142345678</Typography>
        </Box>
        <Box sx={iconStyle}>
          <MailIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6">mediapp@gmail.com</Typography>
        </Box>{" "}
      </Stack>

      <Box sx={{ height: { xs: "400px", sm: "300px" } }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.4293497354935!2d-58.45877867074515!3d-34.56070999434532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d4a282e349%3A0x5eee1174ce4f659!2sAv.%20Cabildo%202260%2C%20C1428AAR%20CABA!5e0!3m2!1ses-419!2sar!4v1666128393005!5m2!1ses-419!2sar"
          width="100%"
          height="100%"
        ></iframe>
      </Box>
    </Stack>
  );
}
