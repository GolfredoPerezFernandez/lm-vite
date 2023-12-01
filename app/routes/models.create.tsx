import { getUserById } from "~/lib/user.server"
import { Modal } from '~/components/modal';
import { getUser } from '~/lib/auth.server'

import { useLoaderData, useActionData, useNavigate } from "@remix-run/react"
import { UserCircle } from "~/components/user-circle";
import { useEffect, useRef, useState } from "react";
import { SelectBox } from '~/components/select-box'
import { Model } from "~/components/model";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { createModel } from "~/lib/model.server";
import { requireUserId } from "~/lib/auth.server";
import { ModelCreate } from "~/components/modelCreate";
import { motion, useScroll, useTransform } from "framer-motion";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    return json({ user })
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const userId = await requireUserId(request)
    const title = form.get('title').toString()

    const message = form.get('message')

    if (
        typeof message !== 'string'
    ) {
        return json({ error: `Invalid Form Data` }, { status: 400 });
    }

    if (!message.length) {
        return json({ error: `Please provide a message.` }, { status: 400 });
    }


    await createModel(
        title,
        message,
        userId,
       
    )

    return redirect('/models')
}

export default function Create() {
    const actionData = useActionData<typeof action>()
    const [formError,setFormError] = useState(actionData?.error || '')
    const [formData, setFormData] = useState({
        message: '',
        title: '',

    })
    const firstLoad = useRef(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData(data => ({ ...data, [field]: e.target.value }))
    }

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('')
        }
    }, [formData])

    useEffect(() => {
        firstLoad.current = false
    }, [])

    const getOptions = (data: any) => Object.keys(data).reduce((acc: any[], curr) => {
        acc.push({
            name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
            value: curr
        })
        return acc
    }, [])


    const {  user } = useLoaderData<typeof loader>()

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll({ container: containerRef });
    const range = [0, 30, 60];
    const navBackgroundColor = useTransform(scrollY, range, [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ]);
    
  useEffect(() => {
    return navBackgroundColor.onChange((color) => {
      // change meta theme color
      document
        .querySelector("meta[name=theme-color]")
        ?.setAttribute("content", color);
    });
  }, [navBackgroundColor]);
  const navigate = useNavigate();

    return  <div className="h-[100dvh] w-full flex-1 flex flex-col relative">
    <motion.nav
      className="pt-safe bg-white border-b bg-opacity-50  border-gray-200 top-0 flex justify-center"
      style={{
        height: "calc(env(safe-area-inset-top) + 64px)",
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: useTransform(scrollY, range, [
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
        ]),
        borderColor: useTransform(scrollY, range, [
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
        ]),
      }}
    >
      <div
        className="h-full grid w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-0 items-center"
        style={{
          gridTemplateColumns: "1fr 4fr 1fr",
        }}
      >
        <button
          className="text-black lg:invisible grow-0 flex items-center gap-0 px-1 py-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="h-5" />
          <span>Models</span>
        </button>
        <motion.h1
          className="font-medium shrink-0 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 py-3 flex-1 flex justify-center "
          style={{
            opacity: useTransform(scrollY, range, [0, 0, 1]),
          }}
        >
          {"My Models 1"}
        </motion.h1>
      </div>
      <div></div>
    </motion.nav>

    <div className="overflow-y-auto flex-1 pb-0" ref={containerRef}>
      <motion.h1
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-2 text-3xl font-semibold block text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
      >
      {"Create New Model"}
      </motion.h1> 
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full mb-2">
            {formError}
        </div>
        
        <form method="post">
            <input type="hidden"  name="recipientId" />
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
                <div className="text-center flex flex-col items-center gap-y-2 ">
                   
                </div>
                <div className="flex-1 justify-center items-center flex flex-col gap-y-4">
                <p className="text-blue-600 font-semibold">Title</p>

                <textarea
                    name="title"
                    className="w-3/4 rounded-xl h-10 p-2"
                    value={formData.title}
                    onChange={e => handleChange(e, 'title')}
                />
                            <p className="text-blue-600 font-semibold ">Experiment Description</p>

                    <textarea
                        name="message"
                        className="w-3/4 rounded-xl h-30 p-4"
                        value={formData.message}
                        onChange={e => handleChange(e, 'message')}
                    /> 
                     <p className="text-blue-600 flex-col font-semibold mb-0">Upload your spectral data:</p>
            <div className="flex flex-col  ">
                <ModelCreate profile={user?.profile} model={formData} />
                
            </div>
            <button type="submit" className="rounded-xl w-3/5	 align-bottom bg-yellow-300 font-semibold text-blue-600  h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                    Analize
                </button>
                </div>
            </div>
            <br />
           
        </form>
    </div>
  </div>
}




