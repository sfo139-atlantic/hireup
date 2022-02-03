import React from 'react';

const UserContext = React.createContext({
  viewProfileID: '',
  setViewProfileID: (id) => {},
});

UserContext.displayName = 'UserId';

export default UserContext;
