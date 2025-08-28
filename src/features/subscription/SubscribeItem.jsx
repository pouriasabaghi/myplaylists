import { Link } from "react-router-dom";
import myPlaylistsCover from "../../assets/img/no-cover-logo.png";
import Subscribe from "./Subscribe";
import { useAuth } from "@/context/AuthContext";

export default function SubscribeItem({ sub }) {
  const { user } = useAuth();

  return (
    <div className="grid w-full grid-cols-6 items-center gap-x-3 border-b border-black py-4 last:border-b-0 xl:grid-cols-12">
      <Link
        to={`/profile/${sub.id}`}
        className={`flex w-full gap-x-3 xl:col-span-10 ${user.id !== sub.id ? "col-span-4" : "col-span-6"}`}
      >
        <img
          src={sub.avatar ? sub.avatar : myPlaylistsCover}
          alt="user-avatar"
          className="h-16 w-16 rounded-full"
        />
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="mt-1 text-lg font-semibold">{sub.name}</p>
          <p className="truncate text-sm text-gray-300">{sub.bio}</p>
        </div>
      </Link>
      <div className="col-span-2 place-self-center xl:col-span-2">
        {user.id !== sub.id && (
          <Subscribe userId={sub.id} isSubscribed={sub.is_subscribed} />
        )}
      </div>
    </div>
  );
}
