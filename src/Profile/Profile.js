import React from 'react';
import { auth } from '../firebase';

import Counter from '../Counter/Counter';

const Profile = () => (
  <section id="profile">
    <Counter
      showActions={true}
      topLine="You have had"
      uid={auth.currentUser.uid}
    />
  </section>
);

export default Profile;
