import ProductCard from './product-card';


export default function ProductList({products, className}: {
    products: any,
    className?: string
}) {
    return (
        <ul className={className}>
                {products.map((product) => (
                    <li key={product.id}><ProductCard product={product} /></li>
                ))}
            </ul>
    )
}