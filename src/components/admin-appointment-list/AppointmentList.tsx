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
import {
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
} from 'src/redux/api/appointmentApi';
import { useDebounce } from 'src/hooks/useDebounce';
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
} from './styles';
import { DEBOUNCE_DELAY, FIRST_PAGE, PAGINATION_ADMINS_LIMIT } from './constants';

function AdminAppointmentList(): JSX.Element | null {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string>('');

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const appointmentsData = [
    {
      id: '2983a61e-5c27-412d-a757-501899ad6476',
      userId: 'f4107093-75be-4c8f-9fd3-daa7a28080c7',
      caregiverInfoId: '37fab219-f88b-43f9-864d-03a71117ba23',
      name: 'New request',
      type: 'One time',
      status: 'Pending confirmation',
      details: null,
      payment: 25,
      location: 'ChIJZ4lcwszFyIAR7nw_Ba2KrO0',
      activityNote: null,
      diagnosisNote: null,
      capabilityNote: null,
      startDate: '2023-12-20T22:30:00.000Z',
      endDate: '2023-12-20T23:15:00.000Z',
      timezone: 'America/Los_Angeles',
      weekday: null,
      signingDate: null,
    },
    {
      id: '3279f759-ebf7-48a3-bf19-a9e6d5a14139',
      userId: 'f4107093-75be-4c8f-9fd3-daa7a28080c7',
      caregiverInfoId: '37fab219-f88b-43f9-864d-03a71117ba23',
      name: 'jfdslghsd',
      type: 'One time',
      status: 'Pending confirmation',
      details: 'details',
      payment: 25,
      location: 'ChIJZ4lcwszFyIAR7nw_Ba2KrO0',
      activityNote: null,
      diagnosisNote: null,
      capabilityNote: null,
      startDate: '2023-12-14T23:00:00.000Z',
      endDate: '2023-12-15T00:00:00.000Z',
      timezone: 'America/Los_Angeles',
      weekday: null,
      signingDate: null,
    },
    {
      id: 'b5c56660-d4c9-4dde-b85b-513bb6fd9b2f',
      userId: 'f4107093-75be-4c8f-9fd3-daa7a28080c7',
      caregiverInfoId: '37fab219-f88b-43f9-864d-03a71117ba23',
      name: 'New request',
      type: 'One time',
      status: 'Pending confirmation',
      details: null,
      payment: 25,
      location: 'ChIJZ4lcwszFyIAR7nw_Ba2KrO0',
      activityNote: null,
      diagnosisNote: null,
      capabilityNote: null,
      startDate: '2023-12-20T22:30:00.000Z',
      endDate: '2023-12-20T23:15:00.000Z',
      timezone: 'America/Los_Angeles',
      weekday: null,
      signingDate: null,
    },
  ];

  const { data: appointments, isSuccess, isLoading, refetch } = useGetAllAppointmentsQuery();

  //   {
  //   search: debouncedSearchTerm,
  //   offset: (page - FIRST_PAGE) * PAGINATION_ADMINS_LIMIT,
  // }

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

  const handleDeleteUser = async (): Promise<void> => {
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
                appointmentsData.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.endDate}</TableCell>
                    <TableCell>{appointment.startDate}</TableCell>
                    <TableCell>{appointment.endDate}</TableCell>
                    <TableCell>
                      <GreenSpan>{appointment.status}</GreenSpan>
                    </TableCell>
                    <TableCell>{appointment.userId}</TableCell>
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
            count={Math.ceil(
              // appointments!.count
              appointments!.length / PAGINATION_ADMINS_LIMIT
            )}
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

export default AdminAppointmentList;
