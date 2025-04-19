import * as DOM from "./Lib/DOMBindings.js"
import * as Fecth from "./Lib/Requests.js"
import * as REHCHERCHER from "./rechercher.js"



let sidebar_view = null;
let content_view = null;
let rechercher_view = null;

// handlers of each option

function Rechercher_handler()
{
	
	let request_data = {};
	let type = rechercher_view.type.get_selected();
	if (type === null)	
	{
		request_data.type = "sujet";
		rechercher_view.type.set_selected("Sujet");
	}
	else
	request_data.type = type.toLowerCase(); 


	request_data.domaines = rechercher_view.domaines.get_selected();
	request_data.outils = rechercher_view.outils.get_selected();

	let text = rechercher_view.get_input().trim();
	request_data.search_input = text;


	
	console.log(request_data);

	let result = Fecth.request("rechercher/", request_data)
	.then(data => {
		console.log(data);
		rechercher_view.show_result(data);
	});
}

function Chat_handler()
{

}
function ProposerSujet_handler()
{

}
function ListeDeChoix_handler()
{

}
function Favoris_handler()
{

}
function Parametre_handler()
{

}
function APropos_handler()
{

}

class SideBar 
{
	static options = {"Rechercher": Rechercher_handler, "Chat": Chat_handler, "Proposer Sujet": ProposerSujet_handler, "Liste de choix": ListeDeChoix_handler, "Favoris": Favoris_handler};
	
	static other_options = {"Parametre": Parametre_handler, "A propos": APropos_handler};

	constructor()
	{
		let menu = new DOM.DIV(DOM.getDOM("menu"));
		this.add_options(SideBar.options, menu);
		menu.add(DOM.get(menu.apply(), "#sep").cloneNode());
		this.add_options(SideBar.other_options, menu);
	}
	create_option(text)
	{
		let temp = new DOM.ELEM(DOM.create_elem("menu-option"))
			.text(text)
			;
		return temp.apply();
	}
	add_options(options, menu)
	{
		for (let [option, handler] of Object.entries(options))
		{
			menu.add(this.create_option(option));
		}
	}
}

class Content
{
	constructor()
	{
		this.area = new DOM.DIV(DOM.getDOM("content-section"));
		
		
		
		
		
		// this.area.add(new DOM.ELEM(DOM.create_div()).style({"backgroundColor": "red", "width": "20px", "height": "20px"}).apply());
		// this.area.add(new DOM.ELEM(DOM.create_div()).style({"backgroundColor": "red", "width": "20px", "height": "20px"}).apply());
		// this.area.remove_selector("div");
		// this.area.clear();
	}
	

}


function init()
{
	Fecth.request("get_domains_and_outils/", {}).then(res => 
		{
			REHCHERCHER.Rechercher.list_of_domaines = res.domains;
			console.log(res.domains);
			REHCHERCHER.Rechercher.list_of_outils = res.outils; 
			console.log(res.outils);
			rechercher_view = new REHCHERCHER.Rechercher(Rechercher_handler);
		});
}


function load()
{
	init();
	sidebar_view = new SideBar();
	content_view = new Content();
	// rechercher_view.show_result({
	// 	1: {type: "sujet", titre: "a"},
	// 	2: {type: "sujet", titre: "a"},
	// 	3: {type: "sujet", titre: "a"},
	// })
}
DOM.onPageLoad(load);