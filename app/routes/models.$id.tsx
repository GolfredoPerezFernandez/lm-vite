import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { DataFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, useNavigate } from "@remix-run/react";
import { deferIf } from "defer-if";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { isNative, slowDown } from "~/utils/async";
import { prisma } from "~/utils/prisma.server";


export async function loader({ request, params }: DataFunctionArgs) {
  let model = slowDown(async () => {
    const result = await prisma.model.findFirst({
      where: {
        id: String(params.id),
      }
    });
    if (!result) {
      throw "Not found";
    }
    return result;
  });


  return deferIf({ model }, isNative(request));
}
export default function ModelDetails() {
  const { model } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

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
            {"My Models 1"}
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
        {"My Models 2"}
        </motion.h1>
        <Suspense>
          <Await resolve={model}>
            {(model) => (
              <motion.div
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-3"
              >
                      <div className="overflow-hidden text-ellipsis ">
                        <div className="whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
                          {model.title}
                        </div>
                        <div className="text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden min-w-0">
                          {model.message}
                        </div>
                      </div>
              </motion.div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}