import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { defer, type DataFunctionArgs, MetaFunction, ActionFunction, json } from "@remix-run/node";
import { Await, useActionData, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { deferIf } from "defer-if";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { isNative, slowDown } from "~/utils/async";
import { prisma } from "~/lib/prisma.server";
import sdk from 'api';

import { Chart } from "react-google-charts";

import { nameCache } from "~/lib/cache.server";
import { authDID, createTalk } from "~/lib/d-id.server";


export const meta: MetaFunction = () => {
  return [{ title: "Model" }];
};

const fetchPlus = (url, options = {}, retries) =>
  fetch(url, options)
    .then((res:any) => {
      if (res.ok) {
        return res.json()
      }
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1)
      }
      throw new Error(res.status)
    })
    .catch(error => console.error(error.message))

export async function loader({ request, params }: DataFunctionArgs) {
  

let did=await authDID()


  let model = slowDown(async () => {
    const result = await prisma.model.findFirst({
      where: {
        id: Number(params.id),
      }
    });
    
    return result;
  
  })
  if (!isNative(request)) {
    await model;

  }


  if (!model) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }    

  const title = nameCache.get(Number(params.id)) ?? "Model";
let createtalk=await createTalk("Holaa COmo estas")

  return defer({ model,title,did,createtalk});
}

export default function ModelDetails() {

  const { model,title,did,createtalk} = useLoaderData<typeof loader>();
  console.log("dataStream "+JSON.stringify(did.dataStream))

console.log("dataConnection "+JSON.stringify(did.dataConnection))
console.log("datasdp "+JSON.stringify(did.dataStream.offer.sdp))
console.log("datasession_id "+JSON.stringify(did.dataStream.session_id))
console.log("dataid "+JSON.stringify(did.dataStream.id))
console.log("dataIceCandidate "+JSON.stringify(did.dataStream.dataIceCandidate))
console.log("talktalk "+JSON.stringify(createtalk))


  const navigate = useNavigate();
  
     

useEffect(()=>{
  async function init() {

}

init()

},[])
   const data = [
    ["Year", "Sales"],
    ["2004", 1000],
    ["2005", 1170],
    ["2006", 660],
    ["2007", 1030],
  ];
  
   const optionsReal = {
    title: "Real Part",
    curveType: "function",
    legend: { position: "bottom" },
  };
  
  const optionsImaginary = {
    title: "Imaginary Part",
    curveType: "function",
    legend: { position: "bottom" },
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({ container: containerRef });
  const range = [0, 30, 60];
  const navBackgroundColor = useTransform(scrollY, range, [
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
  ]);
 async function talk(){

    return
  }
  useEffect(() => {
    return navBackgroundColor.onChange((color) => {
      // change meta theme color
      document
        .querySelector("meta[name=theme-color]")
        ?.setAttribute("content", color);
    });
  }, [navBackgroundColor]);

  return (
    <div className="h-[100dvh] w-full flex-1 flex flex-col relative">
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
            className="text-black md:invisible grow-0 flex items-center gap-0 px-1 py-1"
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
            {title}
          </motion.h1>
        </div>
        <div></div>
      </motion.nav>

      <div className="overflow-y-auto flex-1 pb-16" ref={containerRef}>
      <motion.h1
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-2 text-3xl font-semibold block text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
        >
          {title}
        </motion.h1>
        <Suspense>
          <Await resolve={model}>
            {(model) => (
              <motion.div
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-3   w-full h-full"
              >
                 <div className="whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
                          {model.title}
                        </div>
                      <div className=" overflow-hidden text-ellipsis justify-center flex items-center ">
                       
                        <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      style={{marginRight:-10}}
      options={optionsReal}
    />
                    
                      
                        
                      </div>
                      <div className=" overflow-hidden text-ellipsis justify-center flex items-center ">
                       
                       <Chart
     chartType="LineChart"
     width="100%"
     height="100%"
     data={data}
     style={{marginRight:-10}}
     options={optionsImaginary}
   />
                   
                     
                       
                     </div>
                      <div className="text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
                          {model.message}
                        </div>
              </motion.div>
            )}
          </Await>
        </Suspense>
        <form method="POST" >
        <button type="submit" name="_action" onClick={talk}>{"create talk"}</button>
        </form>
      </div>
    </div>
  );
}