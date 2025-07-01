import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchemaType, registerSchema } from "./schema";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "./components/CustomIcons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import fetchApi from "../../../utils/fetchApi";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Register = (props: { disableCustomTheme?: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    console.log(data);
    const res = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/auth/register`,{
        method: "POST",
        body: JSON.stringify({ 
          email           : data.email, 
          password        : data.password,
          confirmPassword : data.confirmPassword
        }),
    })
    const result = await res.json();
    console.log(result);
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 1,
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                // margin="dense"
                id="email"
                type="email"
                // name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                size="small"
                {...register("email")}
              />
            </FormControl>
            {errors.email && (
              <Typography color="error" variant="caption">
                {errors.email.message}
              </Typography>
            )}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                // name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                size="small"
                {...register("password")}
              />
            </FormControl>
            {errors.password && (
              <Typography color="error" variant="caption">
                {errors.password.message}
              </Typography>
            )}
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                // name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="current-confirmPassword"
                required
                fullWidth
                variant="outlined"
                size="small"
                {...register("confirmPassword")}
              />
            </FormControl>
            {errors.confirmPassword && (
              <Typography color="error" variant="caption">
                {errors.confirmPassword.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ height: "40px" }}
            >
              Register
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
};

export default Register;
