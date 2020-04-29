export function isJustWhitespace(string) {
  return string.replace(/\s/g, '').length === 0;
}

export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeExcessWhitespace(str) {
  return (str.match(/\S+/g) || []).join(' ');
}
