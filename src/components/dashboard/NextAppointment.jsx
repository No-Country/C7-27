import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const NextAppointment = (props) => {
    return (
        <Card {...props}>
            <CardContent sx={{minHeight: 200}}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="overline"
                >
                    Next appointment
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    21/10/22
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    sx={{
                    backgroundColor: 'success.main',
                    height: 56,
                    width: 56
                    }}
                >
                    <PeopleIcon />
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                pt: 2
                }}
            >
                <Typography
                color="textSecondary"
                variant="caption"
                >
                in three days
                </Typography>
            </Box>
            </CardContent>
        </Card>
    )
}