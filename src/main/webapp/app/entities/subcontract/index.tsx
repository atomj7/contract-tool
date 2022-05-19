import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Subcontract from './subcontract';
import SubcontractDetail from './subcontract-detail';
import SubcontractUpdate from './subcontract-update';
import SubcontractDeleteDialog from './subcontract-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubcontractUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubcontractUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubcontractDetail} />
      <ErrorBoundaryRoute path={match.url} component={Subcontract} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubcontractDeleteDialog} />
  </>
);

export default Routes;
