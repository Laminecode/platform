


function ucode(c)
{
	return c.charCodeAt(0);
}

function lower_alpha(c)
{
	return ucode("a") <= ucode(c) && ucode(c) <= ucode("z");
}
function upper_alpha(c)
{
	return ucode("A") <=  ucode(c) && ucode(c) <= ucode("Z");
}
function number(c)
{
	let temp = ucode(c) - ucode("0");
	return 0 <=  temp && temp <= 9;
}
function symbol(c)
{
	return c === "_";
}


export function valid_password(password)
{
	for (let c of password)
	{
		if (!	(lower_alpha(c)
				|| upper_alpha(c)
				|| number(c)
				|| symbol(c))
		)
		{
			
			return false;
		}
	}
	return true;
}
