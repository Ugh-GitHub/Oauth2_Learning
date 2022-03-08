import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserPage({ store }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
        <h1 id="welcome">Welcome, {store.user.username}!</h1>
        <p>Your ID is: {store.user.id}</p>
        {/* Launch new project page here */}
    </div>
  );
}

export default connect(mapStoreToProps)(UserPage);