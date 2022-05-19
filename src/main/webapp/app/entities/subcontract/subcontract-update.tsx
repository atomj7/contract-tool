import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText, UncontrolledTooltip } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { ISubcontract } from 'app/shared/model/subcontract.model';
import { LifecycleStatus } from 'app/shared/model/enumerations/lifecycle-status.model';
import { getEntity, updateEntity, createEntity, reset } from './subcontract.reducer';

export const SubcontractUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const contracts = useAppSelector(state => state.contract.entities);
  const projects = useAppSelector(state => state.project.entities);
  const subcontractEntity = useAppSelector(state => state.subcontract.entity);
  const loading = useAppSelector(state => state.subcontract.loading);
  const updating = useAppSelector(state => state.subcontract.updating);
  const updateSuccess = useAppSelector(state => state.subcontract.updateSuccess);
  const lifecycleStatusValues = Object.keys(LifecycleStatus);
  const handleClose = () => {
    props.history.push('/subcontract' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getContracts({}));
    dispatch(getProjects({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...subcontractEntity,
      ...values,
      contract: contracts.find(it => it.id.toString() === values.contract.toString()),
      project: projects.find(it => it.id.toString() === values.project.toString()),
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
          ...subcontractEntity,
          contract: subcontractEntity?.contract?.id,
          project: subcontractEntity?.project?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="contractToolApp.subcontract.home.createOrEditLabel" data-cy="SubcontractCreateUpdateHeading">
            <Translate contentKey="contractToolApp.subcontract.home.createOrEditLabel">Create or edit a Subcontract</Translate>
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
                  id="subcontract-id"
                  label={translate('contractToolApp.subcontract.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('contractToolApp.subcontract.contractId')}
                id="subcontract-contractId"
                name="contractId"
                data-cy="contractId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="contractIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.contractId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.projectId')}
                id="subcontract-projectId"
                name="projectId"
                data-cy="projectId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="projectIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.projectId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.subcontractCipher')}
                id="subcontract-subcontractCipher"
                name="subcontractCipher"
                data-cy="subcontractCipher"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="subcontractCipherLabel">
                <Translate contentKey="contractToolApp.subcontract.help.subcontractCipher" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.statusId')}
                id="subcontract-statusId"
                name="statusId"
                data-cy="statusId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="statusIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.statusId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.cooperationTypeId')}
                id="subcontract-cooperationTypeId"
                name="cooperationTypeId"
                data-cy="cooperationTypeId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="cooperationTypeIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.cooperationTypeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.sum')}
                id="subcontract-sum"
                name="sum"
                data-cy="sum"
                type="text"
              />
              <UncontrolledTooltip target="sumLabel">
                <Translate contentKey="contractToolApp.subcontract.help.sum" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.positions')}
                id="subcontract-positions"
                name="positions"
                data-cy="positions"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <UncontrolledTooltip target="positionsLabel">
                <Translate contentKey="contractToolApp.subcontract.help.positions" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.currencyId')}
                id="subcontract-currencyId"
                name="currencyId"
                data-cy="currencyId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="currencyIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.currencyId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.paymentTermTypeId')}
                id="subcontract-paymentTermTypeId"
                name="paymentTermTypeId"
                data-cy="paymentTermTypeId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="paymentTermTypeIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.paymentTermTypeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.paymentTermId')}
                id="subcontract-paymentTermId"
                name="paymentTermId"
                data-cy="paymentTermId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="paymentTermIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.paymentTermId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.startDate')}
                id="subcontract-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="startDateLabel">
                <Translate contentKey="contractToolApp.subcontract.help.startDate" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.finishDate')}
                id="subcontract-finishDate"
                name="finishDate"
                data-cy="finishDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="finishDateLabel">
                <Translate contentKey="contractToolApp.subcontract.help.finishDate" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.typeId')}
                id="subcontract-typeId"
                name="typeId"
                data-cy="typeId"
                type="text"
              />
              <UncontrolledTooltip target="typeIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.typeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.tasktTypeId')}
                id="subcontract-tasktTypeId"
                name="tasktTypeId"
                data-cy="tasktTypeId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="tasktTypeIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.tasktTypeId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.technologyId')}
                id="subcontract-technologyId"
                name="technologyId"
                data-cy="technologyId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="technologyIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.technologyId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.domenId')}
                id="subcontract-domenId"
                name="domenId"
                data-cy="domenId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <UncontrolledTooltip target="domenIdLabel">
                <Translate contentKey="contractToolApp.subcontract.help.domenId" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.link')}
                id="subcontract-link"
                name="link"
                data-cy="link"
                type="text"
              />
              <UncontrolledTooltip target="linkLabel">
                <Translate contentKey="contractToolApp.subcontract.help.link" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('contractToolApp.subcontract.lifecycleStatus')}
                id="subcontract-lifecycleStatus"
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
                <Translate contentKey="contractToolApp.subcontract.help.lifecycleStatus" />
              </UncontrolledTooltip>
              <ValidatedField
                id="subcontract-contract"
                name="contract"
                data-cy="contract"
                label={translate('contractToolApp.subcontract.contract')}
                type="select"
              >
                <option value="" key="0" />
                {contracts
                  ? contracts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="subcontract-project"
                name="project"
                data-cy="project"
                label={translate('contractToolApp.subcontract.project')}
                type="select"
              >
                <option value="" key="0" />
                {projects
                  ? projects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/subcontract" replace color="info">
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

export default SubcontractUpdate;
