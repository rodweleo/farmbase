// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrderManagement {

    // Structure for an individual item in an order, including seller information
    struct OrderItem {
        uint256 productId;
        uint256 quantity;
        uint256 price;  // Price of the product in wei
        address seller;  // Added seller address for the item
    }

    // Structure for an order
    struct Order {
        uint256 id;
        OrderItem item;  // Holds one OrderItem
        address buyer;  // Address of the buyer
        uint256 totalPrice;  // Total price of the order in wei
        OrderStatus status;
    }

    enum OrderStatus { Pending, Completed, Canceled }

    uint256 public orderCount = 0;  // To keep track of orders
    mapping(uint256 => Order) public orders;  // Map orders by ID
    mapping(address => uint256[]) public buyerOrders;  // Map buyer address to their order IDs
    mapping(address => uint256[]) public sellerOrders;  // Map seller address to their order IDs

    event OrderCreated(uint256 orderId, address buyer, uint256 totalPrice);
    event OrderCompleted(uint256 orderId, address buyer);
    event OrderCanceled(uint256 orderId, address buyer);
    event PaymentTransferred(uint256 orderId, address seller, uint256 amount);

    // Function to create a new order and transfer funds to the seller
    function createOrder(
        address _buyer, 
        uint256 _productId, 
        uint256 _quantity, 
        uint256 _price, 
        address _seller
    ) public payable {
        // Calculate total price
        uint256 totalPrice = _price * _quantity;

        // Ensure the buyer sent enough Ether to cover the total price
        require(msg.value == totalPrice, "Incorrect payment amount");

        // Create a new order
        orderCount++;
        Order storage newOrder = orders[orderCount];
        newOrder.id = orderCount;
        newOrder.buyer = _buyer;  // Store the buyer's address
        newOrder.totalPrice = totalPrice;
        newOrder.status = OrderStatus.Pending;

        // Create the order item and store it in the order
        OrderItem memory newItem = OrderItem({
            productId: _productId,
            quantity: _quantity,
            price: _price,
            seller: _seller
        });
        newOrder.item = newItem;  // Store the order item in the order

        // Transfer funds to the seller
        (bool success, ) = _seller.call{value: totalPrice}("");
        require(success, "Transfer to seller failed");

        // Emit event for payment transfer
        emit PaymentTransferred(orderCount, _seller, totalPrice);

        // Track the order for the buyer and seller
        buyerOrders[_buyer].push(orderCount);
        sellerOrders[_seller].push(orderCount);

        // Emit event for order creation
        emit OrderCreated(orderCount, _buyer, totalPrice);
    }

    // Function to complete an order
    function completeOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender, "You are not the buyer of this order");
        require(order.status == OrderStatus.Pending, "Order is not pending");

        // Mark the order as completed
        order.status = OrderStatus.Completed;

        // Emit event for order completion
        emit OrderCompleted(_orderId, order.buyer);
    }

    // Function to cancel an order
    function cancelOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender, "You are not the buyer of this order");
        require(order.status == OrderStatus.Pending, "Order cannot be canceled");

        // Mark the order as canceled
        order.status = OrderStatus.Canceled;

        // Refund the payment to the buyer
        payable(order.buyer).transfer(order.totalPrice);

        // Emit event for order cancellation
        emit OrderCanceled(_orderId, order.buyer);
    }

    // Function to get order details
    function getOrderDetails(uint256 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }

    // Function to get all orders
    function getAllOrders() public view returns (Order[] memory) {
        Order[] memory allOrders = new Order[](orderCount);
        for (uint256 i = 1; i <= orderCount; i++) {
            allOrders[i - 1] = orders[i];  // Correctly access the orders
        }
        return allOrders;
    }

    // Function to get all orders for a buyer
    function getBuyerOrders(address _buyer) public view returns (Order[] memory) {
        uint256[] memory orderIds = buyerOrders[_buyer];  // Get the list of order IDs for the buyer
        Order[] memory buyerOrderList = new Order[](orderIds.length);  // Create an array to hold the orders

        for (uint256 i = 0; i < orderIds.length; i++) {
            buyerOrderList[i] = orders[orderIds[i]];  // Retrieve the order by ID and add to the array
        }

        return buyerOrderList;  // Return the array of orders
    }

    // Function to get all orders for a seller
    function getSellerOrders(address _seller) public view returns (Order[] memory) {
        uint256[] memory orderIds = sellerOrders[_seller];  // Get the list of order IDs for the seller
        Order[] memory sellerOrderList = new Order[](orderIds.length);  // Create an array to hold the orders

        for (uint256 i = 0; i < orderIds.length; i++) {
            sellerOrderList[i] = orders[orderIds[i]];  // Retrieve the order by ID and add to the array
        }

        return sellerOrderList;  // Return the array of orders
    }
}