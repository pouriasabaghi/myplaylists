import { getPlaylistSongsById } from "@/services/apiPlaylists";
import { useQuery } from "@tanstack/react-query";

export const usePlaylistSongs = (id) => {
  const { data: songs, isLoading, error } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylistSongsById(id),
  });

  return { songs, isLoading, error };
};
