import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';
import { Provider, connect } from 'react-redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer.todoReducer, applyMiddleware(ReduxThunk));

const mapStatetoProps = (state = []) => {
  return {
    todoList: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => {
      dispatch(rootReducer.todoAddAsync(todo))
    },
    getTodos: () => {
      dispatch(rootReducer.todoGetAsync())
    },
    deleteTodo: (id) => {
      dispatch(rootReducer.todoDeleteAsync(id))
    }
  }
}

const Container = connect(mapStatetoProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
