import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export const NewAppointment = (props) => {

    return (
        <Card {...props}>
            <CardContent sx={{minHeight: 200}}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item xs={12}>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="overline"
                >
                    New appointment
                </Typography>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained" startIcon={<AddCircleOutlineRoundedIcon />}>New appointment</Button>
                </Grid>
            </Grid>
            </CardContent>
        </Card>
    )
}