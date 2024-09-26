import React from 'react';
import styles from './Footer.module.css';
import { Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer () {
    const categories = [
        "Start",
        "Projekt",
        "Produkter",
        "Efterlysningar",
        "Organisationsadmin",
        "Värdeanalys",
        "Märkning",
        "Hjälp"
    ];
    return (
        <footer className={styles.wrapper}>
            <h1 className={styles.headerText}>CCBuild.se - Produktbanken</h1>
            <Box className={styles.categoriesContainer}>
                {categories.map((category) => (
                    <p className={styles.categories}>{category}</p>
                ))}
            </Box>
            <p className={styles.mediumText}>CCBuild har utvecklats med stöd från Vinnova – läs mer på <inline className={styles.categories}>www.ccbuild.se</inline></p>
            <p className={styles.mediumText}>Följ oss på sociala medier  <FacebookIcon sx={{height: '20px'}}/> <InstagramIcon sx={{height: '20px'}} /> <LinkedInIcon sx={{height: '20px'}}/> <YouTubeIcon sx={{height: '20px'}}/> </p>
        </footer>   
    )
}