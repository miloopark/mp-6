import styles from './home.module.css';

export default function Home() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    scope: 'read:user user:email'
  });

  return (
    <main className={styles.container}>
      <a
        href={`https://github.com/login/oauth/authorize?${params}`}
        className={styles.button}
      >
        Sign in with GitHub
      </a>
    </main>
  );
}
