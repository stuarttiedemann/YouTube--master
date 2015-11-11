var queryTerm;
var videosBySamePoster = [];
var apiKey = 'AIzaSyB4cvmIQgRWdLIHTUm_L3-KB4p3O62mTKY';
var videohtml ="";

angular.module('myApp', []).controller('myController', function($scope, $sce, $http ){
	var videosBySamePoster = [];
	// $scope.mainUrl= $sce.trustAsResourceUrl('http://www.youtube.com/embed/RUz_EXSmp9w');
	$scope.videos = "";
	$scope.suggestedVideos = "";
	$scope.suggestedVideosArray=[];

	// Url to get most popular videos on Youtube and assign it to a variable
	var suggestedVideoUrl="https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=9&key="+apiKey;

	$http.get(suggestedVideoUrl).success(function(data) {
	    $scope.suggestedVideos = data.items;
	    $scope.mainUrl= $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+$scope.suggestedVideos[0].id);
	    $scope.mainTitle = $scope.suggestedVideos[0].snippet.title;
	    console.log($scope.suggestedVideos);
	    for(i=1; i<9; i++){
			var youTubeUrl = 'https://www.youtube.com/embed/';
			var popularVideos = {
				vidtitle: $scope.suggestedVideos[i].snippet.title,
				thumb: $scope.suggestedVideos[i].snippet.thumbnails.default.url,
				url: youTubeUrl + $scope.suggestedVideos[i].id,
				duration: "2:43:58",
				postedBy: "Stephen Tiedemann",
				totalViews: 100000
				}
				$scope.suggestedVideosArray.push(popularVideos);
			}
			console.log($scope.suggestedVideosArray);
		 });
		



	// Submit button pressed function
	$scope.addVideo = function(){
		queryTerm = $scope.videoSearch;
		var baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=';
		var searchUrl = queryTerm;
		var endUrl = '&key=';
		var totalUrl = baseUrl + searchUrl + endUrl + apiKey;
		var mainVideohtml="";
		

		// If successful and an object is returned do this
		$http.get(totalUrl).success(function(data) {
	      	$scope.videos = data.items;
	      	videosBySamePoster = [];
	      	var makeMainUrl='https://www.youtube.com/embed/'+$scope.videos[0].id.videoId;
	      	$scope.mainTitle = $scope.videos[0].snippet.title;
			console.log($scope.mainTitle);
			$scope.mainUrl = $sce.trustAsResourceUrl(makeMainUrl);
			mainVideohtml = '<iframe width="100%" height="300px" src="'+makeMainUrl+'" frameborder="0" allowfullscreen></iframe>';
			$('#video').html(mainVideohtml);
	      	for(i=1; i<4; i++){
				var youTubeUrl = 'https://www.youtube.com/embed/';
				var videos = {
					vidtitle: $scope.videos[i].snippet.title,
					thumb: $scope.videos[i].snippet.thumbnails.default.url,
					url: youTubeUrl + $scope.videos[i].id.videoId,
					duration: "2:43:58",
					postedBy: "Stephen Tiedemann",
					totalViews: 100000
				}
				videosBySamePoster.push(videos);
				// console.log($scope.videos[0].snippet.thumbnails.default.url);

			}
			
			console.log(videosBySamePoster);
			videohtml="";
			for(i=0; i<videosBySamePoster.length; i++){
				var videoTitle = videosBySamePoster[i].vidtitle;
				if(videoTitle.length > 50){
					var newTitle = videoTitle.slice(0, 49) + "...";	
				}else{
					var newTitle = videoTitle;
				}
				videohtml +='<div class="thumbnail"><a href=' + videosBySamePoster[i].url + '><img src=' + videosBySamePoster[i].thumb + '></a></div>';
				videohtml +='<div class="feature-minis"' + ' id="feature-minis-"' + i + '><span class="video-title">' + newTitle + '</span>';
				videohtml += '<p>by ' + videosBySamePoster[i].postedBy + '</p>';
				videohtml += '<p>Duration: ' + videosBySamePoster[i].duration + '</p>';
				videohtml += '<p>Views: ' + videosBySamePoster[i].totalViews + '<p></div>';
			}
			$('#featured-previews').html(videohtml);
    	});
	}
});



// $(document).ready(function(){
// 	for(i=0; i<videosBySamePoster.length; i++){
// 		var videoTitle = videosBySamePoster[i].vidtitle;
// 		if(videoTitle.length > 50){
// 			var newTitle = videoTitle.slice(0, 49) + "...";	
// 		}else{
// 			var newTitle = videoTitle;
// 		}
// 		videohtml +='<div class="thumbnail"><a href=' + videosBySamePoster[i].url + '><img src=' + videosBySamePoster[i].thumb + '></a></div>';
// 		videohtml +='<div class="feature-minis"' + ' id="feature-minis-"' + i + '><span class="video-title">' + newTitle + '</span>';
// 		videohtml += '<p>by ' + videosBySamePoster[i].postedBy + '</p>';
// 		videohtml += '<p>Duration: ' + videosBySamePoster[i].duration + '</p>';
// 		videohtml += '<p>Views: ' + videosBySamePoster[i].totalViews + '<p></div>';
// 	}
// 	$('#featured-previews').html(videohtml);

// 	addVideos();

// function addVideos(){
// 	videohtml="";
// 	for(i=0; i<otherVideos.length; i++){
// 		var videoTitle = otherVideos[i].vidtitle;
// 		if(videoTitle.length > 55){
// 			var newTitle = videoTitle.slice(0, 54) + "...";	
// 		}else{
// 			var newTitle = videoTitle;
// 		}
// 		videohtml += '<div class = "more-videos-previews"><div class ="more-thumbnails"><a href=' + otherVideos[i].url + '><img src=';
// 		videohtml += otherVideos[i].thumb + '></a></div><div class="thumbnail-text">';
// 		videohtml += '<p class="video-title">' + newTitle + '</p><p>' + otherVideos[i].postedBy + '</p></div></div>';

// 	}
// 	$('#more-videos').html(videohtml);
// }


// 	$('#form-submit').submit(function(){
		
// 		var newObject = {
// 			vidtitle: $('#vidtitle').val(),
// 			postedBy: $('#postedBy').val(),
// 			thumb: $('#thumb').val(),
// 			url: $('#url').val()		

// 		}
// 		otherVideos.unshift(newObject);
// 		otherVideos.pop();
// 		addVideos();
// 		event.preventDefault();
// 		$('#myModal2').modal('hide');

// 	})












// })











