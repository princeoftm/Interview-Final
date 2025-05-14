// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PoulinaToken is ERC1155Supply, Ownable {
    uint256 public totalMinted;
    mapping(uint256 => string) tokenURIs;
    mapping(uint256 => uint256) fractionPrices;
    mapping(uint256 => uint256) maxSupplys;
    mapping(uint256 => address) creators;
    mapping(address => uint256[]) tokenAmountByUser;

    address public marketAddress;

    event CreateNFT(
        uint256 tokenId,
        string tokenURI,
        uint256 airdropAmount,
        uint256 maxSupply,
        uint256 fractionPrice,
        address creator
    );
    event Minted(uint256 tokenId, uint256 amount, address minter);

    constructor() ERC1155("Poulina") {}

    modifier exist(uint256 tokenId) {
        require(exists(tokenId) == true, "The Token does not exist");
        _;
    }

    modifier onlyMarket() {
        require(msg.sender == marketAddress, "Only marketplace can use me");
        _;
    }

    function setMarketAddress(address _newMarketAddress) external onlyOwner {
        marketAddress = _newMarketAddress;
    }

    function create(
        string memory tokenURI,
        uint256 airdropAmount,
        uint256 mxSpl,
        uint256 frcPrice
    ) external {
        require(mxSpl > 0, "Max Supply Must be bigger than 0");
        tokenURIs[++totalMinted] = tokenURI;
        fractionPrices[totalMinted] = frcPrice;
        maxSupplys[totalMinted] = mxSpl;
        creators[totalMinted] = msg.sender;
        if (airdropAmount > 0) {
            _mint(msg.sender, totalMinted, airdropAmount, "0x0000");
        }
        emit CreateNFT(
            totalMinted,
            tokenURI,
            airdropAmount,
            mxSpl,
            frcPrice,
            msg.sender
        );
    }

    function mint(uint256 tokenId, uint256 amount) external payable {
        require(exists(tokenId) == true, "The Token does not exist");
        require(amount > 0, "Minting 0 is not allowed");
        require(
            totalSupply(tokenId) + amount <= maxSupplys[tokenId],
            "Exceeds Max Supply"
        );

        uint256 price = fractionPrices[tokenId] * amount;
        if (totalSupply(tokenId) % 100000 == 0) {
            uint256 times = totalSupply(tokenId) / 100000;
            for (uint256 i = 1; i <= times; ++i) {
                price = (price * 201) / 200;
            }
        }

        require(msg.value >= price, "Insufficient funds");
        _mint(msg.sender, tokenId, amount, "0x0000");
        payable(creators[tokenId]).transfer(msg.value);
        emit Minted(tokenId, amount, msg.sender);
    }

    // -------------------- getter --------------------

    function uri(uint256 tokenId)
        public
        view
        override
        exist(tokenId)
        returns (string memory)
    {
        return tokenURIs[tokenId];
    }

    function fractionPrice(uint256 tokenId)
        external
        view
        exist(tokenId)
        returns (uint256)
    {
        return fractionPrices[tokenId];
    }

    function maxSupply(uint256 tokenId)
        external
        view
        exist(tokenId)
        returns (uint256)
    {
        return maxSupplys[tokenId];
    }

    function creator(uint256 tokenId)
        external
        view
        exist(tokenId)
        returns (address)
    {
        return creators[tokenId];
    }

    // -------------------- setter --------------------

    function setFractionPrice(uint256 tokenId, uint256 price)
        external
        exist(tokenId)
        onlyMarket
    {
        fractionPrices[tokenId] = price;
    }

    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool isOperator)
    {
        if (_operator == marketAddress) {
            return true;
        }

        return super.isApprovedForAll(_owner, _operator);
    }

    function getTokenIdByUser(address _addr)
        external
        view
        returns (uint256[] memory)
    {
        uint256 length;
        uint256 i;
        uint256[] memory tokenIds;
        for (i = 1; i <= totalMinted; ++i) {
            if (balanceOf(_addr, i) > 0 || creators[i] == _addr) {
                ++length;
            }
        }
        if (length > 0) {
            tokenIds = new uint256[](length);
            length = 0;
            for (i = 1; i <= totalMinted; ++i) {
                if (balanceOf(_addr, i) > 0 || creators[i] == _addr) {
                    tokenIds[length++] = i;
                }
            }
        }
        return tokenIds;
    }

    function exists(uint256 id) public view virtual override returns (bool) {
        return id <= totalMinted;
    }
}
