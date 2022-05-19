import client from 'app/entities/client/client.reducer';
import contract from 'app/entities/contract/contract.reducer';
import project from 'app/entities/project/project.reducer';
import subcontract from 'app/entities/subcontract/subcontract.reducer';
import contractPosition from 'app/entities/contract-position/contract-position.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  client,
  contract,
  project,
  subcontract,
  contractPosition,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
