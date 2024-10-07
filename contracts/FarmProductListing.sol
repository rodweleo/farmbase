// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmProductListing {
    struct Product {
        string name;
        string description;
        uint256 price; // In wei
        address farmer;
    }

    Product[] public products;

    function addProduct(string memory _name, string memory _description, uint256 _price) public {
        products.push(Product({
            name: _name,
            description: _description,
            price: _price,
            farmer: msg.sender
        }));
    }

    function getProduct(uint256 _index) public view returns (string memory, string memory, uint256, address) {
        Product memory product = products[_index];
        return (product.name, product.description, product.price, product.farmer);
    }

    function getTotalProducts() public view returns (uint256) {
        return products.length;
    }
}
