import * as DOM from "./DOMBindings.js";

export class LabelInputError
{
	constructor(label_text="", input_type, input_values)
	{
		let temp = null;

		let area = new DOM.DIV(DOM.create_div()).flex_ver();

		let label = new DOM.ELEM(DOM.create_div()).text(label_text).style({"fontSize": "30px"});
		area.add(label.apply());

		temp = new DOM.DIV(DOM.create_div()).flex_hor();
		let input = new DOM.ELEM(DOM.create_input()).style({"backgroundColor": "red", "color": "green", "width": "100%"});
		temp.add(input.apply());
		area.add(temp.apply());

		let error = new DOM.ELEM(DOM.create_div()).text(error_text).style({"fontSize": "30px"});
		area.add(error.apply());

		this.area = area;
		this.input = input;
		this.error = error;
	}
	get()
	{
		return this.area.apply();
	}
}

export class Form
{
	constructor(div)
	{
		this.area = new DOM.DIV(div)
		.flex_ver()
		.style({"paddingLeft": "20px", "width": "200px", "border": "solid 4px red"});

	}

	add_label_input_error(label, error)
	{
		let temp = new DOM.DIV(DOM.create_div())
		.flex_hor()
		.style({"border": "none 10px yellow", "paddingBottom": "20px"});
		
		temp.add(new LabelInputError(label, error).get());
		this.area.add(temp.apply());
		
		return this;
	}
}


export class Option extends DOM.DIV
{
	static hover_class = "option-hover";
	static idle_class = "option-idle";
	
	static default_style = `
	// .option-idle {
	// 	background-color: transparent;
	// }
	// .option-hover {
	// 	background-color: lightgray;
	// }
	option- {
		width: 100%
		height: 30px;
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}
	`
	constructor(text)
	{
		super(DOM.create_elem("option-"));
		this.text(text)
		this.selected = false;

		this.event("mouseover", ()=>{
			if (! this.selected)
				this.swap_classes(Option.hover_class, Option.idle_class);
		})
		.event("mouseout", ()=>{
			if (!this.selected)
				this.swap_classes(Option.idle_class, Option.hover_class);
		});
	}
	set_selected(bool) { this.selected = bool; }
}
export class DropList extends DOM.DIV
{
	static selected_class = "option-selected";
	static defalt_style = `
	
	// .option-selected {
	// 	background-color: grey;
	// }

	drop-list {
		width: 100px;
        height: fit-content;
        // border: 1px solid black;

		header- {
			width: 100%;
            height: fit-content;
            border: 1px solid black;
			background-color: lightgrey;
		}
		body- {
			width: 100%;
            height: fit-content;
            // border: 1px solid black;

			option- {
				width: 100%;
                height: fit-content;
                border: 1px solid black;
				display: flex;
				justify-content: center;
				align-items: center;
				user-select: none;

			}
		}
	}
    `;
	
	constructor(options, title="", handle)
	{
		super(DOM.create_elem("drop-list"));
		this.flex_ver();
		this.options = [];
		this.collapsed = false;

		if (title !== "")
		{
			this.header = DOM.make_elem("header-").text(title).cvtext().chtext().nstext()
			.event("click", ()=>{
				if (this.collapsed)
				{
                    this.collapsed = false;
                    this.body.visible();
                }
				else
				{
                    this.collapsed = true;
                    this.body.invisible();
                }
			})
			this.add(this.header.apply());
		}
		this.body = DOM.make_div("body-").flex_ver()
		this.add(this.body.apply());
		
		for (let o of options)
		{
			let option = new Option(o);
			this.body.add(option.apply());
			this.options.push(option);
			option.event("click", ()=>{handle(option);});
		}
	}
	_change_option_state(option, selected, add_style, remove_style)
	{
		option.remove_classes([remove_style]);
		option.add_classes([add_style]);
		option.set_selected(selected);
	}

	// style_header(css) { this.header.style(css); return this; }
	// style_body(css) { this.body.style(css); return this; }
	// style_options(css) 
	// {
	// 	for (let option of this.options)
	// 		option.style(css);
	// 	return this;
	// }

}

export class OneSelect extends DropList
{
	constructor(options, title="")
	{
		super(options, title, (option)=>{ this.handle(option); });
		this.selected_option = null;
	}
	handle(option)
	{
		if (!option.selected)
		{
			if (this.selected_option !== null)
				this._change_option_state(this.selected_option, false, Option.idle_class, DropList.selected_class) ;

			this._change_option_state(option, true, DropList.selected_class, Option.hover_class);
			this.selected_option = option;
		}
		else
		{
			this._change_option_state(option, false, Option.hover_class, DropList.selected_class);
			this.selected_option = null;
		}
	}
	set_selected(option_text)
	{
		this.clear_selected();
		for (let option of this.options)
		    if (option.get_text() === option_text)
			{
				this.selected_option = option;
				this._change_option_state(option, true, DropList.selected_class, Option.hover_class);
				return;
			}
	}
	get_selected() { return this.selected_option !== null ? this.selected_option.get_text() : null; }
	clear_selected() 
	{
		if(this.selected_option !== null)
		{
			// this.selected_option.set_selected(false);
			// this.selected_option.remove_classes([DropList.selected_class]);
			// this.selected_option.add_classes([Option.idle_class]);
			this._change_option_state(this.selected_option, false, DropList.selected_class, Option.idle_class);
			this.selected_option = null;
		}
	}
}

export class MultipleSelect extends DropList
{
	constructor(options, title)
	{
		super(options, title, (option)=>{ this.handle(option); });
		this.selected_options = [];
	}
	handle(option)
	{

		if (!option.selected)
		{
			this._change_option_state(option, true, DropList.selected_class, Option.hover_class);
			this.selected_options.push(option);
		}
		else
		{
			this._change_option_state(option, false, Option.hover_class, DropList.selected_class);
			this.selected_options.pop(option);
		}
	}
	get_selected() { return this.selected_options.map((option)=>{ return option.get_text(); }); }
	clear_selected() 
	{
		for (let option of this.selected_options)
			this._change_option_state(option, false, Option.idle_class, DropList.selected_class);
		this.selected_options = [];
	}

}