import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

import classes from './Navbar.module.scss';

// import NavSearch from './NavSearch/NavSearch';
const NavSearch = React.lazy(() => import('./NavSearch/NavSearch'));

const Navbar = () => {
    const path = useLocation().pathname; 
    const [showNav, setShowNav] = useState(false);
    const dispatch = useDispatch()

    return (
        // Use white font on homepage and black font for all other pages
        <nav className={ path === '/' ? `${ classes.navbar } ${ classes.navHome }` : `${ classes.navbar } ${ classes.navNotHome }` }>
            <div className={classes.navLeft}>
                <Link to="/" className={ path.includes('/entry') ? `${ classes.sitelogo } ${ classes.navProject }` : `${ classes.sitelogo }` }><h1>research</h1></Link>

                {/* For Bigger screens. Hidden on smaller screens */}
                <NavSearch setShowNav={setShowNav} />

            </div>

            <div className={classes.navRight}>

                <div className={classes.lgScreenMenu}>
                    <Link to="/" className={classes.navLink}>Discover</Link>
                    <Link to="/start-project" className={classes.navLink}>Start a Project</Link>
                    <Link to="/profile" className={classes.navLink}>Profile</Link>
                    <Link to="/signup" className={classes.navLink}>Signup</Link>
                    <Link to="/login" className={classes.navLink}>Login</Link>
                    <div className={ classes.navLink } onClick={ () => dispatch( logout() ) }>Logout</div>
                </div>

                {/* For smaller screens. Hidden on bigger screens  */}
                <div className={`${classes.smScreenMenu} ${ showNav ? classes.smScreenMenuOpen : classes.smScreenMenuClosed }`}>
                    <div className={classes.smScreenMenuContainer}>
                        <div className={classes.sitelogo}><h1>research</h1></div>
                        <NavSearch setShowNav={setShowNav} />
                        <hr style={{ width: '100%' }} />
                        <div className={classes.navLinks}>
                            <Link to="/" className={classes.navLink} onClick={ () => setShowNav(false) }>Discover</Link>
                            <Link to="/start-project" className={classes.navLink} onClick={ () => setShowNav(false) }>Start a Project</Link>
                            <Link to="/profile" className={classes.navLink} onClick={ () => setShowNav(false) }>Profile</Link>
                        </div>
                    </div>
                    <div className={classes.closeMenu} onClick={ () => setShowNav(false) }>&#66338;</div>
                </div>
                
            </div>
            

            <div className={classes.toggleBtn} onClick={ () => setShowNav(!showNav) }>
                <div className={classes.firstLine}></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}

export default Navbar;