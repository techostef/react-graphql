import { IAnimeItem } from '../../shared/types/anime';
import { SelectedItemsType } from './../contexts/CollectionsContext';
import { ICollection } from "../../shared/types/collections";

export function handleSelectSingle(item: ICollection, selectedItems: SelectedItemsType, setSelectedItems: (item: SelectedItemsType) => void) {
  const { name } = item;
  const tempSelectedItems = { ...selectedItems };

  const nameIsExists = !!tempSelectedItems[name];
  if (nameIsExists) {
    const { [name]: _, ...restSelectedItems } = tempSelectedItems;
    setSelectedItems(restSelectedItems);
    return;
  } 
  
  setSelectedItems({
    [name]: item
  });
}

export function handleSelectMulti(item: ICollection, selectedItems: SelectedItemsType, setSelectedItems: (item: SelectedItemsType) => void) {
  const { name } = item;
  const tempSelectedItems = { ...selectedItems };
  const nameIsExists = !!tempSelectedItems[name];
  if (nameIsExists) {
    const { [name]: _, ...restSelectedItems } = tempSelectedItems;
    setSelectedItems(restSelectedItems);
    return;
  } 
  
  tempSelectedItems[name] = item;
  setSelectedItems(tempSelectedItems);
}

export function checkAnimeBookedOnCollection (anime: IAnimeItem, items: ICollection['items']) {
  let isSelected = false;
  for(let j = 0; j < items.length; j ++) {
    const item = items[j];
    if (anime.id === item.id) {
      isSelected = true;
      break;
    }
  }

  return isSelected;
}