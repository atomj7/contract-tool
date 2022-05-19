import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText, UncontrolledTooltip } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IClient } from 'app/shared/model/client.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';
import { getEntity, updateEntity, createEntity, reset } from './client.reducer';

export const ClientUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const clientEntity = useAppSelector(state => state.client.entity);
  const loading = useAppSelector(state => state.client.loading);
  const updating = useAppSelector(state => state.client.updating);
  const updateSuccess = useAppSelector(state => state.client.updateSuccess);
  const lifecycleStatusValues = Object.keys(LifecycleStatus);
  const handleClose = () => {
    props.history.push('/client' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...clientEntity,
      ...values,
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
          ...clientEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="contractToolApp.client.home.createOrEditLabel" data-cy="ClientCreateUpdateHeading">
            <Translate contentKey="contractToolApp.client.home.createOrEditLabel">Create or edit a Client</Translate>
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
                  id="client-id"
                  label={translate('contractToolApp.client.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('contractToolApp.client.name')}
                id="client-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 1, message: translate('entity.validation.minlength', { min: 1 }) },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <UncontrolledTooltip target="nameLabel">
                <Translate contentKey="contractToolApp.client.help.name" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.salesManagerId')}
                id="client-salesManagerId"
                name="salesManagerId"
                data-cy="salesManagerId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="salesManagerIdLabel">
                <Translate contentKey="contractToolApp.client.help.salesManagerId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.countryId')}
                id="client-countryId"
                name="countryId"
                data-cy="countryId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="countryIdLabel">
                <Translate contentKey="contractToolApp.client.help.countryId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.partnerStatus')}
                id="client-partnerStatus"
                name="partnerStatus"
                data-cy="partnerStatus"
                check
                type="checkbox"
              />
              <UncontrolledTooltip target="partnerStatusLabel">
                <Translate contentKey="contractToolApp.client.help.partnerStatus" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.contactPerson')}
                id="client-contactPerson"
                name="contactPerson"
                data-cy="contactPerson"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="contactPersonLabel">
                <Translate contentKey="contractToolApp.client.help.contactPerson" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.contractEmail')}
                id="client-contractEmail"
                name="contractEmail"
                data-cy="contractEmail"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="contractEmailLabel">
                <Translate contentKey="contractToolApp.client.help.contractEmail" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.industryId')}
                id="client-industryId"
                name="industryId"
                data-cy="industryId"
                type="text"
              />
              <UncontrolledTooltip target="industryIdLabel">
                <Translate contentKey="contractToolApp.client.help.industryId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.signer')}
                id="client-signer"
                name="signer"
                data-cy="signer"
                type="text"
              />
              <UncontrolledTooltip target="signerLabel">
                <Translate contentKey="contractToolApp.client.help.signer" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.signerPosition')}
                id="client-signerPosition"
                name="signerPosition"
                data-cy="signerPosition"
                type="text"
              />
              <UncontrolledTooltip target="signerPositionLabel">
                <Translate contentKey="contractToolApp.client.help.signerPosition" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.legalAdress')}
                id="client-legalAdress"
                name="legalAdress"
                data-cy="legalAdress"
                type="text"
              />
              <UncontrolledTooltip target="legalAdressLabel">
                <Translate contentKey="contractToolApp.client.help.legalAdress" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.registrationNumber')}
                id="client-registrationNumber"
                name="registrationNumber"
                data-cy="registrationNumber"
                type="text"
              />
              <UncontrolledTooltip target="registrationNumberLabel">
                <Translate contentKey="contractToolApp.client.help.registrationNumber" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.baseOfActivityId')}
                id="client-baseOfActivityId"
                name="baseOfActivityId"
                data-cy="baseOfActivityId"
                type="text"
              />
              <UncontrolledTooltip target="baseOfActivityIdLabel">
                <Translate contentKey="contractToolApp.client.help.baseOfActivityId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.vatNumber')}
                id="client-vatNumber"
                name="vatNumber"
                data-cy="vatNumber"
                type="text"
              />
              <UncontrolledTooltip target="vatNumberLabel">
                <Translate contentKey="contractToolApp.client.help.vatNumber" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.bankName')}
                id="client-bankName"
                name="bankName"
                data-cy="bankName"
                type="text"
              />
              <UncontrolledTooltip target="bankNameLabel">
                <Translate contentKey="contractToolApp.client.help.bankName" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.bankAdress')}
                id="client-bankAdress"
                name="bankAdress"
                data-cy="bankAdress"
                type="text"
              />
              <UncontrolledTooltip target="bankAdressLabel">
                <Translate contentKey="contractToolApp.client.help.bankAdress" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.swiftCode')}
                id="client-swiftCode"
                name="swiftCode"
                data-cy="swiftCode"
                type="text"
              />
              <UncontrolledTooltip target="swiftCodeLabel">
                <Translate contentKey="contractToolApp.client.help.swiftCode" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.ibanCode')}
                id="client-ibanCode"
                name="ibanCode"
                data-cy="ibanCode"
                type="text"
              />
              <UncontrolledTooltip target="ibanCodeLabel">
                <Translate contentKey="contractToolApp.client.help.ibanCode" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.client.lifecycleStatus')}
                id="client-lifecycleStatus"
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
                <Translate contentKey="contractToolApp.client.help.lifecycleStatus" />
              </UncontrolledTooltip>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/client" replace color="info">
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

export default ClientUpdate;
