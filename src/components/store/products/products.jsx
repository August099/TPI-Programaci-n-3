import { Container, Row, Col, Pagination, DropdownButton, Dropdown} from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { getItems, getCategories, getItemsByCategories } from "../store.services.js";
import { apllyDiscount } from "../store.helpers.js";
import CardItem from "../cardItem/cardItem.jsx";
import ItemSearch from "../itemSearch/itemSearch.jsx";
import ItemsFilter from "../itemsFilter/itemsFilter.jsx";

const Products = () => {
    const itemsPerPage = 16

    const getPriceRange = (items) => {
        if (!items.length) return [0,0]

        const prices = items.map((item) => apllyDiscount(item))
        
        return [Math.min(...prices), Math.max(...prices)]
    }

    
    const [page, setPage] = useState(1)
    const [itemsToShow, setItemsToShow] = useState(itemsPerPage)
    const [sortBy, setSortBy] = useState("name")

    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])
    const [priceRange, setPriceRange] = useState(getPriceRange([]))
    const [searchItems, setSearchItems] = useState([])
    const [resultItems, setResultItems] = useState([])
    
    const [onOffer, setOnOffer] = useState(false)

    const scrollRef = useRef(null)

    const pagesCount = Math.ceil(resultItems.length / itemsPerPage)

    const sortResults = (itemsList, sortType) => {
        const sorted = [...itemsList]
        switch (sortType) {
            case "name":
                sorted.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "priceAsc":
                sorted.sort((a, b) => apllyDiscount(b) - apllyDiscount(a))
                break
            case "priceDesc":
                sorted.sort((a, b) => apllyDiscount(a) - apllyDiscount(b))
                break
            case "discount":
                sorted.sort((a, b) => b.discount - a.discount)
                break
        }

        return sorted
    }

    const changePage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber === page || pageNumber > pagesCount) return
        setPage(pageNumber)
        setItemsToShow(pageNumber * itemsPerPage)
        scrollRef.current.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
        getItems(
            (data) => {
                setItems(data)
                setSearchItems(data)
            },
            (err) => console.log(err)
        )

        getCategories(
            (data) => {
                setCategories(data)
            },
            (err) => console.log(err)
        )
    }, [])

    useEffect(() => {
        setResultItems(sortResults(searchItems, sortBy))
        setPriceRange(getPriceRange(searchItems))
        changePage(1)
    }, [searchItems])

    useEffect(() => {
        setResultItems(sortResults(resultItems, sortBy))
    }, [sortBy])

    const handleItemSearch = (value) => {
        setSearchItems(
            items.filter((item) =>
                item.name.trim().toLowerCase().includes(value.toLowerCase()),
            )
        );
    };

    const handleSort = (orderType) => {
        setSortBy(orderType)
    }

    const handleSetFilters = (priceRange, onOffer, categories) => {
        const filtered = 
            searchItems.filter(
                (item) => {
                    console.log(item)
                    if (
                        apllyDiscount(item) >= priceRange[0] &&
                        apllyDiscount(item) <= priceRange[1] &&
                        (!onOffer || item.discount > 0) &&
                        (categories.length === 0 || item.categories?.some(ic => categories.includes(ic.id)))
                    ) {
                        return true
                    }
                    return false
                }
            )
        
        setResultItems(sortResults(filtered, sortBy))
        changePage(1)
    }

    const handleChangePage = (pageNumber) => {
        changePage(pageNumber)
    }

    return <>
        <div ref={scrollRef} className="w-100 h-100 p-4" style={{overflowY:"auto", scrollbarWidth:"none"}}>
            <Row>
                <Col xs="2">
                    <ItemsFilter
                        priceRange={priceRange}
                        categories={categories}
                        onSetFilters={handleSetFilters}
                    />
                </Col>
                <Col xs="10">
                    <Container className="w-100 d-flex flex-column align-items-center">
                        <div className="w-100 d-flex align-items-center gap-2">
                            <ItemSearch className="w-100 my-3" onFindItem={handleItemSearch}/>
                            <DropdownButton title="Ordenar por">
                                <Dropdown.Item onClick={() => handleSort("name")}>Nombre</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("priceDesc")}>Menor precio</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("priceAsc")}>Mayor precio</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("discount")}>Descuento</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        
                        <Row className="w-100 g-4">
                            {resultItems.length > 0 ? 
                                (resultItems.slice(itemsToShow - itemsPerPage, itemsToShow).map((item) => (
                                    <Col key={item.id} xs="4" lg="3">
                                        <CardItem
                                            key={item.id}
                                            item={item}
                                        />
                                    </Col>)))
                            :
                                (<h2>No se encontraron productos.</h2>)
                            }
                        </Row>
                        
                        <Pagination className="mt-4">
                            <Pagination.First onClick={() => {handleChangePage(1)}}/>
                            <Pagination.Prev onClick={() => {handleChangePage(page-1)}}/>
                            {Array.from({ length: pagesCount }, (_, i) => i).map((n) => (
                                <Pagination.Item
                                    key={n}
                                    active={n+1  === page}
                                    onClick={() => {handleChangePage(n+1)}}
                                >{n+1}</Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => {handleChangePage(page+1)}}/>
                            <Pagination.Last onClick={() => {handleChangePage(pagesCount)}}/>
                        </Pagination>
                    </Container>
                </Col>
            </Row>
        </div>
    </>
}

export default Products