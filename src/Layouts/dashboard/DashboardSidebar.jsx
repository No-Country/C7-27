import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { Logo } from "../../components/ui/Logo";
import { NavItem } from "./NavItem";
import { useSelector } from "react-redux";

export const DashboardSidebar = (props) => {
  const { user } = useSelector((state) => state.users);
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const Patientitems = [
    {
      href: "/dashboard",
      icon: <Logo fontSize="small" />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/PatientProfile",
      icon: <Logo fontSize="small" />,
      title: "Profile",
    },
    {
      href: "/dashboard/appointments",
      icon: <Logo fontSize="small" />,
      title: "Appointments",
    },
    {
      href: "/dashboard/createAppointment",
      icon: <Logo fontSize="small" />,
      title: "New Appointment",
    },
  ];

  const Professionalitems = [
    {
      href: "/dashboard",
      icon: <Logo fontSize="small" />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/ProfessionalProfile",
      icon: <Logo fontSize="small" />,
      title: "Profile",
    },
    {
      href: "/dashboard/appointments",
      icon: <Logo fontSize="small" />,
      title: "Appointments",
    },
    {
      href: "/dashboard/clinicalHistory",
      icon: <Logo fontSize="small" />,
      title: "Clinical History",
    },
    {
      href: "/dashboard/updateClinicalHistory",
      icon: <Logo fontSize="small" />,
      title: "Update Clinical History",
    },
  ];

  const adminItems = [
    {
      href: "/dashboard",
      icon: <Logo fontSize="small" />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/ProfessionalProfile",
      icon: <Logo fontSize="small" />,
      title: "Profile",
    },
    {
      href: "/admin/AllProfessionals",
      icon: <Logo fontSize="small" />,
      title: "Professionals",
    },
    {
        href: "/dashboard/edit",
        icon: <Logo fontSize="small" />,
        title: "Edit Web",
    },
  ];

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const itemsArray = () => {
    if (user) {
      if (user.isAdmin) {
        return adminItems;
      } else {
        return user.isProfessional ? Professionalitems : Patientitems;
      }
    } else {
      return [];
    }
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo variant="h5" />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "default",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  MediApp
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Medical Appointments
                </Typography>
              </div>
              {/* <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {itemsArray().map((item) => (
            <NavItem
              key={item.title}
              //   icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          <NavItem
            key="Change Password"
            title="Changed Password"
            href={`/${user?._id}/NewPassword`}
          />
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
