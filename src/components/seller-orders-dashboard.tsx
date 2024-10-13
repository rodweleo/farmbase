
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

export const SellerOrdersDashboard = ({ seller }: {
    seller: `0x${string}`
}) => {
    const { sellerOrders } = getSellerOrders(seller)
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent orders.</TableCaption>
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
        </div>
    )
}