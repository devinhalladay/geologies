import { TwitterTweetEmbed } from 'react-twitter-embed';

// import { usePageViews } from '../hooks/analytics';

function Home() {
  // usePageViews();

  return (
    <main>
      <div className="sm:px-12">
        <h1 className="italic mb-4 block">Dear visitor,</h1>
        <p>
          Welcome to Geologies: a new place to read, annotate, and cross-link
          webpages and PDFs. It's your own, private space, with everything
          hosted locally. All your saves, highlights, and annotations, are
          portable and interoperable with other tools you use every day.
        </p>
        <p className="indent-8 mb-4">
          I'll be working on this in my spare time to improve my technical
          skills and explore some new ideas I've had for reading environments.
          <span>
            <a
              href="https://github.com/devinhalladay/geologies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stay tuned on Github ~
            </a>
          </span>{' '}
          or this thread:
        </p>
        <TwitterTweetEmbed tweetId="1529509936203440129" />
        <p className="italic">for the ages,</p>
        <p>
          <a
            href="https://twitter.com/theflowingsky"
            target="_blank"
            rel="noopener noreferrer"
          >
            @theflowingsky
          </a>
        </p>
      </div>
    </main>
  );
}

export default Home;
