import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Client from './client';
import Contract from './contract';
import Project from './project';
import Subcontract from './subcontract';
import ContractPosition from './contract-position';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}client`} component={Client} />
        <ErrorBoundaryRoute path={`${match.url}contract`} component={Contract} />
        <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
        <ErrorBoundaryRoute path={`${match.url}subcontract`} component={Subcontract} />
        <ErrorBoundaryRoute path={`${match.url}contract-position`} component={ContractPosition} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
