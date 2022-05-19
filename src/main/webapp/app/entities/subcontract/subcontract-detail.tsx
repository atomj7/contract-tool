import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './subcontract.reducer';

export const SubcontractDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const subcontractEntity = useAppSelector(state => state.subcontract.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subcontractDetailsHeading">
          <Translate contentKey="contractToolApp.subcontract.detail.title">Subcontract</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="contractToolApp.subcontract.id">Id</Translate>
            </span>
            <UncontrolledTooltip target="id">
              <Translate contentKey="contractToolApp.subcontract.help.id" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.id}</dd>
          <dt>
            <span id="subcontractCipher">
              <Translate contentKey="contractToolApp.subcontract.subcontractCipher">Subcontract Cipher</Translate>
            </span>
            <UncontrolledTooltip target="subcontractCipher">
              <Translate contentKey="contractToolApp.subcontract.help.subcontractCipher" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.subcontractCipher}</dd>
          <dt>
            <span id="statusId">
              <Translate contentKey="contractToolApp.subcontract.statusId">Status Id</Translate>
            </span>
            <UncontrolledTooltip target="statusId">
              <Translate contentKey="contractToolApp.subcontract.help.statusId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.statusId}</dd>
          <dt>
            <span id="cooperationTypeId">
              <Translate contentKey="contractToolApp.subcontract.cooperationTypeId">Cooperation Type Id</Translate>
            </span>
            <UncontrolledTooltip target="cooperationTypeId">
              <Translate contentKey="contractToolApp.subcontract.help.cooperationTypeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.cooperationTypeId}</dd>
          <dt>
            <span id="sum">
              <Translate contentKey="contractToolApp.subcontract.sum">Sum</Translate>
            </span>
            <UncontrolledTooltip target="sum">
              <Translate contentKey="contractToolApp.subcontract.help.sum" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.sum}</dd>
          <dt>
            <span id="positions">
              <Translate contentKey="contractToolApp.subcontract.positions">Positions</Translate>
            </span>
            <UncontrolledTooltip target="positions">
              <Translate contentKey="contractToolApp.subcontract.help.positions" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.positions}</dd>
          <dt>
            <span id="currencyId">
              <Translate contentKey="contractToolApp.subcontract.currencyId">Currency Id</Translate>
            </span>
            <UncontrolledTooltip target="currencyId">
              <Translate contentKey="contractToolApp.subcontract.help.currencyId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.currencyId}</dd>
          <dt>
            <span id="paymentTermTypeId">
              <Translate contentKey="contractToolApp.subcontract.paymentTermTypeId">Payment Term Type Id</Translate>
            </span>
            <UncontrolledTooltip target="paymentTermTypeId">
              <Translate contentKey="contractToolApp.subcontract.help.paymentTermTypeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.paymentTermTypeId}</dd>
          <dt>
            <span id="paymentTermId">
              <Translate contentKey="contractToolApp.subcontract.paymentTermId">Payment Term Id</Translate>
            </span>
            <UncontrolledTooltip target="paymentTermId">
              <Translate contentKey="contractToolApp.subcontract.help.paymentTermId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.paymentTermId}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="contractToolApp.subcontract.startDate">Start Date</Translate>
            </span>
            <UncontrolledTooltip target="startDate">
              <Translate contentKey="contractToolApp.subcontract.help.startDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {subcontractEntity.startDate ? (
              <TextFormat value={subcontractEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="finishDate">
              <Translate contentKey="contractToolApp.subcontract.finishDate">Finish Date</Translate>
            </span>
            <UncontrolledTooltip target="finishDate">
              <Translate contentKey="contractToolApp.subcontract.help.finishDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {subcontractEntity.finishDate ? (
              <TextFormat value={subcontractEntity.finishDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="typeId">
              <Translate contentKey="contractToolApp.subcontract.typeId">Type Id</Translate>
            </span>
            <UncontrolledTooltip target="typeId">
              <Translate contentKey="contractToolApp.subcontract.help.typeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.typeId}</dd>
          <dt>
            <span id="tasktTypeId">
              <Translate contentKey="contractToolApp.subcontract.tasktTypeId">Taskt Type Id</Translate>
            </span>
            <UncontrolledTooltip target="tasktTypeId">
              <Translate contentKey="contractToolApp.subcontract.help.tasktTypeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.tasktTypeId}</dd>
          <dt>
            <span id="technologyId">
              <Translate contentKey="contractToolApp.subcontract.technologyId">Technology Id</Translate>
            </span>
            <UncontrolledTooltip target="technologyId">
              <Translate contentKey="contractToolApp.subcontract.help.technologyId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.technologyId}</dd>
          <dt>
            <span id="domenId">
              <Translate contentKey="contractToolApp.subcontract.domenId">Domen Id</Translate>
            </span>
            <UncontrolledTooltip target="domenId">
              <Translate contentKey="contractToolApp.subcontract.help.domenId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.domenId}</dd>
          <dt>
            <span id="link">
              <Translate contentKey="contractToolApp.subcontract.link">Link</Translate>
            </span>
            <UncontrolledTooltip target="link">
              <Translate contentKey="contractToolApp.subcontract.help.link" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.link}</dd>
          <dt>
            <span id="lifecycleStatus">
              <Translate contentKey="contractToolApp.subcontract.lifecycleStatus">Lifecycle Status</Translate>
            </span>
            <UncontrolledTooltip target="lifecycleStatus">
              <Translate contentKey="contractToolApp.subcontract.help.lifecycleStatus" />
            </UncontrolledTooltip>
          </dt>
          <dd>{subcontractEntity.lifecycleStatus}</dd>
          <dt>
            <Translate contentKey="contractToolApp.subcontract.contract">Contract</Translate>
          </dt>
          <dd>{subcontractEntity.contract ? subcontractEntity.contract.id : ''}</dd>
          <dt>
            <Translate contentKey="contractToolApp.subcontract.project">Project</Translate>
          </dt>
          <dd>{subcontractEntity.project ? subcontractEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/subcontract" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subcontract/${subcontractEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SubcontractDetail;
