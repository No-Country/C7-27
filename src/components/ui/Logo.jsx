import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AccessibleForwardIcon, Box, Stack, Typography } from "../auth";
export const Logo = ({ color = "primary" }) => {
  const { name } = useSelector((state) => state.ui);
  const router = useRouter();

  return (
    <Box onClick={() => router.push("/")} sx={{ cursor: "pointer" }}>
      <Stack direction="row" spacing={1}>
        <AccessibleForwardIcon sx={{ fontSize: 40 }} color={color} />
        <Typography variant="h5" sx={{ fontSize: "30px" }}>
          {name}
        </Typography>
      </Stack>
    </Box>
  );
};
