
let userPrinciple = getUserDetail()
// const token = userPrinciple.token;

if (userPrinciple) {
    token = userPrinciple.token;
    showAllCustomer();
}

    function showAllCustomer() {
        $.ajax({
            headers:{"Authorization": "Bearer " + token},
            method: "GET",
            url: "http://localhost:8080/api/customers",
            success: function(data) {
                displayCustomer(data)
            },
            error: function(error) {
                console.log("Error Show List Customer: ", error)
            }
      })
}
// showAllCustomer();

function displayCustomer(customers) {
    let table = ""
    for (let customer of customers) {
        table += `<tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.age}</td>
                    <td>${customer.address}</td>
                    <td>${customer.gender}</td>
                    <td><button class="update" onclick="updateCustomerForm(${customer.id})">Update</button></td>
                    <td><button class="delete" onclick="deleteCustomer(${customer.id})">Delete</button></td>
                  </tr>`
    }
    // $("table").append(table);
    $("table > tbody").html(table);
}

function createCustomer() {
    let name = $("#name").val();
    let age = $("#age").val();
    let address = $("#address").val();
    let gender = $("#gender").val();

    let customer = {
        "name": name,
        "age": age,
        "address": address,
        "gender": gender
    }

    $.ajax({
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(customer),
        url: "http://localhost:8080/api/customers",
        success: function() {
            alert("Customer Created Successfully!");
            window.location.href = "../customer/list.html";
        },
        error: function(error) {
            alert("Error Creating Customer: " + error.responseText);
        }
    })
}

function updateCustomerForm(id) {
    window.location.href = `update.html?id=${id}`;
}

$(document).ready(function() {
    if (window.location.pathname.endsWith("update.html")) {
        let urlParams;
        let customerId;

        if (window.location.search) {
            urlParams = new URLSearchParams(window.location.search);
            customerId = urlParams.get("id");
        }

        if (customerId){
            loadCustomerDetails(customerId);
        }

        $("#updateButton").click(function() {
            updateCustomerDetails(customerId);
        })
    }
})

function loadCustomerDetails(id) {
    $.ajax({
        headers: {"Authorization": "Bearer " + token},
        method: "GET",
        url: `http://localhost:8080/api/customers/${id}`,
        success: function(result) {
            $("#name").val(result.name);
            $("#age").val(result.age);
            $("#address").val(result.address);
            $("#gender").val(result.gender);
        },
        error: function(error) {
            alert("Error Loading Customer Details: " + error.responseText);
        }
    })
}

function updateCustomerDetails(id) {
    let name = $("#name").val();
    let age = $("#age").val();
    let address = $("#address").val();
    let gender = $("#gender").val();

    let customer = {
        "name": name,
        "age": age,
        "address": address,
        "gender": gender,
    }

    $.ajax({
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "PUT",
        data: JSON.stringify(customer),
        url: `http://localhost:8080/api/customers/${id}`,
        success: function() {
            alert("Customer Updated Successfully!");
            window.location.href = "../customer/list.html";
        },
        error: function (error) {
            alert("Error Updating Customer Details: " + error.responseText);
        }
    })
}

function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        $.ajax({
            headers: {"Authorization": "Bearer " + token},
            method: "DELETE",
            url: `http://localhost:8080/api/customers/${id}`,
            success: function() {
                alert("Customer Deleted Successfully!");
                showAllCustomer();
            },
            error: function (error) {
                alert("Error Deleting Customer: " + error.responseText);
            }
        })
    }
}

function getUserDetail() {
    let userString = localStorage.getItem("userDetail");
    let user = JSON.parse(userString);
    return user;
}

