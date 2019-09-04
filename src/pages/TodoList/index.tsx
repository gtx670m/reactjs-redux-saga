import { Button, Card, Icon, List, Typography, Input, Row, Col } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;
const { Search } = Input;

interface TodoListProps {
  todoList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface TodoListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

@connect(
  ({
    todoList,
    loading,
  }: {
    todoList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    todoList,
    loading: loading.models.todoList,
  }),
)
class TodoList extends Component<TodoListProps, TodoListState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'todoList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleSearch() {}

  render() {
    const {
      todoList: { list },
      loading,
    } = this.props;

    const content = (
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={this.handleSearch}
      />
    );

    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageHeaderWrapper content={content}>
        <Row gutter={10}>
          <Col span={8}>
            <h3>READY</h3>
            <div className={styles.cardList}>
              <List<Partial<CardListItemDataType>>
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
                dataSource={[nullData, ...list]}
                renderItem={item => {
                  if (item && item.id) {
                    return (
                      <List.Item key={item.id}>
                        <Card
                          hoverable
                          className={styles.card}
                          actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                        >
                          <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                            title={<a>{item.title}</a>}
                            description={
                              <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                {item.description}
                              </Paragraph>
                            }
                          />
                        </Card>
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item>
                      <Button type="dashed" className={styles.newButton}>
                        <Icon type="plus" /> 新增产品
                      </Button>
                    </List.Item>
                  );
                }}
              />
            </div>
          </Col>
          <Col span={8}>
            <h3>INPROGRESS</h3>
            <div className={styles.cardList}>
              <List<Partial<CardListItemDataType>>
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
                dataSource={[nullData, ...list]}
                renderItem={item => {
                  if (item && item.id) {
                    return (
                      <List.Item key={item.id}>
                        <Card
                          hoverable
                          className={styles.card}
                          actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                        >
                          <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                            title={<a>{item.title}</a>}
                            description={
                              <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                {item.description}
                              </Paragraph>
                            }
                          />
                        </Card>
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item>
                      <Button type="dashed" className={styles.newButton}>
                        <Icon type="plus" /> 新增产品
                      </Button>
                    </List.Item>
                  );
                }}
              />
            </div>
          </Col>
          <Col span={8}>
            <h3>COMPLETED</h3>
            <div className={styles.cardList}>
              <List<Partial<CardListItemDataType>>
                rowKey="id"
                loading={loading}
                grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
                dataSource={[nullData, ...list]}
                renderItem={item => {
                  if (item && item.id) {
                    return (
                      <List.Item key={item.id}>
                        <Card
                          hoverable
                          className={styles.card}
                          actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                        >
                          <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                            title={<a>{item.title}</a>}
                            description={
                              <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                                {item.description}
                              </Paragraph>
                            }
                          />
                        </Card>
                      </List.Item>
                    );
                  }
                  return (
                    <List.Item>
                      <Button type="dashed" className={styles.newButton}>
                        <Icon type="plus" /> 新增产品
                      </Button>
                    </List.Item>
                  );
                }}
              />
            </div>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default TodoList;
