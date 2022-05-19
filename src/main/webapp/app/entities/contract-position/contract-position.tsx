import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContractPosition } from 'app/shared/model/contract-position.model';
import { getEntities } from './contract-position.reducer';

export const ContractPosition = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const contractPositionList = useAppSelector(state => state.contractPosition.entities);
  const loading = useAppSelector(state => state.contractPosition.loading);
  const totalItems = useAppSelector(state => state.contractPosition.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="contract-position-heading" data-cy="ContractPositionHeading">
        <Translate contentKey="contractToolApp.contractPosition.home.title">Contract Positions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="contractToolApp.contractPosition.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/contract-position/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="contractToolApp.contractPosition.home.createLabel">Create new Contract Position</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {contractPositionList && contractPositionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="contractToolApp.contractPosition.id">Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('contractPositionId')}>
                  <Translate contentKey="contractToolApp.contractPosition.contractPositionId">Contract Position Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('employeeId')}>
                  <Translate contentKey="contractToolApp.contractPosition.employeeId">Employee Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numberContractPosition')}>
                  <Translate contentKey="contractToolApp.contractPosition.numberContractPosition">Number Contract Position</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('restrictionTypeId')}>
                  <Translate contentKey="contractToolApp.contractPosition.restrictionTypeId">Restriction Type Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('restriction')}>
                  <Translate contentKey="contractToolApp.contractPosition.restriction">Restriction</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currencyId')}>
                  <Translate contentKey="contractToolApp.contractPosition.currencyId">Currency Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rateAnHour')}>
                  <Translate contentKey="contractToolApp.contractPosition.rateAnHour">Rate An Hour</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('statusId')}>
                  <Translate contentKey="contractToolApp.contractPosition.statusId">Status Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lifecycleStatus')}>
                  <Translate contentKey="contractToolApp.contractPosition.lifecycleStatus">Lifecycle Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="contractToolApp.contractPosition.subcontract">Subcontract</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contractPositionList.map((contractPosition, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/contract-position/${contractPosition.id}`} color="link" size="sm">
                      {contractPosition.id}
                    </Button>
                  </td>
                  <td>{contractPosition.contractPositionId}</td>
                  <td>{contractPosition.employeeId}</td>
                  <td>{contractPosition.numberContractPosition}</td>
                  <td>{contractPosition.restrictionTypeId}</td>
                  <td>{contractPosition.restriction}</td>
                  <td>{contractPosition.currencyId}</td>
                  <td>{contractPosition.rateAnHour}</td>
                  <td>{contractPosition.statusId}</td>
                  <td>
                    <Translate contentKey={`contractToolApp.LifecycleStatus.${contractPosition.lifecycleStatus}`} />
                  </td>
                  <td>
                    {contractPosition.subcontract ? (
                      <Link to={`/subcontract/${contractPosition.subcontract.id}`}>{contractPosition.subcontract.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/contract-position/${contractPosition.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/contract-position/${contractPosition.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/contract-position/${contractPosition.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="contractToolApp.contractPosition.home.notFound">No Contract Positions found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={contractPositionList && contractPositionList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ContractPosition;
