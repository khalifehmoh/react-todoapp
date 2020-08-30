import axios from 'axios';
import types from '../types/types';

const todoAddAction: any = (todoItem) => {
    return {
        type: types.ADD_TODO,
        todoItem: todoItem
    }
}

const todoGetAction: any = (items) => {
    return {
        type: types.GET_TODO,
        items
    }
}

const todoDeleteAction: any = (todoItem) => {
    return {
        type: types.REMOVE_TODO,
        todoItem: todoItem
    }
}

const todoGetAsync: any = () => {
    return (dispatch) => {
        axios.get('http://192.168.1.17:4000/getTodos')
            .then(
                (response) => {
                    let itemsList: any = [];
                    response.data.map(i => {
                        itemsList.push(i)
                    })
                    dispatch(todoGetAction(itemsList));
                },
                (error) => {
                    throw error
                })
    }
}

const todoAddAsync: any = (item) => {
    return (dispatch) => {
        axios.post('http://192.168.1.17:4000/addTodo', { item })
            .then(
                (response) => {
                    console.log(response.data)
                    dispatch(todoAddAction(item));
                    dispatch(todoGetAction(response.data));
                },
                (error) => {
                    throw error
                })
    }
}

const todoDeleteAsync: any = (id) => {
    return (dispatch) => {
        axios.post('http://192.168.1.17:4000/deleteTodo', { id })
            .then(
                (response) => {
                    dispatch(todoDeleteAction(id));
                    dispatch(todoGetAction(response.data));
                },
                (error) => {
                    throw error
                })
    }
}

const todoReducer: any = (state = [], action) => {
    switch (action.type) {
        case types.ADD_TODO:
            return [...state, action.todoItem]
        case types.GET_TODO:
            return action.items
        case types.REMOVE_TODO:
            return
    }
}

export default { todoReducer, todoAddAction, todoGetAsync, todoAddAsync, todoDeleteAsync } 