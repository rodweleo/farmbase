// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    // Enum to define user roles: Buyer or Seller
    enum Role { Buyer, Seller }

    // Struct to store user details
    struct User {
        string name; // User's name
        string email; // User's email
        Role role; // User's role (buyer or seller)
        bool isRegistered; // Registration status
    }

    // Admin address (e.g., the contract deployer)
    address public admin;

    // Event to log the registration of a new user
    event UserRegistered(string name, string email, address indexed userAddress, Role role);

    // Event to log updates to user details
    event UserDetailsUpdated(address indexed userAddress, string name, string email, Role role);

    // Modifier to restrict access to only the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor to set the contract deployer as the admin
    constructor() {
        admin = msg.sender; // The address that deploys the contract becomes the admin
    }

    // Mapping to track registered users
    mapping(address => User) private users;

    // Function to register a user
    function register(string memory name, string memory email, address userAddress, Role role) external {
        require(!users[userAddress].isRegistered, "User already registered");

        // Set default values if name or email is not provided (empty string)
        string memory finalName = bytes(name).length > 0 ? name : "Unknown"; // Provide default name
        string memory finalEmail = bytes(email).length > 0 ? email : "unknown@unknown.com"; // Provide default email

        // Register the user with the provided or default values
        users[userAddress] = User(finalName, finalEmail, role, true);

        // Emit the registration event
        emit UserRegistered(finalName, finalEmail, userAddress, role);
    }

    // Function to update user details
    function updateUserDetails(string memory name, string memory email, Role role) external {
        require(users[msg.sender].isRegistered, "User not registered");

        // Update user details
        users[msg.sender].name = name;
        users[msg.sender].email = email;
        users[msg.sender].role = role;

        // Emit the update event
        emit UserDetailsUpdated(msg.sender, name, email, role);
    }

    // Function to update the user's role (admin only)
    function updateUserRole(address userAddress, Role newRole) external onlyAdmin {
        require(users[userAddress].isRegistered, "User not registered");

        // Update the user's role
        users[userAddress].role = newRole;

        // Emit the update event
        emit UserDetailsUpdated(userAddress, users[userAddress].name, users[userAddress].email, newRole);
    }

    // Function to check if a user is registered
    function isUserRegistered(address user) external view returns (bool) {
        return users[user].isRegistered;
    }

    // Function to check the role of a user
    function getUserRole(address user) external view returns (Role) {
        require(users[user].isRegistered, "User not registered");
        return users[user].role;
    }

    // Function to get user details
    function getUserDetails(address user) external view returns (string memory name, string memory email, Role role, bool isRegistered) {
        User memory userDetails = users[user];
        return (userDetails.name, userDetails.email, userDetails.role, userDetails.isRegistered);
    }
}
