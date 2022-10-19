import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AccessibleForwardIcon, Box, Stack, Typography } from "../auth";
export const Logo = ({ color = "primary" }) => {
  const { name } = useSelector((state) => state.ui);
  const router = useRouter();

  return (
    <Box
      className="animate__animated animate__fadeInLeft"
      onClick={() => router.push("/")}
      sx={{ cursor: "pointer", display: "flex", flexDirection: "row" }}
    >
      <Typography variant={variant} component={component}>
        <AccessibleForwardIcon sx={{ fontSize: 40 }} color={color} />
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
    </Box>
  );
};
