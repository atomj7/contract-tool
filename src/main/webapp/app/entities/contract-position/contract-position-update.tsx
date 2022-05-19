import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText, UncontrolledTooltip } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubcontract } from 'app/shared/model/subcontract.model';
import { getEntities as getSubcontracts } from 'app/entities/subcontract/subcontract.reducer';
import { IContractPosition } from 'app/shared/model/contract-position.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';
import { getEntity, updateEntity, createEntity, reset } from './contract-position.reducer';

export const ContractPositionUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const subcontracts = useAppSelector(state => state.subcontract.entities);
  const contractPositionEntity = useAppSelector(state => state.contractPosition.entity);
  const loading = useAppSelector(state => state.contractPosition.loading);
  const updating = useAppSelector(state => state.contractPosition.updating);
  const updateSuccess = useAppSelector(state => state.contractPosition.updateSuccess);
  const lifecycleStatusValues = Object.keys(LifecycleStatus);
  const handleClose = () => {
    props.history.push('/contract-position' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSubcontracts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...contractPositionEntity,
      ...values,
      subcontract: subcontracts.find(it => it.id.toString() === values.subcontract.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          lifecycleStatus: 'ACTUAL',
          ...contractPositionEntity,
          subcontract: contractPositionEntity?.subcontract?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="contractToolApp.contractPosition.home.createOrEditLabel" data-cy="ContractPositionCreateUpdateHeading">
            <Translate contentKey="contractToolApp.contractPosition.home.createOrEditLabel">Create or edit a ContractPosition</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="contract-position-id"
                  label={translate('contractToolApp.contractPosition.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('contractToolApp.contractPosition.contractPositionId')}
                id="contract-position-contractPositionId"
                name="contractPositionId"
                data-cy="contractPositionId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="contractPositionIdLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.contractPositionId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.employeeId')}
                id="contract-position-employeeId"
                name="employeeId"
                data-cy="employeeId"
                type="text"
              />
              <UncontrolledTooltip target="employeeIdLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.employeeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.numberContractPosition')}
                id="contract-position-numberContractPosition"
                name="numberContractPosition"
                data-cy="numberContractPosition"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="numberContractPositionLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.numberContractPosition" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.restrictionTypeId')}
                id="contract-position-restrictionTypeId"
                name="restrictionTypeId"
                data-cy="restrictionTypeId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="restrictionTypeIdLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.restrictionTypeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.restriction')}
                id="contract-position-restriction"
                name="restriction"
                data-cy="restriction"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="restrictionLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.restriction" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.currencyId')}
                id="contract-position-currencyId"
                name="currencyId"
                data-cy="currencyId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="currencyIdLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.currencyId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.rateAnHour')}
                id="contract-position-rateAnHour"
                name="rateAnHour"
                data-cy="rateAnHour"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="rateAnHourLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.rateAnHour" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.statusId')}
                id="contract-position-statusId"
                name="statusId"
                data-cy="statusId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="statusIdLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.statusId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.contractPosition.lifecycleStatus')}
                id="contract-position-lifecycleStatus"
                name="lifecycleStatus"
                data-cy="lifecycleStatus"
                type="select"
              >
                {lifecycleStatusValues.map(lifecycleStatus => (
                  <option value={lifecycleStatus} key={lifecycleStatus}>
                    {translate('contractToolApp.LifecycleStatus.' + lifecycleStatus)}
                  </option>
                ))}
              </ValidatedField>
              <UncontrolledTooltip target="lifecycleStatusLabel">
                <Translate contentKey="contractToolApp.contractPosition.help.lifecycleStatus" />
              </UncontrolledTooltip>
              <ValidatedField
                id="contract-position-subcontract"
                name="subcontract"
                data-cy="subcontract"
                label={translate('contractToolApp.contractPosition.subcontract')}
                type="select"
              >
                <option value="" key="0" />
                {subcontracts
                  ? subcontracts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contract-position" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ContractPositionUpdate;
