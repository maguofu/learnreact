const config = {
  API: {
    GET_MENU: 'assistantmis/index/index'
  }
}


if (process.env.NODE_ENV !== 'production') {
  console.log(77777777)
  Object.assign(config, {

    // 本地mock配置
    mock: {
      host: 'http://172.16.10.210',
      // host: 'http://test10.zuoyebang.cc',
      // host: 'http://172.17.120.120',
      port: 888
      // port: 80
    }
  });
}

export default config;