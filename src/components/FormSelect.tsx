import {
  FormControl,
  InputLabel,
  Select,
  type SelectProps
} from '@mui/material';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormSelectProps = {
  name: string;
  label: string;
} & SelectProps;

const FormInput: FC<IFormSelectProps> = ({ name, label, children, ...otherProps }) => {
  const { control } = useFormContext();

  const labelId = `${name}-label`;

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
          <InputLabel size='small' id={labelId}>{label}</InputLabel>
          <Select
            size='small'
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            labelId={labelId}
            label={label}
            {...otherProps}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
