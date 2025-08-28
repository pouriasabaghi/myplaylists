import FullPageSpinner from "@/ui/FullPageSpinner";
import useGetUserProfile from "./useGetUserProfile";
import { useAuth } from "@/context/AuthContext";
import Subscribe from "../subscription/Subscribe";
import { Link } from "react-router-dom";
import useGetSubscribers from "../subscription/useGetSubscribers";
import useGetSubscriptions from "../subscription/useGetSubscriptions";
import useIsSubscribe from "../subscription/useIsSubscribe";

export default function ProfileInfo({ userId, userIdParam }) {
  const { isLoading, profile } = useGetUserProfile(userId);
  const { isSubscribe, isLoading: isSubscribedLoading } =
    useIsSubscribe(userIdParam);
  const { user } = useAuth();

  const specificUser = userIdParam || userId;

  const { subscribers = [], isLoading: isLoadingSubscribers } =
    useGetSubscribers(specificUser);
  const { subscriptions = [], isLoading: isLoadingSubscriptions } =
    useGetSubscriptions(specificUser);

  if (
    isLoading ||
    isLoadingSubscribers ||
    isLoadingSubscriptions ||
    isSubscribedLoading
  )
    return <FullPageSpinner />;

  return (
    <div className="relative px-5 py-7">
      {user.id !== userId && (
        <div className="absolute -top-4 right-2 lg:right-5">
          <Subscribe userId={userId} isSubscribed={isSubscribe} />
        </div>
      )}
      <div className="mb-4 flex w-full flex-col gap-y-2">
        <h4 className="truncate text-xl font-bold capitalize xl:w-5/6 xl:text-2xl">
          {profile.nickname}
        </h4>
        <p className="line-clamp-2 break-words text-sm text-gray-300 lg:w-full xl:text-base">
          {profile.bio ? profile.bio : ""}
        </p>
      </div>

      <div className="flex items-center gap-x-5">
        <Link
          to={`/subscriptions/${specificUser}`}
          className="text-sm text-purple-400"
        >
          {subscriptions.length} subscriptions
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to={`/subscribers/${specificUser}`}
          className="text-sm text-purple-400"
        >
          {subscribers.length} subscribers
        </Link>
      </div>
    </div>
  );
}
