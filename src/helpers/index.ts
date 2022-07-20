import {TodoItemModel} from '../models'
import {IGetParams, ITodo} from '../interfaces'


export const changeTodoItem = async (
  id: string,
  params: ITodo
) => {
  const upd: ITodo = Object.keys(params).reduce((res: ITodo, val: string) => {
    if (params[val] !== undefined) res[val] = params[val]
    return res
  }, {})

  return TodoItemModel.updateOne({_id: id}, upd)
}

export const createTodoItem = async (
  params: ITodo
) => {
  return await TodoItemModel.create(params)
}

export const showTodoItems = async (
  params: IGetParams
) => {
  if (params.id) {
    return TodoItemModel.find({_id: params.id})
  } else {
    const {page = 1, limit = 10} = params
    const currentPage = page < 1 ? 0 : page - 1
    const pages: number = currentPage * limit
    return TodoItemModel.find({deletedAt: null})
      .skip(pages)
      .limit(limit)
  }
}

export const getTodoItemsCount = async (): Promise<number> => {
  return TodoItemModel.countDocuments({deletedAt: null})
}