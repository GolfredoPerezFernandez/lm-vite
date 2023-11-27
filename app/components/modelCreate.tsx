import { UserCircle } from '~/components/user-circle'
import { Profile, Model as IModel } from '@prisma/client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export function ModelCreate({ profile, model }: { profile: Profile, model: Partial<IModel> }) {

    return (
        <div className={`flex flex-col   rounded-xl w-3/4  `}>
            
      <LineChart width={300} height={200} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
        </div>
    )
}