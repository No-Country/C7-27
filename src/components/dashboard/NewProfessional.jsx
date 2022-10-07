import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  AddCircleOutlineRoundedIcon,
} from "../../components/auth";

import Link from "next/link";

export const NewProfessional = (props) => {
  return (
    <Card {...props}>
      <CardContent sx={{ minHeight: 200 }}>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom variant="overline">
              New Professional
            </Typography>
          </Grid>
          <Grid item>
            <Link href="/admin/registerProfessional">
              <Button
                size="large"
                variant="contained"
                startIcon={<AddCircleOutlineRoundedIcon />}
              >
                New Professional
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
