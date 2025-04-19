
const app_url = "http://localhost:8000/platform/"

export async function request(url, data)
{
	let response = await fetch(app_url + url,
	{
		method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
	});
	const res = await response.json();
	return res;

}