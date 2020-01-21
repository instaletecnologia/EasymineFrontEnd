import React, { PureComponent } from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { Option, OptGroup } = AutoComplete;

export default class AutoCompleteMaintenanceOrder extends PureComponent {
  render() {
    const dataSource = [
      {
        title: 'Libraries',
        children: [
          {
            title: 'AntDesign',
            count: 10000,
          },
          {
            title: 'AntDesign UI',
            count: 10600,
          },
        ],
      },
      {
        title: 'Solutions',
        children: [
          {
            title: 'AntDesign UI',
            count: 60100,
          },
          {
            title: 'AntDesign',
            count: 30010,
          },
        ],
      },
      {
        title: 'Articles',
        children: [
          {
            title: 'AntDesign design language',
            count: 100000,
          },
        ],
      },
    ];

    function renderTitle(title) {
      return (
        <span>
          {title}
          <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
            more
          </a>
        </span>
      );
    }

    const options = dataSource
      .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
          {group.children.map(opt => (
            <Option key={opt.title} value={opt.title}>
              {opt.title}
              <span className="certain-search-item-count">{opt.count} people</span>
            </Option>
          ))}
        </OptGroup>
      ))
      .concat([
        <Option disabled key="all" className="show-all">
          <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
            View all results
          </a>
        </Option>,
      ]);

    return (
      <div className={classNames(classNames, styles.div)} style={{ width: 300 }}>
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 100 }}
          size="large"
          style={{ width: '100%' }}
          dataSource={options}
          placeholder="Digite a ordem de manutenção"
          optionLabelProp="value"
        >
          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
      </div>
    );
  }
}