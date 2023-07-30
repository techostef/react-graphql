import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useMounted from "../../shared/hooks/useMounted";
import { ICollection } from "../../shared/types/collections";
import { UrlPage } from '../../shared/constants/Path';
import { getCollectionsFromLocalstorage, saveCollection } from '../../shared/utils';

export function useCollectionDetails () {
  const [collection, setCollection] = useState<ICollection>();
  const { isMounted } = useMounted();
  const router = useRouter();

  function updateName (name: string) {
    if (!collection) {
      return;
    }
    setCollection({
      ...collection,
      name
    })
  }

  function removeAnimeOnCollection (id: number) {
    if (!collection) {
      return;
    }

    const newCollections = {...collection};
    newCollections.items = newCollections.items?.reduce((total, item) => {
      if (item.id !== id) {
        total.push(item);
      }
      return total;
    }, [] as ICollection['items'])

    setCollection(newCollections);
    let lists = getCollectionsFromLocalstorage();
    lists = lists.reduce((total, item) => {
      total.push(item.id === newCollections.id ? newCollections : item);

      return total;
    }, [] as ICollection[]);

    saveCollection(lists);
  }
  
  useEffect(() => {
    if (isMounted.current && router.query.id) {
      const collections = getCollectionsFromLocalstorage();
      const findCollection = collections.find((item) => item.id === router.query.id);
      if (!findCollection) {
        router.push(UrlPage.collectionList);
        return;
      }
      
      setCollection(findCollection)
    }
  }, [isMounted.current, router.query.id]);
  

  return {
    collection,
    updateName,
    removeAnimeOnCollection
  }
}