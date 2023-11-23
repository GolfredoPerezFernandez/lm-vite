import {
 
    useLoaderData,
  } from "@remix-run/react";
  
  import type { DataFunctionArgs } from "@remix-run/node";
  
  
  export async function loader({ request, params }: DataFunctionArgs) {
   
    return null;
  }
  
  export default function Navbar() {
  
    return (
      <div
        lang="en"
        className="flex flex-col min-h-full overflow-x-hidden relative"
      >
       
      </div>
    );
  }
  