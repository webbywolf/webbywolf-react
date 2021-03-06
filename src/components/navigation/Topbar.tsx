import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button, { ButtonProps } from "@mui/material/Button";
import Link, { LinkProps } from "@mui/material/Link";
import navOptions from "data/navOptions";
import AppLogo from "components/others/AppLogo";
import { useMediaQuery, useScrollTrigger } from "@mui/material";
import NavbarExtraMenu from "components/others/NavbarExtraMenu";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isScrolled?: boolean;
}

interface TopbarProps {
  theme: any;
  open: boolean;
  colorMode: any;
  scrollTarget: Node | undefined;
  handleDrawerOpen: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" || prop === "open",
})<AppBarProps>(({ theme, open, isScrolled }) => ({
  transition: theme.transitions.create(["margin", "width", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  color: theme.palette.mode === "light" ? "#111" : "",
  background: isScrolled
    ? theme.palette.mode === "light"
      ? "#fff"
      : ""
    : "transparent",
  [theme.breakpoints.up("md")]: {
    "& .MuiToolbar-root": {
      paddingTop: "2vh",
      paddingRight: "6vw",
      paddingBottom: "2vh",
      paddingLeft: "6vw",
    },
  },

  "& .MuiIconButton-edgeStart": {
    marginRight: 5,
  },
  "& .activeNav .MuiButton-root::before": {
    transform: "scaleX(1)",
  },
}));

const NavButton = styled(
  Button,
  {}
)<ButtonProps>(({ theme }) => ({
  width: "100%",
  textTransform: "initial",
  fontWeight: 700,
  fontSize: 16,

  "&::before": {
    transition: "300ms",
    bottom: 0,
    height: 3,
    width: "65%",
    transform: "scaleX(0)",
    transformOrigin: "bottom left",
    borderRadius: 5,
    content: '""',
    position: "absolute",
    backgroundColor: "#d1d646",
  },
  "&:hover::before": {
    transform: "scaleX(1)",
    transformOrigin: "bottom right",
  },
  "& .MuiButton-startIcon": {
    marginRight: 12,
  },
}));

const NavLink = styled(
  Link,
  {}
)<LinkProps>(({ theme }) => ({
  width: 150,
  color: "inherit",
  textDecoration: "none",
}));

function Topbar({
  theme,
  colorMode,
  open,
  handleDrawerOpen,
  scrollTarget,
}: TopbarProps) {
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));
  const isScrolled = useScrollTrigger({
    target: scrollTarget,
    threshold: 400,
    disableHysteresis: true,
  });

  return (
    <AppBar position="static" open={open} isScrolled={isScrolled}>
      <Toolbar>
        {!isLG && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <AppLogo
          height="50"
          dark={theme.palette.mode === "light"}
          style={{
            objectFit: "contain",
            marginLeft: isLG ? "6vw" : 0,
            marginRight: isLG ? 10 : 0,
          }}
        />

        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          Webby
          <span
            style={{
              color: theme.palette.mode === "dark" ? "#ffeb3b" : "#ff6347",
            }}
          >
            Wolf
          </span>
        </Typography>

        {isLG &&
          navOptions.slice(0, 3).map((option) => (
            <NavLink
              href={option.to}
              className={
                window.location.pathname === option.to ? "activeNav" : ""
              }
            >
              <NavButton
                href={option.to}
                startIcon={option.icon}
                color="inherit"
                size="large"
              >
                {option.label}
              </NavButton>
            </NavLink>
          ))}

        {isLG && <NavbarExtraMenu navOptions={navOptions.slice(3)} />}

        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
