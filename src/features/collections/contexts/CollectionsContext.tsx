import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import { ICollection } from "../../shared/types/collections";
import useMounted from "../../shared/hooks/useMounted";
import { IAnimeItem } from "../../shared/types/anime";
import {
  checkAnimeBookedOnCollection,
  handleSelectMulti,
  handleSelectSingle,
} from "../utils";
import { getCollectionsFromLocalstorage, saveCollection } from "../../shared/utils";

export type SelectedItemsType = Record<string, ICollection>;

interface ICollectionContext {
  lists: ICollection[];
  selectedItems: SelectedItemsType;
  addCollection: (name: string) => void;
  editCollection: (name: string, item: ICollection) => void;
  handleSelectItems: (item: ICollection, isMulti: boolean) => void;
  handleRemoveCollection: (item: ICollection) => void;
  addAnimeToCollections: (anime: IAnimeItem) => void;
  isAnimeInCollections: (anime: IAnimeItem) => boolean;
  resetSelection: () => void;
}

const initial: ICollectionContext = {
  lists: [],
  selectedItems: {},
  addCollection: () => {},
  editCollection: () => {},
  handleSelectItems: () => {},
  addAnimeToCollections: () => {},
  handleRemoveCollection: () => {},
  resetSelection: () => {},
  isAnimeInCollections: () => {
    return false;
  },
};

const CollectionsContext = React.createContext(initial);

export function ProviderCollections({ children }: PropsWithChildren) {
  const [lists, setLists] = useState<ICollection[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItemsType>({});
  const { isMounted } = useMounted();

  useEffect(() => {
    if (isMounted.current) {
      const collections = getCollectionsFromLocalstorage();
      setLists(collections);
    }
  }, [isMounted.current]);


  function handleSelectItems(item: ICollection, isMulti = true) {
    if (isMulti) {
      handleSelectMulti(item, selectedItems, setSelectedItems);
      return;
    }

    handleSelectSingle(item, selectedItems, setSelectedItems);
  }

  function addCollection(name: string) {
    const findIndex = lists.findIndex((item) => item.name === name);
    if (findIndex >= 0) {
      throw new Error("Name already exists");
    }
    const result = [
      ...lists,
      {
        id: v4(),
        name,
        items: [],
      },
    ];
    setLists(result);
    saveCollection(result);
  }

  function editCollection(name: string, item: ICollection) {
    const newLists = lists.reduce((total, itemCollection) => {
      let newName = itemCollection.name;
      if (itemCollection.name === item.name) {
        newName = name;
      }
      total.push({
        ...itemCollection,
        name: newName,
      });
      return total;
    }, [] as ICollection[]);

    setLists(newLists);
    saveCollection(newLists);
  }

  function addAnimeToCollections(anime: IAnimeItem) {
    const listSelected = Object.keys(selectedItems);

    const newLists = lists.map((item) => {
      const newItem = { ...item };
      if (listSelected.includes(item.name)) {
        if (!checkAnimeBookedOnCollection(anime, item.items)) {
          if (newItem.items.length === 0) {
            newItem.coverImage = anime.coverImage;
          }
          newItem.items.push(anime);
        }
      }

      return newItem;
    });

    setLists(newLists);
    resetSelection();
    saveCollection(newLists);
  }

  function handleRemoveCollection(item: ICollection) {
    const newLists = lists.reduce((total, itemCollection) => {
      if (itemCollection.name !== item.name) {
        total.push(itemCollection);
      }

      return total;
    }, [] as ICollection[]);
    setLists(newLists);
    saveCollection(newLists);
  }

  const isAnimeInCollections = useCallback(
    (anime: IAnimeItem) => {
      let isSelected = false;
      for (let i = 0; i < lists.length; i++) {
        isSelected = checkAnimeBookedOnCollection(anime, lists[i].items);
        if (isSelected) {
          break;
        }
      }

      return isSelected;
    },
    [JSON.stringify(lists)]
  );

  function resetSelection() {
    setSelectedItems({});
  }

  return (
    <CollectionsContext.Provider
      value={{
        lists,
        selectedItems,
        addCollection,
        editCollection,
        addAnimeToCollections,
        handleSelectItems,
        handleRemoveCollection,
        resetSelection,
        isAnimeInCollections,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("Please put inside ProviderCollections");
  }

  return context;
}
