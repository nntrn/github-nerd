const base = 'https://api.github.com/'

export default function userLinks(user) {
  const userBase = base + 'users/'
  return {
    events: `${userBase}${user}/events`,
    followers: `${userBase}${user}/followers`,
    following: `${userBase}${user}/following`,
    gists: `${userBase}${user}/gists`,
    organizations: `${userBase}${user}/orgs`,
    received_events: `${userBase}${user}/received_events`,
    repos: `${userBase}${user}/repos`,
    starred: `${userBase}${user}/starred`,
    subscriptions: `${userBase}${user}/subscriptions`,
    user: `${userBase}${user}`
  }
}
