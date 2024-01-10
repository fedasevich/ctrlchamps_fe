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

import { useLocales } from 'src/locales';
import Modal from 'src/components/reusable/modal/Modal';
import { useDeleteAppointmentMutation } from 'src/redux/api/appointmentApi';
import { useGetAllAppointmentsQuery } from 'src/redux/api/adminPanelAPI';
import { useDebounce } from 'src/hooks/useDebounce';
import {
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
} from './styles';
import { DEBOUNCE_DELAY, FIRST_PAGE, PAGINATION_ADMINS_LIMIT } from './constants';

function AdminAppointmentList(): JSX.Element | null {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string>('');

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: appointments,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllAppointmentsQuery({
    search: debouncedSearchTerm,
    offset: (page - FIRST_PAGE) * PAGINATION_ADMINS_LIMIT,
  });

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const handleDeleteModalToggle = (): void => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleCloseModalAndSetAppointmentId = (appointmentId: string): void => {
    setDeleteAppointmentId(appointmentId);
    handleDeleteModalToggle();
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handleDeleteAppointment = async (): Promise<void> => {
    try {
      await deleteAppointment(deleteAppointmentId).unwrap();
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
      <ManagementWrapper>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <PageName>
            <Cylinder />
            {translate('adminAppointmentList.title')}
          </PageName>
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
                <TableHeader>{translate('adminAppointmentList.id')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.type')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.duration')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.creation_date')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.end_date')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.status')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.clientName')}</TableHeader>
                <TableHeader>{translate('adminAppointmentList.caregiverName')}</TableHeader>
                <TableHeader align="right">{translate('adminAppointmentList.actions')}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {isSuccess &&
                appointments.appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>2h</TableCell>
                    <TableCell>{appointment.startDate}</TableCell>
                    <TableCell>{appointment.endDate}</TableCell>
                    <TableCell>
                      <GreenSpan>{appointment.status}</GreenSpan>
                    </TableCell>
                    <TableCell>{appointment.userId}</TableCell>
                    <TableCell>Tarnavchuk Oleh</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <ModeEditOutlineOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={(): void => handleCloseModalAndSetAppointmentId(appointment.id)}
                      >
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
            count={Math.ceil(appointments!.count / PAGINATION_ADMINS_LIMIT)}
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

              <StyledButton variant="contained" color="error" onClick={handleDeleteAppointment}>
                {translate('adminManagement.yes')}
              </StyledButton>
            </Box>
          </Box>
        </Modal>
      </ManagementWrapper>
    </MainWrapper>
  );
}

export default AdminAppointmentList;
