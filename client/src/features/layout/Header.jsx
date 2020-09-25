import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="w-full flex justify-between py-16 px-16">
      <Link to="/">
        <Button variant="contained" color="primary">Home</Button>
      </Link>
      <div className="flex">
        <div className="mr-16">
          <Link to="/signin">
            <Button variant="contained" color="primary">Sign In</Button>
          </Link>
        </div>
        <Link to="/signup">
          <Button variant="contained" color="secondary">Sign Up</Button>
        </Link>
      </div>
    </div>

  );
}

export default Header;
