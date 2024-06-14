import isEmpty from "./isEmpty";

export default function formatTags(video) {
  if (isEmpty(video)) return [];

  let count = 0;

  // handle multiple categories
  const { category_name: categories } = video;
  const tags = (Array.isArray(categories) ? categories : [categories]).reduce(
    (acc, cat) => {
      count += 1;
      return [...acc, { id: count, name: cat }];
    },
    []
  );

  // add single language
  count += 1;
  return [...tags, { id: count, name: video.language_name }];
}
