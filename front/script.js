function getData(graphQLParameter, callback){

	fetch("http://localhost:8081/graphql",
	{
		method: "POST",
		body: JSON.stringify(graphQLParameter),
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then((response) => response.json())
    .then((responseJSON) => {
       callback(responseJSON.data)
       
    })
}

function graphQLQuery(requestBody){
	try{
		const data = requestBody
		const tbody = document.getElementById("tbody")
		const tbodyAssigments = document.getElementById("tbodyAssigments")
		const assigmentsTable = document.getElementById("assigmentsTable")
		tbody.innerHTML = ""
		tbodyAssigments.innerHTML = ""
    	assigmentsTable.style.display = "none";
		if(data.hasOwnProperty("roles")){
			data.roles.forEach(role => tbody.appendChild(htmlToElement("<tr><td>" + role.id + "</td><td>" + role.name + "</td><td><i onclick=\"getData({ query: 'mutation{ deleteRole(roleId:" + role.id + ") {id, name} }' }, graphQLDelete)\" class='fas fa-trash-alt' style='cursor:pointer'></i> </td></tr>")))	
		}
		else if(data.hasOwnProperty("users")){
			data.users.forEach(user => tbody.appendChild(htmlToElement("<tr><td>" + user.id + "</td><td>" + user.username + "</td><td><i onclick=\"getData({ query: `mutation{ deleteUser(userId:" + user.id + ") {id, username} } `}, graphQLDelete)\" class='fas fa-trash-alt' style='cursor:pointer'></i> </td></tr>")))
			data.users.forEach(user => user.roles.forEach(role => tbodyAssigments.appendChild(htmlToElement("<tr><td>" + user.id + "</td><td>" + user.username + "</td><td>" + role.id + "</td><td>" + role.name + "</td></tr>"))))
    		assigmentsTable.style.display = "block";
		}
	}
	catch(error){
		console.log(error)
	}
}

function graphQLDelete(requestBody){
	try{
		alert(JSON.stringify(requestBody))
	}
	catch(error){
		console.log(error)
	}

}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}