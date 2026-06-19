import CardItem from "../cardItem/cardItem.jsx";
import { useState } from "react";
import ItemSearch from "../itemSearch/itemSearch";

const ItemForm = ({ items, onItemDeleted }) => {
  const [resultItems, setResultItems] = useState(items);

  const handleItemSearch = (value) => {
    console.log("a")
    setResultItems(
      items.filter((item) =>
        item.title.trim().toLowerCase().includes(value.toLowerCase()),
      )
    );
  };

  return (
    <>
      <ItemSearch onFindItem={handleItemSearch}/>
      
      <div className="d-flex justify-content-center flex-wrap">
        {resultItems.length > 0 ? (
          resultItems.map((item) => (
            <CardItem
                id={item.id}
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                discount={item.discount}
                imageUrl={item.imageUrl}
                available={item.available}
            />
          ))
        ) : (
          <h2>No se encontraron productos con ese nombre</h2>
        )}
      </div>
    </>
  );
};
export default ItemForm;