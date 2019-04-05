# 井通科技

## jingtum-lib接口说明
V2.0.3
合约测试只能在特定节点运行

## [应用实例](../)

## 版本历史
|版本|简介|作者|日期|
|-----|--------|-----------|-------------|
|1.0.0|初版主要接口说明|吴丹|2018/2/28|
|2.0.0|整体接口说明|吴丹|2018/3/2|
|2.0.1|Remote类增加返回结果说明|吴丹|2018/3/15|
|2.0.2|Remote类增加合约方法|吴丹|2018/5/31|
|2.0.3|swtc-lib|lospringliu|2019/4/2|

## 目录
1. ### [安装](#installation)
2. ### [项目文件结构](#structure)
3. ### [创建钱包](#wallet)
4. ### [REMOTE类](#remote)
> ### 4.1 [创建Remote对象](#remoteCreate)
> ### 4.2 [创建连接](#remoteConnect)
> ### 4.3 [断开连接](#remoteDisconnect)
> ### 4.4 [请求底层服务器信息](#requestServerInfo)
> ### 4.5 [获取最新账本信息](#requestLedgerClosed)
> ### 4.6 [获取某一账本具体信息](#requestLedger)
> ### 4.7 [查询某一交易具体信息](#requestTx)
> ### 4.8 [请求账号信息](#requestAccountInfo)
> ### 4.9 [获得账号可接收和发送的货币](#requestAccountTums)
> ### 4.10 [获得账号关系](#requestAccountRelations)
> ### 4.11 [获得账号挂单](#requestAccountOffers)
> ### 4.12 [获得账号交易列表](#requestAccountTx)
> ### 4.13 [获得市场挂单列表](#requestOrderBook)
> ### 4.14 [支付](#paymentTx)
> - 4.14.1 创建支付对象
> - 4.14.2 传入密钥
> - 4.14.3 设置备注
> - 4.14.4 提交支付
> ### 4.15 [设置关系](#relationTx)
> - 4.15.1 创建关系对象
> - 4.15.2 传入密钥
> - 4.15.3 关系设置
> ### 4.16 [设置账号属性 --- 待完善](#accountSetTx)
> - 4.16.1 创建属性对象
> - 4.16.2 传入密钥
> - 4.16.3 属性设置
> ### 4.17 [挂单](#offerCreate)
> - 4.17.1 创建挂单对象
> - 4.17.2 传入密钥
> - 4.17.3 提交挂单
> ### 4.18 [取消挂单](#offerCancel)
> - 4.18.1 创建取消挂单对象
> - 4.18.2 传入密钥
> - 4.18.3 取消挂单
> ### 4.19 [部署合约](#contractDeploy)
> - 4.19.1 创建部署合约对象
> - 4.19.2 传入密钥
> - 4.19.3 部署合约
> ### 4.20 [调用合约](#contractCall)
> - 4.20.1 创建执行合约对象
> - 4.20.2 传入密钥
> - 4.20.3 执行合约
> ### 4.21 [监听事件](#listen)

5. ### [REQUEST类](#request)
> ### 5.1 [指定账本](#requestLedger)
> ### 5.2 [提交请求](#requestSubmit)
6. ### [TRANSACTION类](#transaction)
> ### 6.1 [获得交易账号](#transactionAccount)
> ### 6.2 [获得交易类型](#transactionType)
> ### 6.3 [传入私钥](#transactionSecret)
> ### 6.4 [添加备注](#transactionMemo)
> ### 6.5 [提交请求](#transactionSubmit)
7. ### [底层常见错误附录](#errors)

## <a name="installation"></a>1 安装
1. 安装官方库
2. 安装社区库
```bash
npm install --save swtc-lib
```

## <a name="structure"></a>2 项目文件结构
### swtc-lib库基于ws协议跟底层交互，其中ws封装到Server类中，Server类是一个内部类，不对 外开放;Server类封装在Remote类中，Remote类提供对外访问接口并可创建两类对象:Get方 式请求的Request对象和Post方式请求的Transaction对象，这两类对象都通过submit()方法提交 数据到底层。
文件结构图如下
![structure](./structure.png)

## <a name="wallet"></a>3 创建钱包
> ### 首先引入swtc-lib库的Wallet对象，然后使用以下两种方法创建钱包
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var req = remote.requestTx({hash: '2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7'});
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
> res: { Account: 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF',
  Amount: '100000000000',
  Destination: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  Fee: '10000',
  Flags: 0,
  Memos: [ { Memo: [Object] }, { Memo: [Object] } ],
  Sequence: 3,
  SigningPubKey:
   '0294535FEE309F280DC4CF9F4134ECC909F8521CF51FEB7D72454E77F929DCB8C9',
  TransactionType: 'Payment',
  TxnSignature:
   '30440220725FF0939129E01A1BBFD6F557D82184B08F20406C4B637F6DFCCDC047F4783F022064EEFE5F42A58903E95C16D14CE228584CDE37EB599D496CAA3EDFF2E5913838',
  date: 607487990,
  hash:
   '2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7',
  inLedger: 2840396,
  ledger_index: 2840396,
  meta:
   { AffectedNodes: [ [Object], [Object], [Object] ],
     TransactionIndex: 0,
     TransactionResult: 'tesSUCCESS',
     delivered_amount: 'unavailable' },
  validated: true }
关键信息:【 交易费: 0.01 】
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
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
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Balance: '100000000000',
     Flags: 0,
     LedgerEntryType: 'AccountRoot',
     OwnerCount: 0,
     PreviousTxnID:
      '2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7',
     PreviousTxnLgrSeq: 2840396,
     Sequence: 1,
     index:
      'DB35CDEAF3F0D3C190B041C0C7D92FB0E43CBCBFAD4F498C28858A35CEA8BBB7' },
  ledger_hash:
   '7669E43FAD8A9926ECDDF642939A0B7EA48E0584FD4730F4CA68994E4C6890AB',
  ledger_index: 2840469,
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
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
   '80F7661460F62D707F923F4D6932624A1CBA6EF5E1F1CC4577AEA27D545CF2BD',
  ledger_index: 2861794,
  receive_currencies: [ 'CNY' ],
  send_currencies: [ 'CNY' ],
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
#### 返回: Request对象
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',type:'trust'};
    var req = remote.requestAccountRelations(options);
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
> res: { account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  ledger_hash:
   '427B3AD89CDA0A9B7ED229796EA4D10B781E4CAA14F89DBDA61086BBCCD0BA42',
  ledger_index: 2861802,
  lines:
   [ { account: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       balance: '100',
       currency: 'CNY',
       limit: '1000000000',
       limit_peer: '0',
       no_skywell: true,
       quality_in: 0,
       quality_out: 0 } ],
  validated: true }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|account|String|钱包地址|
|ledger_hash|String|账本hash|
|ledger_index|Integer|账本高度|
|lines|Array|该账户的信任线|
|account|String|信任的银关|
|balance|String|余额|
|currency|String|货币种类|
|limit|String|信任额度|
|limit_peer|String|对方设置的信任额度，默认0|
|quality_in|Integer|兑换比例，默认0，暂时未用|
|quality_out|Integer|兑换比例，默认0，暂时未用|
|validated|Boolean|交易是否通过验证|
### <a name="requestAccountOffers"></a> 4.11 获得账号挂单
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的挂单信息
#### 方法:remote.requestAccountOffers({account:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|井通钱包地址|
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
    var req = remote.requestAccountOffers(options);
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
> res: { account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  ledger_hash:
   'E02BA6ED09F7D946D6D4FE85FB5F29590A358551ECD463D9FEE40B8B9F6141E9',
  ledger_index: 2861816,
  offers:
   [ { flags: 131072,
       seq: 4,
       taker_gets: '1000000',
       taker_pays: [Object] } ],
  validated: true }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|account|String|钱包地址|
|ledger_hash|String|账本hash|
|ledger_index|Integer|账本高度|
|offers|Array|该账户的挂单列表|
|&nbsp;&nbsp;flags|Integer|买卖类型(131072表示卖，否则是买)|
|&nbsp;&nbsp;seq|String|余额|
|&nbsp;&nbsp;taker_gets|String|货币种类|
|&nbsp;&nbsp;&nbsp;&nbsp;value|String|金额|
|&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币|
|&nbsp;&nbsp;taket_pays|String|信任额度|
|&nbsp;&nbsp;&nbsp;&nbsp;value|String|金额|
|&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币|
|validated|Boolean|交易是否通过验证|
### <a name="requestAccountTx"></a> 4.12 获得账号交易列表
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的交易列表信息。
#### 方法:remote.requestAccountTx({account:’xxx’});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|井通钱包地址|
|limit|Integer|限定返回多少条记录，默认200|
#### 返回:Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
    var req = remote.requestAccountTx(options);
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
> res: { account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  ledger_index_max: 2844681,
  ledger_index_min: 101,
  transactions:
   [ { date: 1554174490,
       hash:
        'EB94F5155E8977B888E553C10C8EAC9567426BD3AF186E321CB614F4DCD1A4F2',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] },
     { date: 1554172790,
       hash:
        '2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7',
       type: 'received',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF',
       amount: [Object],
       effects: [] } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|account|String|钱包地址|
|ledger_index_max|Integer|当前节点缓存的账本区间最大值|
|ledger_index_min|Integer|当前节点缓存的账本区间最小值|
|marker|Object|查到的当前记录标记|
|transactions|Array|交易记录列表|
|&nbsp;&nbsp;date|Integer|时间戳|
|&nbsp;&nbsp;hash|String|交易hash|
|&nbsp;&nbsp;type|String|交易类型|
|&nbsp;&nbsp;fee|String|手续费|
|&nbsp;&nbsp;result|String|交易结果|
|&nbsp;&nbsp;memos|Array|备注|
|&nbsp;&nbsp;counterparty|String|交易对家|
|&nbsp;&nbsp;amount|Object|交易金额对象|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value|String|金额|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币|
|effects|Array|交易效果|
### <a name="requestOrderBook"></a> 4.13 获得市场挂单
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得市场挂单列表信息。
#### 方法:remote.requestOrderBook({});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|gets|Object|对家想要获得的货币信息|
|pays|Object|对家想要支付的货币信息|
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {
        limit: 5,
        pays: { currency: 'SWT', issuer: '' },
        gets: { currency: 'CNY', issuer: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D' }
    };
    var req = remote.requestOrderBook(options);
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
> res: { ledger_current_index: 2861869,
  offers:
   [ { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       BookDirectory:
        'AEC975E9D5B0DB3D88C5D0A31AB2884D40328C8ABE4E02664D038D7EA4C68000',
       BookNode: '0000000000000000',
       Flags: 131072,
       LedgerEntryType: 'Offer',
       OwnerNode: '0000000000000000',
       PreviousTxnID:
        '3EB37E4CB1017C1A5F4DA81B95CBB94345405BA7F791445BF9EEA9AB8C177DD8',
       PreviousTxnLgrSeq: 2861851,
       Sequence: 7,
       TakerGets: '1000000',
       TakerPays: [Object],
       index:
        '483DCDC95C3B1BECE5E67CBE8AD883607F6B63151E3233C9151C50AE4E96C59E',
       owner_funds: '11085930000',
       quality: '0.00000001' } ],
  validated: false }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|ledger_current_index|String|当前账本号|
|offers|Array|市场挂单列表|
|&nbsp;&nbsp;Account|Integer|账号地址|
|&nbsp;&nbsp;BookDirectory|String|--|
|&nbsp;&nbsp;BookNode|String|--|
|&nbsp;&nbsp;Flags|Integer|挂单买卖标记|
|&nbsp;&nbsp;LedgerEntryType|String|账本数据结构类型|
|&nbsp;&nbsp;OwnerNode|Array|--|
|&nbsp;&nbsp;PreviousTxnID|String|上一笔交易hash|
|&nbsp;&nbsp;PreviousTxnLgrSeq|Integer|上一笔交易所在账本号|
|&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;TakerGets|Object|对方得到的。(买卖双方，当货币是swt时，数据类型 为对象;否则为string)|
|&nbsp;&nbsp;&nbsp;&nbsp;value|String|金额|
|&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币|
|TakerPays|String|对方支付的|
|index|String|该数据所在索引hash|
|owner_funds|String|用户swt资产|
|quality|String|价格或价格的倒数|
|validated|Boolean|交易是否通过验证|
### <a name="paymentTx"></a> 4.14 支付
#### 首先通过buildPaymentTx方法返回一个Transaction对象，然后通过setSecret传入密钥，addMemo添加备注为可选项，最后通过submit方法提交支付信息。
#### <a name="paymentBuildTx"></a> 4.14.1 创建支付对象
##### 方法: remote.buildPaymentTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|发起账号|
|to|String|目标账号|
|amount|Object|支付金额|
|value|String|支付数量|
|currency|String|货币种类，三到六个字母或20字节的自定义货币|
|issuer|String|货币发行方|
##### 返回:Transaction对象
#### <a name="paymentSetSecret"></a> 4.14.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="paymentSetMemo"></a> 4.14.3 设置备注
##### 方法:tx.addMemo(memo);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|memo|String|备注信息|
#### <a name="paymentSubmit"></a> 4.14.4 提交支付
##### 方法:tx.submit(callback);
##### 参数:无
#### 支付完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var tx = remote.buildPaymentTx({
        account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
        to: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
        amount: {
            "value": 99900,
            "currency": "SWT",
            "issuer": ""
        }
    });
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.addMemo('给支付'); // 可选
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120000220000000024000000016140000017428107006840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100EC761F10DDA2371C77437EE2C7A71379B4214CF77E1C4058C46236B3E446ACE90220456CFB5ACDEE1EB7DEAC4819B5CD19C09911518BD38810A77EF20863C776FC8081141359AA928F4D98FDB3D93E8B690C80D37DED11C38314054FADDC8595E2950FA43F673F65C2009F58C7F1F9EA7D09E7BB99E694AFE4BB98E1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Amount: '99900000000',
     Destination: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     Fee: '10000',
     Flags: 0,
     Memos: [ [Object] ],
     Sequence: 1,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'Payment',
     TxnSignature:
      '3045022100EC761F10DDA2371C77437EE2C7A71379B4214CF77E1C4058C46236B3E446ACE90220456CFB5ACDEE1EB7DEAC4819B5CD19C09911518BD38810A77EF20863C776FC80',
     hash:
      'EB94F5155E8977B888E553C10C8EAC9567426BD3AF186E321CB614F4DCD1A4F2' } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|&nbsp;&nbsp;&nbsp;tx_blob|String|16进制签名后的交易|
|&nbsp;&nbsp;&nbsp;tx_json|Object|交易内容|
|&nbsp;&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;&nbsp;Amount|String|交易金额|
|&nbsp;&nbsp;&nbsp;Destination|String|对家|
|&nbsp;&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;&nbsp;Memos|Array|备注|
|&nbsp;&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;&nbsp;SigningPubKey|Object|签名公钥|
|&nbsp;&nbsp;&nbsp;TransactionType|String|交易类型|
|&nbsp;&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
### <a name="relationTx"></a> 4.15 设置关系
#### 首先通过buildRelationTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最 后通过submit方法提交支付信息。目前支持的关系类型:信任(trust)、授权(authorize)、冻结 (freeze)
#### <a name="relationBuildTx"></a> 4.15.1 创建关系对象
##### 方法:remote.buildRelationTx({});
##### 参数
|参数|类型|说明|
|----|----|---:|
|type|String|关系种类|
|account|String|设置关系的源账号|
|target|String|目标账号，授权和冻结才有|
|limit|Object|关系金额|
|value|String|数量|
|currency|String|货币种类，三到六个字母或20字节的自定义货币|
|issuer|String|货币发行方|
##### 返回:Transaction对象
#### <a name="relationSetSecret"></a> 4.15.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="relationSubmit"></a> 4.15.3 关系设置
##### 方法: tx.submit(callback);
#####  参数:无
#### 设置关系完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {
        account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
        target: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
        limit:{
            currency: 'CNY',
            value: "1",
            issuer: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D'
        },
        type:'authorize'
    };
    var tx = remote.buildRelationTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '1200152200000000240000000820230000000163D4838D7EA4C68000000000000000000000000000434E590000000000054FADDC8595E2950FA43F673F65C2009F58C7F16840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574463044022078E283810BF73CB8D932077C757A9FC5881C52B7475BE010BFD8A9731FDE1BB802202268AE34DFF38C171A70623A5E4EFA9069645E39F12D03DE6D9DD826F481FAC881141359AA928F4D98FDB3D93E8B690C80D37DED11C38714054FADDC8595E2950FA43F673F65C2009F58C7F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     LimitAmount:
      { currency: 'CNY',
        issuer: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
        value: '1' },
     RelationType: 1,
     Sequence: 8,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     Target: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     TransactionType: 'RelationSet',
     TxnSignature:
      '3044022078E283810BF73CB8D932077C757A9FC5881C52B7475BE010BFD8A9731FDE1BB802202268AE34DFF38C171A70623A5E4EFA9069645E39F12D03DE6D9DD826F481FAC8',
     hash:
      'C95235169DB1F994F67E0CC73BB98D0D044D2C4093E846675B29E4F13BE97DAC' } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|tx_blob|String|16进制签名后的交易|
|tx_json|Object|交易内容|
|&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;LimitAmount|Object|关系的额度|
|&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币|
|&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币发行方|
|&nbsp;&nbsp;&nbsp;&nbsp;value|String|额度|
|&nbsp;&nbsp;RelationType|Integer|关系类型:0信任;1授权;3冻结/解冻;|
|&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;SigningPubKey|Object|签名公钥|
|&nbsp;&nbsp;Target|String|关系对家|
|&nbsp;&nbsp;Timestamp|Integer|时间戳|
|&nbsp;&nbsp;TransactionType|String|交易类型:TrustSet信任;RelationDel解冻;RelationSet 授权/冻结|
|&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;hash|String|交易hash|
### <a name="accountSetTx"></a> 4.16 设置账号属性 ------待完善
#### 首先通过buildAccountSetTx方法返回一个Transaction对象，然后通过setSecret传入密钥， 最后通过submit方法设置账号属性。目前支持的三类:`property`、`delegate` 、`signer`。property 用于设置账号一般属性;delegate用于某账号设置委托帐户;signer用于设置签名。
#### <a name="accountSetBuild"></a>4.16.1 创建属性对象
##### 方法:remote.buildAccountSetTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|type|String|属性种类|
|account|String|设置属性的源账号|
|set_flag|String|属性编号|
##### 返回:Transaction对象
#### <a name="accountSetSecret"></a>4.16.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="accountSetSubmit"></a>4.16.3 属性设置
##### 方法:tx.submit(callback);
##### 参数:无
#### 设置属性完整例子
```javascript
var jlib = require('swtc-lib')
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {
        account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
        type:'property'
    };
    var tx = remote.buildAccountSetTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120003220000000024000000022F2436322C6840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E157446304402201FED6F42DE3F437321D59706846DD9A1DF4D90568A57E2F601AAE138F427800A0220108F4E08476283CC549A9DB21E36DFBBCDF2012C3A690AFBD9AE789C2C9C6C6581141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     Sequence: 2,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     Timestamp: 607531564,
     TransactionType: 'AccountSet',
     TxnSignature:
      '304402201FED6F42DE3F437321D59706846DD9A1DF4D90568A57E2F601AAE138F427800A0220108F4E08476283CC549A9DB21E36DFBBCDF2012C3A690AFBD9AE789C2C9C6C65',
     hash:
      '56969504AF776BB5EBC8830D87822E201973C4EBCD24CEA64A90D10EF740BD90' } }
```
### <a name="offerCreate"></a> 4.17 挂单
#### 首先通过buildOfferCreateTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法提交挂单。
#### <a name="offerCreateBuild"></a> 4.17.1 创建挂单对象
##### 方法:remote.buildOfferCreateTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|type|String|挂单类型，固定的两个值:Buy、Sell|
|account|String|挂单方账号|
|taker_gets|Object|对方得到的，即挂单方支付的|
|&nbsp;&nbsp;&nbsp;value|String|数量|
|&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;issuer|String|货币发行方|
|taker_pays|Object|对方支付的，即挂单方获得的|
|&nbsp;&nbsp;&nbsp;value|String|数量|
|&nbsp;&nbsp;&nbsp;currency|String|货币种类|
|&nbsp;&nbsp;&nbsp;issuer|String|货币发行方|
##### 返回:Transaction对象
#### <a name="offerCreateSetSecret"></a> 4.17.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="offerCreateSubmit"></a> 4.17.3 提交挂单
##### 方法:tx.submit(callback);
##### 参数:无
#### 挂单完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {
        type: 'Sell',
        account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
        taker_pays: {
            value: '0.01',
            currency: 'CNY',
            issuer: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D'
        },
        taker_gets: {
            value: '1',
            currency: 'SWT',
            issuer: ''
        }
    };
    var tx = remote.buildOfferCreateTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```
##### 返回结果:
```javascript
> res: { engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '1200072200080000240000000764D4038D7EA4C68000000000000000000000000000434E590000000000054FADDC8595E2950FA43F673F65C2009F58C7F16540000000000F42406840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15744730450221009BC83757257D09A5B66B07BD06E9368B5DED0FD576487FE88F8DD6B1D96B735A022020827BE97AD1DE11D528721E3BBCB0DA4C8E0591DBC244905AB776DCD72ED20981141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 524288,
     Sequence: 7,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TakerGets: '1000000',
     TakerPays:
      { currency: 'CNY',
        issuer: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
        value: '0.01' },
     TransactionType: 'OfferCreate',
     TxnSignature:
      '30450221009BC83757257D09A5B66B07BD06E9368B5DED0FD576487FE88F8DD6B1D96B735A022020827BE97AD1DE11D528721E3BBCB0DA4C8E0591DBC244905AB776DCD72ED209',
     hash:
      '3EB37E4CB1017C1A5F4DA81B95CBB94345405BA7F791445BF9EEA9AB8C177DD8' } }
```
##### 返回结果说明:
|参数|类型|说明|
|----|----|---:|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|tx_blob|String|16进制签名后的交易|
|tx_json|Object|交易内容|
|&nbsp;&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;&nbsp;SigningPubKey|String|签名公钥|
|&nbsp;&nbsp;&nbsp;TakerGets|Object|对家得到的|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currency|String|货币|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;issuer|String|货币发行方|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value|String|额度|
|&nbsp;&nbsp;&nbsp;TakerPays|String|对家支付的;|
|&nbsp;&nbsp;&nbsp;Timestamp|Integer|时间戳|
|&nbsp;&nbsp;&nbsp;TransactionType|String|交易类型:TrustSet信任;RelationDel解冻;RelationSet 授权/冻结|
|&nbsp;&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
### <a name="offerCancel"></a> 4.18 取消挂单
#### 首先通过buildOfferCancelTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法取消挂单。
#### 4.18.1 <a name="offerCancelBuild"></a> 创建取消挂单对象
#### 方法:remote.buildOfferCancelTx({});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String||挂单方账号|
|sequence|Integer|取消的单子号|
#### 返回:Transaction对象
#### <a name="offerCancelSetSecret"></a> 4.18.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="offerCancelSubmit"></a> 4.18.3 取消挂单
##### 方法:tx.submit(callback);
##### 参数:无
#### 挂单完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 7};
    var tx = remote.buildOfferCancelTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120008220000000024000000092019000000076840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100DA68AEF2F6A29A593490AD89218890E98CB0D9DEB645DCA92A6444E3DE9957440220141D389B41ACB777B14A862B58FCE2CDBC5353ECBDED42C2FD9D584B39F61AF181141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     OfferSequence: 7,
     Sequence: 9,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'OfferCancel',
     TxnSignature:
      '3045022100DA68AEF2F6A29A593490AD89218890E98CB0D9DEB645DCA92A6444E3DE9957440220141D389B41ACB777B14A862B58FCE2CDBC5353ECBDED42C2FD9D584B39F61AF1',
     hash:
      'AAD3063387632E3BEDF947FBBD2694A364FE1FF15EC1CDE26B7FEBA70B32BDD7' } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|tx_blob|String|16进制签名后的交易|
|tx_json|Object|交易内容|
|&nbsp;&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;&nbsp;OfferSequence|Integer|取消的单子号|
|&nbsp;&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;&nbsp;SigningPubKey|String|签名公钥|
|&nbsp;&nbsp;&nbsp;Timestamp|Integer|时间戳|
|&nbsp;&nbsp;&nbsp;TransactionType|String|交易类型:OfferCancel取消订单|
|&nbsp;&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
### <a name="contractDeploy"></a>4.19 部署合约
#### 首先通过deployContractTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法取消挂单。
#### <a name="contractDeployBuild"></a>4.19.1 创建部署合约对象
##### 方法:remote.deployContractTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|合约交易源账号|
|amount|String/Number|支付金额(最多支持六位小数)|
|payload|String|智能合约代码(16进制字符串)|
##### 可选参数:
|参数|类型|说明|
|----|----|---:|
|params|String|合约参数|
#### 返回:Transaction对象
#### <a name="contractDeploySetSecret"></a> 4.19.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="contractDeploySubmit"></a> 4.19.3 部署合约
##### 方法:tx.submit(callback);
##### 参数:无
#### 部署合约完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var utils = jlib.utils;
var remote = new Remote({server: 'ws://123.57.209.177:5030', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {
        account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
        amount: 10,
        payload: utils.stringToHex('result={}; function Init(t) result=scGetAccountBalance(t) return result end; function foo(t) result=scGetAccountBalance(t) return result end;'),
        // payload: utils.stringToHex('result={}; function Init(t) result=scGetAccountInfo(t) return result end; function foo(t) a={} result=scGetAccountInfo(t) return result end'),
        params: ['jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz']
    };
    var tx = remote.deployContractTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { ContractState: 'jNdpxLQbmMMf4ZVXjn3nb98xPYQ7EpEpTN',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '12001E220000000024000000052024000000006140000000009896806840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100EDC511C9AD68BEBD47F00CF7271E7DD6BF608E6C7A1ACC3B1D471B057B5E2C0C02203292629E4E6905C222BF99BE8023356B3040355D446DE2FAE6D1099DA6AE426B7F8D726573756C743D7B7D3B2066756E6374696F6E20496E697428742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B2066756E6374696F6E20666F6F28742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B81141359AA928F4D98FDB3D93E8B690C80D37DED11C3FAEB7012226A706D4B456D32735565766670466A533751486454385378375A476F4558544A417AE1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Amount: '10000000',
     Args: [ [Object] ],
     Fee: '10000',
     Flags: 0,
     Method: 0,
     Payload:
      '726573756C743D7B7D3B2066756E6374696F6E20496E697428742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B2066756E6374696F6E20666F6F28742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B',
     Sequence: 5,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'ConfigContract',
     TxnSignature:
      '3045022100EDC511C9AD68BEBD47F00CF7271E7DD6BF608E6C7A1ACC3B1D471B057B5E2C0C02203292629E4E6905C222BF99BE8023356B3040355D446DE2FAE6D1099DA6AE426B',
     hash:
      '71C1AAEAAB9D2F9CC4C65D9A9DB733EB80DF6037BDC6D4A6F1445BFDBDE25A02' } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|ContractState|String|生成的合约地址|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|tx_blob|String|16进制签名后的交易|
|tx_json|Object|交易内容|
|&nbsp;&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;&nbsp;Method|Integer|合约交易方法:0表示部署;1表示调用|
|&nbsp;&nbsp;&nbsp;Payload|Integer|16进制合约代码|
|&nbsp;&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;&nbsp;SigningPubKey|String|签名公钥|
|&nbsp;&nbsp;&nbsp;TransactionType|String|交易类型:ConfigContract部署合约|
|&nbsp;&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
### <a name="contractCall"></a> 4.20 执行合约
#### 首先通过callContractTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法取消挂单
#### <a name="contractCallBuild"></a> 4.20.1 创建执行合约对象
##### 方法:remote.callContractTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|合约交易源账号|
|destination|String|合约地址|
|foo|String|合约函数名|
##### 可选参数:
|参数|类型|说明|
|----|----|---:|
|params|String|合约参数|
#### 返回:Transaction对象
#### <a name="contractCallSetSecret"></a> 4.20.2 传入密钥
##### 方法:tx.setSecret(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### <a name="contractCallSubmit"></a> 4.20.3 执行合约
##### 方法:tx.submit(callback);
##### 参数:无
#### 执行合约完整例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://123.57.209.177:5030', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', destination: 'jNdpxLQbmMMf4ZVXjn3nb98xPYQ7EpEpTN',foo: 'foo',params: ['jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz']};
    var tx = remote.callContractTx(options);
    tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```
#### 返回结果
```javascript
> res: { ContractState: '99889937242',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '12001E220000000024000000062024000000016840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100DCB940C040EC1FE8BCC12E6BC2B4F980249048A29BDE21819851A794267E3CF9022033589643344130F1B8DA29C437B411875BA98C84056228AC1CC758FE8E98DB4F701103666F6F81141359AA928F4D98FDB3D93E8B690C80D37DED11C38314956A3DB0148D023D018A67AD20FE8E5275FB5B17FAEB7012226A706D4B456D32735565766670466A533751486454385378375A476F4558544A417AE1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Args: [ [Object] ],
     ContractMethod: '666F6F',
     Destination: 'jNdpxLQbmMMf4ZVXjn3nb98xPYQ7EpEpTN',
     Fee: '10000',
     Flags: 0,
     Method: 1,
     Sequence: 6,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'ConfigContract',
     TxnSignature:
      '3045022100DCB940C040EC1FE8BCC12E6BC2B4F980249048A29BDE21819851A794267E3CF9022033589643344130F1B8DA29C437B411875BA98C84056228AC1CC758FE8E98DB4F',
     hash:
      '060E534F8274A25EF4D48C5A6DC49F4200173BF6E61F287854821F598829BEBC' } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|ContractState|String|调用的合约结果|
|engine_result|String|请求结果|
|engine_result_code|Array|请求结果编码|
|engine_result_message|String|请求结果message信息|
|tx_blob|String|16进制签名后的交易|
|tx_json|Object|交易内容|
|&nbsp;&nbsp;&nbsp;Account|String|账号地址|
|&nbsp;&nbsp;&nbsp;Args|Array|合约传入的参数|
|&nbsp;&nbsp;&nbsp;ContractMethod|String|合约函数名|
|&nbsp;&nbsp;&nbsp;Destination|String|调用的合约地址|
|&nbsp;&nbsp;&nbsp;Fee|String|交易费|
|&nbsp;&nbsp;&nbsp;Flags|Integer|交易标记|
|&nbsp;&nbsp;&nbsp;Method|Integer|合约交易方法:0表示部署;1表示调用|
|&nbsp;&nbsp;&nbsp;Sequence|Integer|单子序列号|
|&nbsp;&nbsp;&nbsp;SigningPubKey|String|签名公钥|
|&nbsp;&nbsp;&nbsp;TransactionType|String|交易类型:ConfigContract合约类|
|&nbsp;&nbsp;&nbsp;TxnSignature|String|交易签名|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
### <a name="listen"></a> 4.21 监听事件
#### Remote有两个监听事件:监听所有交易(transactions)和监听所有账本(ledger_closed)，监听结果放到回调函数中，回调中只有一个参数，为监听到的消息。
#### 方法:remote.on('transactions',callback);
#### 方法:remote.on('ledger_closed',callback);
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    remote.on('transactions', function (msg) {
      console.log('tx: ',msg);
    });
    remote.on('ledger_closed', function (msg) {
        console.log('ledger: ',msg);
    });
});
```
## <a name="request"></a>5 REQUEST类
#### Request类主管GET请求，包括获得服务器、账号、挂单、路径等信息。请求时不需要提供密 钥，且对所有用户公开。所有的请求是异步的，会提供一个回调函数。每个回调函数有两个参 数，一个是错误，另一个是结果。提供以下方法:
* selectLedger(ledger)
* submit(callback)
### <a name="requestWithLedger"></a> 5.1 指定账本
#### 方法:selectLedger(ledger);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|ledger|String|账本高度或者账号hash|
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var req = remote.requestAccountInfo({account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'});
    req.selectLedger("2846000");
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
### <a name="requestSubmit"></a> 5.2 提交请求
#### 方法:submit(callback);
#### 参数:回调函数，包含两个参数:错误信息和结果信息
#### 例子
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var req = remote.requestAccountInfo({account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'});
     req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
## <a name="transaction"></a>6 TRANSACTION类
### Transaction类主管POST请求，包括组装交易和交易参数。请求时需要提供密钥，且交易可以 进行本地签名和服务器签名。目前支持服务器签名，本地签名支持主要的交易，还有部分参数 不支持。所有的请求是异步的，会提供一个回调函数。每个回调函数有两个参数，一个是错误， 另一个是结果。提供以下方法:
* getAccount()
* getTransactionType()
* setSecret(secret)
* addMemo(memo)
* setPath(key)
* setSendMax(amount)
* setTransferRate(rate)
* setFlags(flags)
* submit(callback)
### <a name="transactionAccount"></a> 6.1 获得交易账号
#### 方法:getAccount();
#### 参数:无
#### 返回:账号
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 4};
var tx = remote.buildOfferCancelTx(options);
var account = tx.getAccount();
console.log(account);
```
### <a name="transactionType"></a> 6.2 获得交易类型
#### 方法:getTransactionType();
#### 参数:无
#### 返回:交易类型
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 4};
var tx = remote.buildOfferCancelTx(options);
var type = tx.getTransactionType();
console.log(type);
```
### <a name="transactionSecret"></a> 6.3 传入私钥
#### 交易提交之前需要传入私钥。
#### 方法:setSecret(secret);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
#### 返回:Transaction对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 8};
var tx = remote.buildOfferCancelTx(options);
tx.setSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');;
```
### <a name="transactionMemo"></a> 6.4 添加备注 方法:addMemo(memo);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|memo|String|备注信息，不超过2k。|
#### 返回:Transaction对象
#### 例子:
```javascript
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
var tx = remote.buildPaymentTx({
    account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
    to: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
    amount: {
        "value": 0.5,
        "currency": "SWT",
        "issuer": ""
    }
}); tx.addMemo('给jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c支付0.5swt.');
```
### <a name="transactionSubmit"></a> 6.5 提交请求
#### 方法:submit(callback);
#### 参数:回调函数，包含两个参数:错误信息和结果信息
#### 例子:
```javascript
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign: true});
remote.connect(function (err, result) {
if (err) {
        return console.log('err:', err);
}
    var req = remote.requestAccountInfo({account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'});
     req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```
## <a name="errors"></a>7 底层常见错误附录
|错误名称|说明|
|----|---:|
|tecCLAIM|Fee claimed. Sequence used. No action.|
|tecDIR_FULL|Can not add entry to full directory.|
|tecFAILED_PROCESSING|Failed to correctly process transaction.|
|tecINSUF_RESERVE_LINE|Insufficient reserve to add trust line.|
|tecINSUF_RESERVE_OFFER|Insufficient reserve to create offer.|
|tecNO_DST|Destination does not exist. Send SWT to create it.|
|tecNO_DST_INSUF_SWT|Destination does not exist. Too little SWT sent to create it.|
|tecNO_LINE_INSUF_RESERVE|No such line. Too little reserve to create it.|
|tecNO_LINE_REDUNDANT|Can't set non-existent line to default.|
|tecPATH_DRY|Path could not send partial amount.|
|tecPATH_PARTIAL|Path could not send full amount.|
|tecMASTER_DISABLED|Master key is disabled.|
|tecNO_REGULAR_KEY|Regular key is not set.|
|tecUNFUNDED|One of _ADD, _OFFER, or _SEND. Deprecated.|
|tecUNFUNDED_ADD|Insufficient SWT balance for WalletAdd.|
|tecUNFUNDED_OFFER|Insufficient balance to fund created offer.|
|tecUNFUNDED_PAYMENT|Insufficient SWT balance to send.|
|tecOWNERS|Non-zero owner count.|
|tecNO_ISSUER|Issuer account does not exist.|
|tecNO_AUTH|Not authorized to hold asset.|
|tecNO_LINE|No such line.|
|tecINSUFF_FEE|Insufficient balance to pay fee.|
|tecFROZEN|Asset is frozen.|
|tecNO_TARGET|Target account does not exist.|
|tecNO_PERMISSION|No permission to perform requested operation.|
|tecNO_ENTRY|No matching entry found.|
|tecINSUFFICIENT_RESERVE|Insufficient reserve to complete requested operation.|
|tecNEED_MASTER_KEY|The operation requires the use of the Master Key.|
|tecDST_TAG_NEEDED|A destination tag is required.|
|tecINTERNAL|An internal error has occurred during processing.|
|tefALREADY|The exact transaction was already in this ledger.|
|tefBAD_ADD_AUTH|Not authorized to add account.|
|tefBAD_AUTH|Transaction's public key is not authorized.|
|tefBAD_LEDGER|Ledger in unexpected state.|
|tefCREATED|Can't add an already created account.|
|tefEXCEPTION|Unexpected program state.|
|tefFAILURE|Failed to apply.|
|tefINTERNAL|Internal error.|
|tefMASTER_DISABLED|Master key is disabled.|
|tefMAX_LEDGER|Ledger sequence too high.|
|tefNO_AUTH_REQUIRED|Auth is not required.|
|tefPAST_SEQ|This sequence number has already past.|
|tefWRONG_PRIOR|This previous transaction does not match.|
|telLOCAL_ERROR|Local failure.|
|telBAD_DOMAIN|Domain too long.|
|telBAD_PATH_COUNT|Malformed: Too many paths.|
|telBAD_PUBLIC_KEY|Public key too long.|
|telFAILED_PROCESSING|Failed to correctly process transaction.|
|telINSUF_FEE_P|Fee insufficient.|
|telNO_DST_PARTIAL|Partial payment to create account not allowed.|
|telBLKLIST|Tx disable for blacklist.|
|telINSUF_FUND|Fund insufficient.|
|temMALFORMED|Malformed transaction.|
|temBAD_AMOUNT|Can only send positive amounts.|
|temBAD_AUTH_MASTER|Auth for unclaimed account needs correct master key.|
|temBAD_CURRENCY|Malformed: Bad currency.|
|temBAD_EXPIRATION|Malformed: Bad expiration.|
|temBAD_FEE|Invalid fee, negative or not SWT.|
|temBAD_ISSUER|Malformed: Bad issuer.|
|temBAD_LIMIT|Limits must be non-negative.|
|temBAD_QUORUM|Quorums must be non-negative.|
|temBAD_WEIGHT|Weights must be non-negative.|
|temBAD_OFFER|Malformed: Bad offer.|
|temBAD_PATH|Malformed: Bad path.|
|temBAD_PATH_LOOP|Malformed: Loop in path.|
|temBAD_SEND_SWT_LIMIT|Malformed: Limit quality is not allowed for SWT to SWT.|
|temBAD_SEND_SWT_MAX|Malformed: Send max is not allowed for SWT to SWT.|
|temBAD_SEND_SWT_NO_DIR ECT|Malformed: No Skywell direct is not allowed for SWT to SWT.|
|temBAD_SEND_SWT_PARTIAL|Malformed: Partial payment is not allowed for SWT to SWT.|
|temBAD_SEND_SWT_PATHS|Malformed: Paths are not allowed for SWT to SWT.|
|temBAD_SEQUENCE|Malformed: Sequence is not in the past.|
|temBAD_SIGNATURE|Malformed: Bad signature.|
|temBAD_SRC_ACCOUNT|Malformed: Bad source account.|
|temBAD_TRANSFER_RATE|Malformed: Transfer rate must be >= 1.0|
|temDST_IS_SRC|Destination may not be source.|
|temDST_NEEDED|Destination not specified.|
|temINVALID|The transaction is ill-formed.|
|temINVALID_FLAG|The transaction has an invalid flag.|
|temREDUNDANT|Sends same currency to self.|
|temREDUNDANTSIGN|Add self as additional sign.|
|temSKYWELL_EMPTY|PathSet with no paths.|
|temUNCERTAIN|In process of determining result. Never returned.|
|temUNKNOWN|The transaction requires logic that is not implemented yet.|
|temDISABLED|The transaction requires logic that is currently disabled.|
|temMULTIINIT|contract code has multi init function|
|terRETRY|Retry transaction.|
|terFUNDS_SPENT|Can't set password, password set funds already spent.|
|terINSUF_FEE_B|Account balance can't pay fee.|
|terLAST|Process last.|
|terNO_SKYWELL|Path does not permit rippling.|
|terNO_ACCOUNT|The source account does not exist.|
|terNO_AUTH|Not authorized to hold IOUs.|
|terNO_LINE|No such line.|
|terPRE_SEQ|Missing/inapplicable prior transaction.|
|terOWNERS|Non-zero owner count.|
|tesSUCCESS|The transaction was applied. Only final in a validated ledger.|
