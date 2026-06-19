import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import CardItem from "../cardItem/cardItem.jsx";
import ItemSearch from "../itemSearch/itemSearch.jsx";

const Products = ({items}) => {

    const [resultItems, setResultItems] = useState(items);

    const handleItemSearch = (value) => {
        setResultItems(
            items.filter((item) =>
                item.title.trim().toLowerCase().includes(value.toLowerCase()),
            )
        );
    };

    return <>
        <div className="w-100 h-100 p-4" style={{overflowY:"auto", scrollbarWidth:"none"}}>
            <ItemSearch onFindItem={handleItemSearch}/>

            <Container className="py-5">
                <Row className="g-4">
                    {resultItems.length > 0 ? 
                        (resultItems.map((item) => (
                            <Col key={item.id} xs="auto">
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
                            </Col>)))
                    :
                        (<h2>No se encontraron productos con ese nombre</h2>)
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default Products