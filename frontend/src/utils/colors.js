// conservative 7-color palette adapted for color blindness
// http://mkweb.bcgsc.ca/colorblind/img/colorblindness.palettes.trivial.png
export const colors = {
  orange: 'rgb(230, 159, 0)',
  skyBlue: 'rgb(86, 180, 233)',
  bluishGreen: 'rgb(0, 158, 115)',
  yellow: 'rgb(240, 228, 66)',
  blue: 'rgb(0, 114, 178)',
  vermillion: 'rgb(213, 94, 0)',
  reddishPurple: 'rgb(204, 121, 167)',

  lightGray: '#ccc',
  neutralGray: '#888',
  darkGray: '#444',
};

// semantic palette
export const palette = {
  actionButton: colors.blue,
  activityIndicator: colors.orange,
  letsBegin: colors.bluishGreen,
  disabledButton: colors.lightGray,
  dangerousAction: colors.vermillion,
  error: colors.vermillion,
  good: colors.bluishGreen,
};
