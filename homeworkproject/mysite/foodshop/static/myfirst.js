 $(document).ready(function () {

        var h6 = $("h6");
        var displayInfo = $("#displayInfoDiv")
        displayInfo.hide()
        h6.hide();

         var addedProductTypes = {};
         var selectedProducts = {};

             $(".increment").click(function () {

            var span = $(this).next(".count");
            var count = parseInt(span.text(), 10) + 1;
            span.text(count);

            var productType = $(this).closest(".col-3").index();

             if (!addedProductTypes[productType]) {
            addedProductTypes[productType] = true;

            var badge = $(".badge");
            var badgeCount = parseInt(badge.text(), 10) + 1;
            badge.text(badgeCount);
        }
               var productCountSpan = $(this).siblings(".product-count");
        var productName = $(this).closest(".col-3").find("p").text();
        if (selectedProducts[productName]) {
        selectedProducts[productName].count = count;
        productCountSpan.html("<br>" + count + " X " + selectedProducts[productName].price);
    }
        updateAddedProductsList();
        updateContinueDivVisibility();

        });


           $(document).on('click', '.decrement', function () {

               var span = $(this).prev(".count");

               var container = $(this).closest(".col-3");

            var count = parseInt(span.text(), 10);

            if (count > 0){
                 count--;
                span.text(count);

                 var productType = $(this).closest(".col-3").index();

                  if (addedProductTypes[productType]){
                       addedProductTypes[productType] = false;
                  }
                  var productCountSpan = $(this).siblings(".product-count");
                  var productName = $(this).closest(".col-3").find("p").text();
            if (selectedProducts[productName]) {
                selectedProducts[productName].count = count;
                if (count > 0) {
                    productCountSpan.html("<br>" + count + " X " + selectedProducts[productName].price);
            }
        }
                updateContinueDivVisibility();
            }

            if (count===0){

                productType = $(this).closest(".col-3").index();

                  if (addedProductTypes[productType]){
                       addedProductTypes[productType] = false;

                  }

                  productCountSpan = $(this).siblings(".product-count");
                  productName = $(this).closest(".col-3").find("p").text();
            if (selectedProducts[productName]) {
                selectedProducts[productName].count = count;
                if (count > 0) {
                    productCountSpan.html("<br>" + count + " X " + selectedProducts[productName].price);
            }   else {
                    productCountSpan.text("");
            }
        }
                      var badge = $(".badge");
                      var badgeCount = parseInt(badge.text(), 10) - 1;
                      badge.text(badgeCount);

                    container.find(".increment,.decrement,.count").hide();
                    container.find(".add").show();

            }
            updateAddedProductsList();
            updateBadgeVisibility();
            updateContinueDivVisibility();

        });

           $(".increment,.decrement,.count").hide()

             $(".add").click(function (event) {

                  event.stopPropagation();

        $("h6").show();
        var container = $(this).closest(".col-3");

        var countSpan = container.find(".count");
        countSpan.text("1");

        var productName = container.find("p").text();
        var productImageSrc = container.find("img").attr("src");
        var productPrice = parseInt(container.find("div").text())


        if (selectedProducts[productName]) {
            selectedProducts[productName].count += 1;
        } else {
            selectedProducts[productName] = {
                imageSrc: productImageSrc,
                price: productPrice,
                count: 1,
            };
        }

        container.find(".add").hide();
        container.find(".increment, .decrement, .count").show();

        var productType = container.index();
        if (!addedProductTypes[productType]) {
            addedProductTypes[productType] = true;

            var badge = $(".badge");
            var badgeCount = parseInt(badge.text(), 10) + 1;
            badge.text(badgeCount);
        }
                updateAddedProductsList();
                updateContinueDivVisibility();


    });
             function updateAddedProductsList() {
        var addedProductsList = $("#addedProductsList");
        var totalSum = 0;
        addedProductsList.empty();

        for (var productName in selectedProducts) {
            if (selectedProducts.hasOwnProperty(productName)) {
                var productInfo = selectedProducts[productName];


                var li = $("<li>");

                var p = $("<p>").html(productName + "<br>" + productInfo.price + " <span>ден.</span>");
                //li.append(p);

                var countSpan = $("<span>")
                .addClass("product-count")
                .html("<br>" + productInfo.count + " X " + productInfo.price);
                p.append(countSpan);
                li.append(p);

                var img = $("<img>").attr("src", productInfo.imageSrc)
                    .css({
                        width: "100px",
                    height: "100px",
                    objectFit: "cover",

                    });
                li.prepend(img);
                 if (productInfo.count > 0) {
                     addedProductsList.append(li);
                     totalSum += productInfo.price * productInfo.count;
                 }

            }
        }
        var totalSumElement = $("#totalSum");
        totalSumElement.text("Вкупно: " + totalSum + " ден.");
    }
        function updateBadgeVisibility() {

             var badge = $(".badge");
             var badgeCount = parseInt(badge.text(), 10);
            if (badgeCount > 0) {
                h6.show();
        }
            else {
              h6.hide();
        }

}
function displayCapturedInfo(name, address, mobile, city, municipality) {

    var info = "Име и презиме: " + name + "<br>"
        + "Адреса за достава: " + address + "<br>"
        + "Мобилен број: " + mobile + "<br>"
        + "Град: " + city + "<br>"
        + "Општина: " + municipality;



    displayInfo.html(info)
}

 const savedAddress = '{{ request.session.user_address|default:"" }}';
             if (savedAddress) {
        displayCapturedInfo(savedAddress);
    }

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$("#save").click(function () {
        // Get the values from the input fields
        const csrftoken = getCookie('csrftoken');
        var name = $("#name1").val();
        var address = $("#name2").val();
        var mobile = $("#name3").val();
        var selectedCityOption = $("#citySelect option:selected");
        var selectedMunicipalityOption = $("#municipalitySelect option:selected");


        if (!name || !address || !mobile || !selectedCityOption.val() || !selectedMunicipalityOption.val()) {

            var errorMsg = "Пополнете го ова поле";
                         name.siblings(".error-msg").text(errorMsg);
            return;
    }


        var city = selectedCityOption.val();
        var municipality = selectedMunicipalityOption.val();

            $.ajax({
        type: "POST",
        url: "/foodshop/save_address/", // Replace with your endpoint URL
        data: {
            name: name,
            address: address,
            mobile: mobile,
            city: city,
            municipality: municipality,
            csrfmiddlewaretoken: window.CSRF_TOKEN, // Include the CSRF token
            headers:{"X-CSRFToken": csrftoken }
        },
        success: function (data) {

            if (name && address  && mobile  && selectedCityOption.val()  && selectedMunicipalityOption.val()){


             displayCapturedInfo(name, address, mobile, city, municipality);
             $("#displayInfoDiv").show();
             }
        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });

    });

const savedLocalAddress = localStorage.getItem('user_address');
    if (savedLocalAddress) {
        const addressData = JSON.parse(savedLocalAddress);
        displayCapturedInfo(
            addressData.name,
            addressData.address,
            addressData.mobile,
            addressData.city,
            addressData.municipality
        );
    }
function updateContinueDivVisibility() {
    var continueDiv = $("#continueDiv");
    console.log(Object.keys(selectedProducts))


    var isAuthenticated = scriptTag.getAttribute('data-is-authenticated') === 'true';


    var isAddedProductTypesEmpty = Object.keys(addedProductTypes).length === 0;


      if (isAuthenticated && isAddedProductTypesEmpty) {
            continueDiv.show();
        } else {
            continueDiv.hide();
        }
}
               const cartIconToggle = document.getElementById('cartIconToggle');
        const cartDiv = document.getElementById('cartDiv');
        const closeCartButton = document.getElementById('closeCartDivButton');

        if (cartIconToggle && cartDiv && closeCartButton) {

            cartIconToggle.addEventListener('click', function (event) {

                event.stopPropagation();
                cartDiv.classList.add('show-vertical-div');
            });


            closeCartButton.addEventListener('click', function (event) {
                event.stopPropagation();

                $("#cartDiv").removeClass("show-vertical-div");
                event.preventDefault();

            });
        }
    });