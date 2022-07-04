const commentsRouter = require('express').Router()

const Comment = require('../models/comments')

commentsRouter.post('/', async (request, response) => {
  const { content } = request.body
  const comment = new Comment({
    content,
  })

  await Comment.deleteMany({})
  const savedComment = await comment.save()

  response.send({ comment: savedComment, count: request.count })
})

commentsRouter.put('/:id', async (request, response) => {
  const { content } = request.body

  const comment = {
    content,
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    request.params.id,
    comment,
    {
      new: true,
    }
  )

  response.send({ comment: updatedComment, count: request.count })
})

module.exports = commentsRouter
