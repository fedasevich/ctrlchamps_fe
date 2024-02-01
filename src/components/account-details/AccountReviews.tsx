import { Avatar, Pagination, Rating, Stack } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { useLocales } from 'src/locales';
import { User } from 'src/redux/api/userApi';
import { useGetReviewsQuery } from 'src/redux/api/reviewsApi';
import { DATE_FORMAT, FIRST_PAGE } from 'src/constants';

import { REVIEWS_PAGINATION_LIMIT } from './constants';
import {
  Block,
  ReviewBlock,
  ReviewDate,
  ReviewDescription,
  ReviewHeader,
  ReviewName,
  ReviewUserBlock,
  Subtitle,
  Value,
} from './styles';

interface IProps {
  user: User;
}

export default function AccountReviews({ user }: IProps): JSX.Element | null {
  const { translate } = useLocales();
  const [reviewsPage, setReviewsPage] = useState<number>(FIRST_PAGE);

  const { data: seekerReviews, isSuccess } = useGetReviewsQuery({
    userId: user.id,
    offset: (reviewsPage - FIRST_PAGE) * REVIEWS_PAGINATION_LIMIT,
    limit: REVIEWS_PAGINATION_LIMIT,
  });

  const handleReviewsPageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setReviewsPage(value);
  };

  return (
    <Block>
      <Subtitle>{translate('userList.reviews')}</Subtitle>
      {isSuccess && seekerReviews.data.length > 0 ? (
        <>
          {seekerReviews.data.map((review) => (
            <ReviewBlock key={review.id}>
              <ReviewHeader>
                <ReviewUserBlock>
                  <Avatar src={review.user.avatar || undefined} />
                  <div>
                    <ReviewName>
                      {review.user.firstName} {review.user.lastName}
                    </ReviewName>
                    <Rating name="read-only" value={Number(review.rating)} size="small" readOnly />
                  </div>
                </ReviewUserBlock>

                <ReviewDate>{format(parseISO(review.createdAt), DATE_FORMAT)}</ReviewDate>
              </ReviewHeader>
              <ReviewDescription>{review.review}</ReviewDescription>
            </ReviewBlock>
          ))}

          <Stack display="flex" direction="row" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(seekerReviews.count / REVIEWS_PAGINATION_LIMIT)}
              page={reviewsPage}
              onChange={handleReviewsPageChange}
            />
          </Stack>
        </>
      ) : (
        <Value>{translate('userList.anyReviews')}</Value>
      )}
    </Block>
  );
}
