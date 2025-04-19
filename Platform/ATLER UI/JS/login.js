import * as Modules from "./Lib/DOMBindings.js";
import * as Components from "./Lib/Components.js";
import * as utils from "./utils.js";

function login(view)
{
	console.log(view.get_username());
	console.log(view.get_password());
	
	view.clear_errors();
	let password = view.get_password();
	if (!utils.valid_password(password))
	{
		view.show_password_error();
	}
	else
	{
		console.log("Sent request to connect");
	}


}


class Login
{
	constructor()
	{
		let temp = Modules.getDOM("#username");
		this.username_input = Modules.get(temp, "input");
		this.username_error = Modules.get(temp, "input-error");

		temp = Modules.getDOM("#password");
		this.password_input = Modules.get(temp, "input");
		this.password_error = Modules.get(temp, "input-error");

		Modules.getDOM("#login").addEventListener("click", login.bind(null, this));
		Modules.getDOM("#signin").addEventListener("click", ()=>{window.location.href = "../HTML/signin.html"});
		
	}

	get_username() {
		return this.username_input.value;
	}
	get_password() {
		return this.password_input.value;
	}
	show_username_error() {
		this.username_error.textContent = "Invalid username";
	}
	show_password_error() {
		this.password_error.textContent = "Invalid passowrd";
	}
	clear_errors() {
		this.username_error.textContent = "";
		this.password_error.textContent = "";
	}
}

function load()
{

	new Login();
	
	console.log("Hello world");
}
Modules.onPageLoad(load);