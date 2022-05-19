import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubcontract } from 'app/shared/model/subcontract.model';
import { getEntities } from './subcontract.reducer';

export const Subcontract = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const subcontractList = useAppSelector(state => state.subcontract.entities);
  const loading = useAppSelector(state => state.subcontract.loading);
  const totalItems = useAppSelector(state => state.subcontract.totalItems);

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
      <h2 id="subcontract-heading" data-cy="SubcontractHeading">
        <Translate contentKey="contractToolApp.subcontract.home.title">Subcontracts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="contractToolApp.subcontract.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/subcontract/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="contractToolApp.subcontract.home.createLabel">Create new Subcontract</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subcontractList && subcontractList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="contractToolApp.subcontract.id">Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('subcontractCipher')}>
                  <Translate contentKey="contractToolApp.subcontract.subcontractCipher">Subcontract Cipher</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('statusId')}>
                  <Translate contentKey="contractToolApp.subcontract.statusId">Status Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cooperationTypeId')}>
                  <Translate contentKey="contractToolApp.subcontract.cooperationTypeId">Cooperation Type Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sum')}>
                  <Translate contentKey="contractToolApp.subcontract.sum">Sum</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('positions')}>
                  <Translate contentKey="contractToolApp.subcontract.positions">Positions</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currencyId')}>
                  <Translate contentKey="contractToolApp.subcontract.currencyId">Currency Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentTermTypeId')}>
                  <Translate contentKey="contractToolApp.subcontract.paymentTermTypeId">Payment Term Type Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paymentTermId')}>
                  <Translate contentKey="contractToolApp.subcontract.paymentTermId">Payment Term Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('startDate')}>
                  <Translate contentKey="contractToolApp.subcontract.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('finishDate')}>
                  <Translate contentKey="contractToolApp.subcontract.finishDate">Finish Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('typeId')}>
                  <Translate contentKey="contractToolApp.subcontract.typeId">Type Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tasktTypeId')}>
                  <Translate contentKey="contractToolApp.subcontract.tasktTypeId">Taskt Type Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('technologyId')}>
                  <Translate contentKey="contractToolApp.subcontract.technologyId">Technology Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('domenId')}>
                  <Translate contentKey="contractToolApp.subcontract.domenId">Domen Id</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('link')}>
                  <Translate contentKey="contractToolApp.subcontract.link">Link</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lifecycleStatus')}>
                  <Translate contentKey="contractToolApp.subcontract.lifecycleStatus">Lifecycle Status</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="contractToolApp.subcontract.contract">Contract</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="contractToolApp.subcontract.project">Project</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subcontractList.map((subcontract, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/subcontract/${subcontract.id}`} color="link" size="sm">
                      {subcontract.id}
                    </Button>
                  </td>
                  <td>{subcontract.subcontractCipher}</td>
                  <td>{subcontract.statusId}</td>
                  <td>{subcontract.cooperationTypeId}</td>
                  <td>{subcontract.sum}</td>
                  <td>{subcontract.positions}</td>
                  <td>{subcontract.currencyId}</td>
                  <td>{subcontract.paymentTermTypeId}</td>
                  <td>{subcontract.paymentTermId}</td>
                  <td>
                    {subcontract.startDate ? <TextFormat type="date" value={subcontract.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {subcontract.finishDate ? (
                      <TextFormat type="date" value={subcontract.finishDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{subcontract.typeId}</td>
                  <td>{subcontract.tasktTypeId}</td>
                  <td>{subcontract.technologyId}</td>
                  <td>{subcontract.domenId}</td>
                  <td>{subcontract.link}</td>
                  <td>
                    <Translate contentKey={`contractToolApp.LifecycleStatus.${subcontract.lifecycleStatus}`} />
                  </td>
                  <td>{subcontract.contract ? <Link to={`/contract/${subcontract.contract.id}`}>{subcontract.contract.id}</Link> : ''}</td>
                  <td>{subcontract.project ? <Link to={`/project/${subcontract.project.id}`}>{subcontract.project.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/subcontract/${subcontract.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subcontract/${subcontract.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`/subcontract/${subcontract.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="contractToolApp.subcontract.home.notFound">No Subcontracts found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={subcontractList && subcontractList.length > 0 ? '' : 'd-none'}>
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

export default Subcontract;
