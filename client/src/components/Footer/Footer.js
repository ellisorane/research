import React from 'react';


import classes from './Footer.module.scss';


const Footer = () => {
    return (
        <footer className={classes.footer}>
           <p>Research {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer;