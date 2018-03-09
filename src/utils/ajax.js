import {
  ajax,
  Deferred
} from 'jquery';
import config from '../../api/api.config';


/**
 * 格式化query string, 并拼接到url上
 *
 * @param {string} url, 请求url,
 * @param {Object} data, 需要拼接到url上的数据
 * @return {string}, 拼接后的url
 */
function formatData(url, data) {
  var arr = [];
  Object.keys(data).forEach(function (key) {
    var str = key + '=' + data[key];
    arr.push(str);
  });

  if (arr.length) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + arr.join('&');
  }
  return url;
}

/**
 * 处理ajax的配置项
 *
 * @param {Object} data, 请求数据,
 * @param {Object} opts, 需要处理的ajax的配置项
 * @return {Object}, 处理后的配置项
 */
function transformConfig(data, opts) {
  if (process.env.NODE_ENV !== 'production') {
    opts.url = `${config.mock.host}:${config.mock.port}/${opts.api}`;
  } else {
    opts.url = `/${opts.api}`;
  }

  delete opts.api;

  // GET请求并且有发送请求数据，拼接url
  if (opts.type === "GET" && Object.keys(data).length) {
    opts.url = formatData(opts.url, data);
  }

  // 非GET请求，并且有发送请求数据，添加到配置项中
  else if (opts.type !== "GET" && Object.keys(data).length) {
    // 仍然在使用表单数据
    // opts.data = typeof data === 'string'
    //   ? data
    //   : JSON.stringify(data);
    opts.data = data;
  }

  return opts;
}

/**
 * 发送ajax
 *
 * @param {string} api, 请求路径,
 * @param {Object} data, 请求数据
 * @return {Deferred}, dfd
 */
export default function sendAjax(api, data, options) {
  var dfd = Deferred();
  data = data || {};
  if (!api) {
    return dfd;
  }

  var opts = {
    api: api,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    timeout: 10000,
    cache: false
  };

  Object.assign(opts, options);

  // 处理配置项
  var config = transformConfig(data, opts);
  console.log(config.url);
  var ajaxSetting = {
    url: config.url,
    type: config.type,
    dataType: config.dataType
    // contentType: config.contentType
    // timeout: config.timeout,
    // cache: config.cache
  };

  if (config.data) {
    ajaxSetting.data = config.data;
  }

  ajaxSetting.success = function (data) {
    if (data.errNo === 0) {
      dfd.resolve(data.data)
    } else {
      dfd.reject(data);
    }
  };

  ajaxSetting.error = function (request, status, err) {
    dfd.reject({
      errStr: '请求失败'
    });
  };

  ajax(ajaxSetting);

  return dfd;
}



/**
 * GET
 *
 * @param {string} api, 请求路径,
 * @param {Object} data, 请求数据
 * @param {Object} options, 配置项
 * @return {Deferred}, dfd
 */
export function get(api, data, options) {
  var opts = {
    type: 'GET'
  };
  Object.assign(opts, options);
  return sendAjax(api, data, opts);
}

/**
 * POST
 *
 * @param {string} api, 请求路径,
 * @param {Object} data, 请求数据
 * @param {Object} options, 配置项
 * @return {Deferred}, dfd
 */
export function post(api, data, options) {
  var opts = {
    type: 'POST'
  };
  Object.assign(opts, options);
  return sendAjax(api, data, opts);
}