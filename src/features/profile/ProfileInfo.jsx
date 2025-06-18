import React from "react";
import useGetUserProfile from "./useGetUserProfile";
import FullPageSpinner from "@/ui/FullPageSpinner";
import PlaylistItem from "../playlist/PlaylistItem";
import { Link } from "react-router-dom";
import myplaylistsCover from "../../assets/img/no-cover-logo.png";
import defaultBanner from "../../assets/img/defaultBanner.jpeg";
import SongCard from "../songs/SongCard";

export default function ProfileInfo({ userId }) {
  const { isLoading, profile } = useGetUserProfile(userId);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      {/* banner section */}
      <div className="relative -top-10 right-0 h-44 w-full md:h-64">
        <img
          src={!profile.banner ? defaultBanner : profile.banner}
          alt="user banner"
          className="h-full w-full rounded-b-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-b-2xl bg-black/50 lg:rounded-br-none" />
        <Link to="/edit-profile" className="absolute inset-0">
          Add Banner
        </Link>
      </div>

      {/* user section */}
      <div className="relative left-5 -mt-[115px] flex w-full items-center gap-x-3 md:-mt-[130px]">
        <img
          src={!profile.avatar ? myplaylistsCover : profile.avatar}
          alt="user"
          className="h-24 w-24 rounded-full ring-2 ring-gray-600 md:h-32 md:w-32"
        />
        <div className="mb-7 flex flex-col gap-y-1">
          <h4 className="text-2xl font-bold capitalize">{profile.name}</h4>
          <p className="line-clamp-2 w-64 text-sm font-semibold text-gray-300 lg:w-full">
            {!profile.bio ? "" : profile.bio}
          </p>
        </div>
      </div>

      <div className="my-10">
        <h4 className="pb-5 text-2xl font-bold">Last Songs</h4>
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
