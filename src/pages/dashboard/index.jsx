import Head from "next/head";
import { Box, Container, Grid } from "../../components/auth";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { LatestAppointments } from "../../components/dashboard/LatestAppointments";
import { NextAppointment } from "../../components/dashboard/NextAppointment";
import { NewProfessional } from "../../components/dashboard/NewProfessional";
import { WelcomeDashboard } from "../../components/dashboard/WelcomeDashboard";
import { NewAppointment } from "../../components/dashboard/NewAppointment";
import { useSelector } from "react-redux";

export default function DashboardMainPage({ token }) {
  const { user } = useSelector((state) => state.users);

  const patientDashboard = (
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
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <LatestAppointments />
      </Grid>
    </>
  );

  const professionalDashboard = (
    <>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <WelcomeDashboard />
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <NextAppointment />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <LatestAppointments />
      </Grid>
    </>
  );

  const adminDashboard = (
    <>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <WelcomeDashboard />
      </Grid>
      <Grid item xl={4} lg={4} sm={6} xs={12}>
        <NewProfessional />
      </Grid>
    </>
  );

  const renderDashboard = () => {
    if (user) {
      if (user.isAdmin) {
        return adminDashboard;
      } else if (user.isProfessional) {
        return professionalDashboard;
      } else {
        return patientDashboard;
      }
    } else {
      return;
    }
  };

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
            {renderDashboard()}
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
