import * as React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridSlots,
} from '@mui/x-data-grid';
import { Box, Breadcrumbs, Button, Paper, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteFinanceFn, getFinancesFn } from '../../api/financeApi';
import { type IFinance } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';

type Row = (IFinance[])[number];

export default function ListFinancePage() {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [financeIdToDelete, setFinanceIdToDelete] = React.useState('0');

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['allFinances'], 
    queryFn: () => getFinancesFn(),
  });

  const { mutate, isPending } = useMutation(
    { mutationFn: (financeId: string) => deleteFinanceFn(financeId),
      onSuccess(data) {
        toast.success(data?.message);
        queryClient.invalidateQueries();
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

  const handleOpenConfirmDialog = (financeId: string) => {
    setFinanceIdToDelete(financeId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDialog = () => {
    mutate(financeIdToDelete);
    setOpenConfirmDialog(false);
  };  

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      { field: 'descricao', headerName: 'Descrição', type: 'string', flex: 1, minWidth: 250 },
      { field: 'valor', headerName: 'Valor', type: 'number', flex: 1 },
      { field: 'createdAt', headerName: 'Criado em', type: 'dateTime', width: 180, valueGetter: (value) => value && new Date(value) },
      { field: 'updatedAt', headerName: 'Atualizado em', type: 'dateTime', width: 180, valueGetter: (value) => value && new Date(value) },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => navigate(`/finance/${params.id}`)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpenConfirmDialog(`${params.id}`)}
            disabled={isPending}
          />,
        ],
      },
    ],
    [navigate],
  );

  React.useEffect(() => {
    if (!isLoading && !error && data) {
      setRows(data.data);
    }
  },
  [isLoading, error, data]);

  return (
    <>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumbs separator='›' aria-label='breadcrumb' sx={{ mb: 1 }}>
          <Typography key='1' color='text.primary' sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 0.5 }} fontSize='inherit' />Lançamentos Financeiros
          </Typography>
        </Breadcrumbs>
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay']  
          }}
          loading={isLoading}
        />
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'end'  }}>
        <Button
          loading={isLoading}
          variant='contained'
          sx={{ mt: 1, mr: 2 }}
          onClick={() => navigate('/finance')}
        >
          Criar Novo Lançamento Financeiro
        </Button>
      </Box>
      <ConfirmDialog
        title='Tem certeza que deseja deletar esse Lançamento Financeiro?'
        description='Clique em Confirmar para deletar ou clique em Cancelar.'
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
}