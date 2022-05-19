import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContractPosition from './contract-position';
import ContractPositionDetail from './contract-position-detail';
import ContractPositionUpdate from './contract-position-update';
import ContractPositionDeleteDialog from './contract-position-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContractPositionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContractPositionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContractPositionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContractPosition} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ContractPositionDeleteDialog} />
  </>
);

export default Routes;
