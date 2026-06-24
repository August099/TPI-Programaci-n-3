import PriceSlider from "./priceSlider"
import { Button, Container, Form } from "react-bootstrap"
import { useState, useEffect } from "react"

const ItemsFilter = ({
    priceRange,
    categories,
    onSetFilters
}) => {
    const [priceRangeValue, setPriceRangeValue] = useState(priceRange)
    const [onOffer, setOnOffer] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(() => {
        setPriceRangeValue(priceRange)
        setOnOffer(false)
        setSelectedCategories([])
    }, [priceRange])

    const handlerChangePriceRange = (values) => {
        setPriceRangeValue(values)
    }

    const handleOnOffer = (value) => {
        setOnOffer(value)
    }

    const handleSelectedCategories = (check, category) => {
        if (check) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        }
    }

    const handleSetFilters = () => {
        onSetFilters(
            priceRangeValue,
            onOffer,
            selectedCategories
        )
    }

    return <>
    <Container className="w-100 sticky-top d-flex flex-column align-items-center rounded-3 p-3" style={{backgroundColor: "var(--secondary)"}}>
        <h3>Filtros</h3>

        <PriceSlider priceRange={priceRange} values={priceRangeValue} onChangeValue={handlerChangePriceRange}/>

        <div className="w-100 d-flex justify-content-between mt-3">
            <label><b>En oferta</b></label>
            <Form.Check checked={onOffer} onChange={(event) => handleOnOffer(event.target.checked)}/>
        </div>

        <div className="w-100 d-flex flex-column mt-3">
            <label><b>Categorias</b></label>
            
            {categories.map((c) => (
                <div key={c.id} className="w-100 d-flex justify-content-between mt-1">
                    <label className="ms-2">{c.name}</label>
                    <Form.Check
                        checked={selectedCategories.includes(c.id)}
                        onChange={(event) => {
                            handleSelectedCategories(event.target.checked, c.id)
                        }
                    }/>
                </div>
            ))}
            
            
        </div>

        <Button
            className="mt-4"
            onClick={handleSetFilters}
        >
            Aplicar filtros
        </Button>
        
    </Container>
    </>
}

export default ItemsFilter