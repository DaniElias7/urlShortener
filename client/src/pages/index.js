import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleShorten = async () => {
    setError('');
    setIsCopied(false);
    setIsLoading(true);
    setShortUrl(''); // Clear previous short URL

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_API_SHORTEN_ENDPOINT}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (response.ok && data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || 'Falha ao encurtar a URL.');
        console.error("Erro ao encurtar a URL:", data);
      }
    } catch (error) {
      setError('Falha ao conectar com o servidor.');
      console.error("Erro ao conectar com o servidor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyClick = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fancy URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          URL Shortener
        </h1>

        <p className={styles.description}>
          Paste the URL to be shortened
        </p>

        <div className={styles.inputContainer}>
          <input
            type="url"
            placeholder={shortUrl ? "The short link" : "Enter the link"}
            className={styles.input}
            value={shortUrl ? shortUrl : longUrl}
            onChange={(e) => {
              if (!shortUrl) {
                setLongUrl(e.target.value);
              }
            }}
          />
          <button
            className={styles.button}
            onClick={shortUrl ? handleCopyClick : handleShorten}
            disabled={isLoading}
          >
            {isLoading ? 'Shortening...' : shortUrl ? (isCopied ? 'Copied!' : 'Copy URL') : 'Shorten URL'}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.tagline}>
          is a free tool to shorten URLs and generate short links
        </p>
      </main>
    </div>
  );
}