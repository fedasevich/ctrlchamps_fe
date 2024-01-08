import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
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
  StyledButton,
  TableCell,
  TableHeader,
  TableRow,
  Title,
} from 'src/components/admin-management/styles';
import { useLocales } from 'src/locales';
import {
  ADMINS_LIMIT,
  DEBOUNCE_DELAY,
  FIRST_PAGE,
} from 'src/components/admin-management/constants';
import Modal from 'src/components/reusable/modal/Modal';
import { useGetFilteredAdminsQuery } from 'src/redux/api/adminPanelAPI';
import { useDeleteUserMutation } from 'src/redux/api/userApi';
import { useDebounce } from 'src/hooks/useDebounce';

function AdminManagement(): JSX.Element | null {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteUserId, setDeleteUserId] = useState<string>('');

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: admins,
    isSuccess,
    isLoading,
    refetch,
  } = useGetFilteredAdminsQuery({
    search: debouncedSearchTerm,
    offset: (page - FIRST_PAGE) * ADMINS_LIMIT,
  });

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteModalToggle = (): void => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleCloseModalAndSetUserId = (userId: string): void => {
    setDeleteUserId(userId);
    handleDeleteModalToggle();
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handleDeleteUser = async (): Promise<void> => {
    try {
      await deleteUser(deleteUserId).unwrap();
      refetch();
      handleDeleteModalToggle();
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, page, refetch]);

  if (isLoading) return null;

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
          onChange={handleTermSearch}
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
              {isSuccess &&
                admins.data.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      {admin.firstName} {admin.lastName}
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <GreenSpan>{admin.role}</GreenSpan>
                    </TableCell>
                    <TableCell>{admin.phoneNumber}</TableCell>
                    <TableCell>{admin.dateOfBirth}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <ModeEditOutlineOutlinedIcon />
                      </IconButton>
                      <IconButton onClick={(): void => handleCloseModalAndSetUserId(admin.id)}>
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Stack>

        <Stack display="flex" direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(admins!.count / ADMINS_LIMIT)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>

        <Modal
          isActive={isDeleteModalActive}
          onClose={handleDeleteModalToggle}
          title={translate('adminManagement.deleteUser')}
        >
          <Box display="flex" flexDirection="column">
            <Title>{translate('adminManagement.deleteWarning')}</Title>

            <Box display="flex" gap={2}>
              <StyledButton variant="contained" onClick={handleDeleteModalToggle}>
                {translate('adminManagement.no')}
              </StyledButton>

              <StyledButton variant="contained" color="error" onClick={handleDeleteUser}>
                {translate('adminManagement.yes')}
              </StyledButton>
            </Box>
          </Box>
        </Modal>
      </ManagementWrapper>
    </MainWrapper>
  );
}

export default AdminManagement;
