import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { weiToEth } from "@/functions/wei-to-eth";
import Image from "next/image"
export const SellerProductList = ({ products }: {
    products: any[]
}) => {

    return (
        <div>
           
            <Table>
                <TableCaption>A list of your inventory.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products ? products.map((ele, index) => (
                            <TableRow key={Number(ele.id)}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{Number(ele.id)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Image src={ele.image} height={50} width={50} alt={ele.name} className="rounded-md" unoptimized/>
                                        {ele.name}
                                    </div>
                                </TableCell>
                                <TableCell>{ele.description}</TableCell>
                                <TableCell>{weiToEth(Number(ele.price)) } Eth</TableCell>
                                <TableCell>{Number(ele.stock) }</TableCell>
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>
        </div>
    )
}