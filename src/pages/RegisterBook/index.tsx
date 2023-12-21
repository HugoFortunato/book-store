import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBook } from '../../store/books/books.actions'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

export type IFormInput = {
  title: string
  author: string
}

export default function RegisterBook() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const methods = useForm<IFormInput>({
    defaultValues: {
      title: '',
      author: '',
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(createBook(data))

    navigate('/book-store')
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="form-container">
          <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
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

            <Button label="Register" />
          </form>
        </div>
      </FormProvider>
    </>
  )
}
