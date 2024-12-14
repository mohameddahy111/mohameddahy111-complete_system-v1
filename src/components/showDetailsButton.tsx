'use client';

import { VisibilityOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import * as React from "react";

export interface IShowDetailsButtonProps {
  id: string;
		
}

export default function ShowDetailsButton({ id }: IShowDetailsButtonProps) {
  return (
    <IconButton LinkComponent={"a"} href={`/dashboard/employees/${id}/profile`}>
      <VisibilityOutlined sx={{ color: "primary.main" }} />
    </IconButton>
  );
}
