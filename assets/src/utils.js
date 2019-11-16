/**
 * Determine if page is loaded in iFrame (such as notes window)
 * @source https://stackoverflow.com/a/326076/6817437
 */
export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
