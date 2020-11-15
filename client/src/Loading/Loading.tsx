import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
  <Dimmer active>
    <Loader />
  </Dimmer>
);

export default Loading;
