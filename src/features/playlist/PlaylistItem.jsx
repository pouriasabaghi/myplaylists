import noCoverLogo from "@/assets/img/no-cover-logo.png";
import OneLineText from "@/ui/OneLineText";
import { Link } from "react-router-dom";
import PlaylistFollowButton from "./PlaylistFollowButton";
function PlaylistItem({ playlist, className = "" }) {
  return (
    <div className={`${className} relative cursor-pointer`}>
      <Link to={`/playlists/${playlist.id}/${playlist.name}`} className="block">
        <img
          src={playlist.cover || noCoverLogo}
          alt={playlist.name}
          className="mx-auto h-40 w-full rounded-lg object-cover sm:h-44"
        />
        <OneLineText className="mt-1 max-w-40 font-bold capitalize xl:max-w-72">
          <h6>{playlist.name}</h6>
        </OneLineText>
        {playlist.total_songs ? (
          <small>Total song is {playlist.total_songs}</small>
        ) : (
          <small>No song, Click to add </small>
        )}
      </Link>
      {playlist.isOwner && (
        <>
          <div className="absolute left-2 top-2 flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-[#00000054]">
            <PlaylistFollowButton
              isFollowed={playlist.isFollowed}
              playlistId={playlist.id}
            />
          </div>

          <div className="absolute bottom-16 left-2 flex rounded-[4px] bg-[#00000054] px-2 py-1 text-sm font-bold">
            <span>{playlist.owner_name}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default PlaylistItem;
