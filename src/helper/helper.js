export const generateSlugFromLink = (link) => {
  return link.replace('https://selerasa.com/', '');
}

export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 60;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
