import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Breadcrumbs, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PaymentsIcon from '@mui/icons-material/Payments';
import { createFinanceFn } from '../api/financeApi';
import FormInput from '../../components/FormInput';
import type { IFinance } from '../api/types';

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const createSchema = z.object({
  valor: z.coerce.number<number>(),
  descricao: z.string().min(1, 'A Descrição é obrigatória'),
}) satisfies z.ZodType<IFinance>;

export type CreateInput = z.infer<typeof createSchema>;

const CreateFinancePage = () => {
  const navigate = useNavigate();

  // TODO: temporary get Auth User stored in localStorage, as the authentication flow is still not finished
  const localStorageItem = localStorage.getItem('authUser');
  let authUser = null;
  if (localStorageItem) {
    authUser = JSON.parse(localStorageItem);
  }

  const methods = useForm<CreateInput>({
    resolver: zodResolver(createSchema),
  });

  const { mutate, isPending } = useMutation(
    { mutationFn: (financeData: any) => createFinanceFn(financeData),
      onSuccess(data: any) {
        toast.success(data?.message);
        navigate('/finances');
      },
      onError(error: any) {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).response.data.message, {
            position: 'top-right',
          });
        }
      },
    }
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<CreateInput> = (values) => {
    mutate({
      ...values,
      userId: authUser?.id,
    });
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Breadcrumbs separator='›' aria-label='breadcrumb' sx={{ mb: 1 }}>
        <LinkItem key='1' to={'/finances'} color='inherit' sx={{ display: 'flex', alignItems: 'center' }}>
          <PaymentsIcon sx={{ mr: 0.5 }} fontSize='inherit' />Lançamentos Financeiros
        </LinkItem>
        <Typography key='2' color='text.primary'>
          Criar Novo Lançamento Financeiro
        </Typography>
      </Breadcrumbs>
      <FormProvider {...methods}>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete='off'
          maxWidth='27rem'
          width='100%'
          sx={{
            p: { xs: '1rem', sm: '2rem' },
            borderRadius: 2,
          }}
        >
          <FormInput name='valor' label='Valor' type='number' />
          <FormInput name='descricao' label='Descrição' />

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant='outlined'
              sx={{ mt: 2, mr: 2 }}
              disableElevation
              component={Link}
              to={'/finances'}
            >
              Cancelar
            </Button>
            <Button
              variant='contained'
              sx={{ mt: 2 }}
              disableElevation
              type='submit'
              loading={isPending}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Paper>
  );
};

export default CreateFinancePage;
