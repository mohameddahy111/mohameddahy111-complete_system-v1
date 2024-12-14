import SingUpTabs from '@/components/auth/singup-tabs';
import { Box, Card, CardContent, Tab, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import * as React from 'react';

export interface ISingupPageProps {
}

export default function SingupPage ({}: ISingupPageProps) {
  return (
    <Box width={'100%'} height={'100vh'} bgcolor={grey[100]} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
     <Card sx={{width:'50%' , borderRadius:'20px'}}>
      <CardContent>
        <SingUpTabs />
      </CardContent>
     </Card>
    </Box>
  );
}
