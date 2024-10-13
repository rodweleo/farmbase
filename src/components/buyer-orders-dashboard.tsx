
import { getBuyerOrders } from "@/functions/get-buyer-orders";
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

export const BuyerOrdersDashboard = ({buyer}: {
    buyer: `0x${string}`
}) => {
    const { buyerOrders } = getBuyerOrders(buyer)
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent orders.</TableCaption>
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
        </div>
    )
}