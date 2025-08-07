import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetUserProfile from "./useGetUserProfile";
import { useAuth } from "@/context/AuthContext";
import Subscribe from "../subscription/Subscribe";
import useGetSubscribers from "../subscription/useGetSubscribers";
import useGetSubscriptions from "../subscription/useGetSubscriptions";
import { Link } from "react-router-dom";

export default function ProfileInfo({ userId, userIdParam }) {
  const { isLoading, profile } = useGetUserProfile(userId);
  const { user } = useAuth();

  const { subscribers = [], isLoading: isLoadingGetSubscribers } =
    useGetSubscribers();
  const { subscriptions = [], isLoading: isLoadingGetSubscriptions } =
    useGetSubscriptions();

  if (isLoading && isLoadingGetSubscribers && isLoadingGetSubscriptions)
    return <FullPageSpinner />;

  return (
    <div className="relative p-5">
      {user.id !== userId && (
        <div className="absolute right-2 top-0 lg:right-5">
          <Subscribe userId={userId} userIdParam={userIdParam} />
        </div>
      )}
      <div className="mb-3 flex w-full flex-col gap-y-1">
        <h4 className="w-2/3 truncate text-2xl font-bold capitalize xl:w-5/6">
          {profile.name}
        </h4>
        <p className="line-clamp-3 break-words text-sm font-semibold text-gray-300 lg:w-full">
          {profile.bio ? profile.bio : ""}
        </p>
      </div>
      {user.id === userId && (
        <div className="flex items-center gap-x-5">
          <Link to={"/subscriptions"} className="text-sm text-purple-500">
            {subscriptions.length} subscriptions
          </Link>
          <span className="text-gray-300">|</span>
          <Link to={"/subscribers"} className="text-sm text-purple-500">
            {subscribers.length} subscribers
          </Link>
        </div>
      )}
    </div>
  );
}
