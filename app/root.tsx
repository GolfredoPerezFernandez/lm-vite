import { json, type LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import type { DataFunctionArgs } from "@remix-run/node";
import { useRouteProgressBar } from "~/utils/useRouteProgressBar";
import "./tailwind.css"
import "./nprogress.css"
import { getUser } from "./utils/auth.server";
import { logo } from "./assets/images";
import {  useState } from "react";
import Layout from "./components/Layout";



// export const meta: V2_MetaFunction = () => [
//   {
//     name: "viewport",
//     content: "initial-scale=1, viewport-fit=cover",
//     "viewport-fit": "cover",
//   },
// ];
export async function loader({ request, params }: DataFunctionArgs) {
  const userAgent = request.headers.get("User-Agent");
  const isMobile = userAgent?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
    const user = await getUser(request)

 
  return json({ isMobile,user });
}

export default function Models() {
  const { isMobile,user } = useLoaderData<typeof loader>();
  useRouteProgressBar(!isMobile);
  const [mobileNav, setMobileNav] = useState(true);
	const toggleMobileNav = () => {
		setMobileNav(!mobileNav);
	};
  return ( <html
    lang="en"
    className="flex flex-col min-h-full overflow-x-hidden relative"
    >
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1, viewport-fit=cover, width=device-width"
        viewport-fit="cover"
      />
      <Meta />
      <Links />
    </head>
    <body className="h-[100dvh] relative">
      <Layout user={user} />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    
    </body>
  </html>
  );
}
