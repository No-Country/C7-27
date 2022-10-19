import React from "react";
import {
  Box,
  Grid,
  Link,
  Container,
  Typography,
  TextField,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  Script,
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
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "es-AR",
    name: "Español",
  },
];

export default function AppFooter() {
  return (
    <Box component="footer" sx={{ display: "flex" }}>
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid sx={{ ml: 3, display: "flex", justifyContent: "center" }}>
                <Box component="a" href="https://facebook.com/" sx={iconStyle}>
                  <FacebookIcon />
                </Box>
                <Box component="a" href="https://twitter.com" sx={iconStyle}>
                  <TwitterIcon />
                </Box>
                <Box component="a" href="https://instagram.com" sx={iconStyle}>
                  <InstagramIcon />
                </Box>
              </Grid>

              <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44366915547!2d-58.50333790863538!3d-34.61566245909427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1666140382337!5m2!1ses-419!2sar"
              width="250"
              height="150"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>

          {/* <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/terms/">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
              </Box>
            </Box>
          </Grid> */}

          {/* <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid> */}

          {/* <Grid item>
            <Typography variant="caption">
              {"Icons made by "}
              <Link
                href="https://www.freepik.com"
                rel="sponsored"
                title="Freepik"
              >
                Freepik
              </Link>
              {" from "}
              <Link
                href="https://www.flaticon.com"
                rel="sponsored"
                title="Flaticon"
              >
                www.flaticon.com
              </Link>
              {" is licensed by "}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
