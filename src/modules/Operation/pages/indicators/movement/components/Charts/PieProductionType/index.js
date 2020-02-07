import React, { memo } from 'react';
// import { formatMessage } from 'umi-plugin-react/locale';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';

function PieProductionType() {
  const { DataView } = DataSet;
  const { Html } = Guide;
  const data = [
    {
      item: 'Minerio',
      count: 40,
    },
    {
      item: 'Esterio',
      count: 21,
    },
    {
      item: 'Outros',
      count: 9,
    },
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent',
  });

  const cols = {
    percent: {
      formatter: val => {
        val = `${parseFloat(Number(val * 100).toFixed(0))}% - ${val}(t)`;
        return val;
      },
    },
  };

  return (
    <Chart height={window.innerHeight} data={dv} scale={cols} padding={[80, 100, 80, 80]} forceFit>
      <Coord type="theta" radius={0.9} innerRadius={0.6} />
      <Axis name="percent" />
      <Legend position="right" offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
      <Tooltip
        showTitle={false}
        itemTpl='<li><span style="" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      />
      <Guide>
        <Html
          position={['50%', '50%']}
          html='<div style="color:#242536;font-size:1.16em;text-align: center;width: 10em;">Total<br><span style="color:#242536;font-size:2.5em">200</span>(t)</div>'
          alignX="middle"
          alignY="middle"
        />
      </Guide>
      <Geom
        animate
        type="intervalStack"
        position="percent"
        color={['item', ['#e7b02e', '#D96704', '#BF3604']]}
        // color="item"
        tooltip={[
          'item*percent',
          (item, percent) => {
            percent = `${percent * 100.0}%`;
            return {
              name: item,
              value: percent,
            };
          },
        ]}
      >
        <Label content="percent" formatter={(val, item) => `${item.point.item}: ${val}`} />
      </Geom>
    </Chart>
  );
}
export default memo(PieProductionType);
