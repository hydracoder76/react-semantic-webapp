

export function getRemoteSourceName(source) {
  switch (source) {
    case 'facebook': return 'Facebook';
    default: return '-';
  }
}

export function getAccountTypeName(type) {
  switch (type) {
    case 'profile': return 'Profile';
    case 'page': return 'Page';
    case 'community': return 'Community';
    default: return '-';
  }
}
