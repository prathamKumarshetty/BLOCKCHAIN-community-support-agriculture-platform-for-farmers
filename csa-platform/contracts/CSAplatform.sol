// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract CSAPlatform {
    // Struct to represent a farmer
    struct Farmer {
        address farmerAddress;
        string name;
        string location;
        uint farmSize; // in acres
        string farmingPractices;
        bool isRegistered;
    }
    
    // Struct to represent produce
    struct Produce {
        uint produceId;
        address farmerAddress;
        string name;
        string description;
        string plantingSchedule;
        string harvestingSchedule;
        string certifications;
        uint price; // Price in wei
        uint availability; // 0 for unavailable, 1 for available
    }
    
    // Struct to represent a consumer
    struct Consumer {
        address consumerAddress;
        string name;
        bool isMember;
    }
    
    // Mapping to store farmers
    mapping(address => Farmer) public farmers;
    
    // Mapping to store produce
    mapping(uint => Produce) public produce;
    uint public produceCount;
    
    // Mapping to store consumers
    mapping(address => Consumer) public consumers;
    
    // Event for farmer registration
    event FarmerRegistered(address indexed farmerAddress, string name, string location);
    
    // Event for produce listing
    event ProduceListed(uint produceId, string name, string description);
    
    // Event for produce purchase
    event ProducePurchased(uint produceId, address indexed buyer, string produceName, uint price);
    
    // Constructor to initialize the contract
    constructor() {
        // Initialize contract state
        farmers[msg.sender] = Farmer(msg.sender, "Owner", "Location", 100, "Sustainable", true);
        emit FarmerRegistered(msg.sender, "Owner", "Location");
    }

    // Function to register as a farmer
    function registerAsFarmer(string memory _name, string memory _location, uint _farmSize, string memory _farmingPractices) public {
        require(!farmers[msg.sender].isRegistered, "Already registered as a farmer");
        farmers[msg.sender] = Farmer(msg.sender, _name, _location, _farmSize, _farmingPractices, true);
        emit FarmerRegistered(msg.sender, _name, _location);
    }
    
    // Function to list produce
    function listProduce(string memory _name, string memory _description, string memory _plantingSchedule, string memory _harvestingSchedule, string memory _certifications, uint _price) public {
        require(farmers[msg.sender].isRegistered, "Only registered farmers can list produce");
        produceCount++;
        produce[produceCount] = Produce(produceCount, msg.sender, _name, _description, _plantingSchedule, _harvestingSchedule, _certifications, _price, 1);
        emit ProduceListed(produceCount, _name, _description);
    }
    
    // Function to become a CSA member
    function becomeMember(string memory _name) public {
        require(!consumers[msg.sender].isMember, "Already a member");
        consumers[msg.sender] = Consumer(msg.sender, _name, true);
    }
    
    // Function to purchase produce
    function purchaseProduce(uint _produceId) public payable {
        require(consumers[msg.sender].isMember, "Only members can purchase produce");
        Produce storage p = produce[_produceId];
        require(p.availability == 1, "Produce not available");
        require(msg.value >= p.price, "Insufficient funds to purchase produce");

        // Transfer the funds to the farmer
        address payable farmerAddress = payable(p.farmerAddress);
        farmerAddress.transfer(msg.value);

        // Mark the produce as unavailable
        p.availability = 0;

        emit ProducePurchased(_produceId, msg.sender, p.name, msg.value);
    }
    
    // Function to get produce details
    function getProduceDetails(uint _produceId) public view returns (Produce memory) {
        return produce[_produceId];
    }

    // Function to get farmer details
    function getFarmerDetails(address _farmerAddress) public view returns (Farmer memory) {
        return farmers[_farmerAddress];
    }

    // Function to get consumer details
    function getConsumerDetails(address _consumerAddress) public view returns (Consumer memory) {
        return consumers[_consumerAddress];
    }
}
