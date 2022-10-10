import Head from "next/head";
import { Box, Container, Grid } from "../../components/auth";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { LatestAppointments } from "../../components/dashboard/LatestAppointments";
import { NextAppointment } from "../../components/dashboard/NextAppointment";
import { NewProfessional } from "../../components/dashboard/NewProfessional";
import { WelcomeDashboard } from "../../components/dashboard/WelcomeDashboard";
import { NewAppointment } from "../../components/dashboard/NewAppointment";
import { useSelector } from "react-redux";

export default function dashboardMainPage({ token }) {
  const { user } = useSelector((state) => state.users);
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {user && user.isAdmin ? (
              <>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <WelcomeDashboard />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <NextAppointment />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <NewAppointment />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <NewProfessional />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xl={4} lg={4} sm={6} xs={12}>
                  <WelcomeDashboard />
                </Grid>
                <Grid item xl={4} lg={4} sm={6} xs={12}>
                  <NextAppointment />
                </Grid>
                <Grid item xl={4} lg={4} sm={6} xs={12}>
                  <NewAppointment />
                </Grid>
              </>
            )}

            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestAppointments />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              Componente 5
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              Componente 6
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              Componente 7
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              Componente 8
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
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
