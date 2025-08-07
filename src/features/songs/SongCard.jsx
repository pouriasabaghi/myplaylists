import { usePlayer } from "@/context/PlayerContext";
import { usePlayerController } from "@/context/PlayerControllerContext";
import { useNavigate } from "react-router-dom";
import noCoverLogo from "@/assets/img/no-cover-logo.png";
import OneLineText from "@/ui/OneLineText";

function SongCard({ song }) {
  const navigate = useNavigate();

  const { currentSong } = usePlayer();
  const { play } = usePlayerController();

  function handlePlayer(song) {
    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      navigate(`/songs/${song.id}`);
    }
  }

  return (
    <div
      onClick={() => handlePlayer(song)}
      className="flex max-w-40 flex-shrink-0 cursor-pointer flex-col"
    >
      <img
        className="h-40 w-40 rounded-lg object-cover"
        src={song.cover || noCoverLogo}
        alt={song.name}
      />
      <OneLineText>
        <span
          className={`mb-1 mt-3 text-sm font-bold ${currentSong?.id === song.id ? "text-purple-500" : "text-white"}`}
        >
          {song.name}
        </span>
      </OneLineText>
      <OneLineText>
        <span className="text-xs text-gray-400">{song.artist}</span>
      </OneLineText>
    </div>
  );
}

export default SongCard;
