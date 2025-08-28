import React from "react";
import useGetUserProfile from "./useGetUserProfile";
import FullPageSpinner from "@/ui/FullPageSpinner";
import PlaylistItem from "../playlist/PlaylistItem";
import myPlaylistsCover from "../../assets/img/no-cover-logo.png";
import defaultBanner from "../../assets/img/defaultBanner.jpeg";
import SongCard from "../songs/SongCard";
import ProfileInfo from "./ProfileInfo";

export default function Profile({ userId, userIdParam }) {
  const { isLoading, profile } = useGetUserProfile(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {/* banner section */}
      <div className="relative -top-10 right-0 h-40 w-full md:h-56">
        <img
          src={profile.banner ? profile.banner : defaultBanner}
          alt="user banner"
          className="h-full w-full rounded-b-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-b-2xl bg-black/50 lg:rounded-br-none" />
      </div>

      {/* user section */}
      <div className="relative left-5 -mt-[105px] flex w-full items-center gap-x-3 md:-mt-[130px]">
        <img
          src={profile.avatar ? profile.avatar : myPlaylistsCover}
          alt="user"
          className="h-24 w-24 rounded-full ring-2 ring-gray-600 md:h-32 md:w-32"
        />
      </div>

      <div className="border-b-2 border-black">
        <ProfileInfo userId={+userId} userIdParam={userIdParam} />
      </div>

      <div className="my-8">
        <h4 className="pb-5 text-2xl font-bold">Latest Songs</h4>
        <div className="mp-carousel -me-5 flex gap-x-3 overflow-auto pb-1 pe-5">
          {profile.latest_songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

      <div className="grid">
        <h4 className="pb-5 text-2xl font-bold">Playlists</h4>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {profile.latest_playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
