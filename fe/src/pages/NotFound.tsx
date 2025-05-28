import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "grey.100",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="text.primary">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        Page Not Found
      </Typography>
      <Button href="/" variant="contained" color="primary" sx={{ mt: 4 }}>
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
