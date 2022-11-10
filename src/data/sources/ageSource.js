import { MAP_TYPES } from '@deck.gl/carto';

const AGE_SOURCE_ID = 'ageSource';

const source = {
  id: AGE_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-glcwr7d.ta_grid.usa_demog_ags_qb_z16`,
};

export default source;
