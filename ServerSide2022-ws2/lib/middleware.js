const getNewsData = () => [
    {
        body: "The purpose of this website is to store information about different people so that you can access it when you need it. You can take a look at some of my classmates named Baptiste and Amine and learn more about them.",
        Auther: 'Adrien ARIBAUT'
    },
]

const newsMiddleware = (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
}

module.exports = newsMiddleware