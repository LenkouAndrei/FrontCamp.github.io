module.exports = function(source) {
  let sourceString = (typeof source === source)? source : JSON.stringify(source);
  return sourceString.replace(/(.*\d)\:(\D*\s?\w.*\,?)|(.*\:(\s?)\d.*)/g, '');
};