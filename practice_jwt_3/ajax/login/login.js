function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = {
        "username": username,
        "password": password,
    }
    // console.log(username, password);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: JSON.stringify(user),
        url: "http://localhost:8080/api/auth/login",
        success: function(data) {
            localStorage.setItem("userDetail", JSON.stringify(data));
            window.location.href = "../customer/list.html";
        }
    })
}

// function setUserDetail() {
//     let userString = localStorage.getItem("userDetail");
//     return userString ? JSON.parse(userString) : null;
// }
//
// function getToken() {
//     const userDetail = getUserDetail();
//     return userDetail ? userDetail.token : null;
// }


