// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // Events
    event CampaignCreated(uint256 campaignId, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 campaignId, address donator, uint256 amount);

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // Check that every parameter is valid
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_target > 0, "Target must be greater than 0");
        require(bytes(_title).length > 0, "Title must be provided");
        require(bytes(_description).length > 0, "Description must be provided");
        require(bytes(_image).length > 0, "Image must be provided");

        // Set the campaign properties
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;

        // Emit the CampaignCreated event
        emit CampaignCreated(numberOfCampaigns, _owner, _title, _target, _deadline);

        numberOfCampaigns++;
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_campaignId];

        // Check if the campaign deadline has passed
        require(block.timestamp < campaign.deadline, "The campaign deadline has passed");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // Emit the DonationReceived event
        emit DonationReceived(_campaignId, msg.sender, amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _campaignId) public view returns(address[] memory, uint256[] memory){
        Campaign storage campaign = campaigns[_campaignId];

        return (campaign.donators, campaign.donations);
    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint256 i = 0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
