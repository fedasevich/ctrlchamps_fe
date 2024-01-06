import { ChangeEvent, useState } from 'react';
import {
  InputAdornment,
  OutlinedInput,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableHead,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import {
  AddUserButton,
  Cylinder,
  GreenSpan,
  IconButton,
  MainWrapper,
  ManagementWrapper,
  PageName,
  TableCell,
  TableHeader,
  TableRow,
} from 'src/components/admin-management/styles';
import { useLocales } from 'src/locales';

function AdminManagement(): JSX.Element {
  const { translate } = useLocales();

  const [page, setPage] = useState(1);

  const handlePageChange = (event: ChangeEvent, value: number) => {
    setPage(value);
  };

  function createData(name: string, calories: any, fat: any, carbs: any, protein: any) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt', 3242432424, 'may 6, 2022'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <MainWrapper>
      {translate('adminManagement.userRoles')}
      <ManagementWrapper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {translate('adminManagement.title')}
          </PageName>
          <AddUserButton variant="contained">{translate('adminManagement.addUser')}</AddUserButton>
        </Stack>

        <OutlinedInput
          placeholder={translate('adminManagement.search')}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          fullWidth
          size="small"
        />

        <Stack mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{translate('adminManagement.name')}</TableHeader>
                <TableHeader>{translate('adminManagement.email')}</TableHeader>
                <TableHeader>{translate('adminManagement.typeUser')}</TableHeader>
                <TableHeader>{translate('adminManagement.phone')}</TableHeader>
                <TableHeader>{translate('adminManagement.date')}</TableHeader>
                <TableHeader align="right">{translate('adminManagement.action')}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>
                    <GreenSpan>{row.fat}</GreenSpan>
                  </TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>

        <Stack display="flex" direction="row" justifyContent="center" mt={2}>
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </Stack>
      </ManagementWrapper>
    </MainWrapper>
  );
}

export default AdminManagement;
