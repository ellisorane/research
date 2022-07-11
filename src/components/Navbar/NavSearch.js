import React from "react";

import classes from './Navbar.module.scss';

const NavSearch = () => {
    return (
        <div className={classes.navSearch}>
            <form action="">
                <input type='input' placeholder="Search projects" />
                <input type="submit" value="Go" />
            </form>
        </div>
    );
}

export default NavSearch;