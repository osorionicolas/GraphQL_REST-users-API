function graphQLAjax(graphQLParameter, callback){

	$.ajax({url:"http://localhost:8081/graphql",
			method: "POST",
			data: JSON.stringify(graphQLParameter),
			contentType: "application/json",
			success: function(requestBody){
				callback(requestBody);
			},
			error: function(error){
				console.log(error);
			}
	});
}

function graphQLQuery(requestBody){
	try{
		console.log(requestBody);
		var data = requestBody.data;
		var tbody = $("#tbody");
		var tbodyAssigments = $("#tbodyAssigments");
		var assigmentsTable = $("#assigmentsTable");
		tbody.empty();
		tbodyAssigments.empty();
		assigmentsTable.hide();
		if(data.hasOwnProperty("roles")){
			data.roles.forEach(role => tbody.append("<tr><td>" + role.id + "</td><td>" + role.name + "</td><td><i onclick=\"graphQLAjax({ query: 'mutation{ deleteRole(roleId:" + role.id + ") {id, name} }' }, graphQLDelete)\" class='fas fa-trash' style='cursor:pointer'></i> </td></tr>"));		
		}
		else if(data.hasOwnProperty("users")){
			data.users.forEach(user => tbody.append("<tr><td>" + user.id + "</td><td>" + user.username + "</td><td><i onclick=\"graphQLAjax({ query: `mutation{ deleteUser(userId:" + user.id + ") {id, username} } `}, graphQLDelete)\" class='fas fa-trash' style='cursor:pointer'></i> </td></tr>"));
			data.users.forEach(user => user.roles.forEach(role => tbodyAssigments.append("<tr><td>" + user.id + "</td><td>" + user.username + "</td><td>" + role.id + "</td><td>" + role.name + "</td></tr>")));
			assigmentsTable.show();
		}
	}
	catch(error){
		console.log(error);
	}
}

function graphQLDelete(requestBody){
	try{
		alert(JSON.stringify(requestBody));
	}
	catch(error){
		console.log(error);
	}

}