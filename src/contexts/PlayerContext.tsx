import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    togglePlay: () => void;
    isPlaying: boolean;
    toggleLoop: () => void;
    isLooping: boolean;
    toggleShuffle: () => void;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function playNext() {
        const nextEpisodeIndex = currentEpisodeIndex + 1;
        const randomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

        if (isShuffling) {
            setCurrentEpisodeIndex(randomEpisodeIndex);
        } else {
            nextEpisodeIndex > episodeList.length - 1
                ? setCurrentEpisodeIndex(0)
                : setCurrentEpisodeIndex(nextEpisodeIndex);
        }
    }

    function playPrevious() {
        const previousEpisodeIndex = currentEpisodeIndex - 1;

        previousEpisodeIndex < 0
            ? setCurrentEpisodeIndex(episodeList.length - 1)
            : setCurrentEpisodeIndex(previousEpisodeIndex);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                setPlayingState,
                playNext,
                playPrevious,
                isPlaying,
                togglePlay,
                isLooping,
                toggleLoop,
                isShuffling,
                toggleShuffle,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => {
    return useContext(PlayerContext);
};
