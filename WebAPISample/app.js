"use strict";

var movieIds = new Object;

$('#my-form').submit(addMovie);

function addMovie(e) {
    $.ajax({
        type: "POST",
        async: false,
        url: "https://localhost:44325/api/movie",
        contentType: 'application/json',
        data: JSON.stringify({ Title: this["title"].value, Director: this["director"].value, Genre: this["genre"].value })
    });
    // e.preventDefault();
}