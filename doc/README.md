# 井通科技

## jingtum-lib接口说明
V2.0.2

## 版本历史
|版本|简介|作者|日期|
|-----|--------|-----------|-------------|
|1.0.0|初版主要接口说明|吴丹|2018/2/28|
|2.0.0|整体接口说明|吴丹|2018/3/2|
|2.0.1|Remote类增加返回结果说明|吴丹|2018/3/15|
|2.0.2|Remote类增加合约方法|吴丹|2018/5/31|

## 目录
1. [安装](#installation)
2. [项目文件结构](#structure)
3. [创建钱包](#wallet)
4. [REMOTE类](#remote)
> #### 4.1 [创建Remote对象](#remoteCreate)
> #### 4.2 [创建连接](#remoteConnect)
> #### 4.3 [断开连接](#remoteDisconnect)
> #### 4.4 [请求底层服务器信息](#requestServerInfo)
> #### 4.5 [获取最新账本信息](#requestLedgerClosed)
> #### 4.6 [获取某一账本具体信息](#requestLedger)
> #### 4.7 [查询某一交易具体信息](#requestTx)
> #### 4.8 [请求账号信息](#requestAccountInfo)
> #### 4.9 [获得账号可接收和发送的货币](#requestAccountTums)
> #### 4.10 [获得账号关系](#requestAccountRelations)
5. [REQUEST类](#request)
6. [TRANSACTION类](#transaction)
7. [底层常见错误附录](#errors)

## <a name="installation"></a>1 安装
1. 安装官方库
2. 安装社区库
```bash
npm install --save swtc-lib
```

## <a name="structure"></a>2 项目文件结构
### jingtum-lib库基于ws协议跟底层交互，其中ws封装到Server类中，Server类是一个内部类，不对 外开放;Server类封装在Remote类中，Remote类提供对外访问接口并可创建两类对象:Get方 式请求的Request对象和Post方式请求的Transaction对象，这两类对象都通过submit()方法提交 数据到底层。
文件结构图如下
![structure](./structure.png)

## <a name="wallet"></a>3 创建钱包
> ### 首先引入jingtum-lib库的Wallet对象，然后使用以下两种方法创建钱包
> ### 方法1: Wallet.generate()
> ### 方法2: Wallet.fromSecret(secret);
### 参数:
 
|参数    |类型      |说明       |
|--------|----------|-----------:|
|secret|String|井通钱包私钥|

```javascript
//创建Wallet对象
var jlib = require('swtc-lib');
var Wallet = jlib.Wallet;
//方式一
var w1 = Wallet.generate();

console.log(w1);
//方式二
var w2 = Wallet.fromSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
console.log(w2);
```
### 返回的结果信息:
|参数    |类型    |说明        |
|-------|--------|-----------:|
|secret|String|井通钱包私钥|
|address|String|井通钱包地址|
### 输出
```javascript
> Wallet.generate()
{ secret: 'ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C',
  address: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz' }
```

## <a name="remote"></a>4 REMOTE类
### Remote是跟井通底层交互最主要的类，它可以组装交易发送到底层、订阅事件及从底层拉取数据。提供以下方法:
* Remote(options)
* connect(callback)
* disconnect()
* requestServerInfo()
* requestLedgerClosed()
* requestLedger(options)
* requestTx(options)
* requestAccountInfo(options)
* requestAccountTums(options)
* requestAccountRelations(options)
* requestAccountOffers(options)
* requestAccountTx(options)
* requestOrderBook(options)
* requestPathFind(options)
* createAccountStub()
* createOrderBookStub()
* buildPaymentTx(options)
* buildRelationTx(options)
* buildAccountSetTx(options)
* buildOfferCreateTx(options)
* buildOfferCancelTx(options)
* deployContractTx(options)
* callContractTx(options)
### <a name="remoteCreate"></a>4.1 创建Remote对象
#### 方法:new Remote(options);
#### 参数:
|参数    |类型    |说明        |
|--------|--------|-----------:|
|server|String|井通底层服务地址|
|local_sign|Boolean|交易是否以本地签名的方式发送给底层|
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
```
### <a name="remoteConnect"></a>4.2 创建连接
#### 每个Remote对象都应该首先手动连接底层，然后才可以请求底层的数据。请求结果在回调函数callback中
#### 方法: connect(callback)
#### 参数: 回调函数 callback(err, result)
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign:
true});
remote.connect(function(err, result) {
    if (err) {
        console.log('err:',err);
    }else{
        console.log(result);
    }
});
```
#### 返回结果
```json
{ fee_base: 10,
  fee_ref: 10,
  hostid: 'WALE',
  ledger_hash:
   '325C01E5F35D6742D731883E4347A7CF227CF2C9410DBAFACCBF8007F29D47BB',
  ledger_index: 2838574,
  ledger_time: 607469770,
  load_base: 256,
  load_factor: 256,
  pubkey_node: 'n9KFgztij6QLsCk4AqDFteyJRJjMFRWV85h75wpaohRm6wVNRmDS',
  random:
   '1E4412BDAC455C0FFED34716BFD414BC57298A1D456E502669E99EE35761DB96',
  reserve_base: 10000000,
  reserve_inc: 1000000,
  server_status: 'full',
  validated_ledgers: '100-2064052,2106781-2838574'
}
```
#### 返回结果说明:
|参数|类型|说明|
|----|----|---:|
|fee_base|Integer|基础费用(手续费计算公式因子)|
|fee_ref|Integer|引用费用(手续费计算公式因子)|
|hostid|String|主机名|
|ledger_hash|String|账本hash|
|ledger_index|Integer|区块高度|
|ledger_time|Integer|账本关闭时间|
|pubkey_node|String|节点公钥|
|reserve_base|Integer|账号保留值|
|reserve_inc|Integer|用户每次挂单或信任冻结数量|
|server_status|String|服务器状态|
|validated_ledgers|String|账本区间|
### <a name="remoteDisconnect"></a>4.3 关闭连接 每个Remote对象可以手动关闭连接。
#### 方法:disconnect()
#### 参数:无
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        console.log('err:',err);
    }else{
        remote.disconnect(); //关闭连接
    }
});
```
### <a name="requestServerInfo"></a> 4.4 请求底层服务器信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得井通底层的服务器信息，包含 服务程序版本号version、该服务器缓存的账本区间ledgers、节点公钥node、服务器当前状态 state。其中服务器当前状态包含可提供服务状态full和验证节点状态proposing。
#### 方法:requestServerInfo()
#### 参数:无
#### 返回:Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign:
true});
remote.connect(function (err, result) {
    if (err) {
        console.log('err:', err);
    } else {
        var req = remote.requestServerInfo();
        req.submit(function (err, result) {
            if (err) {
                console.log('err:', err);
            } else {
                console.log('serverInfo:', result);
            }
       });
    }
});
        
```
#### 返回结果
```javascript
> serverInfo: { complete_ledgers: '100-2064052,2106781-2838682',
  ledger:
   '77EC394117B23104A87F242664328045D380B419550EBF619B2251516991C548',
  public_key: 'n9KFgztij6QLsCk4AqDFteyJRJjMFRWV85h75wpaohRm6wVNRmDS',
  state: 'full   851:35:58',
  peers: 5,
  version: 'skywelld-0.29.60' }
```
#### 返回结果说明:
|参数|类型|说明|
|----|----|---:|
|version|String|服务器部署项目版本|
|ledgers|String|账本区间|
|node|String|节点公钥|
|state|String|服务器状态|
### <a name='requestLedgerClosed'></a> 4.5 获取最新账本信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得最新账本信息，包括区块高度(ledger_index)与区块hash(ledger_hash)
#### 方法: requestLedgerClosed()
#### 参数: 无
#### 返回: Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign:
true});
remote.connect(function (err, result) {
    if (err) {
        console.log('err:', err);
    } else {
        var req = remote.requestLedgerClosed(); req.submit(function (err, result) {
            if (err) {
                console.log('err:', err);
            } else {
                console.log('ledgerInfo:', result);
            }
        });
    }
});
```
#### 返回结果
```javascript
> ledgerInfo: { ledger_hash:
   '93D6C3B76B5D6A2637F92F88A8CFB42C8433DA0EE69BD08A8CFAC327571173DD',
  ledger_index: 2838718 }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|ledger_hash|String|账本hash|
|ledger_index|String|账本高度/区块高度|
### <a name="requestLedger"></a> 4.6 获取某一账本具体信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账本的具体信息
#### 方法:remote.requestLedger({ledger_index:’8488670’,transactions:true});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|ledger_index|String|井通区块高度|
|ledger_hash|String|井通区块hash(与上面ledger_index二选其一)|
|transactions|Boolean|是否返回账本上的交易记录hash，默认false|
注:整体参数是Object类型，当参数都不填时，默认返回最新账本信息
#### 返回:Request对象
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign:
true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    //var req = remote.requestLedger({}); // 将默认返回最新账本信息
    var req = remote.requestLedger({
        ledger_index: '2838718',
        transactions: true
    });
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { accepted: true,
  account_hash:
   '4E64CF69B07D71B5216D8F9D8030D9D73958B34550A30FA7AC5894FF418FF9D4',
  close_time: 607471210,
  close_time_human: '2019-Apr-01 22:00:10',
  close_time_resolution: 10,
  closed: true,
  hash:
   '93D6C3B76B5D6A2637F92F88A8CFB42C8433DA0EE69BD08A8CFAC327571173DD',
  ledger_hash:
   '93D6C3B76B5D6A2637F92F88A8CFB42C8433DA0EE69BD08A8CFAC327571173DD',
  ledger_index: '2838718',
  parent_hash:
   '71CE1471C329AB64CDEF40C17484317760BA7C2DFFC731AE187AF0318BA6E20A',
  seqNum: '2838718',
  totalCoins: '600000000000000000',
  total_coins: '600000000000000000',
  transaction_hash:
   '0000000000000000000000000000000000000000000000000000000000000000',
  transactions: [] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|accepted|Boolean|区块是否已经产生|
|account_hash|String|状态hash树根|
|close_time|Integer|关闭时间|
|close_time_human|String|关闭时间|
|close_time_resoluti on|Integer|关闭周期|
|closed|Boolean|账本是否已经关闭|
|hash|String|账本hash|
|ledger_hash|String|账本hash|
|ledger_index|String|账本高度/区块高度|
|parent_hash|String|上一区块hash值|
|seqNum|String|账本高度/区块高度|
|totalCoins|String|swt总量|
|total_coins|String|swt总量|
|transaction_hash|String|交易hash树根|
|transactions|Array|该账本里的交易列表|
### <a name="requestTx"></a> 4.7 查询某一交易具体信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一交易的具体信息。
#### 方法:remote.requestTx({hash:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|hash|String|交易hash|
#### 返回: Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://swtclib.daszichan.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var req = remote.requestTx({hash: '1855C82DC1094A011C372A8AC2C83D09CFF5A9C3C22561529F7899A72A395FDF'});
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
            var fee = result.Fee/1000000; console.log('关键信息:【 交易费:', fee, '】');
        }
    });
});
```
#### 返回结果
```javascript
> res: { Account: 'jBqK2a3EkxaRWYzGKYFWCtBHTxNjFAKgT9',
  Amount: '60000000',
  Destination: 'jEKFPERfXtvxqN1363ZKAxLB1PyZydtMFV',
  Fee: '10000',
  Flags: 0,
  Sequence: 391777,
  SigningPubKey:
   '020C81373E372BA8C033EE09FA9EA956ABBB3A8B6158131881C253FD2703F3A0B8',
  Timestamp: 607459763,
  TransactionType: 'Payment',
  TxnSignature:
   '304402207265F33D4F2EBFD79D074522EEEB55F189FEEC81E498DB84E8B9A439A9EBB25B022077BAC04BFD382F9BE1F0F1D2E438CEE845A06A8CE89A996FBB0FF708598F1FC3',
  date: 607459770,
  hash:
   '1855C82DC1094A011C372A8AC2C83D09CFF5A9C3C22561529F7899A72A395FDF',
  inLedger: 12429999,
  ledger_index: 12429999,
  meta:
   { AffectedNodes: [ [Object], [Object], [Object] ],
     TransactionIndex: 14,
     TransactionResult: 'tesSUCCESS' },
  validated: true }
关键信息:【 交易费: 0.01】 
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|Account|String|钱包地址|
|Amount|String/O bject|交易金额|
|Destination|String|交易对家地址|
|Fee|String|交易费|
|Flags|Integer|交易标记|
|Memos|Array|备注|
|Sequence|Integer|自身账号的交易号|
|SigningPubKey|String|签名公钥|
|Timestamp|Integer|交易提交时间戳|
|TransactionType|String|交易类型|
|TxnSignature|String|交易签名|
|date|Integer|交易进账本时间|
|hash|String|交易hash|
|inLedger|Integer|交易所在的账本号|
|ledger_index|Integer|账本高度|
|meta|Object|交易影响的节点|
|&nbsp;&nbsp;&nbsp;   AffectedNodes|Array|受影响的节点|
|&nbsp;&nbsp;&nbsp;   TransactionIndex|Integer|--|
|&nbsp;&nbsp;&nbsp;   TransactionResult|String|交易结果|
|validated|Boolean|交易是否通过验证|
### <a name="requestAccountInfo"></a> 4.8 请求账号信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的交易信息。
#### 方法:remote.requestAccountInfo({account:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|井通钱包地址|
#### 返回:Request对象
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://swtclib.daszichan.com:5020', local_sign:
true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jBqK2a3EkxaRWYzGKYFWCtBHTxNjFAKgT9'};
    var req = remote.requestAccountInfo(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { account_data:
   { Account: 'jBqK2a3EkxaRWYzGKYFWCtBHTxNjFAKgT9',
     Balance: '2914980050000',
     Flags: 0,
     LedgerEntryType: 'AccountRoot',
     OwnerCount: 0,
     PreviousTxnID:
      '439EB733519BB04DF30AFB642802409695534D46D18CC1AA9251A816D4BB9736',
     PreviousTxnLgrSeq: 12431344,
     Sequence: 409096,
     index:
      '79172D17D7DE465BAFBAFC0B996DDA4714AE188364CD6E80E4E87D49B46BD190' },
  ledger_hash:
   '7CF10201787B334D97D96429D44F2DBA1A6B6FA8DFCC0980615BD5EF36F68339',
  ledger_index: 12432642,
  validated: true }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|account_data|Object|账号信息|
|&nbsp;&nbsp;Account|String|钱包地址|
|&nbsp;&nbsp;Balance|String|swt数量|
|&nbsp;&nbsp;Domain|String|域名|
|&nbsp;&nbsp;Flags|Integer|属性标志|
|&nbsp;&nbsp;MessageKey|String|公共密钥，用于发送加密的邮件到这个帐户|
|&nbsp;&nbsp;OwnerCount|Integer|用户拥有的挂单数和信任线数量的总和|
|&nbsp;&nbsp;PreviousTxnID|String|操作该帐号的上一笔交易hash|
|&nbsp;&nbsp;PreviousTxnLgrSeq|Integer|该帐号上一笔交易所在的账本号|
|&nbsp;&nbsp;RegularKey|String|RegularKey|
|&nbsp;&nbsp;Sequence|Integer|账号当前序列号|
|&nbsp;&nbsp;TransferRate|Integer|手续费汇率|
|&nbsp;&nbsp;index|String|该数据所在索引hash|
|ledger_hash|String|账本hash|
|ledger_index|Integer|账本高度|
|validated|Boolean|交易是否通过验证|
### <a name="requestAccountTums"></a> 4.9 获得账号可接收和发送的货币
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号可发送和接收的货币种类。
#### 方法:remote.requestAccountTums({account:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|井通钱包地址|
#### 返回:Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://swtclib.daszichan.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jLvo6LSKNEYJ4KDwDuM8LU5fuSsQkE4HVW'};
    var req = remote.requestAccountTums(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { ledger_hash:
   'A495692453361B3025852C5DD6463AF48637DABACDF71BF8D0D3C023D82DA4CA',
  ledger_index: 12432702,
  receive_currencies:
   [ 'CNY',
     'HJT',
     'SPC',
     'VCC',
     'JSLASH',
     '800000000000000000000000416FE9044CDAA1A2' ],
  send_currencies: [ 'CNY', 'HJT', 'SPC', 'VCC', 'JSLASH' ],
  validated: true }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|ledger_hash|String|账本hash|
|ledger_index|Integer|账本高度|
|receive_currencies|Array|可接收的货币列表|
|send_currencies|Array|可发送的货币列表|
|validated|Boolean|交易是否通过验证|
### <a name="requestAccountRelations"></a> 4.10 获得账号关系
#### 井通账户之间会建立各种不同的关系。这些关系由井通后台的关系(relations)机制来处理，目前支持以下关系:信任(trust)、授权(authorize)、冻结(freeze)。
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号指定关系的信息
#### 方法:remote.requestAccountRelations({account:’xxx’,type:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|井通钱包地址|
|type|String|关系类型，固定的三个值:trust、authorize、freeze|
## <a name="request"></a>5 REQUEST类
## <a name="transaction"></a>6 TRANSACTION类
## <a name="errors"></a>7 底层常见错误附录

