import AddNewProduct from '../AddNewProduct/AddNewProduct';
import ProductsTable from '../ProductsTable/ProductsTable';


const Products = () => {


    return (
        <div className='w-full p-4'>
            <AddNewProduct />
            <ProductsTable />
        </div>
    );
}

export default Products;
