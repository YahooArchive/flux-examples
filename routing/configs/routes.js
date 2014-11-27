module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home'
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about'
    },
    dynamicpage: {
        path: '/page/:id',
        method: 'get',
        page: 'page',
        action:function (context, payload, done) {
          context.dispatch('LOAD_PAGE',{id: payload.params.id});
          done();
        }
    },
};
