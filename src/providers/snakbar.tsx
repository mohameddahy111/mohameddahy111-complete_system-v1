'use client'

import { SnackbarProvider } from 'notistack';
import * as React from 'react';

export interface ISnakbarProps {
  children: React.ReactNode;
}

export default function SnackPorvider ({children}: ISnakbarProps) {
  return (
    <SnackbarProvider anchorOrigin={{vertical:'top' , horizontal:'right'}}>
        {children}
    </SnackbarProvider>

  );
}
