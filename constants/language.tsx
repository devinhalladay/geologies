import { Book } from '../lib/readwise/types';

const language = {
  site: {
    title: 'Geologies',
    seo: {
      title: 'Geologies Reader • Dig deeper when reading',
      description:
        'Save, read, annotate, and cross-link webpages and PDFs. All your highlights, and annotations are portable, and interoperable with other tools you use every day.',
    },
  },
  navigation: {
    masthead: {
      eyebrow: 'Today is the day',
    },
    home: 'Geologies',
    library: 'Library',
  },
  article: {
    metadata: (book: Book) => (
      <>
        <span className="capitalize">{book.source}</span> •{' '}
        <a href={book.source_url} target="_blank" rel="noopener noreferrer">
          {book.author}
        </a>
      </>
    ),
    readwiseLink: 'View on Readwise',
    highlight: {
      eyebrow: (index: number) => `${index}`,
    },
  },
  library: {
    callout: {
      title: 'Readwise Library',
      description: (
        <>
          Enter your Readwise access token, which you can access{' '}
          <a
            href="https://readwise.io/access_token"
            target="_blank"
            rel="noopener noreferrer"
            className="text-moss underline"
          >
            here
          </a>{' '}
          when logged into Readwise. This token will be saved locally in your
          browser.
        </>
      ),
    },
    tokenForm: {
      input: {
        label: 'Readwise Access Token',
        placeholder: 'Your token…',
      },
      submit: {
        label: 'Save Readwise token locally',
      },
    },
    error: `Error authenticating with Readwise. Please clear your localstorage and
    try again.`,
    loading: 'Loading your Readwise library…',
    title: 'Readwise Library',
    disconnect: 'Disconnect service',
    search: {
      input: {
        placeholder: 'Search articles…',
      },
      submit: {
        ariaLabel: 'Search',
      },
    },
  },
};

export default language;
