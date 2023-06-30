# WebRTC Demo

一个WebRTC的Demo, 支持视频, 音频, 仅点对点

包含一个node服务端脚本完成信令交互

使用 file 协议或http协议访问index.html, 并使用hash表示用户身份

```
// 就像这样
file://D:/user/webrtc_demo/index.html#1001
```

在输入框填写被叫号码, #1001, 需要带#, 可以使用window.location.hash, 查看被叫hash

被叫收到呼叫之后点击应答, 开始视频通话

![图片描述](./ex.png "图片描述")