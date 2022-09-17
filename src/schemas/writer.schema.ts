import * as yup from 'yup'

export const WriterCreateSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    name: yup.string().min(3).max(50).required()
  })
})

export const WriterSelectByEmailSchema = yup.object({
  params: yup.object({
    email: yup.string().email().required()
  })
})
