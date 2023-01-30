import React, { useState } from "react";
import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

export default function MyAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLink = (link) => {
    setMenuOpen(false);
    window.open(link);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IBM Decision Manager Open Edition
        </Typography>

        {/* <Button color="inherit" onClick={(e) => setMenuOpen(true)}>
          Links
        </Button> */}
        <Icons>
          <HelpCenterIcon fontSize="large" onClick={(e) => setMenuOpen(true)} />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={menuOpen}
        onClose={(e) => setMenuOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={(e) => handleLink("https://www.ibm.com/docs/en/ibamoe")}
        >
          IBM Docs
        </MenuItem>
        <MenuItem onClick={(e) => handleLink("https://blog.kie.org/")}>
          KIE Blog
        </MenuItem>
        <MenuItem onClick={(e) => handleLink("https://kogito.kie.org/")}>
          Kogito
        </MenuItem>
        <MenuItem
          onClick={(e) =>
            handleLink(
              "https://kiegroup.github.io/dmn-feel-handbook/#dmn-feel-handbook"
            )
          }
        >
          FEEL
        </MenuItem>
        <MenuItem
          onClick={(e) => handleLink("https://learn-dmn-in-15-minutes.com/")}
        >
          DMN 15 Mins
        </MenuItem>
        <MenuItem
          onClick={(e) =>
            handleLink("https://github.com/gerry-baird/decision-manager-l3-ui")
          }
        >
          This App on github
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
