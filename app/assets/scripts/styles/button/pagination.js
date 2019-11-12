import React from 'react';
import styled from 'styled-components';
import Button from './button';
import { PropTypes as T } from 'prop-types';
import Link from '../../components/common/link';
import { environment } from '../../config';
import { getSearchParams } from '../../utils';

const Pager = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  list-style-type: none !important;
  & :not(:first-child) {
    margin-left: 1rem;
  }
`;

const Pagination = ({ pathname, meta }) => {
  const { previous, next, page, pageCount, totalCount } = meta;
  return (
    <Pager>
      <li>
        <Button
          as={Link}
          useIcon='chevron-left--small'
          variation='base-raised-semidark'
          to={`${pathname}?${getSearchParams(previous)}`}
          hideText
          disabled={!previous}
        >
          <span>previous</span>
        </Button>
      </li>
      <li>
        {page} - {pageCount} of {totalCount} Results
      </li>
      <li>
        <Button
          as={Link}
          useIcon='chevron-right--small'
          variation='base-raised-semidark'
          to={`${pathname}?${getSearchParams(next)}`}
          hideText
          disabled={!next}
        >
          <span>next</span>
        </Button>
      </li>
    </Pager>
  );
};

if (environment !== 'production') {
  Pagination.propTypes = {
    pathname: T.string,
    meta: T.object
  };
}

export default Pagination;
