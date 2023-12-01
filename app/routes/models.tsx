
 
 import CTA from '~/components/CTA';
 import { experiences, skills } from "../constants/index";
 import {
    requireUserId,
    getUser
  } from '~/lib/auth.server'
 import { json, type DataFunctionArgs, type LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import 'react-vertical-timeline-component/style.min.css';
import { SearchBar } from "~/components/search-bar";
import { Model as IModel, Profile, Prisma, Model } from '@prisma/client'
import { getOtherUsers } from '~/lib/user.server'
import { getFilteredModel, getRecentModel } from '~/lib/model.server'
import { RecentBar } from '~/components/recent-bar';
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";

import { defer } from "@remix-run/node";
import {
  Await,
  NavLink,
  Outlet,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { isNative, slowDown } from "~/utils/async";
import { nameCache } from '~/lib/cache.server';
/* 
function hydrateNames(models: Model[]) {
  for (const model of models) {
    if (model.title) {
      nameCache.set(model.id, model.id);
    }
  }
} */

async function hydrateNames(models: {
  id: number;
  title?: string; // Adjust these properties based on the actual type
  message?: string;
  createdAt?: Date;
  authorId?: number;
}[]): Promise<void> {
  for (const model of models) {
    if (model.title) {
      nameCache.set(model.id, model.id);
    }
  }
}
export const meta: MetaFunction = () => {
  return [{ title: "Models" }];
};
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
  
  
    if (typeof userId !== 'number') {
      return redirect('/')
    } 
    // Pull out our search & sort criteria
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort");
    const filter = url.searchParams.get("filter");
    let sortOptions: Prisma.ModelOrderByWithRelationInput = {}
    if (sort) {
        if (sort === 'date') {
            sortOptions = {
                createdAt: 'desc'
            }
        }
        if (sort === 'title') {
            sortOptions = {
                author: {
                    profile: {
                        firstName: 'asc'
                    }
                }
            }
        }
     
    }

    let textFilter: Prisma.ModelWhereInput = {}
    if (filter) {
        textFilter = {
            OR: [
                {
                    message: {
                        contains: filter
                    }
                },
                {
                    author: {
                        OR: [
                            { profile: { is: { firstName: {  contains: filter } } } },
                            { profile: { is: { lastName: {  contains: filter } } } },
                        ]
                    }
                },
            ]
        }
    }
    const models = slowDown(async ()=>await getFilteredModel(userId, sortOptions, textFilter))
    models.then(hydrateNames);
  

    if (!isNative(request)) {
      await models;
    }
  
     
    const user = await getUser(request);
    return defer({ user,models });
};

 export default function models() {
    const { models } = useLoaderData<typeof loader>();

    const matches = useMatches();
    const isPlaylistDetails = matches.some(
      (match) => match.id === "routes/models.$id"
    );
    const isCreateModel = matches.some(
      (match) => match.id === "routes/models.create"
    );
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
    <>
      <div
        className={clsx(
          "md:w-96 flex-grow-0 flex-shrink-0 h-[100dvh] w-full flex flex-col relative md:border-r border-gray-100",
          {
            "hidden md:flex": isPlaylistDetails,
          },
          {
            "hidden md:flex": isCreateModel,
          }
        )}
      >
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
            className="h-full grid w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-0 items-center justify-center"
            style={{
              gridTemplateColumns: "1fr 4fr 1fr",
            }}
          >
            <div />
            <motion.h1
              className="font-medium shrink-0 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 py-3 flex-1 flex justify-center "
              style={{
                opacity: useTransform(scrollY, range, [0, 0, 1]),
              }}
            >
              Models
            </motion.h1>
            <NavLink to={"/models/create"}>
            <button  className="text-black flex items-center gap-1">
              <span>New Analysis</span>
              <PlusIcon className="h-6 text-black" />
            </button></NavLink>
          </div>
        </motion.nav>

        <section className="overflow-y-auto flex-1 pb-16" ref={containerRef}>
          <motion.h1
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-2 text-3xl font-semibold block text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
          >
            Models
          </motion.h1>

          <Suspense fallback={null}>
            <Await resolve={models}>
              {(models) => (
                <motion.ul
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="divide-y divide-gray-100"
                >
                  {models.map((model,index) => (
                    <li key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          clsx(
                            "px-4 py-2  hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between",
                            { "bg-gray-50": isActive }
                          )
                        }
                        to={`/models/${model.id}`}
                      >
                        <span>{model.message}</span>
                        <ChevronRightIcon className="w-3 text-gray-400" />
                      </NavLink>
                    </li>
                  ))}
                </motion.ul>
              )}
            </Await>
          </Suspense>
        </section>
      </div>

      <Outlet />
    </>
   );
 }
 