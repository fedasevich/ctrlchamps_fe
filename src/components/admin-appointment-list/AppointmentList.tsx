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
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useLocales } from 'src/locales';
import Modal from 'src/components/reusable/modal/Modal';
import { useDeleteAppointmentMutation } from 'src/redux/api/appointmentApi';
import { useGetAllAppointmentsQuery } from 'src/redux/api/adminPanelAPI';
import { useDebounce } from 'src/hooks/useDebounce';
import { calculateDateDifference } from 'src/utils/calculateDateDifference';
import { format } from 'date-fns';
import { APPOINTMENT_STATUS, DATE_FORMAT, USER_ROLE } from 'src/constants';
import { SortOrder } from 'src/constants/enums';
import {
  ActionBar,
  Cylinder,
  ColorSpan,
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
import { DEBOUNCE_DELAY, FIRST_PAGE, PAGINATION_APPOINTMENTS_LIMIT } from './constants';
import AppointmentDrawer from '../appointments/appointment-drawer/AppointmentDrawer';
import AppointmentStatus from '../appointments/appointment-status/AppointmentStatus';

function AdminAppointmentList(): JSX.Element | null {
  const { translate } = useLocales();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string>('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [sort, setSort] = useState<SortOrder>(SortOrder.DESC);

  const debouncedSearchTerm = useDebounce(termSearch.trim(), DEBOUNCE_DELAY);

  const {
    data: appointments,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllAppointmentsQuery({
    name: debouncedSearchTerm,
    offset: (page - FIRST_PAGE) * PAGINATION_APPOINTMENTS_LIMIT,
    limit: PAGINATION_APPOINTMENTS_LIMIT,
    sort,
  });

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const toggleSort = (): void => {
    if (sort === SortOrder.ASC) {
      setSort(SortOrder.DESC);
    } else {
      setSort(SortOrder.ASC);
    }
  };

  const handleDeleteModalToggle = (): void => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  const handleCloseModalAndSetAppointmentId = (userId: string): void => {
    setDeleteAppointmentId(userId);
    handleDeleteModalToggle();
  };

  const openAppointmentDrawer = (appointmentId: string): void => {
    setIsDrawerOpen(true);
    setSelectedAppointmentId(appointmentId);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handleDeleteAppointment = async (): Promise<void> => {
    try {
      await deleteAppointment(deleteAppointmentId).unwrap();
      handleDeleteModalToggle();
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, sort, page, refetch]);

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
        <ActionBar>
          <OutlinedInput
            onChange={handleTermSearch}
            placeholder={translate('adminAppointmentList.search')}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            size="small"
          />
          {sort === SortOrder.DESC ? (
            <IconButton onClick={toggleSort}>
              <FilterListIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleSort} sx={{ transform: 'rotate(180deg)' }}>
              <FilterListIcon />
            </IconButton>
          )}
        </ActionBar>

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
                    <TableCell>
                      {calculateDateDifference(appointment.startDate, appointment.endDate)}
                    </TableCell>
                    <TableCell>{format(new Date(appointment.createdAt), DATE_FORMAT)}</TableCell>
                    <TableCell>{format(new Date(appointment.endDate), DATE_FORMAT)}</TableCell>
                    <TableCell>
                      <ColorSpan status={appointment.status}>
                        <AppointmentStatus status={appointment.status} />
                      </ColorSpan>
                    </TableCell>
                    <TableCell>
                      {appointment.user.firstName} {appointment.user.lastName}
                    </TableCell>
                    <TableCell>
                      {appointment.caregiverInfo.user.firstName}{' '}
                      {appointment.caregiverInfo.user.lastName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      {appointment.status === APPOINTMENT_STATUS.Finished && (
                        <IconButton
                          onClick={(): void => handleCloseModalAndSetAppointmentId(appointment.id)}
                        >
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={(): void => openAppointmentDrawer(appointment.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Stack>

        <Stack display="flex" direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(appointments!.count / PAGINATION_APPOINTMENTS_LIMIT)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>

        <Modal
          isActive={isDeleteModalActive}
          onClose={handleDeleteModalToggle}
          title={translate('adminAppointmentList.deleteAppointment')}
        >
          <Box display="flex" flexDirection="column">
            <Title>{translate('adminAppointmentList.deleteWarning')}</Title>

            <Box display="flex" gap={2}>
              <StyledButton variant="contained" onClick={handleDeleteModalToggle}>
                {translate('adminAppointmentList.no')}
              </StyledButton>

              <StyledButton variant="contained" color="error" onClick={handleDeleteAppointment}>
                {translate('adminAppointmentList.yes')}
              </StyledButton>
            </Box>
          </Box>
        </Modal>
        {selectedAppointmentId && (
          <AppointmentDrawer
            role={USER_ROLE.Admin}
            selectedAppointmentId={selectedAppointmentId}
            isOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}
      </ManagementWrapper>
    </MainWrapper>
  );
}

export default AdminAppointmentList;
