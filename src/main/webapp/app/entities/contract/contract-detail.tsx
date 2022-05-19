import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './contract.reducer';

export const ContractDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const contractEntity = useAppSelector(state => state.contract.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contractDetailsHeading">
          <Translate contentKey="contractToolApp.contract.detail.title">Contract</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="contractToolApp.contract.id">Id</Translate>
            </span>
          </dt>
          <dd>{contractEntity.id}</dd>
          <dt>
            <span id="cipher">
              <Translate contentKey="contractToolApp.contract.cipher">Cipher</Translate>
            </span>
            <UncontrolledTooltip target="cipher">
              <Translate contentKey="contractToolApp.contract.help.cipher" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.cipher}</dd>
          <dt>
            <span id="clientId">
              <Translate contentKey="contractToolApp.contract.clientId">Client Id</Translate>
            </span>
            <UncontrolledTooltip target="clientId">
              <Translate contentKey="contractToolApp.contract.help.clientId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.clientId}</dd>
          <dt>
            <span id="providerId">
              <Translate contentKey="contractToolApp.contract.providerId">Provider Id</Translate>
            </span>
            <UncontrolledTooltip target="providerId">
              <Translate contentKey="contractToolApp.contract.help.providerId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.providerId}</dd>
          <dt>
            <span id="typeId">
              <Translate contentKey="contractToolApp.contract.typeId">Type Id</Translate>
            </span>
            <UncontrolledTooltip target="typeId">
              <Translate contentKey="contractToolApp.contract.help.typeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.typeId}</dd>
          <dt>
            <span id="sum">
              <Translate contentKey="contractToolApp.contract.sum">Sum</Translate>
            </span>
            <UncontrolledTooltip target="sum">
              <Translate contentKey="contractToolApp.contract.help.sum" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.sum}</dd>
          <dt>
            <span id="positionCount">
              <Translate contentKey="contractToolApp.contract.positionCount">Position Count</Translate>
            </span>
            <UncontrolledTooltip target="positionCount">
              <Translate contentKey="contractToolApp.contract.help.positionCount" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.positionCount}</dd>
          <dt>
            <span id="currencyId">
              <Translate contentKey="contractToolApp.contract.currencyId">Currency Id</Translate>
            </span>
            <UncontrolledTooltip target="currencyId">
              <Translate contentKey="contractToolApp.contract.help.currencyId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.currencyId}</dd>
          <dt>
            <span id="paymentTerm">
              <Translate contentKey="contractToolApp.contract.paymentTerm">Payment Term</Translate>
            </span>
            <UncontrolledTooltip target="paymentTerm">
              <Translate contentKey="contractToolApp.contract.help.paymentTerm" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.paymentTerm}</dd>
          <dt>
            <span id="paymentTermTypeId">
              <Translate contentKey="contractToolApp.contract.paymentTermTypeId">Payment Term Type Id</Translate>
            </span>
            <UncontrolledTooltip target="paymentTermTypeId">
              <Translate contentKey="contractToolApp.contract.help.paymentTermTypeId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.paymentTermTypeId}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="contractToolApp.contract.startDate">Start Date</Translate>
            </span>
            <UncontrolledTooltip target="startDate">
              <Translate contentKey="contractToolApp.contract.help.startDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {contractEntity.startDate ? <TextFormat value={contractEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="finishDate">
              <Translate contentKey="contractToolApp.contract.finishDate">Finish Date</Translate>
            </span>
            <UncontrolledTooltip target="finishDate">
              <Translate contentKey="contractToolApp.contract.help.finishDate" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {contractEntity.finishDate ? <TextFormat value={contractEntity.finishDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="statusId">
              <Translate contentKey="contractToolApp.contract.statusId">Status Id</Translate>
            </span>
          </dt>
          <dd>{contractEntity.statusId}</dd>
          <dt>
            <span id="link">
              <Translate contentKey="contractToolApp.contract.link">Link</Translate>
            </span>
            <UncontrolledTooltip target="link">
              <Translate contentKey="contractToolApp.contract.help.link" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.link}</dd>
          <dt>
            <span id="lifecycleStatus">
              <Translate contentKey="contractToolApp.contract.lifecycleStatus">Lifecycle Status</Translate>
            </span>
            <UncontrolledTooltip target="lifecycleStatus">
              <Translate contentKey="contractToolApp.contract.help.lifecycleStatus" />
            </UncontrolledTooltip>
          </dt>
          <dd>{contractEntity.lifecycleStatus}</dd>
          <dt>
            <Translate contentKey="contractToolApp.contract.client">Client</Translate>
          </dt>
          <dd>{contractEntity.client ? contractEntity.client.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/contract" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contract/${contractEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ContractDetail;
