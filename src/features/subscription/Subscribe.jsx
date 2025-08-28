import { useSubscribe } from "./useSubscribe";
import { Button } from "@/ui/button";

export default function Subscribe({ userId, isSubscribed }) {
  const { subscribe, isPending } = useSubscribe();

  const handleSubscribe = () => {
    subscribe(userId);
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isPending}
      className="border border-purple-400 bg-transparent px-3 py-1 text-xs text-purple-400 hover:bg-transparent xl:px-4 xl:text-sm"
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
