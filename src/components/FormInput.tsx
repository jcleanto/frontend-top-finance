import {
  FormControl,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
  label: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            helperText={error ? error.message : null}
            size='small'
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            {...otherProps}
          />
        </FormControl>
      )}
    />
  );
};

export default FormInput;
