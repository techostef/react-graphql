import React, { createContext, PropsWithChildren, useState, useContext } from "react";
import { IAnimeItem } from "../types/anime";

type RequiredAnimeItem = Required<IAnimeItem>;

interface IContextAnimeItem {
  anime?: RequiredAnimeItem;
  setAnime: (anime: RequiredAnimeItem) => void;
}

const initial: IContextAnimeItem = {
  anime: undefined,
  setAnime: () => {},
}

const ContextAnimeItem = createContext(initial);

export function ProviderAnimeItem ({ children }: PropsWithChildren) {
  const [anime, setAnime] = useState<RequiredAnimeItem>();
  
  function handleSetAnime(newAnime: RequiredAnimeItem) {
    setAnime(newAnime)
  }

  return (
    <ContextAnimeItem.Provider value={{
      anime,
      setAnime: handleSetAnime
    }}>
      {children}
    </ContextAnimeItem.Provider>
  )
}

export function useAnimeItem () {
  const context = useContext(ContextAnimeItem);
  if (!context) {
    throw new Error('Please put inside ProviderAnimeItem');
  }

  return context;
}