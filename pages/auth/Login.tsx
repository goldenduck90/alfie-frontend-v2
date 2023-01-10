import { gql, useMutation } from "@apollo/client"
import { Wrapper } from "../../components/layouts/Wrapper"
import { IconInput } from "../../components/inputs/IconInput"
import { Checkbox } from "../../components/inputs/Checkbox"
import { Button } from "../../components/Button"
import { LockClosedIcon, UserIcon } from "@heroicons/react/solid"
import { FormikProvider, useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { parseError } from "../../utils/parseError"

const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        name
        email
        role
        eaProviderId
      }
    }
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  password: Yup.string().required("Please enter your password."),
})

const Login = () => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const { setSession } = useAuth()
  const [login] = useMutation(loginMutation)

  const loginForm = useFormik({
    initialValues: {
      error: "",
      email: "",
      password: "",
      remember: false,
    },
    initialErrors: {
      error: search.get("redirect")
        ? "Your session has expired. Please login again."
        : "",
    },
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const { email, password, remember } = values

      try {
        const { data } = await login({
          variables: {
            input: {
              email,
              password,
              remember,
            },
          },
        })
        const { token, user } = data.login
        setSession({ newToken: token, newUser: user })

        const path = search.get("redirect") || "/dashboard"
        resetForm()
        navigate(path)
      } catch (err) {
        const msg = parseError(err)
        setErrors({
          error: msg,
          email: " ",
          password: " ",
        })
      }
    },
  })

  const { isSubmitting, submitForm, errors } = loginForm

  return (
    <Wrapper>
      <div className="flex flex-col items-center my-10">
        <img
          src={require("../../assets/logo.png")}
          alt="Alfie"
          className="w-36"
        />
      </div>
      <FormikProvider value={loginForm}>
        <div className="flex flex-col px-8 sm:px-14 pt-14 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 md:max-w-md">
          {errors.error && (
            <div className="text-red-500 text-sm text-center">
              {errors.error}
            </div>
          )}
          <div className="pb-2">
            <IconInput
              name="email"
              placeholder="Email address"
              type="email"
              disabled={isSubmitting}
              icon={<UserIcon className="h-5 w-5 text-indigo-800" />}
            />
          </div>
          <div className="pb-3">
            <IconInput
              name="password"
              placeholder="Password"
              type="password"
              disabled={isSubmitting}
              icon={<LockClosedIcon className="h-5 w-5 text-indigo-800" />}
            />
          </div>
          <div className="pb-3">
            <Checkbox
              name="remember"
              label="Remember me"
              disabled={isSubmitting}
            />
          </div>
          <div className="pb-3 flex flex-col items-center">
            <Button
              title="Login"
              onPress={submitForm}
              disabled={isSubmitting}
              fullWidth
            />
            <div className="pt-3">
              <Link
                to="/forgot-password"
                className="font-mulish text-sm text-indigo-800 hover:text-indigo-600"
              >
                Forgot Password
              </Link>
            </div>
          </div>
          <div className="flex flex-col border-t border-gray-200">
            <p className="font-mulish text-center text-sm text-gray-400 pt-6">
              Haven&apos;t signed up yet?{" "}
              <Link
                to="/signup"
                className="text-indigo-800 hover:text-indigo-600"
              >
                Click here to see if you are eligible for Alfie.
              </Link>
            </p>
          </div>
        </div>
      </FormikProvider>
    </Wrapper>
  )
}

Login.isAuthorized = false
export default Login
