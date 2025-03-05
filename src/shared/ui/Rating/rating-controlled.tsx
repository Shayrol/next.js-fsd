"use client";

import Box from "@mui/material/Box";
// import Rating from "@mui/material/Rating";
// // import Typography from "@mui/material/Typography";
// import { memo, useState } from "react";

// export default function RatingControlled() {
//   const [value, setValue] = useState<number | null>(0);

//   return (
//     <Box sx={{ "& > legend": { mt: 2 } }}>
//       {/* <Typography component="legend">Controlled</Typography> */}
//       <Rating
//         name="simple-controlled"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       />
//       {/* <Typography component="legend">Uncontrolled</Typography>
//       <Rating
//         name="simple-uncontrolled"
//         onChange={(event, newValue) => {
//           console.log(newValue);
//         }}
//         defaultValue={2}
//       />
//       <Typography component="legend">Read only</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       <Typography component="legend">Disabled</Typography>
//       <Rating name="disabled" value={value} disabled />
//       <Typography component="legend">No rating given</Typography>
//       <Rating name="no-value" value={null} /> */}
//     </Box>
//   );
// }

import { useState } from "react";
import Rating from "@mui/material/Rating";

const RatingControlled = () => {
  // 명시적인 이름 지정
  const [value, setValue] = useState<number | null>(0);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default RatingControlled;
