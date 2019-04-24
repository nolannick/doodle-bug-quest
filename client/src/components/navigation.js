import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => (
    <div className="Nav">
        <nav>
            <Link to={'/family'} >Family Members</Link>
            <Link to={'/quest'} >Quests</Link>
            <Link to={'/reward'} >Rewards</Link>
        </nav>
    </div>
);

export default Nav;