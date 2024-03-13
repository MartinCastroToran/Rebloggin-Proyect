
$(".edit-btn").click(function () {
  const blogRoutText = $(".blog-rout").text();
  const blogTitle = $(".blog-title").text();
  const blogSubTitle = $(".blog-subtitle").text();
  const blogCont = $("blog-cont").text();
  const blogAuthor = $("blog-author").text();
  const blogGender = $("blog-gender").text();
    $.ajax({
        type: "PATCH",
        url: "/blog-editor/" + blogRoutText,
        data: {title: blogTitle, subTitle: blogSubTitle, cont: blogCont , author: blogAuthor , gender: blogGender},
        contentType: "text/plain",
        success: function (response) {
            console.log(response);

        },
        error: function (error) {
          console.error("Error en la solicitud AJAX", error);
      }
    });

});

