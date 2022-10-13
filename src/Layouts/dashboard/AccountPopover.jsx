import PropTypes from "prop-types";
import {
  Box,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "../../components/auth";

import { capitalize } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { actionUserLogout } from "../../store/slices/user";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;

  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = async () => {
    await dispatch(actionUserLogout());
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {`${capitalize(user?.firstName || "")} ${capitalize(
            user?.lastName || ""
          )}`}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
