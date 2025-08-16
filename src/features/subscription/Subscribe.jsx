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
      className="border border-purple-400 bg-transparent text-purple-400 hover:bg-transparent"
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
