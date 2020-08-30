import React from 'react';
import { applyMiddleware } from 'redux'
import './App.scss';

type TodoProps = {
  todoList: string[],
  addTodo: (todo: string) => void,
  getTodos: () => string[],
  deleteTodo: (id) => void,
}

type TodoState = {
  todoItem: string
}

class Todo extends React.Component<TodoProps, TodoState> {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: '',
    }

  }

  componentDidMount() {
    this.props.getTodos()
  }

  handleChange(e): any {
    this.setState({
      todoItem: e.target.value
    })
  }

  onAdd(): any {
    this.setState({
      todoItem: '',
    })
    this.props.addTodo(this.state.todoItem)
    console.log(this.props)
  }

  onDelete(e): any {
    const id = e.target.getAttribute('id');
    console.log(e.target.getAttribute('id'))
    this.props.deleteTodo(id);
  }

  handleSubmit(e) {
    this.onAdd.bind(this);
    e.preventDefault()
  }

  render() {
    const todos = this.props.todoList.map((i: any, x) => <li id={i._id} key={x} onClick={this.onDelete.bind(this)}>{i.item}</li>);
    const formClass = () => {
      if (this.props.todoList.length === 0) {
        return 'no-items'
      }
    }
    return (
      <div id="todo-table">
        <h1>My Todo List</h1>
        <form className={formClass()} onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Add Item.." onChange={this.handleChange.bind(this)} value={this.state.todoItem} />
          <button type="submit" onClick={this.onAdd.bind(this)}>Add</button>
        </form>
        <ul>
          {todos}
        </ul>
      </div>
    )
  }

}

export default Todo;
