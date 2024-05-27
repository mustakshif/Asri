(() => {
    import('./index.js')
        .then(index => index.main()) 
        .catch(e => console.error(e))
})();