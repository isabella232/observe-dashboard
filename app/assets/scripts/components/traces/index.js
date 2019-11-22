import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { environment } from '../../config';
import * as actions from '../../redux/actions/traces';
import { showGlobalLoading, hideGlobalLoading } from '../common/global-loading';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../common/Inpage';
import Button from '../../styles/button/button';
import Form from '../../styles/form/form';
import FormInput from '../../styles/form/input';
import {
  FilterToolbar,
  InputWrapper,
  InputWithIcon,
  InputIcon,
  FilterLabel
} from '../../styles/form/filters';
import DataTable from '../../styles/table';
import Pagination from '../../styles/button/pagination';
import Prose from '../../styles/type/prose';
import { wrapApiResult } from '../../redux/utils';
import Dropdown from '../common/dropdown';
import RangeSlider from '../common/range-slider';

const DropSlider = styled(Dropdown)`
  max-width: 24rem;
  padding-bottom: 2rem;
`;

class Traces extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      traceLength: {
        min: 0,
        max: 100
      }
    };

    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount () {
    await this.updateData();
  }

  async componentDidUpdate (prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      await this.updateData();
    }
  }

  async updateData () {
    showGlobalLoading();
    const searchParams = this.props.location.search;
    await this.props.fetchTraces(searchParams);
    hideGlobalLoading();
  }

  renderContent () {
    const { isReady, hasError } = this.props.traces;

    if (!isReady()) return null;
    if (hasError()) return <p>Something went wrong. Try again.</p>;

    return (
      <>
        {this.renderFilters()}
        {this.renderResults()}
      </>
    );
  }

  renderFilters () {
    return (
      <Form>
        <FilterToolbar>
          <InputWrapper>
            <FilterLabel htmlFor='userSearch'>Search by user</FilterLabel>
            <InputWithIcon
              type='text'
              id='userSearch'
              placeholder='User Name'
            />
            <InputIcon htmlFor='userSearch' useIcon='magnifier-left' />
          </InputWrapper>
          <InputWrapper>
            <FilterLabel htmlFor='startDate'>Start Date</FilterLabel>
            <InputWithIcon type='date' id='startDate' />
            <InputIcon htmlFor='startDate' useIcon='calendar' />
          </InputWrapper>
          <InputWrapper>
            <FilterLabel htmlFor='endDate'>End Date</FilterLabel>
            <InputWithIcon type='date' id='endDate' placeholder='End date' />
            <InputIcon htmlFor='endDate' useIcon='calendar' />
          </InputWrapper>
          <InputWrapper>
            <FilterLabel htmlFor='length'>Trace Length</FilterLabel>
            <DropSlider
              ref={this.dropRef}
              alignment='left'
              direction='down'
              triggerElement={
                <FormInput type='select' id='length' placeholder='Length' />
              }
            >
              <Form>
                <RangeSlider
                  min={0}
                  max={100}
                  id='trace-length'
                  value={this.state.traceLength}
                  onChange={v => this.setState({ traceLength: v })}
                />
              </Form>
            </DropSlider>
          </InputWrapper>
        </FilterToolbar>
      </Form>
    );
  }

  renderResults () {
    const { getMeta } = this.props.traces;
    const meta = getMeta();

    if (meta.count === 0) {
      return (
        <p>There are no results for the current search/filters criteria.</p>
      );
    }

    return (
      <>
        {this.renderTable()}
        <Pagination pathname='/traces' meta={meta} />
      </>
    );
  }

  renderTable () {
    return (
      <DataTable>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>
              <span>Owner</span>
            </th>
            <th scope='col'>
              <span>Date</span>
            </th>
            <th scope='col'>
              <span>Length</span>
            </th>
            <th scope='col'>
              <span>Export to JOSM</span>
            </th>
            <th scope='col'>
              <span>Download</span>
            </th>
            <th scope='col'>
              <span>Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderTableRows()}</tbody>
      </DataTable>
    );
  }

  renderTableRows () {
    const { getData } = this.props.traces;
    return getData().map(trace => {
      return (
        <tr key={trace.id}>
          <td>
            <Link to={`/traces/${trace.id}`}>{trace.id}</Link>
          </td>
          <td>{trace.ownerDisplayName}</td>
          <td>{new Date(trace.recordedAt).toLocaleDateString()}</td>
          <td>{trace.length}</td>
          <td>
            <Button
              useIcon='share'
              variation='base-raised-semidark'
              size='small'
              hideText
            >
              Export to JOSM
            </Button>
          </td>
          <td>
            <Button
              useIcon='download'
              variation='base-raised-semidark'
              size='small'
              hideText
            >
              Download trace
            </Button>
          </td>
          <td>
            <Button
              useIcon='trash-bin'
              variation='base-raised-semidark'
              size='small'
              hideText
            >
              Delete trace
            </Button>
          </td>
        </tr>
      );
    });
  }

  render () {
    return (
      <App pageTitle='Traces'>
        <Inpage>
          <InpageHeader />
          <InpageBody>
            <InpageBodyInner>
              <InpageHeadline>
                <InpageTitle>Traces</InpageTitle>
              </InpageHeadline>
              <Prose>{this.renderContent()}</Prose>
            </InpageBodyInner>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

if (environment !== 'production') {
  Traces.propTypes = {
    fetchTraces: T.func,
    traces: T.object,
    location: T.object
  };
}

function mapStateToProps (state) {
  return {
    traces: wrapApiResult(state.traces)
  };
}

function dispatcher (dispatch) {
  return {
    fetchTraces: (...args) => dispatch(actions.fetchTraces(...args))
  };
}

export default connect(mapStateToProps, dispatcher)(Traces);
