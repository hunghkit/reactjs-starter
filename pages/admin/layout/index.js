import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { idRequired } from 'helpers/isAuth';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Modal } from 'antd';
import App from 'components/Admin';
import { createStructuredSelector } from 'reselect';
import LayoutMenu from 'components/Form/Layout/Menu';
import LayoutHeader from 'components/Form/Layout/Header';
import LayoutSidebar from 'components/Form/Layout/Sidebar';
import * as AppSelector from 'selectors/admin/app';
import { onLayoutRequest, onLayoutLoadingRequest, onLayoutRemoveRequest } from 'actions/adminApp';

const colPropsLeft = {
  lg: 18,
  md: 24,
};
const colPropsRight = {
  lg: 6,
  md: 24,
};

class AdminLayout extends Component {
  state = {
    menu: null,
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { header, menus, sidebars } = this.props;

    return (
      <App {...this.props}>
        <Row>
          <Col>
            <Card title="Header">
              <LayoutHeader
                initialValues={header}
                onSubmit={(e) => this.props.onHeaderCreate(e.toJS())}
                onUploaded={(imageURL) => this.props.onHeaderCreate({ uuid: header.uuid || null, imageURL })}
              />
            </Card>
            <Card
              title={(
                <div>
                  <span
                    style={{ marginRight: 5 }}
                  >
                    Menu
                  </span>
                  <Button
                    icon="plus"
                    size="small"
                    shape="circle"
                    onClick={() => this.setState({ menu: 'new' })}
                  />
                </div>
              )}
            >
              {Object.values(menus).map((item) => <Button style={{ marginRight: 5  }} onClick={() => this.setState({ menu: item.uuid })} key={item.uuid}>{item.title}</Button>)}
            </Card>
          </Col>
          <Col {...colPropsLeft}>
            <Card title="Content">
              Content
            </Card>
          </Col>
          <Col {...colPropsRight}>
            <Card
              title={(
                <div>
                  <span
                    style={{ marginRight: 5 }}
                  >
                    Sidebar
                  </span>
                  <Button
                    icon="plus"
                    size="small"
                    shape="circle"
                    onClick={() => this.setState({ sidebar: 'new' })}
                  />
                </div>
              )}
            >
              {Object.values(sidebars).map((item) => (
                <div
                  key={item.uuid}
                  className="widget"
                  onClick={() => this.setState({ sidebar: item.uuid })}
                >
                  <h3>{item.title}</h3>
                  <div
                    className="widget-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              ))}
            </Card>
          </Col>
        </Row>
        <Modal
          footer={null}
          title="Create a menu"
          visible={!!this.state.menu}
          onCancel={() => this.setState({ menu: null })}
        >
          <LayoutMenu
            initialValues={this.state.menu ? menus[this.state.menu] || {} : {}}
            onDelete={(uuid) => this.props.onMenuDelete(uuid, () => this.setState({ menu: null }))}
            onSubmit={(e) => this.props.onMenuCreate(e.toJS(), () => this.setState({ menu: null }))}
          />
        </Modal>
        <Modal
          footer={null}
          title="Create a sidebar"
          visible={!!this.state.sidebar}
          onCancel={() => this.setState({ sidebar: null })}
        >
          <LayoutSidebar
            initialValues={this.state.sidebar ? sidebars[this.state.sidebar] || {} : {}}
            onDelete={(uuid) => this.props.onSidebarDelete(uuid, () => this.setState({ sidebar: null }))}
            onSubmit={(e) => this.props.onSidebarCreate(e.toJS(), () => this.setState({ sidebar: null }))}
          />
        </Modal>
      </App>
    );
  }
}

AdminLayout.propTypes = {
  onLoad: PropTypes.func,
  menus: PropTypes.object,
  header: PropTypes.object,
  sidebars: PropTypes.object,
  onHeaderCreate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  header: AppSelector.getLayout('header'),
  menus: AppSelector.getLayout('menus'),
  sidebars: AppSelector.getLayout('sidebars'),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(onLayoutLoadingRequest()),
  onMenuCreate: (layout, cb) => dispatch(onLayoutRequest(layout, 'menus', cb)),
  onHeaderCreate: (layout, cb) => dispatch(onLayoutRequest(layout, 'header', cb)),
  onSidebarCreate: (layout, cb) => dispatch(onLayoutRequest(layout, 'sidebars', cb)),
  onMenuDelete: (uuid, cb) => dispatch(onLayoutRemoveRequest(uuid, 'menus', cb)),
  onSidebarDelete: (uuid, cb) => dispatch(onLayoutRemoveRequest(uuid, 'sidebars', cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(idRequired(AdminLayout));
