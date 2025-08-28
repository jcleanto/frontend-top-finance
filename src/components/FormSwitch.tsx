import {
  FormControlLabel,
  Switch,
  type SwitchProps,
  Typography,
} from '@mui/material';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormSwitchProps = {
  name: string;
  label: string;
} & SwitchProps;

const FormSwitch: FC<IFormSwitchProps> = ({ name, label, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={<Switch checked={!!value} onChange={onChange} size='small' {...otherProps} />}
          label={<Typography variant='body2'>{label}</Typography>}
        />
      )}
    />
  );
};

export default FormSwitch;
