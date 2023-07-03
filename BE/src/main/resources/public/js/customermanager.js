//--- VARIABLES ---//

//--- CODE ---//
waitForJobs();
async function waitForJobs() {
    try {
        await getUsers()
        console.log("Kunden abholen fertig");
        loadUserWorkbench()
        console.log(JSON.stringify(userData));
        loadUsersList(userData)
    } catch (error) {
        console.log("An error occured: ", error);
    }
}

//-- EventHandler --//
$(document).on('click', '#addUser', addUser);
$(document).on('click', '#deleteUser', deleteUser);
$(document).on('click', '#activateUser', activateUser);
$(document).on('click', '#deactivateUser', deactivateUser);

function loadUserWorkbench(){

    let userWorkbench = '<div class="card" id="cardStammDaten">'
        +  '<div class="card-header" id="stammDatenHeader">'
        +  '<h2 class="card-title">Neuen User hinzufügen</h2>'
        +  '<input type="email" id="email" placeholder="E-Mail" />'
        +  '<input type="text" id="firstName" placeholder="Vorname" />'
        +  '<input type="text" id="lastName" placeholder="Nachname" />'
        +  '<input type="text" id="passwort" placeholder="Passwort" />'
        +  '<select id="active">'
        +  '<option value="true">aktiv</option>'
        +  '<option value="false">inaktiv</option>'
        +  '</select>'
        +  '<select id="userRole">'
        +  '<option value="ROLE_USER">User</option>'
        +  '<option value="ROLE_ADMIN">Admin</option>'
        +  '</select>'
        +  '<button class="btn btn-primary" id="addUser">User hinzufügen</button>'
        +  '</div>'

    $("#userWorkbenchContainer").append(userWorkbench)
}

function addUser(){
    console.log("addUserClicked");
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#lastName").val();
    var passwort = $("#password").val();
    var active = $("#active").val();
    var userRole = $("#userRole").val();


// Produktobjekt erstellen
    var newUser = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: passwort,
        active: active,
        role: userRole
    };

    console.log(newUser)
//-- Produkt zum Array hinzufügen --//
    //products.push(product); // Produkt zum Array hinzufügen
    $.ajax({
        url: "/api/v1/user/register",
        headers: {
            "Authorization": sessionStorage.getItem('jwtToken')
        },
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: function(response){
            if (response.statusCode === 200) {
                console.log("User angelegt");
                alert("Neuer User hinzugefügt!")
            }
            // Felder zurücksetzen
            $("#firstName").val("");
            $("#lastName").val("");
            $("#email").val("");
            $("#passwort").val("");
            $("#userRole").val("");
            $("#active").val("");
        },
        error: function(xhr, status, error) {
            console.error("Fehler beim Erstellen des neuen Users:");
            console.log(error);
        }
    });
};

function loadUsersList(userData){
    console.log("loadUsersList");

    let adminUserListHeader =
        '<li id="adminUser">'+
        '<div id="userList">'+
        '<h2>Userliste</h2>'+
        '<div class="row">' +
        '<div class="col">ID: </div>' +
        '<div class="col">E-Mail: </div>' +
        '<div class="col">Vorname: </div>' +
        '<div class="col">Nachname: </div>' +
        '<div class="col">Passwort: </div>' +
        '<div class="col">aktiv: </div>' +
        '<div class="col">Rolle: </div>' +
        '<div class="col">Aktivieren: </div>' +
        '<div class="col">Deaktivieren: </div>' +
        '<div class="col">Bearbeiten: </div>' +
        '<div class="col">Löschen: </div>' +
        '</div>' +
        '</li>';

    $("#allUserData").append(adminUserListHeader);

    $.each(userData, function (i, user) {
        console.log("addListItem: " + JSON.stringify(userData));
        let listItem = '<li data-userId="' + user.id + '">'
            + '<div class="row">'
            + '<div class="col">'+ user.id + '</div>'
            + '<div class="col">'+ user.email + '</div>'
            + '<div class="col">'+ user.firstname + '</div>'
            + '<div class="col">'+ user.lastname + '</div>'
            + '<div class="col">'+ user.password + '</div>'
            + '<div class="col">'+ user.active + '</div>'
            + '<div class="col">'+ user.role + '</div>'
            + '<div class="col"><button class="btn btn-primary" id="activateUser">Aktivieren</button></div>'
            + '<div class="col"><button class="btn btn-primary" id="deactivateUser">Deaktivieren</button></div>'
            + '<div class="col"><button class="btn btn-primary" id="editUser">Bearbeiten</button></div>'
            + '<div class="col"><button class="btn btn-primary" id="deleteUser">Löschen</button></div>'
            + '</div>'
            + '</li>';

        $("#adminUser").append(listItem);
    });
}

// Eventlistener für den "Löschen" Button
function deleteUser() {
    let listItem = $(this).closest("li");
    console.log(listItem);
    let index = $("#adminUser li").index(listItem);
    let userId = listItem.attr("data-userId");

    console.log("index: " + index);
    console.log("productId: " + userId);

    $.ajax({
        url: "/api/v1/admin/user/" + userId,
        method: "DELETE",
        contentType: "application/json",
        success: function(response){
            if (response.statusCode === 200) {
                console.log("User gelöscht");
                alert("User gelöscht!")
            }
        },
        error: function(xhr, status, error) {
            console.error("Fehler beim Löschen des Users:");
            console.log(error);
        }
    });
    userData.splice(index, 1); // Produkt aus dem Array entfernen
    listItem.remove(); // Listenelement entfernen
};

function activateUser() {
    let listItem = $(this).closest("li");
    console.log(listItem);
    let index = $("#adminUser li").index(listItem);
    let userId = listItem.attr("data-userId");

    console.log("index: " + index);
    console.log("userId: " + userId);

    $.ajax({
        url: "/api/v1/admin/activateUser/" + userId,
        method: "Put",
        contentType: "application/json",
        success: function (response) {
            if (response.statusCode === 200) {
                console.log("User aktiviert");
                alert("User aktiviert!")
            }
        },
        error: function (xhr, status, error) {
            console.error("Fehler beim Aktivieren des Users:");
            console.log(error);
        }
    })
};

function deactivateUser() {
    let listItem = $(this).closest("li");
    console.log(listItem);
    let index = $("#adminUser li").index(listItem);
    let userId = listItem.attr("data-userId");

    console.log("index: " + index);
    console.log("userId: " + userId);

    $.ajax({
        url: "/api/v1/admin/deactivateUser/" + userId,
        method: "Put",
        contentType: "application/json",
        success: function (response) {
            if (response.statusCode === 200) {
                console.log("User deaktiviert");
                alert("User deaktiviert!")
            }
        },
        error: function (xhr, status, error) {
            console.error("Fehler beim Deaktivieren des Users:");
            console.log(error);
        }
    })
};
