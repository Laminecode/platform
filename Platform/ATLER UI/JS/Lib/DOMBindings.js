


export function get(source, selector)
{
	return source.querySelector(selector);
}
export function getAll(source, selector)
{
	return source.querySelectorAll(selector);
}
export function getDOM(selector)
{
	return get(document, selector);
}
export function getDOMAll(selector)
{
	return getAll(source, selector);
}


export function create_elem(type)
{
	return document.createElement(type);
}

export function create_img() { return create_elem("img"); }
export function create_div() { return create_elem("div"); }
export function create_input() { return create_elem("input"); }
export function create_select() { return create_elem("select"); }
export function create_option() { return create_elem("option"); }

export const HORIZONTAL		= "row";
export const VERTICAL 		= "column";

// * all of the functions should return the element they modify

// + flex : convert the div to a flex by applying style
// + clear : removes all the elements of the div
// + text : puts text into div
// + style : applys style into div
// + add : appends elem2 to elem1 as a child
// - insert_at : inserts an element at a specific index in parent
// + get : get a child from an element
// - remove_at : removes the element at a specific index in parent
// - remove : remove child from parent
// - remove_selector : removes all the elements queryed from the selector passed from parent 




function add(parent, child)
{
	parent.appendChild(child);
	return parent;
}
function addList(parent, list)
{
	for (let elem of list)
	{
		add(parent, elem);
	}
	return parent;
}
function style(elem, css)
{
	for (let [style_name, style_value] of Object.entries(css))
	{
		elem.style[style_name] = style_value;
	}
	return elem;
}
function text(elem, text)
{
	elem.textContent = text;
	return elem;
}
function flex(div, direction)
{
	return style(div, {"display": "flex", "flexDirection": direction});
}
function clear(elem)
{
	elem.innerHTML = "";
	return elem;
}
function insert(parent, child, index)
{
	if (index === 0) 
	{
		parent.insertBefore(child, parent.firstChild);
	}
	else if (index === parent.children.length)
	{
		parent.appendChild(child);
	}
	else
	{
		parent.insertBefore(child, parent.children[index]);
	}
	return parent;
}
function remove(parent, child)
{
	parent.removeChild(child);
	return parent;
}
function remove_at(parent, index)
{
	parent.removeChild(parent.children[index]);
	return parent;
}
function remove_selector(parent, selector)
{
	return remove(parent, get(parent, selector));
}
function event(elem, ev, handle)
{
	elem.addEventListener(ev, handle);
	return elem;
}

function _make(Class, string) { return new Class(create_elem(string)); }

export class ELEM
{
	constructor(elem) { this.elem = elem; }
	apply() { return this.elem; }
	style(css)
	{
		for (let [style_name, style_value] of Object.entries(css))
		{
			this.elem.style[style_name] = style_value;
		}
		return this;
	}
	width(val) { return this.style({"width": val}); }
	height(val) { return this.style({"height": val}); }
	color(val) { return this.style({"color": val}); }
	bgcolor(val) { return this.style({"backgroundColor": val}); }
	border(color="red", width="1px") { return this.style({"border": "solid "+width+" "+color}); }
	chtext() { return this.style({"justifyContent": "center", "display": "flex"}); }
	cvtext() { return this.style({"alignItems": "center", "display": "flex"}); }
	nstext() { return this.style({"userSelect": "none"}); }
	visible() { return this.style({"display": "flex"}); }
	invisible() { return this.style({"display": "none"}); }
	margin(val) { return this.style({"margin": val}); }
	text(text)
	{
		this.elem.textContent = text;
		return this;
	}
	clear()
	{
		this.elem.innerHTML = "";
		return this;
	}
	event(ev, handle)
	{
		this.elem.addEventListener(ev, handle);
		return this;
	}
	add_classes(list_of_classes)
	{
		for (let _class of list_of_classes)
		{
			this.elem.classList.add(_class);
		}
		return this;
	}
	remove_classes(list_of_classes)
	{
		for (let _class of list_of_classes)
		{
			this.elem.classList.remove(_class);
		}
		return this;
	}
	swap_classes(to_add, to_remove)
	{
		this.elem.classList.remove(to_remove);
        this.elem.classList.add(to_add);
        return this;
	}

	// getters
	get_text() { return this.elem.textContent; }

}
export function make_elem(string="div") { return _make(ELEM, string); }

export class DIV extends ELEM
{
	static VERTICAL = VERTICAL;
	static HORIZONTAL = HORIZONTAL;

	constructor(div)
	{
		super(div);
	}
	add(child)
	{
		this.elem.appendChild(child);
		return this;
	}
	addList(list)
	{
		for (let elem of list)
		{
			this.elem.add(elem);
		}
		return this;
	}
	
	flex(direction)
	{
		return this.style({"display": "flex", "flexDirection": direction});
	}
	flex_hor() { return this.flex(DIV.HORIZONTAL); }
	flex_ver() { return this.flex(DIV.VERTICAL); }

	insert(child, index)
	{
		if (index === 0) 
		{
			this.elem.insertBefore(child, this.elem.firstChild);
		}
		else if (index === this.elem.children.length)
		{
			this.elem.appendChild(child);
		}
		else
		{
			this.elem.insertBefore(child, this.elem.children[index]);
		}
		return this;
	}
	remove(child)
	{
		this.elem.removeChild(child);
		return this;
	}
	remove_at(index)
	{
		this.elem.removeChild(this.elem.children[index]);
		return this;
	}
	remove_selector(selector)
	{
		return this.remove(get(this.elem, selector));
	}
	
}
export function make_div(string="div") { return _make(DIV, string); }

export class DropListOption extends ELEM
{
	constructor(name, value)
	{
		super(create_option());
		this.name(name).this.value(value);
	}
	name(name) 
	{
		this.elem.text = name; 
		return this;
	}
	value(value)
	{
		this.elem.value = value;
		return this;
	}

}

export class DropList extends ELEM
{
	constructor(select) { super(select); }
	add_choice(name, value)
	{
		this.elem.add(new DropListOption(name, value).apply());
		return this;
	}
}

export class Img extends ELEM
{
	constructor(img) { super(img); }
	src(source) { this.elem.src = source; return this;}

}
export function onPageLoad(load)
{
	window.onload = load;
}