import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  PeopleIcon,
} from "../../components/auth";

import numeroALetras from "../../utils/numeroALetras.js";

export const NextAppointment = (props) => {
  const { user } = useSelector((state) => state.users);
  const today = new Date();

  return (
    <Card {...props}>
      <CardContent sx={{ minHeight: 200 }}>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Next appointment
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {user?.appointmentsRef[0]?.date || ""}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <Typography color="textSecondary" variant="caption">
            {today.getDate() -
            Number(user?.appointmentsRef[0]?.date.substring(0, 2))
              ? `en ${numeroALetras
                  .Unidades(
                    Number(user?.appointmentsRef[0]?.date.substring(0, 2)) -
                      today.getDate()
                  )
                  .toLowerCase()} dia/s`
              : 'Hoy'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
