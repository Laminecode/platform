import * as DOM from "../JS/Lib/DOMBindings.js"
import * as COMP from "../JS/Lib/Components.js"

// import { ELEM } from "../JS/Lib/DOMBindings";

export function create_Encadreur_result(data)
{
	let title = new DOM.ELEM(DOM.create_elem("title")).text(data.nom + " " + data.prenom).apply();
	let pic = new DOM.DIV(DOM.create_elem("profile-pic"))
	.add(new DOM.Img(DOM.create_img()).src("../Images/profile.png").apply())
	.apply();

	let header = new DOM.DIV(DOM.create_elem("header")).add(pic).add(title).apply();

	let extra_info = new DOM.DIV(DOM.create_elem("extra-info"))
	.add(
		new DOM.DIV(DOM.create_div())
		.add(new DOM.ELEM(DOM.create_elem("title")).text("Domaines: ").apply())
		.add(new DOM.ELEM(DOM.create_elem("data")).text(data.domaines).apply())
		.apply()
	)
	.add(
		new DOM.DIV(DOM.create_div())
		.add(new DOM.ELEM(DOM.create_elem("title")).text("Outils: ").apply())
		.add(new DOM.ELEM(DOM.create_elem("data")).text(data.outils).apply())
		.apply()
	)
	.apply();
	
	let desc = new DOM.DIV(DOM.create_elem("desc"))
	.add(
		new DOM.DIV(DOM.create_div())
		.add(new DOM.ELEM(DOM.create_elem("title")).text("Specialite: ").apply())
		.add(new DOM.ELEM(DOM.create_elem("data")).text(data.spec).apply())
		.apply()
	)
	.add(
		new DOM.DIV(DOM.create_div())
		.add(new DOM.ELEM(DOM.create_elem("title")).text("Grade: ").apply())
		.add(new DOM.ELEM(DOM.create_elem("data")).text(data.grade).apply())
		.apply()
	)
	.apply();

	let body = new DOM.DIV(DOM.create_elem("main-section")).add(desc).add(extra_info).apply();
	return new DOM.DIV(DOM.create_elem("encadreur-card")).add(header).add(body); 
}


function load()
{
	let obj = {
		title: "shananigan",
		arguments: ["GL", "WEB", "AI"],
	};
	let temp = JSON.stringify(obj);
	console.log(temp);
	temp = JSON.parse(temp);
	console.log(temp);
}

window.onload = load;