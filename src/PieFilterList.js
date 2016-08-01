import React from 'react'

import {ResponsiveContainer, PieChart, Pie, Legend, Cell, Sector} from 'recharts'
import findIndex from 'lodash/findIndex'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value } = props;


  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const activeCx = cx + cos*0
  const activeCy = cy + sin*0

  const sx = cx + (outerRadius + 3) * cos;
  const sy = cy + (outerRadius + 3) * sin;
  const mx = cx + (outerRadius + 12) * cos; // 20
  const my = cy + (outerRadius + 12) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 10; // Distance of outer line
  // const ey = my;
  const ex = mx; // Distance of outer line
  const ey = my + (sin >= 0 ? 1 : -1) * 7;
  // const textAnchor = cos >= 0 ? 'start' : 'end';
  const textAnchor = "middle";

  const dist = 8
  const textStyle = {
    fontSize: 12
  }

  return (
    <g>
      {/*<text x={activeCx} y={activeCy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>*/}
      <Sector
        cx={activeCx}
        cy={activeCy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={activeCx}
        cy={activeCy}
        innerRadius={outerRadius+3}
        outerRadius={outerRadius+7}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex} y={ey + (sin >= 0 ? 1 : -1) * dist} textAnchor={textAnchor} fill="#333" style={textStyle}>{`${payload.key}`}</text>
      {/*<text x={ex} y={ey + (sin >= 0 ? 1 : -1) * dist} textAnchor={textAnchor} fill="#999" style={textStyle}>
        {`(${payload.doc_count})`}
      </text>*/}
    </g>
  );
};

export class PieFilterList extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      hoveredIndex: -1
    }

    // this.onPieEnter = this.onPieEnter.bind(this)
    // this.onPieLeave = this.onPieLeave.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  // handleChange(selectedOptions = []) {
  //   this.props.setItems(selectedOptions.map(el => el.value))
  // }

  onPieEnter(data, hoveredIndex) {
    this.setState({ hoveredIndex });
  }

  onPieLeave(data, hoveredIndex) {
    this.setState({ hoveredIndex: -1 });
  }

  onSelect(data, index){
    this.props.toggleItem(data.key)
  }

  getSelectedIndex(){
    const { items, selectedItems=[] } = this.props
    if (selectedItems.length == 0) return [this.state.hoveredIndex]
    const selected = selectedItems.map(key => {
      return findIndex(items, {key})
    })
    if (this.state.hoveredIndex >= 0) {
      selected.push(this.state.hoveredIndex)
    }
    return selected
  }

  render() {
    const { placeholder, clearable = true, items, selectedItems = [], disabled, showCount, setItems } = this.props
                  // onMouseEnter={this.onPieEnter}
                  // onMouseLeave={this.onPieLeave}
		return (
        <PieChart width={250} height={165} 
                  onClick={this.onSelect}>
          <Pie startAngle={180} endAngle={0} fill="#8884d8"
               cx={125} cy={125} outerRadius={85}
               activeShape={renderActiveShape} 
               activeIndex={this.getSelectedIndex()}
               isAnimationActive={false}
               nameKey="key" valueKey="doc_count"
               data={items}>
            {
              items.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Legend />
        </PieChart>
		)
  }
}