# 井通科技

## jingtum-lib接口说明
V2.0.2

### 版本历史
|版本|简介|作者|日期|
|-----|--------|-----------|-------------|
|1.0.0|初版主要接口说明|吴丹|2018/2/28|
|2.0.0|整体接口说明|吴丹|2018/3/2|
|2.0.1|Remote类增加返回结果说明|吴丹|2018/3/15|
|2.0.2|Remote类增加合约方法|吴丹|2018/5/31|

### 目录
1. [安装](#installation)
2. [项目文件结构](#structure)
3. [创建钱包](#wallet)
4. [REMOTE类](#remote)
5. [REQUEST类](#request)
6. [TRANSACTION类](#transaction)
7. [底层常见错误附录](#errors)

### <a name="installation"></a>安装
1. 安装官方库
```bash
npm install --save jingtum-lib
```
2. 安装社区库
```bash
npm install --save swtc-lib
```

### <a name="structure"></a>项目文件结构
#### jingtum-lib库基于ws协议跟底层交互，其中ws封装到Server类中，Server类是一个内部类，不对 外开放;Server类封装在Remote类中，Remote类提供对外访问接口并可创建两类对象:Get方 式请求的Request对象和Post方式请求的Transaction对象，这两类对象都通过submit()方法提交 数据到底层。
文件结构图如下
![structure](./structure.png)

### <a name="wallet"></a>创建钱包
> #### 首先引入jingtum-lib库的Wallet对象，然后使用以下两种方法创建钱包
> #### 方法1: Wallet.generate()
> #### 方法2: Wallet.fromSecret(secret);
#### 参数:
 
|参数|类型|说明|
|-----|--------|-----------|
|secret|String|井通钱包私钥|

```javascript
//创建Wallet对象
var jlib = require('jingtum-lib'); var Wallet = jlib.Wallet;
//方式一
var w1 = Wallet.generate();
console.log(w1);
//方式二
var w2 = Wallet.fromSecret('ss2A7yahPhoduQjmG7z9BHu3uReDk');
console.log(w2);
```
#### 返回的结果信息:
||参数|类型|说明|
|-|-----|--------|-----------:|
||secret|String|井通钱包私钥|
||address|String|井通钱包地址|

### <a name="remote"></a>REMOTE类
### <a name="request"></a>REQUEST类
### <a name="transaction"></a>TRANSACTION类
### <a name="errors"></a>底层常见错误附录

