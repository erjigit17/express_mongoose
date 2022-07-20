import {Router} from 'express'
import asyncHandler from 'express-async-handler'

import {
  changeTodoItem,
  createTodoItem,
  getTodoItemsCount,
  showTodoItems
} from '../helpers'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const {page = '1', limit = '10'} = req.query
    const result = await showTodoItems({
      page: +page,
      limit: +limit
    })

    res.json(result)
  })
)

router.get(
  '/count',
  asyncHandler(async (req, res) => {
    let count = 0
    await getTodoItemsCount()
      .then((num: number) => count = num)
      .then(() => {
        res.json(count)
      })
      .catch((e: Error) => {
        console.warn(e)
        res.sendStatus(403)
      })
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id

    await showTodoItems({id})
      .then((result) => {
        res.json(result)
      })
      .catch((e: PromiseRejectionEvent) => {
        res.sendStatus(404)
      })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {message, completed} = req.body

    if (message === undefined || completed === undefined) {
      res.sendStatus(400)
      return
    }

    await createTodoItem({message, completed}).then((result) => {
      res.json({_id: result._id})
    })
  })
)

router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id

    await changeTodoItem(id, req.body)
      .then(() => res.sendStatus(200))
      .catch((e: PromiseRejectionEvent) => {
        res.sendStatus(404)
      })
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const deleteTime = Date.now()

    await changeTodoItem(id, {deletedAt: deleteTime})
      .then(() => res.sendStatus(200))
      .catch((e: PromiseRejectionEvent) => res.sendStatus(404))
  })
)

router.get(
  '*',
  asyncHandler(async (req, res) => {
    res.sendStatus(404)
  })
)


export {router}