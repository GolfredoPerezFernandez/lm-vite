import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
export const meta: MetaFunction = () => [
  { title: 'Remix Starter' },
  { name: 'description', content: 'Welcome to remix!' },
];


// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment >
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      
    </React.Fragment>
  );
}
