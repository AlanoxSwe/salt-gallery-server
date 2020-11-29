const { getImages } = require('../helpers');

const getAuthor = user => ({
  name: user.name,
  instagram: user.instagram_username
    ? {
        username: user.instagram_username,
        url: `https://www.instagram.com/${user.instagram_username}`,
      }
    : null,
});

const getImagesData = data =>
  data.results.map(({ urls, user, tags }) => {
    return {
      url: urls.small,
      author: getAuthor(user),
      tags: tags.map(({ title }) => title),
    };
  });

module.exports = async (req, res, next) => {
  let page = req.query.page || 1;
  const category = req.params.category;

  try {
    const data = await getImages(page, category);
    page = Number(page);
    const nextPage = page >= data.total_pages ? null : page + 1;
    const prevPage = page <= 1 ? null : page - 1;

    res.status(200).json({
      currentPage: Number(page),
      images: getImagesData(data),
      next: nextPage,
      prev: prevPage,
    });
  } catch (error) {
    return next({ status: 404, message: error.message });
  }
};
