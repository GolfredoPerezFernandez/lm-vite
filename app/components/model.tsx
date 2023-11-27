import { UserCircle } from '~/components/user-circle'
import { Profile, Model as IModel } from '@prisma/client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export function Model({ profile, model }: { profile: Profile, model: Partial<IModel> }) {

    return (
        <div className={`flex ${'RED'} p-4 rounded-xl w-full gap-x-2 relative`}>
            <div>
                <UserCircle profile={profile} className="h-16 w-16" />
            </div>
            <div className="flex flex-col ">
            <p className={`${ 'WHITE'}  font-bold text-lg whitespace-pre-wrap break-all`} >{model?.title}</p>

                <p className={`${'WHITE'} font-bold whitespace-pre-wrap break-all`} >{profile.firstName} {profile.lastName}</p>
                <p className={`${'WHITE'} whitespace-pre-wrap break-all`}>{model?.message}</p>
            </div>
            <div className='  flex justify-center items-center'>
      <LineChart width={360} height={200} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
  <LineChart width={360} height={200} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
      </div>
        </div>
    )
}