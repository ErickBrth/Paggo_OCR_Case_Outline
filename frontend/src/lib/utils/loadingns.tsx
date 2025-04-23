import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonAnimation() {
  return (
    <Box sx={{ width: 800, margin: 0 }}>
      <Skeleton height={70} />
      <Skeleton height={70} animation="wave" />
      <Skeleton height={70} animation={false} />
      <Skeleton height={70} />
      <Skeleton height={70} animation="wave" />
      <Skeleton height={70} animation={false} />
    </Box>
  );
}
