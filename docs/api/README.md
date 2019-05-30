# SWTC-API

## [jingtum-api](http://developer.jingtum.com/api2_doc.html)

## swtc-api接口说明
> ### swtc-api 对jingtum-api 作出包装， 消除不安全操作 并且提供类似swtc-lib的接口支持jingtum-api缺失的操作

## 目录
1. ### [安装](#installation)
2. ### [项目说明](#structure)
3. ### [创建钱包](#wallet)
4. ### [REMOTE类](#remote)
> ### 4.1 [创建Remote对象](#remoteCreate)
> ### 4.2 [获得账号余额](#getAccountBalances)
> ### 4.3 [获得账号支付信息](#getAccountPayment)
> ### 4.4 [获得账号支付记录](#getAccountPayments)
> ### 4.5 [获得账号挂单信息](#getAccountOrder)
> ### 4.6 [获得账号挂单列表](#getAccountOrders)
> ### 4.7 [获得账号交易信息](#getAccountTransaction)
> ### 4.8 [获得账号交易记录](#getAccountTransactions)
> ### 4.9 [获得货币对的挂单列表](#getOrderBooks)
> ### 4.10 [获得货币对的买单列表](#getOrderBooksBids)
> ### 4.11 [获得货币对的卖单列表](#getOrderBooksAsks)
> ### 4.12 [获得交易信息](#getTransaction)
> ### 4.13 [获得最新账本号](#getLedger)
> ### 4.14 [获得某一特定账本号](#getLedgerDetail)
> ### 4.15 [支付](#paymentTx)
> - 4.15.1 创建支付对象
> - 4.15.2 提交支付
> ### 4.16 [设置关系](#relationTx)
> - 4.16.1 创建关系对象
> - 4.16.2 关系设置
> ### 4.17 [设置账号属性 --- 待完善](#accountSetTx)
> - 4.17.1 创建属性对象
> - 4.17.2 属性设置
> ### 4.18 [挂单](#offerCreate)
> - 4.18.1 创建挂单对象
> - 4.18.2 提交挂单
> ### 4.19 [取消挂单](#offerCancel)
> - 4.19.1 创建取消挂单对象
> - 4.19.2 取消挂单
> ### 4.20 [部署合约 lua](#contractDeploy)
> - 4.20.1 创建部署合约对象
> - 4.20.2 部署合约
> ### 4.21 [调用合约 lua](#contractCall)
> - 4.21.1 创建执行合约对象
> - 4.21.2 执行合约
> ### 4.22 [设置挂单佣金](#buildBrokerageTx)
> - 4.22.1 创建挂单佣金对象
> - 4.22.2 设置挂单佣金
> ### 4.23 [部署合约 solidity](#initContract)
> - 4.23.1 创建部署合约对象
> - 4.23.2 部署合约
> ### 4.24 [调用合约 solidity](#invokeContract)
> - 4.24.1 创建执行合约对象
> - 4.24.2 执行合约
5. ### [本地签名](#localSign)
6. ### [交易信息](#transaction)
7. ### 工具类 swtc-utils类是工具类
8. ### [底层常见错误附录](#errors)
9. ### [solidity erc20 源码](#erc20src)
10. ### [solidity erc721 源码](#erc721src)

## <a name="installation"></a>1 安装
1. 安装库
```bash
npm install --save swtc-api
```

## <a name="structure"></a>2 项目说明
> ### swtc-api库操作jingtum-api提供的restapi, 但是实现了本地签名， 避免密钥传输到网络上
> ### swtc-api提供比jingtum-api更多的操作

## <a name="wallet"></a>3 创建钱包
> ### 首先引入swtc-api库的Wallet对象，然后使用以下两种方法创建钱包
> ### 方法1: Wallet.generate()
> ### 方法2: Wallet.fromSecret(secret);
### 参数:
 
|参数    |类型      |说明       |
|--------|----------|-----------:|
|secret|String|井通钱包私钥|

```javascript
//创建Wallet对象
var japi = require('swtc-api');
var Wallet = japi.Remote.Wallet;
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
### Remote是跟jingtum-api的restapi交互的类，它包装所有jingtum-api提供的方法, 还提供额外的类似swtc-lib的接口
* Remote(options)
* getAccountBalances(address)
* getAccountPayment(address, id)
* getAccountPayments(address)
* postAccountPayments(address, options)
* requestServerInfo()
* requestLedgerClosed()
* requestLedger(options)
* requestTx(options)
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
### swtc-api REMOTE 独享
* buildAccountSetTx()
* buildBrokerageTx()
* buildContractCallTx()
* buildContractDeployTx()
* buildOfferCancelTx()
* buildOfferCreateTx()
* buildPaymentTx()
* buildRelationTx()
* makeCurrency()
* makeAmount()
* txSignPromise()
* txSubmitPromise()

### <a name="remoteCreate"></a>4.1 创建Remote对象
#### 方法:new Remote(options);
#### 参数:
|参数    |类型    |说明        |
|--------|--------|-----------:|
|server|String|井通rest api服务地址|
|issuer|String|默认银关|
|solidity|Boolean|启用solidity支持|
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
```
### <a name="getAccountBalances"></a> 4.2 获得账号余额
#### 方法:remote.getAccountBalances(address);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|井通钱包地址|
#### [可选参数:](#optionalParameters)
|参数|类型|说明|
|----|----|---:|
|currency|String|指定返回对应货币的余额|
|issuer|String|指定返回对应银关发行的货币|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountBalances('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  balances:
   [ { value: '10499.851252',
       currency: 'SWT',
       issuer: '',
       freezed: '51' },
     { value: '95.955000182',
       currency: 'CNY',
       issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       freezed: '2.000000' } ],
  sequence: 976 }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|balances|Array|余额数组|
|&nbsp;&nbsp;&nbsp;value|String|余额|
|&nbsp;&nbsp;&nbsp;currency|String|货币名称，三个字母或20字节的货币|
|&nbsp;&nbsp;&nbsp;issuer|String|货币发行方|
|&nbsp;&nbsp;&nbsp;freezed|String|冻结的金额|
|sequence|Integer|当前交易序列号（用于本地签名）|
### <a name="getAccountPayment"></a> 4.3 获得账号支付信息
#### 方法:remote.getAccountPayment(address, hash);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|支付用户钱包地址|
|hash|String|支付交易的hash|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountPayment('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', 'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  date: 1559225370,
  hash:
   'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1',
  type: 'sent',
  fee: '0.01',
  result: 'tesSUCCESS',
  memos: [ 'hello memo' ],
  counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
  amount: { value: '1.999999', currency: 'SWT', issuer: '' },
  effects: [] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|date|Integer|支付时间，UNIXTIME时间|
|hash|String|支付hash|
|type|String|支付类型，sent或received|
|fee|String|支付费用|
|result|String|支付的服务器结果|
|memos|Array|支付的备注，String数组|
|counterparty|String|交易对家|
|amount|Object|交易金额|
|effects|Array|支付的效果，详见交易记录效果|
### <a name="getAccountPayments"></a> 4.4 获得账号支付记录
#### 方法:remote.getAccountPayments(address);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|支付用户钱包地址|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountPayments('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  marker: { ledger: 3345651, seq: 0 },
  payments:
   [ { date: 1559225370,
       hash:
        'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] },
     { date: 1559225350,
       hash:
        '624D13BC5B9E6EC1D470E9D53687445D50D60FD7728B2B5ADBA4D824891DC8E7',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|payments|Array|支付历史, 同交易记录中的信息|
### <a name="getAccountOrder"></a> 4.5 获得账号挂单信息
#### 方法:remote.getAccountOrder(address, hash);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|挂单方钱包地址|
|hash|String|挂单交易的hash|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountOrder('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', 'AC1A4249608B7E5096557A922861600273ACDD4A7AE9BAFE7A585567BD87DCD2').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  hash:
   'AC1A4249608B7E5096557A922861600273ACDD4A7AE9BAFE7A585567BD87DCD2',
  fee: '0.01',
  action: 'sell',
  order:
   { account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     pair: 'CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS/SWT',
     amount: '0.009',
     price: '111.11111111111111111111',
     type: 'sell',
     sequence: 966 } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|hash|String|交易Hash|
|fee|String|交易费用，井通计价|
|action|String|交易的动作类型|
|order|Object|交易单子信息|
|&nbsp;&nbsp;&nbsp;account|String|交易帐号|
|&nbsp;&nbsp;&nbsp;pair|String|交易的货币对|
|&nbsp;&nbsp;&nbsp;amount|String|挂单的数量|
|&nbsp;&nbsp;&nbsp;price|String|挂单的价格|
|&nbsp;&nbsp;&nbsp;type|Integer|交易类型，sell或buy|
|&nbsp;&nbsp;&nbsp;sequence|Integer|交易序列号|
### <a name="getAccountOrders"></a> 4.6 获得账号挂单列表
#### 方法:remote.getAccountOrders(address);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|挂单方钱包地址|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountOrders('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  orders:
   [ { type: 'buy',
       pair: 'CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS/SWT',
       amount: '0.007',
       price: '142.85714285714285714286',
       sequence: 190 },
     { type: 'buy',
       pair: 'CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS/SWT',
       amount: '0.007',
       price: '142.85714285714285714286',
       sequence: 191 },
     { type: 'buy',
       pair: 'CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS/SWT',
       amount: '0.007',
       price: '142.85714285714285714286',
       sequence: 192 },
     { type: 'sell',
       pair: 'SWT/CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       amount: '1.000000',
       price: '0.01',
       sequence: 380 },
     { type: 'sell',
       pair: 'SWT/CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       amount: '1.000000',
       price: '0.01',
       sequence: 394 },
     { type: 'sell',
       pair: 'SWT/CNY:jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       amount: '1.000000',
       price: '0.01',
       sequence: 531 } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|orders|Array|挂单列表, 同挂单中的信息|
### <a name="getAccountTransaction"></a> 4.7 获得账号交易信息
#### 方法:remote.getAccountTransaction(address, hash);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|钱包地址|
|hash|String|交易的hash|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountTransaction('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', 'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  transaction:
   { date: 1559225370,
     hash:
      'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1',
     type: 'sent',
     fee: '0.01',
     result: 'tesSUCCESS',
     memos: [ 'hello memo' ],
     counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     amount: { value: '1.999999', currency: 'SWT', issuer: '' },
     effects: [],
     ledger: 3345654 } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|transaction|Object|具体的交易信息|
|&nbsp;&nbsp;&nbsp;date|Integer|交易时间，UNIXTIME|
|&nbsp;&nbsp;&nbsp;hash|Object|交易hash|
|&nbsp;&nbsp;&nbsp;type|Object|交易类型|
|&nbsp;&nbsp;&nbsp;fee|Object|交易费用，井通计价|
|&nbsp;&nbsp;&nbsp;result|Object|交易结果|
|&nbsp;&nbsp;&nbsp;counterparty|Object|交易对家|
|&nbsp;&nbsp;&nbsp;amount|Object|交易金额|
|&nbsp;&nbsp;&nbsp;effects|Object|交易效果，详见下面分析|
### <a name="getAccountTransactions"></a> 4.8 获得账号交易记录
#### 方法:remote.getAccountTransactions(address);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|钱包地址|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getAccountTransactions('jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', {results_per_page: 4}).then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  marker: { ledger: 3345647, seq: 0 },
  transactions:
   [ { date: 1559225370,
       hash:
        'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] },
     { date: 1559225350,
       hash:
        '624D13BC5B9E6EC1D470E9D53687445D50D60FD7728B2B5ADBA4D824891DC8E7',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] },
     { date: 1559225340,
       hash:
        '50B45492428ABFA037F57F24717DB590DD626E53F8FB7FDB037322297C5380AE',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] },
     { date: 1559225310,
       hash:
        '1E2B5F1B2843BFB8442FD1B1DB92F2BFF740E2FFC6892738704E4589730F8D13',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
       amount: [Object],
       effects: [] } ] }

```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|调用结果|
|marker|Object|交易记录标记|
|transactions|Array|具体的交易信息数组|
|&nbsp;&nbsp;&nbsp;date|Integer|交易时间，UNIXTIME|
|&nbsp;&nbsp;&nbsp;hash|String|交易hash|
|&nbsp;&nbsp;&nbsp;type|String|交易类型|
|&nbsp;&nbsp;&nbsp;fee|String|交易费用，井通计价|
|&nbsp;&nbsp;&nbsp;result|String|交易结果|
|&nbsp;&nbsp;&nbsp;memos|String|交易备注|
|&nbsp;&nbsp;&nbsp;counterparty|String|交易对家，支付交易才有|
|&nbsp;&nbsp;&nbsp;amount|String|交易金额/挂单数量，支付交易或者挂单交易才有|
|&nbsp;&nbsp;&nbsp;offertype|String|挂单类型，sell或者buy，挂单交易才有|
|&nbsp;&nbsp;&nbsp;pair|String|交易的货币对，挂单交易才有|
|&nbsp;&nbsp;&nbsp;price|String|挂单的价格，挂单交易才有|
|&nbsp;&nbsp;&nbsp;effects|Object|交易效果，详见如下|
### <a name="getOrderBooks"></a> 4.9 获得货币对的挂单列表
#### 方法:remote.getOrderBooks(base, counter);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|base|String|基准货币（currency+counterparty），兼容swt+counterparty|
|counter|String|目标货币（currency+counterparty），兼容swt+counterparty|
#### [可选参数:](#optionalParameters)
|参数|类型|说明|
|----|----|---:|
|results_per_page|Integer|返回的每页数据量，默认每页买卖单各10项|
|page|Integer|页码，默认从第一页开始|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getOrderBooks('SWT', 'CNY+' + remote._issuer).then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  pair: 'SWT/CNY+jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
  bids: [],
  asks:
   [ { price: 0.00699,
       order_maker: 'jH6L8EzkgwMKWRmLVC4oLchqft4oNqUUj',
       sequence: 4,
       passive: false,
       sell: true,
       funded: 0.428572 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 380,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 394,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 531,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.0124,
       order_maker: 'jQNdYXxgNHY49oxDL8mrjr7J6k7tdNy1kM',
       sequence: 6,
       passive: false,
       sell: true,
       funded: 100 },
     { price: 0.3,
       order_maker: 'jH6L8EzkgwMKWRmLVC4oLchqft4oNqUUj',
       sequence: 1,
       passive: false,
       sell: true,
       funded: 5 } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|pair|String|挂单货币对|
|bids/asks|Array|买入单|
|&nbsp;&nbsp;&nbsp;price|Object|该档的价格|
|&nbsp;&nbsp;&nbsp;funded|Integer|实际中用户可以成交的金额|
|&nbsp;&nbsp;&nbsp;order_maker|String|挂单用户|
|&nbsp;&nbsp;&nbsp;sequence|String|交易序号|
|&nbsp;&nbsp;&nbsp;passive|Boolean|交易是否是被动交易|
### <a name="getOrderBooksBids"></a> 4.10 获得货币对的买单列表
#### 方法:remote.getOrderBooksBids(base, counter);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|base|String|基准货币（currency+counterparty），兼容swt+counterparty|
|counter|String|目标货币（currency+counterparty），兼容swt+counterparty|
#### [可选参数:](#optionalParameters)
|参数|类型|说明|
|----|----|---:|
|results_per_page|Integer|返回的每页数据量，默认每页买单10项|
|page|Integer|页码，默认从第一页开始|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getOrderBooksBids('SWT', 'CNY+' + remote._issuer).then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  pair: 'CNY+jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS/SWT',
  bids:
   [ { price: 142.85714,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 190,
       passive: false,
       sell: false,
       funded: 0.007 },
     { price: 142.85714,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 191,
       passive: false,
       sell: false,
       funded: 0.007 },
     { price: 142.85714,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 192,
       passive: false,
       sell: false,
       funded: 0.007 },
     { price: 0.00045,
       order_maker: 'j3UcBBbes7HFgmTLmGkEQQShM2jdHbdGAe',
       sequence: 37,
       passive: false,
       sell: false,
       funded: 0.02 } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|pair|String|挂单货币对|
|bids|Array|买入单|
|&nbsp;&nbsp;&nbsp;price|Object|该档的价格|
|&nbsp;&nbsp;&nbsp;funded|Integer|实际中用户可以成交的金额|
|&nbsp;&nbsp;&nbsp;order_maker|String|挂单用户|
|&nbsp;&nbsp;&nbsp;sequence|String|交易序号|
|&nbsp;&nbsp;&nbsp;passive|Boolean|交易是否是被动交易|
### <a name="getOrderBooksAsks"></a> 4.11 获得货币对的卖单列表
#### 方法:remote.getOrderBooksAsks(base, counter);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|base|String|基准货币（currency+counterparty），兼容swt+counterparty|
|counter|String|目标货币（currency+counterparty），兼容swt+counterparty|
#### [可选参数:](#optionalParameters)
|参数|类型|说明|
|----|----|---:|
|results_per_page|Integer|返回的每页数据量，默认每页卖单10项|
|page|Integer|页码，默认从第一页开始|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getOrderBooksAsks('SWT', 'CNY+' + remote._issuer).then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  pair: 'SWT/CNY+jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
  asks:
   [ { price: 0.00699,
       order_maker: 'jH6L8EzkgwMKWRmLVC4oLchqft4oNqUUj',
       sequence: 4,
       passive: false,
       sell: true,
       funded: 0.428572 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 380,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 394,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.01,
       order_maker: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
       sequence: 531,
       passive: false,
       sell: true,
       funded: 1 },
     { price: 0.0124,
       order_maker: 'jQNdYXxgNHY49oxDL8mrjr7J6k7tdNy1kM',
       sequence: 6,
       passive: false,
       sell: true,
       funded: 100 },
     { price: 0.3,
       order_maker: 'jH6L8EzkgwMKWRmLVC4oLchqft4oNqUUj',
       sequence: 1,
       passive: false,
       sell: true,
       funded: 5 } ] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|pair|String|挂单货币对|
|asks|Array|卖出单|
|&nbsp;&nbsp;&nbsp;price|Object|该档的价格|
|&nbsp;&nbsp;&nbsp;funded|Integer|实际中用户可以成交的金额|
|&nbsp;&nbsp;&nbsp;order_maker|String|挂单用户|
|&nbsp;&nbsp;&nbsp;sequence|String|交易序号|
|&nbsp;&nbsp;&nbsp;passive|Boolean|交易是否是被动交易|
### <a name="getTransaction"></a> 4.12 获得某一交易信息
#### 方法:remote.getTransaction(hash);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|address|String|钱包地址|
|hash|String|交易的hash|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getTransaction('F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  transaction:
   { date: 1559225370,
     hash:
      'F500406922F8C0D71939EF3CA6232EA50C97C0B5BBC3777843EA0219C7EB22F1',
     type: 'sent',
     fee: '0.01',
     result: 'tesSUCCESS',
     memos: [ 'hello memo' ],
     counterparty: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     amount: { value: '1.999999', currency: 'SWT', issuer: '' },
     effects: [],
     ledger: 3345654 } }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|transaction|Object|具体的交易信息|
|&nbsp;&nbsp;&nbsp;date|Integer|交易时间，UNIXTIME|
|&nbsp;&nbsp;&nbsp;hash|Object|交易hash|
|&nbsp;&nbsp;&nbsp;type|Object|交易类型|
|&nbsp;&nbsp;&nbsp;fee|Object|交易费用，井通计价|
|&nbsp;&nbsp;&nbsp;result|Object|交易结果|
|&nbsp;&nbsp;&nbsp;counterparty|Object|交易对家|
|&nbsp;&nbsp;&nbsp;amount|Object|交易金额|
|&nbsp;&nbsp;&nbsp;effects|Object|交易效果，详见下面分析|
### <a name="getLedger"></a> 4.13 获得最新帐本
#### 方法:remote.getLedger();
#### 参数: 无
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getLedger().then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  ledger_hash:
   '2C0D839779AB96E009F70CDC5CCFD7081F96671AF81952C25B9F782FA3978F6D',
  ledger_index: 3348251 }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|ledger_hash|String|账本hash|
|ledger_index|Integer|账本号/区块高度|
### <a name="getLedgerDetail"></a> 4.14 获得某一帐本及其交易信息
#### 方法:remote.getLedger(hash_or_index);
#### 参数:
|参数|类型|说明|
|----|----|---:|
|hash_or_index|string|账本号/区块高度 或者 哈希|
#### 返回: Promise - json
#### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.getLedger(3348251).then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  accepted: true,
  account_hash:
   '9210C4928F284B81CF5CF6877FAA74A2974F451EBD29D5912BDB6A7B9959632C',
  close_time: 612566540,
  close_time_human: '2019-May-30 21:22:20',
  close_time_resolution: 10,
  closed: true,
  hash:
   '2C0D839779AB96E009F70CDC5CCFD7081F96671AF81952C25B9F782FA3978F6D',
  ledger_hash:
   '2C0D839779AB96E009F70CDC5CCFD7081F96671AF81952C25B9F782FA3978F6D',
  ledger_index: '3348251',
  parent_hash:
   '6C1F3CC145764A154AB347AD6751680010A100325F87874843D26959A4151F96',
  seqNum: '3348251',
  totalCoins: '600000000000000000',
  total_coins: '600000000000000000',
  transaction_hash:
   '0000000000000000000000000000000000000000000000000000000000000000',
  transactions: [] }
```
#### 返回结果说明
|参数|类型|说明|
|----|----|---:|
|success|Boolean|请求结果|
|accepted|Boolean|区块是否已经产生|
|account_hash|String|状态hash树根|
|close_time|Integer|关闭时间|
|close_time_human|String|关闭时间|
|close_time_resolution|Integer|关闭周期|
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

### <a name="requestServerInfo"></a> 4.4 请求底层服务器信息
#### 首先通过本方法返回一个Request对象，然后通过submit方法获得井通底层的服务器信息，包含 服务程序版本号version、该服务器缓存的账本区间ledgers、节点公钥node、服务器当前状态 state。其中服务器当前状态包含可提供服务状态full和验证节点状态proposing。
#### 方法:requestServerInfo()
#### 参数:无
#### 返回:Request对象
#### 例子:
```javascript
var jlib = require('swtc-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
	.then(async () => { 
			let response = await remote.requestServerInfo().submitPromise()
			console.log(response)
			remote.disconnect()
		}
	)
	.catch(console.error)
        
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
	.then(async () => { 
			let response = await remote.requestLedgerClosed().submitPromise()
			console.log(response)
			remote.disconnect()
		}
	)
	.catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
	.then(async () => { 
			let response = await remote.requestLedger({
					ledger_index: '2838718',
					transactions: true
				}).submitPromise()
			console.log(response)
			remote.disconnect()
		}
	)
	.catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
	.then(async () => {
    		let req = remote.requestTx({hash: '2C3F60ABEC539BEE768FAE1820B9C284C7EC2D45EF1D7F9E28F4357056E822F7'});
			let response = await req.submitPromise()
			console.log(response)
			remote.disconnect()
		}
	)
	.catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
    .then(async () => {
            let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
    		let req = remote.requestAccountTums(options);
            let response = await req.submitPromise()
            console.log(response)
            remote.disconnect()
        }
    )
    .catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
    .then(async () => {
    		let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',type:'trust'};
    		let req = remote.requestAccountRelations(options);
            let response = await req.submitPromise()
            console.log(response)
            remote.disconnect()
        }
    )
    .catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
    .then(async () => {
    	    let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
   		    let req = remote.requestAccountOffers(options);
            let response = await req.submitPromise()
            console.log(response)
            remote.disconnect()
        }
    )
    .catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
    .then(async () => {
    	    let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz'};
    	    let req = remote.requestAccountTx(options);
            let response = await req.submitPromise()
            console.log(response)
            remote.disconnect()
        }
    )
    .catch(console.error)
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
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.connectPromise()
    .then(async () => {
   		    let options = {
   		        limit: 5,
   		        pays: remote.makeCurrency(),
   		        gets: remote.makeCurrency('CNY')
   		    }
            let req = remote.requestOrderBook(options);
            let response = await req.submitPromise()
            console.log(response)
            remote.disconnect()
        }
    )
    .catch(console.error)
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
### <a name="requestBrokerage"></a> 4.14 获得挂单佣金设置信息
#### 首先通过requestBrokerage方法返回一个Transaction对象，然后通过submit方法提交。
##### 方法: remote.requestBrokerage({});
##### 参数:
### <a name="paymentTx"></a> 4.15 支付
#### 首先通过buildPaymentTx方法返回一个Transaction对象，然后通过submitPromise()方法提交支付信息。
#### <a name="paymentBuildTx"></a> 4.15.1 创建支付对象
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
#### <a name="paymentSubmit"></a> 4.15.2 提交支付
##### 方法:tx.submitPromise(secret, memo)
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
##### 返回: Promise
#### 支付完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
remote.buildPaymentTx({
	   	account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
	   	to: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
	   	amount: remote.makeAmount(0.02)
}).submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C', 'payment memo').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120000220000000024000003D0614000000000004E206840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E157446304402202D56D65F47E41AA74D0DD4C3846AB4CC38F463C21DA95BD638EFCD5C5FA67EEA02205F097D65BD83C5D1AAE902BD9D017598BEF0E96F6E36327BFE6CB03D1C2CC27881141359AA928F4D98FDB3D93E8B690C80D37DED11C38314054FADDC8595E2950FA43F673F65C2009F58C7F1F9EA7D0C7061796D656E74206D656D6FE1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Amount: '20000',
     Destination: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     Fee: '10000',
     Flags: 0,
     Memos: [ [Object] ],
     Sequence: 976,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'Payment',
     TxnSignature:
      '304402202D56D65F47E41AA74D0DD4C3846AB4CC38F463C21DA95BD638EFCD5C5FA67EEA02205F097D65BD83C5D1AAE902BD9D017598BEF0E96F6E36327BFE6CB03D1C2CC278',
     hash:
      'E6654E461447CA68BF4D6E5156D6E63078D3DED9ED8904CA5537A66DAE7DF0EF' } }
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
### <a name="relationTx"></a> 4.16 设置关系
#### 首先通过buildRelationTx方法返回一个Transaction对象，然后通过submitPromise()方法提交支付信息。目前支持的关系类型:信任(trust)、授权(authorize)、冻结 (freeze)
#### <a name="relationBuildTx"></a> 4.16.1 创建关系对象
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
#### <a name="relationSubmit"></a> 4.16.2 关系设置
##### 方法:tx.submitPromise(secret, memo)
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
##### 返回: Promise
##### 方法: tx.submit(callback);
#####  参数:无
#### 设置关系完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
let options = {
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    target: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
    limit: remote.makeAmount(1, 'CNY'),
    type:'authorize'
};
let tx = remote.buildRelationTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C', '授权').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120015220000000024000003D120230000000163D4838D7EA4C68000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574463044022046585A2EA1D1E21D1DF797D5614FC4CA2BE549C2235B43BE75C896DCFB6CE65902203230FFE3A4B17B29E9EFE29F70CF8E842F928D8F322FF580BBD8A93DFFEEDA5281141359AA928F4D98FDB3D93E8B690C80D37DED11C38714054FADDC8595E2950FA43F673F65C2009F58C7F1F9EA7D06E68E88E69D83E1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     LimitAmount:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '1' },
     Memos: [ [Object] ],
     RelationType: 1,
     Sequence: 977,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     Target: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
     TransactionType: 'RelationSet',
     TxnSignature:
      '3044022046585A2EA1D1E21D1DF797D5614FC4CA2BE549C2235B43BE75C896DCFB6CE65902203230FFE3A4B17B29E9EFE29F70CF8E842F928D8F322FF580BBD8A93DFFEEDA52',
     hash:
      '17B58B5BA0109327ABA5C571C7370E7E9EA3A714D1F3F9EB959D51702F3B19A1' } }
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
### <a name="accountSetTx"></a> 4.17 设置账号属性 ------待完善
#### 首先通过buildAccountSetTx方法返回一个Transaction对象，然后通过submitPromise()方法设置账号属性。目前支持的三类:`property`、`delegate` 、`signer`。property 用于设置账号一般属性;delegate用于某账号设置委托帐户;signer用于设置签名。
#### <a name="accountSetBuild"></a>4.17.1 创建属性对象
##### 方法:remote.buildAccountSetTx({});
##### 参数:
|参数|类型|说明|
|----|----|---:|
|type|String|属性种类|
|account|String|设置属性的源账号|
|set_flag|String|属性编号|
##### 返回:Transaction对象
#### <a name="accountSetSubmit"></a>4.17.2 属性设置
##### 方法:tx.submitPromise(secret, memo)
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
##### 返回: Promise
#### 设置属性完整例子
```javascript
var japi = require('swtc-api')
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
let options = {
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    type:'property'
};
var tx = remote.buildAccountSetTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120003220000000024000003D26840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100C5D9C036DB7C6935BF0262C4DB02A10EADCDD9951E6F65B0F8C6F4F6990C3AA80220428AE8BFEB2C460EFDA37955ADD1DF8D19F80CC2783CB9DA11BAB0FE3A6E7E8181141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     Sequence: 978,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'AccountSet',
     TxnSignature:
      '3045022100C5D9C036DB7C6935BF0262C4DB02A10EADCDD9951E6F65B0F8C6F4F6990C3AA80220428AE8BFEB2C460EFDA37955ADD1DF8D19F80CC2783CB9DA11BAB0FE3A6E7E81',
     hash:
      'AE6395C75582077ACDE786FA2001360D9843BBF972163B7C7CDCB0BD8FB472FE' } }
```
### <a name="offerCreate"></a> 4.18 挂单
#### 首先通过buildOfferCreateTx方法返回一个Transaction对象，然后通过通过.submitPromise()方法提交挂单。
#### <a name="offerCreateBuild"></a> 4.18.1 创建挂单对象
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
#### <a name="offerCreateSubmit"></a> 4.18.2 提交挂单
##### 方法:tx.submitPromise(secret, memo)
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
##### 返回: Promise
#### 设置属性完整例子
#### 挂单完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
let options = {
    type: 'Sell',
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    taker_pays: remote.makeAmount(0.01, 'CNY'),
    taker_gets: remote.makeAmount(1)
};
let tx = remote.buildOfferCreateTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C').then(console.log).catch(console.error)
```
##### 返回结果:
```javascript
> { success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120007220008000024000003D364D4038D7EA4C68000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED326540000000000F42406840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574463044022038C287B02FB21AC10ADFCBC2EE5EDCFADE12F840C28AFA4E793F273FDC8141A90220058864F25986C8B0595A5FA327A919B72937971061FB2113A7B1313AB9E3FAEE81141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 524288,
     Sequence: 979,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TakerGets: '1000000',
     TakerPays:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '0.01' },
     TransactionType: 'OfferCreate',
     TxnSignature:
      '3044022038C287B02FB21AC10ADFCBC2EE5EDCFADE12F840C28AFA4E793F273FDC8141A90220058864F25986C8B0595A5FA327A919B72937971061FB2113A7B1313AB9E3FAEE',
     hash:
      '796D47FBD3001FF7B196E752A123ED79505E234F9FE511C44B2E592CDABE8B31' } }
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
### <a name="offerCancel"></a> 4.19 取消挂单
#### 首先通过buildOfferCancelTx方法返回一个Transaction对象，然后通过submitPromise()方法取消挂单。
#### 4.19.1 <a name="offerCancelBuild"></a> 创建取消挂单对象
#### 方法:remote.buildOfferCancelTx({});
#### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String||挂单方账号|
|sequence|Integer|取消的单子号|
#### 返回:Transaction对象
#### <a name="offerCancelSubmit"></a> 4.19.2 取消挂单
##### 方法:tx.submitPromise(secret, memo)
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
##### 返回: Promise
#### 挂单完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com:5020', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
let options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', sequence: 979};
let tx = remote.buildOfferCancelTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '120008220000000024000003D42019000003D36840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100BA4DBA1D47DEE5C0A539479D1B24D966368187311D3B0D7FC2B6A32F135A422102206E16D95F4051412C87A04800BCF2CEE813BB82A62B5D9B0CAC933068ADF9B59C81141359AA928F4D98FDB3D93E8B690C80D37DED11C3',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Fee: '10000',
     Flags: 0,
     OfferSequence: 979,
     Sequence: 980,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'OfferCancel',
     TxnSignature:
      '3045022100BA4DBA1D47DEE5C0A539479D1B24D966368187311D3B0D7FC2B6A32F135A422102206E16D95F4051412C87A04800BCF2CEE813BB82A62B5D9B0CAC933068ADF9B59C',
     hash:
      'B454B0282F30E9B18F550C18878B248DCD4ADCE417C8C61D0457F8EB3BCB4869' } }
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
### <a name="contractDeploy"></a>4.20 部署合约 lua
#### 首先通过buildContractDeployTx (或者deployContractTx)方法返回一个Transaction对象，然后通过submitPromise()方法部署合约。
#### <a name="contractDeployBuild"></a>4.20.1 创建部署合约对象
##### 方法:remote.buildContractDeployTx({});
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
#### <a name="contractDeploySubmit"></a> 4.20.2 部署合约
##### 方法:tx.submitPromise(secret, memo);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|备注信息|
#### 部署合约完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var utils = Remote.utils;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
var options = {
    account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    amount: 10,
    payload: utils.stringToHex('result={}; function Init(t) result=scGetAccountBalance(t) return result end; function foo(t) result=scGetAccountBalance(t) return result end;'),
    params: ['jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz']
};
var tx = remote.buildContractDeployTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
{ success: true,
  status_code: '0',
  ContractState: 'jNnyPvw4Gu4HycKAUwhtw82p3wk1pYKYPE',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '12001E220000000024000003D52026000000006140000000009896806840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100F558E6571C5F4217E3871C5D791B895C910E57AEC6175CE7B70E490A2180EE9B0220508C847807079DA2BBD92A8B26AE81B1C2608C2D3E0F929B8BEFE3DFE91865F970108D726573756C743D7B7D3B2066756E6374696F6E20496E697428742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B2066756E6374696F6E20666F6F28742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B81141359AA928F4D98FDB3D93E8B690C80D37DED11C3FEEF7013226A706D4B456D32735565766670466A533751486454385378375A476F4558544A417AE1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Amount: '10000000',
     Args: [ [Object] ],
     Fee: '10000',
     Flags: 0,
     Method: 0,
     Payload:
      '726573756C743D7B7D3B2066756E6374696F6E20496E697428742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B2066756E6374696F6E20666F6F28742920726573756C743D73634765744163636F756E7442616C616E63652874292072657475726E20726573756C7420656E643B',
     Sequence: 981,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'ConfigContract',
     TxnSignature:
      '3045022100F558E6571C5F4217E3871C5D791B895C910E57AEC6175CE7B70E490A2180EE9B0220508C847807079DA2BBD92A8B26AE81B1C2608C2D3E0F929B8BEFE3DFE91865F9',
     hash:
      '7AFDF4925CA11E0DA1D249BC88A7DE29CE07CF11186660CDE40B850F616B138B' } }
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
### <a name="contractCall"></a> 4.21 执行合约 lua
#### 首先通过buildContractCallTx (或者callContractTx)方法返回一个Transaction对象，然后通过通过submitPromise()方法执行合约
#### <a name="contractCallBuild"></a> 4.21.1 创建执行合约对象
##### 方法:remote.buildContractCallTx({});
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
#### <a name="contractCallSubmit"></a> 4.21.2 执行合约
##### 方法:tx.submitPromise(secret, memo);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|留言|
#### 执行合约完整例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'});
var options = {account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz', destination: 'jNdpxLQbmMMf4ZVXjn3nb98xPYQ7EpEpTN',foo: 'foo',params: ['jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz']};
var tx = remote.buildContractCallTx(options);
tx.submitPromise('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C').then(console.log).catch(console.error)
```
#### 返回结果
```javascript
> { success: true,
  status_code: '0',
  ContractState: '10489759828',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message:
   'The transaction was applied. Only final in a validated ledger.',
  tx_blob:
   '12001E220000000024000003D62026000000016840000000000027107321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15744630440220552CC3A84A3D02D886F4E71A628B76A8FA616A8969886965658962047CF70CEC022024DCE5FFEC37E5BC0AD085F7363392CBAAF80E729BCE8E20B5CD030CA87D84AE701203666F6F81141359AA928F4D98FDB3D93E8B690C80D37DED11C383148F8A6014111019B6968A1D6DD2B159AA27304D8EFEEF7013226A706D4B456D32735565766670466A533751486454385378375A476F4558544A417AE1F1',
  tx_json:
   { Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
     Args: [ [Object] ],
     ContractMethod: '666F6F',
     Destination: 'jNnyPvw4Gu4HycKAUwhtw82p3wk1pYKYPE',
     Fee: '10000',
     Flags: 0,
     Method: 1,
     Sequence: 982,
     SigningPubKey:
      '029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15',
     TransactionType: 'ConfigContract',
     TxnSignature:
      '30440220552CC3A84A3D02D886F4E71A628B76A8FA616A8969886965658962047CF70CEC022024DCE5FFEC37E5BC0AD085F7363392CBAAF80E729BCE8E20B5CD030CA87D84AE',
     hash:
      'CA9B2CCDBB231B98CA3B69F81EB40F1D8D56807F3F3CFC0A0266B57D7F0AF6C8' } }
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
### <a name="buildBrokerageTx"></a> 4.22 设置挂单佣金
#### 首先通过buildBrokerageTx方法返回一个Transaction对象，然后通过submitPromise()方法设置平台手续费
#### 4.22.1 创建挂单佣金对象
##### 方法: remote.buildBrokerageTx({})
##### 参数:
|参数|类型|说明|
|----|----|---:|
|account|String|管理员账号|
|mol|Integer|分子(0和正整数)|
|den|Integer|分母(正整数)|
|app|Integer|应用来源序号(正整数)|
|amount|Object|币种对象|
|value|String|数量，这里只是占位，没有实际意义。|
|currency|String|货币种类|
|issuer|String|货币发行方|
#### 4.22.2 设置挂单佣金
##### 方法:tx.submitPromise(secret, memo);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|井通钱包私钥|
|memo|String|留言|
### <a name="initContract"></a>4.23 部署合约 Solidity版
#### 首先通过buildContractInitTx (或者initContract)方法返回一个Transaction对象，然后通过submitPromise()方法完成合约的部署
#### 4.23.1 创建合约部署对象
##### 方法:remote.initContract({});
##### 参数
|参数|类型|说明|
|----|----|---:|
|account|String|合约发布者|
|amount|Integer|手续费|
|payload|String|合约编译后的16进制字节码|
|abi|Array|合约abi|
|params|Array|可选，合约初始化参数|
##### 返回:Transaction对象
#### <a name="initContractSubmit"></a> 4.23.2 部署合约
##### 方法:tx.submitPromise(secret);
##### 参数: 密钥
|参数|类型|说明|
|----|----|---:|
|secret|String|合约发布者私钥|
##### 返回: Promise
#### 部署合约完整例子
```javascript
const japi = require("swtc-api");
var Remote = japi.Remote;
var remote = new Remote({
  server: "https://tapi.jingtum.com:5020",
  solidity: true
});
const v = {
  address: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
  secret: "ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C"
};
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"}],"name":"SWTBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
const payload = "60806040526012600260006101000a81548160ff021916908360ff16021790555034801561002c57600080fd5b50604051610c7e380380610c7e8339810180604052606081101561004f57600080fd5b8101908080519060200190929190805164010000000081111561007157600080fd5b8281019050602081018481111561008757600080fd5b81518560018202830111640100000000821117156100a457600080fd5b505092919060200180516401000000008111156100c057600080fd5b828101905060208101848111156100d657600080fd5b81518560018202830111640100000000821117156100f357600080fd5b5050929190505050600260009054906101000a900460ff1660ff16600a0a8302600381905550600354600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600090805190602001906101759291906101d6565b50806001908051906020019061018c9291906101d6565b5033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505061027b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061021757805160ff1916838001178555610245565b82800160010185558215610245579182015b82811115610244578251825591602001919060010190610229565b5b5090506102529190610256565b5090565b61027891905b8082111561027457600081600090555060010161025c565b5090565b90565b6109f48061028a6000396000f3fe6080604052600436106100ae576000357c01000000000000000000000000000000000000000000000000000000009004806370a082311161007657806370a082311461020e5780638da5cb5b1461027357806395d89b41146102ca578063a9059cbb1461035a578063dd62ed3e146103b5576100ae565b806306fdde03146100b357806318160ddd14610143578063313ce5671461016e5780633ccfd60b1461019f578063675c7ae6146101a9575b600080fd5b3480156100bf57600080fd5b506100c861043a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101085780820151818401526020810190506100ed565b50505050905090810190601f1680156101355780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014f57600080fd5b506101586104d8565b6040518082815260200191505060405180910390f35b34801561017a57600080fd5b506101836104de565b604051808260ff1660ff16815260200191505060405180910390f35b6101a76104f1565b005b3480156101b557600080fd5b506101f8600480360360208110156101cc57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105cf565b6040518082815260200191505060405180910390f35b34801561021a57600080fd5b5061025d6004803603602081101561023157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105f0565b6040518082815260200191505060405180910390f35b34801561027f57600080fd5b50610288610608565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102d657600080fd5b506102df61062e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561031f578082015181840152602081019050610304565b50505050905090810190601f16801561034c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561036657600080fd5b506103b36004803603604081101561037d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506106cc565b005b3480156103c157600080fd5b50610424600480360360408110156103d857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106db565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104d05780601f106104a5576101008083540402835291602001916104d0565b820191906000526020600020905b8154815290600101906020018083116104b357829003601f168201915b505050505081565b60035481565b600260009054906101000a900460ff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561054d57600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501580156105cc573d6000803e3d6000fd5b50565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b60056020528060005260406000206000915090505481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106c45780601f10610699576101008083540402835291602001916106c4565b820191906000526020600020905b8154815290600101906020018083116106a757829003601f168201915b505050505081565b6106d7338383610700565b5050565b6006602052816000526040600020602052806000526040600020600091509150505481565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561073c57600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561078a57600080fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540111151561081857600080fd5b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401905081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011415156109c257fe5b5050505056fea165627a7a72305820d122ff8ff7133c0852e95b8334f76d8f494b11ac94ac3c4b3409bad19f0d09340029"

let tx = remote.buildContractInitTx({
  account: v.address,
  amount: 10,
  payload,
  abi,
  params: [2000, "TestCurrency", "TEST1"]
})
tx.submitPromise(v.secret).then(console.log).catch(console.error)
```
#### 输出
```javascript
```
### <a name="invokeContract"></a>4.24 调用合约(Solidity版)
#### 首先通过buildContractInvokeTx (或者invokeContract)方法返回一个Transaction对象，然后通过submitPromise()方法完成合约的调用。 
#### 4.24.1 创建合约调用对象
##### 方法:remote.buildContractInvokeTx({})
##### 参数
|参数|类型|说明|
|----|----|---:|
|account|String|合约发布者|
|destination|String|合约帐号|
|abi|Array|合约abi|
|func|String|合约函数名及参数|
##### 返回:Transaction对象
#### <a name="invokeContractSubmit"></a> 4.24.2 执行合约
##### 方法:tx.submitPromise(secret);
##### 参数:
|参数|类型|说明|
|----|----|---:|
|secret|String|合约执行者私钥|
##### 返回: Promise
##### 例子
```javascript
var japi = require('swtc-api');
var Remote = japi.Remote;
var remote = new Remote({server: 'https://tapi.jingtum.com', solidity: true});
const v = {
  address: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
  secret: "ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C"
};
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"}],"name":"SWTBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var destination = 'j3QhjEeyB2uje8HeyYKByRNqS3sYzH7Yuz'
let tx = remote.invokeContract({
	account: v.address,
    destination,
    abi,
    func: `transfer("${destination}", 5)`
})
tx.submitPromise(v.secret).then(console.log).catch(console.error)
```
##### 输出
```javascript
```
## <a name="localSign"></a>5 本地签名
## <a name="transaction"></a>6 交易信息
## <a name="errors"></a>7 错误信息
### 客户端错误 - ClientError
#### ClientError，此错误主要是客户端请求参数错误，包括井通地址格式不对，私钥格式不对，货币格式不对等以及根据每个接口提交的参数格式不对等导致的错误；
### 网络错误 - NetworkError
#### NetworkError，此错误主要是网络错误，包括链接井通网络没有连上，请求服务超时等；
### 交易错误 - Transaction Error
#### TransactionError，此错误主要是重复资源号的错误，即DuplicateTransactionError；
### 服务端错误 - ServerError
#### ServerError，此错误主要是后台程序错误，包括代码BUG、代码实现问题等；
|错误代码|说明|
|----|---:|
|0|success|
|1000|client error|
|1001|Invalid parameter: address|
|1002|Invalid parameter: secret|
|1003|Invalid parameter: currency|
|1004|Invalid parameter: issuer|
|1005|Invalid parameter: order|
|1006|Invalid parameter: order.type|
|1007|Invalid parameter: order.price|
|1008|Invalid parameter: order.sequence|
|1009|Invalid parameter: hash|
|1010|not an order transaction|
|1011|Transaction specified did not affect the given account|
|1012|Invalid parameter: base|
|1013|Invalid parameter: counter|
|1014|Invalid parameter: destination_address|
|1015|Invalid parameter: amount|
|1016|Invalid parameter: payment|
|1017|Invalid parameter: payment.source|
|1018|Invalid parameter: payment.destination|
|1019|Invalid parameter: payment.amount|
|1020|Invalid parameter: memos,it must be an array|
|1021|Invalid parameter: choice,it must be a string|
|1022|Invalid parameter: client_id,must be a number|
|1023|Invalid parameter: client_id, already exits|
|1024|Invalid parameter: choice, not exist|
|1025|Not a payment transaction|
|1026|Invalid parameter:results_per_page|
|1027|Invalid parameter:page|
|1028|Invalid parameter:results_per_page, it mast be a number and not less than 10|
|1029|Invalid parameter: order.pair|
|1030|Invalid parameter: order.amount|
|1031|Missing parameters|
|1032|Invalid parameter: method, it must be 0 or 1|
|1033|Invalid parameter: payload, it must be string|
|1034|Invalid parameter: amount,it must be a number greater than zero|
|1035|Invalid parameter: params,it must be an array|
|2000|Server error|
|3000|Transaction error|
|3001|Could not generate wallet|
|4000|Network error|
|4001|Remote is disconnected|
|4002|Time out|
|4003|Bad gateway|
## 9. <a name="erc20src"></a>erc20源码
```javascript
pragma solidity ^0.5.4;
contract TokenTest {
    string public name;
    string public symbol;
    uint8  public decimals = 18;  // decimals 可以有的小数点个数，最小的代币单位。18 是建议的默认值
    uint256 public totalSupply;
    address  payable public owner;
    // 用mapping保存每个地址对应的余额
    mapping (address => uint256) public balanceOf;
    // 存储对账号的控制
    mapping (address => mapping (address => uint256)) public allowance;
    /**
     * 初始化构造
     */
    constructor(uint256 initialSupply, string memory tokenName , string  memory tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // 供应的份额，份额跟最小的代币单位有关，份额 = 币数 * 10 ** decimals。
        balanceOf[msg.sender] = totalSupply;
        name = tokenName; // 代币名称
        symbol = tokenSymbol;  // 代币符号
        owner = msg.sender;
    }

    /**
     * 代币交易转移的内部实现
     */
    function _transfer(address   _from, address  _to, uint  _value) internal{
        // 确保目标地址不为0x0，因为0x0地址代表销毁
        require(_to != address(0x0));
        // 检查发送者余额
        require(balanceOf[_from] >= _value);
        // 确保转移为正数个
        require(balanceOf[_to] + _value > balanceOf[_to]);

        // 以下用来检查交易，
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;

        // 用assert来检查代码逻辑。
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }
    /**
     *  代币交易转移
     * 从自己（创建交易者）账号发送`_value`个代币到 `_to`账号
     * @param _to 接收者地址
     * @param _value 转移数额
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    function withdraw() payable public{
        require(msg.sender == owner);
        owner.transfer(address(this).balance);
    }
    function SWTBalance(address _from) public view returns (uint256)  {
        return _from.balance;
    }
}
```
## 10. erc721源码
