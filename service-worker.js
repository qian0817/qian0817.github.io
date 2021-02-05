/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2020/07/20/java使用自定义注解/index.html","e9a8aa145f1e43d0fc4840c2cbf7f032"],["/2020/08/26/CAP，ACID和BASE理论/index.html","d30d3270879fc8edf2b9d4b02355bb41"],["/2020/08/31/TCP的拥塞控制算法/BIC.png","0271605c533eac06372043a4007260e2"],["/2020/08/31/TCP的拥塞控制算法/CUBIC.png","9493e9af14fbd7971e077c45c3b8ddc4"],["/2020/08/31/TCP的拥塞控制算法/Reno.png","2c5f15bd2f64d11d3ffe561582a59a55"],["/2020/08/31/TCP的拥塞控制算法/Tahoe.png","2008b2c664e6d68381331d83a3ef08d2"],["/2020/08/31/TCP的拥塞控制算法/index.html","211d956c40845195fde593ccf3713953"],["/2020/09/01/JVM如何加载Java类/index.html","65f5c567c14dd0ce0d125eda5a287728"],["/2020/09/01/MySQL的日志系统/index.html","007f49faf6930e199735ece6c69fa1b1"],["/2020/09/03/设计模式之创建型模式/index.html","0d8559dbbff6e0a6089b58a5b2c72bd5"],["/2020/09/04/设计模式之结构型模式/index.html","3943f8bc603215e828fd3c7dcd2381eb"],["/2020/09/05/Redis中的持久化机制/index.html","4f407a03fe8d25da29801b9f19a76633"],["/2020/09/08/Redis中的数据结构/index.html","2844d42fc7cfb2787199a6196b000575"],["/2020/09/09/Redis中的对象系统/embstr编码与raw编码.jpg","ce83d1346c9642fdbbf5ffbe701bfbe3"],["/2020/09/09/Redis中的对象系统/index.html","11c2a14d836fe6d0dfc97e0625586263"],["/2020/09/09/Redis如何删除过期键/index.html","e04a2c2e6a5f3e5aa980ca493628554e"],["/2020/09/09/设计模式之行为型模式/index.html","082e210cf9aebfb4e8e09a9cbfbe51fc"],["/2020/09/10/Redis中的客户端与服务器实现/index.html","0be1ce5634bdbafddf2fe6ba5b6a206e"],["/2020/09/11/Redis实现主从复制原理/index.html","64ad4082b3ff6733db19f825cdf8bbc1"],["/2020/09/27/Redis中的哨兵机制/index.html","d12603cca474be208e4acf0112f78ca5"],["/2020/10/03/JVM中的垃圾回收算法/index.html","cc77d78753337a86c727df7c2f9927ee"],["/2020/11/21/操作系统内存管理/index.html","2f5ce2b3fddab1416a5e03b359f92a60"],["/2020/11/21/操作系统内存管理/分段.png","594c4b49b302f562640721c34023a812"],["/2020/11/21/进程线程与纤程/index.html","e952c7fed338fe45b09a992fcaa97d13"],["/2020/11/21/进程线程与纤程/进程上下文切换.png","a767896f98b740db11ed1d524ead091a"],["/2020/11/21/进程线程与纤程/进程内存空间布局.png","9bd8ab919d4aafa7fe708f7b74a1a4e8"],["/2020/11/21/进程线程与纤程/进程状态.png","26bcd464352e666b22b8378dd07cd1ed"],["/2020/11/25/操作系统调度/index.html","2dcfea1e2138c434ed77f95256ff6560"],["/2020/11/25/操作系统调度/基于进程调度的进程转换.png","b86f17b4047ed5e00f92f131fcc4cd73"],["/2020/12/03/进程间通信方式/index.html","74f528f75b83abdb2a0a3ece90e0811a"],["/2020/12/05/操作系统同步原语/index.html","580f70ed90103ee94eba604da56e13b5"],["/2020/12/10/操作系统文件管理/index.html","69e9bb7ad95dde70fdcdd4d2279f08b8"],["/2020/12/10/操作系统文件管理/inode数据索引.png","868ba3c3a4c78940eb539a9236de172b"],["/2021/01/26/kafka基本概念/index.html","478059cf0387834e526be6da5360e110"],["/2021/01/28/netty常用概念/index.html","fcf12f2aa32607cb9a57662af43b5d73"],["/2021/01/30/HTTP各版本特性/index.html","b6fd4f670105b1346384e59aa52b3f8a"],["/2021/02/01/Kubernetes调度器/index.html","d54329d3c61c91360aa21f18cc7ba555"],["/2021/02/01/Kubernetes调度器/调度机制.jpg","bb95a7d4962c95d703f7c69caf53ca53"],["/2021/02/03/Kubernetes架构/index.html","8d2cca1f116a1936f33d8f56af7e53f1"],["/2021/02/05/JVM锁优化/index.html","337f5d3a358a804ae786f68f1871bc90"],["/archives/2020/07/index.html","c894c91a20f1ae0cac41525cf4199b0d"],["/archives/2020/08/index.html","9587dc91073546aef0493fcd360cf876"],["/archives/2020/09/index.html","24a041f6dd0140dd2f063bbe17c09ef9"],["/archives/2020/09/page/2/index.html","94d9982d267899345b89f3a161a5dbb2"],["/archives/2020/10/index.html","d45b5ff4d164118cf9786fd3f9c5632e"],["/archives/2020/11/index.html","0d3a6d31378a9978cb79b0b483aa3eba"],["/archives/2020/12/index.html","6027cbe2ed320487fb2fdf48d6ae7bf0"],["/archives/2020/index.html","5e6ad0fa7b47fb74d473acade73b30b4"],["/archives/2020/page/2/index.html","d887dd50235e5ba106c97ecb6dc6d64b"],["/archives/2020/page/3/index.html","5767a77a64ed6abeb01e751df220df38"],["/archives/2021/01/index.html","5916c5eee91671d45f6c650426d94f75"],["/archives/2021/02/index.html","9432866cff8d5d1394b9b336f4c2a501"],["/archives/2021/index.html","6bd29576735b32cdffbcd54611d306f3"],["/archives/index.html","19fca82bf71aef708315deda3c4f1289"],["/archives/page/2/index.html","f23d2cab8ee30f1c749d20030a47e7db"],["/archives/page/3/index.html","4ec5998dd602cd4de150118c57e4dc61"],["/categories/JVM/index.html","15411c1f3e632eb844d79cb89481cc4e"],["/categories/Java/index.html","c168e4ca5f3d570becc1c54a0685ea81"],["/categories/Kafka/index.html","446da67f30fb7365d3e13ce24a223053"],["/categories/Kubernetes/index.html","440440c31bf6c12fac0b58bb89050333"],["/categories/Netty/index.html","4cc3243f3d5bc715f486c002d354ee23"],["/categories/Redis/index.html","3b4234220e10dc93bedba371a92b5f05"],["/categories/index.html","7b1ddebaa3ac6195caf167593c95c72f"],["/categories/分布式/index.html","2e61e73e1ade6b872151b2eac2e5f02f"],["/categories/操作系统/index.html","e075e3476b766eb80f0261aa70d5f7d9"],["/categories/数据库/index.html","be0bdac86447690083e2a3988f374993"],["/categories/网络/index.html","5163106bcb45a2872af02e7bda300af8"],["/categories/设计模式/index.html","7e285f9c1eb1b1b745bcb3aa677dab15"],["/css/main.css","e961889ca8946c61186638fd71f38f82"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/index.html","6c2d2f4f28be3793e0bdca36423549a7"],["/js/local-search.js","3607cdfc2ac57992db02aa090b3cc167"],["/js/motion.js","e8073e03493feb145528c4bdbe613d70"],["/js/next-boot.js","473091bdcc0a3d626c9e119765cd5917"],["/js/schemes/muse.js","160b26ee0326bfba83d6d51988716b08"],["/js/utils.js","766c5591ff85631b6b962ae3d57ae903"],["/lib/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/lib/font-awesome/css/all.min.css","76cb46c10b6c0293433b371bae2414b2"],["/lib/font-awesome/webfonts/fa-brands-400.woff2","a06da7f0950f9dd366fc9db9d56d618a"],["/lib/font-awesome/webfonts/fa-regular-400.woff2","c20b5b7362d8d7bb7eddf94344ace33e"],["/lib/font-awesome/webfonts/fa-solid-900.woff2","b15db15f746f29ffa02638cb455b8ec0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/tags/HTTP/index.html","7b669fce9ff3a2ae82ffc4d0a1f68079"],["/tags/JVM/index.html","dafa706b31e99e6a7827e43f1daf6021"],["/tags/Java/index.html","fa3c349d9f0f8e264a37a860b07e8f91"],["/tags/Kafka/index.html","41e102e97067b3cdafecd04822538e36"],["/tags/Kubernetes/index.html","acb83ed35da70f8066b143b72afd7777"],["/tags/MYSQL/index.html","ec93f745b73f4d811bd03fb5e19f827b"],["/tags/Netty/index.html","76529b46dcd80053f48b52767a016a48"],["/tags/Redis/index.html","53730e7270e47d95dbdc636850544824"],["/tags/TCP/index.html","7e9a15174658d17b2d68436ce5a8d93a"],["/tags/index.html","a797392a38f619f8ee25b72b28313685"],["/tags/内存/index.html","d824e0ae958cfb9e94cda18ae89f50fd"],["/tags/分布式/index.html","ad63805497d7c5aac9a721eb1a07eac9"],["/tags/协程/index.html","57eaa6fa1deec2ccd8cb72355a216a67"],["/tags/微服务/index.html","c91b0aa762d0b3cea40d1025ff47b8ba"],["/tags/拥塞控制/index.html","eb87684c3f0575918cbca619f14a54ef"],["/tags/持久化/index.html","e227aadfa7e9cfa8334d2e8859d9a6d0"],["/tags/操作系统/index.html","8458ab9fdb783ad6b97f31bcb209ab70"],["/tags/数据库/index.html","f1530f7f6bff3724ea34cc61c9750ef8"],["/tags/数据结构/index.html","6afc01645bac1c0920b385e731de70cf"],["/tags/日志/index.html","68c7b36507e93accf2680cfcbc32d209"],["/tags/注解/index.html","efbc1e2896fdbbe7d18cd2d40ae0da47"],["/tags/线程/index.html","c909ef0f18da1a1af7fff65fada6fb62"],["/tags/网络/index.html","7105459fe45cdf1c293a45015ae83055"],["/tags/设计模式/index.html","9565a1793913594c397f7fea102b71c2"],["/tags/进程/index.html","1c3562d0a0e3518497a46cadaf7da562"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







