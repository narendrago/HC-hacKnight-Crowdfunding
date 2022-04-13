// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;
contract fundraiser {
    string[] public fundraiserlist;
    string[] public transferlist;
    struct fund{
        uint256 target;
        uint256 collected;
        bool b;
    }
    mapping (string => fund) public traverse;
    function createfundraiser(string memory hash,uint target) public {
        uint256 val=0;
        traverse[hash]=(fund(target,val,false));
        fundraiserlist.push(hash);
    }
    function transfer(string memory hash) public {
        transferlist.push(hash);
    }

    function getall() view public returns(string[] memory){
        return fundraiserlist;
    }
    function getfund() view public returns(string[] memory){
        return transferlist;
    }
}