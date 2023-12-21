import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import './styles.css'
import { authenticate } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../../store/auth/auth.actions'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

export type IFormInput = {
  username: string
  password: string
}

export default function SignInForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const methods = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const isAuthenticated = authenticate(data.username, data.password)

    if (isAuthenticated) {
      dispatch(setIsAuthenticated(true))
      navigate('/book-store')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="form-container">
          <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register('username')}
              label="Username"
              placeholder="Username"
              type="text"
            />

            <Input
              register={register('password')}
              label="Password"
              placeholder="Password"
              type="password"
            />

            <Button label="Submit" />
          </form>
        </div>
      </FormProvider>
    </>
  )
}
