// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmProductListing {
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price; // In wei
        address farmer;
        uint256 stock;
        string image;
    }

    struct OrderItem {
        uint256 productId;  // The product ID
        uint256 quantity;   // Quantity of this product in the order
    }

    struct Order {
        uint256 id;
        OrderItem[] items;  // Array of products and their quantities
        address buyer;
        uint256 totalPrice;
    }


    mapping(uint256 => Product) public products; // Mapping for storing products by ID
    mapping(address => uint256[]) public farmerProducts; // Mapping for storing farmer's products
    uint256 public productCount; // Track total number of products
    uint256 public orderCount;

    // Owner access control
    address public owner;

    constructor() {
        owner = msg.sender; // Initialize contract owner as the deployer
    }

    // Events
    event ProductAdded(uint256 id, string name, address farmer);
    event ProductUpdated(uint256 id, string name, address farmer);

    // Modifier to restrict function access to the owner or the product's farmer
    modifier onlyOwnerOrFarmer(uint256 _id) {
        require(
            msg.sender == owner || msg.sender == products[_id].farmer,
            "Access denied: Only owner or product farmer can perform this action"
        );
        _;
    }

    // Modifier to check valid product ID
    modifier validProductId(uint256 _id) {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        _;
    }

    // Add a new product with proper input validation
    function addProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _stock,
        string memory _image
    ) public {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(
            bytes(_description).length > 0,
            "Product description cannot be empty"
        );
        require(_price > 0, "Price must be greater than 0");
        require(_stock >= 0, "Stock must be a non-negative number");
        require(bytes(_image).length > 0, "Product image URL cannot be empty");

        productCount++; // Increment product count to get a unique ID
        products[productCount] = Product({
            id: productCount,
            name: _name,
            description: _description,
            price: _price,
            farmer: msg.sender,
            stock: _stock,
            image: _image
        });
        farmerProducts[msg.sender].push(productCount); // Link product to farmer

        emit ProductAdded(productCount, _name, msg.sender); // Emit event
    }

    // **New function**: Update product details with proper access control and validation
    function updateProduct(
        uint256 _id,
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _stock,
        string memory _image
    ) public validProductId(_id) onlyOwnerOrFarmer(_id) {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(
            bytes(_description).length > 0,
            "Product description cannot be empty"
        );
        require(_price > 0, "Price must be greater than 0");
        require(_stock >= 0, "Stock must be a non-negative number");
        require(bytes(_image).length > 0, "Product image URL cannot be empty");

        Product storage product = products[_id];
        product.name = _name;
        product.description = _description;
        product.price = _price;
        product.stock = _stock;
        product.image = _image;

        emit ProductUpdated(_id, _name, product.farmer); // Emit event
    }

    // Get product details by ID
    function getProductById(uint256 _id) public view returns (Product memory) {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        return products[_id];
    }

    // Gas-optimized: Fetch product name by ID
    function getProductName(uint256 _id)
        public
        view
        validProductId(_id)
        returns (string memory)
    {
        return products[_id].name;
    }

    // Gas-optimized: Fetch product description by ID
    function getProductDescription(uint256 _id)
        public
        view
        validProductId(_id)
        returns (string memory)
    {
        return products[_id].description;
    }

    // Gas-optimized: Fetch product price by ID
    function getProductPrice(uint256 _id)
        public
        view
        validProductId(_id)
        returns (uint256)
    {
        return products[_id].price;
    }

    // Gas-optimized: Fetch product farmer address by ID
    function getProductFarmer(uint256 _id)
        public
        view
        validProductId(_id)
        returns (address)
    {
        return products[_id].farmer;
    }

    // Gas-optimized: Fetch product stock by ID
    function getProductStock(uint256 _id)
        public
        view
        validProductId(_id)
        returns (uint256)
    {
        return products[_id].stock;
    }

    // Gas-optimized: Fetch product image by ID
    function getProductImage(uint256 _id)
        public
        view
        validProductId(_id)
        returns (string memory)
    {
        return products[_id].image;
    }

    // **New function**: Fetch all product IDs
    function getAllProductIds() public view returns (uint256[] memory) {
        uint256[] memory productIds = new uint256[](productCount);
        for (uint256 i = 1; i <= productCount; i++) {
            productIds[i - 1] = i;
        }
        return productIds;
    }

    // Fetch products of a given farmer (returns an array of Product structs)
    function getProductsByFarmer(address _farmer)
        public
        view
        returns (Product[] memory)
    {
        require(_farmer != address(0), "Invalid farmer address");
        uint256[] memory productIds = farmerProducts[_farmer];
        Product[] memory farmerProductList = new Product[](productIds.length);

        for (uint256 i = 0; i < productIds.length; i++) {
            farmerProductList[i] = products[productIds[i]];
        }

        return farmerProductList;
    }

    // **New function**: Fetch all products (returns an array of Product structs)
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for (uint256 i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }
        return allProducts;
    }

    // Get total number of products
    function getTotalProducts() public view returns (uint256) {
        return productCount;
    }

    // Get total number of orders
    function getTotalOrders() public view returns (uint256) {
        return orderCount;
    }

    // Prevent accidental Ether transfers
    receive() external payable {
        revert("This contract does not accept payments");
    }
}
