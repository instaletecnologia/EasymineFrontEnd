import React, { PureComponent } from 'react';
import { Select } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { Option } = Select;

export default class SelectEquipmentType extends PureComponent {
  render() {
    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onBlur() {
      console.log('blur');
    }

    function onFocus() {
      console.log('focus');
    }

    function onSearch(val) {
      console.log('search:', val);
    }
    return (
      <div className={classNames(classNames, styles.div)}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Selecione um tipo de equipamento"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </div>
    );
  }
}
