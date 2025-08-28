import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { Box, Breadcrumbs, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import { getFinanceByIdFn, updateFinanceFn } from '../../api/financeApi';
import { useStateContext } from '../../context';
import FormInput from '../../components/FormInput';

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #8fc9f9;
  &:hover {
    text-decoration: underline;
  }
`;

const editFinanceSchema = z.object({
  id: z.number(),
  valor: z.coerce.number(),
  descricao: z.string().min(1, 'A Descrição é obrigatória'),
});

export type EditFinanceInput = z.infer<typeof editFinanceSchema>;

const EditFinancePage = () => {
  const stateContext = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isLoadingFinance, error, data } = useQuery({
    queryKey: ['getFinancerById', id], 
    queryFn: () => getFinanceByIdFn(id),
  });

  // const user = stateContext.state.authUser;

  const methods = useForm<EditFinanceInput>({
    resolver: zodResolver(editFinanceSchema),
  });

  const { mutate, isPending } = useMutation(
    { mutationFn: (financeData: any) => updateFinanceFn({ ...financeData }),
      onSuccess(data) {
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
    setValue,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (!isLoadingFinance && !error && data) {
      setValue('id', data.data.id);
      setValue('valor', data.data.valor);
      setValue('descricao', data.data.descricao);
    }
  }, [isLoadingFinance, error, data, setValue]);

  const onSubmitHandler: SubmitHandler<EditFinanceInput> = (values) => {
    mutate(values);
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Breadcrumbs separator='›' aria-label='breadcrumb' sx={{ mb: 1 }}>
        <LinkItem key='1' to={'/finances'} color='inherit' sx={{ display: 'flex', alignItems: 'center' }}>
          <BusinessIcon sx={{ mr: 0.5 }} fontSize='inherit' />Lançamentos Financeiros
        </LinkItem>
        <Typography key='2' color='text.primary'>
          Editar
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

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant='outlined'
                sx={{ mt: 2,  mr: 2 }}
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
                loading={isPending || isLoadingFinance}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Paper>
  );
};

export default EditFinancePage;
