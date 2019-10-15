let nextPageToken = "";
let prevPageToken = "";

function watchForm() {
    $("#next").on("click", function(event) {
		getMoreVideos(nextPageToken);
    })

	$("#prev").on("click", function(event) {
		getMoreVideos(prevPageToken);
	})

    $("#submit").on("click", function(event) {
		getVideos();
	});
}

function getVideos() {
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: {
			part: "snippet",
		    maxResults: 10,
		    q: $("#searchString").val(),
		    type: "video",
			key: "AIzaSyCk_wpcyYnFYSNNg0SUvdrrDYtQZhmi-oA"
		},
		method: 'GET',
		dataType: 'json',
		success: function(responseJSON) {
				$("#videoList").empty();

				nextPageToken = responseJSON.nextPageToken;
				prevPageToken = responseJSON.prevPageToken;

				if (typeof prevPageToken === 'undefined' || prevPageToken === "") {
					$("#prev").css("visibility", "hidden");
				} else {
					$("#prev").css("visibility", "visible");
				}

				if (typeof nextPageToken === 'undefined' || nextPageToken === "") {
					$("#next").css("visibility", "hidden");
				} else {
					$("#next").css("visibility", "visible");
				}

				for (let video of responseJSON.items) {
					$("#videoList").append("<div class='item'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><h2 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
				}
			},
		error: function(err){
					$("#videoList").html('<p>Videos not found, please try again.</p>');
				}
		})
}

function getMoreVideos(token) {
	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: {
			part: "snippet",
		    maxResults: 10,
		    q: $("#searchString").val(),
		    pageToken: token,
		    type: "video",
			key: "AIzaSyCk_wpcyYnFYSNNg0SUvdrrDYtQZhmi-oA"
		},
		method: 'GET',
		dataType: 'json',
		success: function(responseJSON) {
				$("#videoList").empty();

				nextPageToken = responseJSON.nextPageToken;
				prevPageToken = responseJSON.prevPageToken;

				if (typeof prevPageToken === 'undefined' || prevPageToken === "") {
					$("#prev").css("visibility", "hidden");
				} else {
					$("#prev").css("visibility", "visible");
				}

				if (typeof nextPageToken === 'undefined' || nextPageToken === "") {
					$("#next").css("visibility", "hidden");
				} else {
					$("#next").css("visibility", "visible");
				}

				for (let video of responseJSON.items) {
					$("#videoList").append("<div class='item'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='blank'><h2 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
				}
		},
		error: function(err){
					$("#videoList").html('<p>Videos not found, please try again.</p>');
				}
		})
}

watchForm();


