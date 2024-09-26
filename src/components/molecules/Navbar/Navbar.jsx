import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { styled } from "@mui/system";
import styles from "./Navbar.module.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Logo = styled("img")({
  height: "40px",
  marginRight: "10px",
});

const SearchInput = styled("input")({
  backgroundColor: "white",
  border: "none",
  borderRadius: "4px",
  padding: "5px 10px",
  marginLeft: "10px",
});

const topSectionTerms = [
  { text: "CCBUILD", hasIcon: false },
  { text: "TJÄNSTER", hasIcon: false },
  { text: "MARKNADSPLATSEN", hasIcon: true },
  { text: "PRODUKTBANKEN", hasIcon: true },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo
          src="src/assets/logo.svg"
          alt="Logo"
          sx={{ height: "70px", padding: "11px 0 11px" }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
        {
        topSectionTerms.map((term) => (

          <Button
          key={term}
            color="inherit"
            sx={{
              fontSize: "11px",
              textTransform: "none !important",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              border: "none",
              padding: "8px 16px",
              borderRadius: "50px",
            }}
          >
            {term.text}
            {term.hasIcon && <ArrowDropDownIcon sx={{width:"16px"}}/>}
          </Button>
          ))}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Button
            color="inherit"
            sx={{ fontSize: "11px", fontFamily: "'Inter', sans-serif" }}
          >
            SV
          </Button>
        </Box>
      </Toolbar>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#112f5f",
          color: "white",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <Toolbar>
          <Button color="inherit">ÖVERSIKT</Button>
          <Button color="inherit">PROJEKT</Button>
          <Button color="inherit">PRODUKTER</Button>
          <Button color="inherit">EFTERLYSNINGAR</Button>
          <Button color="inherit">ORGANISATIONSADMIN</Button>
          <Button color="inherit">VÄRDEANALYS</Button>
          <Button color="inherit">MÄRKNING</Button>
          <Button color="inherit">HJÄLP</Button>
          <Box sx={{ flexGrow: 1 }} />
          <SearchInput placeholder="Sök produkter, kategorier.." />
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>
    </AppBar>
  );
};

export default Navbar;
