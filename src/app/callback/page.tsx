import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type GitHubToken = {
  access_token?: string
  error?: string
  error_description?: string
}

type GitHubUser = {
  login: string
  name?: string
  email: string | null
  avatar_url: string
}

export default async function Callback({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams

  if (!code) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>No code provided.</p>
      </main>
    )
  }

  const tokenRes = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }),
      cache: 'no-store',
    }
  )

  if (!tokenRes.ok) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>Failed to fetch access token.</p>
      </main>
    )
  }

  const tokenJson = (await tokenRes.json()) as GitHubToken
  if (!tokenJson.access_token) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>
          Token error: {tokenJson.error_description || tokenJson.error}
        </p>
      </main>
    )
  }

  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenJson.access_token}`,
    },
    cache: 'no-store',
  })

  if (!userRes.ok) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>Failed to fetch user profile.</p>
      </main>
    )
  }

  const user = (await userRes.json()) as GitHubUser

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Welcome, {user.name ?? user.login}!
      </h1>
      <img
        src={user.avatar_url}
        alt="Avatar"
        className={styles.avatar}
      />
      <p className={styles.info}>
        <strong>Username:</strong> {user.login}
      </p>
      <p className={styles.info}>
        <strong>Email:</strong> {user.email ?? 'Not public'}
      </p>
    </main>
  )
}
