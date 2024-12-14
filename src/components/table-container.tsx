"use client";

import { SearchOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import * as React from "react";

export interface ITablePublicProps {
  headers: string[];
  children: React.ReactNode;
  searchFunction?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export default function TablePublic({ headers, children , searchFunction }: ITablePublicProps) {
  return (
    <TableContainer>
      <Box p={2} >
        <TextField
          label="Search by name"
          variant='standard'
          autoComplete="search"
          name="search"
          value={""}
          onChange={searchFunction}
          error={false}
          helperText={""}
          size="small"
        />
        <IconButton>
          <SearchOutlined/>
        </IconButton>
        
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell align="center" key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </TableContainer>
  );
}
