import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center signIn"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '800px',
      }}
    >
      <h1 className="signInTitle">Cooking In Season</h1>
      <p className="signInWelcome">CELEBRATE THE SEASONS, ONE BITE AT A TIME</p>
      <Button type="button" size="lg" className="signInMembers" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
