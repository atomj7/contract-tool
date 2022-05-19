import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProject } from 'app/shared/model/project.model';
import { getEntities } from './project.reducer';

export const Project = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const projectList = useAppSelector(state => state.project.entities);
  const loading = useAppSelector(state => state.project.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="project-heading" data-cy="ProjectHeading">
        <Translate contentKey="contractToolApp.project.home.title">Projects</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="contractToolApp.project.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/project/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="contractToolApp.project.home.createLabel">Create new Project</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {projectList && projectList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="contractToolApp.project.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.clientId">Client Id</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.finishDate">Finish Date</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.link">Link</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.statusId">Status Id</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.lifecycleStatus">Lifecycle Status</Translate>
                </th>
                <th>
                  <Translate contentKey="contractToolApp.project.client">Client</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projectList.map((project, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/project/${project.id}`} color="link" size="sm">
                      {project.id}
                    </Button>
                  </td>
                  <td>{project.clientId}</td>
                  <td>{project.name}</td>
                  <td>{project.startDate ? <TextFormat type="date" value={project.startDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {project.finishDate ? <TextFormat type="date" value={project.finishDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{project.link}</td>
                  <td>{project.statusId}</td>
                  <td>
                    <Translate contentKey={`contractToolApp.LifecycleStatus.${project.lifecycleStatus}`} />
                  </td>
                  <td>{project.client ? <Link to={`/client/${project.client.id}`}>{project.client.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/project/${project.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/project/${project.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/project/${project.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="contractToolApp.project.home.notFound">No Projects found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Project;
