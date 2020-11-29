import React from 'react';
import { Text } from '@chakra-ui/react';

interface IProps {
  dateCreated: Date | string;
}

const DateDisplay: React.FC<IProps> = ({ dateCreated }) => {
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const date = new Date(dateCreated);
  const displayDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );
  const displayTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    date
  );

  return (
    <Text color='gray.500'>
      {displayDate} at {displayTime}
    </Text>
  );
};

export default DateDisplay;
