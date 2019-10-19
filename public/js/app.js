$(function(){
    $('#scrapeArticlesButton').on("click", function(event) {
        event.preventDefault();

        $('.articlesScrapedBody').empty();

        $.ajax("/api/all", {
            type: "GET"
        }).then(function(response) {

            let oldLength = response;

            console.log(oldLength);

            $.ajax("/api/scrape", {
                type: "POST"
            }).then(function(response) {


                $.ajax("/api/reduce", {
                    type: "DELETE"
                }).then(function(response) {

                    let newText = $("<div>");
                    let newLength = response.length;

                    console.log(newLength);

                    let numberChanged = parseInt(newLength) - parseInt(oldLength);

                    if (numberChanged == 0) {
                        newText.text("Scraper is up to date")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapeArticlesModal').modal('show');
                    }

                    else {
                        newText.text(numberChanged + " new articles scraped!")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapeArticlesModal').modal('show');
                    }

                })

            })
        })

    });

})