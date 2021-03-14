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

var precacheConfig = [["/2020/07/20/java使用自定义注解/index.html","2395447064d7818f755665a2f4030dad"],["/2020/08/26/CAP，ACID和BASE理论/index.html","0db698a786d032d3cab31df2c24fe9e3"],["/2020/08/31/TCP的拥塞控制算法/BIC.png","0271605c533eac06372043a4007260e2"],["/2020/08/31/TCP的拥塞控制算法/CUBIC.png","9493e9af14fbd7971e077c45c3b8ddc4"],["/2020/08/31/TCP的拥塞控制算法/Reno.png","2c5f15bd2f64d11d3ffe561582a59a55"],["/2020/08/31/TCP的拥塞控制算法/Tahoe.png","2008b2c664e6d68381331d83a3ef08d2"],["/2020/08/31/TCP的拥塞控制算法/index.html","55125eb3851cbadb39d05eb97f1ac519"],["/2020/09/01/JVM如何加载Java类/index.html","d1445c449f01617bfe40fbdae13a7327"],["/2020/09/01/MySQL的日志系统/index.html","3575dd50ac78bc781ae31a12f09936ae"],["/2020/09/03/设计模式之创建型模式/index.html","afe98e2e023aea1122ead459ceca3bc1"],["/2020/09/04/设计模式之结构型模式/index.html","68bdb5d9d769f7205a61c73dc4459b1b"],["/2020/09/05/Redis中的持久化机制/index.html","6ff7d20e8ad14eb8281405ef230a8b52"],["/2020/09/08/Redis中的数据结构/index.html","e5a2b5c4729c1cdd612db17054fc5dd8"],["/2020/09/09/Redis中的对象系统/embstr编码与raw编码.jpg","ce83d1346c9642fdbbf5ffbe701bfbe3"],["/2020/09/09/Redis中的对象系统/index.html","0db5b75c8dfa93052b915777a57497df"],["/2020/09/09/Redis如何删除过期键/index.html","ea23ef17b61ef6a9acb982901eb332b3"],["/2020/09/09/设计模式之行为型模式/index.html","b021406ff0c92bfd5b7a3f9f1a1e5f74"],["/2020/09/10/Redis中的客户端与服务器实现/index.html","088c66b527b4765a4869229eaba4acff"],["/2020/09/11/Redis实现主从复制原理/index.html","903b8464eec0a9edeeae690ccd1bc2ab"],["/2020/09/27/Redis中的哨兵机制/index.html","96cc111bdf915baffac5c9d507f2259e"],["/2020/10/03/JVM中的垃圾回收算法/index.html","47df0b2578c620851b9172c916942f72"],["/2020/11/21/操作系统内存管理/index.html","5893109843d3a1aa23c6f7c98db2b0bb"],["/2020/11/21/操作系统内存管理/分段.png","594c4b49b302f562640721c34023a812"],["/2020/11/21/进程线程与纤程/index.html","705b94f3743b00b7b8703f96ddde65fd"],["/2020/11/21/进程线程与纤程/进程上下文切换.png","a767896f98b740db11ed1d524ead091a"],["/2020/11/21/进程线程与纤程/进程内存空间布局.png","9bd8ab919d4aafa7fe708f7b74a1a4e8"],["/2020/11/21/进程线程与纤程/进程状态.png","26bcd464352e666b22b8378dd07cd1ed"],["/2020/11/25/操作系统调度/index.html","1a82be0776f3ca81403712a2a170cefc"],["/2020/11/25/操作系统调度/基于进程调度的进程转换.png","b86f17b4047ed5e00f92f131fcc4cd73"],["/2020/12/03/进程间通信方式/index.html","c6100e022c9219e693aa48bc2eaedd44"],["/2020/12/05/操作系统同步原语/index.html","fd6324229e01d2af113a5a7feac78549"],["/2020/12/10/操作系统文件管理/index.html","4b8d5625a1a02f84c0fb399a7067aadb"],["/2020/12/10/操作系统文件管理/inode数据索引.png","868ba3c3a4c78940eb539a9236de172b"],["/2021/01/26/kafka基本概念/index.html","34e87f34d4320100b1b36b51d4617d95"],["/2021/01/28/netty常用概念/index.html","122427b9c774f56c2963a294fbcd0bc5"],["/2021/01/30/HTTP各版本特性/index.html","4dcd3db245a32ba3296a3a338a7e06f8"],["/2021/02/01/Kubernetes调度器/index.html","68be0f820a54c5ed41a693b4b0923a8c"],["/2021/02/01/Kubernetes调度器/调度机制.jpg","bb95a7d4962c95d703f7c69caf53ca53"],["/2021/02/03/Kubernetes架构/index.html","f155d820d921eb5bfa6c286efd0ba93a"],["/2021/02/05/JVM锁优化/index.html","61dcd75bb3bac06fb6b7721721b83604"],["/2021/02/09/Kubernetes网络实现/Calico IPIP.jpg","4dd9ad6415caf68da81562d9542049c9"],["/2021/02/09/Kubernetes网络实现/Calico.jpg","8db6dee96c4242738ae2878e58cecd1b"],["/2021/02/09/Kubernetes网络实现/Flannel UDP.jpg","8332564c0547bf46d1fbba2a1e0e166c"],["/2021/02/09/Kubernetes网络实现/Flannel XVLAN.jpg","03185fab251a833fef7ed6665d5049f5"],["/2021/02/09/Kubernetes网络实现/Flannel host-gw.png","3d8b08411eeb49be2658eb4352206d25"],["/2021/02/09/Kubernetes网络实现/index.html","e3683f2cc874d626b5aa71fc222f5107"],["/2021/02/10/Java内存区域/index.html","02d0b6fb217b3c3032c2f079ae960ada"],["/2021/02/10/分布式一致性算法/index.html","2fede20e7ef3fe3ad5d28151c30a8d1b"],["/2021/02/18/Docker实现原理/index.html","5f09d3fcff4c5c534a7f0bb75bfea8fc"],["/2021/03/14/kubernetes核心数据结构/index.html","54b363adb6f26df68d11947ca2664263"],["/archives/2020/07/index.html","9ae25fc081b48d0a2ef8a5a8a0291a36"],["/archives/2020/08/index.html","14aad016b7e061d5fb47f7d9210f6903"],["/archives/2020/09/index.html","8ed0f6ceb674697a59d3d144cd3956fc"],["/archives/2020/09/page/2/index.html","8b20fc114d44ce68d79dcd6216b65fba"],["/archives/2020/10/index.html","7acac7126bc8314f64d2d334d05a9acb"],["/archives/2020/11/index.html","1c655e22be0fa5e9d6864665928b2f95"],["/archives/2020/12/index.html","a53e28997a21557bfaeb9cc9a083f6ac"],["/archives/2020/index.html","f1adb45d0bffda50500e9d10688c6f2d"],["/archives/2020/page/2/index.html","5635bad413fac2ad3ce8220880ec6862"],["/archives/2020/page/3/index.html","4661e3bf284708e697b13628db47702c"],["/archives/2021/01/index.html","bbd433b0f961d4d9ae91e291cdf7f95b"],["/archives/2021/02/index.html","de57c0dd33f1d41a371baa3544458750"],["/archives/2021/03/index.html","7507c6f4e08054c0d8e69589febe34ac"],["/archives/2021/index.html","67aaa8cc0d7971d5c153d79a2f3ea509"],["/archives/2021/page/2/index.html","797adabe805ca0c27f76a75b46c9a2ca"],["/archives/index.html","0545a109d729a650901b7beb3dcd2e63"],["/archives/page/2/index.html","81e2ab772096e81cf583efc9adb5f074"],["/archives/page/3/index.html","a5b585e5f8e8299f82c811b0db2f8748"],["/archives/page/4/index.html","19b15750beae2e9375faa0319e59b9c7"],["/categories/Docker/index.html","62122ad631ee0b96af19d0c1529642e4"],["/categories/JVM/index.html","1ed50c7b3f79203480e6faaf2dfbc5e4"],["/categories/Java/index.html","29519169ead460d41f1ce9540eb7be8f"],["/categories/Kafka/index.html","8e2ff3a61168ce79fdf8a3c135bfa8ec"],["/categories/Kubernetes/index.html","b80752dda09003da6e938d53ceb7c278"],["/categories/Netty/index.html","2a5036b88bde22f216c626482e754b7e"],["/categories/Redis/index.html","74534ec04f8fbc944680eca735790f44"],["/categories/index.html","23439d6ff12bbafdb6b800f651897ecd"],["/categories/分布式/index.html","0f3c8db9d378cb369fa13001fba848e4"],["/categories/操作系统/index.html","f7d40bec5d2becad5a257c0a2da6ba21"],["/categories/数据库/index.html","8b72ca13067392a0cb878f5ab2af248d"],["/categories/网络/index.html","dc3a8bfe9763997d39fa45ca78b88dbf"],["/categories/设计模式/index.html","da3f60bef10ca305082ecf7d3bc05759"],["/css/main.css","b4567edefbbb64d739e91d26c3faf12a"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/index.html","8d1345ffaeefe97f19cea9b5e92c228d"],["/js/local-search.js","3607cdfc2ac57992db02aa090b3cc167"],["/js/motion.js","e8073e03493feb145528c4bdbe613d70"],["/js/next-boot.js","473091bdcc0a3d626c9e119765cd5917"],["/js/schemes/muse.js","160b26ee0326bfba83d6d51988716b08"],["/js/utils.js","766c5591ff85631b6b962ae3d57ae903"],["/lib/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/lib/font-awesome/css/all.min.css","76cb46c10b6c0293433b371bae2414b2"],["/lib/font-awesome/webfonts/fa-brands-400.woff2","a06da7f0950f9dd366fc9db9d56d618a"],["/lib/font-awesome/webfonts/fa-regular-400.woff2","c20b5b7362d8d7bb7eddf94344ace33e"],["/lib/font-awesome/webfonts/fa-solid-900.woff2","b15db15f746f29ffa02638cb455b8ec0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/tags/Docker/index.html","d2b69ff4826b4fb58dcca8ef742962fe"],["/tags/HTTP/index.html","eef5933f357a40535b8a15d96cb61439"],["/tags/JVM/index.html","6a83718f8e2ee1acdd29a92dd0fd92b5"],["/tags/Java/index.html","9f8633f2b7a89023f37f11a8e9ca0454"],["/tags/Kafka/index.html","2a4980acdbed9ff266c5db5eee24d127"],["/tags/Kubernetes/index.html","7f9d219c07956303143d2789c167feb5"],["/tags/MYSQL/index.html","a8cc660de60a31fef3c1988fec0f93a2"],["/tags/Netty/index.html","8e25f035c0e19bc3e7aa4f2aa9043951"],["/tags/Redis/index.html","5db0e9646423e8ee18e62fe441ea29ba"],["/tags/TCP/index.html","f600eb02c277696480ef4b1152c9120e"],["/tags/index.html","a87d5146a87463e3bb768928c61d68b4"],["/tags/内存/index.html","8ac9c93a989e9f700e23045b208699a3"],["/tags/分布式/index.html","3b2212aca9f5e7e42c1a0a1e3507cbde"],["/tags/协程/index.html","b6556bd76f3b7f5b6fadc8126cb2768c"],["/tags/容器/index.html","7c15be018f64b5b1a158f592c3e44d6c"],["/tags/微服务/index.html","59eab4e82ae322a972075b1b1f3ba777"],["/tags/拥塞控制/index.html","42bd8a6dd8d0e086a8fc759ef9b74aed"],["/tags/持久化/index.html","5abaf36ab96b53e0f115bf1fa8312cc9"],["/tags/操作系统/index.html","ab4799e2a8afe020f35440949c95a0bd"],["/tags/数据库/index.html","ca8b486a1dec7b78e33f2bb6257cdaf0"],["/tags/数据结构/index.html","836e68fae703758c48bea75432c7e25f"],["/tags/日志/index.html","f1d7ba580d448cdd822555799b19547d"],["/tags/注解/index.html","bccb27943f556dd59d5d4a5030c5fc63"],["/tags/线程/index.html","a2f4eb1974b49e5323a826e1ccc5c8a7"],["/tags/网络/index.html","7d85473a2044438221e443de4c600f91"],["/tags/设计模式/index.html","ab860bab6943304fa371c1dd17b15456"],["/tags/进程/index.html","9758161556c31114102c0fa033df4f62"]];
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







