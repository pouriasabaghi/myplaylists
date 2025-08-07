import { DialogHeader, Dialog, DialogContent, DialogFooter } from "@/ui/dialog";
import { usePlaylists } from "../playlist/usePlaylists";
import useAddSongToPlaylist from "../playlist/useAddSongToPlaylist";
import OneLineText from "@/ui/OneLineText";
import noCoverLogo from "@/assets/img/no-cover-logo.png";
import { copyToClipboard } from "@/utils/utli";
import { Link } from "react-router-dom";
import { useDeleteSong } from "./useDeleteSong";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/ui/button";
import CreatePlayListForm from "../playlist/CreatePlayListForm";
import { Skeleton } from "@/ui/skeleton";
import useRemoveFromPlaylist from "../playlist/useRemoveFromPlaylist";
import { DeleteSVG, EditSVG, RemoveListSVG, ShareSVG } from "@/ui/Icons";
import FavoriteButton from "../favorites/FavoriteButton";

function SongActions({ song, trigger, playlist }) {
  const { playlists, isLoading } = usePlaylists();
  const { addSongToPlaylist, isPending } = useAddSongToPlaylist();
  const { deleteSong } = useDeleteSong();
  const { removeFromPlaylist, isPendingPlaylistRemove } =
    useRemoveFromPlaylist();

  const [deleteSongAlertOpen, setDeleteSongAlertOpen] = useState(false);
  const [actionsAlertOpen, setActionsAlertOpen] = useState(false);

  const editLink = `/songs/edit/${song.id}`;
  const shareLink = `🎵 Song:\n${song.name}\n\n🎧 Listen:\n${window.location.origin}/songs/share/${song.id}\n\n🟣 Join Channel:\n t.me/myplaylists_ir`;

  function handleAddSong(playlistId) {
    if (song)
      addSongToPlaylist({
        playlistId,
        songId: song.id,
      });

    setActionsAlertOpen(false);
  }
  function handleDelete(id) {
    deleteSong({ id, playlist });
    setDeleteSongAlertOpen(false);
    setActionsAlertOpen(false);
  }
  function handleRemoveFromPlaylist(songId) {
    if (isPendingPlaylistRemove) return;
    removeFromPlaylist({ playlistId: playlist.id, songId });
    setActionsAlertOpen(false);
  }

  return (
    <>
      <Dialog open={actionsAlertOpen} onOpenChange={setActionsAlertOpen}>
        <div onClick={() => setActionsAlertOpen(true)}>{trigger}</div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex gap-x-2">
                <img
                  className="h-[45px] w-[45px] rounded-sm object-cover"
                  src={song.cover || noCoverLogo}
                  alt={song.name}
                  width={45}
                  height={45}
                />
                <div className="flex flex-col items-start gap-y-1">
                  <OneLineText>
                    <span className="max-w-64 text-sm font-bold md:max-w-80">
                      {song.name}
                    </span>
                  </OneLineText>
                  <OneLineText>
                    <span className="max-w-64 text-sm md:max-w-80">
                      {song.artist}
                    </span>
                  </OneLineText>
                </div>
              </div>
              <div className="!mt-6 flex justify-between">
                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => {
                    copyToClipboard(shareLink);
                    setActionsAlertOpen(false);
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <ShareSVG size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Share</span>
                </div>

                <Link to={editLink} className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <EditSVG size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Edit</span>
                </Link>

                <div className="flex cursor-pointer flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <FavoriteButton song={song} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Favorite</span>
                </div>

                <div
                  className="flex cursor-pointer flex-col items-center"
                  onClick={() => setDeleteSongAlertOpen(true)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                    <DeleteSVG size={25} />
                  </div>
                  <span className="mt-2 text-xs font-bold">Delete</span>
                </div>

                {playlist && (
                  <div
                    className="flex cursor-pointer flex-col items-center"
                    onClick={() => handleRemoveFromPlaylist(song.id)}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white p-1">
                      <RemoveListSVG size={25} />
                    </div>
                    <span className="mt-2 text-xs font-bold">Remove</span>
                  </div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <hr />

          <div className="flex justify-between">
            <h6 className="font-bold">Add To Playlist</h6>
            <CreatePlayListForm />
          </div>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-6"></Skeleton>
            ))
          ) : (
            <ul className="max-h-[30vh] overflow-y-scroll">
              {playlists?.map((playlist) => (
                <li
                  disabled={isPending}
                  className="cursor-pointer py-2"
                  onClick={() => handleAddSong(playlist.id)}
                  key={playlist.id}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteSongAlertOpen} onOpenChange={setDeleteSongAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="mt-3 md:mt-0"
              variant="outline"
              onClick={() => setDeleteSongAlertOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleDelete(song.id)}>Yes, Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SongActions;
