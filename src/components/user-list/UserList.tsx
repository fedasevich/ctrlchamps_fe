import {
  IconButton,
  InputAdornment,
  TableBody,
  TableHead,
  MenuItem,
  Select,
  OutlinedInput,
  Table,
  Stack,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { useLocales } from 'src/locales';
import { USER_STATUS } from 'src/constants';
import { ROUTES } from 'src/routes';

import {
  MainWrapper,
  SearchContainer,
  StyledTableRow,
  TableHeader,
  StyledTableCell,
  ManagementWrapper,
} from './styles';
import { UserWithStatus } from './types';
import { USERS } from './mocks';
import { FIRST_PAGE, PAGINATION_USERS_LIMIT } from './constants';

export default function UserList(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  const [filteredUsers, setFilteredUsers] = useState<UserWithStatus[]>(USERS.data);
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [termSearch, setTermSearch] = useState<string>('');

  const handleTermSearch = (event: ChangeEvent<HTMLInputElement>): void =>
    setTermSearch(event.target.value);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <MainWrapper>
      {translate('userList.title')}
      <ManagementWrapper>
        <SearchContainer>
          <OutlinedInput
            onChange={handleTermSearch}
            placeholder={translate('userList.search')}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            fullWidth
            size="small"
          />
          <IconButton size="large">
            <FormatLineSpacingIcon fontSize="large" />
          </IconButton>
        </SearchContainer>
        <Stack mt={3}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <TableHeader>{translate('userList.userName')}</TableHeader>
                <TableHeader>{translate('userList.role')}</TableHeader>
                <TableHeader>{translate('userList.status')}</TableHeader>
                <TableHeader> </TableHeader>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>
                    {user.firstName} {user.lastName}
                  </StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>
                    <Select defaultValue={user.status} fullWidth>
                      <MenuItem value={USER_STATUS.Active}>{USER_STATUS.Active}</MenuItem>
                      <MenuItem value={USER_STATUS.Inactive}>{USER_STATUS.Inactive}</MenuItem>
                    </Select>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={(): Promise<boolean> =>
                        router.push(`${ROUTES.account_details}/${user.id}`)
                      }
                    >
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
        <Stack display="flex" direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(USERS.count / PAGINATION_USERS_LIMIT)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </ManagementWrapper>
    </MainWrapper>
  );
}
