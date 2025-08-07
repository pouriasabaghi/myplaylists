import myPlaylistsCover from "../../assets/img/no-cover-logo.png";

export default function SubscribeItem({ sub }) {
  return (
    <div className="flex w-full items-start gap-x-3 border-b border-black py-4 last:border-b-0">
      <img
        src={sub.avatar ? sub.avatar : myPlaylistsCover}
        alt="user-avatar"
        className="h-16 w-16 rounded-full"
      />
      <div className="flex w-full flex-col gap-y-1 overflow-hidden">
        <p className="mt-1 text-lg font-semibold">{sub.name}</p>
        <p className="w-full max-w-full truncate text-sm text-gray-300">
          {sub.bio}
        </p>
      </div>
    </div>
  );
}
