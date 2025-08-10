import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: 'your-domain.com', // TODO: 実際のドメインに変更
  apiHost: 'https://plausible.io',
})

export const { trackEvent, trackPageview } = plausible