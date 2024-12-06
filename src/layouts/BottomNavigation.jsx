import { NavLink } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { PiMusicNoteThin } from "react-icons/pi";
import { MdHome, MdQueueMusic, MdStarOutline } from "react-icons/md";

function BottomNavigation() {
  return (
    <nav className="flex justify-between w-full px-5">
      <NavLink to="/" className="flex flex-col py-3 items-center">
        <MdHome size={30} />
        <span className="mx-auto text-[10px]">Home</span>
      </NavLink>

      <NavLink to="/playlists" className="flex flex-col py-3 items-center">
        <MdQueueMusic size={30} />
        <span className="mx-auto text-[10px]">Playlists</span>
      </NavLink>

      <NavLink to="/favorites" className="flex flex-col py-3 items-center">
        <MdStarOutline size={30} />
        <span className="mx-auto text-[10px]">Favorites</span>
      </NavLink>

      <NavLink to="/top-playlists" className="flex flex-col py-3 items-center">
        <AiOutlineFire size={30} />
        <span className="mx-auto text-[10px]">Top lists</span>
      </NavLink>

      <NavLink to="/top-songs" className="flex flex-col py-3 items-center">
        <PiMusicNoteThin  size={30} />
        <span className="mx-auto text-[10px]">Top Songs</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
