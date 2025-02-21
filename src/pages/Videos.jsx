import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Youtube from "../api/youtube";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword], // ✅ 데이터 요청 식별하는 고유한 키, keyword값이 변경될 때 마다 새로운 데이터 가져옴
    queryFn: () => {
      const youtube = new Youtube(); // FakeYoutube 객체 생성하고, search(keyword) 실행하여 데이터를 가져옴
      return youtube.search(keyword); //실제 데이터를 가져오는 함수
    },
  });

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : "🔥"} </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
