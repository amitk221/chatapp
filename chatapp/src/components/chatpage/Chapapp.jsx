import React from 'react'
import Sidebar from './Sidebar'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Chapapp() {
  return (
     <>
       
         <Container maxWidth="lg">
            



         <Box component="span"    
            sx={{
                    width: 1000,
                    height: 1000,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
            }} 
         >
                  

                <Grid container spacing={2}>
                  <Sidebar />
                   
                    <Grid item xs={8} lg={8} md={1}  >
                       
                        <Paper
                                sx={{
                                height: 550,
                                width: 750,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                }}
                         />
                    </Grid>

                
                    </Grid>
         </Box>
         </Container>

     </>
  )
}
