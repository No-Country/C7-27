import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './DashboardNavbar';
import { DashboardSidebar } from './DashboardSidebar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthenticateUser } from '../../store/slices/user';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if (!token) router.push("/");
    try {
      dispatch(actionAuthenticateUser(token));
    } catch (e) {
      // router.push("/");
    }
  }, [dispatch]);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
