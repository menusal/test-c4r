import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';

export const MIN_ZOOM = 10;
export const AGE_LAYER_ID = 'ageLayer';

export default function AgeLayer() {
  const { ageLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, ageLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (ageLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: AGE_LAYER_ID,
      geoColumn: 'quadbin',
      aggregationExp: 'sum(POPCY)',
      pickable: false,
      visible: false,
    });
  }
}
