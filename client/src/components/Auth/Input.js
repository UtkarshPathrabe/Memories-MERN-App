import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ autoFocus, handleChange, label, name, half, type, handleShowPassword, helperText }) => {

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        autoFocus={autoFocus}
        xs={6}
        variant="outlined"
        required
        type={type}
        fullWidth
        helperText={helperText}
        InputProps={(name === 'password')
          ? { endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {(type === 'password') ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )} : null}
      />
    </Grid>
  );
};

export default Input;
