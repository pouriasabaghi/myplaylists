import Player from "@/features/player/Player";
import { useSong } from "@/features/songs/useSong";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useState } from "react";
import { CircleDownSVG } from "@/ui/Icons";
import Error from "@/ui/Error";
import SongActions from "@/features/songs/SongActions";
import { MdMoreVert } from "react-icons/md";
import { usePlayer } from "@/context/PlayerContext";

function Song() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { song, isLoading, error } = useSong(id);
  const { currentSong } = usePlayer();

  const [tab, setTab] = useState("song");

  const songToPlay = currentSong || song;

  if (error) return <Error error={error} />;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="margin-auto fixed right-0 top-0 z-50 h-[calc(100%-68px)] w-full max-w-[450px] bg-dark p-5 sm:mx-[calc((100%-450px)/2)] xl:me-3 xl:ms-0 xl:mt-3 xl:h-[calc(100%-114px)] xl:max-w-[calc(100%-264px)] xl:rounded-lg"
    >
      <div className="mb-5 flex justify-between">
        <CircleDownSVG
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex gap-x-3">
          <span
            onClick={() => setTab("song")}
            className={`cursor-pointer font-bold ${tab === "song" ? "opacity-100" : "opacity-20"}`}
          >
            Song
          </span>
          <span
            onClick={() => setTab("lyrics")}
            className={`cursor-pointer font-bold ${tab === "lyrics" ? "opacity-100" : "opacity-20"}`}
          >
            Lyrics
          </span>
        </div>

        <SongActions
          song={isLoading ? {} : songToPlay}
          trigger={<MdMoreVert className="cursor-pointer" size={25} />}
        />
      </div>
      {isLoading ? <p>Loading...</p> : <Player tab={tab} song={songToPlay} />}
    </motion.div>
  );
}

export default Song;
