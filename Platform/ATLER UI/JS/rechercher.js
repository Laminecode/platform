import * as DOM from "./Lib/DOMBindings.js"
import * as COMP from "./Lib/Components.js"

export function create_Sujet_result(data)
{

	let header = new DOM.ELEM(DOM.create_elem("header")).text(data.titre).apply();
	
	let desc = new DOM.ELEM(DOM.create_elem("desc")).text(data.desc).apply(); 
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
	.apply()
	// console.log(extra_info.)
	let main_section = new DOM.DIV(DOM.create_elem("main-section")).add(desc).add(extra_info).apply() 
	
	return new DOM.DIV(DOM.create_elem("sujet-card")).add(header).add(main_section);
}

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

// export let list_of_domaines = ["AI", "GL", "WEB"];
// export let list_of_outils = ["HTML", "CSS", "Javascript", "PHP", "Java", "C++", "C#", "Python", "C"];

export class Rechercher
{
	static type = ["Sujet", "Encadreur"];
	static list_of_domaines = [];
	static list_of_outils = [];

	constructor(Rechercher_handler)
	{
		let temp = DOM.getDOM("rechercher");
		this.area = new DOM.DIV(temp);
		this.result = new DOM.DIV(DOM.get(temp, "result-section"));
		this.search_bar = DOM.get(temp, "input");


		this.filters = new DOM.DIV(DOM.get(temp, "filters"));

		this.type = new COMP.OneSelect(Rechercher.type, "Type");
		this.filters.add(this.type.apply());
		this.filters.add(DOM.make_div("sep").apply())
		
		this.domaines = new COMP.MultipleSelect(Rechercher.list_of_domaines, "Domaines");
		this.filters.add(this.domaines.apply());
		this.filters.add(DOM.make_div("sep").apply())
		
		this.outils = new COMP.MultipleSelect(Rechercher.list_of_outils, "Outils");
		this.filters.add(this.outils.apply());

		let search_icon = new DOM.ELEM(DOM.get(temp, "search-icon")).event("click", Rechercher_handler).apply();

		DOM.get(temp, "input").addEventListener("keydown", function(event) {
			if (event.key === "Enter") { search_icon.click(); } 
		});

		
	}
	show_result(results)
	{
		this.result.clear();
		let type = results.type;
		let res = results.res;
		if (type === "sujet")
			for (let result of res)
				this.result.add(this.create_Sujet_result(result).apply());
		else
			for (let result of res)
				this.result.add(this.create_Encadreur_result(result).apply());
	}
	create_Sujet_result(data)
	{
		return create_Sujet_result(data);
	}
	create_Encadreur_result(data)
	{
		return create_Encadreur_result(data);
	}

	get_input()
	{
		return this.search_bar.value;
	}
	
	
}