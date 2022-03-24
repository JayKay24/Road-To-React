import React, { memo } from 'react';
import { Item } from './Item';

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item} />
    ))}
  </ul>
);

const ListMemo = memo(List);

export { ListMemo as List };
