import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { createBook } from '../../store/books/books.actions'

export type FormTypes = {
  image: string
  title: string
  author: string
}

export default function RegisterBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const methods = useForm<FormTypes>({
    defaultValues: {
      image: '',
      title: '',
      author: '',
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    dispatch(createBook(data))

    navigate('/book-store')
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="form-container">
          <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register('image')}
              label="Image (url)"
              placeholder="image"
              type="text"
            />

            <Input
              register={register('title')}
              label="Title"
              placeholder="title"
              type="text"
            />

            <Input
              register={register('author')}
              label="Author"
              placeholder="author"
              type="author"
            />

            <Button color="#3498db" label="Register" />
          </form>
        </div>
      </FormProvider>
    </>
  )
}
