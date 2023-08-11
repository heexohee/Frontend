import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export type SongListType = {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    id: number;
    songNum: string;
    songTitle: string;
    thumbnail: string;
};

export type ChooseSongListType = {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    // id: number;
    songNum: string;
    songTitle: string;
    thumbnail: string;
};

const SearchSong: React.FC = () => {
    const [searchSong, setSearchSong] = useState<string>("");
    const [songList, setSongList] = useState<Array<SongListType>>([]);
    const [chooseSongList, setChooseSongList] = useState<Array<ChooseSongListType>>([]);

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSong(event.target.value);
    };
    console.log("searchSong", searchSong);

    const searchSongHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://43.201.22.74/api/search?keyword=${searchSong}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log("성공", response);
            setSongList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToChooseSongList = (item: SongListType) => {
        setChooseSongList((prevList) => [...prevList, item]);
    };

    const removeFromChooseSongList = (song: ChooseSongListType) => {
        const updatedList = chooseSongList.filter((item) => item.songNum !== song.songNum);
        setChooseSongList(updatedList);
    };

    console.log("songlist", songList);
    console.log("chooseSongList", chooseSongList);

    useEffect(() => {
        localStorage.setItem("songs", JSON.stringify(chooseSongList));
    }, [chooseSongList]);

    return (
        <>
            <form onSubmit={searchSongHandler}>
                <input
                    onChange={changeInputHandler}
                    value={searchSong}
                />
                <button>검색</button>
            </form>
            <StContainer>
                {songList.map((item) => (
                    <StSongList
                        key={item.songNum}
                        onClick={() => {
                            addToChooseSongList(item);
                        }}
                    >
                        <img
                            src={item.thumbnail}
                            alt={`Thumbnail for ${item.songTitle}`}
                        />
                        <div>
                            <h3>{item.songTitle}</h3>
                            <p>{item.artistName}</p>
                        </div>
                    </StSongList>
                ))}
            </StContainer>
            <StChooseSongListContainer>
                {chooseSongList.map((song) => (
                    <StChooseSongLists key={song.songNum}>
                        <h3>{song.songTitle}</h3>
                        <div>{song.artistName}</div>
                        <button onClick={() => removeFromChooseSongList(song)}>삭제</button>
                    </StChooseSongLists>
                ))}
            </StChooseSongListContainer>
        </>
    );
};

// 해야될일
// 중복처리
// 10개까지만
// 글자 수 줄이기

export default SearchSong;

const StContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 316px;
`;
const StSongList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
        width: 56px;
        height: 56px;
    }
`;

const StChooseSongListContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 200px;
`;

const StChooseSongLists = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;