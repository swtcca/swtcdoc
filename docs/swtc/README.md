# @swtc/lib @swtc/x-lib 增强

## [应用实例](../examples/)

## 目录
> ### 无差别联盟链支持
> ### 安全性
> ### 强兼容
> ### 现代性
> ### class实现
> ### typescript实现
> ### 格式化代码
> ### 模块化
> ### travis集成
> ### 完善测试
> ### CDN

## 内容
### 扩展
  - 实现了ApiRemote(@swtc/api) - 目前只支持井通
  - 默认使用 https://swtcproxy.swtclib.ca
### 安全
  - 本地签名
  - 密钥不出本机
### 无差别联盟链支持
  - 井通
  - 商链
  - ...
### 强兼容
  - 所有包确保零配置webpack和browserify兼容
  - 可以用于网络应用 桌面应用 终端应用 移动应用
### 现代性
  - 原生Promise支持
  - Remote.connectPromise()
  - Request.submitPromise()
  - Transaction.signPromise()
  - Transaction.submitPromise()
  - ApiRemote.allmethods()
### class实现
  - x-lib
  - ApiRemote
  - Server
  - Remote
  - Request
  - Transaction
    - 签名实现
	- 提交实现
  - Wallet (swtc-factory)
    - 支持swtc bitcoin ripple bwt call stm
### typescript实现
  - x-lib
  - 编辑器帮助提示
  - ApiRemote
  - Server
  - Remote
  - Request
  - Transaction
  - Wallet
### 格式化代码
  - prettier格式化
  - eslint / tslint
### 模块化
```bash
$ npm list | grep swtc | grep -v deduped
├─┬ @swtc/lib@1.0.14
│ ├─┬ @swtc/address-codec@1.0.12
│ ├── @swtc/common@1.0.18
│ ├─┬ @swtc/keypairs@1.0.15
│ ├─┬ @swtc/serializer@1.0.14
│ ├─┬ @swtc/transaction@1.0.17
│ ├─┬ @swtc/utils@1.0.13
│ ├─┬ @swtc/wallet@1.0.16
└─┬ @swtc/x-lib@1.0.13
```
### travis集成
  - 代码提交自动测试
### 完善测试
  - 添加新功能测试
### CDN
  - unpkg
  - jsdelivr

## 方法汇总
### Wallet
![Wallet](../../images/m-wallet.png)
### Transaction
![Transaction](../../images/m-transaction.png)
### Remote
![Remote](../../images/m-remote.png)
### ApiRemote
![ApiRemote](../../images/m-apiremote.png)
