import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project.reducer';

export const ProjectDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectEntity = useAppSelector(state => state.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">
          <Translate contentKey="contractToolApp.project.detail.title">Project</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="contractToolApp.project.id">Id</Translate>
            </span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="contractToolApp.project.name">Name</Translate>
            </span>
            <UncontrolledTooltip target="name">
              <Translate contentKey="contractToolApp.project.help.name" />
            </UncontrolledTooltip>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="contractToolApp.project.startDate">Start Date</Translate>
            </span>
            <UncontrolledTooltip target="startDate">
              <Translate contentKey="contractToolApp.project.help.startDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {projectEntity.startDate ? <TextFormat value={projectEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="finishDate">
              <Translate contentKey="contractToolApp.project.finishDate">Finish Date</Translate>
            </span>
            <UncontrolledTooltip target="finishDate">
              <Translate contentKey="contractToolApp.project.help.finishDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {projectEntity.finishDate ? <TextFormat value={projectEntity.finishDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="link">
              <Translate contentKey="contractToolApp.project.link">Link</Translate>
            </span>
            <UncontrolledTooltip target="link">
              <Translate contentKey="contractToolApp.project.help.link" />
            </UncontrolledTooltip>
          </dt>
          <dd>{projectEntity.link}</dd>
          <dt>
            <span id="statusId">
              <Translate contentKey="contractToolApp.project.statusId">Status Id</Translate>
            </span>
            <UncontrolledTooltip target="statusId">
              <Translate contentKey="contractToolApp.project.help.statusId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{projectEntity.statusId}</dd>
          <dt>
            <span id="lifecycleStatus">
              <Translate contentKey="contractToolApp.project.lifecycleStatus">Lifecycle Status</Translate>
            </span>
            <UncontrolledTooltip target="lifecycleStatus">
              <Translate contentKey="contractToolApp.project.help.lifecycleStatus" />
            </UncontrolledTooltip>
          </dt>
          <dd>{projectEntity.lifecycleStatus}</dd>
          <dt>
            <Translate contentKey="contractToolApp.project.client">Client</Translate>
          </dt>
          <dd>{projectEntity.client ? projectEntity.client.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
