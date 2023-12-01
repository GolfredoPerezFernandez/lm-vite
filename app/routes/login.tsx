// login.tsx
import { useState, useEffect, useRef } from 'react'
import { FormField } from '~/components/form-field'
import { validateEmail, validateName, validatePassword } from '~/utils/validators.server'
import { ActionFunction, json, LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
import { login, register, getUser } from '~/lib/auth.server'
import { useActionData } from '@remix-run/react'


export const meta: MetaFunction = () => [
    {
       name: "Welcome",
      content: "initial-scale=1, viewport-fit=cover",
      "viewport-fit": "cover",
     },
   ];
export const loader: LoaderFunction = async ({ request }) => {
    // If there's already a user in the session, redirect to the home page
    return await getUser(request) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get("_action");
    const email = form.get("email");
    const password = form.get("password");
    let firstName = form.get("firstName");
    let lastName = form.get("lastName");

    // If not all data was passed, error
    if (
        typeof action !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
    }

    // If not all data was passed, error
    if (
        action === 'register' && (
            typeof firstName !== "string" ||
            typeof lastName !== "string"
        )
    ) {
        return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
    }

    // Validate email & password
    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(action === 'register' ? {
            firstName: validateName(firstName as string || ''),
            lastName: validateName(lastName as string || ''),
        } : {})
    };

    //  If there were any errors, return them
    if (Object.values(errors).some(Boolean))
        return json({ errors, fields: { email, password, firstName, lastName }, form: action }, { status: 400 });

    switch (action) {
        case 'login': {
            return await login({ email, password })
        }
        case 'register': {
            firstName = firstName as string
            lastName = lastName as string
            return await register({ email, password, firstName, lastName })
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
    }
}

export default function Login() {
    const actionData = useActionData()
    const firstLoad = useRef(true)
    const [action, setAction] = useState('login')
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formError, setFormError] = useState(actionData?.error || '')
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || '',
        password: actionData?.fields?.password || '',
        firstName: actionData?.fields?.lastName || '',
        lastName: actionData?.fields?.firstName || '',
    })

    // Updates the form data when an input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    useEffect(() => {
        // Clear the form if we switch forms
        if (!firstLoad.current) {
            const newState = {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
            setErrors(newState)
            setFormError('')
            setFormData(newState)
        }
    }, [action])

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('')
        }
    }, [formData])

    useEffect(() => {
        // We don't want to reset errors on page load because we want to see them
        firstLoad.current = false
    }, [])

    return (
           
            <div className="flex flex-col gap-3 text-slate-500' h-full justify-center items-center flex flex-col gap-y-4 max-container">
                {/* Form Switcher Button */}

                <h1 className='head-text' >
                Welcome to {" "}
            <span className='blue-gradient_text font-semibold drop-shadow'>
              {" "}
              Light-Matter!
            </span>{" "}
            👋
          </h1>
                <p className="font-semibold text-slate-300">{
                    action === 'login' ? 'Log In To Start Modeling!' : 'Sign Up To Get Started!'
                }</p>
                <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-11/12">
                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                        {formError}
                    </div>
                    <FormField
                        htmlFor="email"
                        label="Email"
                        value={formData.email}
                        onChange={e => handleInputChange(e, 'email')}
                        error={errors?.email}
                    />
                    <FormField
                        htmlFor="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={e => handleInputChange(e, 'password')}
                        error={errors?.password}
                    />

                    {
                        action === 'register' && <>
                            {/* First Name */}
                            <FormField htmlFor="firstName" label='First Name' onChange={e => handleInputChange(e, 'firstName')} value={formData.firstName} error={errors?.firstName} />
                            {/* Last Name */}
                            <FormField htmlFor="lastName" label='Last Name' onChange={e => handleInputChange(e, 'lastName')} value={formData.lastName} error={errors?.lastName} />
                        </>
                    }

                    <div className="w-full flex flex-col   text-center">
                        <button type="submit" name="_action" value={action} className="rounded-xl mt-2 bg-black px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                            {
                                action === 'login' ? "Log In" : "Sign Up"
                            }
                        </button>
                       
                      
                    </div>
                    
                </form>
                <p className="font-semibold mt-2 mb-1 text-black">{
                    action === 'login' ? 'Create a new Account' : 'Already have an Account?'
                }</p>
                <button
                    onClick={() => setAction(action === 'login' ? 'register' : 'login')}
                    className="rounded-xl bg-black font-semibold text-white px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                >{action === 'login' ? 'Sign Up' : 'Log In'}</button>
            </div>
    )
}