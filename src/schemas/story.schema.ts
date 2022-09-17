import * as yup from 'yup'

export const StoryCreateSchema = yup.object({
  body: yup.object({
    title: yup.string().min(3).max(50).required(),
    synopsis: yup.string().min(10).max(250).required(),
    writerId: yup.string().uuid().required(),
    isCompleted: yup.boolean()
  })
})
