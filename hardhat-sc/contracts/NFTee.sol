// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTee is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("CleverNFT", "CN") {}

    function mintNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId); // this won't check is recipient is sc or user address
        // _safeMint(msg.sender, newItemId); // this will check is recipient is sc or user address
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
