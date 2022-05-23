pragma solidity ^0.5.13;

contract WorkingWithVariables {
    uint256 public myUnit256;

    function setMyUint256(uint _myUint256) public {
        myUnit256 = _myUint256;
    }

    bool public myBool;

    function setMyBool(bool _myBoll) public {
        myBool = _myBoll;
    }

    uint8 public myUint8;

    function incrementUint() public {
        myUint8++;
    }

    function decrementUint() public {
        myUint8--;
    }

    address public myAddress;

    function setAddress(address _address) public {
        myAddress = _address;
    }

    function getBalanceOfAddress() public view returns(uint) {
        return myAddress.balance;
    }

    string public myString = "Hello World";

    function setMyString(string memory _myString) public {
        myString = _myString;
    }
}
