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

var precacheConfig = [["/2020/07/20/java使用自定义注解/index.html","1c9722a36eac363c5ac8f54a9e671fcc"],["/2020/08/26/CAP，ACID和BASE理论/index.html","5021a73712728831bd9db17f68acd3c3"],["/2020/08/31/TCP的拥塞控制算法/BIC.png","0271605c533eac06372043a4007260e2"],["/2020/08/31/TCP的拥塞控制算法/CUBIC.png","9493e9af14fbd7971e077c45c3b8ddc4"],["/2020/08/31/TCP的拥塞控制算法/Reno.png","2c5f15bd2f64d11d3ffe561582a59a55"],["/2020/08/31/TCP的拥塞控制算法/Tahoe.png","2008b2c664e6d68381331d83a3ef08d2"],["/2020/08/31/TCP的拥塞控制算法/index.html","65489f7b1ffdcd83db8dbffa35dc2960"],["/2020/09/01/JVM如何加载Java类/index.html","f9f8f877456941a74d6b8a177850037b"],["/2020/09/01/MySQL的日志系统/index.html","cdde7b2c2d932ed259e5e48ad3b9deb0"],["/2020/09/03/设计模式之创建型模式/index.html","c4d96172e7e0d8d0540d5bd411d67a88"],["/2020/09/04/设计模式之结构型模式/index.html","87c3e272f9ca150840832a8cf55e877d"],["/2020/09/05/Redis中的持久化机制/index.html","3efe9185761cc07228ded18931aab60b"],["/2020/09/08/Redis中的数据结构/index.html","e33b9b45136bb04695c181adf9fb91e5"],["/2020/09/09/Redis中的对象系统/embstr编码与raw编码.jpg","ce83d1346c9642fdbbf5ffbe701bfbe3"],["/2020/09/09/Redis中的对象系统/index.html","c142f6379900bad6c8f12c6624289cb6"],["/2020/09/09/Redis如何删除过期键/index.html","f1f13a358f2e97ddfb1a69f8d42c26c8"],["/2020/09/09/设计模式之行为型模式/index.html","ba75b4e71ad1b6dbac3b51452ca4db56"],["/2020/09/10/Redis中的客户端与服务器实现/index.html","df686c012cef20f51c44382ecaa692c3"],["/2020/09/11/Redis实现主从复制原理/index.html","49c094bf04f5c17b24b003aaf572abfb"],["/2020/09/27/Redis中的哨兵机制/index.html","808747bb5881fc972d4f6ee734b3041c"],["/2020/10/03/JVM中的垃圾回收算法/index.html","af762c9820e99cc64392b3deb2bc6896"],["/2020/11/21/操作系统内存管理/index.html","c5bfd3ef0136c5b4b60d1449fe9e9281"],["/2020/11/21/操作系统内存管理/分段.png","594c4b49b302f562640721c34023a812"],["/2020/11/21/进程线程与纤程/index.html","7cbfd70167f7bf507ee2ee1e93be3620"],["/2020/11/21/进程线程与纤程/进程上下文切换.png","a767896f98b740db11ed1d524ead091a"],["/2020/11/21/进程线程与纤程/进程内存空间布局.png","9bd8ab919d4aafa7fe708f7b74a1a4e8"],["/2020/11/21/进程线程与纤程/进程状态.png","26bcd464352e666b22b8378dd07cd1ed"],["/2020/11/25/操作系统调度/index.html","fb8c43abc1d62a0c4384ed073a0cc0f8"],["/2020/11/25/操作系统调度/基于进程调度的进程转换.png","b86f17b4047ed5e00f92f131fcc4cd73"],["/2020/12/03/进程间通信方式/index.html","7d74a3a6b446aa46c946987a805a5af4"],["/2020/12/05/操作系统同步原语/index.html","6b7b77fa9f8a517d079c8e81a008118b"],["/2020/12/10/操作系统文件管理/index.html","b824d13b7733e610f4a9aa268dedaa35"],["/2020/12/10/操作系统文件管理/inode数据索引.png","868ba3c3a4c78940eb539a9236de172b"],["/2021/01/26/kafka基本概念/index.html","9d13d061d91787355bb5a00f3182f939"],["/2021/01/28/netty常用概念/index.html","b84cb74fc41581188330a78ca5aff247"],["/2021/01/30/HTTP各版本特性/index.html","f251c89f91662b409a2c193ebef3ffc1"],["/2021/02/01/Kubernetes调度器/index.html","22c457e04291dcea94a8a0e6791a8fdc"],["/2021/02/01/Kubernetes调度器/调度机制.jpg","bb95a7d4962c95d703f7c69caf53ca53"],["/2021/02/03/Kubernetes架构/index.html","c965cb2e9d63a9ba722cf3fa2d0c33f8"],["/2021/02/05/JVM锁优化/index.html","990c386467f85dac0f72812c3425b5c6"],["/2021/02/09/Kubernetes网络实现/Calico IPIP.jpg","4dd9ad6415caf68da81562d9542049c9"],["/2021/02/09/Kubernetes网络实现/Calico.jpg","8db6dee96c4242738ae2878e58cecd1b"],["/2021/02/09/Kubernetes网络实现/Flannel UDP.jpg","8332564c0547bf46d1fbba2a1e0e166c"],["/2021/02/09/Kubernetes网络实现/Flannel XVLAN.jpg","03185fab251a833fef7ed6665d5049f5"],["/2021/02/09/Kubernetes网络实现/Flannel host-gw.png","3d8b08411eeb49be2658eb4352206d25"],["/2021/02/09/Kubernetes网络实现/index.html","dd79c514dec1b10b41b0127d2e50d7d3"],["/2021/02/10/Java内存区域/index.html","ac554005eeb78a57f67fad83d21f8775"],["/2021/02/10/分布式一致性算法/index.html","3254cf5249d73ae7ff0b4223c048f9b6"],["/2021/02/18/Docker实现原理/index.html","8f92d14f952e345da0f42552b490a412"],["/archives/2020/07/index.html","150932ec518055d3419bf6a5373d89dd"],["/archives/2020/08/index.html","08aa5ca6c5539dfc17e2cc5e239264c4"],["/archives/2020/09/index.html","1214387eb399f81b5d8328a6ab9778bd"],["/archives/2020/09/page/2/index.html","c6eb3404235f0d3ff0986e593a74178f"],["/archives/2020/10/index.html","7acde8a367e930442e552ebbb8a49366"],["/archives/2020/11/index.html","e189513388c2a2e6f8fb883e7c3ed50b"],["/archives/2020/12/index.html","f2c232e9967816a433d3a5b3a43bf4ae"],["/archives/2020/index.html","7e5026344d6bd560ba22d114c309d9eb"],["/archives/2020/page/2/index.html","15d8d60eaf4ffacd36f536a223de0df7"],["/archives/2020/page/3/index.html","a27ea48c8a65adb65be2bd8016b0b0ab"],["/archives/2021/01/index.html","916a9110c0362e06e44f5e974ad9824e"],["/archives/2021/02/index.html","e841be8271239e86a657b2e27dc1f50d"],["/archives/2021/index.html","e026baab1632d47c586f903640a24474"],["/archives/index.html","306e3158520729a45ff558b80f3d87f0"],["/archives/page/2/index.html","5b91bee474c750ecd7b1bf86c050fee8"],["/archives/page/3/index.html","34d8d887b73859086ebd39094eb89401"],["/archives/page/4/index.html","e84494e16330e3a5cae72813416edcbe"],["/categories/Docker/index.html","7b6bfe4fbffee9d62b71ec93ff5b43a5"],["/categories/JVM/index.html","0182785103eb5726888d3788feb62a9c"],["/categories/Java/index.html","897683a3bb62afdd92e0164d606a054a"],["/categories/Kafka/index.html","141cda53b4e9e0bfeef259fbfda7adc1"],["/categories/Kubernetes/index.html","daa974be0ae9907e01895168b38d2783"],["/categories/Netty/index.html","8b62d3ea200e259c1c2a69cfd5998f72"],["/categories/Redis/index.html","e46f581847e7305ad3789d1d906bb17c"],["/categories/index.html","0196d621019e9c8411016d308e645ac5"],["/categories/分布式/index.html","f150930e2fa6f1a4aff38d27e7daebbc"],["/categories/操作系统/index.html","e71acdf24478a1b1e5925224970e05b8"],["/categories/数据库/index.html","b05e7b31acd6a9faaed8eb1a01bd9b73"],["/categories/网络/index.html","3d16b62096fbc495d5c90d70d10293c2"],["/categories/设计模式/index.html","d022876fde3301bc6b717c72a509508e"],["/css/main.css","92811aa237cee1048dea538f5a25d25b"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","7a2fe6b906600a9354cece6d9ced2992"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/index.html","244be9f3332fb8d47efc472b204dc4f9"],["/js/local-search.js","3607cdfc2ac57992db02aa090b3cc167"],["/js/motion.js","e8073e03493feb145528c4bdbe613d70"],["/js/next-boot.js","473091bdcc0a3d626c9e119765cd5917"],["/js/schemes/muse.js","160b26ee0326bfba83d6d51988716b08"],["/js/utils.js","766c5591ff85631b6b962ae3d57ae903"],["/lib/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/lib/font-awesome/css/all.min.css","76cb46c10b6c0293433b371bae2414b2"],["/lib/font-awesome/webfonts/fa-brands-400.woff2","a06da7f0950f9dd366fc9db9d56d618a"],["/lib/font-awesome/webfonts/fa-regular-400.woff2","c20b5b7362d8d7bb7eddf94344ace33e"],["/lib/font-awesome/webfonts/fa-solid-900.woff2","b15db15f746f29ffa02638cb455b8ec0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/tags/Docker/index.html","da58a5b6b0f8cb2c432e2e70bd081200"],["/tags/HTTP/index.html","3cfd4ba0e01a7ccd139ea2fc99837a86"],["/tags/JVM/index.html","ed32c97e933a865cee9a37e375c88e7a"],["/tags/Java/index.html","e81395ee0f8ffd32e8f43f96eafe95e7"],["/tags/Kafka/index.html","e3b57c38b994decc2da4c96235e9b0ff"],["/tags/Kubernetes/index.html","dd28963429d01fc537960f2df7e17ee3"],["/tags/MYSQL/index.html","9ef97789ae95f4ee982105d8bad238b2"],["/tags/Netty/index.html","6034b9478ce622032b9eea6e1130e3e5"],["/tags/Redis/index.html","424b817bbccda5ed2a1d1a63e0c8af27"],["/tags/TCP/index.html","9481bb1b65ca25c278296a7df548e55b"],["/tags/index.html","59a8861b81abae229aa034a2935bbfac"],["/tags/内存/index.html","f4f5d90a573127968c201775e7db3cff"],["/tags/分布式/index.html","2a705cb80622224d604c8e5f1de4427d"],["/tags/协程/index.html","11cd12943e8b4170251d83101c4bdf57"],["/tags/容器/index.html","a0c9c41eaa1e7370a59a85791bd5f976"],["/tags/微服务/index.html","67fda15ad8b735732ca0949ffd0e6c3e"],["/tags/拥塞控制/index.html","f9699cbb34b8f363ea10da8c09784c67"],["/tags/持久化/index.html","7cdec84b810c667f1aafd489b9190e4b"],["/tags/操作系统/index.html","a4c612b3e0a51a7cb46ea66c06735cbb"],["/tags/数据库/index.html","13dcb33ef62f3e6786ad468c89b2fc09"],["/tags/数据结构/index.html","a766c66306e86490300a1e6e1a781b6d"],["/tags/日志/index.html","5452916c87497272e47b597657c8ecc3"],["/tags/注解/index.html","be9b1e839461b8dfcd53a5f7e1a8de4e"],["/tags/线程/index.html","8c3d0535c99003ca3f40b561d99c7b34"],["/tags/网络/index.html","56815ef7c32340554451780d67a8b425"],["/tags/设计模式/index.html","276bf023bc0901941ae2d7fe9fa53388"],["/tags/进程/index.html","b32354577061f941fdcdb249f4971982"]];
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







