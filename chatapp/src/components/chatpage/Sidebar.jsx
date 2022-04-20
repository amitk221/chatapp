import React from 'react'

import { Grid, } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function Sidebar() {
    return (
        <>
            <Grid item lg={4}>

                <Paper
                    sx={{
                        height: 550,
                        width: 370,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs={3}>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>Amit Kumar</Typography>
                        </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs={3}>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>Amit Kumar</Typography>
                        </Grid>
              </Grid>  <Grid container spacing={5}>
                        <Grid item xs={3}>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>Amit Kumar</Typography>
                        </Grid>
              </Grid>
                </Paper>
            </Grid>
        </>
    )
}
