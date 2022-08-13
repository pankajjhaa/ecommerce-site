import {useContext} from "react";
import {ProductContext} from "../../contexts/products.context";
import './shop.style.scss'
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {

    const products = useContext(ProductContext)

    console.log(products)
    return (
        <div className="products-container">
            {products.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Shop
