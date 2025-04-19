import * as Modules from "./Lib/DOMBindings.js";
import * as Components from "./Lib/Components.js";
import * as utils from "./utils.js";
import * as request from "./Lib/Requests.js"

function signin(view)
{
	console.log(view.get_proffession());
	console.log(view.get_username());
	console.log(view.get_password());
	console.log(view.get_confirm_password());

	view.clear_errors();
	let password = view.get_password();
	let confirm_password = view.get_confirm_password();
	
	if (!utils.valid_password(password))
	{
		view.show_password_error();
	}
	else if (confirm_password !== password)
	{
		view.show_confirm_password_error();
	}
	else
	{
		console.log("Sent request to create an account");
		request.request("signin/", {});
	}

}


class Signin
{
	constructor()
	{
		let temp = Modules.getDOM("#proffession");
		this.proffession = Modules.get(temp, "select");

		temp = Modules.getDOM("#username");
		this.username_input = Modules.get(temp, "input");
		this.username_error = Modules.get(temp, "input-error");

		temp = Modules.getDOM("#password");
		this.password_input = Modules.get(temp, "input");
		this.password_error = Modules.get(temp, "input-error");

		temp = Modules.getDOM("#confirm-password");
		this.confirm_password_input = Modules.get(temp, "input");
		this.confirm_password_error = Modules.get(temp, "input-error");


		Modules.getDOM("#signin").addEventListener("click", signin.bind(null, this));
		
	}

	get_username() {
		return this.username_input.value;
	}
	get_password() {
		return this.password_input.value;
	}
	get_confirm_password() {
		return this.confirm_password_input.value;
	}
	get_proffession() {
		return this.proffession.value;
	}

	show_username_error() {
		this.username_error.textContent = "Invalid username";
	}
	show_password_error() {
		this.password_error.textContent = "Invalid passowrd";
	}
	show_confirm_password_error() {
		this.confirm_password_error.textContent = "Not the same passowrd as above";
	}
	clear_errors() {
		this.username_error.textContent = "";
		this.password_error.textContent = "";
		this.confirm_password_error.textContent = "";
	}
}

function load()
{

	new Signin();
	
	console.log("Hello world");
}
Modules.onPageLoad(load);