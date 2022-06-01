import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import language from '../constants/language';
import { THEME_COLOR } from '../constants/values';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <Script>
          {`!(function () {
        var analytics = (window.analytics = window.analytics || []);
        if (!analytics.initialize)
          if (analytics.invoked)
            window.console &&
              console.error &&
              console.error('Segment snippet included twice.');
          else {
            analytics.invoked = !0;
            analytics.methods = [
              'trackSubmit',
              'trackClick',
              'trackLink',
              'trackForm',
              'pageview',
              'identify',
              'reset',
              'group',
              'track',
              'ready',
              'alias',
              'debug',
              'page',
              'once',
              'off',
              'on',
              'addSourceMiddleware',
              'addIntegrationMiddleware',
              'setAnonymousId',
              'addDestinationMiddleware',
            ];
            analytics.factory = function (e) {
              return function () {
                var t = Array.prototype.slice.call(arguments);
                t.unshift(e);
                analytics.push(t);
                return analytics;
              };
            };
            for (var e = 0; e < analytics.methods.length; e++) {
              var key = analytics.methods[e];
              analytics[key] = analytics.factory(key);
            }
            analytics.load = function (key, e) {
              var t = document.createElement('script');
              t.type = 'text/javascript';
              t.async = !0;
              t.src =
                'https://cdn.segment.com/analytics.js/v1/' +
                key +
                '/analytics.min.js';
              var n = document.getElementsByTagName('script')[0];
              n.parentNode.insertBefore(t, n);
              analytics._loadOptions = e;
            };
            analytics._writeKey = 'k7cdYDB4J00dJsFcyR85RvpqR8TuF9cV';
            analytics.SNIPPET_VERSION = '4.15.3';
            analytics.load('k7cdYDB4J00dJsFcyR85RvpqR8TuF9cV');
            analytics.page();
          }
      })();`}
        </Script>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta
          name="description"
          content="Welcome to Geologies: a new place to read, annotate, and cross-link webpages and PDFs. It's your own, private space, with everything hosted locally. All your saves, highlights, and annotations, are portable and interoperable with other tools you use every day."
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        <title>{language.site.seo.title}</title>
        <meta name="title" content={language.site.seo.title} />
        <meta name="description" content={language.site.seo.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://geologies.network/" />
        <meta property="og:title" content={language.site.seo.title} />
        <meta
          property="og:description"
          content={language.site.seo.description}
        />
        <meta property="og:image" content="https://geologies.network/seo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://geologies.network/" />
        <meta property="twitter:title" content={language.site.seo.title} />
        <meta
          property="twitter:description"
          content={language.site.seo.description}
        />
        <meta
          property="twitter:image"
          content="https://geologies.network/seo.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
