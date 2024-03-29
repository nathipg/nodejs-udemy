exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page not found',
    path: '/404',
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Some error occured',
    path: '/500',
  });
};
