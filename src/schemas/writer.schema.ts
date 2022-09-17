import * as yup from 'yup'

export const UserCreateSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    name: yup.string().min(3).max(50).required()
  })
})

export const UserSelectByEmailSchema = yup.object({
  query: yup.object({
    email: yup.string().email().required()
  })
})
