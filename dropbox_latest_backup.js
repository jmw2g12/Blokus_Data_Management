const Dropbox = require('dropbox');
const util = require('util');

var ACCESS_TOKEN = 'wOqCJGXuP6AAAAAAAAAAEyvlOLYxd9Tu4CJWwOcZzisddCY1MVyZtOAa2eJzE4zo';

listFiles('/BlokusBackups/');


function listFiles(path) {
	//wconsole.log(path);
	var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
	dbx.filesListFolder({path: path})
        .then(function(response) {
    		//displayFiles(response.entries);
		var files = mostRecentBackup(response.entries);
		console.log('most recent backup is at : ' + util.inspect(files[0]) + ' \n\n ' + util.inspect(files[1]));
		//renderItems(files[0]);
		//renderItems(files[1]);
        })
        .catch(function(error) {
			console.log("error! : " + error);
	});
}
function mostRecentBackup(files){
	var recent = 0;
	var time = 0;
	var file1 = '';
	var file2 = '';
	for (var i = 0; i < files.length; i++){
		time = parseInt(files[i].path_display.match(/149[0-9]{10}/g));
		console.log(files[i].path_display + ' -> ' + time);
		if (time > recent){
			recent = time;
			file1 = files[i];
		}else if (time === recent){
			file2 = files[i];
		}
	}
	return [file1, file2];
}
function displayFiles(files){
	for (var i = 0; i < files.length; i++){
		console.log(files[i].path_display);
	}
}
function getFileContents(path){
	var data = [0,1,2,3];
	
	return data;
}
function getFile(content) {
	var url = 'https://content.dropboxapi.com/1/files/auto';
        return $.ajax({
        	type: 'GET',
        	url: url + content.path,
                dataType: 'blob',
                beforeSend: function(request) {
                	request.setRequestHeader("Authorization", 'Bearer ' + access_token);
                	request.setRequestHeader("Accept", content.mime_type);
                }
        });
}
