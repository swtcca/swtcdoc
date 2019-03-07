# Promise 和 Promisify

### swtc-lib 没有提供原生的Promise支持，但是我们可以使用工具来提供， 这个工具是 **bluebird**
1. 工作于 playground 目录
2. 安装 swtc-lib 和 bluebird
```bash
$ npm install swtc-lib
$ npm install bluebird
```
3. promisify
```javascript
const SWTCLIB = require('swtc-lib')
const BLUEBIRD = require('bluebird')
BLUEBIRD.promisifyAll(SWTCLIB)

const Remote = SWTCLIB.Remote
const remote = new Remote({server: 'ws://ts5.jingtum.com:5020'})
// 我们现在对于每个有回调的函数就拥有相应的Async函数, 最常见
remote.connectAsync()
	.then( server_info => {
			console.log(server_info)
			remote.disconnect()
		}
	)
	.catch (error => console.log(error))
```
