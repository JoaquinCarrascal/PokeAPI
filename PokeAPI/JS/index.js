$(document).ready(function() {
    getAllPokemons();

    var offset = 0;

    function getAllPokemons(offset) {
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon?limit=12&offset=" + offset,
            method: "GET",
        }).done(function(resp) {
            var listadoPokemon = resp.results;
            var pokemonContainer = $("#pokemon-container");
            listadoPokemon.forEach(function(pokemon) {
                var pokeId = pokemon.url.split("/")[6];
                var pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                var pokeImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;

                var pokemonCard = `
                    <div class="col py-3">
                        <a href="poke-details.html?id=${pokeId}" class="text-decoration-none text-dark">
                            <div class="card shadow-lg h-100">
                                <div class="card-body text-center">
                                    <h5 class="card-title mt-2">${pokeName}</h5>
                                    <p class="card-text">N° #${pokeId.padStart(4, '0')}</p>
                                    <div class="imagen-circulo shadow-lg">
                                            <img src="${pokeImage}" class="card-img-top" alt="${pokeName}">
                                    </div>
                                  
                                    <div class="p-3">
                                        <a class="text-decoration-none text-dark btn-ver-detalles py-1 px-2 rounded-3" href="poke-details.html?id=${pokeId}"><span>Ver Detalles</span></a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;

                pokemonContainer.append(pokemonCard);
            });
        });
    }

    $('#see-more').click(function() {

        offset += 12;
        getAllPokemons(offset);

    });

    
    $('#search-button').click(function() {
        var query = $('#search-input').val().toLowerCase();
        if (query) {
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${query}`,
                method: "GET",
                success: function(pokemon) {
                    var pokemonContainer = $("#pokemon-container");
                    pokemonContainer.empty();
                    var pokeId = pokemon.id.toString();
                    var pokeName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    var pokeImage = pokemon.sprites.front_default;

                    var pokemonCard = `
                        <div class="col py-3">
                            <a href="poke-details.html?id=${pokeId}" class="text-decoration-none text-dark">
                                <div class="card shadow-lg h-100">
                                    <div class="card-body text-center">
                                        <h5 class="card-title mt-2">${pokeName}</h5>
                                        <p class="card-text">N° #${pokeId.padStart(4, '0')}</p>
                                        <div class="imagen-circulo">
                                            <img src="${pokeImage}" class="card-img-top" alt="${pokeName}">
                                        </div>
                                        <div class="p-3">
                                            <a class="text-decoration-none text-dark btn-ver-detalles py-1 px-2 rounded-3" href="poke-details.html?id=${pokeId}"><span>Ver Detalles</span></a>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;

                    pokemonContainer.append(pokemonCard);
                },
                error: function() {
                    alert('Pokémon no encontrado. Por favor, intenta con otro nombre o ID.');
                }
            });
        }
    });
});