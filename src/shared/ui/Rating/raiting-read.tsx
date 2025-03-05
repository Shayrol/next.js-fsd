"use client";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";

interface IProps {
  rating: number;
}

export default function RatingRead(props: IProps) {
  const [value] = useState<number | null>(props.rating);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}
