import React from 'react';
import MatButton, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  loading?: boolean,
}

export default function Button({loading, ...props}: Props & ButtonProps) {
  return (
    <React.Fragment>
      {loading ? (
        <MatButton {...props} disabled>
          {props.children}
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        </MatButton>
      ) : (
        <MatButton {...props}/>
      )}
    </React.Fragment>
  )
}