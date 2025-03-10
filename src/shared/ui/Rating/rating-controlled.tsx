"use client";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface IValueState {
  ValueState: {
    value: number | null; // number | null
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
  };
}

const RatingControlled = (props: IValueState) => {
  // 명시적인 이름 지정
  // const [value, setValue] = useState<number | null>(0);
  const { value, setValue } = props.ValueState;

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
