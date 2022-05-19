import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/client">
        <Translate contentKey="global.menu.entities.client" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/contract">
        <Translate contentKey="global.menu.entities.contract" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.project" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/subcontract">
        <Translate contentKey="global.menu.entities.subcontract" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/contract-position">
        <Translate contentKey="global.menu.entities.contractPosition" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
