"use strict";

var movieIds = new Object;

$('#my-form').submit(addMovie );

function addMovie(e){
    $.ajax({
        type: "POST",
        async: false,
        url: "https://localhost:44325/api/movie",
        contentType: 'application/json',
        data: JSON.stringify({Title: this["title"].value, Director: this["director"].value, Genre: this["genre"].value})
    });
    // e.preventDefault();
}

function updateMovie(id, title, director, genre){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        async: false,
        dataType: "json",
        url: "https://localhost:44325/api/movie",
        success: location.reload(),
        contentType: 'application/json',
        data: JSON.stringify({MovieId: id, Title: title, Director: director, Genre: genre})
    });
};

function editForm(rowId){
    var rowEdit = 
    // "<div id=\"edit\">" +
    "<td>" + "<input type='text' id='title" + rowId + "' value='" + $("#" + rowId + " td:nth-child(1)").html().toString() + "'></td>" +
    "<td>" + "<input type='text' id='director" + rowId + "' value='" + $("#" + rowId + " td:nth-child(2)").html().toString() + "'></td>" +
    "<td>" + "<input type='text' id='genre" + rowId + "' value='" + $("#" + rowId + " td:nth-child(3)").html().toString() + "'></td>" +
    "<td>" + "<button onclick='updateMovie(" + movieIds[rowId] + ", " + "$(\"input#title" + rowId + "\").val()" + ", " + "$(\"input#director" + rowId + "\").val()" + ", " + "$(\"input#genre" + rowId + "\").val()" + ")'>Submit</button></td>";
    // + "</div>";
    $("#" + rowId).html(rowEdit);
}

function deleteMovie(movieId){
    $.ajax({
        type: "DELETE",
        async: false,
        dataType: "json",
        url: "https://localhost:44325/api/movie/" + movieId,
        success: location.reload(),
        contentType: 'application/json'
    });
}

$(document).ready(function(){
    // queried database for list of movie object
    $.ajax({
        type: "GET", 
        url: "https://localhost:44325/api/movie",
        contentType: "application/json; charset = utf-8",    
        dataType: "json",

        // manipulated DOM to append rows to movie table
        success: function(data){
            // $("#movie-list").html('');
            movieIds = new Object;
           $.each(data, function (i, item){
               movieIds["movie" + i] = item.movieId;
               var movie = "<tr id='movie"+ i + "'>" +
               "<td>" + item.title + "</td>" +
               "<td>" + item.director + "</td>" +
               "<td>" + item.genre + "</td>" +
               "<td><button onclick='editForm(\"movie" + i + "\")'>Edit</button></td>" + 
               "<td><button onclick='deleteMovie(movieIds[\"movie" + i + "\"])'>Delete</button>" +
               "</tr>";

               $('#movie-list').append(movie);
           })
        }
    });
});

function showAddMovie(){
    document.getElementById("my-form").style.display = "inline";
}
