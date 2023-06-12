import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function User() {
    const { data: session } = useSession();
    return (
        <header className="absolute top-5 right-8">
            <div
                className="flex items-center bg-neutral-800 space-x-3 text-white
    opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            >
                <img
                    src={session?.user.image}
                    alt=""
                    className="rounded-full w-10 h-10"
                />
                <p className="ml-2">{session?.user.name}</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        </header>
    )
}

export default User