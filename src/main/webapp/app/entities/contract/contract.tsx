import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContract } from 'app/shared/model/contract.model';
import { getEntities } from './contract.reducer';

export const Contract = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const contractList = useAppSelector(state => state.contract.entities);
  const loading = useAppSelector(state => state.contract.loading);
  const totalItems = useAppSelector(state => state.contract.totalItems);

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
      <h2 id="contract-heading" data-cy="ContractHeading">
        <Translate contentKey="contractToolApp.contract.home.title">Contracts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="contractToolApp.contract.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/contract/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="contractToolApp.contract.home.createLabel">Create new Contract</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {contractList && contractList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="contractToolApp.contract.id">Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cipher')}>
                  <Translate contentKey="contractToolApp.contract.cipher">Cipher</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('providerId')}>
                  <Translate contentKey="contractToolApp.contract.providerId">Provider Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('typeId')}>
                  <Translate contentKey="contractToolApp.contract.typeId">Type Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sum')}>
                  <Translate contentKey="contractToolApp.contract.sum">Sum</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('positionCount')}>
                  <Translate contentKey="contractToolApp.contract.positionCount">Position Count</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currencyId')}>
                  <Translate contentKey="contractToolApp.contract.currencyId">Currency Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentTerm')}>
                  <Translate contentKey="contractToolApp.contract.paymentTerm">Payment Term</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentTermTypeId')}>
                  <Translate contentKey="contractToolApp.contract.paymentTermTypeId">Payment Term Type Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('startDate')}>
                  <Translate contentKey="contractToolApp.contract.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('finishDate')}>
                  <Translate contentKey="contractToolApp.contract.finishDate">Finish Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('statusId')}>
                  <Translate contentKey="contractToolApp.contract.statusId">Status Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('link')}>
                  <Translate contentKey="contractToolApp.contract.link">Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lifecycleStatus')}>
                  <Translate contentKey="contractToolApp.contract.lifecycleStatus">Lifecycle Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="contractToolApp.contract.client">Client</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contractList.map((contract, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/contract/${contract.id}`} color="link" size="sm">
                      {contract.id}
                    </Button>
                  </td>
                  <td>{contract.cipher}</td>
                  <td>{contract.providerId}</td>
                  <td>{contract.typeId}</td>
                  <td>{contract.sum}</td>
                  <td>{contract.positionCount}</td>
                  <td>{contract.currencyId}</td>
                  <td>{contract.paymentTerm}</td>
                  <td>{contract.paymentTermTypeId}</td>
                  <td>
                    {contract.startDate ? <TextFormat type="date" value={contract.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {contract.finishDate ? <TextFormat type="date" value={contract.finishDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{contract.statusId}</td>
                  <td>{contract.link}</td>
                  <td>
                    <Translate contentKey={`contractToolApp.LifecycleStatus.${contract.lifecycleStatus}`} />
                  </td>
                  <td>{contract.client ? <Link to={`/client/${contract.client.id}`}>{contract.client.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/contract/${contract.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/contract/${contract.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`/contract/${contract.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="contractToolApp.contract.home.notFound">No Contracts found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={contractList && contractList.length > 0 ? '' : 'd-none'}>
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

export default Contract;
