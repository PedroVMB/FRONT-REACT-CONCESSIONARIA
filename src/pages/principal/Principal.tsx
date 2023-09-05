import { http } from "../../http";
import IVeiculo from "../../interface/IVeiculo";
import { ChangeEvent, useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import QuickSearchToolbar from "../../components/table/QuickSearchToolBar";
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { TableCell, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


export const Principal = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IVeiculo[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [veiculos, setVeiculos] = useState<IVeiculo[]>([]);

  useEffect(() => {
    http
      .get<IVeiculo[]>("veiculos")
      .then((response) => setVeiculos(response.data))
      .catch((error) => {
        console.error("Error fetching veiculos:", error);
      });
  }, []);

  const excluir = (veiculoAhSerExcluido: IVeiculo) => {
    http.delete(`veiculos/${veiculoAhSerExcluido.id}`)
        .then(() => {
            const listaVeiculos = veiculos.filter(restaurante => restaurante.id !== veiculoAhSerExcluido.id)
            setVeiculos([...listaVeiculos])
        })
}

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);

    const filteredRows = veiculos.filter((row) => {
      return (
        row.tipo.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.cor.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.marca.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.modelo.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.ano_fabricacao.toString().includes(searchValue) ||
        row.estado.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.km_rodados.toString().includes(searchValue) ||
        row.passagem_por_leilao
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        row.formas_de_pagamento
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });
    setFilteredData(searchValue.length ? filteredRows : []);
  };

  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 110,
      field: "tipo",
      headerName: "Tipo",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.tipo}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "cor",
      headerName: "COR",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.cor}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "marca",
      headerName: "MARCA",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.marca}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "modelo",
      headerName: "modelo",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.modelo}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "ano_fabricacao",
      headerName: "ano_fabricacao",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.ano_fabricacao}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "estado",
      headerName: "estado",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.estado}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "km_rodados",
      headerName: "km_rodados",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.km_rodados}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "passagem_por_leilao",
      headerName: "passagem_por_leilao",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.passagem_por_leilao}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "formas_de_pagamento",
      headerName: "formas_de_pagamento",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {row.formas_de_pagamento}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "action",
      headerName: "Excluir",
      renderCell: ({ row }) => (
        <TableCell>
          <Button variant="outlined" color="error" onClick={() => excluir(row)}>
            Excluir
          </Button>
        </TableCell>
      ),
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: "editar",
      headerName: "Editar",
      renderCell: ({ row }) => (
        <TableCell>
          <RouterLink to={`veiculos/${row.id}`}>Editar</RouterLink>
        </TableCell>
      ),
    },
  ];

  return <>
    <Card>
      <CardHeader title='VEICULOS' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : veiculos}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1.125rem',
          },
        }}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined',
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
          },
        }}
      />
    </Card>
  </>;
};
