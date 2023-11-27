import { Profile } from '@prisma/client';

interface props {
    profile: Profile,
    className?: string,
    onClick?: (...args: any) => any
}

export function UserCircleCreate({  onClick, className }: props) {
    return (
        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            onClick={onClick}
          
        >
           
              <h2> {"+".charAt(0).toUpperCase()}</h2>
             
           
        </div>
    )
}