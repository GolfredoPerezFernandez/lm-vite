import { User, Model } from '@prisma/client';
import { UserCircle } from './user-circle';

interface ModelWithRecipient extends Model {
    recipient: User
}

export function RecentBar({ models }: { kudos: ModelWithRecipient[] }) {
    return (
        <div className="w-1/5 border-l-4 border-l-yellow-300 flex flex-col items-center">
            <h2 className="text-xl text-yellow-300 font-semibold my-6">Recent Kudos</h2>
            <div className="h-full flex flex-col gap-y-10 mt-10">
                {models.map((model) =>
                    <div className="h-24 w-24 relative" key={model.author.id}>
                        <UserCircle profile={model.recipient.profile} className="w-20 h-20" />
                      
                    </div>
                )}
            </div>
        </div>
    )
}