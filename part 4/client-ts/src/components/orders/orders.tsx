import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrdersStateStore, useSupplyStateStore } from '../../store';
import { Status } from '../../types';
import { getOrders, updateStatusOrder } from './query';

const columns: GridColDef[] = [
  {
    field: 'company_name',
    headerName: 'Company Name',
    width: 150,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'representative_name',
    headerName: 'Representative Name',
    width: 200,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'product',
    headerName: 'Product name',
    width: 130,
    disableColumnMenu: true,
    sortable: false,

  },
  {
    field: 'quantity_to_order',
    headerName: 'Quantity',
    width: 100,
    disableColumnMenu: true,
    sortable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 70,
    disableColumnMenu: true,
    sortable: false
  },
];

export default function Orders() {
  const navigate = useNavigate();
  const { supply } = useSupplyStateStore()
  const [rows, setRows] = useState<any>([])
  const { orders: ordersFromStore, setOrders: setOrdersFromStore } = useOrdersStateStore()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
  };

  const handleAddSelectedToList = () => {
    selectedRows.map((id) => {
      updateStatusOrder(id, Status.IN_PROGRESS).then(() => {

        setRows((prevRows: any[]) => {
          return prevRows.map((row) =>
            row.id === id ? { ...row, status: Status.IN_PROGRESS } : row
          );
        });
        setOrdersFromStore(rows)
      })
    })
    alert("Orders have been confirmed successfully.")
  };

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((data) => {
        let rowsToAdd: any[] = []
        data.map((order) => {
          if (typeof order.supply != "string" && typeof order.product != "string" && order.supply.id == supply.id && order.status == Status.STARTED)
            rowsToAdd.push({ status: order.status, id: order.id, company_name: order.supply.company_name, representative_name: order.supply.representative_name, quantity_to_order: order.quantity_to_order, product: order.product.product_name })
        })
        console.log(rowsToAdd)
        setRows(rowsToAdd)
        setOrdersFromStore(rowsToAdd)
        setError(null);
      })
      .catch((err) => {
        setError('Failed to load orders');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
        <h1>Orders</h1>
        <Box style={{ textAlign: 'center', marginBottom: '10px' }} />
        <Paper sx={{
          width: "850px",
          maxWidth: '9000px',
          height: '85vh',
          maxHeight: 400,
          padding: 2,
          borderRadius: '8px',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <DataGrid
            rows={ordersFromStore}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            hideFooterPagination
          />
          <Button
            disabled={selectedRows.length == 0}
            onClick={handleAddSelectedToList}
            variant="contained"
            sx={{ mb: 1 }}
          >
            Confirm Orders
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
