var Web3 = require('web3');

if(process.argv.length<3) {
	console.log("Usage");
	console.log(" node web3_gwalingdeploy.js NODE-ADDRESS");
	process.exit();
}

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
}
const Bootstrap=require("./bootstrap.js");
const Discovergy=require("./discovergy.js");
const fs = require("fs");

var gwalink_gwalinkContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"link","type":"address"},{"name":"delta_time","type":"uint256"},{"name":"delta_power_in","type":"uint256"},{"name":"delta_power_out","type":"uint256"}],"name":"ping","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_min_time","type":"uint256"},{"name":"_min_power","type":"uint256"},{"name":"_max_time","type":"uint256"},{"name":"_max_power","type":"uint256"},{"name":"_clearance","type":"bool"}],"name":"changeClearance","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"defaultLimits","outputs":[{"name":"min_time","type":"uint256"},{"name":"min_power","type":"uint256"},{"name":"max_time","type":"uint256"},{"name":"max_power","type":"uint256"},{"name":"definedBy","type":"address"},{"name":"valid","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"zss","outputs":[{"name":"time","type":"uint256"},{"name":"power_in","type":"uint256"},{"name":"power_out","type":"uint256"},{"name":"oracle","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"link","type":"address"},{"name":"oracle","type":"address"},{"name":"_power_in","type":"uint256"},{"name":"_power_out","type":"uint256"}],"name":"changeZS","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"link","type":"address"}],"name":"recleared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"link","type":"address"},{"indexed":false,"name":"time","type":"uint256"},{"indexed":false,"name":"power_in","type":"uint256"},{"indexed":false,"name":"power_out","type":"uint256"}],"name":"pinged","type":"event"}]);

var gwalink_gwalink = gwalink_gwalinkContract.new(
   {
     from: process.argv[2], 
     data: '0x6101206040526001606081905260808190526201518060a08190526103e860c0819052600054600160a060020a031660e08190526101008490528380556002939093556003919091556004556005805460a060020a60ff0219600160a060020a031990911690921791909116740100000000000000000000000000000000000000001790555b60008054600160a060020a03191633600160a060020a03161790555b5b6105f2806100b16000396000f300606060405236156100675763ffffffff60e060020a600035041663489f3c8881146100695780637b449206146100905780637f5e495d146100b35780638da5cb5b146101015780638f9d1cba1461012d578063e2457f5014610178578063f2fde38b146101a2575bfe5b341561007157fe5b61008e600160a060020a03600435166024356044356064356101c0565b005b341561009857fe5b61008e600435602435604435606435608435151561038b565b005b34156100bb57fe5b6100c3610438565b604080519687526020870195909552858501939093526060850191909152600160a060020a03166080840152151560a0830152519081900360c00190f35b341561010957fe5b61011161045f565b60408051600160a060020a039092168252519081900360200190f35b341561013557fe5b610149600160a060020a036004351661046e565b60408051948552602085019390935283830191909152600160a060020a03166060830152519081900360800190f35b341561018057fe5b61008e600160a060020a036004358116906024351660443560643561049e565b005b34156101aa57fe5b61008e600160a060020a036004351661058a565b005b60055460019060009060a060020a900460ff1615156101df5760006000fd5b8382600101541180156101f55750828260010154115b156102005760006000fd5b8382600301541080156102165750828260030154105b156102215760006000fd5b8154859011156102315760006000fd5b84826002015410156102435760006000fd5b50600160a060020a03851660009081526006602052604090208054151561028957600381018054600160a060020a03191633600160a060020a03161790554281556102c8565b600381015433600160a060020a039081169116148015906102bd57506000546003820154600160a060020a03908116911614155b156102c85760006000fd5b5b8054850180825560018083018054870181556002808501805488018155600160a060020a03808c1660008181526006602090815260409182902098895586549789019790975583549488019490945560038089015497018054600160a060020a03191697909216969096179055855492549054825195865293850192909252838101919091526060830191909152517fcd7805bc2cf588d932cc7a70ac9a871684418ca293a2b70c10b0b78e984b597e9181900360800190a15b505050505050565b60005433600160a060020a039081169116146103a75760006000fd5b6040805160c081018252868152602081018690529081018490526060810183905233600160a060020a03166080820181905282151560a0909201829052600187905560028690556003859055600484905560058054600160a060020a03191690911774ff0000000000000000000000000000000000000000191660a060020a9092029190911790555b5b5050505050565b600154600254600354600454600554600160a060020a0381169060a060020a900460ff1686565b600054600160a060020a031681565b600660205260009081526040902080546001820154600283015460039093015491929091600160a060020a031684565b6000805433600160a060020a039081169116146104bb5760006000fd5b50600160a060020a03848116600081815260066020908152604091829020600381018054600160a060020a031916958916959095179094554284556001840186905560028401859055815192835290517f0c270f44c8ba171dd5cf824b13626cc7966d93c6a2f1e545c6b1420ba09a89959281900390910190a1600160a060020a03808616600090815260066020526040902082548155600180840154908201556002808401549082015560038084015491018054600160a060020a031916919092161790555b5b5050505050565b60005433600160a060020a039081169116146105a65760006000fd5b60008054600160a060020a031916600160a060020a0383161790555b5b505600a165627a7a723058208cf4ea3ed91947418374dc4ecfe316220c00890527f76289316bd48d30bee5c30029', 
     gas: '4700000'
   }, function (e, contract){    
    if (typeof contract.address !== 'undefined') {	
			var deployment = JSON.parse(fs.readFileSync("../../smart_contracts/deployment_poa.json"));
			deployment.gwalink=contract.address;
			fs.writeFileSync("../../smart_contracts/deployment_poa.json",JSON.stringify(deployment));
			console.log('GWALink deyploed to',contract.address );
    }
 })