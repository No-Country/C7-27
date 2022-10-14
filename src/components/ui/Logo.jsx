import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AccessibleForwardIcon, Box, Typography } from '../auth';
export const Logo = ({
  color = 'primary',
  variant = 'h3',
  component = 'h3',
}) => {
  const { name } = useSelector((state) => state.ui);
  const router = useRouter();

  return (
    <Box onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
      <Typography variant={variant} component={component}>
        <AccessibleForwardIcon sx={{ fontSize: 40 }} color={color} />
        {name}
      </Typography>
    </Box>
  );
};
