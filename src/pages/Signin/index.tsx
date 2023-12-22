import './styles.css'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { setIsAuthenticated } from '../../store/auth/auth.actions'
import { authenticate } from '../../utils/auth'

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

            <Button color=" #3498db" label="Submit" />
          </form>
        </div>
      </FormProvider>
    </>
  )
}
