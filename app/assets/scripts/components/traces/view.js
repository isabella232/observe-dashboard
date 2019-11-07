import React from 'react';
import { connect } from 'react-redux';
import { PropTypes as T } from 'prop-types';
import { Link } from 'react-router-dom';
import { environment } from '../../config';
import * as actions from '../../redux/actions/traces';
import { showGlobalLoading, hideGlobalLoading } from '../common/global-loading';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageBody,
  InpageBodyInner
} from '../common/inpage';
import UhOh from '../uhoh';
import Prose from '../../styles/type/prose';
import Button from '../../styles/button/button';
import { wrapApiResult, getFromState } from '../../redux/utils';
import { formatDateTimeExtended, startCoordinate } from '../../utils';

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;  
`;

const Infobox = styled.div`
`;

const Map = styled.div`
`;

const ActionButtonsWrapper = styled.div`
`;

class Traces extends React.Component {
  async componentDidMount () {
    showGlobalLoading();
    const { traceId } = this.props.match.params;
    await this.props.fetchTrace(traceId);
    hideGlobalLoading();
  }

  renderContent () {
    const { isReady, hasError, getData } = this.props.trace;

    if (!isReady()) return null;
    if (hasError()) return <UhOh />;

    const { properties: trace } = getData();

    return (
      <>
        <Link to='/traces'>Back to traces</Link>
        <h1>Trace {trace.id}</h1>
        <ContentWrapper>
          {this.renderMap()}
          {this.renderInfobox()}
        </ContentWrapper>
        <ActionButtonsWrapper>
          {this.renderActionButtons()}
        </ActionButtonsWrapper>
      </>
    );
  }

  renderMap () {
    return <Map><h2>Render map here</h2></Map>;
  }

  renderInfobox () {
    const { getData } = this.props.trace;
    const { properties: trace, geometry } = getData();
    return (
      <Infobox>
        <h2>id</h2>
        <p>{trace.id}</p>
        <h2>Description</h2>
        <p>{trace.description}</p>
        <h2>Length</h2>
        <p>{trace.length}</p>
        <h2>Owner</h2>
        <p>{trace.ownerId}</p>
        <h2>Start coordinate</h2>
        <p>{startCoordinate(geometry)}</p>
        <h2>Recorded at</h2>
        <p>{formatDateTimeExtended(trace.recordedAt)}</p>
        <h2>Uploaded at</h2>
        <p>{formatDateTimeExtended(trace.uploadedAt)}</p>
        <h2>Updated at</h2>
        <p>{formatDateTimeExtended(trace.updatedAt)}</p>
      </Infobox>
    );
  }

  renderActionButtons () {
    return (
      <ActionButtonsWrapper>
        <Button useIcon='trash-bin' variation='danger-raised-light'>
          Delete
        </Button>
        <Button useIcon='pencil' variation='primary-raised-dark'>
          Edit Metadata
        </Button>
        <Button useIcon='export' variation='primary-raised-dark'>
          Export to JOSM
        </Button>
        <Button useIcon='download' variation='primary-raised-dark'>
          Download
        </Button>
      </ActionButtonsWrapper>
    );
  }

  render () {
    return (
      <App pageTitle='Traces'>
        <Inpage>
          <InpageBody>
            <InpageBodyInner>
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
    match: T.object,
    fetchTrace: T.func,
    trace: T.object
  };
}

function mapStateToProps (state, props) {
  return {
    trace: wrapApiResult(
      getFromState(state.individualTraces, props.match.params.traceId)
    )
  };
}

function dispatcher (dispatch) {
  return {
    fetchTrace: (...args) => dispatch(actions.fetchTrace(...args))
  };
}

export default connect(
  mapStateToProps,
  dispatcher
)(Traces);
