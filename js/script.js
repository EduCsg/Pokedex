const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const btnNext = document.querySelector(".btn_next");
const btnPrev = document.querySelector(".btn_prev");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`,
	);

	if (APIResponse.status == 200) {
		const data = await APIResponse.json();

		return data;
	}
};

const renderPokemon = async (pokemon) => {
	pokemonName.innerHTML = "Procurando...";

	const data = await fetchPokemon(pokemon);

	if (data) {
		pokemonImage.style.display = "block";
		pokemonNumber.innerHTML = data.id;
		pokemonName.innerHTML = `- ${data.name}`;
		searchPokemon = data.id;

		const imgSrcAnimated =
			data.sprites.versions["generation-v"]["black-white"].animated[
				"front_default"
			];

		if (imgSrcAnimated != null) {
			pokemonImage.src = imgSrcAnimated;
		} else {
			pokemonImage.src =
				data.sprites.versions["generation-v"]["black-white"]["front_default"];
		}
	} else {
		pokemonName.innerHTML = "Não encontrado!";
		pokemonNumber.innerHTML = "";
		pokemonImage.style.display = "none";
	}

	input.value = "";
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
	if (searchPokemon > 1) {
		searchPokemon--;
		renderPokemon(searchPokemon);
	} else {
		return;
	}
});

btnNext.addEventListener("click", () => {
	searchPokemon++;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
