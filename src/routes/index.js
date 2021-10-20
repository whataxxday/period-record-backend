module.exports = function(app){
    require('./find-one-get')(app);
    require('./find-all-get')(app);
    require('./delete-delete')(app);
    require('./save-or-update-post')(app);
}
