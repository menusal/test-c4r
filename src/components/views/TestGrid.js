import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ageSource from 'data/sources/ageSource';
import { AGE_LAYER_ID } from 'components/layers/AgeLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget } from '@carto/react-widgets';
import { numberFormatter } from 'utils/formatter';
import { MIN_ZOOM } from 'components/layers/AgeLayer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  foo: {},
}));

export default function TestGrid() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentZoom = useSelector((state) => state.carto.viewState.zoom);

  useEffect(() => {
    dispatch(addSource(ageSource));

    dispatch(
      addLayer({
        id: AGE_LAYER_ID,
        source: ageSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(AGE_LAYER_ID));
      dispatch(removeSource(AGE_LAYER_ID));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.foo}>
      <div>
        <FormulaWidget
          id='totalRevenue'
          title='Total population'
          dataSource={ageSource.id}
          column='POPCY'
          operation={AggregationTypes.SUM}
          formatter={numberFormatter}
          global={currentZoom < MIN_ZOOM}
        />
      </div>
    </Grid>
  );
}
