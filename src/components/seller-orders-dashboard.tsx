
import { getSellerOrders } from "@/functions/get-seller-orders";
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
import { getBuyerOrders } from "@/functions/get-buyer-orders";

export const SellerOrdersDashboard = ({ seller }: {
    seller: `0x${string}`
}) => {
    const { sellerOrders } = getSellerOrders(seller)
    const {buyerOrders} = getBuyerOrders(seller)
    return (
        <div className="space-y-10 py-5">
            <section className="space-y-2">
                <h1 className="font-semibold text-xl">Client Orders</h1>
                <Table>
                    <TableCaption>A list of clients' orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>No. of Items</TableHead>
                            <TableHead>Buyer</TableHead>
                            <TableHead>Total Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            sellerOrders ? sellerOrders.map((ele, index) => (
                                <TableRow key={Number(ele.id)}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{Number(ele.id)}</TableCell>
                                    <TableCell>{Number(ele.item.quantity)}</TableCell>
                                    <TableCell>{ele.buyer}</TableCell>
                                    <TableCell>{weiToEth(ele.totalPrice)} Eth</TableCell>
                                </TableRow>
                            )) : null
                        }
                    </TableBody>
                </Table>
            </section>
            

            <section>
                <h1 className="font-semibold text-xl">Personal Orders</h1>
                <Table>
                    <TableCaption>A list of orders you made.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>No. of Items</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Total Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            buyerOrders ? buyerOrders.map((ele, index) => (
                                <TableRow key={Number(ele.id)}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{Number(ele.id)}</TableCell>
                                    <TableCell>{Number(ele.item.quantity)}</TableCell>
                                    <TableCell>{ele.item.seller}</TableCell>
                                    <TableCell>{weiToEth(ele.totalPrice)} Eth</TableCell>
                                </TableRow>
                            )) : null
                        }
                    </TableBody>
                </Table>
            </section>
        </div>
    )
}