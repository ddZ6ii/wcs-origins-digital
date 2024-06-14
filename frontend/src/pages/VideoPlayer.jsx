import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
} from "react-share";

import Button from "../components/common/Button";
import Label from "../components/common/Label";
import Like from "../assets/icon/utility/like.svg";
import Liked from "../assets/icon/utility/like_red.svg";
import Loader from "../components/common/Loader";
import Player from "../components/player/Player";
import Share from "../assets/icon/utility/share.svg";

import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

import * as Favorites from "../services/favorites";
import isEmpty from "../utils/isEmpty";
import formatTags from "../utils/formatTags";

import TOAST_DEFAULT_CONFIG from "../settings/toastify.json";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function VideoPlayer() {
  const [isFav, setIsFav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const { account } = useAuth();
  const {
    data: [video],
    isLoading: isVideoLoading,
  } = useAxios(`/videos/${id}`);

  const shareUrl = `${BASE_URL}/videos/${id}`;

  const tags = useMemo(() => formatTags(video), [video]);

  const handleFavorite = async () => {
    const data = {
      user_id: Number(account.id_user),
      video_id: Number(id),
    };
    try {
      if (isFav) await Favorites.deleteFav({ data });
      else await Favorites.postFav(data);
      setIsFav(!isFav);
    } catch (err) {
      console.error(err);
      toast.error(
        "An error occurred while favoriting/unfavoriting the video!",
        TOAST_DEFAULT_CONFIG
      );
    }
  };

  useEffect(() => {
    if (account.id_user !== undefined) {
      Favorites.getOneFav(account.id_user, id).then((res) => {
        setIsFav(Boolean(res?.is_favorite));
      });
    }
  }, [account]);

  if (isVideoLoading) return <Loader />;

  if (!isVideoLoading && isEmpty(video))
    return <p className="my-4 text-center">No video found!</p>;

  return (
    <section className="head-infos flex flex-col justify-between md:gap-8">
      <Player video={video} />

      <div className="flex justify-between">
        <div className="fps-language flex gap-4 md:gap-6">
          {tags.map((tag) => (
            <Label
              key={tag.id}
              htmlFor={tag.name}
              className="rounded-2xl bg-primaryLightest px-4 py-1 font-bold"
              title={tag.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {account.id_user !== undefined && (
            <Button type="button" onClick={handleFavorite}>
              <img src={isFav ? Liked : Like} alt="like_red button" />
            </Button>
          )}

          <Button type="button" onClick={() => setIsOpen((prev) => !prev)}>
            <img src={Share} alt="share button" />
          </Button>

          {isOpen && (
            <div className="absolute z-10 mb-56 ml-8 rounded-lg bg-neutralLightest">
              <div className="flex flex-col gap-2 px-2 py-2">
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={35} round />
                </TwitterShareButton>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={35} round />
                </FacebookShareButton>
                <FacebookMessengerShareButton url={shareUrl}>
                  <FacebookMessengerIcon size={35} round />
                </FacebookMessengerShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={35} round />
                </WhatsappShareButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <h1>{video.title}</h1>

      <p className="text-justify">{video.description}</p>
    </section>
  );
}
