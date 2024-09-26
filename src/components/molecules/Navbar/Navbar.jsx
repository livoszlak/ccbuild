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
  Input,
} from "@mui/material";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { styled } from "@mui/system";
import styles from "./Navbar.module.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Logo = styled("img")({
  height: "70px",
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
    <Box position="static" sx={{  height: 'fit-content !important', backgroundColor: "white", color: "black" }}>
      <Toolbar
        sx={{
          height: "fit-content !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ height: "auto", padding: "11px 0 11px" }}>
        <Logo
          src="/logo.svg"
          alt="Logo"
          sx={{height: "70px !important"}}          
        />
        </Box>
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
          <Box sx={{borderRadius: '100px', width: 'fit-content', backgroundColor: '#F1F1F1', height: '32px',marginRight: '16px', display: 'flex', flexDirection: 'row'}}>
          <IconButton color="inherit" >
            <AccountCircle />
            <p className={styles.nameText}>MARIE KALMNÄS</p>
            <ArrowDropDownIcon sx={{width:"16px"}}/>
          </IconButton>
          </Box>
          <Box sx={{borderRadius: '100px', width: 'fit-content', backgroundColor: '#F1F1F1', height: '32px', marginRight: '16px', display: 'flex', flexDirection: 'row'}}>
          <IconButton color="inherit" >
            <p className={styles.nameText}>SV</p>
            <ArrowDropDownIcon sx={{width:"16px"}}/>
          </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Box
        position="static"
        sx={{
          backgroundColor: "#112f5f",
          color: "white",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          boxShadow: "none",
          maxHeight: '56px',
        }}
      >
        <Toolbar sx={{alignItems: 'center'}}>
          <Button sx={{fontSize: '11px'}} color="inherit">ÖVERSIKT</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">PROJEKT</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">PRODUKTER</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">EFTERLYSNINGAR</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">ORGANISATIONSADMIN</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">VÄRDEANALYS</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">MÄRKNING</Button>
          <Button sx={{fontSize: '11px'}} color="inherit">HJÄLP</Button>
          <Box sx={{marginLeft: '126px', width:'464px', height:'39px',backgroundColor: "#28436F", display:'flex', flexDirection: 'row', alignItems:'center', marginBottom:'7px'}}>
            <IconButton color="inherit">
              <Search />
            </IconButton  >
            <Input sx={{ color: "white", width: '100%', height:'100%', }} placeholder="Sök produkter, kategorier.." />
          </Box>
        </Toolbar>
      </Box>
      <Box position="static" sx={{ backgroundColor: "white", color: "black", borderBottom: '1px solid #E2E2E2', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '32px'}}>
        <p className={styles.smallText}> Översikt</p>
        <PlayArrowIcon sx={{height: '10px'}}/>
        <p className={styles.smallText}>Projekt</p>
        <PlayArrowIcon sx={{height: '10px'}}/>
        <p className={styles.smallText}>Grupp3</p>
        <PlayArrowIcon sx={{height: '10px'}}/>
        <p className={styles.smallText}>Skapa Produkt</p>
    </Box>
    </Box>
  );
};

export default Navbar;
