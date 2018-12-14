import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { arrayToTree, queryArray } from 'utils';
import { onChangeOpenKeys } from 'actions/app';
import pathToRegexp from 'path-to-regexp';
import menu from 'data/menu';

const Menus = ({ siderFold, router, navOpenKeys, changeOpenKeys = () => {} }) => {
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== '-1'), 'id', 'mpid');
  const levelMap = {};

  const getMenus = (menuTreeN, siderFoldN) =>
    menuTreeN.map((item) => {
      if (item.children) {
        if (item.mpid) levelMap[item.id] = item.mpid;

        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                {(!siderFoldN || !menuTree.includes(item)) && item.name}
              </span>
            }
          >
            {getMenus(item.children, siderFoldN)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.id}>
          <Link href={item.route || '#'}>
            <div>
              {item.icon && <Icon type={item.icon} />}
              {(!siderFoldN || !menuTree.includes(item)) && item.name}
            </div>
          </Link>
        </Menu.Item>
      );
    });

  const menuItems = getMenus(menuTree, siderFold);

  const getAncestorKeys = (key) => {
    const map = {};
    const getParent = (index) => {
      const result = [String(levelMap[index])];
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0]);
      }

      return result;
    };

    Object.keys(levelMap).forEach((index) => {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index);
      }
    });

    return map[key] || [];
  };

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key));
    const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key));
    let nextOpenKeys = [];

    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  };

  const menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {};

  let currentMenu;
  let defaultSelectedKeys;

  Object.values(menu).forEach((item) => {
    if (item.route && pathToRegexp(item.route).exec(router.pathname)) {
      currentMenu = item;
    }
  });

  const getPathArray = (array, current, pid, id) => {
    const result = [String(current[id])];
    const getPath = (item) => {
      if (item && item[pid]) {
        result.unshift(String(item[pid]));
        getPath(queryArray(array, item[pid], id));
      }
    };

    getPath(current);
    return result;
  };

  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menu, currentMenu, 'mpid', 'id');
  }

  if (!defaultSelectedKeys) {
    defaultSelectedKeys = ['1'];
  }

  return (
    <Menu
      {...menuProps}
      theme="dark"
      selectedKeys={defaultSelectedKeys}
      className="menu-layout-admin-components"
      mode={siderFold ? 'vertical' : 'inline'}
    >
      {menuItems}
    </Menu>
  );
};

Menus.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  router: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

const mapStateToProps = (state) => ({
  siderFold: state.getIn(['app', 'siderFold']),
  navOpenKeys: (state.getIn(['app', 'navOpenKeys']) || fromJS([])).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  changeOpenKeys: (openKeys) => dispatch(onChangeOpenKeys({ navOpenKeys: openKeys })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menus));
