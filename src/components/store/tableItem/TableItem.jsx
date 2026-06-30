import { Button } from "react-bootstrap"
import { ChevronUp, ChevronDown } from "react-bootstrap-icons"

const TableItem = ({title, type, onSort}) => {


    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <Button 
                className='p-0 bg-transparent border-0'
                onClick={() => onSort(type, "asc")}
            >
                <ChevronUp/>
            </Button>
            {title} 
            <Button
                className='p-0 bg-transparent border-0'
                onClick={() => onSort(type, "desc")}
            >
                <ChevronDown/>
            </Button>
        </div>
    )
}

export default TableItem