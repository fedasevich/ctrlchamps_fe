import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useLocales } from 'src/locales';
import EditSquare from 'src/assets/icons/EditSquare';
import { PRIMARY } from 'src/theme/colors';
import { USER_STATUS } from 'src/constants';
import { ROUTES } from 'src/routes';

import {
  Container,
  Title,
  SearchContainer,
  StyledTable,
  StyledSell,
  NameSell,
  PaginationContainer,
} from './styles';
import { SearchUser, UserWithStatus } from './types';
import { users } from './mocks';
import { FIRST_PAGE, STEP } from './constants';

export default function UserList(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  const [filteredUsers, setFilteredUsers] = useState<UserWithStatus[]>(users);
  const [page, setPage] = useState<number>(FIRST_PAGE);

  const { register } = useForm<SearchUser>({
    mode: 'onBlur',
  });

  const handleNextPage = (): void => {
    setPage(page + STEP);
  };
  const handlePrevPage = (): void => {
    setPage(page - STEP);
  };

  return (
    <Container>
      <Title>{translate('userList.title')}</Title>
      <SearchContainer>
        <form>
          <FormControl variant="filled">
            <InputLabel htmlFor="query">{translate('userList.search')}</InputLabel>
            <FilledInput
              {...register('query')}
              id="query"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: PRIMARY.main }} />
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
        <IconButton size="large">
          <FormatLineSpacingIcon fontSize="large" sx={{ color: PRIMARY.main }} />
        </IconButton>
      </SearchContainer>
      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <NameSell>{translate('userList.userName')}</NameSell>
              <StyledSell>{translate('userList.role')}</StyledSell>
              <StyledSell>{translate('userList.status')}</StyledSell>
              <StyledSell> </StyledSell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <NameSell>
                  {user.firstName} {user.lastName}
                </NameSell>
                <StyledSell>{user.role}</StyledSell>
                <StyledSell>
                  <Select defaultValue={user.status} autoWidth variant="standard">
                    <MenuItem value={USER_STATUS.Active}>{USER_STATUS.Active}</MenuItem>
                    <MenuItem value={USER_STATUS.Inactive}>{USER_STATUS.Inactive}</MenuItem>
                  </Select>
                </StyledSell>
                <StyledSell>
                  <IconButton
                    onClick={(): Promise<boolean> =>
                      router.push(`${ROUTES.account_details}/${user.id}`)
                    }
                  >
                    <EditSquare />
                  </IconButton>
                  <IconButton>
                    <DeleteOutlineIcon sx={{ color: PRIMARY.main }} />
                  </IconButton>
                </StyledSell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <PaginationContainer>
        <IconButton onClick={handlePrevPage} disabled={page <= FIRST_PAGE}>
          <KeyboardArrowLeftOutlinedIcon sx={{ color: PRIMARY.main }} />
        </IconButton>
        {page}
        <IconButton onClick={handleNextPage}>
          <KeyboardArrowRightOutlinedIcon sx={{ color: PRIMARY.main }} />
        </IconButton>
      </PaginationContainer>
    </Container>
  );
}
