import { useSubscribe } from "./useSubscribe";
import useIsSubscribe from "./useIsSubscribe";
import { Button } from "@/ui/button";

export default function Subscribe({ userId, userIdParam }) {
  const { subscribe, isPending } = useSubscribe();
  const { isSubscribe, isLoading } = useIsSubscribe(userIdParam);

  const handleSubscribe = () => {
    subscribe(userId);
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isPending || isLoading}
      className="border border-purple-400 bg-transparent text-purple-400 hover:bg-transparent"
    >
      {isSubscribe ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
